"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, LogOut, User as UserIcon, FileText, ShieldCheck } from "lucide-react";
import { useAuth } from "@/lib/auth";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function AccountMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-white pl-1 pr-3 py-1 text-sm hover:border-blue/40 transition-colors cursor-pointer"
        aria-label="Account menu"
        aria-expanded={open}
      >
        <span className="flex size-7 items-center justify-center rounded-full bg-blue text-white text-[11px] font-semibold">
          {initials(user.name || user.email)}
        </span>
        <span className="hidden sm:inline font-medium text-fg max-w-[120px] truncate">
          {user.name?.split(" ")[0] || user.email}
        </span>
        <ChevronDown className="size-3.5 text-fg-subtle" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 mt-2 w-72 rounded-2xl border border-border bg-white shadow-[0_24px_48px_-24px_rgba(15,39,70,0.22)] overflow-hidden"
          >
            <div className="p-4 border-b border-border bg-blue-haze/40">
              <div className="text-[10px] uppercase tracking-[0.2em] text-blue font-semibold">
                Verified account
              </div>
              <div className="mt-1 font-display font-semibold tracking-tight truncate">
                {user.name || user.email}
              </div>
              {user.practice && (
                <div className="text-xs text-fg-muted truncate mt-0.5">
                  {user.practice}
                </div>
              )}
            </div>
            <div className="py-1">
              <MenuLink href="/account" icon={UserIcon} onClick={() => setOpen(false)}>
                Account details
              </MenuLink>
              <MenuLink href="/checkout" icon={FileText} onClick={() => setOpen(false)}>
                Submit a case
              </MenuLink>
              {user.isAdmin && (
                <>
                  <div className="mx-4 my-1 border-t border-border" />
                  <MenuLink href="/admin" icon={ShieldCheck} onClick={() => setOpen(false)}>
                    Lab admin
                  </MenuLink>
                </>
              )}
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="w-full inline-flex items-center gap-2.5 px-4 py-2.5 text-sm text-fg hover:bg-bg-muted transition-colors cursor-pointer"
              >
                <LogOut className="size-4 text-fg-subtle" />
                Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuLink({
  href,
  icon: Icon,
  children,
  onClick,
}: {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="inline-flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-fg hover:bg-bg-muted transition-colors"
    >
      <Icon className="size-4 text-fg-subtle" />
      {children}
    </Link>
  );
}
