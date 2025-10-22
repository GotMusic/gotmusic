import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { PriceInput } from "./PriceInput";

const meta: Meta<typeof PriceInput> = {
  title: "Pricing/PriceInput",
  component: PriceInput,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A specialized input component for price values with currency support and validation.",
      },
    },
  },
  argTypes: {
    value: {
      control: { type: "number" },
      description: "The current price value",
    },
    currency: {
      control: { type: "text" },
      description: "Currency code (e.g., PYUSD, USD, EUR)",
    },
    locale: {
      control: { type: "text" },
      description: "Locale for number formatting",
    },
    showCurrency: {
      control: { type: "boolean" },
      description: "Whether to show the currency code",
    },
    allowNegative: {
      control: { type: "boolean" },
      description: "Whether to allow negative values",
    },
    precision: {
      control: { type: "number", min: 0, max: 4 },
      description: "Number of decimal places",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the input is disabled",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "error", "success"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof PriceInput>;

// ============================================================================
// PRIMARY STORIES
// ============================================================================

export const Default: Story = {
  args: {
    value: 12.99,
    currency: "PYUSD",
    showCurrency: true,
    precision: 2,
  },
};

export const WithDifferentCurrency: Story = {
  args: {
    value: 15.99,
    currency: "USD",
    showCurrency: true,
    precision: 2,
  },
};

export const WithoutCurrency: Story = {
  args: {
    value: 25.5,
    showCurrency: false,
    precision: 2,
  },
};

// ============================================================================
// VARIANT STORIES
// ============================================================================

export const ErrorState: Story = {
  args: {
    value: -5.0,
    currency: "PYUSD",
    variant: "error",
    showCurrency: true,
  },
};

export const Success: Story = {
  args: {
    value: 99.99,
    currency: "PYUSD",
    variant: "success",
    showCurrency: true,
  },
};

// ============================================================================
// SIZE STORIES
// ============================================================================

export const Small: Story = {
  args: {
    value: 12.99,
    currency: "PYUSD",
    size: "sm",
    showCurrency: true,
  },
};

export const Large: Story = {
  args: {
    value: 12.99,
    currency: "PYUSD",
    size: "lg",
    showCurrency: true,
  },
};

// ============================================================================
// PRECISION STORIES
// ============================================================================

export const HighPrecision: Story = {
  args: {
    value: 12.9999,
    currency: "PYUSD",
    precision: 4,
    showCurrency: true,
  },
};

export const NoDecimals: Story = {
  args: {
    value: 12,
    currency: "PYUSD",
    precision: 0,
    showCurrency: true,
  },
};

// ============================================================================
// NEGATIVE VALUES
// ============================================================================

export const AllowNegative: Story = {
  args: {
    value: -5.0,
    currency: "PYUSD",
    allowNegative: true,
    showCurrency: true,
  },
};

// ============================================================================
// DISABLED STATE
// ============================================================================

export const Disabled: Story = {
  args: {
    value: 12.99,
    currency: "PYUSD",
    disabled: true,
    showCurrency: true,
  },
};

// ============================================================================
// INTERACTION STORIES
// ============================================================================

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = React.useState<number | null>(12.99);
    const [currency, setCurrency] = React.useState("PYUSD");

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="interactive-price-input"
            className="block text-sm font-medium text-fg-default"
          >
            Price Input
          </label>
          <PriceInput
            id="interactive-price-input"
            value={value}
            currency={currency}
            onChange={setValue}
            onCurrencyChange={setCurrency}
            showCurrency={true}
            precision={2}
          />
        </div>
        <div className="text-sm text-fg-muted">
          Current value: {value !== null ? value.toFixed(2) : "null"} {currency}
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
        <label htmlFor="price-input" className="block text-sm font-medium text-fg-default">
          Enter price
        </label>
        <PriceInput
          id="price-input"
          value={12.99}
          currency="PYUSD"
          showCurrency={true}
          aria-label="Price in PYUSD"
        />
      </div>
      <div className="text-sm text-fg-muted">
        This input supports keyboard navigation and screen readers.
      </div>
    </div>
  ),
};

// ============================================================================
// EDGE CASES
// ============================================================================

export const ZeroValue: Story = {
  args: {
    value: 0,
    currency: "PYUSD",
    showCurrency: true,
  },
};

export const VeryLargeNumber: Story = {
  args: {
    value: 999999.99,
    currency: "PYUSD",
    showCurrency: true,
  },
};

export const EmptyValue: Story = {
  args: {
    value: null,
    currency: "PYUSD",
    showCurrency: true,
    placeholder: "Enter price",
  },
};
