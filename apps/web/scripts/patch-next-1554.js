const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'node_modules/next/dist/shared/lib');
const file = path.join(dir, 'constants.js');

// Only patch if file is missing and we're actually on 15.5.4
let is1554 = false;
try {
  const nextPkg = require('next/package.json');
  is1554 = nextPkg.version === '15.5.4';
} catch (_) {}

if (is1554) {
  fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(file)) {
    fs.writeFileSync(
      file,
      "module.exports = require('../../shared/lib/constants');\n",
      'utf8'
    );
    console.log('[patch-next-1554] Added missing dist/shared/lib/constants.js');
  }
}
