import Stripe from "stripe";

// Simple: let Stripe use your account's default API version
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Public/base URL helper for redirects
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
