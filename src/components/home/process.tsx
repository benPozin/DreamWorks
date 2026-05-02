"use client";

import { motion } from "motion/react";
import { Section, SectionHeading } from "@/components/site/section";
import { FilePlus2, ScanLine, Hammer, Truck } from "lucide-react";

const steps = [
  {
    icon: FilePlus2,
    title: "Submit the case",
    body: "Upload your 3D scan, mark the teeth, pick a shade, set a due date. Less than two minutes.",
  },
  {
    icon: ScanLine,
    title: "We design it",
    body: "Our designer reviews, and reaches out directly if anything is unclear before milling begins.",
  },
  {
    icon: Hammer,
    title: "We craft it",
    body: "Milled, finished, and quality-checked by hand against your prescription before it leaves the lab.",
  },
  {
    icon: Truck,
    title: "Shipped to your chair",
    body: "Tracked delivery with rush options for cases that can't wait.",
  },
];

export function Process() {
  return (
    <Section id="process" className="py-8! sm:py-10!">
      <SectionHeading
        eyebrow="How it works"
        title="A frictionless lab, end to end."
        description="From scan upload to seated restoration. The same four steps for every case, VIP or routine."
      />

      <div className="mt-10 relative">
        {/* connector line */}
        <div className="hidden lg:block absolute left-0 right-0 top-7 h-px bg-linear-to-r from-transparent via-border to-transparent" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="relative z-10 flex size-14 items-center justify-center rounded-2xl bg-white border border-border shadow-[0_8px_20px_-12px_rgba(15,39,70,0.18)]">
                <s.icon className="size-6 text-blue" strokeWidth={1.5} />
                <span className="absolute -top-2 -right-2 size-6 rounded-full bg-blue text-white text-[10px] font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-1.5 text-sm text-fg-muted leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
