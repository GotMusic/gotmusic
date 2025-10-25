import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

interface RouteParams {
  params: Promise<{
    assetId: string;
    filename: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
    const { assetId, filename } = await params;

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
 * Serves actual images from the public/media directory
 */
async function getImageData(
  assetId: string,
  filename: string
): Promise<{ buffer: Buffer; hash: string } | null> {
  try {
    const fs = await import('fs');
    const path = await import('path');
    const crypto = await import('crypto');
    
    // Extract size from filename (e.g., cover_1024.webp -> 1024)
    const sizeMatch = filename.match(/cover_(\d+)\.(webp|jpg|jpeg|png)$/);
    if (!sizeMatch) {
      throw new Error('Invalid filename format');
    }
    
    const [, size] = sizeMatch;
    const sizeNum = parseInt(size, 10);
    
    // Map sizes to actual file paths
    let imagePath: string;
    if (sizeNum === 3000) {
      imagePath = path.join(process.cwd(), 'public', 'media', 'covers', `${assetId}-3000.jpg`);
    } else if (sizeNum === 1024) {
      imagePath = path.join(process.cwd(), 'public', 'media', 'heroes', `${assetId}-1024.jpg`);
    } else if (sizeNum === 512) {
      imagePath = path.join(process.cwd(), 'public', 'media', 'thumbnails', `${assetId}-512.jpg`);
    } else {
      throw new Error(`Unsupported size: ${sizeNum}`);
    }
    
    // Check if file exists
    if (!fs.existsSync(imagePath)) {
      console.log(`Image not found: ${imagePath}`);
      return null;
    }
    
    // Read the image file
    const imageBuffer = fs.readFileSync(imagePath);
    
    // Generate hash for caching
    const hash = crypto.createHash('md5').update(imageBuffer).digest('hex');
    
    return {
      buffer: imageBuffer,
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

