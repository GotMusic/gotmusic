import { defineConfig } from "vite";
import { mergeConfig } from "vite";
import viteConfig from "../vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    // Storybook-specific optimizations
    build: {
      // Enable tree-shaking
      rollupOptions: {
        treeshake: {
          moduleSideEffects: false,
        },
        output: {
          // Optimize chunk splitting for better caching
          manualChunks: {
            vendor: ["react", "react-dom"],
            radix: [
              "@radix-ui/react-checkbox",
              "@radix-ui/react-select",
              "@radix-ui/react-slider",
              "@radix-ui/react-slot",
            ],
            utils: ["class-variance-authority", "clsx", "tailwind-merge"],
            icons: ["lucide-react"],
          },
        },
      },
      // Optimize bundle size
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      // Set performance budgets
      chunkSizeWarningLimit: 1000, // 1MB warning limit
    },
    // Optimize dependencies
    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "@radix-ui/react-checkbox",
        "@radix-ui/react-select",
        "@radix-ui/react-slider",
        "@radix-ui/react-slot",
        "class-variance-authority",
        "clsx",
        "tailwind-merge",
        "lucide-react",
      ],
    },
    // Performance monitoring
    define: {
      __STORYBOOK_PERFORMANCE__: JSON.stringify(true),
    },
  }),
);
