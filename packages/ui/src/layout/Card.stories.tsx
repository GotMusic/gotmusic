import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Layout/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Layout-specific card component with specialized styling.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "elevated", "outlined", "filled"],
      description: "Card visual variant",
    },
    padding: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
      description: "Card padding size",
    },
    children: {
      control: "text",
      description: "Card content",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "This is a layout card with default styling.",
    variant: "default",
    padding: "md",
  },
};

export const Elevated: Story = {
  args: {
    children: "This is an elevated card with shadow.",
    variant: "elevated",
    padding: "md",
  },
};

export const Outlined: Story = {
  args: {
    children: "This is an outlined card with border.",
    variant: "outlined",
    padding: "md",
  },
};

export const Filled: Story = {
  args: {
    children: "This is a filled card with background color.",
    variant: "filled",
    padding: "md",
  },
};

export const NoPadding: Story = {
  args: {
    children: "This card has no padding.",
    variant: "default",
    padding: "none",
  },
};

export const SmallPadding: Story = {
  args: {
    children: "This card has small padding.",
    variant: "default",
    padding: "sm",
  },
};

export const LargePadding: Story = {
  args: {
    children: "This card has large padding.",
    variant: "default",
    padding: "lg",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
      <Card variant="default" padding="md">
        Default Card
      </Card>
      <Card variant="elevated" padding="md">
        Elevated Card
      </Card>
      <Card variant="outlined" padding="md">
        Outlined Card
      </Card>
      <Card variant="filled" padding="md">
        Filled Card
      </Card>
    </div>
  ),
};
