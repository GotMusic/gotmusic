"use client";

import { formatCurrency } from "@/lib/currency";
import { useAssets } from "@gotmusic/api";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [showToast, setShowToast] = useState(false);
  const { data, isLoading, isError, error, refetch } = useAssets({});

  // Show toast on error
  useEffect(() => {
    if (isError) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isError]);

  if (isLoading) {
    return (
      <main id="main-content" className="min-h-dvh p-6">
        <h1 className="text-2xl font-semibold" data-testid="main-heading">
          GotMusic
        </h1>
        <p className="mt-1 text-fg/70" data-testid="main-subtitle">
          Discover music assets
        </p>

        {/* Loading skeleton */}
        <div
          className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          aria-busy="true"
          aria-live="polite"
        >
          <div
            className="h-32 animate-pulse rounded-md border border-white/10 bg-white/5"
            aria-hidden="true"
          />
          <div
            className="h-32 animate-pulse rounded-md border border-white/10 bg-white/5"
            aria-hidden="true"
          />
          <div
            className="h-32 animate-pulse rounded-md border border-white/10 bg-white/5"
            aria-hidden="true"
          />
          <div
            className="h-32 animate-pulse rounded-md border border-white/10 bg-white/5"
            aria-hidden="true"
          />
          <div
            className="h-32 animate-pulse rounded-md border border-white/10 bg-white/5"
            aria-hidden="true"
          />
          <div
            className="h-32 animate-pulse rounded-md border border-white/10 bg-white/5"
            aria-hidden="true"
          />
          <span className="sr-only">Loading assets...</span>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main id="main-content" className="min-h-dvh p-6">
        <h1 className="text-2xl font-semibold" data-testid="main-heading">
          GotMusic
        </h1>
        <p className="mt-1 text-fg/70" data-testid="main-subtitle">
          Discover music assets
        </p>

        {/* Error state */}
        <div
          className="mt-6 rounded-md border border-danger/20 bg-danger/10 p-6 text-center"
          role="alert"
        >
          <div className="text-6xl" role="img" aria-label="Warning">
            ⚠️
          </div>
          <h2 className="mt-4 text-xl font-semibold text-danger">Failed to load catalog</h2>
          <p className="mt-2 text-fg/70">
            {error instanceof Error ? error.message : "Unknown error occurred"}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 rounded-md bg-danger px-4 py-2 font-medium text-white hover:opacity-90"
            aria-label="Retry loading assets"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  const assets = data?.items ?? [];

  return (
    <main id="main-content" className="min-h-dvh p-6">
      {/* Toast notification */}
      {showToast && (
        <div
          className="fixed right-4 top-4 z-50 animate-in slide-in-from-top-2 rounded-md border border-danger/20 bg-danger/90 px-4 py-3 text-white shadow-lg backdrop-blur"
          role="alert"
          aria-live="assertive"
        >
          <div className="font-semibold">Network Error</div>
          <div className="text-sm opacity-90">Failed to load assets</div>
        </div>
      )}

      <div className="mb-6">
        <h1 className="text-2xl font-semibold" data-testid="main-heading">
          GotMusic
        </h1>
        <p className="mt-1 text-fg/70" data-testid="main-subtitle">
          Discover music assets
        </p>
      </div>

      {assets.length === 0 ? (
        <div
          className="rounded-md border border-white/10 bg-bg-elevated p-12 text-center"
          data-testid="empty-state"
        >
          <div className="text-6xl">🎵</div>
          <h2 className="mt-4 text-xl font-semibold">No assets yet</h2>
          <p className="mt-2 text-fg/70">Check back soon for new music assets.</p>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="catalog-grid">
          {assets.map((asset) => (
            <li
              key={asset.id}
              className="group relative overflow-hidden rounded-md border border-white/10 bg-bg-elevated p-4 transition hover:border-brand-accent/50 hover:shadow-lg"
              data-testid="catalog-item"
            >
              <Link href={`/asset/${asset.id}`} className="block">
                <div className="mb-1 text-lg font-medium text-fg group-hover:text-brand-accent">
                  {asset.title}
                </div>
                <div className="text-sm text-fg/70">
                  {asset.artist} · {asset.bpm ?? "—"} BPM · {asset.keySig ?? "—"}
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-medium text-fg">
                    {formatCurrency(asset.priceAmount, asset.priceCurrency)}
                  </span>
                  {asset.status === "ready" && (
                    <span className="inline-flex items-center rounded-full bg-success/20 px-2 py-0.5 text-xs font-medium text-success">
                      Available
                    </span>
                  )}
                  {asset.status === "processing" && (
                    <span className="inline-flex items-center rounded-full bg-warning/20 px-2 py-0.5 text-xs font-medium text-warning">
                      Processing
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
