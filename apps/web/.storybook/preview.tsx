import '../src/styles/globals.css';
import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    a11y: { element: '#root' },
    layout: 'padded',
  },
};
export default preview;
