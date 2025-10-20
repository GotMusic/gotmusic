"use client";

import { Button, Card } from "@gotmusic/ui";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

type Asset = {
  id: string;
  title: string;
  status: "draft" | "published" | "archived";
  createdAt: string;
  duration?: number;
  fileSize?: number;
};

const qk = (producerId: string) => ["assets", producerId, { limit: 20, offset: 0 }];

export function AssetsPanel() {
  const producerId = "mock-producer-123"; // TODO: from wallet/session
  const { data } = useQuery({
    queryKey: qk(producerId),
    queryFn: async () => {
      const res = await fetch(`/api/studio/assets?producerId=${producerId}&limit=20&offset=0`, {
        headers: { "x-e2e-auth": "bypass" },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      return (json.assets ?? []) as Asset[];
    },
    // instant paint, then reconcile:
    placeholderData: (prev) => prev ?? [],
    staleTime: 10_000,
    gcTime: 5 * 60_000,
  });

  if (!data?.length) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">📦</div>
        <h3 className="text-lg font-medium text-fg/60 mb-2">No assets yet</h3>
        <p className="text-fg/40 mb-4">Upload your first track to get started</p>
        <Button asChild>
          <Link href="/studio/uploads">Upload Track</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {data.map((asset) => (
        <Card key={asset.id} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-fg">{asset.title}</h3>
              <div className="mt-2 flex items-center gap-4 text-sm text-fg/60">
                <span>Created: {new Date(asset.createdAt).toLocaleDateString()}</span>
                {/* duration, size helpers… */}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full px-2 py-1 text-xs font-medium bg-gray-50 text-gray-600">
                {asset.status}
              </span>
              <Button asChild variant="secondary" size="sm" data-testid={`asset-edit-${asset.id}`}>
                <Link href={`/admin/assets/${asset.id}`}>Edit</Link>
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
