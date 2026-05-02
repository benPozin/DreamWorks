"use client";

import { motion } from "motion/react";
import { PageHeader } from "@/components/site/page-header";
import { Section, SectionHeading } from "@/components/site/section";
import { Award, HandHeart, Microscope, Hammer } from "lucide-react";

const values = [
  {
    icon: Hammer,
    title: "Craftsmanship first",
    body: "Every restoration finished by hand. Margins seated under loupes before a single case ships.",
  },
  {
    icon: Microscope,
    title: "Modern tooling",
    body: "5-axis milling, in-house design, and zirconia we trust enough to use on our own families.",
  },
  {
    icon: HandHeart,
    title: "Direct line to your designer",
    body: "When something is unclear, we call. Your case never sits in a queue waiting on guesswork.",
  },
  {
    icon: Award,
    title: "Built on referrals",
    body: "98% of our practices have been with us for over five years. We earn that quietly.",
  },
];

const timeline = [
  { year: "1995", title: "Founded as a two-chair lab", body: "A father, a son, and a 200 sq ft start in South Florida." },
  { year: "2003", title: "First in-house CAD/CAM", body: "Moved from waxing to digital design, without losing the hand finish." },
  { year: "2014", title: "VIP Custom Cases launched", body: "A premium line for cosmetic dentists demanding jeweler-grade detail." },
  { year: "2024", title: "30 years, same standard", body: "Three decades rooted in Florida, trusted by practices coast to coast — one quiet promise: it fits the first time." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        compact
        eyebrow="About"
        title={
          <>
            A lab built for dentists who <span className="blue-text font-serif italic font-light">don&apos;t compromise.</span>
          </>
        }
        description="DreamWorks Dental Laboratories is a full-service dental lab. Three decades. One workshop. One standard."
      />

      <Section className="py-8! sm:py-10!">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="The story"
              title="Thirty years of one promise: it fits."
              description="We don't outsource. We don't subcontract. Every case is designed, milled, and finished in our Florida workshop by people who've been doing this longer than most dentists have been in practice."
            />
            <p className="mt-6 text-fg-muted leading-relaxed">
              We work with general dentists, cosmetic specialists, prosthodontists, and
              implant surgeons throughout Florida and across the country. The cases we love most are the ones other
              labs send back: the patient with a difficult occlusion, the anterior fracture
              that needs to be done by tomorrow, the VIP case that has to feel inevitable.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[28px] bg-gradient-to-br from-blue-tint via-white to-blue-haze -z-10" />
            <div className="rounded-2xl border border-border bg-white p-8 shadow-[0_24px_48px_-24px_rgba(15,39,70,0.18)]">
              <ol className="space-y-7 relative">
                <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border" />
                {timeline.map((t, i) => (
                  <motion.li
                    key={t.year}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="relative flex gap-5 pl-1"
                  >
                    <div className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-white border-2 border-blue text-blue text-xs font-bold">
                      {t.year.slice(2)}
                    </div>
                    <div className="pt-1">
                      <div className="text-xs uppercase tracking-[0.18em] text-blue font-semibold">
                        {t.year}
                      </div>
                      <h3 className="mt-1 font-display text-base font-semibold tracking-tight">
                        {t.title}
                      </h3>
                      <p className="mt-1 text-sm text-fg-muted leading-relaxed">{t.body}</p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </Section>

      <Section className="py-8! sm:py-10!">
        <SectionHeading eyebrow="What we believe" title="Four things we won't compromise on." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="rounded-2xl border border-border bg-white p-6 hover:border-blue/40 transition-colors"
            >
              <div className="flex size-10 items-center justify-center rounded-xl bg-blue-haze">
                <v.icon className="size-5 text-blue" strokeWidth={1.7} />
              </div>
              <h3 className="mt-5 font-display text-base font-semibold tracking-tight">{v.title}</h3>
              <p className="mt-1.5 text-sm text-fg-muted leading-relaxed">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  );
}
