// src/app/thank-you/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { stripe } from "@/lib/stripe";
import type Stripe from "stripe";

export const metadata: Metadata = {
  title: "Thank you | DreamWorks Resin",
};

function fmtCAD(cents: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

export default async function ThankYou({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams?.session_id;

  let email: string | null = null;
  let total: string | null = null;
  let productSummary: string | null = null;

  if (sessionId) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["line_items"],
      });

      if (typeof session.customer_details?.email === "string") {
        email = session.customer_details.email;
      }
      if (typeof session.amount_total === "number") {
        total = fmtCAD(session.amount_total);
      }

      const items = (session as Stripe.Checkout.Session & {
        line_items?: Stripe.ApiList<Stripe.LineItem>;
      }).line_items;

      const first = items?.data?.[0];
      if (first?.description) productSummary = first.description;
    } catch {
      // ignore; show generic thank-you
    }
  }

  return (
    <main className="min-h-dvh flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl rounded-2xl border bg-white p-8 shadow-[0_10px_25px_-12px_rgba(0,0,0,0.12)]">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-green-100 p-2">✅</div>
          <h1 className="text-xl font-semibold">Payment successful</h1>
        </div>

        <p className="mt-3 text-gray-600">
          Thanks for your order{email ? `, ${email}` : ""}! We’re getting it
          ready.
        </p>

        {(total || productSummary) && (
          <div className="mt-6 rounded-xl border bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Order total</span>
              <span className="font-medium">{total ?? "—"}</span>
            </div>
            {productSummary && (
              <div className="mt-1 text-sm text-gray-700">{productSummary}</div>
            )}
          </div>
        )}

        <p className="mt-4 text-sm text-gray-500">
          A receipt {email ? `was sent to ${email}` : "will be emailed to you"}.
        </p>

        <div className="mt-8 flex gap-3">
          <Link
            href="/products"
            className="flex-1 rounded-lg border px-4 py-2 text-center hover:bg-black/5"
          >
            Continue shopping
          </Link>
          <Link
            href="/"
            className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
