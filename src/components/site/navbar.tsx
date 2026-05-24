"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Wordmark } from "@/components/site/wordmark";
import { AccountMenu } from "@/components/site/account-menu";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/shop", label: "Shop" },
  { href: "/vip", label: "VIP" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, ready } = useAuth();
  const pathname = usePathname();

  const { scrollY } = useScroll();
  const top = useTransform(scrollY, [0, 36], [48, 12]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header style={{ top }} className="fixed inset-x-3 sm:inset-x-6 z-40">
      <motion.div
        initial={{ y: -8, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
        className={cn(
          "mx-auto max-w-6xl rounded-full transition-all duration-500",
          scrolled
            ? "glass-strong shadow-[0_12px_32px_-12px_rgba(15,39,70,0.18)]"
            : "bg-white/55 backdrop-blur-xl border border-white/70 shadow-[0_4px_16px_-8px_rgba(15,39,70,0.08)]"
        )}
      >
        <div className="flex items-center justify-between pl-5 pr-3 sm:pl-6 sm:pr-3.5 h-14">
          <Link href="/" className="flex items-center" aria-label="DreamWorks home">
            <Wordmark />
          </Link>

          <nav className="hidden md:flex items-center gap-0.5">
            {links.map((l) => (
              <NavLink
                key={l.href}
                href={l.href}
                label={l.label}
                active={pathname === l.href}
              />
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-1.5 min-w-[180px] justify-end">
            {ready && user ? (
              <AccountMenu />
            ) : (
              <>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button asChild variant="primary" size="sm">
                  <Link href="/signup">
                    Open account
                    <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 -mr-1 cursor-pointer rounded-full hover:bg-bg-deep/60 transition-colors"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden border-t border-border/60"
            >
              <div className="flex flex-col p-2">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                      pathname === l.href ? "bg-bg-deep text-fg" : "text-fg-muted hover:bg-bg-deep/60 hover:text-fg"
                    )}
                  >
                    {l.label}
                  </Link>
                ))}
                {ready && user ? (
                  <div className="grid grid-cols-2 gap-2 p-2 pt-3">
                    <Button asChild variant="outline" size="sm">
                      <Link href="/account" onClick={() => setOpen(false)}>Account</Link>
                    </Button>
                    <Button asChild variant="primary" size="sm">
                      <Link href="/checkout" onClick={() => setOpen(false)}>Submit case</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 p-2 pt-3">
                    <Button asChild variant="outline" size="sm">
                      <Link href="/login" onClick={() => setOpen(false)}>Sign in</Link>
                    </Button>
                    <Button asChild variant="primary" size="sm">
                      <Link href="/signup" onClick={() => setOpen(false)}>Open account</Link>
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
}

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative px-3.5 py-2 text-sm font-medium rounded-full transition-colors duration-200",
        active ? "text-fg" : "text-fg-muted hover:text-fg"
      )}
    >
      {active && (
        <motion.span
          layoutId="navactive"
          className="absolute inset-0 rounded-full bg-bg-deep/70"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
        />
      )}
      <span className="relative">{label}</span>
    </Link>
  );
}
