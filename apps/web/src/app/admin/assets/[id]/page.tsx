import { db, schema } from "@/server/db";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import AssetActions from "./AssetActions";

export const dynamic = "force-dynamic"; // Skip static generation

export default async function AdminAssetDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const asset = db.select().from(schema.assets).where(eq(schema.assets.id, id)).get();
  if (!asset) return notFound();

  // Format price manually since PYUSD is not an ISO 4217 currency code
  const price = `$${asset.priceAmount.toFixed(2)} ${asset.priceCurrency}`;

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
              <dd>{asset.keySig ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-fg/70">Price</dt>
              <dd>{price}</dd>
            </div>
            <div>
              <dt className="text-fg/70">Status</dt>
              <dd>
                <span className="inline-flex rounded-md bg-white/10 px-2 py-0.5 text-xs">
                  {asset.status}
                </span>
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-md border border-white/10 p-4">
          <h2 className="text-sm font-semibold">Actions</h2>
          <AssetActions assetId={asset.id} />
        </div>
      </div>
    </main>
  );
}
