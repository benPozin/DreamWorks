export type Product = {
  id: string;
  slug: string;
  name: string;
  priceCents: number;
  currency: "CAD";
  description: string;
  specs?: string[];
  image: string;
  disabled?: boolean; // marks “coming soon”
};

export const products: Product[] = [
  {
    id: "resin-model-grey",
    slug: "resin-model-grey",
    name: "3D Printing Resin — Model (Grey)",
    priceCents: 3999,
    currency: "CAD",
    description: "Reliable, lab-tested grey resin ideal for model work; crisp detail and easy finishing.",
    specs: ["1 L bottle", "Low odor", "Fast cure"],
    image: "/products/resin-grey.png",
  },
  {
    id: "resin-surgical-clear",
    slug: "resin-surgical-clear",
    name: "3D Printing Resin — Surgical Guide (Clear)",
    priceCents: 3999,
    currency: "CAD",
    description: "Clear resin for surgical guide applications. Review safety & cure specs before use.",
    specs: ["1 L bottle", "High transparency", "Post-cure required"],
    image: "/products/resin-grey.png",
  },
  {
    id: "brush-set-10",
    slug: "brush-set-10",
    name: "Lab Brush Set (Coming Soon)",
    priceCents: 0,
    currency: "CAD",
    description: "🚧 Services are still in development — check back soon.",
    image: "/products/brushes.png",
    disabled: true,
  },
];

export const findBySlug = (slug: string) => products.find(p => p.slug === slug);
export const findById = (id: string) => products.find(p => p.id === id);