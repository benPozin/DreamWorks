"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "motion/react";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  IdCard,
  CalendarDays,
  ArrowUpRight,
  LogOut,
} from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { Section } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

export default function AccountPage() {
  const { user, ready, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && !user) router.replace("/login?next=/account");
  }, [ready, user, router]);

  if (!ready || !user) return null;

  const created = new Date(user.createdAt);
  const createdFmt = created.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <PageHeader
        compact
        eyebrow="Account"
        title={
          <>
            Welcome back, <span className="blue-text font-serif italic font-light">{user.name?.split(" ")[0] || "Doctor"}.</span>
          </>
        }
        description="Your saved practice details, plus quick access to submitting a new case."
      />

      <Section className="py-8! sm:py-10!">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-border bg-white p-7 sm:p-9"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-blue font-semibold">
                  Practice profile
                </div>
                <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight">
                  {user.name || "Verified dental professional"}
                </h2>
                {user.practice && (
                  <p className="mt-1 text-fg-muted">{user.practice}</p>
                )}
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] font-bold">
                <span className="size-1 rounded-full bg-green-500" />
                Verified
              </span>
            </div>

            <dl className="mt-7 grid gap-x-6 gap-y-5 sm:grid-cols-2">
              <Detail icon={Mail} label="Email" value={user.email} />
              <Detail icon={Phone} label="Phone" value={user.phone || "Not provided"} />
              <Detail icon={IdCard} label="License" value={user.license || "Not provided"} />
              <Detail icon={Building2} label="Practice" value={user.practice || "Not provided"} />
              <Detail
                icon={MapPin}
                label="Shipping address"
                value={user.shippingAddress || "Not provided"}
                wide
              />
              <Detail icon={CalendarDays} label="Member since" value={createdFmt} />
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-3 pt-6 border-t border-border">
              <Button asChild variant="primary" size="md">
                <Link href="/checkout">
                  Submit a case
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="md">
                <Link href="/shop">Browse catalog</Link>
              </Button>
              <button
                type="button"
                onClick={logout}
                className="ml-auto inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-fg transition-colors cursor-pointer"
              >
                <LogOut className="size-4" />
                Sign out
              </button>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5 }}
            className="space-y-4 self-start"
          >
            <div className="rounded-2xl border border-blue/20 bg-blue-haze/60 p-6">
              <div className="text-[10px] uppercase tracking-[0.22em] text-blue font-semibold">
                Pricing unlocked
              </div>
              <p className="mt-2 text-sm text-fg leading-relaxed">
                You can now see Regular and VIP rates across the catalog and submit
                cases without re-entering your shipping or contact details.
              </p>
              <Link
                href="/shop"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue hover:text-blue-deep transition-colors"
              >
                Open the catalog
                <ArrowUpRight className="size-4" />
              </Link>
            </div>

            <div className="rounded-2xl border border-border bg-white p-6">
              <div className="text-[10px] uppercase tracking-[0.22em] text-fg-subtle font-semibold">
                Help
              </div>
              <ul className="mt-3 space-y-2 text-sm text-fg">
                <li>
                  <Link href="/contact" className="hover:text-blue transition-colors">
                    Talk to a designer →
                  </Link>
                </li>
                <li>
                  <a
                    href="/Perscription-Form.pdf"
                    download
                    className="hover:text-blue transition-colors"
                  >
                    Download prescription form →
                  </a>
                </li>
                <li>
                  <Link href="/vip" className="hover:text-blue transition-colors">
                    Visit the VIP suite →
                  </Link>
                </li>
              </ul>
            </div>
          </motion.aside>
        </div>
      </Section>
    </>
  );
}

function Detail({
  icon: Icon,
  label,
  value,
  wide,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <dt className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-fg-subtle font-semibold">
        <Icon className="size-3.5" />
        {label}
      </dt>
      <dd className="mt-1 font-medium text-fg break-words">{value}</dd>
    </div>
  );
}
