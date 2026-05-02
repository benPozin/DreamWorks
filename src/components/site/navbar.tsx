"use client";

import Link from "next/link";
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

  // Slide the navbar down when the announcement bar is on screen, then
  // tuck it up to its tight `top-3` position once the bar scrolls away.
  const { scrollY } = useScroll();
  const top = useTransform(scrollY, [0, 36], [48, 12]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      style={{ top }}
      className="fixed inset-x-3 sm:inset-x-6 z-40"
    >
      <motion.div
        initial={{ y: -8, opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as const }}
        className={cn(
          "mx-auto max-w-6xl rounded-2xl transition-all duration-300",
          scrolled ? "glass" : "bg-bg-elevated/40 backdrop-blur-md border border-border/60"
        )}
      >
        <div className="flex items-center justify-between px-4 sm:px-5 h-14">
          <Link href="/" className="flex items-center" aria-label="DreamWorks home">
            <Wordmark />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <NavLink key={l.href} href={l.href} label={l.label} />
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2 min-w-[180px] justify-end">
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
            className="md:hidden p-2 -mr-2 cursor-pointer"
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
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden border-t border-border/60"
            >
              <div className="flex flex-col p-2">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="px-3 py-3 rounded-lg text-sm font-medium hover:bg-bg-elevated/80 transition-colors"
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

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="relative px-3 py-2 text-sm font-medium text-fg-muted hover:text-fg transition-colors group"
    >
      <span>{label}</span>
      <motion.span
        layoutId="navhover"
        className="absolute inset-x-2 -bottom-px h-px bg-blue opacity-0 group-hover:opacity-100 transition-opacity"
      />
    </Link>
  );
}
