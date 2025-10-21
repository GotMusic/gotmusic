import { storybookFixtures } from "@gotmusic/fixtures";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile button component with multiple variants, sizes, and states. Built with accessibility in mind and following GotMusic design tokens.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost"],
      description: "Visual style variant of the button",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the button",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    children: {
      control: "text",
      description: "Button content",
    },
    onClick: {
      action: "clicked",
      description: "Click handler function",
    },
  },
  args: {
    children: "Button",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// PRIMARY STORIES (Required by STORYBOOK-GUIDE.md)
// ============================================================================

export const Primary: Story = {
  args: {
    children: "Primary Button",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available button variants with their default styling.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available button sizes from small to large, plus icon size.",
      },
    },
  },
};

export const A11y: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Keyboard Navigation</h3>
        <div className="flex gap-2">
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Use Tab to navigate between buttons, Enter/Space to activate.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Screen Reader Support</h3>
        <Button aria-label="Play music track">▶️</Button>
        <p className="text-xs text-muted-foreground mt-2">
          Button has proper aria-label for screen readers.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Focus Management</h3>
        <Button>Focus me</Button>
        <p className="text-xs text-muted-foreground mt-2">
          Button shows visible focus ring when focused.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Accessibility features including keyboard navigation, screen reader support, and focus management.",
      },
    },
  },
};

export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Disabled State</h3>
        <Button disabled>Disabled Button</Button>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Long Text</h3>
        <Button>This is a very long button text that might wrap</Button>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Empty Content</h3>
        <Button />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Loading State</h3>
        <Button disabled>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
          Loading...
        </Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Edge cases including disabled state, long text, empty content, and loading state.",
      },
    },
  },
};

// ============================================================================
// INTERACTIVE STORIES
// ============================================================================

export const Interactive: Story = {
  render: () => {
    const handleClick = () => {
      alert("Button clicked!");
    };

    return (
      <div className="space-y-4">
        <Button onClick={handleClick}>Click me</Button>
        <Button onClick={handleClick} variant="secondary">
          Secondary click
        </Button>
        <Button onClick={handleClick} variant="ghost">
          Ghost click
        </Button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive buttons with click handlers. Check the Actions panel to see click events.",
      },
    },
  },
};

// ============================================================================
// THEMING STORIES
// ============================================================================

export const Theming: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Light Theme</h3>
        <div className="bg-white p-4 rounded">
          <Button>Light Theme Button</Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Dark Theme</h3>
        <div className="bg-gray-900 p-4 rounded">
          <Button>Dark Theme Button</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Button appearance in different theme contexts.",
      },
    },
  },
};

// ============================================================================
// PERFORMANCE STORIES (e18e Standards)
// ============================================================================

export const Performance: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Bundle Size</h3>
        <p className="text-xs text-muted-foreground mb-2">
          Button component is optimized for minimal bundle size.
        </p>
        <Button>Optimized Button</Button>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Tree Shaking</h3>
        <p className="text-xs text-muted-foreground mb-2">
          Only imported variants are included in the bundle.
        </p>
        <Button variant="secondary">Tree-shakeable</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Performance optimizations following e18e standards including bundle size and tree shaking.",
      },
    },
  },
};
