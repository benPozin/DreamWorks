"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/site/section";
import { cn } from "@/lib/utils";

const services = [
  {
    name: "Crowns & Bridges",
    materials: "Zirconia · e.max · PFM",
    description: "Single units and bridgework. Our flagship category.",
    available: true,
    shopCategory: "Crown & Bridge",
  },
  {
    name: "Implants",
    materials: "Custom abutments · Screw-retained",
    description: "Custom abutments and screw-retained restorations.",
    available: true,
    shopCategory: "Implants",
  },
  {
    name: "Milling",
    materials: "Premium origin zirconia",
    description: "Milled to your spec. From $25.",
    available: true,
    shopCategory: "Milling",
  },
  {
    name: "Removables",
    materials: "Metal · Flex frames",
    description: "Partials and full dentures.",
    available: false,
    shopCategory: "Removables",
  },
];

export function Services() {
  return (
    <Section id="services" className="py-24! sm:py-32!">
      {/* Editorial header — eyebrow, line, title */}
      <div className="flex items-baseline justify-between gap-8 pb-10 border-b border-border">
        <div>
          <div className="text-[11px] uppercase tracking-[0.24em] text-fg-subtle font-semibold">
            01 — Catalog
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 font-display text-[40px] sm:text-[56px] tracking-[-0.03em] leading-[1.0] text-fg max-w-3xl"
          >
            Services <span className="font-serif italic font-light text-fg-muted">tailored to</span> your case.
          </motion.h2>
        </div>
        <Link
          href="/shop"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-fg-muted hover:text-fg transition-colors group shrink-0"
        >
          Full catalog
          <ArrowUpRight className="size-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      {/* Editorial list — divided rows, hairline borders */}
      <div className="divide-y divide-border">
        {services.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <ServiceRow service={s} />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function ServiceRow({ service }: { service: (typeof services)[number] }) {
  return (
    <Link
      href={service.available ? `/shop?category=${encodeURIComponent(service.shopCategory)}` : "#"}
      className={cn(
        "group grid grid-cols-12 items-center gap-4 py-7 sm:py-9 transition-colors",
        service.available ? "hover:bg-bg-muted/40" : "pointer-events-none opacity-50"
      )}
    >
      <div className="col-span-12 sm:col-span-1 text-[11px] uppercase tracking-[0.22em] text-fg-subtle font-semibold tabular-nums">
        {String(services.indexOf(service) + 1).padStart(2, "0")}
      </div>
      <div className="col-span-12 sm:col-span-4">
        <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-fg leading-tight">
          {service.name}
        </h3>
      </div>
      <div className="col-span-12 sm:col-span-3 text-sm text-fg-subtle font-medium">
        {service.materials}
      </div>
      <div className="col-span-12 sm:col-span-3 text-sm text-fg-muted">
        {service.description}
      </div>
      <div className="col-span-12 sm:col-span-1 flex justify-start sm:justify-end">
        {service.available ? (
          <span className="inline-flex size-9 items-center justify-center rounded-full border border-border-strong text-fg-subtle group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
            <ArrowUpRight className="size-4 group-hover:rotate-12 transition-transform" />
          </span>
        ) : (
          <span className="text-[10px] uppercase tracking-[0.22em] text-fg-subtle font-semibold">
            Soon
          </span>
        )}
      </div>
    </Link>
  );
}
