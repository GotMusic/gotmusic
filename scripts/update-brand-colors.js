#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Category color mappings
const CATEGORY_COLORS = {
  onchain: '#8B5CF6',    // purple-500
  storage: '#06B6D4',    // cyan-500
  wallets: '#10B981',    // green-500
  infra: '#F97316',      // orange-500
  performance: '#EC4899', // pink-500
};

// Brand to category mapping (from brands.ts)
const BRAND_CATEGORIES = {
  // On-chain
  'ethereum.svg': 'onchain',
  'base.svg': 'onchain',
  'avail.svg': 'onchain',
  'eas.svg': 'onchain',
  'blockscout.svg': 'onchain',
  
  // Storage & Delivery
  'lighthouse.svg': 'storage',
  'lit.svg': 'storage',
  'ipfs.svg': 'storage',
  'r2.svg': 'storage',
  's3.svg': 'storage',
  
  // Wallets & Payments
  'pyusd.svg': 'wallets',
  'metamask.svg': 'wallets',
  'walletconnect.svg': 'wallets',
  'coinbase-wallet.svg': 'wallets',
  
  // Infra & Dev
  'vercel.svg': 'infra',
  'github-actions.svg': 'infra',
  'postgres.svg': 'infra',
  'railway.svg': 'infra',
  'docker.svg': 'infra',
  'turborepo.svg': 'infra',
  'tailwind.svg': 'infra',
  'nativewind.svg': 'infra',
  'storybook.svg': 'infra',
  'typescript.svg': 'infra',
  'e18e.svg': 'infra',
  'vite.svg': 'infra',
  'tsup.svg': 'infra',
  'radix-ui.svg': 'infra',
  'lucide.svg': 'infra',
  'yarn.svg': 'infra',
  
  // Performance & Monitoring
  'playwright.svg': 'performance',
  'jest.svg': 'performance',
  'biome.svg': 'performance',
};

const brandsDir = path.join(__dirname, '../apps/web/public/brands');

function updateSvgColor(svgPath, newColor) {
  try {
    const content = fs.readFileSync(svgPath, 'utf8');
    
    // Replace the fill color in the rect element
    const updatedContent = content.replace(
      /<rect[^>]*fill="[^"]*"/,
      `<rect width="120" height="40" rx="8" fill="${newColor}"`
    );
    
    fs.writeFileSync(svgPath, updatedContent);
    console.log(`✅ Updated ${path.basename(svgPath)} with color ${newColor}`);
  } catch (error) {
    console.error(`❌ Error updating ${svgPath}:`, error.message);
  }
}

function main() {
  console.log('🎨 Updating brand SVG colors to match categories...\n');
  
  let updated = 0;
  let skipped = 0;
  
  // Get all SVG files
  const svgFiles = fs.readdirSync(brandsDir).filter(file => file.endsWith('.svg'));
  
  for (const svgFile of svgFiles) {
    const category = BRAND_CATEGORIES[svgFile];
    
    if (category && CATEGORY_COLORS[category]) {
      const svgPath = path.join(brandsDir, svgFile);
      const newColor = CATEGORY_COLORS[category];
      updateSvgColor(svgPath, newColor);
      updated++;
    } else {
      console.log(`⚠️  Skipped ${svgFile} - no category mapping found`);
      skipped++;
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`   Updated: ${updated} files`);
  console.log(`   Skipped: ${skipped} files`);
  console.log(`   Total: ${svgFiles.length} files`);
}

if (require.main === module) {
  main();
}

module.exports = { updateSvgColor, CATEGORY_COLORS, BRAND_CATEGORIES };
