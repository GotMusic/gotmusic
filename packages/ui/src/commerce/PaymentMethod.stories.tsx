import { storybookFixtures } from "@gotmusic/fixtures";
import type { Meta, StoryObj } from "@storybook/react";
import { PaymentMethod } from "./PaymentMethod";

const meta: Meta<typeof PaymentMethod> = {
  title: "Commerce/PaymentMethod",
  component: PaymentMethod,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Payment method selection component with support for crypto wallets, cards, and other payment types. Includes availability states and selection indicators.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    method: {
      description: "Payment method information",
      control: "object",
    },
    isSelected: {
      description: "Whether this method is currently selected",
      control: "boolean",
    },
    size: {
      description: "Method card size",
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      description: "Display variant",
      control: "select",
      options: ["default", "compact", "detailed"],
    },
    onSelect: {
      description: "Callback when method is selected",
      action: "select",
    },
  },
  args: {
    method: storybookFixtures.paymentMethods.crypto,
    isSelected: false,
    size: "md",
    variant: "default",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// PRIMARY STORIES
// ============================================================================

export const Primary: Story = {
  args: {
    method: storybookFixtures.paymentMethods.crypto,
  },
};

export const PaymentTypes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Crypto Wallet
        </h3>
        <PaymentMethod method={storybookFixtures.paymentMethods.crypto} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Credit Card
        </h3>
        <PaymentMethod method={storybookFixtures.paymentMethods.card} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Unavailable
        </h3>
        <PaymentMethod method={storybookFixtures.paymentMethods.unavailable} />
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Default
        </h3>
        <PaymentMethod method={storybookFixtures.paymentMethods.crypto} variant="default" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Compact
        </h3>
        <PaymentMethod method={storybookFixtures.paymentMethods.crypto} variant="compact" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Detailed
        </h3>
        <PaymentMethod method={storybookFixtures.paymentMethods.crypto} variant="detailed" />
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
        <PaymentMethod method={storybookFixtures.paymentMethods.crypto} size="sm" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Medium
        </h3>
        <PaymentMethod method={storybookFixtures.paymentMethods.crypto} size="md" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Large
        </h3>
        <PaymentMethod method={storybookFixtures.paymentMethods.crypto} size="lg" />
      </div>
    </div>
  ),
};

// ============================================================================
// SELECTION STATES
// ============================================================================

export const SelectionStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Unselected
        </h3>
        <PaymentMethod method={storybookFixtures.paymentMethods.crypto} isSelected={false} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Selected
        </h3>
        <PaymentMethod method={storybookFixtures.paymentMethods.crypto} isSelected={true} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Default Method
        </h3>
        <PaymentMethod
          method={{ ...storybookFixtures.paymentMethods.crypto, isDefault: true }}
          isSelected={true}
        />
      </div>
    </div>
  ),
};

export const AvailabilityStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Available
        </h3>
        <PaymentMethod method={storybookFixtures.paymentMethods.crypto} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Unavailable
        </h3>
        <PaymentMethod method={storybookFixtures.paymentMethods.unavailable} />
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
          Use Tab to focus, Enter/Space to select
        </p>
        <PaymentMethod method={storybookFixtures.paymentMethods.crypto} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Screen Reader
        </h3>
        <p className="text-xs text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Proper ARIA labels and selection announcements
        </p>
        <PaymentMethod method={storybookFixtures.paymentMethods.crypto} isSelected={true} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Focus Management
        </h3>
        <p className="text-xs text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Clear focus indicators and logical tab order
        </p>
        <div className="space-y-2">
          <PaymentMethod method={storybookFixtures.paymentMethods.crypto} />
          <PaymentMethod method={storybookFixtures.paymentMethods.card} />
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
          No Status
        </h3>
        <PaymentMethod method={storybookFixtures.paymentMethods.crypto} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Long Name
        </h3>
        <PaymentMethod
          method={{
            ...storybookFixtures.paymentMethods.crypto,
            name: "Very Long Payment Method Name That Might Wrap",
          }}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Minimal Info
        </h3>
        <PaymentMethod
          method={{
            id: "minimal",
            type: "crypto",
            name: "Wallet",
            isDefault: false,
            isAvailable: true,
          }}
        />
      </div>
    </div>
  ),
};

// ============================================================================
// INTERACTIVE STORIES
// ============================================================================

export const Interactive: Story = {
  render: () => {
    const handleSelect = (methodId: string) => {
      // Selection action
    };

    return (
      <div className="space-y-2">
        <PaymentMethod method={storybookFixtures.paymentMethods.crypto} onSelect={handleSelect} />
        <PaymentMethod method={storybookFixtures.paymentMethods.card} onSelect={handleSelect} />
        <p className="text-xs text-[var(--color-text-secondary,#A9B1C1)]">
          Click payment methods to trigger selection
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
    <div className="grid grid-cols-2 gap-2">
      {/* biome-ignore lint/suspicious/noArrayIndexKey: Performance demo with static items */}
      {Array.from({ length: 8 }, (_, i) => (
        <PaymentMethod key={i} method={storybookFixtures.paymentMethods.crypto} size="sm" />
      ))}
    </div>
  ),
};
