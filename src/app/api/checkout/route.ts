import { NextRequest, NextResponse } from "next/server";
import { getStripe, getSiteUrl } from "@/lib/stripe";
import { findById } from "@/data/products";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const productId = String(form.get("productId"));
  const p = findById(productId);

  if (!p) return NextResponse.json({ error: "Invalid product" }, { status: 400 });
  if (p.disabled) return NextResponse.json({ error: "Product not available" }, { status: 400 });

  const stripe = getStripe();
  const siteUrl = getSiteUrl();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "cad",
          unit_amount: p.priceCents,
          product_data: { name: p.name, images: [`${siteUrl}${p.image}`] },
        },
        quantity: 1,
      },
    ],
    success_url: `${siteUrl}/shop?success=1`,
    cancel_url: `${siteUrl}/products/${p.slug}?canceled=1`,
  });

  return NextResponse.redirect(session.url!, { status: 303 });
}