import type { Meta, StoryObj } from "@storybook/react-native";
import ComponentShowcase from "./ComponentShowcase";

const meta: Meta<typeof ComponentShowcase> = {
  title: "Mobile/ComponentShowcase",
  component: ComponentShowcase,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Complete mobile component showcase with API integration, design tokens, and interactive examples.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Component Showcase",
  args: {},
};

export const Loading: Story = {
  name: "Loading State",
  parameters: {
    docs: {
      description: {
        story: "Shows the component in loading state with API call simulation.",
      },
    },
  },
};

export const Error: Story = {
  name: "Error State", 
  parameters: {
    docs: {
      description: {
        story: "Shows the component in error state with error handling.",
      },
    },
  },
};
