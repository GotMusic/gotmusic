"use client";

import { forwardRef } from "react";
import { ArrowRight, ShoppingCart, Star, Wallet } from "../icons";
import { type VariantProps, cn, cva } from "../utils";

export interface CheckoutCTAProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">,
    VariantProps<typeof checkoutCTAVariants> {
  type?: "single" | "cart" | "subscription";
  status?: "idle" | "processing" | "success" | "error" | "disabled";
  showIcon?: boolean;
  showArrow?: boolean;
  onCheckout?: () => void;
}

const checkoutCTAVariants = cva(
  "relative flex items-center justify-between w-full overflow-hidden rounded-lg transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg-default disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-brand-primary text-bg-inverse hover:opacity-95",
        secondary: "bg-bg-elevated text-fg-default hover:bg-bg-active border border-border-subtle",
        outline:
          "bg-transparent text-fg-default border border-border-brand hover:bg-brand-primary/10",
      },
      size: {
        sm: "p-3 text-sm",
        md: "p-4 text-base",
        lg: "p-5 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

const CheckoutCTA = forwardRef<HTMLButtonElement, CheckoutCTAProps>(
  (
    {
      className,
      children,
      type = "single",
      status = "idle",
      variant,
      size,
      showIcon = true,
      showArrow = true,
      onCheckout,
      ...props
    },
    ref,
  ) => {
    const isDisabled = status === "processing" || status === "disabled";
    const isLoading = status === "processing";

    const content = {
      single: {
        icon: <Wallet className="h-5 w-5" />,
        text: "Buy Now",
        description: "Secure one-time purchase",
      },
      cart: {
        icon: <ShoppingCart className="h-5 w-5" />,
        text: "Checkout Cart",
        description: "Proceed with multiple items",
      },
      subscription: {
        icon: <Star className="h-5 w-5" />,
        text: "Subscribe & Save",
        description: "Unlock all content",
      },
    }[type];

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          checkoutCTAVariants({ variant, size }),
          {
            "opacity-50 cursor-not-allowed": isDisabled,
          },
          className,
        )}
        onClick={onCheckout}
        disabled={isDisabled}
        aria-live="polite"
        aria-atomic="true"
        {...props}
      >
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/10 to-brand-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showIcon && content.icon}
            <div className="flex flex-col">
              <span className="font-semibold">{children || content.text}</span>
              <span className="text-xs opacity-80">{content.description}</span>
            </div>
          </div>

          {showArrow && !isDisabled && (
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          )}
        </div>
      </button>
    );
  },
);

CheckoutCTA.displayName = "CheckoutCTA";

export { CheckoutCTA };
