import { processImage } from "./image-processing";
import sharp from "sharp";

/**
 * Test script to verify image processing with 1200x1200 input
 */
export async function testImageProcessing() {
  console.log("🧪 Testing image processing with 1200×1200 input...");
  
  try {
    // Create a test 1200x1200 image using Sharp
    const testImageBuffer = await sharp({
      create: {
        width: 1200,
        height: 1200,
        channels: 3,
        background: { r: 106, g: 230, b: 166 } // Brand green
      }
    })
    .jpeg({ quality: 90 })
    .toBuffer();

    console.log(`✅ Created test image: ${testImageBuffer.length} bytes`);

    // Process the image
    const result = await processImage(testImageBuffer, "test-asset-001", {
      sizes: [3000, 1024, 512],
      webpQuality: 80,
      jpegQuality: 82,
      pngCompression: 9,
    });

    console.log("📊 Processing Results:");
    console.log(`- Original: ${result.metadata.originalWidth}×${result.metadata.originalHeight}`);
    console.log(`- Has Alpha: ${result.metadata.hasAlpha}`);
    console.log(`- Format: ${result.metadata.format}`);
    console.log(`- Size: ${result.metadata.size} bytes`);
    
    console.log("\n🖼️ Generated Variants:");
    result.variants.forEach((variant, index) => {
      console.log(`${index + 1}. ${variant.name} (${variant.width}×${variant.height}) - ${variant.format.toUpperCase()} - ${variant.bytes} bytes`);
    });

    // Verify we got the expected variants
    const expectedSizes = [3000, 1024, 512];
    const expectedFormats = ['webp', 'jpeg'];
    
    let success = true;
    
    for (const size of expectedSizes) {
      for (const format of expectedFormats) {
        const variant = result.variants.find(v => v.width === size && v.format === format);
        if (!variant) {
          console.error(`❌ Missing variant: ${size}×${size} ${format.toUpperCase()}`);
          success = false;
        }
      }
    }

    if (success) {
      console.log("\n✅ All expected variants generated successfully!");
      console.log("🎉 Image processing system is working correctly!");
    } else {
      console.log("\n❌ Some variants are missing!");
    }

    return { success, result };

  } catch (error) {
    console.error("❌ Image processing test failed:", error);
    return { success: false, error };
  }
}

/**
 * Test with a real image file (if provided)
 */
export async function testWithRealImage(imagePath: string) {
  console.log(`🧪 Testing with real image: ${imagePath}`);
  
  try {
    const fs = await import('fs');
    const imageBuffer = fs.readFileSync(imagePath);
    
    const result = await processImage(imageBuffer, "real-asset-test", {
      sizes: [3000, 1024, 512],
    });

    console.log("📊 Real Image Results:");
    console.log(`- Original: ${result.metadata.originalWidth}×${result.metadata.originalHeight}`);
    console.log(`- Has Alpha: ${result.metadata.hasAlpha}`);
    console.log(`- Format: ${result.metadata.format}`);
    console.log(`- Size: ${result.metadata.size} bytes`);
    
    console.log("\n🖼️ Generated Variants:");
    result.variants.forEach((variant, index) => {
      console.log(`${index + 1}. ${variant.name} (${variant.width}×${variant.height}) - ${variant.format.toUpperCase()} - ${variant.bytes} bytes`);
    });

    return { success: true, result };

  } catch (error) {
    console.error("❌ Real image test failed:", error);
    return { success: false, error };
  }
}
