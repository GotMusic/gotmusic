"use client";

import type * as React from "react";
import { useState } from "react";
import { ChevronRight, Download, Music, Pause, Play, Heart, Share2 } from "../icons";
import { type VariantProps, cn, cva } from "../utils";
import { CardImage } from "./OptimizedImage";

// Dynamic CTA system based on brand voice hierarchy
type CTAMode =
  | "neutral"      // "Get This"
  | "track"        // "Get the Track" 
  | "loop"         // "Get the Loop"
  | "kit"          // "Get the Kit"
  | "pack"         // "Get the Pack"
  | "license"      // "Get License"
  | "brand"        // "Get the Sound"
  | "premium"      // "Get Yours"
  | "access"       // "Get Access"
  | "marketing";   // "Get Into It"

const CTA_TEXT: Record<CTAMode, string> = {
  neutral: "Get This",
  track: "Get the Track",
  loop: "Get the Loop", 
  kit: "Get the Kit",
  pack: "Get the Pack",
  license: "Get License",
  brand: "Get the Sound",
  premium: "Get Yours",
  access: "Get Access",
  marketing: "Get Into It",
} as const;

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
  density?: "comfy" | "compact";
  ctaMode?: CTAMode;
}

// Token-based CVA variants with CTA-correlated styling
const catalogCardVariants = cva(
  "group relative overflow-hidden transition-all duration-300 ease-out cursor-pointer backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "bg-card border-border-subtle hover:border-border-emphasis",
        music: "bg-card border-brand-primary/30 hover:border-brand-primary/50",
        disabled: "bg-card/50 border-border-subtle/50 cursor-not-allowed opacity-60",
      },
      size: {
        xs: "rounded-lg p-3 gap-2",
        sm: "rounded-lg p-4 gap-3", 
        md: "rounded-xl p-5 gap-4",
        lg: "rounded-xl p-6 gap-5",
        xl: "rounded-2xl p-8 gap-6",
      },
      glow: {
        none: "",
        soft: "shadow-elevation-ambient-1 hover:shadow-elevation-ambient-2",
        medium: "shadow-elevation-ambient-2 hover:shadow-elevation-ambient-3",
        strong: "shadow-elevation-ambient-3 hover:shadow-elevation-glow-brand-soft",
      },
      density: {
        comfy: "",
        compact: "p-3 gap-2",
      },
      ctaMode: {
        neutral: "border-cta-neutral hover:border-cta-neutral-hover shadow-elevation-cta-neutral",
        track: "border-cta-track hover:border-cta-track-hover shadow-elevation-cta-track",
        loop: "border-cta-track hover:border-cta-track-hover shadow-elevation-cta-track",
        kit: "border-cta-track hover:border-cta-track-hover shadow-elevation-cta-track",
        pack: "border-cta-track hover:border-cta-track-hover shadow-elevation-cta-track",
        license: "border-cta-track hover:border-cta-track-hover shadow-elevation-cta-track",
        brand: "border-cta-brand hover:border-cta-brand-hover shadow-elevation-cta-brand",
        premium: "border-cta-premium hover:border-cta-premium-hover shadow-elevation-cta-premium",
        access: "border-cta-neutral hover:border-cta-neutral-hover shadow-elevation-cta-neutral",
        marketing: "border-cta-marketing hover:border-cta-marketing-hover shadow-elevation-cta-marketing",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      glow: "soft",
      density: "comfy",
      ctaMode: "neutral",
    },
  }
);

// Sub-components with token usage
const MetaTag = ({ children, className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      "inline-flex items-center px-2 py-1 text-xs font-medium",
      "bg-bg-muted text-fg-muted border border-border-subtle rounded-full",
      className
    )}
    {...props}
  >
    {children}
  </span>
);

const Chip = ({ 
  children, 
  tone = "default",
  className,
  ...props 
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: "default" | "brand" | "success" | "warning" | "danger" }) => {
  const toneClasses = {
    default: "bg-bg-muted text-fg-muted border-border-subtle",
    brand: "bg-brand-primary/10 text-brand-primary border-brand-primary/20",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    danger: "bg-danger/10 text-danger border-danger/20",
  };
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 text-xs font-medium border rounded-full",
        toneClasses[tone],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

const EnergyBar = ({ energy, className, ...props }: { energy: number } & React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex items-center gap-2", className)} {...props}>
    <span className="text-xs text-fg-muted">Energy</span>
    <div className="flex-1 h-1 bg-bg-muted rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-brand-primary to-brand-accent transition-all duration-300"
        style={{ width: `${Math.min(100, Math.max(0, energy * 10))}%` }}
      />
    </div>
    <span className="text-xs text-fg-muted">{energy}/10</span>
  </div>
);

const Badge = ({ 
  children, 
  tone = "default",
  className,
  ...props 
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: "default" | "new" | "featured" | "exclusive" | "sale" }) => {
  const toneClasses = {
    default: "bg-bg-muted text-fg-muted",
    new: "bg-success/20 text-success",
    featured: "bg-brand-primary/20 text-brand-primary", 
    exclusive: "bg-purple-500/20 text-purple-400",
    sale: "bg-danger/20 text-danger",
  };
  
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 text-xs font-bold rounded-full border",
        toneClasses[tone],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

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
  onPreviewToggle,
  isPlaying = false,
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
  glow = "soft",
  density = "comfy",
  ctaMode = "neutral",
  className,
  ...props
}: CatalogCardProps) {
  const [showActions, setShowActions] = useState(false);
  const isInteractive = variant !== "disabled";

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isInteractive && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onOpen?.(id);
    }
  };

  return (
    <article
      className={cn(catalogCardVariants({ variant, size, glow, density }), className)}
      onClick={() => isInteractive && onOpen?.(id)}
      onKeyDown={handleKeyDown}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-labelledby={`card-title-${id}`}
      {...props}
    >
      {/* NEW Badge - Top Right */}
      {isNew && (
        <div className="absolute top-3 right-3 z-10">
          <Badge tone="new">NEW</Badge>
        </div>
      )}

      {/* 2-Column Layout: Thumbnail + Content */}
      <div className="grid grid-cols-[auto_1fr] gap-4 items-start">
        
        {/* Larger Thumbnail */}
        <div className="relative">
          <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-bg-muted">
            {artworkUrl ? (
              <CardImage
                assetId={id}
                alt={`${title} artwork`}
                className="w-full h-full"
                fallbackSrc={artworkUrl}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl text-fg-muted">
                <Music className="w-8 h-8" />
              </div>
            )}
            
            {/* Play/Pause Overlay */}
            {previewUrl && isInteractive && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPreviewToggle?.(id);
                  }}
                  className="p-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label={isPlaying ? `Pause preview of ${title}` : `Play preview of ${title}`}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4 text-white" />
                  ) : (
                    <Play className="h-4 w-4 text-white ml-0.5" />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content Column - Title & Producer to the right */}
        <div className="min-w-0 flex-1 space-y-2">
          {/* Title & Producer */}
          <div>
            <h3 
              id={`card-title-${id}`}
              className="text-sm font-semibold text-fg-default truncate group-hover:text-brand-primary transition-colors duration-200"
            >
              {title}
            </h3>
            <p className="text-xs text-fg-muted truncate">{producer}</p>
          </div>

          {/* Metadata with Thin Dividers */}
          <div className="space-y-2">
            {/* Primary Metadata Row */}
            <div className="flex items-center gap-2">
              {typeof bpm === "number" && (
                <MetaTag>{bpm} BPM</MetaTag>
              )}
              {keySig && (
                <Chip tone="brand">{keySig}</Chip>
              )}
            </div>
            
            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent"></div>
            
            {/* Secondary Metadata Row */}
            <div className="flex items-center gap-2">
              {duration && (
                <MetaTag>{duration}</MetaTag>
              )}
              {quality && (
                <Chip tone="default">{quality}</Chip>
              )}
            </div>
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1">
              {tags.slice(0, 2).map((tag) => (
                <Chip key={tag} tone="default" className="text-xs">
                  {tag}
                </Chip>
              ))}
            </div>
          )}

          {/* Energy Bar */}
          {typeof energy === "number" && (
            <EnergyBar energy={energy} />
          )}

          {/* Additional Badges */}
          <div className="flex flex-wrap gap-1">
            {isFeatured && <Badge tone="featured">FEATURED</Badge>}
            {isExclusive && <Badge tone="exclusive">EXCLUSIVE</Badge>}
            {discount && <Badge tone="sale">{discount}</Badge>}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-1">
            {onFavorite && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onFavorite(id);
                }}
                className={cn(
                  "p-1.5 rounded-full transition-all duration-200",
                  "bg-bg-muted/50 backdrop-blur-sm border border-border-subtle",
                  "hover:bg-danger/20 hover:border-danger/30",
                  "focus:outline-none focus:ring-2 focus:ring-danger/50",
                  isFavorited && "bg-danger/30 border-danger/50",
                )}
                aria-label={isFavorited ? `Remove ${title} from favorites` : `Add ${title} to favorites`}
              >
                <Heart className={cn("h-3 w-3", isFavorited ? "text-danger fill-current" : "text-fg-muted")} />
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
                  "p-1.5 rounded-full transition-all duration-200",
                  "bg-bg-muted/50 backdrop-blur-sm border border-border-subtle",
                  "hover:bg-brand-primary/20 hover:border-brand-primary/30",
                  "focus:outline-none focus:ring-2 focus:ring-brand-primary/50",
                )}
                aria-label={`Share ${title}`}
              >
                <Share2 className="h-3 w-3 text-fg-muted" />
              </button>
            )}
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between">
            <div className="text-sm font-bold text-fg-default">{price}</div>
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
              {CTA_TEXT[ctaMode]} <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}