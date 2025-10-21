import type { Preview } from '@storybook/react';
import React from 'react';
import '../src/styles.css';      // global Tailwind for stories

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    a11y: {
      element: '#storybook-root'
    }
  }
};

export default preview;