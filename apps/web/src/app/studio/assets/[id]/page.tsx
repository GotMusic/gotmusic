import { formatCurrency } from "@/lib/currency";
import { getFallbackAssetById } from "@/lib/fallbackAssets";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import AssetActions from "./AssetActions";
import AssetEditForm from "./AssetEditForm";
import AssetReceipt from "./AssetReceipt";

type AssetResponse = {
  id: string;
  title: string;
  artist: string;
  bpm: number | null;
  keySig: string | null;
  priceAmount: number;
  priceCurrency: string;
  status: "draft" | "published" | "archived" | "processing" | "ready" | "error";
  updatedAt: number;
  createdAt: number;
};

async function fetchAsset(id: string): Promise<AssetResponse | null> {
  const headerStore = headers();
  const host = headerStore.get("host");
  const forwardedProto = headerStore.get("x-forwarded-proto");
  const protocol =
    forwardedProto ??
    (host?.startsWith("localhost") || host?.startsWith("127.") ? "http" : "https");
  const explicitBase = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || "";
  const base = explicitBase || (host ? `${protocol}://${host}` : "");
  const normalizedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const url = `${normalizedBase}/api/assets/${id}`;

  const requestHeaders: HeadersInit = {};
  const cookieHeader = headerStore.get("cookie");
  if (cookieHeader) {
    requestHeaders.cookie = cookieHeader;
  }
  const e2eBypass = headerStore.get("x-e2e-auth");
  if (e2eBypass) {
    requestHeaders["x-e2e-auth"] = e2eBypass;
  }

  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: requestHeaders,
      next: { revalidate: 0 },
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch asset: ${response.status}`);
    }

    return (await response.json()) as AssetResponse;
  } catch (error) {
    console.warn("Falling back to static studio asset", { id, error });
    const fallback = getFallbackAssetById(id);
    return fallback ? { ...fallback } : null;
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AssetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const asset = await fetchAsset(id);

  if (!asset) {
    return notFound();
  }

  return (
    <main
      id="main-content"
      className="mx-auto max-w-6xl px-6 py-10 space-y-8"
      data-testid="asset-detail-page"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <Link href="/studio/assets" className="text-sm text-brand-accent hover:underline">
            ← Back to assets
          </Link>
          <h1 className="mt-2 text-3xl font-semibold text-fg" data-testid="asset-detail-heading">
            Asset #{asset.id}
          </h1>
          <p className="mt-2 text-sm text-fg/70">
            {asset.title} by {asset.artist}
          </p>
        </div>
        <div className="rounded-md border border-white/10 bg-white/5 px-4 py-3 text-right text-sm text-fg/80">
          <p className="font-medium text-fg">
            {formatCurrency(asset.priceAmount, asset.priceCurrency)}
          </p>
          <p className="text-xs uppercase tracking-wide text-fg/60">{asset.status}</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <section className="space-y-6">
          <div className="rounded-lg border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-fg">Asset overview</h2>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-wide text-fg/60">Created</dt>
                <dd className="text-sm text-fg/80">{new Date(asset.createdAt).toLocaleString()}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wide text-fg/60">Last updated</dt>
                <dd className="text-sm text-fg/80">{new Date(asset.updatedAt).toLocaleString()}</dd>
              </div>
              {asset.bpm ? (
                <div>
                  <dt className="text-xs uppercase tracking-wide text-fg/60">BPM</dt>
                  <dd className="text-sm text-fg/80">{asset.bpm}</dd>
                </div>
              ) : null}
              {asset.keySig ? (
                <div>
                  <dt className="text-xs uppercase tracking-wide text-fg/60">Key</dt>
                  <dd className="text-sm text-fg/80">{asset.keySig}</dd>
                </div>
              ) : null}
            </dl>
          </div>

          <AssetReceipt assetId={asset.id} />
        </section>

        <section className="space-y-6">
          <div className="rounded-lg border border-white/10 bg-white/5 p-6">
            <AssetEditForm assetId={asset.id} />
          </div>
          <div className="rounded-lg border border-white/10 bg-white/5 p-6">
            <h2 className="text-lg font-semibold text-fg">Quick actions</h2>
            <AssetActions assetId={asset.id} status={asset.status} />
          </div>
        </section>
      </div>
    </main>
  );
}
