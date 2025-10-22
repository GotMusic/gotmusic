import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import { cn } from "../utils/cn";

const checkoutCTAVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-primary text-fg-inverse hover:bg-primary/90 focus:ring-primary",
        secondary: "bg-secondary text-fg-inverse hover:bg-secondary/90 focus:ring-secondary",
        outline:
          "border border-primary text-primary hover:bg-primary hover:text-fg-inverse focus:ring-primary",
        ghost: "text-primary hover:bg-primary/10 focus:ring-primary",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
        xl: "px-8 py-4 text-lg",
      },
      checkoutType: {
        single: "",
        cart: "",
        subscription: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      checkoutType: "single",
    },
  },
);

export interface CheckoutCTAProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "type">,
    VariantProps<typeof checkoutCTAVariants> {
  checkoutType: "single" | "cart" | "subscription";
  totalAmount?: number;
  currency?: string;
  itemCount?: number;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const CheckoutCTA = React.forwardRef<HTMLButtonElement, CheckoutCTAProps>(
  (
    {
      className,
      variant,
      size,
      checkoutType,
      totalAmount,
      currency = "USD",
      itemCount,
      loading = false,
      disabled = false,
      onClick,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref,
  ) => {
    const formatPrice = (amount: number) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);
    };

    const getButtonText = () => {
      if (children) return children;

      switch (checkoutType) {
        case "single":
          return totalAmount ? `Buy for ${formatPrice(totalAmount)}` : "Buy Now";
        case "cart":
          return itemCount
            ? `Checkout (${itemCount} ${itemCount === 1 ? "item" : "items"})`
            : "Checkout";
        case "subscription":
          return totalAmount ? `Subscribe for ${formatPrice(totalAmount)}/month` : "Subscribe";
        default:
          return "Checkout";
      }
    };

    const getButtonIcon = () => {
      if (loading) {
        return (
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
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        );
      }

      switch (checkoutType) {
        case "single":
          return (
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              role="img"
              aria-label="Buy"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
              />
            </svg>
          );
        case "cart":
          return (
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              role="img"
              aria-label="Cart"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
              />
            </svg>
          );
        case "subscription":
          return (
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              role="img"
              aria-label="Subscribe"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          );
        default:
          return null;
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        className={cn(checkoutCTAVariants({ variant, size, checkoutType }), className)}
        disabled={disabled || loading}
        onClick={onClick}
        aria-label={String(getButtonText())}
        {...props}
      >
        {leftIcon && !loading && leftIcon}

        {loading ? getButtonIcon() : leftIcon || getButtonIcon()}

        <span>{getButtonText()}</span>

        {rightIcon && !loading && rightIcon}
      </button>
    );
  },
);

CheckoutCTA.displayName = "CheckoutCTA";
