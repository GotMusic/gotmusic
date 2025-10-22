import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { BuyButton } from "./BuyButton";

const meta: Meta<typeof BuyButton> = {
  title: "Commerce/BuyButton",
  component: BuyButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "success", "danger"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    state: {
      control: { type: "select" },
      options: ["idle", "processing", "success", "error", "disabled"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Buy Now",
  },
};

export const WithPrice: Story = {
  args: {
    price: "29.99",
    currency: "USD",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <BuyButton variant="primary">Primary</BuyButton>
      <BuyButton variant="secondary">Secondary</BuyButton>
      <BuyButton variant="success">Success</BuyButton>
      <BuyButton variant="danger">Danger</BuyButton>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <BuyButton size="sm" price="9.99">
        Small
      </BuyButton>
      <BuyButton size="md" price="19.99">
        Medium
      </BuyButton>
      <BuyButton size="lg" price="29.99">
        Large
      </BuyButton>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Idle State</h4>
        <BuyButton price="29.99" currency="USD" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Processing State</h4>
        <BuyButton price="29.99" currency="USD" loading />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Success State</h4>
        <BuyButton price="29.99" currency="USD" success />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Error State</h4>
        <BuyButton price="29.99" currency="USD" error />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Disabled State</h4>
        <BuyButton price="29.99" currency="USD" disabled />
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [state, setState] = useState<"idle" | "processing" | "success" | "error">("idle");

    const handleClick = () => {
      setState("processing");
      setTimeout(() => {
        setState("success");
        setTimeout(() => setState("idle"), 2000);
      }, 2000);
    };

    const handleError = () => {
      setState("processing");
      setTimeout(() => {
        setState("error");
        setTimeout(() => setState("idle"), 2000);
      }, 2000);
    };

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <BuyButton
            price="29.99"
            currency="USD"
            loading={state === "processing"}
            success={state === "success"}
            error={state === "error"}
            onClick={handleClick}
          />
          <BuyButton
            price="29.99"
            currency="USD"
            variant="danger"
            loading={state === "processing"}
            success={state === "success"}
            error={state === "error"}
            onClick={handleError}
          >
            Test Error
          </BuyButton>
        </div>
        <p className="text-sm text-fg-muted">Click the buttons to see the state transitions</p>
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">With Left Icon</h4>
        <BuyButton
          price="29.99"
          currency="USD"
          leftIcon={
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              role="img"
              aria-label="Shopping Cart"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
              />
            </svg>
          }
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">With Right Icon</h4>
        <BuyButton
          price="29.99"
          currency="USD"
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

export const A11y: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Screen Reader Support</h4>
        <p className="text-sm text-fg-muted mb-4">
          Buttons have proper ARIA labels and state announcements
        </p>
        <BuyButton price="29.99" currency="USD" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Keyboard Navigation</h4>
        <p className="text-sm text-fg-muted mb-4">Use Tab to focus, Enter or Space to activate</p>
        <BuyButton price="29.99" currency="USD" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Loading State</h4>
        <p className="text-sm text-fg-muted mb-4">
          Loading state is properly announced to screen readers
        </p>
        <BuyButton price="29.99" currency="USD" loading />
      </div>
    </div>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Different Currencies</h4>
        <div className="flex gap-2">
          <BuyButton price="29.99" currency="USD" />
          <BuyButton price="29.99" currency="EUR" />
          <BuyButton price="29.99" currency="GBP" />
          <BuyButton price="29.99" currency="JPY" />
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">High Prices</h4>
        <BuyButton price="999.99" currency="USD" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">No Price</h4>
        <BuyButton>Buy Now</BuyButton>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Custom Text</h4>
        <BuyButton>Purchase Item</BuyButton>
      </div>
    </div>
  ),
};
