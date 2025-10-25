const fs = require('fs');
const path = require('path');

// Read the current fallback assets file
const filePath = path.join(__dirname, '../apps/web/src/lib/fallbackAssets.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Define CTA field mappings based on asset titles and types
const getCTAData = (title, index) => {
  const isNew = index < 6; // First 6 are new
  const isFeatured = index < 3; // First 3 are featured
  const isExclusive = index % 7 === 0; // Every 7th is exclusive
  
  // Determine asset type and genre based on title
  let assetType = "track";
  let genre = "Electronic";
  let tags = ["music"];
  
  if (title.toLowerCase().includes("drum") || title.toLowerCase().includes("808")) {
    assetType = "sample";
    genre = "Drum & Bass";
    tags = ["drum & bass", "sample", "new"];
  } else if (title.toLowerCase().includes("classical") || title.toLowerCase().includes("string")) {
    assetType = "track";
    genre = "Classical";
    tags = ["classical", "strings", "orchestral"];
  } else if (title.toLowerCase().includes("vinyl") || title.toLowerCase().includes("record")) {
    assetType = "sample";
    genre = "Hip Hop";
    tags = ["hip hop", "vinyl", "sample"];
  } else if (title.toLowerCase().includes("guitar")) {
    assetType = "track";
    genre = "Rock";
    tags = ["rock", "guitar", "instrumental"];
  } else if (title.toLowerCase().includes("piano") || title.toLowerCase().includes("keyboard")) {
    assetType = "track";
    genre = "Jazz";
    tags = ["jazz", "piano", "instrumental"];
  } else if (title.toLowerCase().includes("synth") || title.toLowerCase().includes("modular")) {
    assetType = "sample";
    genre = "Electronic";
    tags = ["electronic", "synth", "ambient"];
  } else if (title.toLowerCase().includes("microphone") || title.toLowerCase().includes("studio")) {
    assetType = "sample";
    genre = "Hip Hop";
    tags = ["hip hop", "studio", "vocals"];
  } else if (title.toLowerCase().includes("trumpet") || title.toLowerCase().includes("saxophone")) {
    assetType = "track";
    genre = "Jazz";
    tags = ["jazz", "brass", "instrumental"];
  } else if (title.toLowerCase().includes("congas") || title.toLowerCase().includes("percussion")) {
    assetType = "sample";
    genre = "World";
    tags = ["world", "percussion", "rhythm"];
  } else if (title.toLowerCase().includes("ambient") || title.toLowerCase().includes("soundscape")) {
    assetType = "track";
    genre = "Ambient";
    tags = ["ambient", "atmospheric", "chill"];
  } else if (title.toLowerCase().includes("trap") || title.toLowerCase().includes("producer")) {
    assetType = "sample";
    genre = "Hip Hop";
    tags = ["hip hop", "trap", "beats"];
  } else if (title.toLowerCase().includes("techno") || title.toLowerCase().includes("minimal")) {
    assetType = "track";
    genre = "Techno";
    tags = ["techno", "electronic", "minimal"];
  } else if (title.toLowerCase().includes("jazz") || title.toLowerCase().includes("trio")) {
    assetType = "track";
    genre = "Jazz";
    tags = ["jazz", "live", "instrumental"];
  } else if (title.toLowerCase().includes("folk") || title.toLowerCase().includes("acoustic")) {
    assetType = "track";
    genre = "Folk";
    tags = ["folk", "acoustic", "indie"];
  } else if (title.toLowerCase().includes("country") || title.toLowerCase().includes("pickup")) {
    assetType = "track";
    genre = "Country";
    tags = ["country", "americana", "acoustic"];
  } else if (title.toLowerCase().includes("funk") || title.toLowerCase().includes("1970s")) {
    assetType = "sample";
    genre = "Funk";
    tags = ["funk", "soul", "vintage"];
  } else if (title.toLowerCase().includes("synthwave") || title.toLowerCase().includes("neon")) {
    assetType = "track";
    genre = "Synthwave";
    tags = ["synthwave", "retro", "electronic"];
  } else if (title.toLowerCase().includes("punk") || title.toLowerCase().includes("ripped")) {
    assetType = "track";
    genre = "Punk";
    tags = ["punk", "rock", "alternative"];
  } else if (title.toLowerCase().includes("ethereal") || title.toLowerCase().includes("forest")) {
    assetType = "track";
    genre = "Ambient";
    tags = ["ambient", "ethereal", "atmospheric"];
  } else if (title.toLowerCase().includes("soul") || title.toLowerCase().includes("singer")) {
    assetType = "track";
    genre = "Soul";
    tags = ["soul", "r&b", "vocal"];
  } else if (title.toLowerCase().includes("rapper") || title.toLowerCase().includes("rooftop")) {
    assetType = "sample";
    genre = "Hip Hop";
    tags = ["hip hop", "rap", "urban"];
  }
  
  return {
    assetType,
    isNew,
    isFeatured,
    isExclusive,
    genre,
    tags
  };
};

// Find all asset objects and add CTA fields
content = content.replace(/\{\s*id: "([^"]+)",\s*title: "([^"]+)",[\s\S]*?createdAt: (\d+),\s*\}/g, (match, id, title, createdAt) => {
  // Extract the index from the asset ID
  const index = parseInt(id.split('-').pop()) - 1;
  const ctaData = getCTAData(title, index);
  
  // Add CTA fields before the closing brace
  return match.replace(/,\s*$/, `,
    assetType: "${ctaData.assetType}",
    isNew: ${ctaData.isNew},
    isFeatured: ${ctaData.isFeatured},
    isExclusive: ${ctaData.isExclusive},
    genre: ${ctaData.genre ? `"${ctaData.genre}"` : 'null'},
    tags: [${ctaData.tags.map(tag => `"${tag}"`).join(', ')}],
  `);
});

// Write the updated content back to the file
fs.writeFileSync(filePath, content);
console.log('✅ Updated fallback assets with CTA fields');
