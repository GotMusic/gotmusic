"use client";

import { useAssets } from "@gotmusic/api";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AssetsFilters } from "./AssetsFilters";
import { AssetsPagination } from "./AssetsPagination";

export function AdminAssetsTable() {
  const searchParams = useSearchParams();

  // Parse query parameters
  const limit = Number.parseInt(searchParams.get("limit") || "10", 10);
  const cursor = searchParams.get("cursor") || undefined;
  const status =
    (searchParams.get("status") as
      | "draft"
      | "published"
      | "archived"
      | "processing"
      | "ready"
      | "error") || undefined;
  const q = searchParams.get("q") || undefined;

  // Fetch assets with current filters
  const { data, isLoading, isError } = useAssets({
    limit,
    cursor,
    status,
    q,
  });

  const assets = data?.items ?? [];
  const hasPrevious = !!cursor;

  if (isLoading) {
    return (
      <main className="min-h-dvh p-6">
        <h1 className="text-2xl font-semibold">Assets</h1>
        <p className="mt-1 text-fg/70">Admin asset management</p>

        {/* Loading skeleton */}
        <div className="mt-6 space-y-3">
          <div className="h-16 animate-pulse rounded-md border border-white/10 bg-white/5" />
          <div className="h-16 animate-pulse rounded-md border border-white/10 bg-white/5" />
          <div className="h-16 animate-pulse rounded-md border border-white/10 bg-white/5" />
          <div className="h-16 animate-pulse rounded-md border border-white/10 bg-white/5" />
          <div className="h-16 animate-pulse rounded-md border border-white/10 bg-white/5" />
        </div>
      </main>
    );
  }

  if (isError) {
    return <ErrorState />;
  }

  return (
    <main className="min-h-dvh p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Assets</h1>
          <p className="mt-1 text-fg/70">Admin asset management</p>
        </div>
        <Link
          href="/admin/uploads"
          className="rounded-md bg-brand-primary px-4 py-2 text-sm font-medium text-bg hover:opacity-95"
        >
          Upload New
        </Link>
      </div>

      {/* Filters */}
      <AssetsFilters />

      {/* Assets table */}
      <div className="mt-6 overflow-hidden rounded-md border border-white/10">
        <table className="w-full" aria-label="Assets table">
          <thead className="border-b border-white/10 bg-white/5">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-fg">
                Title
              </th>
              <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-fg">
                Artist
              </th>
              <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-fg">
                Details
              </th>
              <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-fg">
                Price
              </th>
              <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-fg">
                Status
              </th>
              <th scope="col" className="px-4 py-3 text-left text-sm font-medium text-fg">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {assets.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-fg/70">
                  {q || status
                    ? "No assets match your filters. Try adjusting your search."
                    : "No assets found. Upload one to get started."}
                </td>
              </tr>
            ) : (
              assets.map(
                (asset: {
                  id: string;
                  title: string;
                  artist: string;
                  bpm: number | null;
                  keySig: string | null;
                  priceAmount: number;
                  priceCurrency: string;
                  status: string;
                }) => (
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
                ),
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <AssetsPagination nextCursor={data?.nextCursor || null} hasPrevious={hasPrevious} />
    </main>
  );
}

function ErrorState() {
  return (
    <main className="min-h-dvh p-6">
      <h1 className="text-2xl font-semibold">Assets</h1>
      <p className="mt-1 text-fg/70">Admin asset management</p>

      <div className="mt-6 rounded-md border border-danger/20 bg-danger/10 p-4">
        <p className="font-medium text-danger">Failed to load assets</p>
        <p className="mt-1 text-sm text-fg/70">
          Please try refreshing the page or check your connection.
        </p>
      </div>
    </main>
  );
}

function StatusChip({ status }: { status: string }) {
  const styles: Record<string, string> = {
    ready: "bg-success/20 text-success border-success/30",
    processing: "bg-warning/20 text-warning border-warning/30",
    error: "bg-danger/20 text-danger border-danger/30",
    draft: "bg-white/10 text-fg border-white/20",
    published: "bg-brand-accent/20 text-brand-accent border-brand-accent/30",
    archived: "bg-white/5 text-fg/50 border-white/10",
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
