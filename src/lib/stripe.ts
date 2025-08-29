import Stripe from "stripe";

// Use your account's default API version to avoid TS literal issues
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
