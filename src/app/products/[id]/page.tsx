import { notFound } from "next/navigation";
import { findBySlug } from "@/data/products";
import Image from "next/image";

export default function ProductPage({ params }: { params: { slug: string }}) {
  const p = findBySlug(params.slug);
  if (!p) return notFound();

  if (p.disabled) {
    return (
      <div className="py-10 space-y-4">
        <h1 className="text-3xl font-semibold">{p.name}</h1>
        <div className="relative aspect-square rounded-xl overflow-hidden border max-w-lg">
          <Image src={p.image} alt={p.name} fill className="object-cover" />
        </div>
        <p className="text-slate-700">🚧 Services are still in development — please check back soon.</p>
      </div>
    );
  }

  return (
    <div className="py-10 grid md:grid-cols-2 gap-10">
      <div className="relative aspect-square rounded-xl overflow-hidden border">
        <Image src={p.image} alt={p.name} fill className="object-cover" />
      </div>
      <div>
        <h1 className="text-3xl font-semibold">{p.name}</h1>
        <div className="text-slate-700 mt-2">${(p.priceCents/100).toFixed(2)} CAD</div>
        <p className="mt-4 text-slate-700">{p.description}</p>
        {p.specs?.length ? <ul className="mt-3 list-disc pl-5">{p.specs.map(s => <li key={s}>{s}</li>)}</ul> : null}
        <div className="mt-6">
          <form action="/api/checkout" method="post">
            <input type="hidden" name="productId" value={p.id} />
            <button className="rounded-lg px-5 py-3 bg-brand-500 text-white hover:bg-brand-600">Buy now</button>
          </form>
        </div>
      </div>
    </div>
  );
}