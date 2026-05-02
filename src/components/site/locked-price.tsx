"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

/**
 * Pricing visibility gate. Renders the price only for authed users.
 * Reserves a placeholder during SSR/hydration to avoid layout shift.
 */
export function LockedPrice({
  regular,
  vip,
  size = "md",
}: {
  regular: number | null;
  vip: number | null;
  size?: "sm" | "md";
}) {
  const { user, ready } = useAuth();

  if (!ready) {
    return (
      <span
        className={cn(
          "inline-block rounded-full bg-bg-muted",
          size === "sm" ? "h-4 w-20" : "h-5 w-24",
        )}
        aria-hidden
      />
    );
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className={cn(
          "inline-flex items-center gap-1.5 text-fg-muted hover:text-blue transition-colors",
          size === "sm" ? "text-xs" : "text-sm",
        )}
      >
        <Lock className={size === "sm" ? "size-3" : "size-3.5"} />
        Sign in to view price
      </Link>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-2",
        size === "sm" ? "text-sm" : "text-base",
      )}
    >
      {regular != null && (
        <span className="font-display font-semibold text-fg">
          ${regular}
          <span className="ml-0.5 text-[10px] uppercase tracking-[0.18em] text-fg-subtle font-medium">
            reg
          </span>
        </span>
      )}
      {regular != null && vip != null && (
        <span className="text-fg-subtle text-xs">·</span>
      )}
      {vip != null && (
        <span className="font-display font-semibold text-vip-gold-soft">
          ${vip}
          <span className="ml-0.5 text-[10px] uppercase tracking-[0.18em] font-medium">
            vip
          </span>
        </span>
      )}
    </span>
  );
}
