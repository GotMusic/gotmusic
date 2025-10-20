"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";

const STATUS_OPTIONS = [
  { value: "", label: "All Status" },
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
  { value: "processing", label: "Processing" },
  { value: "ready", label: "Ready" },
  { value: "error", label: "Error" },
] as const;

export function AssetsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Local state for search input (will be debounced)
  const [searchValue, setSearchValue] = useState(searchParams.get("q") ?? "");

  // Debounced search - updates URL after 300ms
  const debouncedSearch = useDebounce((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("q", value);
    } else {
      params.delete("q");
    }
    // Reset to first page when searching
    params.delete("cursor");
    startTransition(() => {
      router.push(`/admin?${params.toString()}`);
    });
  }, 300);

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchValue(value);
      debouncedSearch(value);
    },
    [debouncedSearch],
  );

  const handleStatusChange = useCallback(
    (status: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (status) {
        params.set("status", status);
      } else {
        params.delete("status");
      }
      // Reset to first page when filtering
      params.delete("cursor");
      startTransition(() => {
        router.push(`/admin?${params.toString()}`);
      });
    },
    [router, searchParams],
  );

  const handleClearFilters = useCallback(() => {
    setSearchValue("");
    startTransition(() => {
      router.push("/admin");
    });
  }, [router]);

  const hasFilters = searchParams.get("q") || searchParams.get("status");

  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      {/* Search input */}
      <div className="flex-1 min-w-[240px]">
        <label htmlFor="asset-search" className="sr-only">
          Search assets
        </label>
        <input
          id="asset-search"
          type="search"
          placeholder="Search by title or artist..."
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-fg placeholder:text-fg/50 focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
          aria-label="Search assets"
        />
      </div>

      {/* Status filter */}
      <div className="min-w-[160px]">
        <label htmlFor="status-filter" className="sr-only">
          Filter by status
        </label>
        <select
          id="status-filter"
          value={searchParams.get("status") ?? ""}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-fg focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
          aria-label="Filter assets by status"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Clear filters button */}
      {hasFilters && (
        <button
          type="button"
          onClick={handleClearFilters}
          className="rounded-md border border-white/10 px-3 py-2 text-sm text-fg hover:bg-white/5"
          aria-label="Clear all filters"
        >
          Clear Filters
        </button>
      )}

      {/* Loading indicator */}
      {isPending && (
        <div className="flex items-center gap-2 text-sm text-fg/70">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-fg/20 border-t-fg/70" />
          <span>Loading...</span>
        </div>
      )}
    </div>
  );
}
