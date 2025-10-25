import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { validateImage } from "@/lib/image-processing";

// Upload request validation schema
const UploadSignSchema = z.object({
  contentType: z.string().min(1),
  fileName: z.string().min(1),
  fileSize: z.number().positive(),
  width: z.number().positive().optional(),
  height: z.number().positive().optional(),
  assetId: z.string().min(1),
});

// Allowed image types and size limits
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png", 
  "image/webp",
  "image/avif",
] as const;

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MIN_DIMENSION = 1024; // 1024x1024 minimum

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = UploadSignSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid request", details: validation.error.errors },
        { status: 400 }
      );
    }

    const { contentType, fileName, fileSize, width, height, assetId } = validation.data;

    // Validate content type
    if (!ALLOWED_IMAGE_TYPES.includes(contentType as any)) {
      return NextResponse.json(
        {
          error: "Unsupported image type",
          allowed: ALLOWED_IMAGE_TYPES,
        },
        { status: 400 }
      );
    }

    // Validate file size
    if (fileSize > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: "File too large",
          maxSize: MAX_FILE_SIZE,
          received: fileSize,
        },
        { status: 400 }
      );
    }

    // Validate dimensions (if provided)
    if (width && height) {
      if (width < MIN_DIMENSION || height < MIN_DIMENSION) {
        return NextResponse.json(
          {
            error: "Image too small",
            minDimension: MIN_DIMENSION,
            received: { width, height },
          },
          { status: 400 }
        );
      }
    }

    // Generate signed upload URL (mock implementation)
    // In production, this would integrate with your storage provider
    const uploadUrl = generateSignedUploadUrl(assetId, fileName);
    
    // Generate processing webhook URL
    const webhookUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/upload/process`;

    return NextResponse.json({
      uploadUrl,
      webhookUrl,
      maxFileSize: MAX_FILE_SIZE,
      allowedTypes: ALLOWED_IMAGE_TYPES,
      processingOptions: {
        sizes: [3000, 1024, 512],
        formats: ["webp", "jpeg", "png"],
        quality: {
          webp: 80,
          jpeg: 82,
          png: 9,
        },
      },
    });

  } catch (error) {
    console.error("Upload sign error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Generate signed upload URL for storage provider
 * This is a mock implementation - replace with your storage provider
 */
function generateSignedUploadUrl(assetId: string, fileName: string): string {
  // Mock implementation - replace with actual storage provider
  const timestamp = Date.now();
  const token = Buffer.from(`${assetId}-${timestamp}`).toString('base64');
  
  return `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/upload/upload?token=${token}&assetId=${assetId}&fileName=${fileName}`;
}
