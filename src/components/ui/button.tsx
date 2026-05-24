"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium tracking-tight transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 cursor-pointer [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform hover:[&_svg]:translate-x-0.5",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white hover:bg-blue-deep shadow-[0_10px_28px_-10px_rgba(15,39,70,0.50),0_2px_6px_-2px_rgba(15,39,70,0.20)] hover:shadow-[0_18px_40px_-12px_rgba(15,39,70,0.55),0_4px_10px_-2px_rgba(15,39,70,0.22)] hover:-translate-y-0.5 active:translate-y-0",
        blue:
          "bg-blue text-white hover:bg-blue-soft shadow-[0_10px_28px_-10px_rgba(27,91,174,0.55),0_2px_6px_-2px_rgba(27,91,174,0.25)] hover:shadow-[0_18px_40px_-12px_rgba(27,91,174,0.60),0_4px_10px_-2px_rgba(27,91,174,0.30)] hover:-translate-y-0.5 active:translate-y-0",
        dark:
          "bg-primary text-white hover:bg-secondary shadow-[0_10px_28px_-10px_rgba(15,39,70,0.45)]",
        outline:
          "border border-border-strong bg-white/70 backdrop-blur text-fg hover:bg-white hover:border-primary/40 hover:shadow-[0_8px_24px_-12px_rgba(15,39,70,0.18)]",
        ghost: "text-fg hover:bg-bg-deep",
        vip: "bg-vip-gold text-vip-bg hover:bg-vip-champagne shadow-[0_10px_30px_-8px_rgba(212,160,23,0.5)]",
        vipOutline:
          "border border-vip-gold/40 text-vip-champagne hover:bg-vip-gold/10 hover:border-vip-gold",
        link: "text-fg underline-offset-4 hover:underline px-0 h-auto",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "h-13 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
