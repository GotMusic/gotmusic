import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx|mdx)"], // MDX ok because Docs is in Essentials
  addons: ["@storybook/addon-essentials", "@storybook/addon-links", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/react-vite",
    options: {
      builder: {
        viteConfigPath: "./vite.config.ts",
      },
    },
  },
  typescript: {
    check: false,
    reactDocgen: false,
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: [
    // Map the built tokens to /tokens so we can link it easily
    { from: "../../tokens/dist", to: "/tokens" },
    // Map the design tokens CSS to /design-tokens.css
    { from: "../src/design-tokens.css", to: "/design-tokens.css" },
  ],
  // Performance optimizations
  features: {
    buildStoriesJson: true,
  },
  // Bundle optimization
  core: {
    builder: "@storybook/builder-vite",
    disableTelemetry: true,
  },
};

export default config;
