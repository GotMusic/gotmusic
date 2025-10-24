import type { Meta, StoryObj } from '@storybook/react';
import { Page } from './Page';

const meta: Meta<typeof Page> = {
  title: 'Stories/Page',
  component: Page,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Story-specific page component for demonstrations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Page title',
    },
    children: {
      control: 'text',
      description: 'Page content',
    },
    variant: {
      control: 'select',
      options: ['default', 'centered', 'full-width', 'sidebar'],
      description: 'Page layout variant',
    },
    showHeader: {
      control: 'boolean',
      description: 'Whether to show page header',
    },
    showFooter: {
      control: 'boolean',
      description: 'Whether to show page footer',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Default Page',
    children: 'This is the main content of the page.',
    variant: 'default',
    showHeader: true,
    showFooter: true,
  },
};

export const Centered: Story = {
  args: {
    title: 'Centered Page',
    children: 'This page content is centered.',
    variant: 'centered',
    showHeader: true,
    showFooter: true,
  },
};

export const FullWidth: Story = {
  args: {
    title: 'Full Width Page',
    children: 'This page uses the full width of the container.',
    variant: 'full-width',
    showHeader: true,
    showFooter: true,
  },
};

export const Sidebar: Story = {
  args: {
    title: 'Sidebar Page',
    children: 'This page has a sidebar layout.',
    variant: 'sidebar',
    showHeader: true,
    showFooter: true,
  },
};

export const WithoutHeader: Story = {
  args: {
    children: 'This page has no header.',
    variant: 'default',
    showHeader: false,
    showFooter: true,
  },
};

export const WithoutFooter: Story = {
  args: {
    title: 'No Footer Page',
    children: 'This page has no footer.',
    variant: 'default',
    showHeader: true,
    showFooter: false,
  },
};

export const Minimal: Story = {
  args: {
    children: 'This is a minimal page with no header or footer.',
    variant: 'centered',
    showHeader: false,
    showFooter: false,
  },
};

export const LongContent: Story = {
  args: {
    title: 'Page with Long Content',
    children: (
      <div>
        <p>This is a paragraph of content.</p>
        <p>Here is another paragraph with more content.</p>
        <p>And yet another paragraph to demonstrate scrolling behavior.</p>
        <p>This content should be long enough to show how the page handles scrolling.</p>
        <p>More content to fill the page and test the layout.</p>
        <p>Even more content to ensure proper page behavior.</p>
      </div>
    ),
    variant: 'default',
    showHeader: true,
    showFooter: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', height: '400px' }}>
      <Page title="Default" variant="default" showHeader={true} showFooter={true}>
        Default page content
      </Page>
      <Page title="Centered" variant="centered" showHeader={true} showFooter={true}>
        Centered page content
      </Page>
      <Page title="Full Width" variant="full-width" showHeader={true} showFooter={true}>
        Full width page content
      </Page>
      <Page title="Sidebar" variant="sidebar" showHeader={true} showFooter={true}>
        Sidebar page content
      </Page>
    </div>
  ),
};
