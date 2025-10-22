import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { PaymentMethod } from "./PaymentMethod";

const meta: Meta<typeof PaymentMethod> = {
  title: "Commerce/PaymentMethod",
  component: PaymentMethod,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["card", "crypto", "wallet"],
    },
    selected: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Card: Story = {
  args: {
    type: "card",
    name: "Credit Card",
    description: "Visa, Mastercard, American Express",
  },
};

export const Crypto: Story = {
  args: {
    type: "crypto",
    name: "Cryptocurrency",
    description: "Bitcoin, Ethereum, Litecoin",
  },
};

export const Wallet: Story = {
  args: {
    type: "wallet",
    name: "Digital Wallet",
    description: "Apple Pay, Google Pay, PayPal",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Credit Card</h4>
        <PaymentMethod
          type="card"
          name="Credit Card"
          description="Visa, Mastercard, American Express"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Cryptocurrency</h4>
        <PaymentMethod
          type="crypto"
          name="Cryptocurrency"
          description="Bitcoin, Ethereum, Litecoin"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Digital Wallet</h4>
        <PaymentMethod
          type="wallet"
          name="Digital Wallet"
          description="Apple Pay, Google Pay, PayPal"
        />
      </div>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Unselected</h4>
        <PaymentMethod
          type="card"
          name="Credit Card"
          description="Visa, Mastercard, American Express"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Selected</h4>
        <PaymentMethod
          type="card"
          name="Credit Card"
          description="Visa, Mastercard, American Express"
          selected
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Disabled</h4>
        <PaymentMethod
          type="card"
          name="Credit Card"
          description="Visa, Mastercard, American Express"
          disabled
        />
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

    const methods = [
      {
        type: "card" as const,
        name: "Credit Card",
        description: "Visa, Mastercard, American Express",
      },
      {
        type: "crypto" as const,
        name: "Cryptocurrency",
        description: "Bitcoin, Ethereum, Litecoin",
      },
      {
        type: "wallet" as const,
        name: "Digital Wallet",
        description: "Apple Pay, Google Pay, PayPal",
      },
    ];

    return (
      <div className="space-y-4">
        <div className="space-y-2">
          {methods.map((method) => (
            <PaymentMethod
              key={method.type}
              type={method.type}
              name={method.name}
              description={method.description}
              selected={selectedMethod === method.type}
              onSelect={() => setSelectedMethod(method.type)}
            />
          ))}
        </div>
        <p className="text-sm text-fg-muted">Selected: {selectedMethod || "None"}</p>
      </div>
    );
  },
};

export const WithCustomIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Custom Card Icon</h4>
        <PaymentMethod
          type="card"
          name="Credit Card"
          description="Visa, Mastercard, American Express"
          icon={
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              role="img"
              aria-label="Credit Card"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          }
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Custom Crypto Icon</h4>
        <PaymentMethod
          type="crypto"
          name="Cryptocurrency"
          description="Bitcoin, Ethereum, Litecoin"
          icon={
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              role="img"
              aria-label="Cryptocurrency"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
          }
        />
      </div>
    </div>
  ),
};

export const A11y: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Screen Reader Support</h4>
        <p className="text-sm text-fg-muted mb-4">
          Payment methods have proper ARIA roles and state announcements
        </p>
        <PaymentMethod
          type="card"
          name="Credit Card"
          description="Visa, Mastercard, American Express"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Keyboard Navigation</h4>
        <p className="text-sm text-fg-muted mb-4">Use Tab to focus, Enter or Space to select</p>
        <PaymentMethod
          type="card"
          name="Credit Card"
          description="Visa, Mastercard, American Express"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Selected State</h4>
        <p className="text-sm text-fg-muted mb-4">
          Selected state is properly announced to screen readers
        </p>
        <PaymentMethod
          type="card"
          name="Credit Card"
          description="Visa, Mastercard, American Express"
          selected
        />
      </div>
    </div>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Long Name</h4>
        <PaymentMethod
          type="card"
          name="Very Long Payment Method Name That Might Wrap"
          description="This is a very long description that might wrap to multiple lines and test the layout"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">No Description</h4>
        <PaymentMethod type="card" name="Credit Card" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Custom Type</h4>
        <PaymentMethod type="card" name="Bank Transfer" description="Direct bank transfer" />
      </div>
    </div>
  ),
};
