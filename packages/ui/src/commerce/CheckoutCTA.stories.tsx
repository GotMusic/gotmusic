import { storybookFixtures } from "@gotmusic/fixtures";
import type { Meta, StoryObj } from "@storybook/react";
import { CheckoutCTA } from "./CheckoutCTA";

const meta: Meta<typeof CheckoutCTA> = {
  title: "Commerce/CheckoutCTA",
  component: CheckoutCTA,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Checkout call-to-action component with different purchase types, states, and interactive features. Supports single purchases, cart checkout, and subscriptions.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      description: "Type of checkout action",
      control: "select",
      options: ["single", "cart", "subscription"],
    },
    status: {
      description: "Current checkout state",
      control: "select",
      options: ["idle", "processing", "success", "error", "disabled"],
    },
    size: {
      description: "CTA size variant",
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      description: "CTA style variant",
      control: "select",
      options: ["primary", "secondary", "outline"],
    },
    showIcon: {
      description: "Whether to show the action icon",
      control: "boolean",
    },
    showArrow: {
      description: "Whether to show the arrow indicator",
      control: "boolean",
    },
    onCheckout: {
      description: "Callback when checkout is initiated",
      action: "checkout",
    },
  },
  args: {
    type: "single",
    status: "idle",
    size: "md",
    variant: "primary",
    showIcon: true,
    showArrow: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// PRIMARY STORIES
// ============================================================================

export const Primary: Story = {
  args: {
    children: "Buy Now",
  },
};

export const Types: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Single Purchase
        </h3>
        <CheckoutCTA type="single" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Cart Checkout
        </h3>
        <CheckoutCTA type="cart" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Subscription
        </h3>
        <CheckoutCTA type="subscription" />
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Primary
        </h3>
        <CheckoutCTA variant="primary" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Secondary
        </h3>
        <CheckoutCTA variant="secondary" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Outline
        </h3>
        <CheckoutCTA variant="outline" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Small
        </h3>
        <CheckoutCTA size="sm" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Medium
        </h3>
        <CheckoutCTA size="md" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Large
        </h3>
        <CheckoutCTA size="lg" />
      </div>
    </div>
  ),
};

// ============================================================================
// STATE STORIES
// ============================================================================

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Idle
        </h3>
        <CheckoutCTA status="idle" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Processing
        </h3>
        <CheckoutCTA status="processing" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Success
        </h3>
        <CheckoutCTA status="success" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Error
        </h3>
        <CheckoutCTA status="error" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Disabled
        </h3>
        <CheckoutCTA status="disabled" />
      </div>
    </div>
  ),
};

// ============================================================================
// ACCESSIBILITY STORIES
// ============================================================================

export const A11y: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Keyboard Navigation
        </h3>
        <p className="text-xs text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Use Tab to focus, Enter/Space to activate
        </p>
        <CheckoutCTA />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Screen Reader
        </h3>
        <p className="text-xs text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Proper ARIA labels and state announcements
        </p>
        <CheckoutCTA status="processing" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Focus Management
        </h3>
        <p className="text-xs text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Clear focus indicators and logical tab order
        </p>
        <div className="flex gap-2">
          <CheckoutCTA size="sm" />
          <CheckoutCTA size="sm" />
        </div>
      </div>
    </div>
  ),
};

// ============================================================================
// EDGE CASES
// ============================================================================

export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          No Icon
        </h3>
        <CheckoutCTA showIcon={false} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          No Arrow
        </h3>
        <CheckoutCTA showArrow={false} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Custom Text
        </h3>
        <CheckoutCTA>Complete Your Purchase</CheckoutCTA>
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Minimal
        </h3>
        <CheckoutCTA showIcon={false} showArrow={false}>
          Checkout
        </CheckoutCTA>
      </div>
    </div>
  ),
};

// ============================================================================
// INTERACTIVE STORIES
// ============================================================================

export const Interactive: Story = {
  render: () => {
    const handleCheckout = () => {
      // Checkout action
    };

    return (
      <div className="space-y-4">
        <CheckoutCTA onCheckout={handleCheckout} />
        <p className="text-xs text-[var(--color-text-secondary,#A9B1C1)]">
          Click the CTA to trigger the checkout action
        </p>
      </div>
    );
  },
};

// ============================================================================
// PERFORMANCE STORIES
// ============================================================================

export const Performance: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {Array.from({ length: 8 }, (_, i) => (
        <CheckoutCTA key={`checkout-cta-${i}`} size="sm" />
      ))}
    </div>
  ),
};
