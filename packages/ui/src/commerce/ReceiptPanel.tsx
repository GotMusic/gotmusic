import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import { cn } from "../utils/cn";

const receiptPanelVariants = cva("rounded-lg border p-6 space-y-4", {
  variants: {
    variant: {
      success: "border-success bg-success/5 text-success",
      error: "border-error bg-error/5 text-error",
      pending: "border-warning bg-warning/5 text-warning",
    },
    size: {
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
  },
  defaultVariants: {
    variant: "success",
    size: "md",
  },
});

export interface ReceiptPanelProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof receiptPanelVariants> {
  status: "success" | "error" | "pending";
  transactionId?: string;
  amount?: number;
  currency?: string;
  description?: string;
  timestamp?: Date;
  paymentMethod?: string;
  onRetry?: () => void;
  onDownload?: () => void;
  onShare?: () => void;
}

export const ReceiptPanel = React.forwardRef<HTMLDivElement, ReceiptPanelProps>(
  (
    {
      className,
      variant,
      size,
      status,
      transactionId,
      amount,
      currency = "USD",
      description,
      timestamp,
      paymentMethod,
      onRetry,
      onDownload,
      onShare,
      ...props
    },
    ref,
  ) => {
    const formatPrice = (value: number) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    };

    const formatDate = (date: Date) => {
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    };

    const getStatusIcon = () => {
      switch (status) {
        case "success":
          return (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              role="img"
              aria-label="Success"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          );
        case "error":
          return (
            <svg
              className="h-6 w-6"
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
          );
        case "pending":
          return (
            <svg
              className="h-6 w-6 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              role="img"
              aria-label="Processing"
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

    const getStatusText = () => {
      switch (status) {
        case "success":
          return "Payment Successful";
        case "error":
          return "Payment Failed";
        case "pending":
          return "Processing Payment";
        default:
          return "Unknown Status";
      }
    };

    return (
      <div ref={ref} className={cn(receiptPanelVariants({ variant, size }), className)} {...props}>
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <h3 className="text-lg font-semibold">{getStatusText()}</h3>
        </div>

        {description && <p className="text-sm text-fg-muted">{description}</p>}

        <div className="space-y-2">
          {transactionId && (
            <div className="flex justify-between text-sm">
              <span className="text-fg-muted">Transaction ID:</span>
              <span className="font-mono text-fg">{transactionId}</span>
            </div>
          )}

          {amount && (
            <div className="flex justify-between text-sm">
              <span className="text-fg-muted">Amount:</span>
              <span className="font-semibold text-fg">{formatPrice(amount)}</span>
            </div>
          )}

          {paymentMethod && (
            <div className="flex justify-between text-sm">
              <span className="text-fg-muted">Payment Method:</span>
              <span className="text-fg">{paymentMethod}</span>
            </div>
          )}

          {timestamp && (
            <div className="flex justify-between text-sm">
              <span className="text-fg-muted">Date:</span>
              <span className="text-fg">{formatDate(timestamp)}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-4 border-t border-border-subtle">
          {status === "error" && onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="px-4 py-2 bg-error text-fg-inverse rounded-md hover:bg-error/90 transition-colors"
            >
              Retry Payment
            </button>
          )}

          {status === "success" && onDownload && (
            <button
              type="button"
              onClick={onDownload}
              className="px-4 py-2 bg-primary text-fg-inverse rounded-md hover:bg-primary/90 transition-colors"
            >
              Download Receipt
            </button>
          )}

          {status === "success" && onShare && (
            <button
              type="button"
              onClick={onShare}
              className="px-4 py-2 border border-border-default text-fg rounded-md hover:bg-bg-subtle transition-colors"
            >
              Share
            </button>
          )}
        </div>
      </div>
    );
  },
);

ReceiptPanel.displayName = "ReceiptPanel";
