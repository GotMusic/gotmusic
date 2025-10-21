import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// e18e performance optimizations
export default defineConfig({
  plugins: [react()],

  // Performance optimizations
  build: {
    // Bundle optimization
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          radix: [
            "@radix-ui/react-checkbox",
            "@radix-ui/react-select",
            "@radix-ui/react-slider",
            "@radix-ui/react-slot",
          ],
          utils: ["clsx", "tailwind-merge", "class-variance-authority"],
          icons: ["lucide-react"],
        },
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 100, // 100KB limit per chunk
  },

  // Development optimizations
  server: {
    fs: {
      allow: [".."],
    },
  },

  // Path resolution
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@gotmusic/tokens": resolve(__dirname, "../tokens/src"),
    },
  },

  // CSS optimization
  css: {
    devSourcemap: true,
  },

  // Performance monitoring
  define: {
    __STORYBOOK_PERFORMANCE__: JSON.stringify(true),
  },
});
