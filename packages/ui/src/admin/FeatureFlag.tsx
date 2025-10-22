import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import { cn } from "../utils/cn";

const featureFlagVariants = cva(
  "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
  {
    variants: {
      status: {
        enabled: "bg-success-100 text-success-800 border border-success-200",
        disabled: "bg-neutral-100 text-neutral-600 border border-neutral-200",
        experimental: "bg-warning-100 text-warning-800 border border-warning-200",
        deprecated: "bg-error-100 text-error-800 border border-error-200",
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
      },
    },
    defaultVariants: {
      status: "disabled",
      size: "md",
    },
  },
);

export interface FeatureFlagProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onToggle">,
    VariantProps<typeof featureFlagVariants> {
  name: string;
  description?: string;
  enabled?: boolean;
  experimental?: boolean;
  deprecated?: boolean;
  onToggle?: (enabled: boolean) => void;
  showToggle?: boolean;
}

export const FeatureFlag = React.forwardRef<HTMLDivElement, FeatureFlagProps>(
  (
    {
      name,
      description,
      enabled = false,
      experimental = false,
      deprecated = false,
      onToggle,
      showToggle = false,
      status,
      size,
      className,
      ...props
    },
    ref,
  ) => {
    // Determine status based on props
    const actualStatus =
      status ||
      (() => {
        if (deprecated) return "deprecated";
        if (experimental) return "experimental";
        return enabled ? "enabled" : "disabled";
      })();

    const handleToggle = () => {
      if (onToggle && !deprecated) {
        onToggle(!enabled);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between gap-3 p-4 rounded-lg border bg-bg-elevated",
          className,
        )}
        {...props}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-fg-default truncate">{name}</span>
            <span className={cn(featureFlagVariants({ status: actualStatus, size }))}>
              {actualStatus === "enabled" && "Enabled"}
              {actualStatus === "disabled" && "Disabled"}
              {actualStatus === "experimental" && "Experimental"}
              {actualStatus === "deprecated" && "Deprecated"}
            </span>
          </div>
          {description && <p className="text-sm text-fg-muted line-clamp-2">{description}</p>}
        </div>

        {showToggle && !deprecated && (
          <button
            type="button"
            onClick={handleToggle}
            className={cn(
              "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
              enabled ? "bg-primary-600" : "bg-neutral-300",
            )}
            role="switch"
            aria-checked={enabled}
            aria-label={`Toggle ${name} feature flag`}
          >
            <span
              className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                enabled ? "translate-x-6" : "translate-x-1",
              )}
            />
          </button>
        )}
      </div>
    );
  },
);

FeatureFlag.displayName = "FeatureFlag";
