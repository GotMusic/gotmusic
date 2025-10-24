import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query";
import { completeAssetProcessing, fetchAsset, fetchAssetAudit, fetchAssets, updateAsset, } from "./client";
/**
 * Hook for fetching paginated assets list
 * @param query - Pagination and filter parameters
 * @param options - TanStack Query options
 */
export function useAssets(query = {}, options) {
    return useQuery({
        queryKey: ["assets", query],
        queryFn: () => fetchAssets(query),
        ...options,
    });
}
/**
 * Hook for fetching a single asset by ID
 * @param id - Asset ID
 * @param options - TanStack Query options
 */
export function useAsset(id, options) {
    return useQuery({
        queryKey: ["asset", id],
        queryFn: () => fetchAsset(id),
        enabled: !!id, // Only fetch if ID is provided
        ...options,
    });
}
/**
 * Hook for updating an asset
 * Automatically invalidates related queries on success
 * @param options - TanStack Query mutation options
 */
export function useUpdateAsset(options) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, updates, idempotencyKey }) => updateAsset(id, updates, idempotencyKey),
        onSuccess: (data, variables) => {
            // Invalidate and refetch related queries
            queryClient.invalidateQueries({ queryKey: ["asset", variables.id] });
            queryClient.invalidateQueries({ queryKey: ["assets"] });
        },
        ...options,
    });
}
/**
 * Hook for completing asset processing
 * Automatically invalidates related queries on success
 * @param options - TanStack Query mutation options
 */
export function useCompleteAssetProcessing(options) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ assetId, status, errorMessage }) => completeAssetProcessing(assetId, status, errorMessage),
        onSuccess: (data, variables) => {
            // Invalidate and refetch related queries
            queryClient.invalidateQueries({ queryKey: ["asset", variables.assetId] });
            queryClient.invalidateQueries({ queryKey: ["assets"] });
        },
        ...options,
    });
}
/**
 * Hook for fetching asset audit log
 * @param assetId - Asset ID to get audit log for
 * @param options - TanStack Query options
 */
export function useAssetAudit(assetId, options) {
    return useQuery({
        queryKey: ["asset-audit", assetId],
        queryFn: () => fetchAssetAudit(assetId),
        enabled: !!assetId, // Only fetch if assetId is provided
        ...options,
    });
}
