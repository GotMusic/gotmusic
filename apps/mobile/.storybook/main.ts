import type { StorybookConfig } from "@storybook/react-native";

const config: StorybookConfig = {
  stories: ["../app/**/*.stories.@(ts|tsx|js|jsx|mdx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-ondevice-controls",
    "@storybook/addon-ondevice-actions",
    "@storybook/addon-ondevice-backgrounds",
    "@storybook/addon-ondevice-notes",
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
