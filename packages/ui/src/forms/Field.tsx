import { type VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "../utils";

const fieldVariants = cva("flex flex-col gap-1", {
  variants: {
    size: {
      sm: "gap-1",
      md: "gap-2",
      lg: "gap-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface FieldProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof fieldVariants> {
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  htmlFor?: string;
}

const Field = forwardRef<HTMLDivElement, FieldProps>(
  ({ className, label, error, required, disabled, htmlFor, children, size, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(fieldVariants({ size, className }))} {...props}>
        {label && (
          <label
            htmlFor={htmlFor}
            className={cn(
              "text-sm font-medium",
              disabled
                ? "text-[var(--color-state-disabled-fg,rgba(230,234,242,0.35))]"
                : "text-[var(--color-fg,#E6EAF2)]",
              error && "text-[var(--color-semantic-danger,#F97066)]",
            )}
          >
            {label}
            {required && (
              <span className="ml-1 text-[var(--color-semantic-danger,#F97066)]">*</span>
            )}
          </label>
        )}
        {children}
        {error && (
          <p
            className="text-xs text-[var(--color-semantic-danger,#F97066)]"
            role="alert"
            id={htmlFor ? `${htmlFor}-error` : undefined}
            aria-live="polite"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

Field.displayName = "Field";

export { Field };
