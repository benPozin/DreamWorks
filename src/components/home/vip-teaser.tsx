"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VipTeaser() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[28px] noise"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 25% 15%, #1C1917 0%, #0C0A09 70%)",
        }}
      >
        <div
          className="absolute -top-32 -right-32 size-[420px] rounded-full opacity-35 drift-slow pointer-events-none"
          style={{
            background: "radial-gradient(circle, #D4A017 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />
        <div className="absolute inset-2 rounded-[24px] border border-vip-gold/15 pointer-events-none" />

        <div className="relative px-8 py-14 sm:px-14 sm:py-20 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-vip-gold font-semibold">
            <span className="h-px w-6 bg-vip-gold/50" />
            VIP Custom Cases
            <span className="h-px w-6 bg-vip-gold/50" />
          </span>

          <h2 className="mt-7 font-display text-[40px] sm:text-[64px] tracking-[-0.025em] leading-[1.0] text-vip-fg">
            Where craftsmanship
            <br />
            <span className="font-serif italic font-light champagne-text">meets individuality.</span>
          </h2>

          <p className="mt-6 mx-auto max-w-xl text-base sm:text-lg text-vip-fg-muted leading-relaxed">
            24K and 18K gold, jeweler-grade detail, and one-of-one cases — built on request.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="vip" size="lg">
              <Link href="/vip">
                Enter the VIP suite
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="vipOutline" size="lg">
              <Link href="/contact">Contact lab manager</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
