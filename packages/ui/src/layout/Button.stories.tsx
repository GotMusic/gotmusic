import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Layout/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Layout-specific button component with specialized styling.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "ghost", "link"],
      description: "Button visual variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Button size",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    children: {
      control: "text",
      description: "Button content",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Layout Button",
        variant: "default",
    size: "md",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
    size: "md",
  },
};

export const Outline: Story = {
  args: {
    children: "Outline",
        variant: "secondary",
    size: "md",
  },
};

export const Ghost: Story = {
  args: {
    children: "Ghost",
    variant: "ghost",
    size: "md",
  },
};

export const Small: Story = {
  args: {
    children: "Small",
        variant: "default",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    children: "Large",
        variant: "default",
    size: "lg",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
        variant: "default",
    size: "md",
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};
