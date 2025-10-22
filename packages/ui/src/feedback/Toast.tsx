import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import { cn } from "../utils/cn";

const toastVariants = cva(
  "relative flex w-full items-center gap-3 rounded-lg border p-4 shadow-lg transition-all",
  {
    variants: {
      variant: {
        success: "border-success bg-success/10 text-success-foreground",
        error: "border-error bg-error/10 text-error-foreground",
        warning: "border-warning bg-warning/10 text-warning-foreground",
        info: "border-primary bg-primary/10 text-primary-foreground",
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
  },
);

export interface ToastProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClose">,
    VariantProps<typeof toastVariants> {
  title?: string;
  description?: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
  persistent?: boolean;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      className,
      variant,
      size,
      title,
      description,
      onClose,
      autoClose = true,
      duration = 5000,
      persistent = false,
      icon,
      action,
      children,
      ...props
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = React.useState(true);

    React.useEffect(() => {
      if (autoClose && !persistent && duration > 0) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => onClose?.(), 300); // Allow fade out animation
        }, duration);

        return () => clearTimeout(timer);
      }
    }, [autoClose, persistent, duration, onClose]);

    const handleClose = () => {
      setIsVisible(false);
      setTimeout(() => onClose?.(), 300);
    };

    if (!isVisible) return null;

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
        className={cn(
          toastVariants({ variant, size }),
          "animate-in slide-in-from-right-full",
          className,
        )}
        role="alert"
        aria-live="polite"
        {...props}
      >
        <div className="flex-shrink-0">
          {icon || <span className="text-lg">{getDefaultIcon()}</span>}
        </div>

        <div className="flex-1 min-w-0">
          {title && <div className="font-medium text-fg">{title}</div>}
          {description && <div className="text-sm text-fg-muted mt-1">{description}</div>}
          {children && <div className="mt-2">{children}</div>}
        </div>

        {action && <div className="flex-shrink-0 ml-2">{action}</div>}

        {!persistent && onClose && (
          <button
            type="button"
            onClick={handleClose}
            className="flex-shrink-0 ml-2 p-1 rounded-md hover:bg-bg-subtle transition-colors"
            aria-label="Close notification"
          >
            <span className="text-lg">×</span>
          </button>
        )}
      </div>
    );
  },
);

Toast.displayName = "Toast";
