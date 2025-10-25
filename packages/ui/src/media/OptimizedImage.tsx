import React from "react";
import Image from "next/image";
import { cn } from "../utils";

export interface OptimizedImageProps {
  assetId: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  baseUrl?: string;
  fallbackSrc?: string;
}

/**
 * Optimized image component with automatic format selection and responsive sizing
 */
export function OptimizedImage({
  assetId,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw",
  quality = 80,
  placeholder = "empty",
  blurDataURL,
  baseUrl,
  fallbackSrc,
}: OptimizedImageProps) {
  const base = baseUrl || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  
  // Generate srcSet with WebP and JPEG fallback
  const srcSet = generateSrcSet(assetId, base);
  
  // Primary source (WebP)
  const src = `${base}/api/images/${assetId}/cover_1024.webp`;
  
  // Fallback source (JPEG)
  const fallback = fallbackSrc || `${base}/api/images/${assetId}/cover_1024.jpg`;

  return (
    <Image
      src={src}
      alt={alt}
      className={cn("object-cover", className)}
      priority={priority}
      sizes={sizes}
      quality={quality}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      srcSet={srcSet}
      onError={(e) => {
        // Fallback to JPEG if WebP fails
        const target = e.target as HTMLImageElement;
        if (target.src !== fallback) {
          target.src = fallback;
        }
      }}
    />
  );
}

/**
 * Generate responsive srcSet for an asset
 */
function generateSrcSet(assetId: string, baseUrl: string): string {
  const sizes = [512, 1024, 3000];
  
  return sizes
    .map((size) => {
      const webpUrl = `${baseUrl}/api/images/${assetId}/cover_${size}.webp`;
      const jpegUrl = `${baseUrl}/api/images/${assetId}/cover_${size}.jpg`;
      return `${webpUrl} ${size}w, ${jpegUrl} ${size}w`;
    })
    .join(", ");
}

/**
 * Predefined size configurations for common use cases
 */
export const IMAGE_SIZES = {
  thumbnail: {
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw",
    srcSet: "512w, 1024w",
  },
  hero: {
    sizes: "(max-width: 1200px) 100vw, 80vw",
    srcSet: "1024w, 3000w",
  },
  card: {
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw",
    srcSet: "512w, 1024w",
  },
} as const;

/**
 * Thumbnail image for catalog grids
 */
export function ThumbnailImage({
  assetId,
  alt,
  className,
  ...props
}: OptimizedImageProps) {
  return (
    <OptimizedImage
      assetId={assetId}
      alt={alt}
      className={cn("w-full h-full", className)}
      sizes={IMAGE_SIZES.thumbnail.sizes}
      {...props}
    />
  );
}

/**
 * Hero image for asset detail pages
 */
export function HeroImage({
  assetId,
  alt,
  className,
  ...props
}: OptimizedImageProps) {
  return (
    <OptimizedImage
      assetId={assetId}
      alt={alt}
      className={cn("w-full h-full", className)}
      sizes={IMAGE_SIZES.hero.sizes}
      priority
      {...props}
    />
  );
}

/**
 * Card image for catalog cards
 */
export function CardImage({
  assetId,
  alt,
  className,
  ...props
}: OptimizedImageProps) {
  return (
    <OptimizedImage
      assetId={assetId}
      alt={alt}
      className={cn("w-full h-full", className)}
      sizes={IMAGE_SIZES.card.sizes}
      {...props}
    />
  );
}
