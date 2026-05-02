"use client";

import { motion } from "motion/react";
import { Section, SectionHeading } from "@/components/site/section";
import { Quote, Star } from "lucide-react";

const stats = [
  { value: "30+", label: "Years in practice" },
  { value: "12k+", label: "Cases shipped annually" },
  { value: "<24h", label: "Rush case turnaround" },
  { value: "98%", label: "Doctor retention" },
];

// One real testimonial — additional quotes added as the lab procures them.
const featured = {
  quote:
    "As the owner of Davie Designer Dental, South Florida's premier cosmetic and implant center, I have had the pleasure of partnering with DreamWorks Dental Lab for many years. Their exceptional craftsmanship and attention to detail have helped us create some of the most stunning smiles our patients have ever seen. The communication with their team is seamless, and their customer service is top-notch. They consistently deliver high-quality work at affordable prices, making them an indispensable part of our practice. I trust DreamWorks to bring my vision for my patients' smiles to life every time!",
  practice: "Davie Designer Dental",
  location: "Florida",
  image: "/testimonials/davie-designer-dental.png",
};

export function Trust() {
  return (
    <Section id="trust" className="py-8! sm:py-10!">
      <SectionHeading
        eyebrow="Trusted by practices nationwide"
        title="Three decades, one standard."
      />

      <div className="mt-9 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            className="bg-white p-6"
          >
            <div className="font-display text-4xl font-semibold tracking-tight text-fg">
              {s.value}
            </div>
            <div className="mt-1 text-sm text-fg-muted">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <motion.figure
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-10 overflow-hidden rounded-2xl border border-border bg-white"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue/40 to-transparent" />
        <div className="relative grid gap-7 p-6 sm:p-8 lg:grid-cols-[280px_1fr] lg:gap-10 lg:items-center">
          <div className="flex flex-col items-center lg:items-stretch">
            <div className="aspect-4/5 w-full max-w-[280px] shrink-0 overflow-hidden rounded-2xl border border-border bg-bg-muted lg:max-w-none">
              <img
                src={featured.image}
                alt={`${featured.practice} team`}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="mt-4 flex items-center gap-1 text-blue">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </div>
            <div className="mt-2 text-[10px] uppercase tracking-[0.22em] text-fg-subtle font-semibold">
              Client testimonial
            </div>
          </div>
          <div>
            <Quote className="size-7 text-blue/30" />
            <blockquote className="mt-3 text-fg leading-relaxed text-lg sm:text-xl font-light">
              {featured.quote}
            </blockquote>
            <figcaption className="mt-7 flex items-center gap-4 pt-6 border-t border-border">
              <div>
                <div className="font-display text-base font-semibold tracking-tight">
                  {featured.practice}
                </div>
                <div className="text-xs text-fg-subtle mt-0.5">{featured.location}</div>
              </div>
            </figcaption>
          </div>
        </div>
      </motion.figure>
    </Section>
  );
}
