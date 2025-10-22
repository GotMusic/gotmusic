import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import { cn } from "../utils/cn";

const bannerVariants = cva("relative flex w-full items-center gap-3 border-b px-4 py-3", {
  variants: {
    variant: {
      announcement: "border-primary bg-primary/5 text-primary",
      warning: "border-warning bg-warning/5 text-warning",
      maintenance: "border-error bg-error/5 text-error",
    },
    size: {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-3 text-sm",
      lg: "px-6 py-4 text-base",
    },
  },
  defaultVariants: {
    variant: "announcement",
    size: "md",
  },
});

export interface BannerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClose">,
    VariantProps<typeof bannerVariants> {
  title?: string;
  description?: string;
  onClose?: () => void;
  dismissible?: boolean;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  link?: {
    href: string;
    text: string;
  };
}

export const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
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
      link,
      children,
      ...props
    },
    ref,
  ) => {
    const getDefaultIcon = () => {
      switch (variant) {
        case "announcement":
          return "📢";
        case "warning":
          return "⚠";
        case "maintenance":
          return "🔧";
        default:
          return "📢";
      }
    };

    return (
      <div
        ref={ref}
        className={cn(bannerVariants({ variant, size }), className)}
        role="banner"
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
          {link && (
            <div className="mt-2">
              <a
                href={link.href}
                className="text-sm underline hover:no-underline transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.text}
              </a>
            </div>
          )}
        </div>

        {action && <div className="flex-shrink-0 ml-2">{action}</div>}

        {dismissible && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex-shrink-0 ml-2 p-1 rounded-md hover:bg-bg-subtle transition-colors"
            aria-label="Dismiss banner"
          >
            <span className="text-lg">×</span>
          </button>
        )}
      </div>
    );
  },
);

Banner.displayName = "Banner";
