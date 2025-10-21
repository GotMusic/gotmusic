import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardTitle, CardMeta } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Layout/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible card component for displaying content with consistent styling and spacing.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the card',
    },
    children: {
      control: false,
      description: 'Content to display inside the card',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: (
      <>
        <CardTitle>Card Title</CardTitle>
        <CardMeta>This is a basic card with title and meta information.</CardMeta>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'A basic card with title and meta information.',
      },
    },
  },
};

export const WithContent: Story = {
  args: {
    children: (
      <>
        <CardTitle>Sample Card</CardTitle>
        <CardMeta>Card description goes here</CardMeta>
        <div className="mt-4">
          <p className="text-sm text-fg/80">
            This card contains additional content beyond just the title and meta.
            It demonstrates how the card can hold any React content.
          </p>
        </div>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'A card with additional content beyond title and meta.',
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card>
        <CardTitle>Basic Card</CardTitle>
        <CardMeta>Simple card with minimal content</CardMeta>
      </Card>
      
      <Card className="border-brand/50 bg-brand/5">
        <CardTitle>Branded Card</CardTitle>
        <CardMeta>Card with brand color styling</CardMeta>
      </Card>
      
      <Card className="border-danger/50 bg-danger/5">
        <CardTitle>Warning Card</CardTitle>
        <CardMeta>Card with warning/danger styling</CardMeta>
      </Card>
      
      <Card className="border-accent/50 bg-accent/5">
        <CardTitle>Accent Card</CardTitle>
        <CardMeta>Card with accent color styling</CardMeta>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different card variants showing various styling options.',
      },
    },
  },
};

export const A11y: Story = {
  args: {
    children: (
      <>
        <CardTitle>Accessible Card</CardTitle>
        <CardMeta>This card demonstrates proper accessibility features</CardMeta>
        <div className="mt-4">
          <button className="rounded bg-brand px-3 py-2 text-sm font-medium text-fg-inverse hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand/50">
            Action Button
          </button>
        </div>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with interactive elements demonstrating accessibility features like focus management and keyboard navigation.',
      },
    },
  },
};

export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-4">
      <Card>
        <CardTitle>Very Long Title That Might Wrap to Multiple Lines</CardTitle>
        <CardMeta>This card tests how the component handles long content that might cause layout issues.</CardMeta>
      </Card>
      
      <Card>
        <CardTitle>Empty Meta</CardTitle>
        <CardMeta></CardMeta>
      </Card>
      
      <Card>
        <CardTitle>No Meta</CardTitle>
        <div className="mt-2">
          <p className="text-sm text-fg/80">Card without meta information</p>
        </div>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Edge cases showing how the card handles various content scenarios.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card className="cursor-pointer transition-all hover:shadow-elev-2 hover:scale-[1.02]">
        <CardTitle>Hoverable Card</CardTitle>
        <CardMeta>This card responds to hover interactions</CardMeta>
      </Card>
      
      <Card className="cursor-pointer transition-all active:scale-[0.98]">
        <CardTitle>Clickable Card</CardTitle>
        <CardMeta>This card responds to click interactions</CardMeta>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive cards demonstrating hover and click states.',
      },
    },
  },
};

export const Theming: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="mb-2 text-sm font-medium text-fg/80">Dark Theme (Default)</h4>
        <Card>
          <CardTitle>Dark Theme Card</CardTitle>
          <CardMeta>Card in the default dark theme</CardMeta>
        </Card>
      </div>
      
      <div className="rounded-lg bg-white p-4">
        <h4 className="mb-2 text-sm font-medium text-gray-700">Light Theme</h4>
        <div className="rounded-md border border-gray-200 bg-gray-50 p-4 shadow-sm">
          <h3 className="mb-1 text-lg font-semibold text-gray-900">Light Theme Card</h3>
          <p className="text-sm text-gray-600">Card in light theme variant</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Cards demonstrating different theme variants.',
      },
    },
  },
};

export const Performance: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 12 }, (_, i) => (
        <Card key={i}>
          <CardTitle>Card {i + 1}</CardTitle>
          <CardMeta>Performance test card</CardMeta>
        </Card>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Performance test with multiple cards to ensure efficient rendering.',
      },
    },
  },
};
