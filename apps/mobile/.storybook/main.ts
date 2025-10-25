import type { StorybookConfig } from "@storybook/react-native";

const config: StorybookConfig = {
  stories: ["../app/**/*.stories.@(ts|tsx|js|jsx|mdx)"],
  addons: ["@storybook/addon-essentials"],
  framework: "@storybook/react-native",
};

export default config;
