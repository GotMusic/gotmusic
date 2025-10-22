import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import { cn } from "../utils/cn";

const paymentMethodVariants = cva(
  "flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all hover:border-border-strong focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
  {
    variants: {
      variant: {
        card: "border-border-default",
        crypto: "border-border-default",
        wallet: "border-border-default",
      },
      selected: {
        true: "border-primary bg-primary/5",
        false: "border-border-default",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      variant: "card",
      selected: false,
      disabled: false,
    },
  },
);

export interface PaymentMethodProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick">,
    VariantProps<typeof paymentMethodVariants> {
  type: "card" | "crypto" | "wallet";
  name: string;
  description?: string;
  icon?: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  onSelect?: () => void;
}

export const PaymentMethod = React.forwardRef<HTMLDivElement, PaymentMethodProps>(
  (
    {
      className,
      variant,
      selected,
      disabled,
      type,
      name,
      description,
      icon,
      onClick,
      onSelect,
      ...props
    },
    ref,
  ) => {
    const handleClick = () => {
      if (disabled) return;
      onClick?.();
      onSelect?.();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick();
      }
    };

    const getDefaultIcon = () => {
      switch (type) {
        case "card":
          return (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              role="img"
              aria-label="Credit Card"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          );
        case "crypto":
          return (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              role="img"
              aria-label="Cryptocurrency"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
          );
        case "wallet":
          return (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              role="img"
              aria-label="Digital Wallet"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          );
        default:
          return null;
      }
    };

    return (
      <div
        ref={ref}
        className={cn(paymentMethodVariants({ variant, selected, disabled }), className)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        // biome-ignore lint/a11y/useSemanticElements: Using div with role="button" for better styling control
        role="button"
        aria-pressed={selected}
        aria-disabled={disabled}
        {...props}
      >
        <div className="flex-shrink-0">{icon || getDefaultIcon()}</div>

        <div className="flex-1 min-w-0">
          <div className="font-medium text-fg">{name}</div>
          {description && <div className="text-sm text-fg-muted mt-1">{description}</div>}
        </div>

        <div className="flex-shrink-0">
          {selected ? (
            <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
              <svg
                className="h-3 w-3 text-fg-inverse"
                fill="currentColor"
                viewBox="0 0 20 20"
                role="img"
                aria-label="Selected"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ) : (
            <div className="h-5 w-5 rounded-full border-2 border-border-default" />
          )}
        </div>
      </div>
    );
  },
);

PaymentMethod.displayName = "PaymentMethod";
