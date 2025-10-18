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
  ({ className, label, error, required, disabled, htmlFor, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(fieldVariants({ className }))} {...props}>
        {label && (
          <label
            htmlFor={htmlFor}
            className={cn(
              "text-sm font-medium",
              disabled ? "text-fg/35" : "text-fg",
              error && "text-red-400",
            )}
          >
            {label}
            {required && <span className="ml-1 text-red-400">*</span>}
          </label>
        )}
        {children}
        {error && (
          <p className="text-xs text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Field.displayName = "Field";

export { Field };
