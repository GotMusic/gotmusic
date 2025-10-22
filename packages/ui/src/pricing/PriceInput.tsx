"use client";

import { forwardRef, useState } from "react";
import { type VariantProps, cn, cva } from "../utils";

export interface PriceInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "size">,
    VariantProps<typeof priceInputVariants> {
  value?: number | null;
  currency?: string;
  locale?: string;
  onChange?: (value: number | null) => void;
  onCurrencyChange?: (currency: string) => void;
  showCurrency?: boolean;
  allowNegative?: boolean;
  precision?: number;
}

const priceInputVariants = cva(
  "flex items-center gap-2 px-3 py-2 border rounded-md bg-bg-elevated text-fg-default placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors",
  {
    variants: {
      variant: {
        default: "border-border-subtle",
        error: "border-semantic-danger focus:ring-semantic-danger/20 focus:border-semantic-danger",
        success:
          "border-semantic-success focus:ring-semantic-success/20 focus:border-semantic-success",
      },
      size: {
        sm: "text-sm px-2 py-1",
        md: "text-base px-3 py-2",
        lg: "text-lg px-4 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

const PriceInput = forwardRef<HTMLInputElement, PriceInputProps>(
  (
    {
      className,
      value,
      currency = "PYUSD",
      locale = "en-US",
      onChange,
      onCurrencyChange,
      showCurrency = true,
      allowNegative = false,
      precision = 2,
      variant,
      size,
      ...props
    },
    ref,
  ) => {
    const [displayValue, setDisplayValue] = useState(
      value !== undefined && value !== null ? value.toString() : "",
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setDisplayValue(inputValue);

      // Parse the numeric value
      const numericValue = Number.parseFloat(inputValue);
      if (Number.isNaN(numericValue)) {
        onChange?.(null);
        return;
      }

      // Check for negative values if not allowed
      if (!allowNegative && numericValue < 0) {
        return;
      }

      // Round to specified precision
      const roundedValue = Math.round(numericValue * 10 ** precision) / 10 ** precision;
      onChange?.(roundedValue);
    };

    const formatCurrency = (amount: number, currencyCode: string) => {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
      }).format(amount);
    };

    return (
      <div className={cn(priceInputVariants({ variant, size }), className)}>
        <input
          ref={ref}
          type="number"
          value={displayValue}
          onChange={handleInputChange}
          step={1 / 10 ** precision}
          min={allowNegative ? undefined : 0}
          placeholder="0.00"
          className="flex-1 bg-transparent border-none outline-none text-fg-default placeholder:text-fg-muted"
          {...props}
        />
        {showCurrency && (
          <span className="text-sm text-fg-muted font-medium uppercase tracking-wide">
            {currency}
          </span>
        )}
      </div>
    );
  },
);

PriceInput.displayName = "PriceInput";

export { PriceInput };
