import ProductCard from "./ProductCard";
import { products } from "@/data/products"; // ← switched to reliable relative path

export default function ProductGrid() {
  // Optional safety: avoid crashing if products fails to load
  const list = Array.isArray(products) ? products : [];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((p, i) => (
        <ProductCard key={p.id} p={p} priority={i === 0} />
      ))}
    </div>
  );
}