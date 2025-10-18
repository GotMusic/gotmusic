"use client";

import * as React from "react";
import { Tag } from "../data/Tag";
import { ChevronRight, Pause, Play } from "../icons";
import { cn } from "../utils";

export type CatalogCardProps = {
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
  className?: string;
};

export function CatalogCard(props: CatalogCardProps) {
  const {
    id,
    title,
    producer,
    price,
    bpm,
    keySig,
    tags = [],
    artworkUrl,
    isPlaying,
    onPreviewToggle,
    onOpen,
    className,
  } = props;

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-[var(--radius-md,12px)] border",
        "border-[var(--border-emphasis,rgba(255,255,255,0.16))]",
        "bg-[var(--color-bg-elevated,#121520)] shadow-[var(--shadow-2,0_8px_32px_0_rgba(0,0,0,0.35))]",
        "focus-within:outline focus-within:outline-2 focus-within:outline-[var(--color-brand-accent,#5BD0FF)]",
        "transition-transform duration-150 will-change-transform hover:translate-y-[-1px]",
        className,
      )}
      data-testid="catalog-card"
    >
      <div className="flex gap-3 p-3">
        {/* Artwork */}
        <div
          className={cn(
            "h-16 w-16 shrink-0 overflow-hidden rounded-[var(--radius-md,12px)]",
            !artworkUrl && "bg-[var(--color-bg-muted,#0F131B)]",
          )}
          aria-hidden
        >
          {artworkUrl ? (
            <img src={artworkUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-[var(--color-brand-primary,#6AE6A6)]/10 to-[var(--color-brand-accent,#5BD0FF)]/10" />
          )}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[var(--color-fg,#E6EAF2)] text-base font-semibold">
            {title}
          </h3>
          <p className="truncate text-[var(--color-fg-muted,#A9B1C1)] text-sm">{producer}</p>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            {typeof bpm === "number" && (
              <Tag className="text-xs px-1.5 py-0.5 bg-[var(--color-bg-muted,#0F131B)] text-[var(--color-fg-muted,#A9B1C1)]">
                {bpm} BPM
              </Tag>
            )}
            {keySig && (
              <Tag className="text-xs px-1.5 py-0.5 bg-[var(--color-bg-muted,#0F131B)] text-[var(--color-fg-muted,#A9B1C1)]">
                {keySig}
              </Tag>
            )}
            {tags.slice(0, 3).map((t) => (
              <Tag
                key={t}
                className="text-xs px-1.5 py-0.5 bg-[var(--color-brand-primary,#6AE6A6)]/20 text-[var(--color-brand-primary,#6AE6A6)]"
              >
                {t}
              </Tag>
            ))}
            {tags.length > 3 && (
              <Tag className="text-xs px-1.5 py-0.5 bg-[var(--color-bg-muted,#0F131B)] text-[var(--color-fg-subtle,rgba(230,234,242,0.75))]">
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
              "grid h-9 w-9 place-content-center rounded-[var(--radius-md,12px)] border",
              "border-[var(--border-subtle,rgba(255,255,255,0.10))] bg-[var(--color-bg-muted,#0F131B)]",
              "hover:bg-[var(--color-brand-primary,#6AE6A6)]/10 active:scale-[0.98]",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent,#5BD0FF)]",
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
            <div className="text-[var(--color-fg,#E6EAF2)] text-sm font-semibold">{price}</div>
            <button
              type="button"
              className="inline-flex items-center gap-1 text-[var(--color-brand-accent,#5BD0FF)] text-xs hover:opacity-90 focus:underline focus:outline-none"
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
