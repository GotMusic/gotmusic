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

  return response.json();
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

  return response.json();
}
