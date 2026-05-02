"use client";

/**
 * Local-only auth — for the visual / demo build.
 *
 * - Persisted in localStorage; no backend.
 * - Signup writes a record to `dreamworks.users`; login validates against it.
 * - Current session is tracked in `dreamworks.session`.
 * - All pages re-read from the provider so SSR renders the unauthenticated
 *   shell, and the client hydrates the authenticated view (gated pricing,
 *   account menu, etc).
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";

const USERS_KEY = "dreamworks.users";
const SESSION_KEY = "dreamworks.session";

export type Account = {
  id: string;
  email: string;
  name: string;
  practice: string;
  license: string;
  phone: string;
  shippingAddress: string;
  createdAt: string;
};

type StoredUser = Account & { passwordHash: string };

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

const AuthContext = createContext<AuthContextValue | null>(null);

// Tiny non-cryptographic "hash" — fine for a localStorage demo.
async function hashPassword(pw: string) {
  if (typeof crypto !== "undefined" && crypto.subtle) {
    const data = new TextEncoder().encode(pw + ":dreamworks");
    const buf = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
  return `plain:${pw}`;
}

function readUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}
function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
function readSession(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(SESSION_KEY);
}
function writeSession(id: string | null) {
  if (id) localStorage.setItem(SESSION_KEY, id);
  else localStorage.removeItem(SESSION_KEY);
}

function publicView(u: StoredUser): Account {
  const rest = { ...u } as Partial<StoredUser>;
  delete rest.passwordHash;
  return rest as Account;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, ready: false });

  useEffect(() => {
    const sync = () => {
      const sid = readSession();
      const us = readUsers();
      const f = sid ? us.find((u) => u.id === sid) : null;
      setState({ user: f ? publicView(f) : null, ready: true });
    };
    // Defer the initial sync out of the effect body so we don't trip
    // React 19's "no synchronous setState in effects" rule.
    queueMicrotask(sync);

    const onStorage = (e: StorageEvent) => {
      if (e.key === SESSION_KEY || e.key === USERS_KEY) sync();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const signup = useCallback<AuthContextValue["signup"]>(
    async ({ email, password, name, practice, license, phone, shippingAddress }) => {
      const normalized = email.trim().toLowerCase();
      if (!normalized || !password)
        return { ok: false, error: "Email and password are required." };
      if (password.length < 8)
        return { ok: false, error: "Password must be at least 8 characters." };
      const users = readUsers();
      if (users.some((u) => u.email === normalized))
        return { ok: false, error: "An account with this email already exists." };
      const passwordHash = await hashPassword(password);
      const next: StoredUser = {
        id: crypto.randomUUID(),
        email: normalized,
        name,
        practice,
        license,
        phone,
        shippingAddress,
        passwordHash,
        createdAt: new Date().toISOString(),
      };
      writeUsers([...users, next]);
      writeSession(next.id);
      setState({ user: publicView(next), ready: true });
      return { ok: true };
    },
    [],
  );

  const login = useCallback<AuthContextValue["login"]>(async (email, password) => {
    const normalized = email.trim().toLowerCase();
    const users = readUsers();
    const found = users.find((u) => u.email === normalized);
    if (!found) return { ok: false, error: "No account found for that email." };
    const hash = await hashPassword(password);
    if (hash !== found.passwordHash)
      return { ok: false, error: "Incorrect password." };
    writeSession(found.id);
    setState({ user: publicView(found), ready: true });
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    writeSession(null);
    setState({ user: null, ready: true });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
