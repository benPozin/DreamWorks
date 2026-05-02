"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, FileBox, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { name: string; size: number };

export function FileDropzone({ compact = false }: { compact?: boolean }) {
  const [items, setItems] = useState<Item[]>([]);
  const [over, setOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handle = (files: FileList | null) => {
    if (!files) return;
    const next: Item[] = Array.from(files).map((f) => ({ name: f.name, size: f.size }));
    setItems((prev) => [...prev, ...next]);
  };

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          handle(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "relative cursor-pointer rounded-2xl border border-dashed text-center transition-all",
          compact ? "p-4 sm:p-5" : "p-8",
          over
            ? "border-blue bg-blue/5"
            : "border-border-strong hover:border-blue/60 bg-blue-haze/30"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".stl,.obj,.ply,.zip,.3mf,.dcm"
          className="hidden"
          onChange={(e) => handle(e.target.files)}
        />
        <motion.div
          animate={over ? { scale: 1.05 } : { scale: 1 }}
          className={cn(
            "mx-auto flex items-center justify-center rounded-full bg-white border border-border-strong",
            compact ? "size-9" : "size-12",
          )}
        >
          <Upload className={cn("text-blue", compact ? "size-4" : "size-5")} />
        </motion.div>
        <p className={cn("font-medium text-fg", compact ? "mt-3 text-xs sm:text-sm" : "mt-4 text-sm")}>
          Drop your 3D case file here, or click to browse
        </p>
        <p className={cn("mt-1 text-fg-subtle", compact ? "text-[11px]" : "text-xs")}>
          STL, OBJ, PLY, 3MF, DCM, or ZIP · Files up to 500 MB
        </p>
      </div>

      <AnimatePresence>
        {items.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2 overflow-hidden"
          >
            {items.map((it, i) => (
              <motion.li
                key={`${it.name}-${i}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                className="flex items-center justify-between rounded-xl border border-border bg-white px-4 py-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-blue-haze text-blue shrink-0">
                    <FileBox className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-fg">{it.name}</p>
                    <p className="text-xs text-fg-subtle">{formatBytes(it.size)}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setItems((prev) => prev.filter((_, idx) => idx !== i))}
                  aria-label={`Remove ${it.name}`}
                  className="cursor-pointer rounded-md p-1.5 text-fg-subtle hover:text-fg hover:bg-bg transition-colors"
                >
                  <X className="size-4" />
                </button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
  return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
}
