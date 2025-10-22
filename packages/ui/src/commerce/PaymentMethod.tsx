"use client";

import { forwardRef } from "react";
import { CheckCircle, CreditCard, Wallet, XCircle } from "../icons";
import { type VariantProps, cn, cva } from "../utils";

export type PaymentMethodType = "crypto" | "card" | "paypal" | "applepay";

export interface PaymentMethodItem {
  id: string;
  type: PaymentMethodType;
  name: string;
  icon?: React.ReactNode;
  isDefault?: boolean;
  isAvailable?: boolean;
}

export interface PaymentMethodProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect">,
    VariantProps<typeof paymentMethodVariants> {
  method: PaymentMethodItem;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
}

const paymentMethodVariants = cva(
  "relative flex gap-3 rounded-lg border transition-all duration-200 cursor-pointer",
  {
    variants: {
      variant: {
        default: "flex-col items-start p-4",
        compact: "flex-row items-center p-3",
        detailed: "flex-col items-start p-5",
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
  },
);

const PaymentMethod = forwardRef<HTMLDivElement, PaymentMethodProps>(
  ({ className, method, isSelected = false, variant, size, onSelect, ...props }, ref) => {
    const getIcon = () => {
      if (method.icon) return method.icon;
      switch (method.type) {
        case "crypto":
          return <Wallet className="h-5 w-5" />;
        case "card":
          return <CreditCard className="h-5 w-5" />;
        case "paypal":
          return <XCircle className="h-5 w-5" />; // Placeholder for PayPal icon
        case "applepay":
          return <XCircle className="h-5 w-5" />; // Placeholder for Apple Pay icon
        default:
          return <Wallet className="h-5 w-5" />;
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          paymentMethodVariants({ variant, size }),
          "bg-bg-elevated",
          method.isAvailable
            ? "border-border-subtle hover:border-border-brand"
            : "border-border-subtle opacity-50 cursor-not-allowed",
          isSelected && method.isAvailable ? "border-border-brand ring-2 ring-brand-ring" : "",
          className,
        )}
        onClick={method.isAvailable ? () => onSelect?.(method.id) : undefined}
        role="radio"
        aria-checked={isSelected}
        tabIndex={method.isAvailable ? 0 : -1}
        {...props}
      >
        {isSelected && method.isAvailable && (
          <CheckCircle className="absolute top-3 right-3 h-5 w-5 text-semantic-success" />
        )}
        {!method.isAvailable && (
          <XCircle className="absolute top-3 right-3 h-5 w-5 text-semantic-danger" />
        )}

        <div className="flex-shrink-0">{getIcon()}</div>

        <div className="flex-1 min-w-0">
          <div className="font-medium text-fg-default truncate">{method.name}</div>
          {variant === "detailed" && (
            <p className="text-sm text-fg-muted">
              {method.isDefault && "Default method"}
              {!method.isAvailable && "Unavailable"}
            </p>
          )}
        </div>
      </div>
    );
  },
);

PaymentMethod.displayName = "PaymentMethod";

export { PaymentMethod };
