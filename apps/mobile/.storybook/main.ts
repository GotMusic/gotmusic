import type { StorybookConfig } from "@storybook/react-native";

const config: StorybookConfig = {
  stories: ["../app/**/*.stories.@(ts|tsx|js|jsx|mdx)"],
  addons: [
    "@storybook/addon-essentials",
  ],
  framework: {
    name: "@storybook/react-native",
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: false,
  },
  docs: {
    autodocs: "tag",
  },
};

export default config;
