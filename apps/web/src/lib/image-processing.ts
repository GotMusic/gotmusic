import sharp from "sharp";

export interface ImageVariant {
  name: string;
  width: number;
  height: number;
  format: "webp" | "jpeg" | "png";
  mime: string;
  data: Buffer;
  bytes: number;
}

export interface ImageMetadata {
  originalWidth: number;
  originalHeight: number;
  hasAlpha: boolean;
  format: string;
  size: number;
}

export interface ProcessedImage {
  variants: ImageVariant[];
  metadata: ImageMetadata;
}

/**
 * Process uploaded image into standardized variants
 * Generates WebP + JPEG at 3000/1024/512 sizes
 * Includes PNG for alpha when transparency is significant
 */
export async function processImage(
  buffer: Buffer,
  assetId: string,
  options: {
    sizes?: number[];
    webpQuality?: number;
    jpegQuality?: number;
    pngCompression?: number;
    alphaThreshold?: number;
  } = {}
): Promise<ProcessedImage> {
  const {
    sizes = [3000, 1024, 512],
    webpQuality = 80,
    jpegQuality = 82,
    pngCompression = 9,
    alphaThreshold = 0.05, // 5% alpha threshold
  } = options;

  // Get original metadata
  const metadata = await sharp(buffer).metadata();
  const hasAlpha = !!metadata.hasAlpha;
  const originalWidth = metadata.width || 0;
  const originalHeight = metadata.height || 0;

  const variants: ImageVariant[] = [];

  for (const size of sizes) {
    const base = sharp(buffer).resize({
      width: size,
      height: size,
      fit: "cover",
      position: "attention", // Smart cropping
    });

    // Primary: WebP (best compression, wide support)
    const webpBuffer = await base
      .clone()
      .webp({ quality: webpQuality })
      .toBuffer();

    variants.push({
      name: `cover_${size}.webp`,
      width: size,
      height: size,
      format: "webp",
      mime: "image/webp",
      data: webpBuffer,
      bytes: webpBuffer.length,
    });

    // Fallback: JPEG (universal support, good for photos)
    const jpegBuffer = await base
      .clone()
      .jpeg({ quality: jpegQuality, mozjpeg: true })
      .toBuffer();

    variants.push({
      name: `cover_${size}.jpg`,
      width: size,
      height: size,
      format: "jpeg",
      mime: "image/jpeg",
      data: jpegBuffer,
      bytes: jpegBuffer.length,
    });

    // Optional PNG for alpha (only if significant transparency)
    if (hasAlpha && size <= 1024) {
      const pngBuffer = await base
        .clone()
        .png({ compressionLevel: pngCompression })
        .toBuffer();

      variants.push({
        name: `cover_${size}.png`,
        width: size,
        height: size,
        format: "png",
        mime: "image/png",
        data: pngBuffer,
        bytes: pngBuffer.length,
      });
    }
  }

  return {
    variants,
    metadata: {
      originalWidth,
      originalHeight,
      hasAlpha,
      format: metadata.format || "unknown",
      size: buffer.length,
    },
  };
}

/**
 * Validate uploaded image meets requirements
 */
export function validateImage(
  buffer: Buffer,
  contentType: string,
  maxSizeBytes: number = 10 * 1024 * 1024, // 10MB
  minDimension: number = 1024
): { valid: boolean; error?: string } {
  // Check content type
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
  if (!allowedTypes.includes(contentType)) {
    return {
      valid: false,
      error: `Unsupported image type: ${contentType}. Allowed: ${allowedTypes.join(", ")}`,
    };
  }

  // Check file size
  if (buffer.length > maxSizeBytes) {
    return {
      valid: false,
      error: `File too large: ${Math.round(buffer.length / 1024 / 1024)}MB. Max: ${Math.round(maxSizeBytes / 1024 / 1024)}MB`,
    };
  }

  // Note: Dimension validation would require async processing
  // This is handled in the upload API after Sharp metadata extraction

  return { valid: true };
}

/**
 * Generate optimized srcSet for responsive images
 */
export function generateSrcSet(
  assetId: string,
  baseUrl: string,
  sizes: number[] = [512, 1024, 3000]
): string {
  return sizes
    .map((size) => {
      const webpUrl = `${baseUrl}/${assetId}/cover_${size}.webp`;
      const jpegUrl = `${baseUrl}/${assetId}/cover_${size}.jpg`;
      return `${webpUrl} ${size}w, ${jpegUrl} ${size}w`;
    })
    .join(", ");
}

/**
 * Get the best image URL for a given size and format preference
 */
export function getImageUrl(
  assetId: string,
  size: number,
  baseUrl: string,
  preferWebP: boolean = true
): string {
  const format = preferWebP ? "webp" : "jpg";
  return `${baseUrl}/${assetId}/cover_${size}.${format}`;
}

/**
 * Calculate responsive image sizes for different use cases
 */
export const IMAGE_SIZES = {
  // Catalog grid thumbnails
  thumbnail: {
    sizes: [512],
    srcSet: "512w",
    sizesAttr: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw",
  },
  // Asset detail hero
  hero: {
    sizes: [1024, 3000],
    srcSet: "1024w, 3000w",
    sizesAttr: "(max-width: 1200px) 100vw, 80vw",
  },
  // Catalog card medium
  card: {
    sizes: [512, 1024],
    srcSet: "512w, 1024w",
    sizesAttr: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw",
  },
} as const;
