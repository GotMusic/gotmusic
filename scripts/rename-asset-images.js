#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Asset mapping based on the database seeding
const ASSET_MAPPING = [
  // SAMPLES (12)
  {
    id: "asset-new-001",
    title: "Analog 808 Drum Machine Close Up Glowing Red Pads",
    filename: "Generate a photorealistic 1_1 album cover._Theme_ Analog 808 drum machine close-up glowing red pads._Include_ artist name and kit title text in bold techno typography._Rules_ cinematic lighting, centered composition, no collage, Spotify sam.jpg",
    assetType: "sample"
  },
  {
    id: "asset-new-002", 
    title: "Classical String Section — Cello And Violin Under Soft Light",
    filename: "Generate a photorealistic 1_1 album cover._Theme_ Classical string section — cello and violin under soft light._Include_ elegant serif typography._Rules_ one photo, warm lighting, Spotify-ready..jpg",
    assetType: "sample"
  },
  {
    id: "asset-new-003",
    title: "Close Up Vinyl Record Under Warm Light, Dust Visible", 
    filename: "Generate a photorealistic 1_1 album cover._Theme_ Close-up vinyl record under warm light, dust visible._Include_ classic record-label typography for title._Rules_ analog texture, one photo, no collage, Spotify sample-pack cover style..jpg",
    assetType: "sample"
  },
  {
    id: "asset-new-004",
    title: "Congas, Djembes, And Shakers In Warm Sunset Tones",
    filename: "Generate a photorealistic 1_1 album cover._Theme_ Congas, djembes, and shakers in warm sunset tones._Include_ organic script title and subtle artist name._Rules_ vibrant warm color, single scene, no collage, Spotify-ready..jpg",
    assetType: "sample"
  },
  {
    id: "asset-new-005",
    title: "Dream Pop Duo Sitting On Retro Couch With Vintage Lighting",
    filename: "Generate a photorealistic 1_1 album cover._Theme_ Dream pop duo sitting on retro couch with vintage lighting._Include_ album and artist text in soft script font._Rules_ analog light, single scene, no collage, Spotify cover format..jpg",
    assetType: "sample"
  },
  {
    id: "asset-new-006",
    title: "Electric Guitar Neck Under Studio Lights, Reflective Chrome Tones",
    filename: "Generate a photorealistic 1_1 album cover._Theme_ Electric guitar neck under studio lights, reflective chrome tones._Include_ elegant serif artist name and minimal title._Rules_ single subject, cinematic shallow depth, no collage, Spotify-r.jpg",
    assetType: "sample"
  },
  {
    id: "asset-new-007",
    title: "Lo Fi Electric Piano Keyboard On A Wooden Desk With Vinyl And Lamp",
    filename: "Generate a photorealistic 1_1 album cover._Theme_ Lo-fi electric piano keyboard on a wooden desk with vinyl and lamp._Include_ soft modern typography for artist and title._Rules_ warm analog lighting, cozy desk setup, one photo, no collage..jpg",
    assetType: "sample"
  },
  {
    id: "asset-new-008",
    title: "Mpc Sampler On Desk With Coffee And Vinyl Crate",
    filename: "Generate a photorealistic 1_1 album cover._Theme_ MPC sampler on desk with coffee and vinyl crate._Include_ bold urban typography for title, small artist name._Rules_ warm analog tone, single composition, no collage..jpg",
    assetType: "sample"
  },
  {
    id: "asset-new-009",
    title: "Modular Synth Cables Glowing In Ambient Purple Light",
    filename: "Generate a photorealistic 1_1 album cover._Theme_ Modular synth cables glowing in ambient purple light._Include_ futuristic typography for artist and pack name._Rules_ cinematic lighting, no collage, single detailed close-up..jpg",
    assetType: "sample"
  },
  {
    id: "asset-new-010",
    title: "Studio Microphone Glowing Under Neon Pink And Blue Light",
    filename: "Generate a photorealistic 1_1 album cover._Theme_ Studio microphone glowing under neon pink and blue light._Include_ sleek sans-serif artist and title text._Rules_ cinematic light, single subject, no collage..jpg",
    assetType: "sample"
  },
  {
    id: "asset-new-011",
    title: "Trumpet And Saxophones Under Stage Lights",
    filename: "Generate a photorealistic 1_1 album cover._Theme_ Trumpet and saxophones under stage lights._Include_ bold metallic font for album title, small serif artist name._Rules_ single scene, cinematic light beams, no collage..jpg",
    assetType: "sample"
  },
  {
    id: "asset-new-012",
    title: "Vintage Drum Set In Cozy Studio Corner",
    filename: "Generate a photorealistic 1_1 album cover._Theme_ Vintage drum set in cozy studio corner._Include_ minimalist sans-serif artist and title text._Rules_ natural lighting, analog tone, single photo, Spotify cover format..jpg",
    assetType: "sample"
  },
  
  // TRACKS (12)
  {
    id: "asset-new-013",
    title: "Neon Night Drive — Retro Synthwave Aesthetic With Glowing City Lights",
    filename: "Generate a photorealistic 1_1 album cover design. _Theme_ Neon night drive — retro synthwave aesthetic with glowing city lights reflecting off a car hood at night._Include_ artist name text and album title text with futuristic typography..jpg",
    assetType: "track"
  },
  {
    id: "asset-new-014",
    title: "1970s Funk Revival With Bright Colors, Grainy Texture",
    filename: "Generate a photorealistic 1_1 album cover._Theme_ 1970s funk revival with bright colors, grainy texture._Include_ artist and album name text in bold retro typography._Rules_ vintage vibe, warm analog tones, no collage, Spotify cover ready..jpg",
    assetType: "track"
  },
  {
    id: "asset-new-015",
    title: "Ambient Soundscape — Foggy Mountains Or Misty Forest Minimalism",
    filename: "Generate a photorealistic 1_1 album cover._Theme_ Ambient soundscape — foggy mountains or misty forest minimalism._Include_ artist name and album title in minimalist typography._Rules_ cool tones, soft focus, single photo, no collage, Spo.jpg",
    assetType: "track"
  },
  {
    id: "asset-new-016",
    title: "Country Singer Leaning On Pickup Truck At Dusk",
    filename: "Generate a photorealistic 1_1 album cover._Theme_ Country singer leaning on pickup truck at dusk._Include_ serif or handwritten artist name and title text._Rules_ warm twilight tones, one subject, cinematic light, no collage, Spotify-ready..jpg",
    assetType: "track"
  },
  {
    id: "asset-new-017",
    title: "Ethereal Forest Singer Portrait With Natural Green Light",
    filename: "Generate a photorealistic 1_1 album cover._Theme_ Ethereal forest singer portrait with natural green light._Include_ artist and album text in elegant serif._Rules_ single subject, soft natural tones, no collage, Spotify cover format. (1).jpg",
    assetType: "track"
  },
  {
    id: "asset-new-018",
    title: "Indie Folk Duo In A Sunset Field With Acoustic Guitar",
    filename: "Generate a photorealistic 1_1 album cover._Theme_ Indie folk duo in a sunset field with acoustic guitar._Include_ artist name and album title text with rustic serif font._Rules_ warm tones, natural light, centered composition, one photograp.jpg",
    assetType: "track"
  },
  {
    id: "asset-new-019",
    title: "Jazz Trio Performing Live On Dim Stage, Soft Spotlight",
    filename: "Generate a photorealistic 1_1 album cover._Theme_ Jazz trio performing live on dim stage, soft spotlight._Include_ artist and album title in small italic serif._Rules_ black & white tone, single photo, cinematic contrast, Spotify-ready..jpg",
    assetType: "track"
  },
  {
    id: "asset-new-020",
    title: "Minimal Techno — Grayscale Texture With Subtle Motion Blur",
    filename: "Generate a photorealistic 1_1 album cover._Theme_ Minimal techno — grayscale texture with subtle motion blur._Include_ artist and album name text aligned bottom-left._Rules_ clean layout, one background texture, no collage, Spotify-ready..jpg",
    assetType: "track"
  },
  {
    id: "asset-new-021",
    title: "Punk Style Portrait With Ripped Text Look And Grain",
    filename: "Generate a photorealistic 1_1 album cover._Theme_ Punk-style portrait with ripped-text look and grain._Include_ artist and album text in cutout-style typography._Rules_ gritty texture, analog lighting, single subject, Spotify cover ready..jpg",
    assetType: "track"
  },
  {
    id: "asset-new-022",
    title: "Rapper On City Rooftop At Dusk With Skyline Backdrop",
    filename: "Generate a photorealistic 1_1 album cover._Theme_ Rapper on city rooftop at dusk with skyline backdrop._Include_ artist and album text with urban bold typography._Rules_ cinematic light, one subject, no collage, Spotify-ready..jpg",
    assetType: "track"
  },
  {
    id: "asset-new-023",
    title: "Soul Singer Portrait With Warm Golden Backlight",
    filename: "Generate a photorealistic 1_1 album cover._Theme_ Soul singer portrait with warm golden backlight._Include_ artist name and album title text styled like a vintage record sleeve._Rules_ cinematic portrait lighting, single subject, no collage.jpg",
    assetType: "track"
  },
  {
    id: "asset-new-024",
    title: "Trap Producer In Smoky Studio, Neon Red Lighting",
    filename: "Generate a photorealistic 1_1 album cover._Theme_ Trap producer in smoky studio, neon red lighting._Include_ bold sans-serif artist name and album title._Rules_ cinematic shadows, moody lighting, single scene, no collage, Spotify album cove.jpg",
    assetType: "track"
  }
];

const SOURCE_DIR = '/Users/grantedwards/Desktop/GotMusic/apps/web/public/assets/covers';
const TARGET_DIR = '/Users/grantedwards/Desktop/GotMusic/apps/web/public/media/covers';

async function renameImages() {
  console.log('🔄 Starting image renaming process...');
  
  // Create target directory if it doesn't exist
  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
    console.log(`📁 Created directory: ${TARGET_DIR}`);
  }
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const asset of ASSET_MAPPING) {
    try {
      const sourcePath = path.join(SOURCE_DIR, asset.filename);
      const targetPath = path.join(TARGET_DIR, `${asset.id}-3000.jpg`);
      
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`✅ ${asset.id}: ${asset.title} (${asset.assetType})`);
        successCount++;
      } else {
        console.log(`❌ Source file not found: ${asset.filename}`);
        errorCount++;
      }
    } catch (error) {
      console.log(`❌ Error processing ${asset.id}: ${error.message}`);
      errorCount++;
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`  ✅ Successfully processed: ${successCount}`);
  console.log(`  ❌ Errors: ${errorCount}`);
  console.log(`  📁 Target directory: ${TARGET_DIR}`);
  
  // Create thumbnails and heroes directories
  const thumbnailsDir = path.join(path.dirname(TARGET_DIR), 'thumbnails');
  const heroesDir = path.join(path.dirname(TARGET_DIR), 'heroes');
  
  if (!fs.existsSync(thumbnailsDir)) {
    fs.mkdirSync(thumbnailsDir, { recursive: true });
    console.log(`📁 Created thumbnails directory: ${thumbnailsDir}`);
  }
  
  if (!fs.existsSync(heroesDir)) {
    fs.mkdirSync(heroesDir, { recursive: true });
    console.log(`📁 Created heroes directory: ${heroesDir}`);
  }
  
  console.log('\n🎉 Image renaming complete!');
}

renameImages().catch(console.error);
