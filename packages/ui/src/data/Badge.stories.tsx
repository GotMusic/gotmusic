import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Data/Badge",
  component: Badge,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A versatile badge component for displaying status, labels, and categorical information.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["success", "warning", "danger", "info", "neutral"],
      description: "Visual variant of the badge",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the badge",
    },
    children: {
      control: "text",
      description: "Text content of the badge",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Badge",
    variant: "neutral",
  },
  parameters: {
    docs: {
      description: {
        story: "A basic badge with neutral styling.",
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="neutral">Neutral</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available badge variants showing different semantic meanings.",
      },
    },
  },
};

export const WithContent: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Badge variant="success">Active</Badge>
        <Badge variant="warning">Pending</Badge>
        <Badge variant="danger">Error</Badge>
        <Badge variant="info">New</Badge>
        <Badge variant="neutral">Default</Badge>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="success">✓ Verified</Badge>
        <Badge variant="warning">⚠ In Review</Badge>
        <Badge variant="danger">✗ Failed</Badge>
        <Badge variant="info">ℹ Info</Badge>
        <Badge variant="neutral">• Status</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Badges with various content types including icons and text.",
      },
    },
  },
};

export const A11y: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="mb-2 text-sm font-medium text-fg/80">Accessible Badges</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success" aria-label="Status: Success">
            Success
          </Badge>
          <Badge variant="warning" aria-label="Status: Warning">
            Warning
          </Badge>
          <Badge variant="danger" role="alert" aria-label="Error: Danger">
            Error
          </Badge>
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium text-fg/80">Interactive Badges</h4>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant="info"
            className="cursor-pointer hover:opacity-80 focus:ring-2 focus:ring-blue-500/50"
            aria-label="Click to filter by info"
          >
            Filter: Info
          </Badge>
          <Badge
            variant="neutral"
            className="cursor-pointer hover:opacity-80 focus:ring-2 focus:ring-gray-500/50"
            aria-label="Click to filter by neutral"
          >
            Filter: All
          </Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Badges with proper accessibility attributes and interactive states.",
      },
    },
  },
};

export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="mb-2 text-sm font-medium text-fg/80">Long Text</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">Very Long Badge Text That Might Wrap</Badge>
          <Badge variant="warning">Another Long Badge</Badge>
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium text-fg/80">Empty Content</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success" />
          <Badge variant="warning"> </Badge>
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium text-fg/80">Special Characters</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="info">@username</Badge>
          <Badge variant="neutral">#hashtag</Badge>
          <Badge variant="success">$100</Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Edge cases showing how badges handle various content scenarios.",
      },
    },
  },
};

export const Interactive: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="mb-2 text-sm font-medium text-fg/80">Clickable Badges</h4>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant="success"
            className="cursor-pointer hover:opacity-80 active:scale-95 transition-all"
            onClick={() => alert("Success badge clicked!")}
          >
            Click Me
          </Badge>
          <Badge
            variant="info"
            className="cursor-pointer hover:opacity-80 active:scale-95 transition-all"
            onClick={() => alert("Info badge clicked!")}
          >
            Interactive
          </Badge>
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium text-fg/80">Removable Badges</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success" className="group cursor-pointer hover:opacity-80">
            Tag 1 <span className="ml-1 opacity-0 group-hover:opacity-100">×</span>
          </Badge>
          <Badge variant="warning" className="group cursor-pointer hover:opacity-80">
            Tag 2 <span className="ml-1 opacity-0 group-hover:opacity-100">×</span>
          </Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Interactive badges demonstrating click handlers and hover states.",
      },
    },
  },
};

export const Theming: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="mb-2 text-sm font-medium text-fg/80">Custom Styling</h4>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success" className="bg-purple-500 hover:bg-purple-600">
            Custom Purple
          </Badge>
          <Badge variant="info" className="bg-gradient-to-r from-pink-500 to-purple-500">
            Gradient
          </Badge>
          <Badge variant="neutral" className="border-2 border-dashed border-gray-400">
            Dashed Border
          </Badge>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Badges with custom styling and theme variations.",
      },
    },
  },
};

export const Performance: Story = {
  render: () => (
    <div className="flex flex-wrap gap-1">
      {Array.from({ length: 50 }, (_, i) => (
        <Badge
          key={`badge-${i + 1}`}
          variant={
            ["success", "warning", "danger", "info", "neutral"][i % 5] as
              | "success"
              | "warning"
              | "danger"
              | "info"
              | "neutral"
          }
        >
          Badge {i + 1}
        </Badge>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Performance test with many badges to ensure efficient rendering.",
      },
    },
  },
};
