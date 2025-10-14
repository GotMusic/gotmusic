import {
  type UseMutationOptions,
  type UseMutationResult,
  type UseQueryOptions,
  type UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  completeAssetProcessing,
  fetchAsset,
  fetchAssetAudit,
  fetchAssets,
  updateAsset,
} from "./client";
import type { Asset, AssetsQuery, AssetsResponse, UpdateAssetInput } from "./types";

/**
 * Hook for fetching paginated assets list
 * @param query - Pagination and filter parameters
 * @param options - TanStack Query options
 */
export function useAssets(
  query: AssetsQuery = {},
  options?: Omit<UseQueryOptions<AssetsResponse, Error>, "queryKey" | "queryFn">,
): UseQueryResult<AssetsResponse, Error> {
  return useQuery({
    queryKey: ["assets", query] as const,
    queryFn: () => fetchAssets(query),
    ...options,
  });
}

/**
 * Hook for fetching a single asset by ID
 * @param id - Asset ID
 * @param options - TanStack Query options
 */
export function useAsset(
  id: string,
  options?: Omit<UseQueryOptions<Asset, Error>, "queryKey" | "queryFn">,
): UseQueryResult<Asset, Error> {
  return useQuery({
    queryKey: ["asset", id] as const,
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
export function useUpdateAsset(
  options?: Omit<
    UseMutationOptions<
      Asset,
      Error,
      { id: string; updates: UpdateAssetInput; idempotencyKey: string }
    >,
    "mutationFn"
  >,
): UseMutationResult<
  Asset,
  Error,
  { id: string; updates: UpdateAssetInput; idempotencyKey: string }
> {
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
export function useCompleteAssetProcessing(
  options?: Omit<
    UseMutationOptions<
      { ok: boolean; assetId: string; status: string; message: string },
      Error,
      { assetId: string; status?: "ready" | "error"; errorMessage?: string }
    >,
    "mutationFn"
  >,
): UseMutationResult<
  { ok: boolean; assetId: string; status: string; message: string },
  Error,
  { assetId: string; status?: "ready" | "error"; errorMessage?: string }
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ assetId, status, errorMessage }) =>
      completeAssetProcessing(assetId, status, errorMessage),
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
export function useAssetAudit(
  assetId: string,
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof fetchAssetAudit>>, Error>,
    "queryKey" | "queryFn"
  >,
): UseQueryResult<Awaited<ReturnType<typeof fetchAssetAudit>>, Error> {
  return useQuery({
    queryKey: ["asset-audit", assetId],
    queryFn: () => fetchAssetAudit(assetId),
    enabled: !!assetId, // Only fetch if assetId is provided
    ...options,
  });
}
