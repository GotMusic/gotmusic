import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { PriceRange } from "./PriceRange";

const meta: Meta<typeof PriceRange> = {
  title: "Pricing/PriceRange",
  component: PriceRange,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A dual-handle range slider for selecting price ranges with currency formatting and keyboard support.",
      },
    },
  },
  argTypes: {
    min: {
      control: { type: "number" },
      description: "Minimum value of the range",
    },
    max: {
      control: { type: "number" },
      description: "Maximum value of the range",
    },
    value: {
      control: { type: "object" },
      description: "Current range value [min, max]",
    },
    step: {
      control: { type: "number" },
      description: "Step size for the range",
    },
    currency: {
      control: { type: "text" },
      description: "Currency code for formatting",
    },
    locale: {
      control: { type: "text" },
      description: "Locale for number formatting",
    },
    showLabels: {
      control: { type: "boolean" },
      description: "Whether to show labels",
    },
    showValues: {
      control: { type: "boolean" },
      description: "Whether to show current values",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the range is disabled",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "muted"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof PriceRange>;

// ============================================================================
// PRIMARY STORIES
// ============================================================================

export const Default: Story = {
  args: {
    min: 0,
    max: 1000,
    value: [100, 500],
    currency: "PYUSD",
    showLabels: true,
    showValues: true,
  },
};

export const WithoutLabels: Story = {
  args: {
    min: 0,
    max: 1000,
    value: [100, 500],
    currency: "PYUSD",
    showLabels: false,
    showValues: true,
  },
};

export const WithoutValues: Story = {
  args: {
    min: 0,
    max: 1000,
    value: [100, 500],
    currency: "PYUSD",
    showLabels: true,
    showValues: false,
  },
};

// ============================================================================
// CURRENCY STORIES
// ============================================================================

export const USDCurrency: Story = {
  args: {
    min: 0,
    max: 1000,
    value: [50, 200],
    currency: "USD",
    showLabels: true,
    showValues: true,
  },
};

export const EuroCurrency: Story = {
  args: {
    min: 0,
    max: 1000,
    value: [50, 200],
    currency: "EUR",
    showLabels: true,
    showValues: true,
  },
};

// ============================================================================
// RANGE STORIES
// ============================================================================

export const SmallRange: Story = {
  args: {
    min: 0,
    max: 100,
    value: [20, 80],
    currency: "PYUSD",
    showLabels: true,
    showValues: true,
  },
};

export const LargeRange: Story = {
  args: {
    min: 0,
    max: 10000,
    value: [1000, 5000],
    currency: "PYUSD",
    showLabels: true,
    showValues: true,
  },
};

export const DecimalStep: Story = {
  args: {
    min: 0,
    max: 100,
    value: [10.5, 50.25],
    step: 0.25,
    currency: "PYUSD",
    showLabels: true,
    showValues: true,
  },
};

// ============================================================================
// SIZE STORIES
// ============================================================================

export const Small: Story = {
  args: {
    min: 0,
    max: 1000,
    value: [100, 500],
    currency: "PYUSD",
    size: "sm",
    showLabels: true,
    showValues: true,
  },
};

export const Large: Story = {
  args: {
    min: 0,
    max: 1000,
    value: [100, 500],
    currency: "PYUSD",
    size: "lg",
    showLabels: true,
    showValues: true,
  },
};

// ============================================================================
// DISABLED STATE
// ============================================================================

export const Disabled: Story = {
  args: {
    min: 0,
    max: 1000,
    value: [100, 500],
    currency: "PYUSD",
    disabled: true,
    showLabels: true,
    showValues: true,
  },
};

// ============================================================================
// INTERACTION STORIES
// ============================================================================

export const Interactive: Story = {
  render: () => {
    const [range, setRange] = React.useState<[number, number]>([100, 500]);

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="interactive-price-range"
            className="block text-sm font-medium text-fg-default"
          >
            Price Range
          </label>
          <PriceRange
            min={0}
            max={1000}
            value={range}
            onChange={setRange}
            currency="PYUSD"
            showLabels={true}
            showValues={true}
          />
        </div>
        <div className="text-sm text-fg-muted">
          Selected range: ${range[0]} - ${range[1]}
        </div>
      </div>
    );
  },
};

export const WithCustomStep: Story = {
  render: () => {
    const [range, setRange] = React.useState<[number, number]>([10, 50]);

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="custom-step-price-range"
            className="block text-sm font-medium text-fg-default"
          >
            Price Range (Step: $5)
          </label>
          <PriceRange
            min={0}
            max={100}
            value={range}
            onChange={setRange}
            step={5}
            currency="PYUSD"
            showLabels={true}
            showValues={true}
          />
        </div>
        <div className="text-sm text-fg-muted">
          Selected range: ${range[0]} - ${range[1]} (in $5 increments)
        </div>
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
        <label htmlFor="price-range" className="block text-sm font-medium text-fg-default">
          Select price range
        </label>
        <PriceRange
          min={0}
          max={1000}
          value={[100, 500]}
          currency="PYUSD"
          showLabels={true}
          showValues={true}
          aria-label="Price range selector"
        />
      </div>
      <div className="text-sm text-fg-muted">
        This range slider supports keyboard navigation and screen readers.
      </div>
    </div>
  ),
};

// ============================================================================
// EDGE CASES
// ============================================================================

export const MinimumRange: Story = {
  args: {
    min: 0,
    max: 1000,
    value: [0, 0],
    currency: "PYUSD",
    showLabels: true,
    showValues: true,
  },
};

export const MaximumRange: Story = {
  args: {
    min: 0,
    max: 1000,
    value: [1000, 1000],
    currency: "PYUSD",
    showLabels: true,
    showValues: true,
  },
};

export const FullRange: Story = {
  args: {
    min: 0,
    max: 1000,
    value: [0, 1000],
    currency: "PYUSD",
    showLabels: true,
    showValues: true,
  },
};

export const NegativeRange: Story = {
  args: {
    min: -100,
    max: 100,
    value: [-50, 50],
    currency: "PYUSD",
    showLabels: true,
    showValues: true,
  },
};

export const HighPrecision: Story = {
  args: {
    min: 0,
    max: 100,
    value: [12.34, 56.78],
    step: 0.01,
    currency: "PYUSD",
    showLabels: true,
    showValues: true,
  },
};
