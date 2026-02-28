import { NextResponse } from "next/server";
import { stripeServer } from "@/lib/stripe";
import { supabaseServer } from "@/lib/supabaseServer";
import { makeToken, validateAndNormalizeUrl } from "@/lib/security";
import { PRICES, type AuditType } from "@/config/pricing";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const auditType = body.auditType as AuditType;
    if (!auditType || !PRICES[auditType]) return NextResponse.json({ error: "auditType inválido" }, { status: 400 });

    // valida inputs mínimos + sanitiza
    const input: any = {
      business: (body.business || "").toString().slice(0, 120),
      city: (body.city || "").toString().slice(0, 80)
    };

    if (auditType === "site" || auditType === "copy" || auditType === "combo") {
      if (!body.url) return NextResponse.json({ error: "Falta URL" }, { status: 400 });
      input.url = await validateAndNormalizeUrl(String(body.url));
    }
    if (auditType === "copy" || auditType === "combo") {
      input.copyText = (body.copyText || "").toString().slice(0, 40_000);
    }
    if (auditType === "instagram" || auditType === "combo") {
      input.igHandle = (body.igHandle || "").toString().slice(0, 80);
      input.igBio = (body.igBio || "").toString().slice(0, 2_000);
      input.igCaptions = (body.igCaptions || "").toString().slice(0, 10_000);
      if (!input.igHandle || !input.igBio || !input.igCaptions) {
        return NextResponse.json({ error: "Falta info do Instagram (handle/bio/legendas)" }, { status: 400 });
      }
    }

    const email = (body.email || "").toString().slice(0, 190) || null;

    // resolve Stripe Price ID por env
    const envKey = PRICES[auditType].stripePriceEnv;
    const priceId = process.env[envKey];
    if (!priceId) return NextResponse.json({ error: `Falta ${envKey} no .env` }, { status: 500 });

    const token = makeToken(24);

    const sb = supabaseServer();
    const { data: created, error } = await sb
      .from("audits")
      .insert({
        audit_type: auditType,
        status: "created",
        input,
        token,
        email
      })
      .select("id")
      .single();

    if (error || !created?.id) throw new Error(error?.message || "Falha ao criar audit");

    const stripe = stripeServer();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/auditar`,
      customer_email: email || undefined,
      metadata: {
        audit_id: created.id
      }
    });

    // salva session id
    await sb.from("audits").update({ stripe_session_id: session.id }).eq("id", created.id);

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Erro" }, { status: 500 });
  }
}
