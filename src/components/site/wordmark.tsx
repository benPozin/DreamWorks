import { cn } from "@/lib/utils";

const LOGO_MARK = "/brand/logo-mark-circle.png";

export function Wordmark({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "vip";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-display tracking-tight",
        className
      )}
    >
      <Mark variant={variant} />
      <span className="flex flex-col leading-none">
        <span className={cn("text-[15px] font-semibold", variant === "vip" ? "text-vip-fg" : "text-fg")}>
          DreamWorks
        </span>
        <span
          className={cn(
            "text-[9px] uppercase tracking-[0.22em] mt-0.5",
            variant === "vip" ? "text-vip-gold" : "text-blue"
          )}
        >
          Dental Laboratories
        </span>
      </span>
    </span>
  );
}

function Mark({ variant }: { variant: "default" | "vip" }) {
  if (variant === "vip") {
    const stroke = "#D4A017";
    const accent = "#E7D7A1";
    return (
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M16 3c4 0 7 1.5 9 4 1.6 2 1.4 4.5.8 7l-3 12c-.6 2.4-2.4 3-3.4 1l-2.4-5c-.4-.8-1.6-.8-2 0l-2.4 5c-1 2-2.8 1.4-3.4-1l-3-12c-.6-2.5-.8-5 .8-7C9 4.5 12 3 16 3Z"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="11" r="2.2" fill={accent} />
      </svg>
    );
  }

  /* Native img: static asset from /public, reliable with Motion + extensions (Next/Image can mismatch SSR vs client attrs). */
  return (
    <img
      src={LOGO_MARK}
      alt=""
      width={28}
      height={28}
      decoding="async"
      fetchPriority="high"
      className="shrink-0 size-7 object-contain block"
    />
  );
}
