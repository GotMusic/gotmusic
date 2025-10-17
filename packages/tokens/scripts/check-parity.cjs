#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "../../../");
const tokensCjsPath = path.join(__dirname, "..", "dist", "native.cjs");
const rnTailwindPath = path.join(projectRoot, "apps", "mobile", "tailwind.config.cjs");

function loadTokens() {
  const { tokens } = require(tokensCjsPath);
  return tokens;
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
    ["semantic.success", colors.palette?.semantic?.success, palette.success],
    ["semantic.warning", colors.palette?.semantic?.warning, palette.warning],
    ["semantic.danger", colors.palette?.semantic?.danger, palette.danger],
  ];

  for (const [name, t, p] of checks) {
    if (!t || !p) fail(`${name} missing in tokens or palette`);
    if (String(t).toLowerCase() !== String(p).toLowerCase())
      fail(`${name} mismatch: ${t} !== ${p}`);
  }

  const rnRadii = require(path.join(projectRoot, "apps", "mobile", "tailwind.config.cjs")).theme
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
