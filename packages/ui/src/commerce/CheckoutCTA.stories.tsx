import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CheckoutCTA } from "./CheckoutCTA";

const meta: Meta<typeof CheckoutCTA> = {
  title: "Commerce/CheckoutCTA",
  component: CheckoutCTA,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "outline", "ghost"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
    },
    checkoutType: {
      control: { type: "select" },
      options: ["single", "cart", "subscription"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    checkoutType: "single",
    totalAmount: 29.99,
    currency: "USD",
  },
};

export const Cart: Story = {
  args: {
    checkoutType: "cart",
    totalAmount: 89.97,
    currency: "USD",
    itemCount: 3,
  },
};

export const Subscription: Story = {
  args: {
    checkoutType: "subscription",
    totalAmount: 9.99,
    currency: "USD",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Primary</h4>
        <CheckoutCTA checkoutType="single" totalAmount={29.99} variant="primary" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Secondary</h4>
        <CheckoutCTA checkoutType="single" totalAmount={29.99} variant="secondary" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Outline</h4>
        <CheckoutCTA checkoutType="single" totalAmount={29.99} variant="outline" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Ghost</h4>
        <CheckoutCTA checkoutType="single" totalAmount={29.99} variant="ghost" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Small</h4>
        <CheckoutCTA checkoutType="single" totalAmount={29.99} size="sm" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Medium</h4>
        <CheckoutCTA checkoutType="single" totalAmount={29.99} size="md" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Large</h4>
        <CheckoutCTA checkoutType="single" totalAmount={29.99} size="lg" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Extra Large</h4>
        <CheckoutCTA checkoutType="single" totalAmount={29.99} size="xl" />
      </div>
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Single Purchase</h4>
        <CheckoutCTA checkoutType="single" totalAmount={29.99} currency="USD" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Cart Checkout</h4>
        <CheckoutCTA checkoutType="cart" totalAmount={89.97} currency="USD" itemCount={3} />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Subscription</h4>
        <CheckoutCTA checkoutType="subscription" totalAmount={9.99} currency="USD" />
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 3000);
    };

    return (
      <div className="space-y-4">
        <CheckoutCTA
          checkoutType="single"
          totalAmount={29.99}
          currency="USD"
          loading={loading}
          onClick={handleClick}
        />
        <p className="text-sm text-fg-muted">Click the button to see the loading state</p>
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">With Left Icon</h4>
        <CheckoutCTA
          checkoutType="single"
          totalAmount={29.99}
          leftIcon={
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              role="img"
              aria-label="Money"
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
      <div>
        <h4 className="text-sm font-medium mb-2">With Right Icon</h4>
        <CheckoutCTA
          checkoutType="single"
          totalAmount={29.99}
          rightIcon={
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              role="img"
              aria-label="Arrow"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          }
        />
      </div>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Default State</h4>
        <CheckoutCTA checkoutType="single" totalAmount={29.99} />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Loading State</h4>
        <CheckoutCTA checkoutType="single" totalAmount={29.99} loading />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Disabled State</h4>
        <CheckoutCTA checkoutType="single" totalAmount={29.99} disabled />
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
          Checkout CTAs have proper ARIA labels and state announcements
        </p>
        <CheckoutCTA checkoutType="single" totalAmount={29.99} />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Keyboard Navigation</h4>
        <p className="text-sm text-fg-muted mb-4">Use Tab to focus, Enter or Space to activate</p>
        <CheckoutCTA checkoutType="single" totalAmount={29.99} />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Loading State</h4>
        <p className="text-sm text-fg-muted mb-4">
          Loading state is properly announced to screen readers
        </p>
        <CheckoutCTA checkoutType="single" totalAmount={29.99} loading />
      </div>
    </div>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">No Amount</h4>
        <CheckoutCTA checkoutType="single" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">High Amount</h4>
        <CheckoutCTA checkoutType="single" totalAmount={9999.99} currency="USD" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Many Items</h4>
        <CheckoutCTA checkoutType="cart" totalAmount={299.97} currency="USD" itemCount={15} />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Custom Text</h4>
        <CheckoutCTA checkoutType="single" totalAmount={29.99}>
          Complete Purchase
        </CheckoutCTA>
      </div>
    </div>
  ),
};
