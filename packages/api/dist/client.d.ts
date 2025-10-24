import type { AssetsQuery, AssetsResponse, UpdateAssetInput } from "./types";
/**
 * Fetch assets list with pagination and filtering
 */
export declare function fetchAssets(query?: AssetsQuery): Promise<AssetsResponse>;
/**
 * Fetch a single asset by ID
 */
export declare function fetchAsset(id: string): Promise<{
    id: string;
    title: string;
    artist: string;
    bpm: number | null;
    keySig: string | null;
    priceAmount: number;
    priceCurrency: string;
    status: "error" | "draft" | "published" | "archived" | "processing" | "ready";
    updatedAt: number;
    createdAt: number;
}>;
/**
 * Fetch download URL for an asset (signed URL)
 */
export declare function fetchAssetDownloadUrl(id: string): Promise<{
    url: string;
    ttlSeconds: number;
}>;
/**
 * Update asset fields
 * @param id - Asset ID to update
 * @param updates - Partial asset fields to update
 * @param idempotencyKey - Idempotency key for safe retries
 */
export declare function updateAsset(id: string, updates: UpdateAssetInput, idempotencyKey: string): Promise<{
    id: string;
    title: string;
    artist: string;
    bpm: number | null;
    keySig: string | null;
    priceAmount: number;
    priceCurrency: string;
    status: "error" | "draft" | "published" | "archived" | "processing" | "ready";
    updatedAt: number;
    createdAt: number;
}>;
/**
 * Mark asset as ready or error after processing
 * @param assetId - Asset ID to mark as complete
 * @param status - Status to set ("ready" or "error")
 * @param errorMessage - Optional error message if status is "error"
 */
export declare function completeAssetProcessing(assetId: string, status?: "ready" | "error", errorMessage?: string): Promise<{
    ok: boolean;
    assetId: string;
    status: string;
    message: string;
}>;
/**
 * Fetch audit log for an asset
 * @param assetId - Asset ID to get audit log for
 */
export declare function fetchAssetAudit(assetId: string): Promise<{
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
}>;
