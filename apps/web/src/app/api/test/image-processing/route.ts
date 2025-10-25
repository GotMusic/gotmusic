import { NextRequest, NextResponse } from "next/server";
import { testImageProcessing } from "@/lib/test-image-processing";

export async function GET(req: NextRequest) {
  try {
    console.log("🧪 Starting image processing test...");
    
    const result = await testImageProcessing();
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Image processing test completed successfully!",
        metadata: result.result?.metadata,
        variants: result.result?.variants.map(v => ({
          name: v.name,
          size: `${v.width}×${v.height}`,
          format: v.format,
          bytes: v.bytes
        }))
      });
    } else {
      return NextResponse.json({
        success: false,
        error: result.error?.message || "Unknown error",
        details: result.error
      }, { status: 500 });
    }

  } catch (error) {
    console.error("Test API error:", error);
    return NextResponse.json({
      success: false,
      error: "Test failed",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}
