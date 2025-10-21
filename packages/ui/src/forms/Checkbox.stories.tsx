import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Forms/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "A checkbox component built on Radix UI primitives with customizable styling.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant of the checkbox",
    },
    checked: {
      control: "boolean",
      description: "Whether the checkbox is checked",
    },
    disabled: {
      control: "boolean",
      description: "Whether the checkbox is disabled",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the checkbox",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    checked: false,
  },
  parameters: {
    docs: {
      description: {
        story: "A basic unchecked checkbox.",
      },
    },
  },
};

export const Checked: Story = {
  args: {
    checked: true,
  },
  parameters: {
    docs: {
      description: {
        story: "A checked checkbox.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Checkbox size="sm" />
        <label className="text-sm">Small</label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox size="md" />
        <label className="text-sm">Medium</label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox size="lg" />
        <label className="text-sm">Large</label>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different size variants of the checkbox.",
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Checkbox />
        <label className="text-sm">Unchecked</label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox checked />
        <label className="text-sm">Checked</label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox disabled />
        <label className="text-sm text-fg/50">Disabled Unchecked</label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox checked disabled />
        <label className="text-sm text-fg/50">Disabled Checked</label>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different states of the checkbox including disabled variants.",
      },
    },
  },
};

export const WithLabels: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Checkbox id="terms" />
        <label htmlFor="terms" className="text-sm cursor-pointer">
          I agree to the terms and conditions
        </label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="newsletter" checked />
        <label htmlFor="newsletter" className="text-sm cursor-pointer">
          Subscribe to newsletter
        </label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="notifications" />
        <label htmlFor="notifications" className="text-sm cursor-pointer">
          Enable push notifications
        </label>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Checkboxes with proper labels for accessibility.",
      },
    },
  },
};

export const A11y: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="mb-2 text-sm font-medium text-fg/80">Keyboard Navigation</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox id="keyboard-1" />
            <label htmlFor="keyboard-1" className="text-sm">
              Tab to focus, Space to toggle
            </label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="keyboard-2" />
            <label htmlFor="keyboard-2" className="text-sm">
              Arrow keys for navigation
            </label>
          </div>
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium text-fg/80">Screen Reader Support</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox id="sr-1" aria-describedby="sr-1-help" />
            <label htmlFor="sr-1" className="text-sm">
              Checkbox with description
            </label>
          </div>
          <p id="sr-1-help" className="text-xs text-fg/60">
            This checkbox has additional help text for screen readers
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Checkboxes with proper accessibility features and screen reader support.",
      },
    },
  },
};

export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="mb-2 text-sm font-medium text-fg/80">Indeterminate State</h4>
        <div className="flex items-center gap-2">
          <Checkbox checked="indeterminate" aria-label="Partially selected items" />
          <label className="text-sm">Some items selected</label>
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium text-fg/80">Required Fields</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox id="required" required />
            <label htmlFor="required" className="text-sm">
              Required checkbox <span className="text-danger">*</span>
            </label>
          </div>
        </div>
      </div>

      <div>
        <h4 className="mb-2 text-sm font-medium text-fg/80">Custom Styling</h4>
        <div className="flex items-center gap-2">
          <Checkbox className="border-danger data-[state=checked]:bg-danger data-[state=checked]:border-danger" />
          <label className="text-sm">Custom danger styling</label>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Edge cases showing various checkbox scenarios and customizations.",
      },
    },
  },
};

export const Interactive: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="mb-2 text-sm font-medium text-fg/80">Interactive Examples</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="interactive-1"
              onChange={(checked) => }
            />
            <label htmlFor="interactive-1" className="text-sm cursor-pointer">
              Click to toggle (check console)
            </label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="interactive-2"
              onCheckedChange={(checked) => alert(`Checkbox 2: ${checked}`)}
            />
            <label htmlFor="interactive-2" className="text-sm cursor-pointer">
              Click to see alert
            </label>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Interactive checkboxes demonstrating event handlers.",
      },
    },
  },
};

export const Theming: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="mb-2 text-sm font-medium text-fg/80">Custom Colors</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox className="border-success data-[state=checked]:bg-success data-[state=checked]:border-success" />
            <label className="text-sm">Success variant</label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox className="border-warning data-[state=checked]:bg-warning data-[state=checked]:border-warning" />
            <label className="text-sm">Warning variant</label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox className="border-danger data-[state=checked]:bg-danger data-[state=checked]:border-danger" />
            <label className="text-sm">Danger variant</label>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Checkboxes with custom color theming.",
      },
    },
  },
};

export const Performance: Story = {
  render: () => (
    <div className="space-y-2">
      {Array.from({ length: 20 }, (_, i) => (
        <div key={i} className="flex items-center gap-2">
          <Checkbox id={`perf-${i}`} />
          <label htmlFor={`perf-${i}`} className="text-sm">
            Performance test checkbox {i + 1}
          </label>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Performance test with many checkboxes to ensure efficient rendering.",
      },
    },
  },
};
