import { AssetSchema, AssetsResponseSchema } from "./schemas";
import type { AssetsQuery, AssetsResponse } from "./types";

const API_BASE =
  typeof window !== "undefined"
    ? "" // Client-side: use relative URLs
    : (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000");

/**
 * Fetch assets list with pagination and filtering
 */
export async function fetchAssets(query: AssetsQuery = {}): Promise<AssetsResponse> {
  const params = new URLSearchParams();

  if (query.limit) params.set("limit", query.limit.toString());
  if (query.cursor) params.set("cursor", query.cursor);
  if (query.status) params.set("status", query.status);
  if (query.q) params.set("q", query.q);

  const url = `${API_BASE}/api/assets?${params.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch assets: ${response.statusText}`);
  }

  const data: unknown = await response.json();

  // Validate response with Zod
  return AssetsResponseSchema.parse(data);
}

/**
 * Fetch a single asset by ID
 */
export async function fetchAsset(id: string) {
  const url = `${API_BASE}/api/assets/${id}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Asset not found: ${id}`);
    }
    throw new Error(`Failed to fetch asset: ${response.statusText}`);
  }

  const data: unknown = await response.json();

  // Validate response with Zod
  return AssetSchema.parse(data);
}

/**
 * Fetch download URL for an asset (signed URL)
 */
export async function fetchAssetDownloadUrl(
  id: string,
): Promise<{ url: string; ttlSeconds: number }> {
  const url = `${API_BASE}/api/assets/${id}/download`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Asset not found: ${id}`);
    }
    throw new Error(`Failed to fetch download URL: ${response.statusText}`);
  }

  const data = await response.json();
  return data as { url: string; ttlSeconds: number };
}
