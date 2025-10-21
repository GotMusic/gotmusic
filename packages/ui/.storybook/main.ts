import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  typescript: {
    check: false,
    reactDocgen: false,
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: [
    // Map the built tokens to /tokens so we can link it easily
    { from: '../../tokens/dist', to: '/tokens' },
    // Map the design tokens CSS to /design-tokens.css
    { from: '../src/design-tokens.css', to: '/design-tokens.css' }
  ],
};

export default config;
