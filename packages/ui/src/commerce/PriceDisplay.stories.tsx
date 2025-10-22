import { storybookFixtures } from "@gotmusic/fixtures";
import type { Meta, StoryObj } from "@storybook/react";
import { PriceDisplay } from "./PriceDisplay";

const meta: Meta<typeof PriceDisplay> = {
  title: "Commerce/PriceDisplay",
  component: PriceDisplay,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Price display component with currency formatting, discount handling, and multiple size variants. Supports localization and accessibility features.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    price: {
      description: "Pricing information including currency, amount, and optional discount",
      control: "object",
    },
    size: {
      description: "Display size variant",
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
    variant: {
      description: "Color variant",
      control: "select",
      options: ["default", "highlight", "muted"],
    },
    showOriginal: {
      description: "Whether to show original price when discounted",
      control: "boolean",
    },
    showDiscount: {
      description: "Whether to show discount percentage",
      control: "boolean",
    },
    showCurrency: {
      description: "Whether to show currency code",
      control: "boolean",
    },
    locale: {
      description: "Locale for number formatting",
      control: "text",
    },
  },
  args: {
    price: storybookFixtures.pricing.basic,
    size: "md",
    variant: "default",
    showOriginal: true,
    showDiscount: true,
    showCurrency: true,
    locale: "en-US",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// PRIMARY STORIES
// ============================================================================

export const Primary: Story = {
  args: {
    price: storybookFixtures.pricing.basic,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Default
        </h3>
        <PriceDisplay price={storybookFixtures.pricing.basic} variant="default" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Highlight
        </h3>
        <PriceDisplay price={storybookFixtures.pricing.basic} variant="highlight" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Muted
        </h3>
        <PriceDisplay price={storybookFixtures.pricing.basic} variant="muted" />
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
        <PriceDisplay price={storybookFixtures.pricing.basic} size="sm" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Medium
        </h3>
        <PriceDisplay price={storybookFixtures.pricing.basic} size="md" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Large
        </h3>
        <PriceDisplay price={storybookFixtures.pricing.basic} size="lg" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Extra Large
        </h3>
        <PriceDisplay price={storybookFixtures.pricing.basic} size="xl" />
      </div>
    </div>
  ),
};

// ============================================================================
// PRICING VARIANTS
// ============================================================================

export const PricingVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Basic Price
        </h3>
        <PriceDisplay price={storybookFixtures.pricing.basic} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          With Discount
        </h3>
        <PriceDisplay price={storybookFixtures.pricing.discounted} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Free
        </h3>
        <PriceDisplay price={storybookFixtures.pricing.free} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Premium
        </h3>
        <PriceDisplay price={storybookFixtures.pricing.premium} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          USD Currency
        </h3>
        <PriceDisplay price={storybookFixtures.pricing.usd} />
      </div>
    </div>
  ),
};

export const CurrencyFormats: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          US Format
        </h3>
        <PriceDisplay price={storybookFixtures.pricing.basic} locale="en-US" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          European Format
        </h3>
        <PriceDisplay price={storybookFixtures.pricing.basic} locale="de-DE" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          UK Format
        </h3>
        <PriceDisplay price={storybookFixtures.pricing.basic} locale="en-GB" />
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
          Screen Reader
        </h3>
        <p className="text-xs text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Proper semantic markup for price announcements
        </p>
        <PriceDisplay price={storybookFixtures.pricing.discounted} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          High Contrast
        </h3>
        <p className="text-xs text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Clear visual hierarchy and contrast ratios
        </p>
        <PriceDisplay price={storybookFixtures.pricing.basic} variant="highlight" />
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
          No Original Price
        </h3>
        <PriceDisplay price={storybookFixtures.pricing.discounted} showOriginal={false} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          No Discount Badge
        </h3>
        <PriceDisplay price={storybookFixtures.pricing.discounted} showDiscount={false} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          No Currency Code
        </h3>
        <PriceDisplay price={storybookFixtures.pricing.basic} showCurrency={false} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Minimal Display
        </h3>
        <PriceDisplay
          price={storybookFixtures.pricing.basic}
          showOriginal={false}
          showDiscount={false}
          showCurrency={false}
        />
      </div>
    </div>
  ),
};

// ============================================================================
// PERFORMANCE STORIES
// ============================================================================

export const Performance: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {/* biome-ignore lint/suspicious/noArrayIndexKey: Performance demo with static items */}
      {Array.from({ length: 12 }, (_, i) => (
        <PriceDisplay key={i} price={storybookFixtures.pricing.basic} size="sm" />
      ))}
    </div>
  ),
};
