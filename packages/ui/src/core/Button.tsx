import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import { cn } from "../utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-primary text-fg-inverse hover:bg-primary/90 focus-visible:ring-primary",
        secondary: "bg-secondary text-fg hover:bg-secondary/80 focus-visible:ring-secondary",
        danger: "bg-error text-fg-inverse hover:bg-error/90 focus-visible:ring-error",
        ghost: "text-fg hover:bg-bg-subtle focus-visible:ring-primary",
        outline:
          "border border-border-default text-fg hover:bg-bg-subtle focus-visible:ring-primary",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-8 text-base",
        icon: "h-10 w-10",
      },
      loading: {
        true: "cursor-wait",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      loading: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        className={cn(buttonVariants({ variant, size, loading }), className)}
        disabled={isDisabled}
        ref={ref}
        {...props}
      >
        {loading && (
          <svg
            className="h-4 w-4 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Loading"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              fill="currentColor"
            />
          </svg>
        )}
        {!loading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        {children && <span>{children}</span>}
        {!loading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    );
  },
);

Button.displayName = "Button";
