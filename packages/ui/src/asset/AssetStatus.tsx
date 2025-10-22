"use client";

import { forwardRef } from "react";
import { Archive, Check, Clock, Edit, Globe, X } from "../icons";
import { type VariantProps, cn, cva } from "../utils";

export type AssetStatusType = "draft" | "processing" | "ready" | "error" | "archived" | "published";

export interface AssetStatusProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof assetStatusVariants> {
  status: AssetStatusType;
  showIcon?: boolean;
  showLabel?: boolean;
  isProcessing?: boolean;
  progress?: number;
  errorMessage?: string;
}

const assetStatusVariants = cva(
  "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-bg-elevated text-fg-muted",
        success: "bg-semantic-success/20 text-semantic-success",
        warning: "bg-warning/20 text-warning",
        destructive: "bg-semantic-danger/20 text-semantic-danger",
        muted: "bg-bg-muted text-fg-muted",
      },
      size: {
        sm: "text-xs px-1.5 py-0.5",
        md: "text-xs px-2 py-1",
        lg: "text-sm px-2.5 py-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

const getStatusConfig = (status: AssetStatusType) => {
  switch (status) {
    case "draft":
      return {
        icon: Edit,
        label: "Draft",
        variant: "muted" as const,
        color: "text-fg-muted",
      };
    case "processing":
      return {
        icon: Clock,
        label: "Processing",
        variant: "warning" as const,
        color: "text-warning",
      };
    case "ready":
      return {
        icon: Check,
        label: "Ready",
        variant: "success" as const,
        color: "text-semantic-success",
      };
    case "error":
      return {
        icon: X,
        label: "Error",
        variant: "destructive" as const,
        color: "text-semantic-danger",
      };
    case "archived":
      return {
        icon: Archive,
        label: "Archived",
        variant: "muted" as const,
        color: "text-fg-muted",
      };
    case "published":
      return {
        icon: Globe,
        label: "Published",
        variant: "success" as const,
        color: "text-semantic-success",
      };
    default:
      return {
        icon: Edit,
        label: "Unknown",
        variant: "muted" as const,
        color: "text-fg-muted",
      };
  }
};

const AssetStatus = forwardRef<HTMLDivElement, AssetStatusProps>(
  (
    {
      className,
      status,
      showIcon = true,
      showLabel = true,
      isProcessing = false,
      progress,
      errorMessage,
      variant,
      size,
      ...props
    },
    ref,
  ) => {
    const config = getStatusConfig(status);
    const Icon = config.icon;

    return (
      <div
        ref={ref}
        className={cn(assetStatusVariants({ variant: variant || config.variant, size }), className)}
        {...props}
      >
        {showIcon && <Icon className="w-3 h-3 flex-shrink-0" aria-hidden="true" />}
        {showLabel && <span className="capitalize">{config.label}</span>}
        {isProcessing && progress !== undefined && (
          <span className="ml-1 text-xs opacity-75">{Math.round(progress)}%</span>
        )}
        {status === "error" && errorMessage && (
          <span className="ml-1 text-xs opacity-75" title={errorMessage}>
            !
          </span>
        )}
      </div>
    );
  },
);

AssetStatus.displayName = "AssetStatus";

export { AssetStatus };
