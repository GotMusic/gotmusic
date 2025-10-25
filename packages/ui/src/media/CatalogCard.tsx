"use client";

import type * as React from "react";
import { useState } from "react";
import { Tag } from "../data/Tag";
import { ChevronRight, Download, Music, Pause, Play } from "../icons";
import { type VariantProps, cn, cva } from "../utils";

export interface CatalogCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof catalogCardVariants> {
  id: string;
  title: string;
  producer: string;
  price: string; // "$2.99"
  bpm?: number;
  keySig?: string; // "C minor"
  tags?: string[];
  artworkUrl?: string;
  previewUrl?: string; // 30s clip
  onPreviewToggle?: (id: string) => void;
  isPlaying?: boolean;
  onOpen?: (id: string) => void;
  onDownload?: (id: string) => void;
  onFavorite?: (id: string) => void;
  onShare?: (id: string) => void;
  isFavorited?: boolean;
  duration?: string; // "3:45"
  quality?: string; // "24-bit/48kHz"
  genre?: string;
  mood?: string;
  energy?: number; // 1-10
  popularity?: number; // 1-100
  isNew?: boolean;
  isFeatured?: boolean;
  isExclusive?: boolean;
  discount?: string; // "20% OFF"
  originalPrice?: string; // "$4.99"
  variant?: "default" | "music" | "disabled";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  glow?: "none" | "soft" | "medium" | "strong";
}

const catalogCardVariants = cva(
  "group relative overflow-hidden transition-all duration-300 ease-out cursor-pointer",
  {
    variants: {
      variant: {
        // SINGULAR Glass-Neumorphic Hybrid Design - The Ultimate Fusion
        default: [
          // Glass Foundation with Neumorphic Depth
          "bg-gradient-to-br from-white/20 via-white/10 to-white/5",
          "backdrop-blur-xl backdrop-saturate-150",
          "border border-white/30",

          // Neumorphic Inset Shadows (Soft & Tactile)
          "shadow-[inset_-1px_-1px_3px_rgba(255,255,255,0.3),inset_1px_1px_3px_rgba(0,0,0,0.1)]",

          // Glass Outer Glow with Neumorphic Depth
          "shadow-[0_8px_32px_0_rgba(31,38,135,0.2),0_4px_16px_0_rgba(0,0,0,0.1)]",

          // Hybrid Hover Effects
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/15 before:via-white/5 before:to-transparent before:opacity-0 before:transition-all before:duration-300",
          "hover:before:opacity-100",
          "hover:shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.4),inset_2px_2px_4px_rgba(0,0,0,0.15),0_12px_40px_0_rgba(31,38,135,0.3),0_6px_20px_0_rgba(0,0,0,0.15)]",
          "hover:border-white/40 hover:-translate-y-1 hover:scale-[1.02]",

          // Active Press State (Neumorphic Feedback)
          "active:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2),inset_-1px_-1px_2px_rgba(255,255,255,0.1)]",
          "active:translate-y-0 active:scale-[0.98]",
        ],

        // Premium Music Variant (Same Hybrid, Brand Colors)
        music: [
          "bg-gradient-to-br from-brand-primary/25 via-brand-accent/15 to-brand-primary/5",
          "backdrop-blur-xl backdrop-saturate-150",
          "border border-brand-primary/40",

          // Neumorphic Inset with Brand Colors
          "shadow-[inset_-1px_-1px_3px_rgba(106,230,166,0.3),inset_1px_1px_3px_rgba(0,0,0,0.1)]",
          "shadow-[0_8px_32px_0_rgba(106,230,166,0.25),0_4px_16px_0_rgba(0,0,0,0.1)]",

          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-brand-primary/20 before:via-brand-accent/10 before:to-transparent before:opacity-0 before:transition-all before:duration-300",
          "hover:before:opacity-100",
          "hover:shadow-[inset_-2px_-2px_4px_rgba(106,230,166,0.4),inset_2px_2px_4px_rgba(0,0,0,0.15),0_12px_40px_0_rgba(106,230,166,0.35),0_6px_20px_0_rgba(0,0,0,0.15)]",
          "hover:border-brand-primary/50 hover:-translate-y-1 hover:scale-[1.02]",
          "active:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2),inset_-1px_-1px_2px_rgba(106,230,166,0.2)]",
          "active:translate-y-0 active:scale-[0.98]",
        ],

        // Disabled State
        disabled: [
          "bg-bg-subtle border-border-subtle",
          "opacity-60 cursor-not-allowed",
          "shadow-none backdrop-blur-none",
        ],
      },
      size: {
        xs: "rounded-md p-2",
        sm: "rounded-lg p-3",
        md: "rounded-xl p-4",
        lg: "rounded-2xl p-6",
        xl: "rounded-3xl p-8",
      },
      glow: {
        none: "",
        soft: "shadow-glow-brand",
        medium: "shadow-[0_0_20px_rgba(106,230,166,0.3)]",
        strong: "shadow-[0_0_30px_rgba(106,230,166,0.5)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      glow: "none",
    },
  },
);

export function CatalogCard({
  id,
  title,
  producer,
  price,
  bpm,
  keySig,
  tags = [],
  artworkUrl,
  previewUrl,
  isPlaying = false,
  onPreviewToggle,
  onOpen,
  onDownload,
  onFavorite,
  onShare,
  isFavorited = false,
  duration,
  quality,
  genre,
  mood,
  energy,
  popularity,
  isNew = false,
  isFeatured = false,
  isExclusive = false,
  discount,
  originalPrice,
  variant = "default",
  size = "md",
  glow = "none",
  className,
  ...props
}: CatalogCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const isInteractive = variant !== "disabled";
  const isDisabled = variant === "disabled";

  return (
    <article
      className={cn(
        catalogCardVariants({ variant, size, glow }),
        isInteractive && "cursor-pointer",
        isDisabled && "pointer-events-none",
        className,
      )}
      data-testid="catalog-card"
      onMouseEnter={() => {
        setIsHovered(true);
        setShowActions(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowActions(false);
      }}
      onClick={() => isInteractive && onOpen?.(id)}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={(e) => {
        if (isInteractive && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onOpen?.(id);
        }
      }}
      {...props}
    >
      {/* Premium Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {isNew && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            NEW
          </div>
        )}
        {isFeatured && (
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            FEATURED
          </div>
        )}
        {isExclusive && (
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            EXCLUSIVE
          </div>
        )}
        {discount && (
          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            {discount}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="absolute top-3 right-3 z-10 flex gap-1">
        {onFavorite && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onFavorite(id);
            }}
            className={cn(
              "p-2 rounded-full transition-all duration-200",
              "bg-black/20 backdrop-blur-sm border border-white/20",
              "hover:bg-red-500/20 hover:border-red-400/50",
              "focus:outline-none focus:ring-2 focus:ring-red-400",
              isFavorited && "bg-red-500/30 border-red-400/50",
            )}
            aria-label={
              isFavorited ? `Remove ${title} from favorites` : `Add ${title} to favorites`
            }
          >
            <div
              className={cn("h-4 w-4", isFavorited ? "text-red-400 fill-current" : "text-white")}
            >
              ♥
            </div>
          </button>
        )}

        {onShare && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onShare(id);
            }}
            className={cn(
              "p-2 rounded-full transition-all duration-200",
              "bg-black/20 backdrop-blur-sm border border-white/20",
              "hover:bg-blue-500/20 hover:border-blue-400/50",
              "focus:outline-none focus:ring-2 focus:ring-blue-400",
            )}
            aria-label={`Share ${title}`}
          >
            <div className="h-4 w-4 text-white">↗</div>
          </button>
        )}
      </div>

      <div className="flex gap-4">
        {/* Enhanced Artwork */}
        <div className="relative shrink-0">
          <div
            className={cn(
              "relative overflow-hidden rounded-xl shadow-lg",
              size === "xs" && "h-12 w-12",
              size === "sm" && "h-16 w-16",
              size === "md" && "h-20 w-20",
              size === "lg" && "h-24 w-24",
              size === "xl" && "h-28 w-28",
              !artworkUrl && "bg-gradient-to-br from-brand-primary/20 to-brand-accent/20",
            )}
            aria-hidden
          >
            {artworkUrl ? (
              <img
                src={artworkUrl}
                alt=""
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-brand-primary/20 to-brand-accent/20 flex items-center justify-center">
                <Music className="h-6 w-6 text-brand-primary/60" />
              </div>
            )}

            {/* Play Overlay */}
            {previewUrl && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPreviewToggle?.(id);
                  }}
                  className={cn(
                    "p-2 rounded-full transition-all duration-200",
                    "bg-white/20 backdrop-blur-sm border border-white/30",
                    "hover:bg-white/30 hover:scale-110",
                    "focus:outline-none focus:ring-2 focus:ring-white/50",
                  )}
                  aria-label={isPlaying ? `Pause preview of ${title}` : `Play preview of ${title}`}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5 text-white" />
                  ) : (
                    <Play className="h-5 w-5 text-white ml-0.5" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Content */}
        <div className="min-w-0 flex-1 space-y-2">
          <div>
            <h3 className="text-lg font-bold text-fg-default truncate group-hover:text-brand-primary transition-colors duration-200">
              {title}
            </h3>
            <p className="text-sm text-fg-muted truncate">{producer}</p>
          </div>

          {/* Enhanced Metadata */}
          <div className="flex flex-wrap items-center gap-2">
            {typeof bpm === "number" && (
              <Tag className="text-xs px-2 py-1 bg-brand-primary/20 text-brand-primary border border-brand-primary/30 rounded-full">
                {bpm} BPM
              </Tag>
            )}
            {keySig && (
              <Tag className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full">
                {keySig}
              </Tag>
            )}
            {duration && (
              <Tag className="text-xs px-2 py-1 bg-gray-500/20 text-gray-400 border border-gray-500/30 rounded-full">
                {duration}
              </Tag>
            )}
            {quality && (
              <Tag className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full">
                {quality}
              </Tag>
            )}
          </div>

          {/* Enhanced Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1">
              {tags.slice(0, 2).map((tag) => (
                <Tag
                  key={tag}
                  className="text-xs px-2 py-1 bg-gradient-to-r from-brand-primary/20 to-brand-accent/20 text-brand-primary border border-brand-primary/30 rounded-full"
                >
                  {tag}
                </Tag>
              ))}
              {tags.length > 2 && (
                <Tag className="text-xs px-2 py-1 bg-gray-500/20 text-gray-400 border border-gray-500/30 rounded-full">
                  +{tags.length - 2}
                </Tag>
              )}
            </div>
          )}

          {/* Energy/Energy Bar */}
          {typeof energy === "number" && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-fg-muted">
                <span>Energy</span>
                <span>{energy}/10</span>
              </div>
              <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-primary to-brand-accent transition-all duration-500"
                  style={{ width: `${(energy / 10) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Actions */}
        <div className="flex flex-col items-end justify-between min-w-[80px]">
          {/* Price Section */}
          <div className="text-right space-y-1">
            {discount && originalPrice && (
              <div className="text-xs text-fg-muted line-through">{originalPrice}</div>
            )}
            <div className="text-lg font-bold text-fg-default">{price}</div>
            {onDownload && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDownload(id);
                }}
                className="text-xs text-brand-accent hover:text-brand-primary transition-colors duration-200 flex items-center gap-1"
                aria-label={`Download ${title}`}
              >
                <Download className="h-3 w-3" />
                Download
              </button>
            )}
          </div>

          {/* Details Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpen?.(id);
            }}
            className={cn(
              "inline-flex items-center gap-1 text-brand-accent text-xs",
              "hover:text-brand-primary transition-colors duration-200",
              "focus:outline-none focus:ring-2 focus:ring-brand-accent/50 rounded",
            )}
            aria-label={`Open details for ${title}`}
          >
            Get This Track <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </article>
  );
}
