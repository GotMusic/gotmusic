import { notFound } from "next/navigation";
import { VALIDATED as ASSETS } from "@gotmusic/fixtures";
import AssetActions from "./AssetActions";

export default function AdminAssetDetail({ params }: { params: { id: string } }) {
  const asset = ASSETS.find((a) => a.id === params.id);
  if (!asset) return notFound();

  const price = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: asset.price.currency,
  }).format(asset.price.amount);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Asset #{asset.id}</h1>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="rounded-md border border-white/10 p-4 lg:col-span-2">
          <div className="text-lg font-medium">{asset.title}</div>
          <div className="text-sm text-fg/70">{asset.artist}</div>
          <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <div>
              <dt className="text-fg/70">BPM</dt>
              <dd>{asset.bpm ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-fg/70">Key</dt>
              <dd>{asset.key ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-fg/70">Price</dt>
              <dd>{price}</dd>
            </div>
            <div>
              <dt className="text-fg/70">Status</dt>
              <dd>
                <span className="inline-flex rounded-md bg-white/10 px-2 py-0.5 text-xs">ready</span>
              </dd>
            </div>
          </dl>
          {asset.previewUrl ? (
            <audio className="mt-4 w-full" src={asset.previewUrl} controls preload="none" />
          ) : null}
        </div>

        <div className="rounded-md border border-white/10 p-4">
          <h2 className="text-sm font-semibold">Actions</h2>
          <AssetActions assetId={asset.id} />
        </div>
      </div>
    </main>
  );
}


