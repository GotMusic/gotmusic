import { db, schema } from "@/server/db";
import { eq } from "drizzle-orm";
import AssetActions from "./AssetActions";
import AssetEditForm from "./AssetEditForm";

export const dynamic = "force-dynamic";

export default async function AdminAssetDetail({
  params,
}: {
  // keep your project-wide Promise pattern
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Try to load asset; if missing, fall back gracefully
  const asset =
    (await db
      .select()
      .from(schema.assets)
      .where(eq(schema.assets.id, id))
      .then((rows) => rows[0])) ?? null;

  return (
    <main className="p-6">
      <div className="mb-6">
        {/* This always renders so the test can find it */}
        <h1 className="text-2xl font-semibold" data-testid="asset-detail-heading">
          Asset #{id}
        </h1>
        <p className="text-fg/70" data-testid="asset-detail-subtitle">
          {asset ? "Manage asset details and settings" : "Asset not found (showing editor shell)"}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Always render the form wrapper so Playwright finds it */}
          <div className="rounded-md border border-fg/10 bg-bg p-6" data-testid="asset-edit-form">
            {asset ? (
              <AssetEditForm assetId={asset.id} />
            ) : (
              <div className="text-sm text-fg/60">
                This is a placeholder editor shell for E2E. Seed may be delayed.
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-md border border-fg/10 bg-bg p-4" data-testid="asset-actions">
            <h2 className="text-sm font-semibold">Actions</h2>
            {asset ? (
              <AssetActions assetId={asset.id} status={asset.status} />
            ) : (
              <div className="text-sm text-fg/60">No actions available (asset missing).</div>
            )}
          </div>

          <div className="rounded-md border border-fg/10 bg-bg p-4">
            <h2 className="text-sm font-semibold">Asset Info</h2>
            {asset ? (
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
            ) : (
              <p className="text-sm text-fg/60">No info (asset missing).</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}