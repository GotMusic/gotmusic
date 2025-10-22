"use client";

import { forwardRef } from "react";
import { Archive, Check, Clock, Edit, Globe, MoreHorizontal, X } from "../icons";
import { type VariantProps, cn, cva } from "../utils";

export type AssetStatus = "draft" | "processing" | "ready" | "error" | "archived" | "published";

export interface AssetTileData {
  id: string;
  title: string;
  artist: string;
  coverUrl?: string;
  status: AssetStatus;
  createdAt: Date;
  updatedAt: Date;
  isProcessing?: boolean;
  hasError?: boolean;
  progress?: number;
  errorMessage?: string;
  price?: { currency: string; amount: number };
  duration?: number;
  bpm?: number;
  key?: string;
  publishedAt?: Date;
  archivedAt?: Date;
  sales?: number;
  views?: number;
}

export interface AssetTileProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick">,
    VariantProps<typeof assetTileVariants> {
  asset: AssetTileData;
  isSelected?: boolean;
  showActions?: boolean;
  onSelect?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onPublish?: (id: string) => void;
  onArchive?: (id: string) => void;
  onUnarchive?: (id: string) => void;
  onDuplicate?: (id: string) => void;
}

const assetTileVariants = cva(
  "relative flex flex-col rounded-lg border transition-all duration-200 cursor-pointer group",
  {
    variants: {
      variant: {
        default: "bg-bg-elevated border-border-subtle hover:border-brand-primary",
        selected: "bg-bg-elevated border-brand-primary ring-2 ring-brand-ring",
        disabled: "bg-bg-muted border-border-subtle opacity-50 cursor-not-allowed",
      },
      size: {
        sm: "w-48 h-64",
        md: "w-56 h-72",
        lg: "w-64 h-80",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

const getStatusIcon = (status: AssetStatus) => {
  switch (status) {
    case "draft":
      return <Edit className="w-4 h-4" />;
    case "processing":
      return <Clock className="w-4 h-4" />;
    case "ready":
      return <Check className="w-4 h-4" />;
    case "error":
      return <X className="w-4 h-4" />;
    case "archived":
      return <Archive className="w-4 h-4" />;
    case "published":
      return <Globe className="w-4 h-4" />;
    default:
      return null;
  }
};

const getStatusColor = (status: AssetStatus) => {
  switch (status) {
    case "draft":
      return "text-fg-muted";
    case "processing":
      return "text-warning";
    case "ready":
      return "text-semantic-success";
    case "error":
      return "text-semantic-danger";
    case "archived":
      return "text-fg-muted";
    case "published":
      return "text-semantic-success";
    default:
      return "text-fg-muted";
  }
};

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const formatFileSize = (bytes: number) => {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
};

const formatDate = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return `${Math.floor(days / 30)} months ago`;
};

const AssetTile = forwardRef<HTMLDivElement, AssetTileProps>(
  (
    {
      className,
      asset,
      isSelected = false,
      showActions = true,
      variant,
      size,
      onSelect,
      onEdit,
      onDelete,
      onPublish,
      onArchive,
      onUnarchive,
      onDuplicate,
      ...props
    },
    ref,
  ) => {
    const handleClick = () => {
      if (asset.status === "processing") return;
      onSelect?.(asset.id);
    };

    const handleActionClick = (e: React.MouseEvent) => {
      e.stopPropagation();
    };

    const isDisabled = asset.status === "processing" || asset.hasError;

    return (
      <div
        ref={ref}
        className={cn(
          assetTileVariants({ variant: isSelected ? "selected" : variant }),
          size,
          isDisabled && "opacity-50 cursor-not-allowed",
          className,
        )}
        onClick={handleClick}
        {...props}
      >
        {/* Cover Image */}
        <div className="relative w-full h-3/5 rounded-t-lg overflow-hidden">
          {asset.coverUrl ? (
            <img
              src={asset.coverUrl}
              alt={`${asset.title} cover`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-bg-muted flex items-center justify-center">
              <div className="text-fg-muted text-4xl">🎵</div>
            </div>
          )}

          {/* Status Badge */}
          <div className="absolute top-2 left-2">
            <div
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                "bg-bg-elevated/90 backdrop-blur-sm",
                getStatusColor(asset.status),
              )}
            >
              {getStatusIcon(asset.status)}
              <span className="capitalize">{asset.status}</span>
            </div>
          </div>

          {/* Progress Bar (for processing) */}
          {asset.isProcessing && asset.progress !== undefined && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-bg-muted">
              <div
                className="h-full bg-brand-primary transition-all duration-300"
                style={{ width: `${asset.progress}%` }}
              />
            </div>
          )}

          {/* Error Overlay */}
          {asset.hasError && (
            <div className="absolute inset-0 bg-semantic-danger/20 flex items-center justify-center">
              <div className="text-semantic-danger text-sm font-medium text-center">
                {asset.errorMessage || "Upload failed"}
              </div>
            </div>
          )}

          {/* Actions Menu */}
          {showActions && !isDisabled && (
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={handleActionClick}
                className="p-1 rounded-full bg-bg-elevated/90 backdrop-blur-sm hover:bg-bg-hover"
                aria-label="Asset actions"
              >
                <MoreHorizontal className="w-4 h-4 text-fg-muted" />
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-3 space-y-2">
          {/* Title and Artist */}
          <div className="space-y-1">
            <h3 className="font-medium text-fg truncate" title={asset.title}>
              {asset.title}
            </h3>
            <p className="text-sm text-fg-muted truncate" title={asset.artist}>
              {asset.artist}
            </p>
          </div>

          {/* Metadata */}
          <div className="space-y-1 text-xs text-fg-muted">
            {asset.duration && (
              <div className="flex items-center justify-between">
                <span>Duration</span>
                <span>{formatDuration(asset.duration)}</span>
              </div>
            )}
            {asset.bpm && (
              <div className="flex items-center justify-between">
                <span>BPM</span>
                <span>{asset.bpm}</span>
              </div>
            )}
            {asset.key && (
              <div className="flex items-center justify-between">
                <span>Key</span>
                <span>{asset.key}</span>
              </div>
            )}
            {asset.price && (
              <div className="flex items-center justify-between">
                <span>Price</span>
                <span className="font-medium text-fg">
                  {asset.price.currency} {asset.price.amount}
                </span>
              </div>
            )}
          </div>

          {/* Stats (for published assets) */}
          {asset.status === "published" && (asset.sales || asset.views) && (
            <div className="flex items-center gap-3 text-xs text-fg-muted">
              {asset.sales && <span>{asset.sales} sales</span>}
              {asset.views && <span>{asset.views} views</span>}
            </div>
          )}

          {/* Timestamp */}
          <div className="text-xs text-fg-muted">{formatDate(asset.updatedAt)}</div>
        </div>
      </div>
    );
  },
);

AssetTile.displayName = "AssetTile";

export { AssetTile };
