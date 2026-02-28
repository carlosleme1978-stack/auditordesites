import Stripe from "stripe";

export function stripeServer() {
  const key = process.env.STRIPE_SECRET_KEY!;
  if (!key) throw new Error("Falta STRIPE_SECRET_KEY");
  return new Stripe(key, { apiVersion: "2024-06-20" });
}
