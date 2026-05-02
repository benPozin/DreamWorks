"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthShell, AuthInput, AuthLabel } from "@/components/site/auth-shell";
import { useAuth } from "@/lib/auth";

function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get("next") || "/account";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const res = await login(email, password);
    setPending(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    router.push(next);
  }

  return (
    <form className="space-y-5" onSubmit={onSubmit} noValidate>
      <div>
        <AuthLabel>Email</AuthLabel>
        <AuthInput
          type="email"
          placeholder="dr.smith@practice.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <AuthLabel>Password</AuthLabel>
          <Link href="#" className="text-xs text-blue hover:text-blue-deep">
            Forgot?
          </Link>
        </div>
        <AuthInput
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

      <label className="flex items-center gap-2 text-sm text-fg-muted cursor-pointer">
        <input type="checkbox" defaultChecked className="size-4 rounded border-border-strong accent-blue" />
        Keep me signed in for 30 days
      </label>
      <Button type="submit" variant="primary" size="lg" className="w-full" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
        {!pending && <ArrowUpRight className="size-4" />}
      </Button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <AuthShell
      title={
        <>
          Welcome back to <span className="blue-text font-serif italic font-light">DreamWorks.</span>
        </>
      }
      subtitle="Sign in to view pricing, submit cases, and message your designer directly."
      altText="New here?"
      altLink="/signup"
      altLabel="Open a lab account →"
    >
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
