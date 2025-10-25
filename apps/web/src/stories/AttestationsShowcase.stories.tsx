import type { Meta, StoryObj } from "@storybook/react";
import { AttestationsShowcase } from "../components/AttestationsShowcase";

const meta: Meta<typeof AttestationsShowcase> = {
  title: "Components/AttestationsShowcase",
  component: AttestationsShowcase,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Comprehensive showcase of GotMusic's EAS attestations infrastructure, including schemas, resolvers, and explorer links for both Base Mainnet (production) and Ethereum Sepolia (development)."
      }
    }
  },
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes"
    }
  }
};

export default meta;
type Story = StoryObj<typeof AttestationsShowcase>;

export const Default: Story = {
  args: {
    className: ""
  }
};

export const WithCustomStyling: Story = {
  args: {
    className: "max-w-6xl mx-auto"
  }
};

export const Compact: Story = {
  args: {
    className: "max-w-4xl mx-auto"
  }
};
