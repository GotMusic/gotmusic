"use client";

import { useAssets } from "@gotmusic/api";
import Link from "next/link";

export default function AdminAssetsIndex() {
  const { data, isLoading, isError, error, refetch } = useAssets({});

  if (isLoading) {
    return (
      <main className="min-h-dvh p-6">
        <h1 className="text-2xl font-semibold">Assets</h1>
        <p className="mt-1 text-fg/70">Admin asset management</p>

        {/* Loading skeleton */}
        <div className="mt-6 space-y-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={`skeleton-${i}`}
              className="h-16 animate-pulse rounded-md border border-white/10 bg-white/5"
            />
          ))}
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-dvh p-6">
        <h1 className="text-2xl font-semibold">Assets</h1>
        <p className="mt-1 text-fg/70">Admin asset management</p>

        {/* Error state */}
        <div className="mt-6 rounded-md border border-danger/20 bg-danger/10 p-4">
          <p className="font-medium text-danger">Failed to load assets</p>
          <p className="mt-1 text-sm text-fg/70">
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-3 rounded-md bg-danger px-3 py-1.5 text-sm font-medium text-white hover:opacity-90"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  const assets = data?.items ?? [];

  return (
    <main className="min-h-dvh p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Assets</h1>
          <p className="mt-1 text-fg/70">
            {assets.length} {assets.length === 1 ? "asset" : "assets"}
          </p>
        </div>
        <Link
          href="/admin/uploads"
          className="rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-bg hover:opacity-95"
        >
          Upload New
        </Link>
      </div>

      {/* Assets table */}
      <div className="mt-6 overflow-hidden rounded-md border border-white/10">
        <table className="w-full">
          <thead className="border-b border-white/10 bg-white/5">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-fg">Title</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-fg">Artist</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-fg">Details</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-fg">Price</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-fg">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-fg">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {assets.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-fg/70">
                  No assets found. Upload one to get started.
                </td>
              </tr>
            ) : (
              assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-white/5">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/assets/${asset.id}`}
                      className="font-medium text-fg hover:text-brand-accent"
                    >
                      {asset.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm text-fg/70">{asset.artist}</td>
                  <td className="px-4 py-3 text-sm text-fg/70">
                    {asset.bpm ? `${asset.bpm} BPM` : "—"} · {asset.keySig ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-sm text-fg">
                    ${asset.priceAmount.toFixed(2)} {asset.priceCurrency}
                  </td>
                  <td className="px-4 py-3">
                    <StatusChip status={asset.status} />
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/assets/${asset.id}`}
                      className="text-sm text-brand-accent hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

function StatusChip({ status }: { status: string }) {
  const styles: Record<string, string> = {
    ready: "bg-success/20 text-success border-success/30",
    processing: "bg-warning/20 text-warning border-warning/30",
    error: "bg-danger/20 text-danger border-danger/30",
  };

  const style = styles[status] ?? "bg-white/10 text-fg border-white/20";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${style}`}
    >
      {status}
    </span>
  );
}
