import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
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
    { from: '../../tokens/dist', to: '/tokens' }
  ],
};

export default config;
