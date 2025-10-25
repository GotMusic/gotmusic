import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Core/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "danger", "ghost", "outline"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "icon"],
    },
    loading: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
    size: "md",
  },
};

export const PrimaryBold: Story = {
  render: () => {
    const [clicked, setClicked] = useState(false);
    const [hovered, setHovered] = useState(false);

    const handleClick = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 1000);
    };

    return (
      <div className="space-y-6">
        <div className="p-4 bg-bg-elevated rounded-lg border border-border-subtle">
          <h4 className="text-lg font-bold text-fg mb-2">Primary Button with Bold Font</h4>
          <p className="text-sm text-fg-muted mb-4">
            This button uses <code className="bg-bg-subtle px-1 rounded">font-semibold</code> for bold text and enhanced interactions
          </p>
          <div className="flex items-center gap-4">
            <Button 
              variant="primary" 
              size="lg"
              onClick={handleClick}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="font-bold"
            >
              🎵 Create Track
            </Button>
            <div className="text-sm text-fg-muted">
              <p>Clicked: {clicked ? "✅ Yes!" : "❌ No"}</p>
              <p>Hovered: {hovered ? "✅ Yes!" : "❌ No"}</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h5 className="text-sm font-semibold text-fg">Size Variants</h5>
            <div className="space-y-2">
              <Button variant="primary" size="sm" className="font-bold">Small Bold</Button>
              <Button variant="primary" size="md" className="font-bold">Medium Bold</Button>
              <Button variant="primary" size="lg" className="font-bold">Large Bold</Button>
            </div>
          </div>
          
          <div className="space-y-3">
            <h5 className="text-sm font-semibold text-fg">Interactive States</h5>
            <div className="space-y-2">
              <Button variant="primary" className="font-bold">Normal State</Button>
              <Button variant="primary" loading className="font-bold">Loading State</Button>
              <Button variant="primary" disabled className="font-bold">Disabled State</Button>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const Secondary: Story = {
  args: {
    children: "Button",
    variant: "secondary",
    size: "md",
  },
};

export const Danger: Story = {
  args: {
    children: "Delete",
    variant: "danger",
    size: "md",
  },
};

export const Ghost: Story = {
  args: {
    children: "Button",
    variant: "ghost",
    size: "md",
  },
};

export const Outline: Story = {
  args: {
    children: "Button",
    variant: "outline",
    size: "md",
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
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button leftIcon={<span>←</span>}>Back</Button>
      <Button rightIcon={<span>→</span>}>Next</Button>
      <Button leftIcon={<span>+</span>} rightIcon={<span>→</span>}>
        Create
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button loading>Loading...</Button>
      <Button loading variant="secondary">
        Loading...
      </Button>
      <Button loading variant="danger">
        Deleting...
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button disabled>Disabled</Button>
      <Button disabled variant="secondary">
        Disabled
      </Button>
      <Button disabled variant="danger">
        Disabled
      </Button>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hovered, setHovered] = useState(false);

    const handleClick = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setCount((prev) => prev + 1);
      setLoading(false);
    };

    return (
      <div className="space-y-4">
        <div className="p-4 bg-bg-subtle rounded-lg">
          <p className="text-sm text-fg-muted mb-2">Interactive Demo</p>
          <p className="text-sm text-fg-muted">Count: {count}</p>
          <p className="text-sm text-fg-muted">Hovered: {hovered ? "Yes" : "No"}</p>
        </div>
        <Button 
          loading={loading} 
          onClick={handleClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {loading ? "Loading..." : "Click me"}
        </Button>
        <p className="text-xs text-fg-muted">
          Hover over the button to see cursor pointer and hover effects
        </p>
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Primary</h4>
        <div className="flex gap-2">
          <Button variant="primary" size="sm">
            Small
          </Button>
          <Button variant="primary" size="md">
            Medium
          </Button>
          <Button variant="primary" size="lg">
            Large
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Secondary</h4>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">
            Small
          </Button>
          <Button variant="secondary" size="md">
            Medium
          </Button>
          <Button variant="secondary" size="lg">
            Large
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Danger</h4>
        <div className="flex gap-2">
          <Button variant="danger" size="sm">
            Small
          </Button>
          <Button variant="danger" size="md">
            Medium
          </Button>
          <Button variant="danger" size="lg">
            Large
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Ghost</h4>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            Small
          </Button>
          <Button variant="ghost" size="md">
            Medium
          </Button>
          <Button variant="ghost" size="lg">
            Large
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Outline</h4>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Small
          </Button>
          <Button variant="outline" size="md">
            Medium
          </Button>
          <Button variant="outline" size="lg">
            Large
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Icon Buttons</h4>
        <div className="flex gap-2">
          <Button size="icon" variant="primary">
            +
          </Button>
          <Button size="icon" variant="secondary">
            -
          </Button>
          <Button size="icon" variant="danger">
            ×
          </Button>
        </div>
      </div>
    </div>
  ),
};

export const A11y: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Keyboard Navigation</h4>
        <p className="text-sm text-fg-muted mb-4">
          Use Tab to navigate between buttons, Enter/Space to activate
        </p>
        <div className="flex gap-2">
          <Button>First</Button>
          <Button>Second</Button>
          <Button>Third</Button>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Screen Reader Support</h4>
        <p className="text-sm text-fg-muted mb-4">Buttons have proper ARIA labels and states</p>
        <div className="flex gap-2">
          <Button aria-label="Save document">💾</Button>
          <Button aria-label="Delete item">🗑️</Button>
          <Button aria-label="Edit settings">⚙️</Button>
        </div>
      </div>
    </div>
  ),
};

export const HoverStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium mb-4">Hover States Demo</h4>
        <p className="text-sm text-fg-muted mb-4">
          Hover over each button to see the cursor pointer and hover effects
        </p>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary Hover</Button>
          <Button variant="secondary">Secondary Hover</Button>
          <Button variant="danger">Danger Hover</Button>
          <Button variant="ghost">Ghost Hover</Button>
          <Button variant="outline">Outline Hover</Button>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-4">Cursor States</h4>
        <div className="flex flex-wrap gap-4">
          <Button>Normal (cursor-pointer)</Button>
          <Button loading>Loading (cursor-wait)</Button>
          <Button disabled>Disabled (no cursor)</Button>
        </div>
      </div>
    </div>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Long Text</h4>
        <Button>This is a very long button text that might wrap</Button>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Empty Button</h4>
        <Button />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Loading with Icons</h4>
        <Button loading leftIcon={<span>💾</span>}>
          Saving...
        </Button>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Disabled Loading</h4>
        <Button disabled loading>
          Disabled Loading
        </Button>
      </div>
    </div>
  ),
};
