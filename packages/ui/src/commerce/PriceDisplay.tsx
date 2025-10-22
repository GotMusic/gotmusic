"use client";

import { forwardRef } from "react";
import { type VariantProps, cn, cva } from "../utils";

export interface PriceDisplayProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof priceDisplayVariants> {
  price: {
    currency: string;
    amount: number;
    originalAmount?: number | null;
    discount?: number | null;
  };
  locale?: string; // e.g., "en-US", "de-DE"
  showCurrency?: boolean;
  showDiscount?: boolean;
  showOriginal?: boolean;
}

const priceDisplayVariants = cva("flex flex-col gap-1", {
  variants: {
    variant: {
      default: "text-fg-default",
      highlight: "text-brand-primary",
      muted: "text-fg-muted",
    },
    size: {
      sm: "text-base",
      md: "text-lg",
      lg: "text-xl",
      xl: "text-2xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

const PriceDisplay = forwardRef<HTMLDivElement, PriceDisplayProps>(
  (
    {
      className,
      price,
      variant,
      size,
      locale = "en-US",
      showCurrency = true,
      showDiscount = true,
      showOriginal = true,
      ...props
    },
    ref,
  ) => {
    const formatPrice = (amount: number, currency: string) => {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);
    };

    const hasDiscount = price.originalAmount && price.originalAmount > price.amount;
    const discountPercentage =
      hasDiscount && price.originalAmount
        ? Math.round(((price.originalAmount - price.amount) / price.originalAmount) * 100)
        : 0;

    return (
      <div ref={ref} className={cn(priceDisplayVariants({ variant, size }), className)} {...props}>
        <div className="flex items-baseline gap-2">
          <span className="font-semibold">{formatPrice(price.amount, price.currency)}</span>

          {showCurrency && (
            <span className="text-xs text-fg-muted uppercase tracking-wide">{price.currency}</span>
          )}
        </div>

        {showOriginal && hasDiscount && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-fg-muted line-through">
              {price.originalAmount && formatPrice(price.originalAmount, price.currency)}
            </span>
            {showDiscount && discountPercentage > 0 && (
              <span className="text-xs font-medium text-semantic-success bg-semantic-success/10 px-2 py-1 rounded-sm">
                -{discountPercentage}%
              </span>
            )}
          </div>
        )}
      </div>
    );
  },
);

PriceDisplay.displayName = "PriceDisplay";

export { PriceDisplay };
