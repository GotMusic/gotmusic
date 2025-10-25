/**
 * Custom image loader for Next.js Image component
 * Handles optimized image serving with WebP/JPEG fallback
 */

export default function imageLoader({ src, width, quality }) {
  // Extract assetId and filename from src
  // Expected format: /api/images/{assetId}/cover_{size}.{format}
  const match = src.match(/\/api\/images\/([^\/]+)\/cover_(\d+)\.(webp|jpg|jpeg|png)$/);
  
  if (!match) {
    // Fallback for non-optimized images
    return src;
  }

  const [, assetId, size, format] = match;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  // Determine the best size for the requested width
  const targetSize = getOptimalSize(width);
  
  // Prefer WebP for modern browsers, fallback to JPEG
  const preferredFormat = 'webp';
  
  return `${baseUrl}/api/images/${assetId}/cover_${targetSize}.${preferredFormat}`;
}

/**
 * Get optimal image size based on requested width
 */
function getOptimalSize(requestedWidth) {
  const sizes = [512, 1024, 3000];
  
  // Find the smallest size that's >= requested width
  const optimalSize = sizes.find(size => size >= requestedWidth);
  
  // If no size is large enough, use the largest
  return optimalSize || Math.max(...sizes);
}

/**
 * Generate srcSet for responsive images
 */
export function generateImageSrcSet(assetId, baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000') {
  const sizes = [512, 1024, 3000];
  
  return sizes
    .map(size => {
      const webpUrl = `${baseUrl}/api/images/${assetId}/cover_${size}.webp`;
      const jpegUrl = `${baseUrl}/api/images/${assetId}/cover_${size}.jpg`;
      return `${webpUrl} ${size}w, ${jpegUrl} ${size}w`;
    })
    .join(', ');
}

/**
 * Get image URL for specific size and format
 */
export function getImageUrl(assetId, size, format = 'webp', baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000') {
  return `${baseUrl}/api/images/${assetId}/cover_${size}.${format}`;
}
