import type { Meta, StoryObj } from "@storybook/react";
import { PriceDisplay } from "./PriceDisplay";

const meta: Meta<typeof PriceDisplay> = {
  title: "Commerce/PriceDisplay",
  component: PriceDisplay,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "muted", "success", "error", "warning"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl", "2xl"],
    },
    weight: {
      control: { type: "select" },
      options: ["normal", "medium", "semibold", "bold"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    amount: 29.99,
    currency: "USD",
  },
};

export const WithDiscount: Story = {
  args: {
    amount: 19.99,
    originalPrice: 29.99,
    currency: "USD",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Default</h4>
        <PriceDisplay amount={29.99} currency="USD" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Muted</h4>
        <PriceDisplay amount={29.99} currency="USD" variant="muted" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Success</h4>
        <PriceDisplay amount={29.99} currency="USD" variant="success" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Error</h4>
        <PriceDisplay amount={29.99} currency="USD" variant="error" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Warning</h4>
        <PriceDisplay amount={29.99} currency="USD" variant="warning" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Small</h4>
        <PriceDisplay amount={29.99} currency="USD" size="sm" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Medium</h4>
        <PriceDisplay amount={29.99} currency="USD" size="md" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Large</h4>
        <PriceDisplay amount={29.99} currency="USD" size="lg" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Extra Large</h4>
        <PriceDisplay amount={29.99} currency="USD" size="xl" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">2X Large</h4>
        <PriceDisplay amount={29.99} currency="USD" size="2xl" />
      </div>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Normal</h4>
        <PriceDisplay amount={29.99} currency="USD" weight="normal" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Medium</h4>
        <PriceDisplay amount={29.99} currency="USD" weight="medium" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Semibold</h4>
        <PriceDisplay amount={29.99} currency="USD" weight="semibold" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Bold</h4>
        <PriceDisplay amount={29.99} currency="USD" weight="bold" />
      </div>
    </div>
  ),
};

export const Discounts: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">With Original Price</h4>
        <PriceDisplay amount={19.99} originalPrice={29.99} currency="USD" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">With Discount Amount</h4>
        <PriceDisplay amount={19.99} discount={10} currency="USD" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">With Discount Percentage</h4>
        <PriceDisplay amount={19.99} discountPercentage={33} currency="USD" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Hide Discount</h4>
        <PriceDisplay amount={19.99} originalPrice={29.99} currency="USD" showDiscount={false} />
      </div>
    </div>
  ),
};

export const Currencies: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">USD</h4>
        <PriceDisplay amount={29.99} currency="USD" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">EUR</h4>
        <PriceDisplay amount={29.99} currency="EUR" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">GBP</h4>
        <PriceDisplay amount={29.99} currency="GBP" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">JPY</h4>
        <PriceDisplay amount={2999} currency="JPY" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">No Currency Symbol</h4>
        <PriceDisplay amount={29.99} currency="USD" showCurrency={false} />
      </div>
    </div>
  ),
};

export const WithPrefixSuffix: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">With Prefix</h4>
        <PriceDisplay amount={29.99} currency="USD" prefix="Starting at" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">With Suffix</h4>
        <PriceDisplay amount={29.99} currency="USD" suffix="per month" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">With Both</h4>
        <PriceDisplay amount={29.99} currency="USD" prefix="From" suffix="up" />
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
          Price displays have proper semantic structure for screen readers
        </p>
        <PriceDisplay amount={29.99} currency="USD" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Discount Announcement</h4>
        <p className="text-sm text-fg-muted mb-4">
          Discounts are properly announced to screen readers
        </p>
        <PriceDisplay amount={19.99} originalPrice={29.99} currency="USD" />
      </div>
    </div>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Very High Price</h4>
        <PriceDisplay amount={999999.99} currency="USD" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Very Low Price</h4>
        <PriceDisplay amount={0.99} currency="USD" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Zero Price</h4>
        <PriceDisplay amount={0} currency="USD" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Free</h4>
        <PriceDisplay amount={0} currency="USD" showCurrency={false} prefix="Free" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Custom Locale</h4>
        <PriceDisplay amount={29.99} currency="EUR" locale="de-DE" />
      </div>
    </div>
  ),
};
