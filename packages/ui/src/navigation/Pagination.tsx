"use client";

import type * as React from "react";
import { ChevronLeft, ChevronRight } from "../icons";
import { type VariantProps, cn, cva } from "../utils";

const paginationVariants = cva(
  "flex items-center justify-center gap-1",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const paginationButtonVariants = cva(
  "flex items-center justify-center rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-ring",
  {
    variants: {
      variant: {
        default: "bg-card border-border-subtle hover:border-border-emphasis hover:bg-bg-elevated text-fg",
        active: "bg-brand-primary border-brand-primary text-bg shadow-elevation-cta-brand",
        disabled: "bg-card/50 border-border-subtle/50 text-fg-muted cursor-not-allowed opacity-60",
      },
      size: {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface PaginationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof paginationVariants> {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  maxVisiblePages = 5,
  size = "md",
  className,
  ...props
}: PaginationProps) {
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const half = Math.floor(maxVisiblePages / 2);
    
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);
    
    // Adjust if we're near the beginning or end
    if (end - start + 1 < maxVisiblePages) {
      if (start === 1) {
        end = Math.min(totalPages, start + maxVisiblePages - 1);
      } else {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
    }
    
    // Add first page and ellipsis if needed
    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push("...");
      }
    }
    
    // Add visible pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    // Add last page and ellipsis if needed
    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav
      className={cn(paginationVariants({ size }), className)}
      aria-label="Pagination Navigation"
      {...props}
    >
      {/* Previous Button */}
      <button
        type="button"
        className={cn(
          paginationButtonVariants({
            variant: currentPage === 1 ? "disabled" : "default",
            size,
          }),
          "px-3"
        )}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous</span>
      </button>

      {/* Page Numbers */}
      {visiblePages.map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="flex h-10 w-10 items-center justify-center text-fg-muted"
            >
              ...
            </span>
          );
        }

        const pageNumber = page as number;
        const isActive = pageNumber === currentPage;

        return (
          <button
            key={pageNumber}
            type="button"
            className={cn(
              paginationButtonVariants({
                variant: isActive ? "active" : "default",
                size,
              })
            )}
            onClick={() => onPageChange(pageNumber)}
            aria-label={`Go to page ${pageNumber}`}
            aria-current={isActive ? "page" : undefined}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        type="button"
        className={cn(
          paginationButtonVariants({
            variant: currentPage === totalPages ? "disabled" : "default",
            size,
          }),
          "px-3"
        )}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next</span>
      </button>
    </nav>
  );
}
