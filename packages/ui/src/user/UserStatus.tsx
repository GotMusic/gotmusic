import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import { cn } from "../utils/cn";

const userStatusVariants = cva(
  "inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium",
  {
    variants: {
      status: {
        active: "bg-success-100 text-success-700 border border-success-200",
        inactive: "bg-neutral-100 text-neutral-600 border border-neutral-200",
        pending: "bg-warning-100 text-warning-700 border border-warning-200",
        suspended: "bg-error-100 text-error-700 border border-error-200",
        banned: "bg-error-200 text-error-800 border border-error-300",
        offline: "bg-neutral-200 text-neutral-500 border border-neutral-300",
      },
      size: {
        sm: "px-1.5 py-0.5 text-xs",
        md: "px-2 py-1 text-xs",
        lg: "px-3 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      status: "inactive",
      size: "md",
    },
  },
);

export interface UserStatusProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof userStatusVariants> {
  status: "active" | "inactive" | "pending" | "suspended" | "banned" | "offline";
  displayName?: string;
  description?: string;
  lastSeen?: Date;
  showLastSeen?: boolean;
  showDescription?: boolean;
  showIcon?: boolean;
  editable?: boolean;
  onChange?: (newStatus: UserStatusProps["status"]) => void;
  compact?: boolean;
}

export const UserStatus = React.forwardRef<HTMLDivElement, UserStatusProps>(
  (
    {
      status,
      displayName,
      description,
      lastSeen,
      showLastSeen = true,
      showDescription = false,
      showIcon = true,
      editable = false,
      onChange,
      compact = false,
      size,
      className,
      ...props
    },
    ref,
  ) => {
    const getStatusIcon = (statusType: UserStatusProps["status"]) => {
      switch (statusType) {
        case "active":
          return "🟢";
        case "inactive":
          return "⚪";
        case "pending":
          return "🟡";
        case "suspended":
          return "🔴";
        case "banned":
          return "🚫";
        case "offline":
          return "⚫";
        default:
          return "⚪";
      }
    };

    const getStatusDisplayName = (statusType: UserStatusProps["status"]) => {
      if (displayName) return displayName;

      switch (statusType) {
        case "active":
          return "Active";
        case "inactive":
          return "Inactive";
        case "pending":
          return "Pending";
        case "suspended":
          return "Suspended";
        case "banned":
          return "Banned";
        case "offline":
          return "Offline";
        default:
          return "Inactive";
      }
    };

    const getStatusDescription = (statusType: UserStatusProps["status"]) => {
      if (description) return description;

      switch (statusType) {
        case "active":
          return "User is active and can access all features";
        case "inactive":
          return "User account is inactive";
        case "pending":
          return "Account activation is pending approval";
        case "suspended":
          return "Account has been temporarily suspended";
        case "banned":
          return "Account has been permanently banned";
        case "offline":
          return "User is currently offline";
        default:
          return "Account status unknown";
      }
    };

    const formatLastSeen = (date: Date) => {
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (seconds < 60) return "Just now";
      if (minutes < 60) return `${minutes}m ago`;
      if (hours < 24) return `${hours}h ago`;
      if (days < 7) return `${days}d ago`;
      return date.toLocaleDateString();
    };

    const handleClick = () => {
      if (editable && onChange) {
        // Cycle through statuses (for demo purposes)
        const statuses: UserStatusProps["status"][] = [
          "active",
          "inactive",
          "pending",
          "suspended",
          "banned",
          "offline",
        ];
        const currentIndex = statuses.indexOf(status);
        const nextIndex = (currentIndex + 1) % statuses.length;
        onChange(statuses[nextIndex]);
      }
    };

    if (compact) {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center gap-1.5",
            editable && "cursor-pointer hover:opacity-80 transition-opacity",
            className,
          )}
          onClick={handleClick}
          {...props}
        >
          {showIcon && (
            <span className="text-sm" aria-hidden="true">
              {getStatusIcon(status)}
            </span>
          )}
          <span className={cn(userStatusVariants({ status, size }))}>
            {getStatusDisplayName(status)}
          </span>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between gap-3 p-3 rounded-lg border bg-bg-elevated",
          editable && "cursor-pointer hover:bg-bg-subtle transition-colors",
          className,
        )}
        onClick={handleClick}
        {...props}
      >
        <div className="flex items-center gap-2">
          {showIcon && (
            <span className="text-sm" aria-hidden="true">
              {getStatusIcon(status)}
            </span>
          )}
          <span className={cn(userStatusVariants({ status, size }))}>
            {getStatusDisplayName(status)}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          {showDescription && (
            <p className="text-sm text-fg-muted line-clamp-2">{getStatusDescription(status)}</p>
          )}
          {showLastSeen && lastSeen && (
            <p className="text-xs text-fg-muted">Last seen: {formatLastSeen(lastSeen)}</p>
          )}
        </div>

        {editable && (
          <div className="flex items-center gap-1 text-xs text-fg-muted">
            <span>Click to change</span>
            <span>↻</span>
          </div>
        )}
      </div>
    );
  },
);

UserStatus.displayName = "UserStatus";
