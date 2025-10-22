/**
 * e18e Configuration for GotMusic Monorepo
 *
 * This configuration defines performance optimization rules
 * following e18e.dev ecosystem performance standards:
 * - Cleanup: Remove redundant dependencies
 * - Speedup: Improve performance of widely used packages
 * - Levelup: Build modern alternatives to outdated packages
 */

module.exports = {
  // Analysis configuration
  analysis: {
    // Include all packages in monorepo
    packages: [
      "packages/ui",
      "packages/api",
      "packages/fixtures",
      "packages/tokens",
      "apps/web",
      "apps/mobile",
      "apps/worker",
    ],

    // Performance budgets
    budgets: {
      "packages/ui": {
        bundleSize: "100KB",
        dependencies: 20,
        devDependencies: 15,
      },
      "apps/web": {
        bundleSize: "500KB",
        dependencies: 30,
        devDependencies: 25,
      },
      "apps/mobile": {
        bundleSize: "200KB",
        dependencies: 25,
        devDependencies: 20,
      },
    },

    // Exclude patterns
    exclude: [
      "node_modules/**",
      "dist/**",
      "build/**",
      "storybook-static/**",
      "playwright-report/**",
      "test-results/**",
    ],
  },

  // Replacement rules for performance optimization
  replacements: [
    // String utilities
    {
      from: "lodash",
      to: "ramda",
      reason: "Smaller bundle size, better tree-shaking",
      type: "functional",
    },
    {
      from: "moment",
      to: "date-fns",
      reason: "Smaller bundle, better tree-shaking",
      type: "date",
    },

    // Color utilities
    {
      from: "chalk",
      to: "picocolors",
      reason: "Much smaller bundle size",
      type: "color",
    },

    // ID generation
    {
      from: "uuid",
      to: "nanoid",
      reason: "Smaller bundle, faster generation",
      type: "id",
    },

    // HTTP utilities
    {
      from: "axios",
      to: "fetch",
      reason: "Native browser API, smaller bundle",
      type: "http",
    },

    // Validation
    {
      from: "joi",
      to: "zod",
      reason: "Better TypeScript integration, smaller bundle",
      type: "validation",
    },

    // File utilities
    {
      from: "fs-extra",
      to: "node:fs/promises",
      reason: "Native Node.js API",
      type: "fs",
    },
  ],

  // Performance monitoring
  monitoring: {
    // Bundle analysis
    bundleAnalysis: {
      enabled: true,
      threshold: "100KB",
      exclude: ["node_modules"],
    },

    // Dependency analysis
    dependencyAnalysis: {
      enabled: true,
      checkDuplicates: true,
      checkUnused: true,
      checkOutdated: true,
    },

    // Build performance
    buildPerformance: {
      enabled: true,
      threshold: "30s",
      trackMemory: true,
    },
  },

  // CI/CD integration
  ci: {
    // Performance checks in CI
    performanceChecks: {
      bundleSize: true,
      dependencyAnalysis: true,
      buildTime: true,
    },

    // Fail on performance regressions
    failOnRegression: true,

    // Performance budgets
    budgets: {
      bundleSize: "100KB",
      buildTime: "30s",
      memoryUsage: "500MB",
    },
  },

  // Storybook specific optimizations
  storybook: {
    // Optimize Storybook build
    buildOptimization: {
      enabled: true,
      lazyLoading: true,
      codeSplitting: true,
      treeShaking: true,
    },

    // Component performance
    componentPerformance: {
      enabled: true,
      lazyLoading: true,
      memoization: true,
      bundleAnalysis: true,
    },
  },
};
