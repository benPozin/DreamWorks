"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Per the update notes: full shade list, dropdown only — no color chart.
// Doctors know what shade they need.
export const SHADES = [
  "A1", "A2", "A3", "A3.5", "A4",
  "B1", "B2", "B3", "B4",
  "C1", "C2", "C3", "C4",
  "D2", "D3", "D4",
  "OM1", "OM2", "OM3",
] as const;

export type Shade = (typeof SHADES)[number];

export function ShadePicker({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (shade: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState<string>("");
  const ref = useRef<HTMLDivElement | null>(null);
  const selected = value ?? internal;

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "w-full inline-flex items-center justify-between rounded-xl border bg-white px-4 py-3 text-sm transition-all cursor-pointer",
          open
            ? "border-blue ring-2 ring-blue/15"
            : "border-border hover:border-blue/40",
        )}
      >
        <span className={cn(selected ? "text-fg font-medium" : "text-fg-subtle")}>
          {selected || "Choose a shade"}
        </span>
        <ChevronDown
          className={cn(
            "size-4 text-fg-subtle transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-30 mt-2 max-h-72 w-full overflow-y-auto rounded-xl border border-border bg-white shadow-[0_24px_48px_-24px_rgba(15,39,70,0.22)]"
          >
            {SHADES.map((s) => {
              const isActive = s === selected;
              return (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => {
                      if (value === undefined) setInternal(s);
                      onChange?.(s);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between px-4 py-2.5 text-sm hover:bg-blue-haze/60 transition-colors text-left cursor-pointer",
                      isActive && "bg-blue-haze/40 font-medium text-blue-deep",
                    )}
                    role="option"
                    aria-selected={isActive}
                  >
                    <span>{s}</span>
                    {isActive && <Check className="size-4 text-blue" />}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
