"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, ChevronDown, AlertTriangle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/site/page-header";
import { Section } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { LockedPrice } from "@/components/site/locked-price";
import { SERVICES, type Service } from "@/lib/pricing";
import { cn } from "@/lib/utils";

const CATEGORY_DEFS: { id: Service["category"] | "All"; label: string; soon?: boolean }[] = [
  { id: "All", label: "All services" },
  { id: "Crown & Bridge", label: "Crown & Bridge" },
  { id: "Implants", label: "Implants" },
  { id: "AllOnX", label: "All-on-X" },
  { id: "Removables", label: "Removables" },
  { id: "Milling", label: "Milling Services" },
];

const SWATCHES: Record<Service["category"], string> = {
  "Crown & Bridge": "linear-gradient(135deg, #DDE9F8 0%, #2D6FC9 100%)",
  Implants: "linear-gradient(135deg, #EEF4FC 0%, #143D75 100%)",
  AllOnX: "linear-gradient(135deg, #1C3A66 0%, #0F2746 100%)",
  Removables: "linear-gradient(135deg, #F4F7FB 0%, #CBD7E6 100%)",
  Milling: "linear-gradient(135deg, #FFFFFF 0%, #1B5BAE 100%)",
  Resin: "linear-gradient(135deg, #EEF4FC 0%, #B6CDEC 100%)",
};

const CATEGORY_IMAGES: Partial<Record<Service["category"], string>> = {
  "Crown & Bridge": "/services/crown-bridge.png",
  Implants: "/services/implants.png",
  AllOnX: "/services/all-on-x.png",
  Removables: "/services/removable.png",
};

function ShopPageInner() {
  const sp = useSearchParams();
  const requestedCategory = sp.get("category");
  const initialCategory = CATEGORY_DEFS.some((c) => c.id === requestedCategory)
    ? (requestedCategory as (typeof CATEGORY_DEFS)[number]["id"])
    : "All";

  const [category, setCategory] = useState<(typeof CATEGORY_DEFS)[number]["id"]>(initialCategory);
  const [sort, setSort] = useState<"popular" | "az" | "low" | "high">("popular");

  const counts = useMemo(() => {
    const m: Record<string, number> = { All: SERVICES.length };
    for (const s of SERVICES) m[s.category] = (m[s.category] ?? 0) + 1;
    return m;
  }, []);

  const items = useMemo(() => {
    const filtered = SERVICES.filter(
      (s) => category === "All" || s.category === category,
    );
    const min = (s: Service) =>
      Math.min(s.regular ?? Infinity, s.vip ?? Infinity);
    return [...filtered].sort((a, b) => {
      if (sort === "az") return a.name.localeCompare(b.name);
      if (sort === "low") return min(a) - min(b);
      if (sort === "high") return min(b) - min(a);
      // Most popular: popular first, then alpha
      if (a.popular !== b.popular) return a.popular ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
  }, [category, sort]);

  const activeCategoryLabel =
    CATEGORY_DEFS.find((c) => c.id === category)?.label ?? "All services";

  return (
    <>
      <PageHeader
        compact
        eyebrow="Shop"
        title={
          <>
            Every service we offer, in <span className="blue-text font-serif italic font-light">one catalog.</span>
          </>
        }
        description="Browse our full catalog. Sign in with a verified dental account to see pricing and submit cases."
      />

      <Section className="py-8! sm:py-10!">
        <div className="rounded-2xl border border-border bg-bg-muted/40 p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-fg-subtle font-semibold">
                Browse services
              </div>
              <div className="mt-1 text-sm text-fg-muted">
                {items.length} results in {activeCategoryLabel}
              </div>
            </div>
            <SortMenu value={sort} onChange={setSort} />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {CATEGORY_DEFS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition-all cursor-pointer",
                  category === c.id
                    ? "border-blue bg-blue text-white"
                    : "border-border bg-white text-fg hover:border-blue hover:text-blue",
                )}
              >
                {c.label}
                <span
                  className={cn(
                    "text-xs",
                    category === c.id ? "text-white/70" : "text-fg-subtle",
                  )}
                >
                  {counts[c.id] ?? 0}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s, i) => (
            <Link
              key={s.id}
              href={s.unavailable ? "#" : `/checkout?service=${s.id}`}
              className={cn("block", s.unavailable && "pointer-events-none")}
              aria-disabled={s.unavailable}
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "group relative h-full overflow-hidden rounded-2xl border border-border bg-white transition-all",
                  !s.unavailable && "hover:border-blue/40 hover:shadow-[0_24px_48px_-24px_rgba(15,39,70,0.18)]",
                  s.unavailable && "opacity-70",
                )}
              >
                <div className="relative aspect-16/10 overflow-hidden">
                  {CATEGORY_IMAGES[s.category] ? (
                    <img
                      src={CATEGORY_IMAGES[s.category]}
                      alt={s.category}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                      style={{ background: SWATCHES[s.category] }}
                    />
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent" />
                  {s.popular && !s.unavailable && (
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-blue-deep font-semibold">
                      <span className="size-1 rounded-full bg-blue" />
                      Most ordered
                    </span>
                  )}
                  {s.unavailable && (
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-fg-subtle font-semibold">
                      <AlertTriangle className="size-3" />
                      Unavailable
                    </span>
                  )}
                  {s.regular != null && s.vip != null && !s.unavailable && (
                    <span className="absolute top-3 right-3 rounded-full bg-vip-bg/90 text-vip-gold px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] font-semibold">
                      Reg + VIP
                    </span>
                  )}
                  {s.regular == null && s.vip != null && !s.unavailable && (
                    <span className="absolute top-3 right-3 rounded-full bg-vip-bg/90 text-vip-gold px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] font-semibold">
                      VIP only
                    </span>
                  )}
                </div>
                <div className="flex h-full flex-col p-4">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-fg-subtle font-medium">
                    {s.category === "AllOnX" ? "All-on-X" : s.category}
                  </div>
                  <div className="mt-1.5 flex items-start justify-between gap-3">
                    <h3 className="font-display text-base font-semibold tracking-tight">
                      {s.name}
                    </h3>
                    {!s.unavailable && (
                      <ArrowUpRight className="size-4 text-fg-subtle group-hover:text-blue group-hover:rotate-12 transition-all shrink-0 mt-0.5" />
                    )}
                  </div>
                  {s.blurb && (
                    <p className="mt-2 min-h-10 text-xs text-fg-muted leading-relaxed">{s.blurb}</p>
                  )}
                  {!s.blurb && <div className="mt-2 min-h-10" />}
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-3">
                    {s.unavailable ? (
                      <span className="text-xs text-fg-subtle">Service paused</span>
                    ) : (
                      <>
                        <LockedPrice regular={s.regular} vip={s.vip} size="sm" />
                        <span className="text-xs font-medium text-blue">Open service</span>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-blue/20 bg-blue-haze/60 p-5 sm:p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-display text-lg font-semibold tracking-tight">
              Looking for something custom?
            </h3>
            <p className="mt-1 text-sm text-fg-muted">
              VIP cases (gold work, custom layering, jewelry collaborations) live in our private suite.
            </p>
          </div>
          <Button asChild variant="dark" size="md">
            <Link href="/vip">
              Visit VIP suite
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopPageInner />
    </Suspense>
  );
}

function SortMenu({
  value,
  onChange,
}: {
  value: "popular" | "az" | "low" | "high";
  onChange: (v: "popular" | "az" | "low" | "high") => void;
}) {
  const labels = {
    popular: "Most popular",
    az: "Name A–Z",
    low: "Price: low → high",
    high: "Price: high → low",
  };
  return (
    <div className="relative inline-flex items-center">
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-fg-subtle pointer-events-none" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as never)}
        className="appearance-none rounded-full border border-border bg-white pl-4 pr-9 py-1.5 text-sm text-fg hover:border-blue cursor-pointer focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/15"
      >
        {(Object.keys(labels) as (keyof typeof labels)[]).map((k) => (
          <option key={k} value={k}>
            Sort: {labels[k]}
          </option>
        ))}
      </select>
    </div>
  );
}
