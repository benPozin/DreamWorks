"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const wordVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 0.2 + i * 0.05, duration: 0.85, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Hero() {
  const words = ["Precision", "dental", "craftsmanship,", "by", "design."];

  return (
    <section className="relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 dot-bg" />
        {/* Gradient removed — was fading the Cormorant descender */}
      </div>

      <div className="relative mx-auto max-w-5xl px-6 pt-[4.5rem] pb-16 sm:pt-[6.5rem] sm:pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-fg-subtle font-semibold"
        >
          <span className="h-px w-6 bg-fg-subtle/50" />
          A Florida dental laboratory
          <span className="h-px w-6 bg-fg-subtle/50" />
        </motion.div>

        {/* Line 1: sans-serif words */}
        <div className="mt-6 font-display text-[52px] sm:text-[80px] lg:text-[104px] tracking-[-0.04em] leading-[1.05] text-fg">
          {["Precision", "dental", "craftsmanship,"].map((w, i) => (
            <motion.span
              key={w}
              initial="hidden"
              animate="show"
              variants={wordVariants}
              custom={i}
              className="inline-block mr-[0.18em]"
            >
              {w}
            </motion.span>
          ))}
        </div>

        {/* Line 2: z-index above the gradient overlay so descender is never faded out */}
        <div className="relative z-10 overflow-visible font-display text-[52px] sm:text-[80px] lg:text-[104px] tracking-[-0.04em] leading-[1.15] text-fg mt-0 pb-[.08em]">
          <motion.span
            initial="hidden"
            animate="show"
            variants={wordVariants}
            custom={3}
            className="inline-block mr-[0.18em] font-serif italic font-light text-fg-muted"
          >
            by
          </motion.span>
          <motion.span
            initial="hidden"
            animate="show"
            variants={wordVariants}
            custom={4}
            className="inline-block font-serif italic font-light blue-text"
          >
            design.
          </motion.span>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7 }}
          className="mx-auto mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-fg-muted"
        >
          Crowns, implants, and one-of-one VIP gold work — finished by hand, shipped on schedule.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Button asChild variant="primary" size="lg" className="h-14 px-10 text-[15px]">
            <Link href="/signup">
              Open a lab account
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="lg" className="h-14 px-10 text-[15px]">
            <Link href="/shop">Browse services →</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
