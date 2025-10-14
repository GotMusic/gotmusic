import {
  type UseMutationOptions,
  type UseMutationResult,
  type UseQueryOptions,
  type UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { fetchAsset, fetchAssets, updateAsset } from "./client";
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
