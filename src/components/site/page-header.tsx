"use client";

import { motion } from "motion/react";
import { MeshBg } from "@/components/site/mesh-bg";
import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  compact = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section
      className={
        compact
          ? "relative overflow-hidden pt-20 pb-8 sm:pt-24 sm:pb-10"
          : "relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20"
      }
    >
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />
      <MeshBg />
      <div className="relative mx-auto max-w-6xl px-6">
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-blue/20 bg-blue-haze/80 backdrop-blur px-3.5 py-1.5 text-xs font-medium text-blue-deep uppercase tracking-[0.2em]"
          >
            <span className="size-1 rounded-full bg-blue" />
            {eyebrow}
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={
            compact
              ? "mt-4 font-display text-3xl sm:text-4xl lg:text-5xl tracking-[-0.02em] leading-[1.05] text-fg max-w-4xl"
              : "mt-6 font-display text-5xl sm:text-6xl lg:text-7xl tracking-[-0.02em] leading-[1.02] text-fg max-w-4xl"
          }
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className={
              compact
                ? "mt-3 max-w-2xl text-sm sm:text-base text-fg-muted leading-relaxed"
                : "mt-6 max-w-2xl text-lg text-fg-muted leading-relaxed"
            }
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
