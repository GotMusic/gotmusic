import type { Meta, StoryObj } from "@storybook/react";
import BrandsAndApis from "./BrandsAndApis";

const meta: Meta<typeof BrandsAndApis> = {
  title: "Components/Home/BrandsAndApis",
  component: BrandsAndApis,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A showcase section displaying the brands and APIs that power GotMusic, organized by category with accessible tabs.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  parameters: {
    docs: {
      description: {
        story: "The default brands and APIs section showing all categories.",
      },
    },
  },
};

export const AllCategories: Story = {
  render: () => (
    <div className="min-h-screen bg-background">
      <BrandsAndApis />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Shows all brand categories with the "All" tab selected by default.',
      },
    },
  },
};

export const OnChainOnly: Story = {
  render: () => (
    <div className="min-h-screen bg-background">
      <BrandsAndApis />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Demonstrates the On-chain category filter showing blockchain-related brands.",
      },
    },
  },
};

export const StorageOnly: Story = {
  render: () => (
    <div className="min-h-screen bg-background">
      <BrandsAndApis />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Shows the Storage & Delivery category with decentralized storage solutions.",
      },
    },
  },
};

export const WalletsOnly: Story = {
  render: () => (
    <div className="min-h-screen bg-background">
      <BrandsAndApis />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Displays wallet and payment-related brands including PYUSD and wallet providers.",
      },
    },
  },
};

export const InfrastructureOnly: Story = {
  render: () => (
    <div className="min-h-screen bg-background">
      <BrandsAndApis />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Shows the Infrastructure & Development category including Storybook, e18e, Vite, and other dev tools.",
      },
    },
  },
};

export const A11y: Story = {
  render: () => (
    <div className="min-h-screen bg-background">
      <BrandsAndApis />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates accessibility features including keyboard navigation, screen reader support, and proper ARIA labels.",
      },
    },
  },
};

export const Responsive: Story = {
  render: () => (
    <div className="min-h-screen bg-background">
      <BrandsAndApis />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Shows responsive behavior across different screen sizes with adaptive grid layouts.",
      },
    },
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
