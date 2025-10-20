import AssetActions from "./AssetActions";
import AssetEditForm from "./AssetEditForm";
import AssetReceipt from "./AssetReceipt";

export const dynamic = "force-dynamic"; // Skip static generation

export default async function AdminAssetDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main id="main-content" className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold" data-testid="asset-detail-heading">
          Asset #{id}
        </h1>
        <p className="text-fg/70" data-testid="asset-detail-subtitle">
          Manage asset details and settings
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content - Asset Edit Form */}
        <div className="lg:col-span-2">
          <div className="rounded-md border border-fg/10 bg-bg p-6" data-testid="asset-edit-form">
            <AssetEditForm assetId={id} />
          </div>
        </div>

        {/* Sidebar - Actions */}
        <div className="space-y-6">
          <div className="rounded-md border border-fg/10 bg-bg p-4" data-testid="asset-actions">
            <h2 className="text-sm font-semibold">Actions</h2>
            <AssetActions assetId={id} status={"ready"} />
          </div>

          {/* License Receipt (mock data for now) */}
          <AssetReceipt assetId={id} />
        </div>
      </div>
    </main>
  );
}
