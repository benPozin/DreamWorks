"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/section";
import { cn } from "@/lib/utils";

const services = [
  {
    name: "Crowns & Bridges",
    description:
      "Single units and bridgework in zirconia, e.max, and PFM. Our flagship category.",
    available: true,
    featured: true,
    image: "/services/crown-bridge.png",
    shopCategory: "Crown & Bridge",
  },
  {
    name: "Implants",
    description: "Custom abutments and screw-retained restorations.",
    available: true,
    image: "/services/implants.png",
    shopCategory: "Implants",
  },
  {
    name: "Milling Services",
    description: "Crown: Premium Origin Zirconia. From $25.",
    available: true,
    image: "linear-gradient(135deg, #F4F7FB 0%, #1B5BAE 100%)",
    shopCategory: "Milling",
  },
  {
    name: "Removables",
    description: "Partials and full dentures with metal or flex frames.",
    available: false,
    image: "/services/removable.png",
    shopCategory: "Removables",
  },
];

export function Services() {
  return (
    <Section id="services" className="py-8! sm:py-10!">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Catalog"
          title={
            <>
              Services <span className="font-serif italic font-light text-fg-muted">tailored to</span> your case.
            </>
          }
          description="Sign in to view pricing. Rates are private to dental professionals only."
        />
        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-fg hover:text-blue transition-colors group self-start sm:self-end"
        >
          See full catalog
          <ArrowUpRight className="size-4 group-hover:rotate-12 transition-transform" />
        </Link>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {services.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <ServiceCard service={s} />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  return (
    <Link
      href={service.available ? `/shop?category=${encodeURIComponent(service.shopCategory)}` : "#"}
      className={cn(
        "group relative block overflow-hidden rounded-2xl border border-border bg-white transition-all hover:border-blue/40 hover:shadow-[0_24px_48px_-24px_rgba(15,39,70,0.18)]",
        service.featured && "ring-1 ring-blue/30",
        !service.available && "pointer-events-none opacity-60"
      )}
    >
      <div className="relative aspect-5/3 overflow-hidden">
        {service.image.startsWith("/") ? (
          <img
            src={service.image}
            alt={service.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
            style={{ background: service.image }}
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent" />
        {service.featured && (
          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-blue-deep font-semibold">
            <span className="size-1 rounded-full bg-blue" />
            Flagship
          </div>
        )}
        {!service.available && (
          <div className="absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-fg-subtle font-medium">
            Coming soon
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold tracking-tight">{service.name}</h3>
          {service.available && (
            <ArrowUpRight className="size-4 text-fg-subtle group-hover:text-blue group-hover:rotate-12 transition-all shrink-0 mt-1" />
          )}
        </div>
        <p className="mt-1 text-sm text-fg-muted leading-relaxed">{service.description}</p>
      </div>
    </Link>
  );
}
