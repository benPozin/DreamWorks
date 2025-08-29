import { NextRequest, NextResponse } from "next/server";
import { stripe, siteUrl } from "@/lib/stripe";
import { findById } from "@/data/products";

export const runtime = "nodejs"; // Stripe SDK needs Node runtime

export async function POST(req: NextRequest) {
  try {
    const { productId, quantity = 1 } = await req.json();

    const p = findById(productId);
    if (!p || p.disabled) {
      return NextResponse.json({ error: "Invalid or unavailable product" }, { status: 400 });
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
            unit_amount: p.priceCents,          // e.g., 3999
            product_data: {
              name: p.name,
              description: p.description,
              images: [imageUrl],
            },
          },
        },
      ],
      success_url: `${siteUrl}/products?success=1`,
      cancel_url: `${siteUrl}/products?canceled=1`,
      // Optional later:
      // shipping_address_collection: { allowed_countries: ["CA", "US"] },
      // automatic_tax: { enabled: true },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
