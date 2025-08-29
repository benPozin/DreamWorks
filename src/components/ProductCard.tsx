import Image from "next/image";
import Link from "next/link";
import type { Product } from "../data/products"; // ← switched to reliable relative path

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
  const price =
    typeof p.priceCents === "number" ? fmtCAD.format(p.priceCents / 100) : null;

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
          {p.name}
        </h3>
        {!p.disabled && price && (
          <p className="mt-1 text-brand-600 font-semibold">{price}</p>
        )}
      </div>

      {/* Full-card link (disabled products are not clickable) */}
      {!p.disabled && (
        <Link
          href={`/products/${p.slug}`}
          className="absolute inset-0"
          aria-label={p.name}
        />
      )}
    </div>
  );
}