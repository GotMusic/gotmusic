import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import { cn } from "../utils/cn";

const alertVariants = cva("relative flex w-full items-start gap-3 rounded-lg border p-4", {
  variants: {
    variant: {
      info: "border-primary bg-primary/5 text-primary",
      success: "border-success bg-success/5 text-success",
      warning: "border-warning bg-warning/5 text-warning",
      error: "border-error bg-error/5 text-error",
    },
    size: {
      sm: "p-3 text-sm",
      md: "p-4 text-sm",
      lg: "p-5 text-base",
    },
  },
  defaultVariants: {
    variant: "info",
    size: "md",
  },
});

export interface AlertProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClose">,
    VariantProps<typeof alertVariants> {
  title?: string;
  description?: string;
  onClose?: () => void;
  dismissible?: boolean;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant,
      size,
      title,
      description,
      onClose,
      dismissible = false,
      icon,
      action,
      children,
      ...props
    },
    ref,
  ) => {
    const getDefaultIcon = () => {
      switch (variant) {
        case "success":
          return "✓";
        case "error":
          return "✕";
        case "warning":
          return "⚠";
        default:
          return "ℹ";
      }
    };

    return (
      <div
        ref={ref}
        className={cn(alertVariants({ variant, size }), className)}
        role="alert"
        aria-live="polite"
        {...props}
      >
        <div className="flex-shrink-0 mt-0.5">
          {icon || <span className="text-lg">{getDefaultIcon()}</span>}
        </div>

        <div className="flex-1 min-w-0">
          {title && <div className="font-medium text-fg">{title}</div>}
          {description && <div className="text-sm text-fg-muted mt-1">{description}</div>}
          {children && <div className="mt-2">{children}</div>}
        </div>

        {action && <div className="flex-shrink-0 ml-2">{action}</div>}

        {dismissible && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex-shrink-0 ml-2 p-1 rounded-md hover:bg-bg-subtle transition-colors"
            aria-label="Dismiss alert"
          >
            <span className="text-lg">×</span>
          </button>
        )}
      </div>
    );
  },
);

Alert.displayName = "Alert";
