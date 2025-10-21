import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";
import type * as React from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  asChild?: boolean;
}

const base =
  "inline-flex items-center justify-center rounded-md font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent disabled:opacity-50 disabled:pointer-events-none";
const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-base",
  lg: "h-11 px-5 text-lg",
};
const variants: Record<Variant, string> = {
  primary: "bg-brand-primary text-bg hover:opacity-95",
  secondary: "bg-bg-elevated text-fg hover:opacity-90 border border-white/10",
  ghost: "bg-transparent text-fg hover:bg-white/5",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className,
  asChild = false,
  children,
  ...rest
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      aria-busy={loading}
      className={clsx(base, sizes[size], variants[variant], className)}
      {...rest}
    >
      {loading ? "…" : children}
    </Comp>
  );
}
