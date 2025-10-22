"use client";

import { forwardRef, useState } from "react";
import { Check, CreditCard, Lock, ShoppingCart, Spinner, X } from "../icons";
import { type VariantProps, cn, cva } from "../utils";

export interface BuyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buyButtonVariants> {
  price?: {
    currency: string;
    amount: number;
    originalAmount?: number;
    discount?: number;
  };
  status?: "idle" | "processing" | "success" | "error" | "disabled";
  showPrice?: boolean;
  showIcon?: boolean;
  onPurchase?: () => void;
}

const buyButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium rounded-md transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg-default disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-brand-primary text-bg-inverse hover:opacity-95",
        secondary: "bg-bg-elevated text-fg-default hover:bg-bg-active border border-border-subtle",
        outline:
          "bg-transparent text-fg-default border border-border-brand hover:bg-brand-primary/10",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-11 px-5 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

const BuyButton = forwardRef<HTMLButtonElement, BuyButtonProps>(
  (
    {
      className,
      price,
      status = "idle",
      size,
      variant,
      showPrice = true,
      showIcon = true,
      onPurchase,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const [isPressed, setIsPressed] = useState(false);

    const isDisabled = disabled || status === "disabled" || status === "processing";

    const formatPrice = (amount: number, currency: string) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency === "PYUSD" ? "USD" : currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);
    };

    const getButtonContent = () => {
      switch (status) {
        case "processing":
          return (
            <>
              {showIcon && <Spinner className="h-4 w-4 animate-spin" />}
              Processing...
            </>
          );
        case "success":
          return (
            <>
              {showIcon && <Check className="h-4 w-4" />}
              Purchased
            </>
          );
        case "error":
          return (
            <>
              {showIcon && <X className="h-4 w-4" />}
              Error
            </>
          );
        case "disabled":
          return (
            <>
              {showIcon && <Lock className="h-4 w-4" />}
              Unavailable
            </>
          );
        default:
          return (
            <>
              {showIcon && <ShoppingCart className="h-4 w-4" />}
              {children || "Buy Now"}
            </>
          );
      }
    };

    const hasDiscount = price?.originalAmount && price.originalAmount > price.amount;
    const discountPercentage =
      hasDiscount && price.originalAmount
        ? Math.round(((price.originalAmount - price.amount) / price.originalAmount) * 100)
        : 0;

    return (
      <div className="flex flex-col gap-2">
        {showPrice && price && (
          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg font-semibold text-fg-default">
                {formatPrice(price.amount, price.currency)}
              </span>
              {hasDiscount && price.originalAmount && (
                <span className="text-sm text-fg-muted line-through">
                  {formatPrice(price.originalAmount, price.currency)}
                </span>
              )}
            </div>
            {discountPercentage > 0 && (
              <div className="text-xs text-semantic-success">-{discountPercentage}% off</div>
            )}
          </div>
        )}

        <button
          ref={ref}
          type="button"
          className={cn(
            buyButtonVariants({ variant, size }),
            {
              "opacity-50 cursor-not-allowed": isDisabled,
              "scale-95": isPressed,
            },
            className,
          )}
          onClick={onPurchase}
          disabled={isDisabled}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onMouseLeave={() => setIsPressed(false)}
          aria-live="polite"
          aria-atomic="true"
          {...props}
        >
          {getButtonContent()}
        </button>
      </div>
    );
  },
);

BuyButton.displayName = "BuyButton";

export { BuyButton };
