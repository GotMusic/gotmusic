import { type VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "../utils";

const inputVariants = cva(
  "flex w-full rounded-sm border bg-bg-muted px-3 py-2 text-sm text-fg placeholder:text-fg/50 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-8 px-2 text-xs",
        md: "h-9 px-3 text-sm",
        lg: "h-10 px-4 text-base",
      },
      variant: {
        default: "border-border-subtle",
        error: "border-red-400 focus:ring-red-400 focus:border-red-400",
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
