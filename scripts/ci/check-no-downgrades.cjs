#!/usr/bin/env node
/**
 * CI Guard: Prevent dependency downgrades
 * 
 * Compares package.json versions against main branch.
 * Fails if any dependency version is lower than main.
 * 
 * Usage: node scripts/ci/check-no-downgrades.cjs
 */

const { execSync } = require('node:child_process');
const fs = require('node:fs');
const semver = require('semver');

const pkgFiles = [
  'package.json',
  'apps/web/package.json',
  'apps/mobile/package.json',
  'packages/api/package.json',
  'packages/ui/package.json',
  'packages/tokens/package.json',
  'packages/fixtures/package.json',
];

let hasDowngrade = false;

for (const file of pkgFiles) {
  // Skip if file doesn't exist
  if (!fs.existsSync(file)) {
    console.log(`⚠️  Skipping ${file} (not found)`);
    continue;
  }

  const current = JSON.parse(fs.readFileSync(file, 'utf8'));
  
  let mainContent;
  try {
    mainContent = execSync(`git show origin/main:${file}`, { encoding: 'utf8' });
  } catch (err) {
    console.log(`⚠️  Skipping ${file} (not in origin/main)`);
    continue;
  }
  
  const main = JSON.parse(mainContent);

  for (const depType of ['dependencies', 'devDependencies']) {
    if (!current[depType]) continue;
    
    for (const [pkg, ver] of Object.entries(current[depType])) {
      const mainVer = main[depType]?.[pkg];
      
      // Skip if:
      // - Package not in main
      // - Workspace protocol
      // - Git/file protocols
      if (!mainVer || ver.startsWith('workspace:') || ver.includes('git') || ver.includes('file:')) {
        continue;
      }

      // Clean version ranges (remove ^, ~, >=, etc)
      const currClean = ver.replace(/^[\^~>=<]+/, '');
      const mainClean = mainVer.replace(/^[\^~>=<]+/, '');

      // Only check if both are valid semver
      if (semver.valid(currClean) && semver.valid(mainClean)) {
        if (semver.lt(currClean, mainClean)) {
          console.error(`❌ DOWNGRADE DETECTED: ${file}`);
          console.error(`   Package: ${pkg}`);
          console.error(`   Main:    ${mainVer}`);
          console.error(`   Current: ${ver}`);
          console.error('');
          hasDowngrade = true;
        }
      }
    }
  }
}

if (hasDowngrade) {
  console.error('🚫 Dependency downgrades are not allowed.');
  console.error('   Please upgrade dependencies instead of downgrading.');
  console.error('   Revert the downgrade or find an alternative solution.');
  process.exit(1);
}

console.log('✅ No dependency downgrades detected');

