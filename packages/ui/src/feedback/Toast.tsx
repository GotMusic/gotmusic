"use client";

import { type VariantProps, cva } from "class-variance-authority";
import React, { forwardRef } from "react";
import { cn } from "../utils";

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        success: "border-green-500/20 bg-green-500/10 text-green-700 dark:text-green-300",
        warning: "border-yellow-500/20 bg-yellow-500/10 text-yellow-700 dark:text-yellow-300",
        error: "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-300",
        info: "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300",
      },
      size: {
        sm: "p-4 pr-6 text-sm",
        md: "p-6 pr-8",
        lg: "p-8 pr-10 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  onClose?: () => void;
  duration?: number;
}

const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      className,
      variant,
      size,
      title,
      description,
      action,
      onClose,
      duration = 5000,
      children,
      ...props
    },
    ref,
  ) => {
    // Auto-dismiss after duration
    React.useEffect(() => {
      if (duration > 0 && onClose) {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
      }
    }, [duration, onClose]);

    return (
      <div
        ref={ref}
        className={cn(toastVariants({ variant, size }), className)}
        role="alert"
        aria-live="polite"
        {...props}
      >
        <div className="flex-1 space-y-1">
          {title && (
            <div className="text-sm font-semibold" aria-label={title}>
              {title}
            </div>
          )}
          {description && (
            <div className="text-sm opacity-90" aria-label={description}>
              {description}
            </div>
          )}
          {children}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-2 top-2 rounded-md p-1 text-current opacity-70 hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-current"
            aria-label="Close notification"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    );
  },
);
Toast.displayName = "Toast";

export { Toast, toastVariants };
