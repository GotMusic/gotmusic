"use client";

import { forwardRef } from "react";
import { AlertCircle, CheckCircle, Clock, Spinner } from "../icons";
import { type VariantProps, cn, cva } from "../utils";

export interface UploadProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof uploadProgressVariants> {
  /**
   * Upload progress (0-100)
   */
  progress?: number;
  /**
   * Upload status
   */
  status?: "idle" | "uploading" | "processing" | "success" | "error";
  /**
   * File name being uploaded
   */
  fileName?: string;
  /**
   * File size in bytes
   */
  fileSize?: number;
  /**
   * Upload speed in bytes per second
   */
  speed?: number;
  /**
   * Estimated time remaining in seconds
   */
  timeRemaining?: number;
  /**
   * Error message
   */
  error?: string;
  /**
   * Success message
   */
  success?: string;
  /**
   * Whether to show detailed information
   */
  showDetails?: boolean;
  /**
   * Whether to show speed and time estimates
   */
  showEstimates?: boolean;
}

const uploadProgressVariants = cva("w-full", {
  variants: {
    variant: {
      default: "bg-bg-elevated border border-border-subtle rounded-lg p-4",
      minimal: "bg-transparent",
      inline: "bg-bg-muted border border-border-muted rounded-md p-3",
    },
    size: {
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

const UploadProgress = forwardRef<HTMLDivElement, UploadProgressProps>(
  (
    {
      className,
      progress = 0,
      status = "idle",
      fileName,
      fileSize,
      speed,
      timeRemaining,
      error,
      success,
      showDetails = true,
      showEstimates = true,
      variant,
      size,
      ...props
    },
    ref,
  ) => {
    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
    };

    const formatSpeed = (bytesPerSecond: number) => {
      if (bytesPerSecond === 0) return "0 B/s";
      const k = 1024;
      const sizes = ["B/s", "KB/s", "MB/s", "GB/s"];
      const i = Math.floor(Math.log(bytesPerSecond) / Math.log(k));
      return `${Number.parseFloat((bytesPerSecond / k ** i).toFixed(1))} ${sizes[i]}`;
    };

    const formatTime = (seconds: number) => {
      if (seconds === 0) return "0s";
      if (seconds < 60) return `${Math.round(seconds)}s`;
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.round(seconds % 60);
      return `${minutes}m ${remainingSeconds}s`;
    };

    const getStatusIcon = () => {
      switch (status) {
        case "success":
          return <CheckCircle className="h-5 w-5 text-semantic-success" />;
        case "error":
          return <AlertCircle className="h-5 w-5 text-semantic-danger" />;
        case "uploading":
          return <Spinner className="h-5 w-5 text-brand-primary animate-spin" />;
        case "processing":
          return <Clock className="h-5 w-5 text-brand-primary animate-pulse" />;
        default:
          return <Clock className="h-5 w-5 text-fg-muted" />;
      }
    };

    const getStatusMessage = () => {
      if (error) return error;
      if (success) return success;
      if (status === "uploading") return `Uploading... ${Math.round(progress)}%`;
      if (status === "processing") return "Processing file...";
      if (status === "success") return "Upload complete!";
      if (status === "error") return "Upload failed";
      return "Ready to upload";
    };

    const getProgressColor = () => {
      switch (status) {
        case "success":
          return "bg-semantic-success";
        case "error":
          return "bg-semantic-danger";
        case "uploading":
        case "processing":
          return "bg-brand-primary";
        default:
          return "bg-fg-muted";
      }
    };

    return (
      <div
        ref={ref}
        className={cn(uploadProgressVariants({ variant, size }), className)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          {getStatusIcon()}
          <div className="flex-1 min-w-0">
            {fileName && <p className="text-sm font-medium text-fg-default truncate">{fileName}</p>}
            <p className="text-sm text-fg-muted">{getStatusMessage()}</p>
          </div>
          {showDetails && fileSize && (
            <span className="text-xs text-fg-muted">{formatFileSize(fileSize)}</span>
          )}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-bg-muted rounded-full h-2 overflow-hidden">
            <div
              className={cn("h-full transition-all duration-300 ease-out", getProgressColor())}
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </div>

          {/* Progress Text */}
          <div className="flex items-center justify-between text-xs text-fg-muted">
            <span>{Math.round(progress)}%</span>
            {showEstimates && speed && timeRemaining && status === "uploading" && (
              <div className="flex items-center gap-2">
                <span>{formatSpeed(speed)}</span>
                <span>•</span>
                <span>{formatTime(timeRemaining)} remaining</span>
              </div>
            )}
          </div>
        </div>

        {/* Additional Details */}
        {showDetails && (
          <div className="mt-3 pt-3 border-t border-border-subtle">
            <div className="flex items-center justify-between text-xs text-fg-muted">
              <span>Status: {status}</span>
              {speed && <span>Speed: {formatSpeed(speed)}</span>}
            </div>
          </div>
        )}
      </div>
    );
  },
);

UploadProgress.displayName = "UploadProgress";

export { UploadProgress };
