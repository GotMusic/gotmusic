import { type UseQueryOptions, type UseQueryResult, useQuery } from "@tanstack/react-query";
import { fetchAsset, fetchAssets } from "./client";
import type { Asset, AssetsQuery, AssetsResponse } from "./types";

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
