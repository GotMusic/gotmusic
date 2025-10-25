import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Stories/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Story-specific button component for demonstrations.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    primary: {
      control: "boolean",
      description: "Whether the button uses the primary variant",
    },
    backgroundColor: {
      control: "color",
      description: "Optional override for the button background color",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Button size",
    },
    label: {
      control: "text",
      description: "Button label text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    label: "Secondary Button",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    label: "Large Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    label: "Small Button",
  },
};
