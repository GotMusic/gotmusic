import type { Preview } from '@storybook/react';
import React from 'react';

const preview: Preview = {
  parameters: {
    // Documentation
    docs: {
      toc: true,
      source: {
        type: 'code',
      },
    },
  },
  
  // Global decorators
  decorators: [
    // Global wrapper for GotMusic theme
    (Story, context) => {
      return React.createElement('div', { className: 'min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100' },
        React.createElement('div', { className: 'p-4' },
          React.createElement(Story)
        )
      );
    },
  ],
};

export default preview;