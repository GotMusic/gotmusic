import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  dts: false,
  format: ["esm", "cjs"],
  sourcemap: true,
  clean: true,
  treeshake: true,
  target: "es2022",
  outDir: "dist",
});
