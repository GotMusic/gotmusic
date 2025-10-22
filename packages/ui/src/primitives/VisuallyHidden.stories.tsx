import type { Meta, StoryObj } from "@storybook/react";
import { VisuallyHidden } from "./VisuallyHidden";

const meta: Meta<typeof VisuallyHidden> = {
  title: "Components/Primitives/VisuallyHidden",
  component: VisuallyHidden,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A component that hides content visually while keeping it accessible to screen readers and assistive technologies.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "select",
      options: ["span", "div", "p", "a", "button"],
      description: "HTML element to render",
    },
    children: {
      control: "text",
      description: "Content to hide visually but keep accessible",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "This text is hidden visually but accessible to screen readers",
  },
  parameters: {
    docs: {
      description: {
        story: "Basic visually hidden content that is accessible to screen readers.",
      },
    },
  },
};

export const WithIcon: Story = {
  render: () => (
    <button className="flex items-center gap-2 px-4 py-2 bg-brand text-fg-inverse rounded-md hover:bg-brand/90 transition-colors">
      <span aria-hidden="true">▶</span>
      <VisuallyHidden>Play audio preview</VisuallyHidden>
    </button>
  ),
  parameters: {
    docs: {
      description: {
        story: "A button with an icon and visually hidden text for screen readers.",
      },
    },
  },
};

export const SkipLink: Story = {
  render: () => (
    <div>
      <a
        href="#main"
        className="bg-brand text-fg-inverse px-4 py-2 rounded-md focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
      >
        <VisuallyHidden>Skip to main content</VisuallyHidden>
      </a>
      <div id="main" className="mt-8 p-4 border border-border-subtle rounded-md">
        <h2>Main Content</h2>
        <p>This is the main content area that the skip link targets.</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "A skip link that becomes visible when focused for keyboard navigation.",
      },
    },
  },
};

export const FormLabels: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Search</label>
        <div className="relative">
          <input
            type="search"
            placeholder="Search..."
            className="w-full px-3 py-2 pr-10 border border-border-subtle rounded-md bg-bg-muted text-fg focus:outline-none focus:ring-2 focus:ring-brand/50"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1">
            <span aria-hidden="true">🔍</span>
            <VisuallyHidden>Search</VisuallyHidden>
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Close</label>
        <button className="p-2 border border-border-subtle rounded-md hover:bg-muted transition-colors">
          <span aria-hidden="true">×</span>
          <VisuallyHidden>Close dialog</VisuallyHidden>
        </button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Form elements with icons and visually hidden labels for accessibility.",
      },
    },
  },
};

export const A11y: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Screen Reader Only Content</h4>
        <p>
          This paragraph contains{" "}
          <VisuallyHidden>important context that screen readers need</VisuallyHidden> visible text
          that everyone can see.
        </p>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Accessible Button</h4>
        <button className="flex items-center gap-2 px-4 py-2 bg-accent text-fg-inverse rounded-md hover:bg-accent/90 transition-colors">
          <span aria-hidden="true">📧</span>
          <VisuallyHidden>Send email notification</VisuallyHidden>
        </button>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Status Indicator</h4>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-success rounded-full" aria-hidden="true" />
          <span>Online</span>
          <VisuallyHidden>Status: Connected and ready</VisuallyHidden>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Various accessibility patterns using visually hidden content.",
      },
    },
  },
};

export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Empty Content</h4>
        <p>
          This text has <VisuallyHidden>empty hidden content</VisuallyHidden>.
        </p>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Long Content</h4>
        <p>
          This text has{" "}
          <VisuallyHidden>
            A very long piece of hidden content that might wrap or cause layout issues but should be
            handled gracefully by the visually hidden component
          </VisuallyHidden>{" "}
          visible text.
        </p>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Special Characters</h4>
        <p>
          This text has{" "}
          <VisuallyHidden>Hidden content with @#$%^&*() special characters</VisuallyHidden> visible
          text.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Edge cases showing how visually hidden content handles various scenarios.",
      },
    },
  },
};

export const Interactive: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Interactive Elements</h4>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-brand text-fg-inverse rounded-md hover:bg-brand/90 transition-colors"
          onClick={() => alert("Button clicked!")}
        >
          <span aria-hidden="true">🎵</span>
          <VisuallyHidden>Play music track</VisuallyHidden>
        </button>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Focusable Link</h4>
        <a
          href="#interactive"
          className="bg-accent text-fg-inverse px-4 py-2 rounded-md focus:not-sr-only focus:absolute focus:top-4 focus:right-4 focus:z-50"
        >
          <VisuallyHidden>Focus to make visible</VisuallyHidden>
        </a>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Interactive elements with visually hidden content.",
      },
    },
  },
};

export const Theming: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Brand Theme</h4>
        <button type="button" className="flex items-center gap-2 px-4 py-2 bg-brand text-fg-inverse rounded-md hover:bg-brand/90 transition-colors">
          <span aria-hidden="true">⭐</span>
          <VisuallyHidden>Rate this item</VisuallyHidden>
        </button>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Accent Theme</h4>
        <button type="button" className="flex items-center gap-2 px-4 py-2 bg-accent text-fg-inverse rounded-md hover:bg-accent/90 transition-colors">
          <span aria-hidden="true">💾</span>
          <VisuallyHidden>Save changes</VisuallyHidden>
        </button>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Danger Theme</h4>
        <button type="button" className="flex items-center gap-2 px-4 py-2 bg-danger text-white rounded-md hover:bg-danger/90 transition-colors">
          <span aria-hidden="true">🗑️</span>
          <VisuallyHidden>Delete item</VisuallyHidden>
        </button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Visually hidden content with different theme variations.",
      },
    },
  },
};

export const Performance: Story = {
  render: () => (
    <div>
      <p>This paragraph contains many visually hidden elements:</p>
      {Array.from({ length: 20 }, (_, i) => (
        <VisuallyHidden key={`hidden-${i}`}>Hidden content {i + 1} for performance testing</VisuallyHidden>
      ))}
      <p>But the layout remains unaffected.</p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Performance test with many visually hidden elements to ensure efficient rendering.",
      },
    },
  },
};
