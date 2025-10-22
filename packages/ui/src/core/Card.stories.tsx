import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "./Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Core/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "elevated", "interactive", "disabled"],
    },
    padding: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-fg-muted">
          This is the card content. It can contain any React elements.
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const Elevated: Story = {
  render: () => (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>Elevated Card</CardTitle>
        <CardDescription>This card has a subtle shadow</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-fg-muted">
          Elevated cards are great for highlighting important content.
        </p>
      </CardContent>
    </Card>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [clicked, setClicked] = useState(false);

    return (
      <Card variant="interactive" onClick={() => setClicked(!clicked)} className="max-w-sm">
        <CardHeader>
          <CardTitle>Interactive Card</CardTitle>
          <CardDescription>Click me to toggle state</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-fg-muted">
            {clicked ? "Card was clicked!" : "Click anywhere on this card"}
          </p>
        </CardContent>
      </Card>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <Card variant="disabled">
      <CardHeader>
        <CardTitle>Disabled Card</CardTitle>
        <CardDescription>This card is disabled</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-fg-muted">
          Disabled cards are not interactive and have reduced opacity.
        </p>
      </CardContent>
    </Card>
  ),
};

export const PaddingVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">No Padding</h4>
        <Card padding="none" className="max-w-sm">
          <div className="p-4 bg-bg-subtle">
            <p className="text-sm">Content with manual padding</p>
          </div>
        </Card>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Small Padding</h4>
        <Card padding="sm" className="max-w-sm">
          <p className="text-sm">Small padding content</p>
        </Card>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Medium Padding (Default)</h4>
        <Card padding="md" className="max-w-sm">
          <p className="text-sm">Medium padding content</p>
        </Card>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Large Padding</h4>
        <Card padding="lg" className="max-w-sm">
          <p className="text-sm">Large padding content</p>
        </Card>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Default</CardTitle>
          <CardDescription>Standard card appearance</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-fg-muted">Default card content</p>
        </CardContent>
      </Card>

      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Elevated</CardTitle>
          <CardDescription>With subtle shadow</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-fg-muted">Elevated card content</p>
        </CardContent>
      </Card>

      <Card variant="interactive" onClick={() => {}}>
        <CardHeader>
          <CardTitle>Interactive</CardTitle>
          <CardDescription>Clickable card</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-fg-muted">Interactive card content</p>
        </CardContent>
      </Card>

      <Card variant="disabled">
        <CardHeader>
          <CardTitle>Disabled</CardTitle>
          <CardDescription>Non-interactive</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-fg-muted">Disabled card content</p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const ComplexContent: Story = {
  render: () => (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription>Manage your account settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <span className="text-fg-inverse font-medium">JD</span>
          </div>
          <div>
            <h4 className="font-medium">John Doe</h4>
            <p className="text-sm text-fg-muted">john@example.com</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-fg-muted">Last login</span>
            <span className="text-sm">2 hours ago</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-fg-muted">Status</span>
            <span className="text-sm text-success">Active</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button size="sm">Save Changes</Button>
      </CardFooter>
    </Card>
  ),
};

export const A11y: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Keyboard Navigation</h4>
        <p className="text-sm text-fg-muted mb-4">
          Interactive cards can be focused and activated with keyboard
        </p>
        <div className="space-y-2">
          <Card variant="interactive" onClick={() => {}}>
            <CardContent>
              <p className="text-sm">Press Tab to focus, Enter/Space to activate</p>
            </CardContent>
          </Card>
          <Card variant="interactive" onClick={() => {}}>
            <CardContent>
              <p className="text-sm">Another interactive card</p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Screen Reader Support</h4>
        <p className="text-sm text-fg-muted mb-4">
          Cards have proper semantic structure and ARIA attributes
        </p>
        <Card>
          <CardHeader>
            <CardTitle>Accessible Card</CardTitle>
            <CardDescription>This card is properly structured for screen readers</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-fg-muted">
              Screen readers will announce the title, description, and content in order.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Empty Card</h4>
        <Card>
          <CardContent>
            <p className="text-sm text-fg-muted">Just content, no header or footer</p>
          </CardContent>
        </Card>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Long Content</h4>
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Long Content Card</CardTitle>
            <CardDescription>
              This card has a very long description that might wrap to multiple lines and test the
              layout
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-fg-muted">
              This is a very long content that might wrap to multiple lines and test how the card
              handles overflow and text wrapping in different scenarios.
            </p>
          </CardContent>
        </Card>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">No Padding</h4>
        <Card padding="none" className="max-w-sm">
          <div className="p-4 bg-bg-subtle">
            <h4 className="font-medium">Custom Layout</h4>
            <p className="text-sm text-fg-muted">Content with custom padding</p>
          </div>
        </Card>
      </div>
    </div>
  ),
};
