import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import { cn } from "../utils/cn";

const buyButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-primary text-fg-inverse hover:bg-primary/90 focus:ring-primary",
        secondary: "bg-secondary text-fg-inverse hover:bg-secondary/90 focus:ring-secondary",
        success: "bg-success text-fg-inverse hover:bg-success/90 focus:ring-success",
        danger: "bg-error text-fg-inverse hover:bg-error/90 focus:ring-error",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
      },
      state: {
        idle: "",
        processing: "animate-pulse",
        success: "",
        error: "",
        disabled: "opacity-50 cursor-not-allowed",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      state: "idle",
    },
  },
);

export interface BuyButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick">,
    VariantProps<typeof buyButtonVariants> {
  price?: string;
  currency?: string;
  loading?: boolean;
  success?: boolean;
  error?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const BuyButton = React.forwardRef<HTMLButtonElement, BuyButtonProps>(
  (
    {
      className,
      variant,
      size,
      state,
      price,
      currency = "USD",
      loading = false,
      success = false,
      error = false,
      disabled = false,
      onClick,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref,
  ) => {
    const [currentState, setCurrentState] = React.useState<
      "idle" | "processing" | "success" | "error"
    >("idle");

    React.useEffect(() => {
      if (loading) setCurrentState("processing");
      else if (success) setCurrentState("success");
      else if (error) setCurrentState("error");
      else setCurrentState("idle");
    }, [loading, success, error]);

    const handleClick = () => {
      if (disabled || loading) return;
      onClick?.();
    };

    const getButtonText = () => {
      if (currentState === "processing") return "Processing...";
      if (currentState === "success") return "Purchased";
      if (currentState === "error") return "Retry";
      if (price) return `Buy ${price} ${currency}`;
      return children || "Buy Now";
    };

    const getButtonVariant = () => {
      if (currentState === "success") return "success";
      if (currentState === "error") return "danger";
      return variant;
    };

    const getButtonState = () => {
      if (disabled) return "disabled";
      return currentState;
    };

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          buyButtonVariants({
            variant: getButtonVariant(),
            size,
            state: getButtonState(),
          }),
          className,
        )}
        disabled={disabled || loading}
        onClick={handleClick}
        aria-label={String(getButtonText())}
        {...props}
      >
        {currentState === "processing" && (
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
        )}

        {currentState === "success" && (
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            role="img"
            aria-label="Success"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}

        {currentState === "error" && (
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            role="img"
            aria-label="Error"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}

        {leftIcon && currentState === "idle" && leftIcon}

        <span>{getButtonText()}</span>

        {rightIcon && currentState === "idle" && rightIcon}
      </button>
    );
  },
);

BuyButton.displayName = "BuyButton";
