import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "theme/index": "src/theme/index.ts",
    "utils/index": "src/utils/index.ts",
  },
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: false,
  // Bundle everything - no external dependencies
  external: [],
  banner: {
    js: '"use client";',
  },
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
    // Use transform instead of automatic to avoid JSX runtime issues
    options.jsx = "transform";
    options.jsxFactory = "React.createElement";
    options.jsxFragment = "React.Fragment";
  },
});
