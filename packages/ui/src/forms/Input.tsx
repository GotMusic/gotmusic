import { type VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "../utils";

const inputVariants = cva(
  [
    "flex w-full border transition-colors",
    "rounded-[var(--radius-sm,8px)]",
    "bg-[var(--color-bg-muted,#0F131B)]",
    "text-[var(--color-fg,#E6EAF2)]",
    "placeholder:text-[var(--color-fg-muted,#A9B1C1)]",
    "focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-accent,#5BD0FF)]",
    "focus:border-[var(--color-brand-accent,#5BD0FF)]",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-8 px-2 text-xs",
        md: "h-9 px-3 text-sm",
        lg: "h-10 px-4 text-base",
      },
      variant: {
        default: "border-[var(--border-subtle,rgba(255,255,255,0.10))]",
        error:
          "border-[var(--border-danger,rgba(249,112,102,0.55))] focus:ring-[var(--border-danger,rgba(249,112,102,0.55))] focus:border-[var(--border-danger,rgba(249,112,102,0.55))]",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  },
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, variant, ...props }, ref) => {
    return (
      <input className={cn(inputVariants({ size, variant, className }))} ref={ref} {...props} />
    );
  },
);

Input.displayName = "Input";

export { Input };
