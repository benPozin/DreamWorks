"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ShieldCheck, Lock, Clock } from "lucide-react";
import { MeshBg } from "@/components/site/mesh-bg";
import type { ReactNode } from "react";

const perks = [
  { icon: Lock, title: "Private pricing", body: "Rates visible only to verified dental professionals." },
  { icon: ShieldCheck, title: "30 years of trust", body: "A workshop dentists have referred peers to since 1995." },
  { icon: Clock, title: "Rush case access", body: "Direct line to a designer when something can't wait." },
];

export function AuthShell({
  title,
  subtitle,
  children,
  altText,
  altLink,
  altLabel,
}: {
  title: ReactNode;
  subtitle: ReactNode;
  children: ReactNode;
  altText: string;
  altLink: string;
  altLabel: string;
}) {
  return (
    <section className="relative overflow-hidden pt-20 pb-20 min-h-screen sm:pt-24 sm:pb-28">
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />
      <MeshBg />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          {/* Left: pitch */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block"
          >
            <h1 className="font-display text-5xl tracking-[-0.02em] leading-[1.05]">
              {title}
            </h1>
            <p className="mt-5 max-w-md text-lg text-fg-muted leading-relaxed">{subtitle}</p>

            <ul className="mt-12 space-y-4">
              {perks.map((p) => (
                <li key={p.title} className="flex items-start gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white border border-border">
                    <p.icon className="size-5 text-blue" strokeWidth={1.7} />
                  </div>
                  <div>
                    <div className="font-display text-base font-semibold tracking-tight">{p.title}</div>
                    <p className="text-sm text-fg-muted">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: form card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="rounded-2xl glass p-8 sm:p-10">
              <div className="lg:hidden mb-2">
                <h1 className="font-display text-3xl tracking-tight">{title}</h1>
              </div>
              {children}
              <div className="mt-7 pt-6 border-t border-border text-center text-sm text-fg-muted">
                {altText}{" "}
                <Link href={altLink} className="text-blue hover:text-blue-deep font-medium">
                  {altLabel}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function AuthLabel({ children }: { children: ReactNode }) {
  return (
    <label className="text-xs uppercase tracking-[0.18em] text-fg-subtle font-semibold">
      {children}
    </label>
  );
}

export const AuthInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm placeholder:text-fg-subtle focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/15"
  />
);
