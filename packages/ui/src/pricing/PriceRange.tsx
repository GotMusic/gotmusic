"use client";

import { forwardRef, useCallback, useState } from "react";
import { type VariantProps, cn, cva } from "../utils";

export interface PriceRangeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof priceRangeVariants> {
  min?: number;
  max?: number;
  value?: [number, number];
  onChange?: (range: [number, number]) => void;
  step?: number;
  currency?: string;
  locale?: string;
  showLabels?: boolean;
  showValues?: boolean;
  disabled?: boolean;
}

const priceRangeVariants = cva("flex flex-col gap-4", {
  variants: {
    variant: {
      default: "text-fg-default",
      muted: "text-fg-muted",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

const PriceRange = forwardRef<HTMLDivElement, PriceRangeProps>(
  (
    {
      className,
      min = 0,
      max = 1000,
      value = [min, max],
      onChange,
      step = 1,
      currency = "PYUSD",
      locale = "en-US",
      showLabels = true,
      showValues = true,
      disabled = false,
      variant,
      size,
      ...props
    },
    ref,
  ) => {
    const [localValue, setLocalValue] = useState<[number, number]>(value);

    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(amount);
    };

    const handleMinChange = useCallback(
      (newMin: number) => {
        const newValue: [number, number] = [Math.min(newMin, localValue[1]), localValue[1]];
        setLocalValue(newValue);
        onChange?.(newValue);
      },
      [localValue, onChange],
    );

    const handleMaxChange = useCallback(
      (newMax: number) => {
        const newValue: [number, number] = [localValue[0], Math.max(newMax, localValue[0])];
        setLocalValue(newValue);
        onChange?.(newValue);
      },
      [localValue, onChange],
    );

    const handleRangeChange = useCallback(
      (newMin: number, newMax: number) => {
        const newValue: [number, number] = [newMin, newMax];
        setLocalValue(newValue);
        onChange?.(newValue);
      },
      [onChange],
    );

    const percentage = {
      min: ((localValue[0] - min) / (max - min)) * 100,
      max: ((localValue[1] - min) / (max - min)) * 100,
    };

    return (
      <div ref={ref} className={cn(priceRangeVariants({ variant, size }), className)} {...props}>
        {showLabels && (
          <div className="flex justify-between items-center">
            <label htmlFor="price-range-slider" className="text-sm font-medium text-fg-default">
              Price Range
            </label>
            {showValues && (
              <div className="text-sm text-fg-muted">
                {formatCurrency(localValue[0])} - {formatCurrency(localValue[1])}
              </div>
            )}
          </div>
        )}

        <div className="relative">
          {/* Track */}
          <div className="h-2 bg-bg-muted rounded-full">
            <div
              className="absolute h-2 bg-brand-primary rounded-full transition-all duration-200"
              style={{
                left: `${percentage.min}%`,
                width: `${percentage.max - percentage.min}%`,
              }}
            />
          </div>

          {/* Min Thumb */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={localValue[0]}
            onChange={(e) => handleMinChange(Number(e.target.value))}
            disabled={disabled}
            className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
            style={{ zIndex: localValue[0] > localValue[1] - 10 ? 1 : 2 }}
          />

          {/* Max Thumb */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={localValue[1]}
            onChange={(e) => handleMaxChange(Number(e.target.value))}
            disabled={disabled}
            className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
            style={{ zIndex: localValue[1] < localValue[0] + 10 ? 1 : 2 }}
          />

          {/* Thumb indicators */}
          <div
            className="absolute top-1/2 w-4 h-4 bg-brand-primary border-2 border-bg-elevated rounded-full transform -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
            style={{ left: `calc(${percentage.min}% - 8px)` }}
          />
          <div
            className="absolute top-1/2 w-4 h-4 bg-brand-primary border-2 border-bg-elevated rounded-full transform -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform"
            style={{ left: `calc(${percentage.max}% - 8px)` }}
          />
        </div>

        {/* Value inputs */}
        <div className="flex gap-2">
          <div className="flex-1">
            <label htmlFor="price-range-min" className="block text-xs text-fg-muted mb-1">
              Min
            </label>
            <input
              id="price-range-min"
              type="number"
              min={min}
              max={max}
              step={step}
              value={localValue[0]}
              onChange={(e) => handleMinChange(Number(e.target.value))}
              disabled={disabled}
              className="w-full px-2 py-1 text-sm bg-bg-elevated border border-border-subtle rounded text-fg-default focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary disabled:opacity-50"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="price-range-max" className="block text-xs text-fg-muted mb-1">
              Max
            </label>
            <input
              id="price-range-max"
              type="number"
              min={min}
              max={max}
              step={step}
              value={localValue[1]}
              onChange={(e) => handleMaxChange(Number(e.target.value))}
              disabled={disabled}
              className="w-full px-2 py-1 text-sm bg-bg-elevated border border-border-subtle rounded text-fg-default focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary disabled:opacity-50"
            />
          </div>
        </div>
      </div>
    );
  },
);

PriceRange.displayName = "PriceRange";

export { PriceRange };
