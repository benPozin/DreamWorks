"use client";

/**
 * Real auth — powered by Supabase.
 *
 * - Supabase handles passwords (hashed server-side, we never see them).
 * - Extra dentist info (name, practice, license, etc.) lives in the `profiles`
 *   table in Supabase, linked to the auth user by ID.
 * - The session is stored in a cookie by Supabase automatically — it
 *   survives page refreshes and works across devices.
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { supabase } from "./supabase";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Account = {
  id: string;
  email: string;
  name: string;
  practice: string;
  license: string;
  phone: string;
  shippingAddress: string;
  createdAt: string;
  isAdmin: boolean;
};

type AuthState = {
  user: Account | null;
  ready: boolean;
};

type AuthContextValue = AuthState & {
  signup: (input: {
    email: string;
    password: string;
    name: string;
    practice: string;
    license: string;
    phone: string;
    shippingAddress: string;
  }) => Promise<{ ok: true } | { ok: false; error: string }>;
  login: (
    email: string,
    password: string,
  ) => Promise<{ ok: true } | { ok: false; error: string }>;
  logout: () => void;
};

// ─── Context ─────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Fetch the extra profile info for a logged-in user. */
async function fetchProfile(userId: string): Promise<Account | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    email: data.email,
    name: data.name ?? "",
    practice: data.practice ?? "",
    license: data.license ?? "",
    phone: data.phone ?? "",
    shippingAddress: data.shipping_address ?? "",
    createdAt: data.created_at,
    isAdmin: data.is_admin ?? false,
  };
}

// ─── Provider ────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, ready: false });

  useEffect(() => {
    // 1. Check if there's already a session when the page loads
    //    (e.g. the user refreshed the page while logged in)
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const profile = await fetchProfile(session.user.id);
        setState({ user: profile, ready: true });
      } else {
        setState({ user: null, ready: true });
      }
    });

    // 2. Listen for any future auth changes (login, logout, token auto-refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_OUT") {
        setState({ user: null, ready: true });
        return;
      }
      if ((event === "SIGNED_IN" || event === "TOKEN_REFRESHED") && session?.user) {
        const profile = await fetchProfile(session.user.id);
        // Only update if we got a profile — during signup the profile is
        // inserted AFTER signUp() returns, so onAuthStateChange fires first.
        // The signup() function sets state directly in that case.
        if (profile) setState({ user: profile, ready: true });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // ─── signup ──────────────────────────────────────────────────────────────

  const signup = useCallback<AuthContextValue["signup"]>(
    async ({ email, password, name, practice, license, phone, shippingAddress }) => {
      // Create the Supabase auth user (handles password hashing)
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) return { ok: false, error: error.message };
      if (!data.user) return { ok: false, error: "Signup failed. Please try again." };

      // Save the extra dentist info — the trigger already created the row,
      // so we update it rather than insert (avoids RLS timing issues).
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ name, practice, license, phone, shipping_address: shippingAddress })
        .eq("id", data.user.id);

      if (profileError) return { ok: false, error: profileError.message };

      // Set state directly — onAuthStateChange already fired before the
      // profile was inserted, so we handle state ourselves here.
      setState({
        user: {
          id: data.user.id,
          email: email.trim().toLowerCase(),
          name,
          practice,
          license,
          phone,
          shippingAddress,
          createdAt: new Date().toISOString(),
        },
        ready: true,
      });

      return { ok: true };
    },
    [],
  );

  // ─── login ───────────────────────────────────────────────────────────────

  const login = useCallback<AuthContextValue["login"]>(async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { ok: false, error: error.message };
    // onAuthStateChange fires after this and loads the profile + sets state
    return { ok: true };
  }, []);

  // ─── logout ──────────────────────────────────────────────────────────────

  const logout = useCallback(() => {
    // Fire and forget — onAuthStateChange fires SIGNED_OUT and clears state
    supabase.auth.signOut();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
