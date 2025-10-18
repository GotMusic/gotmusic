"use client";

import { PreviewProvider, usePreview } from "@/components/PreviewProvider";
import { useAssets } from "@gotmusic/api";
import { CatalogCard } from "@gotmusic/ui";
import { useRouter } from "next/navigation";

function CatalogGridInner() {
  const router = useRouter();
  const { data, isLoading, error } = useAssets({ limit: 24, status: "published" });
  const { currentId, isPlaying, toggle } = usePreview();

  if (isLoading) {
    return (
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={`skeleton-${
              // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton array
              i
            }`}
            className="h-32 rounded-lg border border-[var(--border-subtle,rgba(255,255,255,0.10))] bg-[var(--color-bg-elevated,#121520)] animate-pulse"
            data-testid="catalog-skeleton"
          />
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
      </div>
    );
  }

  if (!data?.items.length) {
    return (
      <div className="rounded-lg border border-[var(--border-subtle,rgba(255,255,255,0.10))] bg-[var(--color-bg-elevated,#121520)] p-12 text-center">
        <p className="text-[var(--color-fg-muted,#A9B1C1)]">No assets found</p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
      data-testid="catalog-grid"
    >
      {data.items.map((asset) => (
        <CatalogCard
          key={asset.id}
          id={asset.id}
          title={asset.title}
          producer={asset.artist || "Unknown"}
          price={`$${(asset.priceAmount / 100).toFixed(2)}`}
          bpm={asset.bpm ?? undefined}
          keySig={asset.keySig ?? undefined}
          tags={[]}
          artworkUrl={undefined}
          previewUrl={undefined}
          isPlaying={currentId === asset.id && isPlaying}
          onPreviewToggle={(id) => {
            // Preview URL not yet available in API
            toggle(id, "");
          }}
          onOpen={(id) => router.push(`/asset/${id}`)}
        />
      ))}
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
