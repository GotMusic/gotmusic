#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "../../../");
const tokensPath = path.join(__dirname, "..", "dist", "native.ts");
const rnTailwindPath = path.join(projectRoot, "apps", "mobile", "tailwind.config.js");

function loadTokens() {
  const ts = fs.readFileSync(tokensPath, "utf8");
  const match = ts.match(/export const tokens = (.*) as const;/s);
  if (!match) throw new Error("Cannot parse native.ts tokens");
  return JSON.parse(match[1]);
}

function loadRNPalette() {
  const cfg = require(rnTailwindPath);
  return cfg.theme?.extend?.colors || {};
}

function fail(msg) {
  console.error(`Token parity check failed: ${msg}`);
  process.exit(1);
}

try {
  const tokens = loadTokens();
  const colors = tokens.color;
  const radii = tokens.radius;
  const palette = loadRNPalette();

  const checks = [
    ["bg.default", colors.bg?.default, palette.bg?.DEFAULT],
    ["bg.elevated", colors.bg?.elevated, palette.bg?.elevated],
    ["fg.default", colors.fg?.default, palette.fg?.DEFAULT],
    ["fg.muted", colors.fg?.muted, palette.fg?.muted],
    ["brand.primary", colors.brand?.primary, palette.brand?.primary],
    ["brand.accent", colors.brand?.accent, palette.brand?.accent],
    ["semantic.success", colors.success || colors.semantic?.success, palette.success],
    ["semantic.warning", colors.warning || colors.semantic?.warning, palette.warning],
    ["semantic.danger", colors.danger || colors.semantic?.danger, palette.danger],
  ];

  for (const [name, t, p] of checks) {
    if (!t || !p) fail(`${name} missing in tokens or palette`);
    if (String(t).toLowerCase() !== String(p).toLowerCase())
      fail(`${name} mismatch: ${t} !== ${p}`);
  }

  const rnRadii = require(path.join(projectRoot, "apps", "mobile", "tailwind.config.js")).theme
    .extend.borderRadius;
  if (rnRadii.xs !== radii.xs || rnRadii.md !== radii.md || rnRadii.xl !== radii.xl) {
    fail(
      `borderRadius mismatch RN vs tokens: ${JSON.stringify(rnRadii)} vs ${JSON.stringify(radii)}`,
    );
  }

  console.log("Token parity OK");
  process.exit(0);
} catch (e) {
  fail(e.message);
}
