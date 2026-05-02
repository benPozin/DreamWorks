"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MeshBg } from "@/components/site/mesh-bg";

const wordVariants = (_word: string) => ({
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 0.3 + i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  }),
});

export function Hero() {
  const headline = ["Precision", "dental", "craftsmanship,", "by", "design."];

  return (
    <section className="relative overflow-hidden pt-20 pb-10 sm:pt-24 sm:pb-14">
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />
      <MeshBg />
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-blue/20 bg-blue-haze/80 backdrop-blur px-3.5 py-1.5 text-xs font-medium text-blue-deep"
        >
          <span className="size-1.5 rounded-full bg-blue animate-pulse" />
          Now accepting new dental practices
        </motion.div>

        <h1 className="mt-5 font-display text-5xl sm:text-7xl lg:text-[80px] tracking-[-0.03em] leading-[0.98] text-fg max-w-4xl">
          {headline.map((w, i) => (
            <motion.span
              key={`${w}-${i}`}
              initial="hidden"
              animate="show"
              variants={wordVariants(w)}
              custom={i}
              className="inline-block mr-[0.25em]"
            >
              {i === headline.length - 1 ? <span className="blue-text italic font-serif font-light">{w}</span> : w}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-fg-muted"
        >
          A Florida-based lab and a high-quality option for all your dental needs. With over 30 years of dedicated
          experience, DreamWorks delivers personalized service tailored to dental
          professionals, handling routine cases or urgent rush orders with the same care.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.6 }}
          className="mt-7 flex flex-wrap items-center gap-3"
        >
          <Button asChild variant="primary" size="lg">
            <Link href="/signup">
              Open a lab account
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/shop">Browse services</Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="mt-10 grid gap-4 sm:grid-cols-3"
        >
          <FeatureCard
            icon={<Clock className="size-5" />}
            title="Rush turnaround"
            body="Need it tomorrow? We move with you. Add a rush at checkout for priority handling."
          />
          <FeatureCard
            icon={<ShieldCheck className="size-5" />}
            title="30 years of trust"
            body="Three decades quietly serving dental practices that don't tolerate rework."
          />
          <FeatureCard
            icon={<Sparkles className="size-5" />}
            title="VIP craftsmanship"
            body="Gold work, jeweler-grade detail, and one-of-one cases, built on request."
            accent
          />
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  body,
  accent = false,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  accent?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group relative rounded-2xl glass p-5"
    >
      <div className="flex items-center justify-between">
        <div className={`flex size-10 items-center justify-center rounded-xl ${accent ? "bg-vip-bg text-vip-gold" : "bg-blue text-white"}`}>
          {icon}
        </div>
        {accent && (
          <span className="text-[10px] uppercase tracking-[0.2em] text-vip-gold font-semibold">VIP</span>
        )}
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-1.5 text-sm text-fg-muted leading-relaxed">{body}</p>
    </motion.div>
  );
}
