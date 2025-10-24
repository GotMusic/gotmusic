import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Stories/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Story-specific header component for demonstrations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Header title',
    },
    subtitle: {
      control: 'text',
      description: 'Header subtitle',
    },
    variant: {
      control: 'select',
      options: ['default', 'minimal', 'hero', 'compact'],
      description: 'Header visual variant',
    },
    showActions: {
      control: 'boolean',
      description: 'Whether to show action buttons',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Welcome to GotMusic',
    subtitle: 'Your music platform',
    variant: 'default',
    showActions: true,
  },
};

export const Minimal: Story = {
  args: {
    title: 'Minimal Header',
    variant: 'minimal',
    showActions: false,
  },
};

export const Hero: Story = {
  args: {
    title: 'Hero Header',
    subtitle: 'Make music, share music, discover music',
    variant: 'hero',
    showActions: true,
  },
};

export const Compact: Story = {
  args: {
    title: 'Compact Header',
    variant: 'compact',
    showActions: true,
  },
};

export const WithoutSubtitle: Story = {
  args: {
    title: 'Header Without Subtitle',
    variant: 'default',
    showActions: true,
  },
};

export const WithoutActions: Story = {
  args: {
    title: 'Header Without Actions',
    subtitle: 'This header has no action buttons',
    variant: 'default',
    showActions: false,
  },
};

export const LongTitle: Story = {
  args: {
    title: 'This is a very long header title that demonstrates how the component handles extended text content',
    subtitle: 'And here is a subtitle that is also quite long to show text wrapping behavior',
    variant: 'default',
    showActions: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Header title="Default Header" subtitle="Default variant" variant="default" showActions={true} />
      <Header title="Minimal Header" variant="minimal" showActions={false} />
      <Header title="Hero Header" subtitle="Hero variant" variant="hero" showActions={true} />
      <Header title="Compact Header" variant="compact" showActions={true} />
    </div>
  ),
};
