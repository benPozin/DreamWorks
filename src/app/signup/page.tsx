"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthShell, AuthInput, AuthLabel } from "@/components/site/auth-shell";
import { useAuth } from "@/lib/auth";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    license: "",
    practice: "",
    email: "",
    phone: "",
    shippingAddress: "",
    password: "",
  });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const res = await signup(form);
    setPending(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    router.push("/account");
  }

  return (
    <AuthShell
      title={
        <>
          Open your <span className="blue-text font-serif italic font-light">lab account.</span>
        </>
      }
      subtitle="Verified dental professionals only. We typically approve new accounts within one business hour."
      altText="Already have an account?"
      altLink="/login"
      altLabel="Sign in →"
    >
      <form className="space-y-5" onSubmit={onSubmit} noValidate>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <AuthLabel>Your name</AuthLabel>
            <AuthInput
              placeholder="Dr. Jane Smith"
              autoComplete="name"
              value={form.name}
              onChange={set("name")}
            />
          </div>
          <div>
            <AuthLabel>License number</AuthLabel>
            <AuthInput
              placeholder="DDS-0000000"
              value={form.license}
              onChange={set("license")}
            />
          </div>
        </div>
        <div>
          <AuthLabel>Practice name</AuthLabel>
          <AuthInput
            placeholder="Smith Family Dental"
            autoComplete="organization"
            value={form.practice}
            onChange={set("practice")}
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <AuthLabel>Email</AuthLabel>
            <AuthInput
              type="email"
              placeholder="dr.smith@practice.com"
              autoComplete="email"
              value={form.email}
              onChange={set("email")}
            />
          </div>
          <div>
            <AuthLabel>Phone</AuthLabel>
            <AuthInput
              type="tel"
              placeholder="(555) 555-5555"
              autoComplete="tel"
              value={form.phone}
              onChange={set("phone")}
            />
          </div>
        </div>
        <div>
          <AuthLabel>Shipping address</AuthLabel>
          <AuthInput
            placeholder="123 Practice Way, Suite 100"
            autoComplete="street-address"
            value={form.shippingAddress}
            onChange={set("shippingAddress")}
          />
        </div>
        <div>
          <AuthLabel>Password</AuthLabel>
          <AuthInput
            type="password"
            placeholder="At least 8 characters"
            autoComplete="new-password"
            value={form.password}
            onChange={set("password")}
          />
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="inline-flex w-full items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
            >
              <AlertCircle className="size-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <label className="flex items-start gap-2.5 text-xs text-fg-muted cursor-pointer leading-relaxed">
          <input
            type="checkbox"
            className="mt-0.5 size-4 rounded border-border-strong accent-blue"
            defaultChecked
            required
          />
          I confirm I&apos;m a licensed dental professional and agree to the lab&apos;s
          case-handling terms.
        </label>

        <Button type="submit" variant="primary" size="lg" className="w-full" disabled={pending}>
          {pending ? "Creating account…" : "Create account"}
          {!pending && <ArrowUpRight className="size-4" />}
        </Button>
      </form>
    </AuthShell>
  );
}
