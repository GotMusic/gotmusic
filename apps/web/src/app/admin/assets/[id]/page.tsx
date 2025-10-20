import { Suspense } from "react";
import { AssetFormIsland } from "./AssetFormIsland";
import { AssetActionsIsland } from "./AssetActionsIsland";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <main className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold" data-testid="asset-detail-heading">
          Asset #{id}
        </h1>
        <p className="text-fg/70" data-testid="asset-detail-subtitle">
          Manage asset details and settings
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Suspense fallback={<FormSkeleton />}>
            <div className="rounded-md border border-fg/10 bg-bg p-6" data-testid="asset-edit-form">
              <AssetFormIsland assetId={id} />
            </div>
          </Suspense>
        </div>
        <div className="space-y-6">
          <Suspense fallback={<ActionsSkeleton />}>
            <div className="rounded-md border border-fg/10 bg-bg p-4" data-testid="asset-actions">
              <AssetActionsIsland assetId={id} />
            </div>
          </Suspense>
        </div>
      </div>
    </main>
  );
}

function FormSkeleton() {
  return <div className="h-40 animate-pulse bg-fg/5 rounded" />;
}
function ActionsSkeleton() {
  return <div className="h-20 animate-pulse bg-fg/5 rounded" />;
}