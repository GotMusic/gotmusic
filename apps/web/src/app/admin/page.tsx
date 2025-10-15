import Link from "next/link";
import { z } from "zod";
import { AssetsFilters } from "./AssetsFilters";
import { AssetsPagination } from "./AssetsPagination";

// Validate searchParams with Zod
const SearchParamsSchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(10),
  cursor: z.string().optional(),
  status: z.enum(["draft", "published", "archived", "processing", "ready", "error"]).optional(),
  q: z.string().optional(),
});

type SearchParams = z.infer<typeof SearchParamsSchema>;

interface AdminAssetsIndexProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function AdminAssetsIndex({ searchParams }: AdminAssetsIndexProps) {
  // Await and validate searchParams
  const rawParams = await searchParams;
  const validatedParams = SearchParamsSchema.parse({
    limit: rawParams.limit ?? "10",
    cursor: typeof rawParams.cursor === "string" ? rawParams.cursor : undefined,
    status: typeof rawParams.status === "string" ? rawParams.status : undefined,
    q: typeof rawParams.q === "string" ? rawParams.q : undefined,
  });

  // Fetch assets server-side
  const queryParams = new URLSearchParams();
  queryParams.set("limit", validatedParams.limit.toString());
  if (validatedParams.cursor) queryParams.set("cursor", validatedParams.cursor);
  if (validatedParams.status) queryParams.set("status", validatedParams.status);
  if (validatedParams.q) queryParams.set("q", validatedParams.q);

  // Determine base URL for server-side fetch
  // Prioritize explicit URL, then build from env vars (PORT/PW_PORT for local/CI)
  let baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (!baseUrl) {
    const port = process.env.PORT || process.env.PW_PORT || "3000";
    baseUrl = `http://localhost:${port}`;
  }

  const response = await fetch(`${baseUrl}/api/assets?${queryParams.toString()}`, {
    cache: "no-store", // Always fetch fresh data
  });

  if (!response.ok) {
    return <ErrorState />;
  }

  const data = await response.json();
  const assets = data.items ?? [];

  const hasPrevious = !!validatedParams.cursor;

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
                  {validatedParams.q || validatedParams.status
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
      <AssetsPagination nextCursor={data.nextCursor} hasPrevious={hasPrevious} />
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
