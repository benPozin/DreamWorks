"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Phone, Diamond } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MeshBg } from "@/components/site/mesh-bg";

const materials = [
  { title: "24K & 18K Gold Frameworks", body: "Cast, milled, or pressed in karats specified by case." },
  { title: "Premium Zirconia Layering", body: "Multi-layer translucency tuned per anterior position." },
  { title: "Hand-Finished Lithium Disilicate", body: "Press, layer, glaze. Finished by a single technician." },
  { title: "Jeweler Collaborations", body: "When the case demands more than dental can deliver." },
];

const philosophy = [
  { kicker: "01", title: "Bespoke from intake", body: "VIP cases are scoped over a call. No checkout boxes. Your designer learns the vision first." },
  { kicker: "02", title: "One technician, one case", body: "Your case is assigned to a single master technician from intake to final polish. No baton passes." },
  { kicker: "03", title: "Quiet by design", body: "VIP pricing isn't published. Cases aren't catalogued. Discretion is the standard, not the upgrade." },
];

export default function VipPage() {
  return (
    <div className="bg-vip-bg text-vip-fg -mx-6 sm:-mx-0 noise relative">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-24 sm:pt-44 sm:pb-32">
        <MeshBg variant="vip" />
        {/* Hairline frame */}
        <div className="absolute inset-x-6 top-24 sm:top-32 bottom-12 rounded-[28px] border border-vip-gold/15 pointer-events-none" />

        <div className="relative mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-vip-gold/40 bg-vip-bg-elevated/60 backdrop-blur px-3.5 py-1.5 text-[10px] uppercase tracking-[0.24em] text-vip-gold font-semibold"
          >
            <Diamond className="size-3" />
            Custom VIP Cases
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 font-serif italic font-light text-6xl sm:text-8xl lg:text-[120px] tracking-[-0.025em] leading-[0.95] max-w-5xl"
          >
            Where craftsmanship
            <br />
            <span className="champagne-text not-italic font-normal">meets individuality.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-9 max-w-2xl text-lg sm:text-xl text-vip-fg-muted leading-relaxed"
          >
            Welcome to our exclusive realm of craftsmanship. Elevate your dental experiences
            with our unparalleled services, meticulously tailored to the unique demands of
            our discerning clientele.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Button asChild variant="vip" size="lg">
              <Link href="/contact">
                Contact lab manager
                <ArrowUpRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="vipOutline" size="lg">
              <a href="tel:+10000000000">
                <Phone className="size-4" />
                (000) 000-0000
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="relative mx-auto max-w-6xl px-6 py-20 sm:py-32">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="font-serif italic font-light text-4xl sm:text-6xl tracking-tight leading-[1.05] max-w-3xl"
        >
          Our skilled team dedicates themselves to crafting <span className="champagne-text not-italic font-normal">dental masterpieces.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mt-8 max-w-2xl text-lg text-vip-fg-muted leading-relaxed"
        >
          In our pursuit of perfection, we offer the option of utilizing the highest-quality
          golds, and for those seeking more, we will go as far as working alongside seasoned
          jewelers. Your vision is our canvas, and we take pride in transforming it into a
          bespoke reality.
        </motion.p>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {philosophy.map((p, i) => (
            <motion.div
              key={p.kicker}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="relative pl-6 border-l border-vip-gold/25"
            >
              <div className="text-[10px] uppercase tracking-[0.28em] text-vip-gold font-bold">
                {p.kicker}
              </div>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-vip-fg-muted">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Materials grid */}
      <section className="relative mx-auto max-w-6xl px-6 py-20 sm:py-32">
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-vip-gold font-bold">
            <span className="size-1 rounded-full bg-vip-gold" />
            Materials
          </div>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl tracking-tight max-w-2xl">
            We work in <span className="champagne-text font-serif italic font-light">whatever the case demands.</span>
          </h2>
        </div>
        <div className="grid gap-px overflow-hidden rounded-2xl border border-vip-gold/15 bg-vip-gold/15 sm:grid-cols-2 lg:grid-cols-4">
          {materials.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="bg-vip-bg p-7 hover:bg-vip-bg-elevated transition-colors"
            >
              <div className="flex size-9 items-center justify-center rounded-lg border border-vip-gold/30 bg-vip-gold/5">
                <Diamond className="size-4 text-vip-gold" strokeWidth={1.5} />
              </div>
              <h3 className="mt-5 font-display text-base font-semibold tracking-tight text-vip-fg">{m.title}</h3>
              <p className="mt-1.5 text-sm text-vip-fg-muted leading-relaxed">{m.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Closing CTA — pricing note */}
      <section className="relative mx-auto max-w-6xl px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl border border-vip-gold/25 p-10 sm:p-16"
          style={{ background: "linear-gradient(135deg, #1C1917 0%, #0C0A09 100%)" }}
        >
          <div
            className="absolute -top-24 -right-24 size-[360px] rounded-full opacity-30 pointer-events-none"
            style={{ background: "radial-gradient(circle, #D4A017 0%, transparent 65%)", filter: "blur(50px)" }}
          />
          <div className="relative grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-center">
            <div>
              <h2 className="font-serif italic font-light text-4xl sm:text-5xl tracking-tight leading-[1.05]">
                For prices in the VIP section, <br className="hidden sm:block" />
                <span className="champagne-text not-italic font-normal">contact the lab manager.</span>
              </h2>
              <p className="mt-5 max-w-xl text-vip-fg-muted leading-relaxed">
                Choose our Custom VIP Cases for a dental journey that reflects luxury and precision.
              </p>
            </div>
            <div className="rounded-2xl border border-vip-gold/25 bg-vip-bg-elevated/80 backdrop-blur p-7">
              <div className="text-[10px] uppercase tracking-[0.24em] text-vip-gold font-bold">
                Direct line
              </div>
              <a href="tel:+10000000000" className="mt-3 inline-flex items-center gap-3 group">
                <span className="flex size-10 items-center justify-center rounded-full bg-vip-gold text-vip-bg">
                  <Phone className="size-4" />
                </span>
                <span className="font-display text-2xl font-semibold tracking-tight text-vip-fg group-hover:text-vip-gold transition-colors">
                  (000) 000-0000
                </span>
              </a>
              <p className="mt-3 text-xs text-vip-fg-muted leading-relaxed">
                Lab manager · weekdays 9am–5pm ET
              </p>
              <div className="mt-6 pt-5 border-t border-vip-gold/15 flex items-center justify-between">
                <span className="text-xs text-vip-fg-muted">Or write to us</span>
                <a
                  href="mailto:vip@dreamworksdental.com"
                  className="text-xs text-vip-gold hover:text-vip-champagne inline-flex items-center gap-1 transition-colors"
                >
                  vip@dreamworksdental.com
                  <ArrowUpRight className="size-3" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
