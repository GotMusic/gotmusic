/**
 * Generate optimized image URL
 */
export function generateImageUrl(
  assetId: string,
  size: number,
  format: "webp" | "jpg" | "png" = "webp",
  baseUrl?: string
): string {
  const base = baseUrl || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return `${base}/api/images/${assetId}/cover_${size}.${format}`;
}

/**
 * Generate srcSet for responsive images
 */
export function generateImageSrcSet(
  assetId: string,
  sizes: number[] = [512, 1024, 3000],
  baseUrl?: string
): string {
  const base = baseUrl || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  
  return sizes
    .map((size) => {
      const webpUrl = `${base}/api/images/${assetId}/cover_${size}.webp`;
      const jpegUrl = `${base}/api/images/${assetId}/cover_${size}.jpg`;
      return `${webpUrl} ${size}w, ${jpegUrl} ${size}w`;
    })
    .join(", ");
}
