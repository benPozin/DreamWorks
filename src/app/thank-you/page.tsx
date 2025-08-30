// Server component (App Router)
import { Metadata } from "next";
import { stripe } from "@/lib/stripe"; // server-only in our helper
import { CheckCircle } from "lucide-react"; // optional, or remove if you don’t use lucide

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
  searchParams: { session_id?: string; success?: string };
}) {
  // We support either ?session_id=... (best) or ?success=1 (fallback)
  const sessionId = searchParams?.session_id;

  // Try to fetch Checkout Session to show a nicer summary. If not present, page still looks good.
  let email: string | null = null;
  let total: string | null = null;
  let productSummary: string | null = null;

  if (sessionId) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId, { expand: ["line_items"] });
      // total
      if (session.amount_total != null) total = fmtCAD(session.amount_total);
      // email
      if (typeof session.customer_details?.email === "string") {
        email = session.customer_details.email;
      }
      // quick product summary (first line item)
      const first = (session.line_items?.data?.[0] as any) || null;
      if (first?.description) productSummary = first.description as string;
    } catch {
      // ignore—page still renders
    }
  }

  return (
    <main className="min-h-dvh flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl rounded-2xl border bg-white p-8 shadow-[0_10px_25px_-12px_rgba(0,0,0,0.12)]">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-green-100 p-2">
            {/* If you don't use lucide-react, replace with ✅ */}
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <h1 className="text-xl font-semibold">Payment successful</h1>
        </div>

        <p className="mt-3 text-gray-600">
          Thanks for your order{email ? `, ${email}` : ""}! We’re getting it ready.
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
          <a
            href="/products"
            className="flex-1 rounded-lg border px-4 py-2 text-center hover:bg-black/5"
          >
            Continue shopping
          </a>
          <a
            href="/"
            className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700"
          >
            Go home
          </a>
        </div>
      </div>
    </main>
  );
}