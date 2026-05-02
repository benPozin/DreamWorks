"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50 cursor-pointer [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-blue text-white hover:bg-blue-soft shadow-[0_8px_24px_-8px_rgba(27,91,174,0.45)]",
        dark:
          "bg-primary text-white hover:bg-secondary shadow-[0_8px_24px_-8px_rgba(15,39,70,0.45)]",
        outline:
          "border border-border-strong bg-white/60 backdrop-blur text-fg hover:border-blue hover:bg-white",
        ghost: "text-fg hover:bg-blue-haze",
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
