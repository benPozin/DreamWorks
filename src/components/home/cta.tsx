"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/contact";

export function CTA() {
  const primaryLine = CONTACT.emergencyPhones[0];
  return (
    <section className="relative mx-auto max-w-6xl px-6 pt-8 sm:pt-10 pb-16 sm:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-3xl border border-blue/20 bg-linear-to-br from-blue-haze via-white to-blue-tint p-8 sm:p-12 noise"
      >
        <div
          className="absolute -top-40 -right-40 size-[420px] rounded-full opacity-40 pointer-events-none"
          style={{ background: "radial-gradient(circle, #2D6FC9 0%, transparent 65%)", filter: "blur(50px)" }}
        />

        <div className="relative grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div>
            <h2 className="pb-[0.04em] font-display text-4xl sm:text-5xl tracking-tight leading-[1.05]">
              Ready to send us your{" "}
              <span className="blue-text inline-block pr-[0.14em] font-serif italic font-light">
                first case?
              </span>
            </h2>
            <p className="mt-4 max-w-xl text-fg-muted leading-relaxed">
              Open an account in under a minute. Pricing visible the moment you&apos;re verified,
              and your first rush case is on us.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild variant="primary" size="lg">
                <Link href="/signup">
                  Open lab account
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Talk to a human</Link>
              </Button>
            </div>
          </div>

          <div className="relative rounded-2xl bg-white border border-border p-6 shadow-[0_24px_48px_-24px_rgba(15,39,70,0.18)]">
            <div className="text-[10px] uppercase tracking-[0.22em] text-blue font-semibold">
              Rush case line
            </div>
            <a href={`tel:${primaryLine?.tel ?? "+10000000000"}`} className="mt-3 inline-flex items-center gap-3 group">
              <span className="flex size-10 items-center justify-center rounded-full bg-blue text-white">
                <Phone className="size-4" />
              </span>
              <span className="font-display text-2xl font-semibold tracking-tight text-fg group-hover:text-blue transition-colors">
                {primaryLine?.display ?? "(000) 000-0000"}
              </span>
            </a>
            <p className="mt-3 text-xs text-fg-subtle leading-relaxed">
              Mon–Fri · 7am–7pm ET. Saturday rush slots available by request.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
