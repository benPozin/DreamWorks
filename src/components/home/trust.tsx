"use client";

import { motion } from "motion/react";
import { Quote } from "lucide-react";

const stats = [
  { value: "30+", label: "Years in practice" },
  { value: "12k+", label: "Cases shipped annually" },
  { value: "<24h", label: "Rush turnaround" },
  { value: "98%", label: "Doctor retention" },
];

const featured = {
  quote:
    "Their exceptional craftsmanship and attention to detail have helped us create some of the most stunning smiles our patients have ever seen. I trust DreamWorks to bring my vision for my patients' smiles to life every time.",
  practice: "Davie Designer Dental",
  location: "South Florida",
  image: "/testimonials/davie-designer-dental.png",
};

export function Trust() {
  return (
    /* Full-bleed soft blue-tinted section */
    <section
      id="trust"
      className="relative w-full bg-blue-haze py-24 sm:py-32 overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-blue/10" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-blue/10" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="pb-10 border-b border-blue/15">
          <div className="text-[11px] uppercase tracking-[0.24em] text-fg-subtle font-semibold">
            03 — Standards
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 font-display text-[40px] sm:text-[56px] tracking-[-0.03em] leading-[1.0] text-fg max-w-3xl"
          >
            Three decades,{" "}
            <span className="font-serif italic font-light text-fg-muted">
              one standard.
            </span>
          </motion.h2>
        </div>

        {/* Stat strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 mt-14">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.07, duration: 0.6 }}
              className={`px-4 py-6 sm:px-8 ${
                i > 0 ? "lg:border-l border-blue/15" : ""
              } ${i % 2 === 1 ? "border-l border-blue/15 lg:border-l" : ""}`}
            >
              <div className="font-display text-[56px] sm:text-[72px] font-light text-fg tabular-nums tracking-[-0.04em] leading-none">
                {s.value}
              </div>
              <div className="mt-3 text-xs sm:text-sm text-fg-subtle uppercase tracking-[0.12em]">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Editorial pull quote */}
        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 mx-auto max-w-3xl text-center"
        >
          <Quote className="mx-auto size-7 text-blue/40" strokeWidth={1.4} />
          <blockquote className="mt-6 font-serif italic text-2xl sm:text-[32px] leading-[1.3] text-fg font-light tracking-tight">
            "{featured.quote}"
          </blockquote>
          <figcaption className="mt-8 inline-flex items-center gap-3">
            <img
              src={featured.image}
              alt={`${featured.practice} team`}
              className="size-10 rounded-full object-cover border border-blue/20"
            />
            <div className="text-left">
              <div className="font-display text-sm font-semibold tracking-tight text-fg">
                {featured.practice}
              </div>
              <div className="text-xs text-fg-subtle">{featured.location}</div>
            </div>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
