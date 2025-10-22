"use client";

import { forwardRef } from "react";
import { CheckCircle, Download, ExternalLink, Spinner, X, XCircle } from "../icons";
import { type VariantProps, cn, cva } from "../utils";

export type ReceiptStatus = "success" | "error" | "pending";

export interface ReceiptPanelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof receiptPanelVariants> {
  status: ReceiptStatus;
  transaction: {
    id: string;
    amount: number;
    currency: string;
    timestamp: Date;
    method: string;
    hash?: string;
  };
  onDownload?: () => void;
  onViewTransaction?: () => void;
}

const receiptPanelVariants = cva("rounded-lg border p-6 transition-all duration-200", {
  variants: {
    variant: {
      success: "border-semantic-success bg-semantic-success/5",
      error: "border-semantic-danger bg-semantic-danger/5",
      pending: "border-semantic-warning bg-semantic-warning/5",
    },
    size: {
      sm: "p-4 text-sm",
      md: "p-6 text-base",
      lg: "p-8 text-lg",
    },
  },
  defaultVariants: {
    variant: "success",
    size: "md",
  },
});

const ReceiptPanel = forwardRef<HTMLDivElement, ReceiptPanelProps>(
  (
    { className, status, transaction, variant, size, onDownload, onViewTransaction, ...props },
    ref,
  ) => {
    const formatPrice = (amount: number, currency: string) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);
    };

    const formatTimestamp = (timestamp: Date) => {
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(timestamp);
    };

    const getStatusIcon = () => {
      switch (status) {
        case "success":
          return <CheckCircle className="h-6 w-6 text-semantic-success" />;
        case "error":
          return <XCircle className="h-6 w-6 text-semantic-danger" />;
        case "pending":
          return <Spinner className="h-6 w-6 text-semantic-warning animate-spin" />;
        default:
          return null;
      }
    };

    const getStatusText = () => {
      switch (status) {
        case "success":
          return "Transaction Successful";
        case "error":
          return "Transaction Failed";
        case "pending":
          return "Transaction Pending";
        default:
          return "Unknown Status";
      }
    };

    const getStatusColor = () => {
      switch (status) {
        case "success":
          return "text-semantic-success";
        case "error":
          return "text-semantic-danger";
        case "pending":
          return "text-semantic-warning";
        default:
          return "text-fg-muted";
      }
    };

    return (
      <div ref={ref} className={cn(receiptPanelVariants({ variant, size }), className)} {...props}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {getStatusIcon()}
            <div>
              <h3 className="font-semibold text-fg-default">{getStatusText()}</h3>
              <p className="text-sm text-fg-muted">Transaction #{transaction.id}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-fg-default">
              {formatPrice(transaction.amount, transaction.currency)}
            </div>
            <div className="text-sm text-fg-muted">{formatTimestamp(transaction.timestamp)}</div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-fg-muted">Payment Method:</span>
            <span className="text-fg-default">{transaction.method}</span>
          </div>

          {transaction.hash && (
            <div className="flex justify-between text-sm">
              <span className="text-fg-muted">Transaction Hash:</span>
              <span className="text-fg-default font-mono text-xs">
                {transaction.hash.slice(0, 8)}...{transaction.hash.slice(-8)}
              </span>
            </div>
          )}
        </div>

        {(onDownload || onViewTransaction) && (
          <div className="flex gap-2 mt-6 pt-4 border-t border-border-subtle">
            {onDownload && (
              <button
                type="button"
                onClick={onDownload}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-fg-default bg-bg-elevated hover:bg-bg-active rounded-md transition-colors duration-200"
              >
                <Download className="h-4 w-4" />
                Download Receipt
              </button>
            )}
            {onViewTransaction && transaction.hash && (
              <button
                type="button"
                onClick={onViewTransaction}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-fg-default bg-bg-elevated hover:bg-bg-active rounded-md transition-colors duration-200"
              >
                <ExternalLink className="h-4 w-4" />
                View on Explorer
              </button>
            )}
          </div>
        )}
      </div>
    );
  },
);

ReceiptPanel.displayName = "ReceiptPanel";

export { ReceiptPanel };
