import { AssetSchema, AssetsResponseSchema } from "./schemas";
import type { AssetsQuery, AssetsResponse, UpdateAssetInput } from "./types";

// Prefer explicit API base URL when provided via env, otherwise default to same-origin requests.
const explicitApiBase =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.INTERNAL_API_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");

const API_BASE = explicitApiBase.endsWith("/") ? explicitApiBase.slice(0, -1) : explicitApiBase;

// Use relative URL if API_BASE is empty (same domain)
const getApiUrl = (path: string) => {
  if (API_BASE) {
    return `${API_BASE}${path}`;
  }
  return path; // Relative URL
};

/**
 * Fetch assets list with pagination and filtering
 */
export async function fetchAssets(query: AssetsQuery = {}): Promise<AssetsResponse> {
  const params = new URLSearchParams();

  if (query.limit) params.set("limit", query.limit.toString());
  if (query.cursor) params.set("cursor", query.cursor);
  if (query.status) params.set("status", query.status);
  if (query.q) params.set("q", query.q);

  const url = getApiUrl(`/api/assets/?${params.toString()}`);

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
  const url = getApiUrl(`/api/assets/${id}`);

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

/**
 * Update asset fields
 * @param id - Asset ID to update
 * @param updates - Partial asset fields to update
 * @param idempotencyKey - Idempotency key for safe retries
 */
export async function updateAsset(id: string, updates: UpdateAssetInput, idempotencyKey: string) {
  const url = `${API_BASE}/api/assets/${id}`;

  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Asset not found: ${id}`);
    }
    if (response.status === 422) {
      const errorData = await response.json();
      throw new Error(`Validation failed: ${JSON.stringify(errorData.details || errorData.error)}`);
    }
    throw new Error(`Failed to update asset: ${response.statusText}`);
  }

  const data: unknown = await response.json();

  // Validate response with Zod
  return AssetSchema.parse(data);
}

/**
 * Mark asset as ready or error after processing
 * @param assetId - Asset ID to mark as complete
 * @param status - Status to set ("ready" or "error")
 * @param errorMessage - Optional error message if status is "error"
 */
export async function completeAssetProcessing(
  assetId: string,
  status: "ready" | "error" = "ready",
  errorMessage?: string,
): Promise<{ ok: boolean; assetId: string; status: string; message: string }> {
  const url = `${API_BASE}/api/upload/complete`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ assetId, status, errorMessage }),
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Asset not found: ${assetId}`);
    }
    throw new Error(`Failed to complete asset processing: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch audit log for an asset
 * @param assetId - Asset ID to get audit log for
 */
export async function fetchAssetAudit(assetId: string): Promise<{
  assetId: string;
  auditLogs: Array<{
    id: string;
    assetId: string;
    operation: string;
    userId: string | null;
    before: Record<string, unknown> | null;
    after: Record<string, unknown> | null;
    changedFields: string[];
    createdAt: number;
  }>;
  total: number;
}> {
  const url = `${API_BASE}/api/assets/${assetId}/audit`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Asset not found: ${assetId}`);
    }
    throw new Error(`Failed to fetch audit log: ${response.statusText}`);
  }

  return response.json();
}
