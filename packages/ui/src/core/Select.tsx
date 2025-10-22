import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import { cn } from "../utils/cn";

const selectVariants = cva(
  "flex h-10 w-full items-center justify-between rounded-md border bg-bg-elevated px-3 py-2 text-sm ring-offset-bg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-border-default focus-visible:ring-primary",
        error: "border-error focus-visible:ring-error",
        success: "border-success focus-visible:ring-success",
      },
      size: {
        sm: "h-8 px-2 text-xs",
        md: "h-10 px-3 text-sm",
        lg: "h-11 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">,
    VariantProps<typeof selectVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  options: SelectOption[];
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      variant,
      size,
      label,
      error,
      helperText,
      placeholder,
      options,
      leftIcon,
      rightIcon,
      id,
      ...props
    },
    ref,
  ) => {
    const hasError = Boolean(error);
    const selectVariant = hasError ? "error" : variant;
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="space-y-1">
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-fg">
            {label}
            {props.required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted">{leftIcon}</div>
          )}
          <select
            id={selectId}
            className={cn(
              selectVariants({ variant: selectVariant, size }),
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className,
            )}
            ref={ref}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="text-sm text-error">{error}</p>}
        {helperText && !error && <p className="text-sm text-fg-muted">{helperText}</p>}
      </div>
    );
  },
);

Select.displayName = "Select";
