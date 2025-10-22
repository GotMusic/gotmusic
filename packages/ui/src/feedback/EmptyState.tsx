import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import { cn } from "../utils/cn";

const emptyStateVariants = cva("flex flex-col items-center justify-center text-center p-8", {
  variants: {
    variant: {
      "no-data": "text-fg-muted",
      error: "text-error",
      loading: "text-fg-muted",
      success: "text-success",
    },
    size: {
      sm: "p-4",
      md: "p-8",
      lg: "p-12",
    },
  },
  defaultVariants: {
    variant: "no-data",
    size: "md",
  },
});

export interface EmptyStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onAction">,
    VariantProps<typeof emptyStateVariants> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      variant,
      size,
      title,
      description,
      icon,
      action,
      secondaryAction,
      children,
      ...props
    },
    ref,
  ) => {
    const getDefaultIcon = () => {
      switch (variant) {
        case "no-data":
          return "📭";
        case "error":
          return "❌";
        case "loading":
          return "⏳";
        case "success":
          return "✅";
        default:
          return "📭";
      }
    };

    const getDefaultTitle = () => {
      switch (variant) {
        case "no-data":
          return "No data available";
        case "error":
          return "Something went wrong";
        case "loading":
          return "Loading...";
        case "success":
          return "All done!";
        default:
          return "No data available";
      }
    };

    const getDefaultDescription = () => {
      switch (variant) {
        case "no-data":
          return "There's nothing to show here yet.";
        case "error":
          return "We encountered an error while loading your data.";
        case "loading":
          return "Please wait while we load your content.";
        case "success":
          return "Everything looks good!";
        default:
          return "There's nothing to show here yet.";
      }
    };

    return (
      <div ref={ref} className={cn(emptyStateVariants({ variant, size }), className)} {...props}>
        <div className="mb-4">{icon || <span className="text-6xl">{getDefaultIcon()}</span>}</div>

        <div className="max-w-md">
          <h3 className="text-lg font-semibold text-fg mb-2">{title || getDefaultTitle()}</h3>
          <p className="text-sm text-fg-muted mb-6">{description || getDefaultDescription()}</p>

          {children && <div className="mb-6">{children}</div>}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {action && (
              <button
                type="button"
                onClick={action.onClick}
                className="px-4 py-2 bg-primary text-fg-inverse rounded-md hover:bg-primary/90 transition-colors"
              >
                {action.label}
              </button>
            )}
            {secondaryAction && (
              <button
                type="button"
                onClick={secondaryAction.onClick}
                className="px-4 py-2 border border-border-default text-fg rounded-md hover:bg-bg-subtle transition-colors"
              >
                {secondaryAction.label}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  },
);

EmptyState.displayName = "EmptyState";
