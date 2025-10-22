import { storybookFixtures } from "@gotmusic/fixtures";
import type { Meta, StoryObj } from "@storybook/react";
import { BuyButton } from "./BuyButton";

const meta: Meta<typeof BuyButton> = {
  title: "Commerce/BuyButton",
  component: BuyButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Purchase button component with multiple states, pricing display, and accessibility features. Supports various currencies, discounts, and payment states.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    price: {
      description: "Pricing information including currency, amount, and optional discount",
      control: "object",
    },
    status: {
      description: "Current button state",
      control: "select",
      options: ["idle", "processing", "success", "error", "disabled"],
    },
    size: {
      description: "Button size variant",
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      description: "Button style variant",
      control: "select",
      options: ["primary", "secondary", "outline"],
    },
    showPrice: {
      description: "Whether to display pricing information above the button",
      control: "boolean",
    },
    showIcon: {
      description: "Whether to show the shopping cart icon",
      control: "boolean",
    },
    onPurchase: {
      description: "Callback when purchase is initiated",
      action: "purchase",
    },
  },
  args: {
    price: storybookFixtures.pricing.basic,
    status: "idle",
    size: "md",
    variant: "primary",
    showPrice: true,
    showIcon: true,
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

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Primary
        </h3>
        <BuyButton variant="primary" price={storybookFixtures.pricing.basic} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Secondary
        </h3>
        <BuyButton variant="secondary" price={storybookFixtures.pricing.basic} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Outline
        </h3>
        <BuyButton variant="outline" price={storybookFixtures.pricing.basic} />
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
        <BuyButton size="sm" price={storybookFixtures.pricing.basic} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Medium
        </h3>
        <BuyButton size="md" price={storybookFixtures.pricing.basic} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Large
        </h3>
        <BuyButton size="lg" price={storybookFixtures.pricing.basic} />
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
        <BuyButton status="idle" price={storybookFixtures.pricing.basic} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Processing
        </h3>
        <BuyButton status="processing" price={storybookFixtures.pricing.basic} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Success
        </h3>
        <BuyButton status="success" price={storybookFixtures.pricing.basic} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Error
        </h3>
        <BuyButton status="error" price={storybookFixtures.pricing.basic} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Disabled
        </h3>
        <BuyButton status="disabled" price={storybookFixtures.pricing.basic} />
      </div>
    </div>
  ),
};

export const PricingVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Basic Price
        </h3>
        <BuyButton price={storybookFixtures.pricing.basic} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          With Discount
        </h3>
        <BuyButton price={storybookFixtures.pricing.discounted} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Free
        </h3>
        <BuyButton price={storybookFixtures.pricing.free} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Premium
        </h3>
        <BuyButton price={storybookFixtures.pricing.premium} />
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
        <BuyButton price={storybookFixtures.pricing.basic} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Screen Reader
        </h3>
        <p className="text-xs text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Proper ARIA labels and state announcements
        </p>
        <BuyButton status="processing" price={storybookFixtures.pricing.basic} />
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
          No Price Display
        </h3>
        <BuyButton showPrice={false} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          No Icon
        </h3>
        <BuyButton showIcon={false} price={storybookFixtures.pricing.basic} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Custom Text
        </h3>
        <BuyButton price={storybookFixtures.pricing.basic}>Purchase This Beat</BuyButton>
      </div>
    </div>
  ),
};

// ============================================================================
// INTERACTIVE STORIES
// ============================================================================

export const Interactive: Story = {
  render: () => {
    const handlePurchase = () => {
      // Purchase action
    };

    return (
      <div className="space-y-4">
        <BuyButton price={storybookFixtures.pricing.basic} onPurchase={handlePurchase} />
        <p className="text-xs text-[var(--color-text-secondary,#A9B1C1)]">
          Click the button to trigger the purchase action
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
        <BuyButton
          key={`buy-button-${Date.now()}-${i}`}
          price={storybookFixtures.pricing.basic}
          size="sm"
        />
      ))}
    </div>
  ),
};
