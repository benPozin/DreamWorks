"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VipTeaser() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-8 sm:py-10">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-[28px] noise"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 10%, #1C1917 0%, #0C0A09 70%)",
        }}
      >
        {/* Gold accents */}
        <div
          className="absolute -top-32 -right-32 size-[420px] rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, #D4A017 0%, transparent 65%)", filter: "blur(40px)" }}
        />
        <div
          className="absolute -bottom-40 -left-20 size-[360px] rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, #E7D7A1 0%, transparent 65%)", filter: "blur(40px)" }}
        />
        {/* Hairline frame */}
        <div className="absolute inset-2 rounded-[24px] border border-vip-gold/15 pointer-events-none" />

        <div className="relative grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-vip-gold/30 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-vip-gold font-semibold">
              <span className="size-1 rounded-full bg-vip-gold" />
              VIP Custom Cases
            </span>

            <h2 className="mt-5 font-serif italic font-light text-[38px] sm:text-5xl tracking-tight leading-none text-vip-fg">
              Where craftsmanship <span className="champagne-text not-italic font-normal">meets individuality.</span>
            </h2>

            <p className="mt-4 max-w-xl text-base sm:text-lg text-vip-fg-muted leading-relaxed">
              Elevate your dental experiences with our unparalleled services, meticulously
              tailored to the demands of our discerning clientele. Our skilled team crafts
              dental masterpieces, including the highest-quality golds and, when desired,
              jeweler-grade detail.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
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

          {/* "Specs" panel */}
          <div className="relative rounded-2xl border border-vip-gold/20 bg-vip-bg-elevated/60 backdrop-blur p-6">
            <div className="text-[10px] uppercase tracking-[0.22em] text-vip-gold font-semibold">Materials</div>
            <ul className="mt-4 space-y-3 text-sm text-vip-fg-muted">
              {["24K & 18K gold framework", "Premium zirconia layering", "Hand-finished lithium disilicate", "Optional jeweler collaborations"].map(
                (l) => (
                  <li key={l} className="flex items-start gap-2.5">
                    <span className="mt-1.5 size-1 rounded-full bg-vip-gold shrink-0" />
                    <span className="text-vip-fg">{l}</span>
                  </li>
                )
              )}
            </ul>
            <div className="mt-6 pt-5 border-t border-vip-gold/15">
              <div className="text-[10px] uppercase tracking-[0.22em] text-vip-gold font-semibold">Pricing</div>
              <p className="mt-2 text-sm text-vip-fg-muted leading-relaxed">
                For VIP pricing, please contact the lab manager directly.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
