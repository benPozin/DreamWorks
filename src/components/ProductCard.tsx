"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "../data/products"; // keep this path as you wrote

const fmtCAD = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 2,
});

export default function ProductCard({
  p,
  priority = false,
}: {
  p: Product;
  priority?: boolean;
}) {
  const [loading, setLoading] = useState(false);

  const price =
    typeof p.priceCents === "number" ? fmtCAD.format(p.priceCents / 100) : null;

  async function startCheckout() {
    try {
      setLoading(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: p.id, quantity: 1 }),
      });
      const data = await res.json();
      if (!res.ok || !data?.url) throw new Error(data?.error || "Checkout failed");
      window.location.href = data.url; // Redirect to Stripe hosted Checkout
    } catch (e) {
      console.error(e);
      alert("Could not start checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-white shadow-[0_10px_25px_-12px_rgba(0,0,0,0.12)] transition">
      {/* Media */}
      <div className="relative aspect-square bg-[var(--color-surface)]">
        <Image
          src={p.image}
          alt={p.name}
          fill
          sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          priority={priority}
        />
        {p.disabled && (
          <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur border px-2.5 py-1 text-[11px] font-medium">
            Services are still in development
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-medium leading-tight group-hover:text-brand-600">
          <Link href={`/products/${p.slug}`} aria-label={p.name}>
            {p.name}
          </Link>
        </h3>

        {!p.disabled && price && (
          <p className="mt-1 text-brand-600 font-semibold">{price}</p>
        )}

        {/* Actions */}
        <div className="mt-3 flex gap-2">
          <Link
            href={`/products/${p.slug}`}
            className="flex-1 rounded-lg border px-3 py-2 text-center hover:bg-black/5"
            aria-label={`View ${p.name}`}
          >
            View
          </Link>

          <button
            onClick={startCheckout}
            disabled={p.disabled || loading}
            className="flex-1 rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
            aria-label={`Buy ${p.name} now`}
          >
            {p.disabled ? "Coming soon" : loading ? "Loading..." : "Buy now"}
          </button>
        </div>
      </div>
    </div>
  );
}
