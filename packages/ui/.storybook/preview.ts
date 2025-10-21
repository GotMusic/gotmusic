import type { Preview } from '@storybook/react';
import { withThemeByClassName } from '@storybook/addon-themes';
import React from 'react';

// Import GotMusic design tokens
// import '@gotmusic/tokens/web.css';
import '../src/theme/tokens.css';

const preview: Preview = {
  parameters: {
    // Performance monitoring (e18e standards)
    // Note: Performance addon not available, using manual monitoring
    
    // Accessibility testing
    a11y: {
      config: {
        rules: [
          // Color and contrast
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'color-contrast-enhanced',
            enabled: true,
          },
          // Keyboard navigation
          {
            id: 'keyboard-navigation',
            enabled: true,
          },
          {
            id: 'focus-order-semantics',
            enabled: true,
          },
          {
            id: 'focus-management',
            enabled: true,
          },
          // ARIA and semantics
          {
            id: 'aria-allowed-attr',
            enabled: true,
          },
          {
            id: 'aria-required-attr',
            enabled: true,
          },
          {
            id: 'aria-valid-attr',
            enabled: true,
          },
          {
            id: 'aria-roles',
            enabled: true,
          },
          // Interactive elements
          {
            id: 'button-name',
            enabled: true,
          },
          {
            id: 'link-name',
            enabled: true,
          },
          {
            id: 'form-field-multiple-labels',
            enabled: true,
          },
          // Images and media
          {
            id: 'image-alt',
            enabled: true,
          },
          {
            id: 'object-alt',
            enabled: true,
          },
          // Structure
          {
            id: 'heading-order',
            enabled: true,
          },
          {
            id: 'landmark-unique',
            enabled: true,
          },
          {
            id: 'region',
            enabled: true,
          },
        ],
      },
      options: {
        runOnly: {
          type: 'tag',
          values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'],
        },
        rules: {
          // Allow some flexibility for Storybook-specific content
          'color-contrast': { enabled: true },
          'landmark-unique': { enabled: false }, // Allow multiple main landmarks in stories
        },
      },
    },
    
    // Viewport testing
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1024px',
            height: '768px',
          },
        },
        wide: {
          name: 'Wide',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
      },
    },
    
    // Backgrounds for theme testing
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#0A0C11',
        },
        {
          name: 'neutral',
          value: '#f5f5f5',
        },
      ],
    },
    
    // Controls configuration
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    
    // Documentation
    docs: {
      toc: true,
      source: {
        type: 'code',
      },
    },
    
    // Actions for interaction testing
    actions: {
      argTypesRegex: '^on[A-Z].*',
    },
  },
  
  // Global decorators
  decorators: [
    // Theme switching
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'dark',
    }),
    
    // Accessibility testing is handled automatically by @storybook/addon-a11y
    
    // Global wrapper for GotMusic theme
    (Story, context) => {
      return React.createElement('div', { className: 'min-h-screen bg-neutral-50 dark:bg-neutral-0' },
        React.createElement('div', { className: 'p-4' },
          React.createElement(Story)
        )
      );
    },
  ],
  
  // Global types
  argTypes: {
    // Disable controls for common props
    className: {
      control: false,
    },
    children: {
      control: false,
    },
    // Accessibility props
    'aria-label': {
      control: 'text',
    },
    'aria-describedby': {
      control: 'text',
    },
    'aria-expanded': {
      control: 'boolean',
    },
    'aria-selected': {
      control: 'boolean',
    },
  },
  
  // Global args
  args: {
    // Default accessibility attributes
    'aria-label': undefined,
    'aria-describedby': undefined,
  },
};

export default preview;