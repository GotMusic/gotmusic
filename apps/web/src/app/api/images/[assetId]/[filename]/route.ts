import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

interface RouteParams {
  params: {
    assetId: string;
    filename: string;
  };
}

export async function GET(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    const { assetId, filename } = params;

    // Validate filename format
    const filenamePattern = /^cover_\d+\.(webp|jpg|jpeg|png)$/;
    if (!filenamePattern.test(filename)) {
      return NextResponse.json(
        { error: "Invalid filename format" },
        { status: 400 }
      );
    }

    // Extract size and format from filename
    const match = filename.match(/^cover_(\d+)\.(webp|jpg|jpeg|png)$/);
    if (!match) {
      return NextResponse.json(
        { error: "Invalid filename format" },
        { status: 400 }
      );
    }

    const [, size, format] = match;
    const sizeNum = parseInt(size, 10);

    // Validate size
    const allowedSizes = [512, 1024, 3000];
    if (!allowedSizes.includes(sizeNum)) {
      return NextResponse.json(
        { error: "Invalid image size" },
        { status: 400 }
      );
    }

    // Get image data (mock implementation)
    const imageData = await getImageData(assetId, filename);
    if (!imageData) {
      return NextResponse.json(
        { error: "Image not found" },
        { status: 404 }
      );
    }

    // Set appropriate headers
    const response = new NextResponse(imageData.buffer);
    
    // Content type based on format
    const contentType = getContentType(format);
    response.headers.set("Content-Type", contentType);
    
    // Cache headers for CDN optimization
    response.headers.set("Cache-Control", "public, max-age=31536000, immutable");
    response.headers.set("ETag", `"${assetId}-${filename}-${imageData.hash}"`);
    
    // Content-Length
    response.headers.set("Content-Length", imageData.buffer.length.toString());
    
    // CORS headers
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;

  } catch (error) {
    console.error("Image serving error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Get image data from storage
 * Mock implementation - replace with actual storage provider
 */
async function getImageData(
  assetId: string,
  filename: string
): Promise<{ buffer: Buffer; hash: string } | null> {
  // Mock implementation
  // In production, this would fetch from your storage provider
  
  // For now, return a placeholder or fetch from a real source
  try {
    // This is a mock - in production you'd fetch from your storage
    const mockImageBuffer = Buffer.from("mock-image-data");
    const hash = `${assetId}-${filename}-${Date.now()}`;
    
    return {
      buffer: mockImageBuffer,
      hash,
    };
  } catch (error) {
    console.error("Failed to fetch image:", error);
    return null;
  }
}

/**
 * Get content type for image format
 */
function getContentType(format: string): string {
  switch (format) {
    case "webp":
      return "image/webp";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    default:
      return "application/octet-stream";
  }
}

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
