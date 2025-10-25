"use client";

import { formatCurrency } from "@/lib/currency";
import { useAssets } from "@gotmusic/api";
import Link from "next/link";

export function StudioAssetsList() {
  const { data, isLoading, isError, error } = useAssets({ limit: 20 });

  if (isLoading) {
    const skeletonItems = [
      "skeleton-1",
      "skeleton-2", 
      "skeleton-3",
      "skeleton-4"
    ];
    
    return (
      <div className="mt-6 grid gap-4 md:grid-cols-2" aria-live="polite">
        {skeletonItems.map((id) => (
          <div
            key={id}
            className="h-32 animate-pulse rounded-lg border border-white/10 bg-white/5"
            aria-hidden="true"
          />
        ))}
        <span className="sr-only">Loading assets…</span>
      </div>
    );
  }

  if (isError) {
    return (
      <output className="mt-6 rounded-md border border-danger/20 bg-danger/10 p-4">
        <p className="font-medium text-danger">Unable to load your assets</p>
        <p className="mt-1 text-sm text-fg/70">{error?.message ?? "Please try again."}</p>
      </output>
    );
  }

  const assets = data?.items ?? [];

  if (assets.length === 0) {
    return (
      <div className="mt-6 rounded-md border border-white/10 bg-white/5 p-6">
        <p className="text-sm text-fg/70">You haven’t uploaded any assets yet.</p>
        <p className="mt-1 text-sm text-fg/70">
          Get started by uploading your first track. You’ll see it here once it’s ready.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2" data-testid="studio-assets-list">
      {assets.map((asset) => (
        <article
          key={asset.id}
          className="flex h-full flex-col justify-between rounded-lg border border-white/10 bg-white/5 p-4 shadow-sm transition hover:border-brand-accent"
        >
          <div>
            <h2 className="text-lg font-semibold text-fg">{asset.title}</h2>
            <p className="text-sm text-fg/70">{asset.artist}</p>
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm text-fg/70">
            <div>
              <dt className="font-medium text-fg">Price</dt>
              <dd>{formatCurrency(asset.priceAmount, asset.priceCurrency)}</dd>
            </div>
            <div>
              <dt className="font-medium text-fg">Status</dt>
              <dd className="capitalize">{asset.status}</dd>
            </div>
            {asset.bpm ? (
              <div>
                <dt className="font-medium text-fg">BPM</dt>
                <dd>{asset.bpm}</dd>
              </div>
            ) : null}
            {asset.keySig ? (
              <div>
                <dt className="font-medium text-fg">Key</dt>
                <dd>{asset.keySig}</dd>
              </div>
            ) : null}
          </dl>

          <div className="mt-4 flex items-center justify-between">
            <time className="text-xs text-fg/60" dateTime={new Date(asset.updatedAt).toISOString()}>
              Updated {new Date(asset.updatedAt).toLocaleDateString()}
            </time>
            <Link
              href={`/studio/assets/${asset.id}`}
              className="text-sm font-medium text-brand-accent hover:underline"
            >
              View details
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
