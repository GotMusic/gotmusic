import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { CurrencySelector } from "./CurrencySelector";

const meta: Meta<typeof CurrencySelector> = {
  title: "Pricing/CurrencySelector",
  component: CurrencySelector,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A dropdown component for selecting currencies with flag support and search functionality.",
      },
    },
  },
  argTypes: {
    value: {
      control: { type: "text" },
      description: "The selected currency code",
    },
    showFlag: {
      control: { type: "boolean" },
      description: "Whether to show country flags",
    },
    showName: {
      control: { type: "boolean" },
      description: "Whether to show currency names",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Whether the selector is disabled",
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
type Story = StoryObj<typeof CurrencySelector>;

// ============================================================================
// PRIMARY STORIES
// ============================================================================

export const Default: Story = {
  args: {
    value: "PYUSD",
    showFlag: true,
    showName: false,
  },
};

export const WithNames: Story = {
  args: {
    value: "USD",
    showFlag: true,
    showName: true,
  },
};

export const WithoutFlags: Story = {
  args: {
    value: "EUR",
    showFlag: false,
    showName: true,
  },
};

// ============================================================================
// VARIANT STORIES
// ============================================================================

export const ErrorState: Story = {
  args: {
    value: "PYUSD",
    variant: "error",
    showFlag: true,
    showName: false,
  },
};

export const Success: Story = {
  args: {
    value: "PYUSD",
    variant: "success",
    showFlag: true,
    showName: false,
  },
};

// ============================================================================
// SIZE STORIES
// ============================================================================

export const Small: Story = {
  args: {
    value: "PYUSD",
    size: "sm",
    showFlag: true,
    showName: false,
  },
};

export const Large: Story = {
  args: {
    value: "PYUSD",
    size: "lg",
    showFlag: true,
    showName: true,
  },
};

// ============================================================================
// DISABLED STATE
// ============================================================================

export const Disabled: Story = {
  args: {
    value: "PYUSD",
    disabled: true,
    showFlag: true,
    showName: false,
  },
};

// ============================================================================
// INTERACTION STORIES
// ============================================================================

export const Interactive: Story = {
  render: () => {
    const [selectedCurrency, setSelectedCurrency] = React.useState("PYUSD");

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="interactive-currency-selector"
            className="block text-sm font-medium text-fg-default"
          >
            Select Currency
          </label>
          <CurrencySelector
            value={selectedCurrency}
            onChange={setSelectedCurrency}
            showFlag={true}
            showName={true}
          />
        </div>
        <div className="text-sm text-fg-muted">Selected: {selectedCurrency}</div>
      </div>
    );
  },
};

// ============================================================================
// CUSTOM OPTIONS
// ============================================================================

export const CustomCurrencies: Story = {
  render: () => {
    const customOptions = [
      { code: "PYUSD", name: "PayPal USD", symbol: "$", flag: "🇺🇸" },
      { code: "BTC", name: "Bitcoin", symbol: "₿", flag: "₿" },
      { code: "ETH", name: "Ethereum", symbol: "Ξ", flag: "Ξ" },
      { code: "USDC", name: "USD Coin", symbol: "$", flag: "💵" },
    ];

    const [selectedCurrency, setSelectedCurrency] = React.useState("PYUSD");

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="custom-currency-selector"
            className="block text-sm font-medium text-fg-default"
          >
            Crypto & Digital Currencies
          </label>
          <CurrencySelector
            value={selectedCurrency}
            onChange={setSelectedCurrency}
            options={customOptions}
            showFlag={true}
            showName={true}
          />
        </div>
        <div className="text-sm text-fg-muted">Selected: {selectedCurrency}</div>
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
        <label htmlFor="currency-selector" className="block text-sm font-medium text-fg-default">
          Choose your currency
        </label>
        <CurrencySelector
          value="PYUSD"
          showFlag={true}
          showName={true}
          aria-label="Select currency"
        />
      </div>
      <div className="text-sm text-fg-muted">
        This selector supports keyboard navigation, screen readers, and search functionality.
      </div>
    </div>
  ),
};

// ============================================================================
// EDGE CASES
// ============================================================================

export const LongCurrencyList: Story = {
  render: () => {
    const extendedOptions = [
      { code: "PYUSD", name: "PayPal USD", symbol: "$", flag: "🇺🇸" },
      { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
      { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
      { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
      { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
      { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦" },
      { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺" },
      { code: "CHF", name: "Swiss Franc", symbol: "CHF", flag: "🇨🇭" },
      { code: "CNY", name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳" },
      { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳" },
      { code: "BRL", name: "Brazilian Real", symbol: "R$", flag: "🇧🇷" },
      { code: "MXN", name: "Mexican Peso", symbol: "$", flag: "🇲🇽" },
    ];

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="extended-currency-selector"
            className="block text-sm font-medium text-fg-default"
          >
            Extended Currency List
          </label>
          <CurrencySelector
            value="PYUSD"
            options={extendedOptions}
            showFlag={true}
            showName={true}
          />
        </div>
        <div className="text-sm text-fg-muted">
          Search functionality helps navigate through many options.
        </div>
      </div>
    );
  },
};

export const NoOptions: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="empty-currency-selector"
          className="block text-sm font-medium text-fg-default"
        >
          Empty Currency List
        </label>
        <CurrencySelector value="PYUSD" options={[]} showFlag={true} showName={true} />
      </div>
      <div className="text-sm text-fg-muted">Handles empty options gracefully.</div>
    </div>
  ),
};
