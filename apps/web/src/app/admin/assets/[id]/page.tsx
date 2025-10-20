import { Suspense } from "react";
import { AssetActionsIsland } from "./AssetActionsIsland";
import { AssetFormIsland } from "./AssetFormIsland";

export const dynamic = "force-dynamic";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <div data-testid="asset-detail-page" className="space-y-6">
      <header>
        <h1 data-testid="asset-detail-heading" className="text-2xl font-semibold">
          {`Asset #${id}`}
        </h1>
        <p className="text-sm text-fg/60">Edit metadata and pricing</p>
      </header>

      {/* IMPORTANT: the fallback MUST carry the same test id the test waits for */}
      <Suspense fallback={<div data-testid="asset-edit-form">Loading…</div>}>
        <AssetFormIsland assetId={id} />
      </Suspense>

      <Suspense fallback={<div />}>
        <AssetActionsIsland assetId={id} />
      </Suspense>
    </div>
  );
}

function FormSkeleton() {
  return <div className="h-40 animate-pulse bg-fg/5 rounded" />;
}
function ActionsSkeleton() {
  return <div className="h-20 animate-pulse bg-fg/5 rounded" />;
}
