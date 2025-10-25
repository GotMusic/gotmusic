#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_DIR = '/Users/grantedwards/Desktop/GotMusic/apps/web/public/media/covers';
const THUMBNAILS_DIR = '/Users/grantedwards/Desktop/GotMusic/apps/web/public/media/thumbnails';
const HEROES_DIR = '/Users/grantedwards/Desktop/GotMusic/apps/web/public/media/heroes';

async function generateImageSizes() {
  console.log('🔄 Generating different image sizes...');
  
  // Create directories if they don't exist
  [THUMBNAILS_DIR, HEROES_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`📁 Created directory: ${dir}`);
    }
  });
  
  // Get all cover images
  const coverFiles = fs.readdirSync(SOURCE_DIR).filter(file => file.endsWith('.jpg'));
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const file of coverFiles) {
    try {
      const assetId = file.replace('-3000.jpg', '');
      const sourcePath = path.join(SOURCE_DIR, file);
      
      console.log(`Processing ${assetId}...`);
      
      // Generate thumbnail (512x512)
      const thumbnailPath = path.join(THUMBNAILS_DIR, `${assetId}-512.jpg`);
      await sharp(sourcePath)
        .resize(512, 512, { fit: 'cover' })
        .jpeg({ quality: 85 })
        .toFile(thumbnailPath);
      
      // Generate hero (1024x1024)
      const heroPath = path.join(HEROES_DIR, `${assetId}-1024.jpg`);
      await sharp(sourcePath)
        .resize(1024, 1024, { fit: 'cover' })
        .jpeg({ quality: 90 })
        .toFile(heroPath);
      
      console.log(`✅ ${assetId}: Generated thumbnail and hero images`);
      successCount++;
      
    } catch (error) {
      console.log(`❌ Error processing ${file}: ${error.message}`);
      errorCount++;
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`  ✅ Successfully processed: ${successCount}`);
  console.log(`  ❌ Errors: ${errorCount}`);
  console.log(`  📁 Thumbnails: ${THUMBNAILS_DIR}`);
  console.log(`  📁 Heroes: ${HEROES_DIR}`);
  
  console.log('\n🎉 Image size generation complete!');
}

generateImageSizes().catch(console.error);
