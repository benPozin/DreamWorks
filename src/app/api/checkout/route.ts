import { NextRequest, NextResponse } from "next/server";
import { stripe, siteUrl } from "@/lib/stripe";
import { findById } from "@/data/products";

export const runtime = "nodejs"; // Stripe SDK needs Node runtime

export async function POST(req: NextRequest) {
  try {
    const { productId, quantity = 1 } = await req.json();

    const p = findById(productId);
    if (!p || p.disabled) {
      return NextResponse.json(
        { error: "Invalid or unavailable product" },
        { status: 400 }
      );
    }

    // Build absolute image URL for Stripe (optional but nice)
    const imageUrl = `${siteUrl}${p.image}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity,
          price_data: {
            currency: p.currency.toLowerCase(), // "cad"
            unit_amount: p.priceCents, // e.g., 3999
            product_data: {
              name: p.name,
              description: p.description,
              images: [imageUrl],
            },
          },
        },
      ],
      // ✅ updated to use thank-you + canceled pages
      success_url: `${siteUrl}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/canceled`,
      // Optional extras:
      // shipping_address_collection: { allowed_countries: ["CA", "US"] },
      // automatic_tax: { enabled: true },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err: any) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: err?.message || "Checkout failed" },
      { status: 500 }
    );
  }
}
