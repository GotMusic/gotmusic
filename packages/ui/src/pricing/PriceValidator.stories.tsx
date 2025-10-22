import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { PriceValidator } from "./PriceValidator";

const meta: Meta<typeof PriceValidator> = {
  title: "Pricing/PriceValidator",
  component: PriceValidator,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A validation component for price inputs with customizable rules and visual feedback.",
      },
    },
  },
  argTypes: {
    value: {
      control: { type: "number" },
      description: "The price value to validate",
    },
    showIcon: {
      control: { type: "boolean" },
      description: "Whether to show validation icons",
    },
    showMessage: {
      control: { type: "boolean" },
      description: "Whether to show validation messages",
    },
    inline: {
      control: { type: "boolean" },
      description: "Whether to display inline or stacked",
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof PriceValidator>;

// ============================================================================
// PRIMARY STORIES
// ============================================================================

export const ValidPrice: Story = {
  args: {
    value: 12.99,
    rules: [
      { type: "min", value: 0, message: "Price must be at least $0" },
      { type: "max", value: 1000, message: "Price must not exceed $1000" },
    ],
    showIcon: true,
    showMessage: true,
  },
};

export const InvalidPrice: Story = {
  args: {
    value: -5.0,
    rules: [
      { type: "min", value: 0, message: "Price must be at least $0" },
      { type: "max", value: 1000, message: "Price must not exceed $1000" },
    ],
    showIcon: true,
    showMessage: true,
  },
};

export const TooHighPrice: Story = {
  args: {
    value: 1500.0,
    rules: [
      { type: "min", value: 0, message: "Price must be at least $0" },
      { type: "max", value: 1000, message: "Price must not exceed $1000" },
    ],
    showIcon: true,
    showMessage: true,
  },
};

// ============================================================================
// RULE TYPES
// ============================================================================

export const MinRule: Story = {
  args: {
    value: 5.0,
    rules: [{ type: "min", value: 10, message: "Price must be at least $10" }],
    showIcon: true,
    showMessage: true,
  },
};

export const MaxRule: Story = {
  args: {
    value: 150.0,
    rules: [{ type: "max", value: 100, message: "Price must not exceed $100" }],
    showIcon: true,
    showMessage: true,
  },
};

export const StepRule: Story = {
  args: {
    value: 12.5,
    rules: [{ type: "step", value: 5, message: "Price must be in $5 increments" }],
    showIcon: true,
    showMessage: true,
  },
};

export const CustomRule: Story = {
  args: {
    value: 13.0,
    rules: [
      {
        type: "custom",
        message: "Price must not end in .00 (avoid round numbers)",
        validator: (value) => !Number.isInteger(value),
      },
    ],
    showIcon: true,
    showMessage: true,
  },
};

// ============================================================================
// MULTIPLE RULES
// ============================================================================

export const MultipleRules: Story = {
  args: {
    value: 25.0,
    rules: [
      { type: "min", value: 10, message: "Price must be at least $10" },
      { type: "max", value: 100, message: "Price must not exceed $100" },
      { type: "step", value: 5, message: "Price must be in $5 increments" },
    ],
    showIcon: true,
    showMessage: true,
  },
};

export const ComplexValidation: Story = {
  args: {
    value: 15.99,
    rules: [
      { type: "min", value: 5, message: "Minimum price is $5" },
      { type: "max", value: 500, message: "Maximum price is $500" },
      {
        type: "custom",
        message: "Price must have exactly 2 decimal places",
        validator: (value) => Number(value.toFixed(2)) === value,
      },
    ],
    showIcon: true,
    showMessage: true,
  },
};

// ============================================================================
// DISPLAY OPTIONS
// ============================================================================

export const IconOnly: Story = {
  args: {
    value: 12.99,
    rules: [{ type: "min", value: 0, message: "Price must be at least $0" }],
    showIcon: true,
    showMessage: false,
  },
};

export const MessageOnly: Story = {
  args: {
    value: 12.99,
    rules: [{ type: "min", value: 0, message: "Price must be at least $0" }],
    showIcon: false,
    showMessage: true,
  },
};

export const Inline: Story = {
  args: {
    value: 12.99,
    rules: [{ type: "min", value: 0, message: "Price must be at least $0" }],
    showIcon: true,
    showMessage: true,
    inline: true,
  },
};

// ============================================================================
// SIZE STORIES
// ============================================================================

export const Small: Story = {
  args: {
    value: 12.99,
    rules: [{ type: "min", value: 0, message: "Price must be at least $0" }],
    showIcon: true,
    showMessage: true,
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    value: 12.99,
    rules: [{ type: "min", value: 0, message: "Price must be at least $0" }],
    showIcon: true,
    showMessage: true,
    size: "lg",
  },
};

// ============================================================================
// INTERACTION STORIES
// ============================================================================

export const Interactive: Story = {
  render: () => {
    const [price, setPrice] = React.useState<number | null>(12.99);

    const rules = [
      { type: "min" as const, value: 0, message: "Price must be at least $0" },
      { type: "max" as const, value: 1000, message: "Price must not exceed $1000" },
      { type: "step" as const, value: 0.01, message: "Price must be in $0.01 increments" },
    ];

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="price-validator-input"
            className="block text-sm font-medium text-fg-default"
          >
            Enter Price
          </label>
          <input
            id="price-validator-input"
            type="number"
            value={price || ""}
            onChange={(e) => setPrice(Number.parseFloat(e.target.value) || null)}
            className="w-full px-3 py-2 border border-border-subtle rounded-md bg-bg-elevated text-fg-default focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
            placeholder="Enter price"
            step="0.01"
            min="0"
          />
        </div>
        <PriceValidator value={price} rules={rules} showIcon={true} showMessage={true} />
      </div>
    );
  },
};

// ============================================================================
// ACCESSIBILITY STORIES
// ============================================================================

export const Accessibility: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="price-input" className="block text-sm font-medium text-fg-default">
          Enter price
        </label>
        <input
          id="price-input"
          type="number"
          defaultValue="12.99"
          className="w-full px-3 py-2 border border-border-subtle rounded-md bg-bg-elevated text-fg-default focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
          aria-describedby="price-validation"
        />
      </div>
      <PriceValidator
        id="price-validation"
        value={12.99}
        rules={[
          { type: "min", value: 0, message: "Price must be at least $0" },
          { type: "max", value: 1000, message: "Price must not exceed $1000" },
        ]}
        showIcon={true}
        showMessage={true}
      />
    </div>
  ),
};

// ============================================================================
// EDGE CASES
// ============================================================================

export const NullValue: Story = {
  args: {
    value: null,
    rules: [{ type: "min", value: 0, message: "Price must be at least $0" }],
    showIcon: true,
    showMessage: true,
  },
};

export const ZeroValue: Story = {
  args: {
    value: 0,
    rules: [{ type: "min", value: 0, message: "Price must be at least $0" }],
    showIcon: true,
    showMessage: true,
  },
};

export const VeryLargeNumber: Story = {
  args: {
    value: 999999.99,
    rules: [{ type: "max", value: 1000, message: "Price must not exceed $1000" }],
    showIcon: true,
    showMessage: true,
  },
};
