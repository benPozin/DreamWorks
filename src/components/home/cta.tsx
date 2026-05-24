"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/contact";

export function CTA() {
  const primaryLine = CONTACT.emergencyPhones[0];
  return (
    <section className="relative mx-auto max-w-5xl px-6 py-32 sm:py-40 text-center">
      <div className="absolute inset-x-0 top-0 hairline" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-fg-subtle font-semibold">
          <span className="h-px w-6 bg-fg-subtle/50" />
          Now onboarding
          <span className="h-px w-6 bg-fg-subtle/50" />
        </div>

        <h2 className="mt-7 font-display text-[44px] sm:text-[72px] lg:text-[88px] tracking-[-0.035em] leading-[0.98] text-fg">
          Send us your{" "}
          <span className="blue-text font-serif italic font-light">first case.</span>
        </h2>

        <p className="mx-auto mt-7 max-w-xl text-base sm:text-lg text-fg-muted leading-relaxed">
          Open an account in under a minute. Pricing visible the moment you&apos;re verified.
          Your first rush case is on us.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="primary" size="lg">
            <Link href="/signup">
              Open lab account
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <Link href="/contact">Talk to a human →</Link>
          </Button>
        </div>

        {/* Subtle rush line, hairline-divided */}
        <div className="mt-14 inline-flex items-center gap-3 text-sm text-fg-subtle">
          <span className="h-px w-8 bg-border-strong" />
          <span className="uppercase tracking-[0.2em] text-[11px] font-semibold text-fg-subtle">
            Rush line
          </span>
          <a
            href={`tel:${primaryLine?.tel ?? "+10000000000"}`}
            className="font-display tabular-nums text-fg hover:text-blue transition-colors text-[15px] font-semibold tracking-tight"
          >
            {primaryLine?.display ?? "(000) 000-0000"}
          </a>
          <span className="h-px w-8 bg-border-strong" />
        </div>
      </motion.div>
    </section>
  );
}
