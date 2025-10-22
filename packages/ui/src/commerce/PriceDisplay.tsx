import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import { cn } from "../utils/cn";

const priceDisplayVariants = cva("", {
  variants: {
    variant: {
      default: "text-fg",
      muted: "text-fg-muted",
      success: "text-success",
      error: "text-error",
      warning: "text-warning",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    weight: "medium",
  },
});

export interface PriceDisplayProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof priceDisplayVariants> {
  amount: number;
  currency?: string;
  locale?: string;
  showCurrency?: boolean;
  originalPrice?: number;
  discount?: number;
  discountPercentage?: number;
  showDiscount?: boolean;
  prefix?: string;
  suffix?: string;
  formatOptions?: Intl.NumberFormatOptions;
}

export const PriceDisplay = React.forwardRef<HTMLDivElement, PriceDisplayProps>(
  (
    {
      className,
      variant,
      size,
      weight,
      amount,
      currency = "USD",
      locale = "en-US",
      showCurrency = true,
      originalPrice,
      discount,
      discountPercentage,
      showDiscount = true,
      prefix,
      suffix,
      formatOptions,
      ...props
    },
    ref,
  ) => {
    const formatPrice = (value: number) => {
      const options: Intl.NumberFormatOptions = {
        style: showCurrency ? "currency" : "decimal",
        currency: showCurrency ? currency : undefined,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        ...formatOptions,
      };

      return new Intl.NumberFormat(locale, options).format(value);
    };

    const hasDiscount = Boolean(originalPrice && originalPrice > amount);
    const displayDiscount = discount || (originalPrice ? originalPrice - amount : 0);
    const displayDiscountPercentage =
      discountPercentage ||
      (originalPrice ? Math.round(((originalPrice - amount) / originalPrice) * 100) : 0);

    return (
      <div ref={ref} className={cn("flex items-center gap-2", className)} {...props}>
        {prefix && <span className="text-fg-muted">{prefix}</span>}

        <div className="flex items-center gap-2">
          {hasDiscount && showDiscount && (
            <span
              className={cn(
                priceDisplayVariants({ variant: "muted", size: "sm", weight: "normal" }),
              )}
            >
              {formatPrice(originalPrice ?? 0)}
            </span>
          )}

          <span className={cn(priceDisplayVariants({ variant, size, weight }))}>
            {formatPrice(amount)}
          </span>

          {hasDiscount && showDiscount && (
            <span
              className={cn(
                priceDisplayVariants({
                  variant: "success",
                  size: "sm",
                  weight: "medium",
                }),
                "bg-success/10 px-2 py-1 rounded-md",
              )}
            >
              -{displayDiscountPercentage}%
            </span>
          )}
        </div>

        {suffix && <span className="text-fg-muted">{suffix}</span>}
      </div>
    );
  },
);

PriceDisplay.displayName = "PriceDisplay";
