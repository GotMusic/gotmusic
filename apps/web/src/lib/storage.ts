/**
 * Storage utilities for public CDN URLs
 *
 * Provides helpers to convert storage keys into publicly accessible URLs.
 * Supports multiple storage backends (R2, S3, stub) and custom CDN domains.
 *
 * Environment Variables:
 * - STORAGE_PUBLIC_BASE: Base URL for public CDN (e.g., https://cdn.gotmusic.app)
 * - STORAGE_DRIVER: "r2" | "s3" | "stub" (default: "stub")
 * - R2_PUBLIC_DOMAIN: Custom R2 public domain (if using R2 with custom domain)
 * - AWS_CLOUDFRONT_DOMAIN: CloudFront distribution domain (if using S3 with CloudFront)
 */

/**
 * Get the public URL for a storage key
 *
 * @param storageKey - The storage key (e.g., "assets/12345-abc-file.mp3")
 * @returns Public URL to access the file
 *
 * @example
 * // With custom CDN
 * getPublicStorageUrl("assets/12345-abc-song.mp3")
 * // => "https://cdn.gotmusic.app/assets/12345-abc-song.mp3"
 *
 * @example
 * // Stub mode (development)
 * getPublicStorageUrl("stub/test.mp3")
 * // => "https://httpbin.org/base64/..."
 *
 * @example
 * // R2 with custom domain
 * getPublicStorageUrl("assets/file.mp3")
 * // => "https://pub-abc123.r2.dev/assets/file.mp3"
 */
export function getPublicStorageUrl(storageKey: string): string {
  // Priority 1: Use STORAGE_PUBLIC_BASE if configured (custom CDN)
  const publicBase = process.env.STORAGE_PUBLIC_BASE || process.env.NEXT_PUBLIC_STORAGE_PUBLIC_BASE;
  if (publicBase) {
    // Ensure no double slashes
    const base = publicBase.endsWith("/") ? publicBase.slice(0, -1) : publicBase;
    const key = storageKey.startsWith("/") ? storageKey.slice(1) : storageKey;
    return `${base}/${key}`;
  }

  // Determine storage driver
  const driver =
    process.env.GM_STORAGE_MODE === "stub"
      ? "stub"
      : process.env.STORAGE_DRIVER || process.env.NEXT_PUBLIC_STORAGE_DRIVER || "stub";

  // Handle different storage backends
  switch (driver) {
    case "r2": {
      // R2 public URL
      // Option 1: Custom R2 public domain
      const r2Domain = process.env.R2_PUBLIC_DOMAIN || process.env.NEXT_PUBLIC_R2_PUBLIC_DOMAIN;
      if (r2Domain) {
        const base = r2Domain.endsWith("/") ? r2Domain.slice(0, -1) : r2Domain;
        const key = storageKey.startsWith("/") ? storageKey.slice(1) : storageKey;
        return `${base}/${key}`;
      }

      // Option 2: R2.dev public bucket (if configured)
      const bucket = process.env.STORAGE_BUCKET || process.env.NEXT_PUBLIC_STORAGE_BUCKET;
      const account = process.env.R2_ACCOUNT_ID || process.env.NEXT_PUBLIC_R2_ACCOUNT_ID;
      if (bucket && account) {
        // Format: https://{bucket}.{account}.r2.cloudflarestorage.com/{key}
        // Note: This requires public bucket configuration in R2 dashboard
        const key = storageKey.startsWith("/") ? storageKey.slice(1) : storageKey;
        return `https://${bucket}.${account}.r2.cloudflarestorage.com/${key}`;
      }

      // Fallback to stub if R2 not fully configured
      console.warn(
        "[storage] R2 public URL not configured. Set STORAGE_PUBLIC_BASE, R2_PUBLIC_DOMAIN, or configure public bucket.",
      );
      return getStubUrl(storageKey);
    }

    case "s3": {
      // S3 public URL
      // Option 1: CloudFront distribution
      const cloudfrontDomain =
        process.env.AWS_CLOUDFRONT_DOMAIN || process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_DOMAIN;
      if (cloudfrontDomain) {
        const base = cloudfrontDomain.endsWith("/")
          ? cloudfrontDomain.slice(0, -1)
          : cloudfrontDomain;
        const key = storageKey.startsWith("/") ? storageKey.slice(1) : storageKey;
        return `${base}/${key}`;
      }

      // Option 2: Direct S3 public bucket URL
      const bucket = process.env.STORAGE_BUCKET || process.env.NEXT_PUBLIC_STORAGE_BUCKET;
      const region = process.env.AWS_REGION || process.env.NEXT_PUBLIC_AWS_REGION || "us-east-1";
      if (bucket) {
        // Format: https://{bucket}.s3.{region}.amazonaws.com/{key}
        // Note: This requires public bucket policy in S3
        const key = storageKey.startsWith("/") ? storageKey.slice(1) : storageKey;
        return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
      }

      // Fallback to stub if S3 not fully configured
      console.warn(
        "[storage] S3 public URL not configured. Set STORAGE_PUBLIC_BASE, AWS_CLOUDFRONT_DOMAIN, or configure public bucket.",
      );
      return getStubUrl(storageKey);
    }
    default:
      return getStubUrl(storageKey);
  }
}

/**
 * Generate a stub URL for development/testing
 * Returns a placeholder URL that won't actually serve content
 */
function getStubUrl(storageKey: string): string {
  // Use httpbin to return a small audio sample
  // In a real app, this would be a proper development CDN
  const encodedKey = encodeURIComponent(storageKey);
  return `https://httpbin.org/base64/data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAA?key=${encodedKey}`;
}

/**
 * Check if a URL is a valid storage URL
 *
 * @param url - URL to check
 * @returns true if URL appears to be a storage URL
 */
export function isStorageUrl(url: string): boolean {
  try {
    const parsed = new URL(url);

    // Check for known storage domains
    const validDomains = [
      "r2.cloudflarestorage.com",
      "r2.dev",
      "s3.amazonaws.com",
      "cloudfront.net",
      "httpbin.org", // stub mode
    ];

    // Check if hostname ends with any valid domain
    return validDomains.some((domain) => parsed.hostname.endsWith(domain));
  } catch {
    return false;
  }
}

/**
 * Extract storage key from a full URL
 *
 * @param url - Full storage URL
 * @returns Storage key, or null if URL is invalid
 *
 * @example
 * extractStorageKey("https://cdn.gotmusic.app/assets/file.mp3")
 * // => "assets/file.mp3"
 */
export function extractStorageKey(url: string): string | null {
  try {
    const parsed = new URL(url);
    // Remove leading slash from pathname
    return parsed.pathname.startsWith("/") ? parsed.pathname.slice(1) : parsed.pathname;
  } catch {
    return null;
  }
}
