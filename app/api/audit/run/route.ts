import { NextResponse } from "next/server";
import { stripeServer } from "../../../../lib/stripe";
import { supabaseServer } from "../../../../lib/supabaseServer";
import { fetchAndExtractSite } from "../../../../lib/siteExtract";
import { runAuditWithOpenAI } from "../../../../lib/openai";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { session_id } = await req.json();
    if (!session_id) return NextResponse.json({ error: "Falta session_id" }, { status: 400 });

    const stripe = stripeServer();
    const session = await stripe.checkout.sessions.retrieve(session_id);

    const sb = supabaseServer();
    const { data: audit, error } = await sb
      .from("audits")
      .select("*")
      .eq("stripe_session_id", session.id)
      .maybeSingle();

    if (error || !audit) return NextResponse.json({ error: "Auditoria não encontrada" }, { status: 404 });

    // Garantia: só roda após status paid (confirmado por webhook)
    if (audit.status !== "paid" && audit.status !== "running" && audit.status !== "done") {
      return NextResponse.json({ error: "Pagamento ainda não confirmado (aguarde 5-15s e recarregue)." }, { status: 409 });
    }

    if (audit.status === "done") {
      return NextResponse.json({ reportUrl: `/r/${audit.token}` });
    }

    // trava
    await sb.from("audits").update({ status: "running" }).eq("id", audit.id);

    const input = audit.input || {};
    const auditType = audit.audit_type as any;

    // montar input final
    const locale = "pt-PT";
    let payload: any = { ...input };

    if (auditType === "site" || auditType === "copy" || auditType === "combo") {
      const extracted = await fetchAndExtractSite(String(input.url));
      payload.site = extracted;
    }

    // Para copy: se não veio texto colado, usa o textContent do site
    if ((auditType === "copy" || auditType === "combo") && !String(input.copyText || "").trim()) {
      payload.copyText = payload.site?.textContent || "";
    }

    const report = await runAuditWithOpenAI({
      auditType,
      locale,
      input: payload
    });

    await sb.from("audits").update({ status: "done", report }).eq("id", audit.id);

    return NextResponse.json({ reportUrl: `/r/${audit.token}` });
  } catch (e: any) {
    try {
      // best-effort log
      const sb = supabaseServer();
      // can't identify audit safely here if unknown
      // ignore
      void sb;
    } catch {}
    return NextResponse.json({ error: e.message || "Erro" }, { status: 500 });
  }
}
