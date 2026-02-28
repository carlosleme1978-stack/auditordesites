import { NextResponse } from "next/server";
import { stripeServer } from "@/lib/stripe";
import { supabaseServer } from "@/lib/supabaseServer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET!;
  if (!sig || !secret) return NextResponse.json({ error: "Missing webhook secret/signature" }, { status: 400 });

  const stripe = stripeServer();
  const rawBody = await req.text();

  let event: any;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, secret);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook signature verification failed: ${err.message}` }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const audit_id = session?.metadata?.audit_id;
      const sb = supabaseServer();

      await sb.from("audits").update({
        status: "paid",
        email: session.customer_details?.email || null,
        stripe_payment_intent_id: session.payment_intent || null
      }).eq("id", audit_id);
    }

    return NextResponse.json({ received: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Erro" }, { status: 500 });
  }
}
