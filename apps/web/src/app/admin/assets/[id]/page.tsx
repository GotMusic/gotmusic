import { db, schema } from "@/server/db";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import AssetActions from "./AssetActions";
import AssetEditForm from "./AssetEditForm";

export const dynamic = "force-dynamic"; // Skip static generation

export default async function AdminAssetDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const asset = await db
    .select()
    .from(schema.assets)
    .where(eq(schema.assets.id, id))
    .then((rows) => rows[0]);
  if (!asset) return notFound();

  return (
    <main className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Asset #{asset.id}</h1>
        <p className="text-fg/70">Manage asset details and settings</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content - Asset Edit Form */}
        <div className="lg:col-span-2">
          <div className="rounded-md border border-fg/10 bg-bg p-6">
            <AssetEditForm assetId={asset.id} />
          </div>
        </div>

        {/* Sidebar - Actions */}
        <div className="space-y-6">
          <div className="rounded-md border border-fg/10 bg-bg p-4">
            <h2 className="text-sm font-semibold">Actions</h2>
            <AssetActions assetId={asset.id} status={asset.status} />
          </div>

          {/* Asset Info */}
          <div className="rounded-md border border-fg/10 bg-bg p-4">
            <h2 className="text-sm font-semibold">Asset Info</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div>
                <dt className="text-fg/70">Created</dt>
                <dd>{new Date(asset.createdAt).toLocaleDateString()}</dd>
              </div>
              <div>
                <dt className="text-fg/70">Last Updated</dt>
                <dd>{new Date(asset.updatedAt).toLocaleDateString()}</dd>
              </div>
              <div>
                <dt className="text-fg/70">ID</dt>
                <dd className="font-mono text-xs">{asset.id}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </main>
  );
}
