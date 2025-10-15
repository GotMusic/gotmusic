"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";

interface AssetsPaginationProps {
  nextCursor: string | null;
  hasPrevious: boolean;
}

export function AssetsPagination({ nextCursor, hasPrevious }: AssetsPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleNext = useCallback(() => {
    if (!nextCursor) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("cursor", nextCursor);
    startTransition(() => {
      router.push(`/admin?${params.toString()}`);
    });
  }, [nextCursor, router, searchParams]);

  const handlePrevious = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("cursor");
    startTransition(() => {
      router.push(`/admin?${params.toString()}`);
    });
  }, [router, searchParams]);

  // Don't show pagination if there's nothing to paginate
  if (!hasPrevious && !nextCursor) {
    return null;
  }

  return (
    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
      <button
        type="button"
        onClick={handlePrevious}
        disabled={!hasPrevious || isPending}
        className="rounded-md border border-white/10 px-4 py-2 text-sm font-medium text-fg hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Previous page"
      >
        ← Previous
      </button>

      <button
        type="button"
        onClick={handleNext}
        disabled={!nextCursor || isPending}
        className="rounded-md border border-white/10 px-4 py-2 text-sm font-medium text-fg hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Next page"
      >
        Next →
      </button>
    </div>
  );
}
