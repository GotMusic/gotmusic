import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { processImage } from "@/lib/image-processing";

// Processing webhook schema
const ProcessWebhookSchema = z.object({
  assetId: z.string().min(1),
  originalUrl: z.string().url(),
  originalMime: z.string(),
  originalWidth: z.number().positive(),
  originalHeight: z.number().positive(),
  fileSize: z.number().positive(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = ProcessWebhookSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid webhook payload", details: validation.error.issues },
        { status: 400 }
      );
    }

    const { assetId, originalUrl, originalMime, originalWidth, originalHeight, fileSize } = validation.data;

    // Fetch the original image
    const response = await fetch(originalUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch original image: ${response.statusText}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());

    // Process the image into variants
    const processed = await processImage(buffer, assetId, {
      sizes: [3000, 1024, 512],
      webpQuality: 80,
      jpegQuality: 82,
      pngCompression: 9,
      alphaThreshold: 0.05,
    });

    // Store variants (mock implementation)
    const storedVariants = await storeImageVariants(assetId, processed.variants);

    // Update database with image metadata
    await updateAssetImageMetadata(assetId, {
      originalUrl,
      originalMime,
      originalWidth,
      originalHeight,
      fileSize,
      hasAlpha: processed.metadata.hasAlpha,
      variants: storedVariants,
    });

    return NextResponse.json({
      success: true,
      assetId,
      variants: storedVariants.length,
      processingTime: Date.now(), // Mock processing time
    });

  } catch (error) {
    console.error("Image processing error:", error);
    return NextResponse.json(
      { error: "Image processing failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

/**
 * Store image variants to storage provider
 * Mock implementation - replace with actual storage
 */
async function storeImageVariants(
  assetId: string,
  variants: Array<{ name: string; data: Buffer; mime: string; width: number; height: number; format: string; bytes: number }>
): Promise<Array<{ url: string; width: number; height: number; format: string; bytes: number }>> {
  const storedVariants = [];

  for (const variant of variants) {
    // Mock storage - in production, upload to your storage provider
    const mockUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/images/${assetId}/${variant.name}`;
    
    storedVariants.push({
      url: mockUrl,
      width: variant.width,
      height: variant.height,
      format: variant.format,
      bytes: variant.bytes,
    });
  }

  return storedVariants;
}

/**
 * Update asset with image metadata
 * Mock implementation - replace with actual database update
 */
async function updateAssetImageMetadata(
  assetId: string,
  metadata: {
    originalUrl: string;
    originalMime: string;
    originalWidth: number;
    originalHeight: number;
    fileSize: number;
    hasAlpha: boolean;
    variants: Array<{ url: string; width: number; height: number; format: string; bytes: number }>;
  }
): Promise<void> {
  // Mock database update
  console.log(`Updating asset ${assetId} with image metadata:`, metadata);
  
  // In production, this would update the database:
  // await db.update(schema.assets)
  //   .set({
  //     artworkUrl: metadata.originalUrl,
  //     artworkVariants: metadata.variants,
  //     artworkMetadata: {
  //       originalWidth: metadata.originalWidth,
  //       originalHeight: metadata.originalHeight,
  //       hasAlpha: metadata.hasAlpha,
  //       fileSize: metadata.fileSize,
  //     },
  //   })
  //   .where(eq(schema.assets.id, assetId));
}
