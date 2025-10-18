"use client";

import { Button, Card } from "@gotmusic/ui";
import { useEffect, useState } from "react";

interface Asset {
  id: string;
  title: string;
  status: "draft" | "published" | "archived";
  createdAt: string;
  duration?: number;
  fileSize?: number;
}

export default function StudioAssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      setLoading(true);
      // TODO: Get actual producer ID from wallet connection
      const producerId = "mock-producer-123";
      const response = await fetch(`/api/studio/assets?producerId=${producerId}&limit=20&offset=0`);

      if (!response.ok) {
        throw new Error(`Failed to fetch assets: ${response.status}`);
      }

      const data = await response.json();
      setAssets(data.assets || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load assets");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "text-green-600 bg-green-50";
      case "draft":
        return "text-yellow-600 bg-yellow-50";
      case "archived":
        return "text-gray-600 bg-gray-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "Unknown";
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return "Unknown";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <section data-testid="studio-assets-page" className="space-y-4">
        <h1 className="text-2xl font-semibold">My Assets</h1>
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={`skeleton-${Date.now()}-${i}`} className="animate-pulse">
              <div className="h-24 bg-fg/5 rounded-md" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section data-testid="studio-assets-page" className="space-y-4">
        <h1 className="text-2xl font-semibold">My Assets</h1>
        <div className="rounded-md bg-red-50 p-4 text-red-700">
          <p className="font-medium">Error loading assets</p>
          <p className="text-sm">{error}</p>
          <button
            type="button"
            onClick={fetchAssets}
            className="mt-2 rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section data-testid="studio-assets-page" className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">My Assets</h1>
        <Button asChild>
          <a href="/studio/uploads">Upload New</a>
        </Button>
      </div>

      {assets.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📦</div>
          <h3 className="text-lg font-medium text-fg/60 mb-2">No assets yet</h3>
          <p className="text-fg/40 mb-4">Upload your first track to get started</p>
          <Button asChild>
            <a href="/studio/uploads">Upload Track</a>
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {assets.map((asset) => (
            <Card key={asset.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-fg">{asset.title}</h3>
                  <div className="mt-2 flex items-center gap-4 text-sm text-fg/60">
                    <span>Created: {new Date(asset.createdAt).toLocaleDateString()}</span>
                    {asset.duration && <span>Duration: {formatDuration(asset.duration)}</span>}
                    {asset.fileSize && <span>Size: {formatFileSize(asset.fileSize)}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(asset.status)}`}
                  >
                    {asset.status}
                  </span>
                  <Button variant="secondary" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
