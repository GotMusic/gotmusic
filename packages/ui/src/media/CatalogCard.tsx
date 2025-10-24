"use client";

import type * as React from "react";
import { Tag } from "../data/Tag";
import { ChevronRight, Pause, Play } from "../icons";
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
}

const catalogCardVariants = cva(
  "group relative overflow-hidden rounded-md border transition-transform duration-150 will-change-transform focus-within:outline focus-within:outline-2 focus-within:outline-brand-accent hover:translate-y-[-1px]",
  {
    variants: {
      variant: {
        default: "border-border-emphasis bg-bg-elevated shadow-ambient-2",
        compact: "border-border-subtle bg-bg-elevated shadow-ambient-1",
        minimal: "border-border-hairline bg-bg-elevated",
      },
      size: {
        sm: "p-2",
        md: "p-3",
        lg: "p-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
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
  previewUrl, // Extract but don't use
  isPlaying,
  onPreviewToggle,
  onOpen,
  variant,
  size,
  className,
  ...props
}: CatalogCardProps) {
  return (
    <article
      className={cn(catalogCardVariants({ variant, size }), className)}
      data-testid="catalog-card"
      {...props}
    >
      <div className="flex gap-3">
        {/* Artwork */}
        <div
          className={cn(
            "h-16 w-16 shrink-0 overflow-hidden rounded-md",
            !artworkUrl && "bg-bg-muted",
          )}
          aria-hidden
        >
          {artworkUrl ? (
            <img src={artworkUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-brand-primary/10 to-brand-accent/10" />
          )}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-fg-default text-base font-semibold">{title}</h3>
          <p className="truncate text-fg-muted text-sm">{producer}</p>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            {typeof bpm === "number" && (
              <Tag className="text-xs px-1.5 py-0.5 bg-bg-muted text-fg-muted">{bpm} BPM</Tag>
            )}
            {keySig && (
              <Tag className="text-xs px-1.5 py-0.5 bg-bg-muted text-fg-muted">{keySig}</Tag>
            )}
            {tags.slice(0, 3).map((t) => (
              <Tag key={t} className="text-xs px-1.5 py-0.5 bg-brand-primary/20 text-brand-primary">
                {t}
              </Tag>
            ))}
            {tags.length > 3 && (
              <Tag className="text-xs px-1.5 py-0.5 bg-bg-muted text-fg-subtle">
                +{tags.length - 3}
              </Tag>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex h-16 w-16 shrink-0 flex-col items-end justify-between">
          <button
            type="button"
            aria-label={
              isPlaying ? `Pause preview of ${title}` : `Play 30-second preview of ${title}`
            }
            className={cn(
              "grid h-9 w-9 place-content-center rounded-md border",
              "border-border-subtle bg-bg-muted",
              "hover:bg-brand-primary/10 active:scale-[0.98]",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent",
              "transition-all duration-150",
            )}
            onClick={() => onPreviewToggle?.(id)}
            data-testid="preview-toggle"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Play className="h-4 w-4" aria-hidden="true" />
            )}
          </button>

          <div className="text-right">
            <div className="text-fg-default text-sm font-semibold">{price}</div>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-brand-accent text-xs hover:opacity-90 focus:underline focus:outline-none"
              onClick={() => onOpen?.(id)}
              aria-label={`Open details for ${title}`}
            >
              Details <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
