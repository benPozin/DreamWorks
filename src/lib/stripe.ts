import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe() {
  if (_stripe) return _stripe;

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    // Throw at request time (clear 500) instead of crashing the build
    throw new Error("Server misconfiguration: STRIPE_SECRET_KEY is missing");
  }

  _stripe = new Stripe(key, {apiVersion: "2025-07-30.basil" }); // pin an API version for stability
  return _stripe;
}

export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  );
}