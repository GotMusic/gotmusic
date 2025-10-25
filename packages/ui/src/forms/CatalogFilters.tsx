"use client";

import type * as React from "react";
import { Button } from "../core/Button";
import { Badge } from "../data/Badge";
import { type VariantProps, cn, cva } from "../utils";
import { Checkbox } from "./Checkbox";
import { Select } from "./Select";
import { Slider } from "./Slider";

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface CatalogFiltersProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof catalogFiltersVariants> {
  /**
   * Available genres for filtering
   */
  genres?: FilterOption[];
  /**
   * Selected genre values
   */
  selectedGenres?: string[];
  /**
   * Callback when genres change
   */
  onGenresChange?: (genres: string[]) => void;
  /**
   * Available BPM range
   */
  bpmRange?: { min: number; max: number };
  /**
   * Selected BPM range
   */
  selectedBpmRange?: { min: number; max: number };
  /**
   * Callback when BPM range changes
   */
  onBpmRangeChange?: (range: { min: number; max: number }) => void;
  /**
   * Available price range
   */
  priceRange?: PriceRange;
  /**
   * Selected price range
   */
  selectedPriceRange?: PriceRange;
  /**
   * Callback when price range changes
   */
  onPriceRangeChange?: (range: PriceRange) => void;
  /**
   * Available key signatures
   */
  keySignatures?: FilterOption[];
  /**
   * Selected key signatures
   */
  selectedKeySignatures?: string[];
  /**
   * Callback when key signatures change
   */
  onKeySignaturesChange?: (keys: string[]) => void;
  /**
   * Whether filters are loading
   */
  loading?: boolean;
  /**
   * Number of active filters
   */
  activeFilterCount?: number;
  /**
   * Callback to clear all filters
   */
  onClearAll?: () => void;
  /**
   * Whether to show the clear all button
   */
  showClearAll?: boolean;
}

const catalogFiltersVariants = cva("space-y-6 p-4", {
  variants: {
    variant: {
      default: "bg-bg-elevated border border-border-subtle rounded-lg",
      minimal: "bg-transparent",
      sidebar: "bg-bg-muted border-r border-border-subtle",
    },
    size: {
      sm: "p-3 space-y-4",
      md: "p-4 space-y-6",
      lg: "p-6 space-y-8",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export function CatalogFilters({
  genres = [],
  selectedGenres = [],
  onGenresChange,
  bpmRange = { min: 60, max: 200 },
  selectedBpmRange,
  onBpmRangeChange,
  priceRange = { min: 0, max: 100 },
  selectedPriceRange,
  onPriceRangeChange,
  keySignatures = [],
  selectedKeySignatures = [],
  onKeySignaturesChange,
  loading = false,
  activeFilterCount = 0,
  onClearAll,
  showClearAll = true,
  variant,
  size,
  className,
  ...props
}: CatalogFiltersProps) {
  const handleGenreToggle = (genre: string) => {
    if (!onGenresChange) return;

    const newGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];

    onGenresChange(newGenres);
  };

  const handleKeySignatureToggle = (key: string) => {
    if (!onKeySignaturesChange) return;

    const newKeys = selectedKeySignatures.includes(key)
      ? selectedKeySignatures.filter((k) => k !== key)
      : [...selectedKeySignatures, key];

    onKeySignaturesChange(newKeys);
  };

  if (loading) {
    return (
      <div className={cn(catalogFiltersVariants({ variant, size }), className)} {...props}>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-bg-muted/20 rounded w-1/4" />
          <div className="space-y-2">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={`skeleton-item-${i + 1}`} className="h-3 bg-bg-muted/20 rounded w-3/4" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(catalogFiltersVariants({ variant, size }), className)} {...props}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-fg-default">Filters</h3>
        {showClearAll && activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-fg-muted hover:text-fg-default"
          >
            Clear all ({activeFilterCount})
          </Button>
        )}
      </div>

      {/* Genres */}
      {genres.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-fg-default">Genre</h4>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <Badge
                key={genre.value}
                variant={selectedGenres.includes(genre.value) ? "info" : "neutral"}
                className="cursor-pointer hover:bg-brand-primary/10"
                onClick={() => handleGenreToggle(genre.value)}
              >
                {genre.label}
                {genre.count && <span className="ml-1 text-xs opacity-70">({genre.count})</span>}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* BPM Range */}
      {bpmRange && onBpmRangeChange && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-fg-default">
            BPM: {selectedBpmRange?.min || bpmRange.min} - {selectedBpmRange?.max || bpmRange.max}
          </h4>
          <Slider
            min={bpmRange.min}
            max={bpmRange.max}
            value={[selectedBpmRange?.min || bpmRange.min, selectedBpmRange?.max || bpmRange.max]}
            onValueChange={([min, max]) => onBpmRangeChange({ min, max })}
            step={5}
            className="w-full"
          />
        </div>
      )}

      {/* Price Range */}
      {priceRange && onPriceRangeChange && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-fg-default">
            Price: ${selectedPriceRange?.min || priceRange.min} - $
            {selectedPriceRange?.max || priceRange.max}
          </h4>
          <Slider
            min={priceRange.min}
            max={priceRange.max}
            value={[
              selectedPriceRange?.min || priceRange.min,
              selectedPriceRange?.max || priceRange.max,
            ]}
            onValueChange={([min, max]) => onPriceRangeChange({ min, max })}
            step={1}
            className="w-full"
          />
        </div>
      )}

      {/* Key Signatures */}
      {keySignatures.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-fg-default">Key Signature</h4>
          <div className="grid grid-cols-2 gap-2">
            {keySignatures.map((key) => (
              <div key={key.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`key-${key.value}`}
                  checked={selectedKeySignatures.includes(key.value)}
                  onCheckedChange={() => handleKeySignatureToggle(key.value)}
                />
                <label
                  htmlFor={`key-${key.value}`}
                  className="text-sm cursor-pointer text-fg-default"
                >
                  {key.label}
                  {key.count && <span className="ml-1 text-xs text-fg-muted">({key.count})</span>}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Filter chip component for showing active filters
export function FilterChip({
  label,
  value,
  onRemove,
  className,
}: {
  label: string;
  value: string;
  onRemove?: (value: string) => void;
  className?: string;
}) {
  return (
    <Badge
      variant="neutral"
      className={cn("cursor-pointer hover:bg-semantic-danger hover:text-fg-inverse", className)}
      onClick={() => onRemove?.(value)}
    >
      {label}
      <span className="ml-1 text-xs">×</span>
    </Badge>
  );
}

// Active filters display
export function ActiveFilters({
  filters,
  onRemove,
  onClearAll,
  className,
}: {
  filters: Array<{ label: string; value: string; type: string }>;
  onRemove?: (value: string, type: string) => void;
  onClearAll?: () => void;
  className?: string;
}) {
  if (filters.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-2 items-center", className)}>
      <span className="text-sm text-fg-muted">Active filters:</span>
      {filters.map((filter) => (
        <FilterChip
          key={`${filter.type}-${filter.value}`}
          label={filter.label}
          value={filter.value}
          onRemove={(value) => onRemove?.(value, filter.type)}
        />
      ))}
      {onClearAll && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="text-fg-muted hover:text-fg-default"
        >
          Clear all
        </Button>
      )}
    </div>
  );
}
