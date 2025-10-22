import { addons } from "@storybook/manager-api";
import { themes } from "@storybook/theming";

// Performance monitoring configuration
addons.setConfig({
  theme: themes.light,
  // Performance addon configuration
  performance: {
    // Enable performance monitoring
    enabled: true,
    // Set performance budgets
    budgets: [
      {
        resourceType: "script",
        budget: 100, // 100KB
      },
      {
        resourceType: "total",
        budget: 500, // 500KB
      },
    ],
    // Component load time monitoring
    componentLoadTime: {
      enabled: true,
      threshold: 100, // 100ms
    },
    // Bundle analysis
    bundleAnalysis: {
      enabled: true,
      threshold: 1000, // 1MB
    },
  },
  // Disable telemetry for better performance
  telemetry: false,
  // Optimize panel layout
  panelPosition: "bottom",
  // Enable keyboard shortcuts for better UX
  shortcuts: true,
});
