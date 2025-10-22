import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import { cn } from "../utils/cn";

const checkboxVariants = cva(
  "peer h-4 w-4 shrink-0 rounded-sm border border-border-default ring-offset-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-fg-inverse data-[state=checked]:border-primary",
  {
    variants: {
      size: {
        sm: "h-3 w-3",
        md: "h-4 w-4",
        lg: "h-5 w-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">,
    VariantProps<typeof checkboxVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  indeterminate?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, size, label, error, helperText, indeterminate = false, id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = Boolean(error);

    return (
      <div className="space-y-1">
        <div className="flex items-start space-x-2">
          <div className="relative">
            <input
              type="checkbox"
              id={checkboxId}
              ref={ref}
              className={cn(checkboxVariants({ size }), className)}
              data-state={indeterminate ? "indeterminate" : undefined}
              {...props}
            />
            {indeterminate && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="h-3 w-3 text-fg-inverse"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  role="img"
                  aria-label="Indeterminate"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
          {label && (
            <label
              htmlFor={checkboxId}
              className={cn(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                hasError && "text-error",
              )}
            >
              {label}
              {props.required && <span className="text-error ml-1">*</span>}
            </label>
          )}
        </div>
        {error && <p className="text-sm text-error">{error}</p>}
        {helperText && !error && <p className="text-sm text-fg-muted">{helperText}</p>}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
