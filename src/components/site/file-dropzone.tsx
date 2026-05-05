"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, FileBox, X, Loader2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const MAX_BYTES = 50 * 1024 * 1024; // 50 MB — Supabase free tier limit

export function FileDropzone({
  compact = false,
  onFileChange,
  uploadState = "idle",
}: {
  compact?: boolean;
  /** Called whenever the selected file changes (null = removed). */
  onFileChange?: (file: File | null) => void;
  /** Reflects upload progress driven by the parent (checkout page). */
  uploadState?: "idle" | "uploading" | "done" | "error";
}) {
  const [file, setFile] = useState<File | null>(null);
  const [sizeError, setSizeError] = useState<string | null>(null);
  const [over, setOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handle = (files: FileList | null) => {
    const picked = files?.[0] ?? null;
    if (!picked) return;

    if (picked.size > MAX_BYTES) {
      setSizeError(`"${picked.name}" is too large (${formatBytes(picked.size)}). Max is 50 MB.`);
      return;
    }

    setSizeError(null);
    setFile(picked);
    onFileChange?.(picked);
  };

  const remove = () => {
    setFile(null);
    setSizeError(null);
    onFileChange?.(null);
    // Reset the hidden input so the same file can be re-selected
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-3">
      {/* Drop zone — hidden once a file is selected */}
      {!file && (
        <div
          onDragOver={(e) => { e.preventDefault(); setOver(true); }}
          onDragLeave={() => setOver(false)}
          onDrop={(e) => { e.preventDefault(); setOver(false); handle(e.dataTransfer.files); }}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "relative cursor-pointer rounded-2xl border border-dashed text-center transition-all",
            compact ? "p-4 sm:p-5" : "p-8",
            over
              ? "border-blue bg-blue/5"
              : "border-border-strong hover:border-blue/60 bg-blue-haze/30",
          )}
        >
          <input
            ref={inputRef}
            type="file"
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
            STL, OBJ, PLY, 3MF, DCM, or ZIP · Max 50 MB
          </p>
        </div>
      )}

      {/* Size error */}
      {sizeError && (
        <p className="text-xs text-red-600">{sizeError}</p>
      )}

      {/* Selected file */}
      <AnimatePresence>
        {file && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="flex items-center justify-between rounded-xl border border-border bg-white px-4 py-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex size-9 items-center justify-center rounded-lg bg-blue-haze text-blue shrink-0">
                {uploadState === "uploading" ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : uploadState === "done" ? (
                  <CheckCircle className="size-4 text-green-600" />
                ) : (
                  <FileBox className="size-4" />
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-fg">{file.name}</p>
                <p className="text-xs text-fg-subtle">
                  {formatBytes(file.size)}
                  {uploadState === "uploading" && " · Uploading…"}
                  {uploadState === "done" && " · Uploaded"}
                  {uploadState === "error" && " · Upload failed"}
                </p>
              </div>
            </div>
            {uploadState === "idle" || uploadState === "error" ? (
              <button
                type="button"
                onClick={remove}
                aria-label={`Remove ${file.name}`}
                className="cursor-pointer rounded-md p-1.5 text-fg-subtle hover:text-fg hover:bg-bg transition-colors"
              >
                <X className="size-4" />
              </button>
            ) : null}
          </motion.div>
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
