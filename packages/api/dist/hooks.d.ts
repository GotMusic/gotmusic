import { type UseMutationOptions, type UseMutationResult, type UseQueryOptions, type UseQueryResult } from "@tanstack/react-query";
import { fetchAssetAudit } from "./client";
import type { Asset, AssetsQuery, AssetsResponse, UpdateAssetInput } from "./types";
/**
 * Hook for fetching paginated assets list
 * @param query - Pagination and filter parameters
 * @param options - TanStack Query options
 */
export declare function useAssets(query?: AssetsQuery, options?: Omit<UseQueryOptions<AssetsResponse, Error>, "queryKey" | "queryFn">): UseQueryResult<AssetsResponse, Error>;
/**
 * Hook for fetching a single asset by ID
 * @param id - Asset ID
 * @param options - TanStack Query options
 */
export declare function useAsset(id: string, options?: Omit<UseQueryOptions<Asset, Error>, "queryKey" | "queryFn">): UseQueryResult<Asset, Error>;
/**
 * Hook for updating an asset
 * Automatically invalidates related queries on success
 * @param options - TanStack Query mutation options
 */
export declare function useUpdateAsset(options?: Omit<UseMutationOptions<Asset, Error, {
    id: string;
    updates: UpdateAssetInput;
    idempotencyKey: string;
}>, "mutationFn">): UseMutationResult<Asset, Error, {
    id: string;
    updates: UpdateAssetInput;
    idempotencyKey: string;
}>;
/**
 * Hook for completing asset processing
 * Automatically invalidates related queries on success
 * @param options - TanStack Query mutation options
 */
export declare function useCompleteAssetProcessing(options?: Omit<UseMutationOptions<{
    ok: boolean;
    assetId: string;
    status: string;
    message: string;
}, Error, {
    assetId: string;
    status?: "ready" | "error";
    errorMessage?: string;
}>, "mutationFn">): UseMutationResult<{
    ok: boolean;
    assetId: string;
    status: string;
    message: string;
}, Error, {
    assetId: string;
    status?: "ready" | "error";
    errorMessage?: string;
}>;
/**
 * Hook for fetching asset audit log
 * @param assetId - Asset ID to get audit log for
 * @param options - TanStack Query options
 */
export declare function useAssetAudit(assetId: string, options?: Omit<UseQueryOptions<Awaited<ReturnType<typeof fetchAssetAudit>>, Error>, "queryKey" | "queryFn">): UseQueryResult<Awaited<ReturnType<typeof fetchAssetAudit>>, Error>;
