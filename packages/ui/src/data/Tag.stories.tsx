import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./Tag";

const meta: Meta<typeof Tag> = {
  title: "Components/Data/Tag",
  component: Tag,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "A tag component for displaying labels with optional close functionality.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the tag",
    },
    children: {
      control: "text",
      description: "Text content of the tag",
    },
    onClose: {
      action: "close",
      description: "Function called when the close button is clicked",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Tag",
  },
  parameters: {
    docs: {
      description: {
        story: "A basic tag without close functionality.",
      },
    },
  },
};

export const WithClose: Story = {
  args: {
    children: "Removable Tag",
    onClose: () => alert("Tag closed!"),
  },
  parameters: {
    docs: {
      description: {
        story: "A tag with close functionality that can be removed.",
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag>Default Tag</Tag>
      <Tag onClose={() => alert("Removed!")}>Removable Tag</Tag>
      <Tag className="bg-brand/10 text-brand hover:bg-brand/20">Brand Tag</Tag>
      <Tag className="bg-success/10 text-success hover:bg-success/20">Success Tag</Tag>
      <Tag className="bg-warning/10 text-warning hover:bg-warning/20">Warning Tag</Tag>
      <Tag className="bg-danger/10 text-danger hover:bg-danger/20">Danger Tag</Tag>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different tag variants showing various styling options.",
      },
    },
  },
};

export const WithContent: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Tag>React</Tag>
        <Tag>TypeScript</Tag>
        <Tag>Storybook</Tag>
        <Tag onClose={() => alert("Removed!")}>Removable</Tag>
      </div>

      <div className="flex flex-wrap gap-2">
        <Tag>#hashtag</Tag>
        <Tag>@username</Tag>
        <Tag>$100</Tag>
        <Tag>✓ Verified</Tag>
      </div>

      <div className="flex flex-wrap gap-2">
        <Tag>Long Tag Name That Might Wrap</Tag>
        <Tag>Short</Tag>
        <Tag>Medium Length Tag</Tag>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tags with various content types and lengths.",
      },
    },
  },
};

export const A11y: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="mb-2 text-sm font-medium text-fg/80">Accessible Tags</h4>
        <div className="flex flex-wrap gap-2">
          <Tag aria-label="Filter by React">
            React
          </Tag>
          <Tag
            onClose={() => alert("Removed!")}
            aria-label="Remove TypeScript tag"
          >
            TypeScript
          </Tag>
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium text-fg/80">Keyboard Navigation</h4>
        <div className="flex flex-wrap gap-2">
          <Tag
            className="focus:ring-2 focus:ring-brand/50 focus:outline-none"
          >
            Focusable Tag
          </Tag>
          <Tag
            onClose={() => alert("Removed!")}
            className="focus:ring-2 focus:ring-brand/50 focus:outline-none"
          >
            Focusable Removable
          </Tag>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tags with proper accessibility attributes and keyboard navigation.",
      },
    },
  },
};

export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="mb-2 text-sm font-medium text-fg/80">Empty Content</h4>
        <div className="flex flex-wrap gap-2">
          <Tag />
          <Tag onClose={() => alert("Removed!")} />
          <Tag> </Tag>
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium text-fg/80">Special Characters</h4>
        <div className="flex flex-wrap gap-2">
          <Tag>@#$%^&*()</Tag>
          <Tag>🚀🎉✨</Tag>
          <Tag>中文</Tag>
          <Tag>العربية</Tag>
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium text-fg/80">Very Long Content</h4>
        <div className="flex flex-wrap gap-2">
          <Tag>
            This is a very long tag that might cause layout issues and should be handled gracefully
          </Tag>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Edge cases showing how tags handle various content scenarios.",
      },
    },
  },
};

export const Interactive: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="mb-2 text-sm font-medium text-fg/80">Clickable Tags</h4>
        <div className="flex flex-wrap gap-2">
          <Tag
            className="cursor-pointer hover:bg-fg/30 active:scale-95 transition-all"
            onClick={() => alert("Tag clicked!")}
          >
            Click Me
          </Tag>
          <Tag
            className="cursor-pointer hover:bg-fg/30 active:scale-95 transition-all"
            onClick={() => alert("Another tag clicked!")}
          >
            Interactive
          </Tag>
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium text-fg/80">Removable Tags</h4>
        <div className="flex flex-wrap gap-2">
          <Tag onClose={() => alert("Tag 1 removed!")}>Tag 1</Tag>
          <Tag onClose={() => alert("Tag 2 removed!")}>Tag 2</Tag>
          <Tag onClose={() => alert("Tag 3 removed!")}>Tag 3</Tag>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Interactive tags demonstrating click handlers and close functionality.",
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
          <Tag className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600">
            Gradient Tag
          </Tag>
          <Tag className="border-2 border-dashed border-gray-400 bg-transparent">Dashed Border</Tag>
          <Tag className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Custom Colors</Tag>
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium text-fg/80">Size Variants</h4>
        <div className="flex flex-wrap items-center gap-2">
          <Tag className="text-xs px-1.5 py-0.5">Small</Tag>
          <Tag>Default</Tag>
          <Tag className="text-base px-3 py-1.5">Large</Tag>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tags with custom styling and theme variations.",
      },
    },
  },
};

export const Performance: Story = {
  render: () => (
    <div className="flex flex-wrap gap-1">
      {Array.from({ length: 100 }, (_, i) => (
        <Tag key={`tag-${i + 1}`} onClose={i % 3 === 0 ? () => alert(`Removed tag ${i + 1}`) : undefined}>
          Tag {i + 1}
        </Tag>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Performance test with many tags to ensure efficient rendering.",
      },
    },
  },
};
