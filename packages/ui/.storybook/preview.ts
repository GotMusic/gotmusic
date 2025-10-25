import type { Preview } from "@storybook/react";
import "../src/styles.css";
import "../src/design-tokens.css";

// Performance monitoring decorator
export const decorators = [];

// Performance budgets
export const parameters = {
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
  // Optimize controls
  controls: {
    hideNoControlsWarning: true,
    expanded: true,
  },
  // Optimize docs
  docs: {
    source: {
      type: "code",
    },
  },
  // Viewport optimization
  viewport: {
    viewports: {
      mobile: {
        name: "Mobile",
        styles: {
          width: "375px",
          height: "667px",
        },
      },
      tablet: {
        name: "Tablet",
        styles: {
          width: "768px",
          height: "1024px",
        },
      },
      desktop: {
        name: "Desktop",
        styles: {
          width: "1024px",
          height: "768px",
        },
      },
    },
  },
};

const preview: Preview = {
  parameters,
  decorators,
};

export default preview;
