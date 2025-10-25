"use client";

import { PreviewProvider, usePreview } from "@/components/PreviewProvider";
import { useAssets } from "@gotmusic/api";
import { CatalogCard, Pagination } from "@gotmusic/ui";
import { DEFAULT_ASSET_METADATA, getDefaultArtworkUrl, type CTAMode } from "@/lib/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

// Function to determine CTA mode based on content type and context
const getCTAMode = (asset: any, index: number): CTAMode => {
  // Featured items get premium treatment
  if (index < 2) return "brand";
  
  // Check for exclusive content
  if (asset.isExclusive) return "premium";
  
  // Check for specific content types (if available in future)
  if (asset.type === "sample-pack") return "pack";
  if (asset.type === "drum-kit") return "kit";
  if (asset.type === "loop") return "loop";
  if (asset.type === "license") return "license";
  
  // Default to track for music content
  return "track";
};

function CatalogGridInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useAssets({ limit: 24, page: currentPage });
  const { currentId, isPlaying, toggle } = usePreview();

  // Update page from URL params
  useEffect(() => {
    const page = searchParams.get('page');
    if (page) {
      const pageNum = parseInt(page, 10);
      if (pageNum > 0) {
        setCurrentPage(pageNum);
      }
    }
  }, [searchParams]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Update URL without page reload
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', page.toString());
    router.push(`/catalog?${newSearchParams.toString()}`, { scroll: false });
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={`skeleton-${
              // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton array
              i
            }`}
            className="h-48 rounded-xl bg-gradient-to-br from-white/10 via-white/5 to-white/2 backdrop-blur-sm border border-white/20 animate-pulse"
            data-testid="catalog-skeleton"
          >
            <div className="p-4 space-y-3">
              <div className="h-4 bg-white/20 rounded w-3/4"></div>
              <div className="h-3 bg-white/15 rounded w-1/2"></div>
              <div className="flex gap-2">
                <div className="h-6 bg-white/20 rounded-full w-16"></div>
                <div className="h-6 bg-white/20 rounded-full w-12"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="rounded-lg border border-[var(--border-danger,rgba(249,112,102,0.55))] bg-[var(--color-bg-elevated,#121520)] p-6 text-center"
        role="alert"
      >
        <p className="text-[var(--color-semantic-danger,#F97066)]">Failed to load catalog</p>
        <p className="mt-2 text-sm text-[var(--color-fg-muted,#A9B1C1)]">
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
        <p className="mt-2 text-xs text-[var(--color-fg-muted,#A9B1C1)]">
          Debug: {JSON.stringify({ error: error.message, stack: error.stack })}
        </p>
      </div>
    );
  }

  if (!data?.items.length) {
    return (
      <div className="rounded-lg border border-[var(--border-subtle,rgba(255,255,255,0.10))] bg-[var(--color-bg-elevated,#121520)] p-12 text-center">
        <p className="text-[var(--color-fg-muted,#A9B1C1)]">No assets found</p>
        <p className="mt-2 text-xs text-[var(--color-fg-muted,#A9B1C1)]">
          Debug:{" "}
          {JSON.stringify({
            hasData: !!data,
            itemsLength: data?.items?.length,
            dataKeys: data ? Object.keys(data) : null,
            isLoading,
            error: error ? String(error) : null,
          })}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Catalog Grid */}
      <div
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        data-testid="catalog-grid"
      >
        {data.items.map((asset, index) => (
          <CatalogCard
            key={asset.id}
            id={asset.id}
            title={asset.title}
            producer={asset.artist || "Unknown"}
            price={`$${asset.priceAmount.toFixed(2)}`}
            bpm={asset.bpm ? Number(asset.bpm) : undefined}
            keySig={asset.keySig || undefined}
            tags={undefined}
            artworkUrl={getDefaultArtworkUrl(asset.id)}
            previewUrl={undefined}
            duration={DEFAULT_ASSET_METADATA.duration}
            quality={DEFAULT_ASSET_METADATA.quality}
            genre={DEFAULT_ASSET_METADATA.genre}
            mood={DEFAULT_ASSET_METADATA.mood}
            energy={DEFAULT_ASSET_METADATA.energy}
            isNew={true}
            isFeatured={false}
            isExclusive={false}
            variant="default"
            size="md"
            glow="soft"
            ctaMode={getCTAMode(asset, index)}
            isPlaying={currentId === asset.id && isPlaying}
            onPreviewToggle={(id: string) => {
              // Preview URL not yet available in API
              toggle(id, "");
            }}
            onOpen={(id: string) => router.push(`/asset/${id}`)}
            onDownload={(id: string) => console.log("Download", id)}
            onFavorite={(id: string) => console.log("Favorite", id)}
            onShare={(id: string) => console.log("Share", id)}
            popularity={85}
            isFavorited={false}
            discount={undefined}
            originalPrice={undefined}
            className=""
          />
        ))}
      </div>

      {/* Pagination */}
      {data.pagination && data.pagination.totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            currentPage={data.pagination.page}
            totalPages={data.pagination.totalPages}
            onPageChange={handlePageChange}
            showFirstLast={true}
            maxVisiblePages={5}
            size="md"
          />
        </div>
      )}
    </div>
  );
}

export function CatalogGrid() {
  return (
    <PreviewProvider>
      <CatalogGridInner />
    </PreviewProvider>
  );
}
