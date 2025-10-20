"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@gotmusic/ui";

export function AssetActionsIsland({ assetId }: { assetId: string }) {
  const { data: asset } = useQuery({
    queryKey: ["asset", assetId],
    queryFn: async () => {
      const r = await fetch(`/api/assets/${assetId}`, { headers: { "x-e2e-auth": "bypass" } });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return r.json();
    },
    staleTime: 10_000,
  });

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold">Actions</h2>
      
      <div className="space-y-2">
        <Button
          variant="secondary"
          size="sm"
          className="w-full"
          onClick={() => {
            // TODO: Implement publish logic
            console.log("Publishing asset", assetId);
          }}
        >
          {asset.status === "published" ? "Unpublish" : "Publish"}
        </Button>
        
        <Button
          variant="secondary"
          size="sm"
          className="w-full"
          onClick={() => {
            // TODO: Implement archive logic
            console.log("Archiving asset", assetId);
          }}
        >
          Archive
        </Button>
        
        <Button
          variant="secondary"
          size="sm"
          className="w-full text-red-600 hover:text-red-700"
          onClick={() => {
            // TODO: Implement delete logic with confirmation
            console.log("Deleting asset", assetId);
          }}
        >
          Delete
        </Button>
      </div>

      <div className="pt-3 border-t border-fg/10">
        <h3 className="text-xs font-medium text-fg/60 mb-2">Asset Info</h3>
        <dl className="space-y-1 text-xs">
          <div className="flex justify-between">
            <dt className="text-fg/60">Status</dt>
            <dd className="font-medium">{asset.status}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-fg/60">Created</dt>
            <dd>{new Date(asset.createdAt).toLocaleDateString()}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-fg/60">Updated</dt>
            <dd>{new Date(asset.updatedAt).toLocaleDateString()}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-fg/60">ID</dt>
            <dd className="font-mono">{asset.id}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
