import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import { cn } from "../utils/cn";

const healthStatusVariants = cva(
  "inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium",
  {
    variants: {
      status: {
        healthy: "bg-success-100 text-success-700 border border-success-200",
        warning: "bg-warning-100 text-warning-700 border border-warning-200",
        critical: "bg-error-100 text-error-700 border border-error-200",
        unknown: "bg-neutral-100 text-neutral-700 border border-neutral-200",
      },
      size: {
        sm: "px-1.5 py-0.5 text-xs",
        md: "px-2 py-1 text-xs",
        lg: "px-3 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      status: "unknown",
      size: "md",
    },
  },
);

export interface HealthCheck {
  id: string;
  name: string;
  status: "healthy" | "warning" | "critical" | "unknown";
  message?: string;
  lastChecked: Date;
  responseTime?: number;
  details?: Record<string, unknown>;
}

export interface HealthStatusProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof healthStatusVariants> {
  checks: HealthCheck[];
  overallStatus?: "healthy" | "warning" | "critical" | "unknown";
  lastUpdated?: Date;
  autoRefresh?: boolean;
  refreshInterval?: number;
  onRefresh?: () => void;
  showResponseTime?: boolean;
  showLastChecked?: boolean;
  compact?: boolean;
}

export const HealthStatus = React.forwardRef<HTMLDivElement, HealthStatusProps>(
  (
    {
      checks,
      overallStatus,
      lastUpdated,
      autoRefresh = false,
      refreshInterval = 30000,
      onRefresh,
      showResponseTime = true,
      showLastChecked = true,
      compact = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [isRefreshing, setIsRefreshing] = React.useState(false);

    // Auto-refresh effect
    React.useEffect(() => {
      if (!autoRefresh || !onRefresh) return;

      const interval = setInterval(async () => {
        setIsRefreshing(true);
        await onRefresh();
        setIsRefreshing(false);
      }, refreshInterval);

      return () => clearInterval(interval);
    }, [autoRefresh, onRefresh, refreshInterval]);

    const getStatusIcon = (status: HealthCheck["status"]) => {
      switch (status) {
        case "healthy":
          return "✅";
        case "warning":
          return "⚠️";
        case "critical":
          return "❌";
        case "unknown":
          return "❓";
        default:
          return "❓";
      }
    };

    const getOverallStatusIcon = (status?: HealthStatusProps["overallStatus"]) => {
      switch (status) {
        case "healthy":
          return "🟢";
        case "warning":
          return "🟡";
        case "critical":
          return "🔴";
        case "unknown":
          return "⚪";
        default:
          return "⚪";
      }
    };

    const formatResponseTime = (ms?: number) => {
      if (!ms) return "N/A";
      return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`;
    };

    const formatLastChecked = (date: Date) => {
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);

      if (seconds < 60) return `${seconds}s ago`;
      if (minutes < 60) return `${minutes}m ago`;
      if (hours < 24) return `${hours}h ago`;
      return date.toLocaleDateString();
    };

    const handleRefresh = async () => {
      if (!onRefresh || isRefreshing) return;

      setIsRefreshing(true);
      await onRefresh();
      setIsRefreshing(false);
    };

    const healthyCount = checks.filter((c) => c.status === "healthy").length;
    const warningCount = checks.filter((c) => c.status === "warning").length;
    const criticalCount = checks.filter((c) => c.status === "critical").length;
    const unknownCount = checks.filter((c) => c.status === "unknown").length;

    return (
      <div
        ref={ref}
        className={cn("border border-border-default rounded-lg bg-bg-elevated", className)}
        {...props}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-border-default bg-bg-subtle">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">{getOverallStatusIcon(overallStatus)}</span>
              <h3 className="text-sm font-medium text-fg-default">System Health</h3>
              {overallStatus && (
                <span className={cn(healthStatusVariants({ status: overallStatus }))}>
                  {overallStatus.toUpperCase()}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {showLastChecked && lastUpdated && (
                <span className="text-xs text-fg-muted">
                  Updated {formatLastChecked(lastUpdated)}
                </span>
              )}

              {onRefresh && (
                <button
                  type="button"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="p-1 text-fg-muted hover:text-fg-default transition-colors disabled:opacity-50"
                  aria-label="Refresh health status"
                >
                  <div className={cn("h-4 w-4", isRefreshing && "animate-spin")}>🔄</div>
                </button>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="flex items-center gap-4 mt-2 text-xs text-fg-muted">
            <span>✅ {healthyCount} healthy</span>
            <span>⚠️ {warningCount} warning</span>
            <span>❌ {criticalCount} critical</span>
            <span>❓ {unknownCount} unknown</span>
          </div>
        </div>

        {/* Health Checks */}
        <div className={cn(compact ? "divide-y divide-border-subtle" : "p-4 space-y-3")}>
          {checks.map((check) => (
            <div
              key={check.id}
              className={cn(
                "flex items-start justify-between gap-3",
                !compact && "p-3 rounded-lg border border-border-subtle bg-bg-subtle",
              )}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm">{getStatusIcon(check.status)}</span>
                  <span className="text-sm font-medium text-fg-default">{check.name}</span>
                  <span className={cn(healthStatusVariants({ status: check.status }))}>
                    {check.status.toUpperCase()}
                  </span>
                </div>

                {check.message && (
                  <p className="text-sm text-fg-muted line-clamp-2">{check.message}</p>
                )}

                <div className="flex items-center gap-4 mt-2 text-xs text-fg-muted">
                  {showResponseTime && check.responseTime && (
                    <span>Response: {formatResponseTime(check.responseTime)}</span>
                  )}
                  <span>Checked: {formatLastChecked(check.lastChecked)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
);

HealthStatus.displayName = "HealthStatus";
