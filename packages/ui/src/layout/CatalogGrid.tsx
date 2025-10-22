"use client";

import type * as React from "react";
import { cn, cva, type VariantProps } from "../utils";

export interface CatalogGridProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof catalogGridVariants> {
  /**
   * Number of columns for different screen sizes
   */
  columns?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  /**
   * Whether to show loading skeleton
   */
  loading?: boolean;
  /**
   * Number of skeleton items to show when loading
   */
  skeletonCount?: number;
  /**
   * Empty state content
   */
  emptyState?: React.ReactNode;
  /**
   * Whether the grid is scrollable
   */
  scrollable?: boolean;
}

const catalogGridVariants = cva("grid", {
  variants: {
    gap: {
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
    },
    scrollable: {
      true: "overflow-x-auto",
      false: "",
    },
  },
  defaultVariants: {
    gap: "md",
    scrollable: false,
  },
});

export function CatalogGrid({
  children,
  columns = { default: 1, sm: 2, md: 3, lg: 4 },
  gap,
  loading = false,
  skeletonCount = 6,
  emptyState,
  scrollable,
  className,
  ...props
}: CatalogGridProps) {
  const gridClasses = cn(
    catalogGridVariants({ gap, scrollable }),
    // Responsive columns
    columns.default && `grid-cols-${columns.default}`,
    columns.sm && `sm:grid-cols-${columns.sm}`,
    columns.md && `md:grid-cols-${columns.md}`,
    columns.lg && `lg:grid-cols-${columns.lg}`,
    columns.xl && `xl:grid-cols-${columns.xl}`,
    className,
  );

  if (loading) {
    return (
      <div className={gridClasses} {...props}>
        {Array.from({ length: skeletonCount }, (_, i) => (
          <div
            key={`skeleton-item-${i + 1}`}
            className="animate-pulse rounded-lg border bg-bg-muted/20 h-32"
            data-testid="catalog-grid-skeleton"
          />
        ))}
      </div>
    );
  }

  if (emptyState) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        {emptyState}
      </div>
    );
  }

  return (
    <div className={gridClasses} {...props}>
      {children}
    </div>
  );
}

// Skeleton component for loading states
export function CatalogGridSkeleton({
  count = 6,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={`empty-skeleton-${i + 1}`}
          className="animate-pulse rounded-lg border bg-bg-muted/20 h-32"
          data-testid="catalog-grid-skeleton"
        />
      ))}
    </div>
  );
}

// Empty state component
export function CatalogGridEmpty({
  title = "No items found",
  description = "Try adjusting your filters or search terms.",
  action,
  className,
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
      <div className="w-16 h-16 rounded-full bg-bg-muted/20 flex items-center justify-center mb-4">
        <svg
          className="w-8 h-8 text-fg-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          role="img"
          aria-label="No items found icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-fg-default mb-2">{title}</h3>
      <p className="text-fg-muted mb-4 max-w-sm">{description}</p>
      {action}
    </div>
  );
}