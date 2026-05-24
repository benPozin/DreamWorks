"use client";

import { motion } from "motion/react";

const steps = [
  {
    title: "Submit",
    body: "Upload your scan, mark teeth, pick a shade. Under two minutes.",
  },
  {
    title: "Design",
    body: "Our designer reviews, and reaches out if anything is unclear.",
  },
  {
    title: "Craft",
    body: "Milled, finished, and quality-checked by hand against your prescription.",
  },
  {
    title: "Ship",
    body: "Tracked delivery. Rush options for cases that can't wait.",
  },
];

export function Process() {
  return (
    /* Full-bleed navy section */
    <section
      id="process"
      className="relative w-full bg-primary py-24 sm:py-32 overflow-hidden"
    >
      {/* Subtle top/bottom edge fade lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="pb-10 border-b border-white/15">
          <div className="text-[11px] uppercase tracking-[0.24em] text-white/50 font-semibold">
            02 — How it works
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 font-display text-[40px] sm:text-[56px] tracking-[-0.03em] leading-[1.0] text-white max-w-3xl"
          >
            Four steps,{" "}
            <span className="font-serif italic font-light text-white/50">
              end to end.
            </span>
          </motion.h2>
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 pt-14">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="font-display text-[64px] font-light text-blue/50 tracking-tight tabular-nums leading-none">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-white">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-white/55 leading-relaxed max-w-[300px]">
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
