import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import { cn } from "../utils/cn";

const auditLogVariants = cva(
  "inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium",
  {
    variants: {
      action: {
        create: "bg-success-100 text-success-700 border border-success-200",
        update: "bg-primary-100 text-primary-700 border border-primary-200",
        delete: "bg-error-100 text-error-700 border border-error-200",
        login: "bg-info-100 text-info-700 border border-info-200",
        logout: "bg-neutral-100 text-neutral-700 border border-neutral-200",
        error: "bg-warning-100 text-warning-700 border border-warning-200",
      },
      size: {
        sm: "px-1.5 py-0.5 text-xs",
        md: "px-2 py-1 text-xs",
        lg: "px-3 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      action: "update",
      size: "md",
    },
  },
);

export interface AuditLogEntry {
  id: string;
  timestamp: Date;
  action: "create" | "update" | "delete" | "login" | "logout" | "error";
  resource: string;
  userId: string;
  userName: string;
  details?: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface AuditLogProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof auditLogVariants> {
  entries: AuditLogEntry[];
  loading?: boolean;
  emptyMessage?: string;
  showUserInfo?: boolean;
  showTechnicalDetails?: boolean;
  onEntryClick?: (entry: AuditLogEntry) => void;
  maxHeight?: string;
}

export const AuditLog = React.forwardRef<HTMLDivElement, AuditLogProps>(
  (
    {
      entries,
      loading = false,
      emptyMessage = "No audit entries found",
      showUserInfo = true,
      showTechnicalDetails = false,
      onEntryClick,
      maxHeight = "400px",
      className,
      ...props
    },
    ref,
  ) => {
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

    const getActionIcon = (action: AuditLogEntry["action"]) => {
      switch (action) {
        case "create":
          return "➕";
        case "update":
          return "✏️";
        case "delete":
          return "🗑️";
        case "login":
          return "🔐";
        case "logout":
          return "🚪";
        case "error":
          return "⚠️";
        default:
          return "📝";
      }
    };

    if (loading) {
      return (
        <div
          ref={ref}
          className={cn("flex items-center justify-center p-8 text-fg-muted", className)}
          {...props}
        >
          <div className="flex items-center gap-2">
            <div className="animate-spin h-4 w-4 border-2 border-primary-600 border-t-transparent rounded-full" />
            <span>Loading audit log...</span>
          </div>
        </div>
      );
    }

    if (entries.length === 0) {
      return (
        <div
          ref={ref}
          className={cn("flex items-center justify-center p-8 text-fg-muted", className)}
          {...props}
        >
          <span>{emptyMessage}</span>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "border border-border-default rounded-lg bg-bg-elevated overflow-hidden",
          className,
        )}
        {...props}
      >
        <div className="px-4 py-3 border-b border-border-default bg-bg-subtle">
          <h3 className="text-sm font-medium text-fg-default">Audit Log</h3>
          <p className="text-xs text-fg-muted">
            {entries.length} {entries.length === 1 ? "entry" : "entries"}
          </p>
        </div>

        <div className="overflow-y-auto" style={{ maxHeight }}>
          {entries.map((entry) => (
            <div
              key={entry.id}
              className={cn(
                "px-4 py-3 border-b border-border-subtle last:border-b-0 hover:bg-bg-subtle transition-colors",
                onEntryClick && "cursor-pointer",
              )}
              onClick={() => onEntryClick?.(entry)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onEntryClick?.(entry);
                }
              }}
              tabIndex={onEntryClick ? 0 : undefined}
              role={onEntryClick ? "button" : undefined}
              aria-label={
                onEntryClick ? `View details for ${entry.action} on ${entry.resource}` : undefined
              }
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">{getActionIcon(entry.action)}</span>
                    <span className={cn(auditLogVariants({ action: entry.action }))}>
                      {entry.action.toUpperCase()}
                    </span>
                    <span className="text-sm font-medium text-fg-default">{entry.resource}</span>
                  </div>

                  {showUserInfo && (
                    <div className="flex items-center gap-2 text-xs text-fg-muted mb-1">
                      <span>by {entry.userName}</span>
                      <span>•</span>
                      <span>{formatTimestamp(entry.timestamp)}</span>
                    </div>
                  )}

                  {entry.details && (
                    <p className="text-sm text-fg-default line-clamp-2">{entry.details}</p>
                  )}

                  {showTechnicalDetails && (entry.ipAddress || entry.userAgent) && (
                    <div className="mt-2 text-xs text-fg-muted">
                      {entry.ipAddress && <div>IP: {entry.ipAddress}</div>}
                      {entry.userAgent && <div className="truncate">UA: {entry.userAgent}</div>}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
);

AuditLog.displayName = "AuditLog";
