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
      options: ["default", "elevated", "outlined"],
      description: "Card visual variant",
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
  },
};

export const Elevated: Story = {
  args: {
    children: "This is an elevated card with shadow.",
    variant: "elevated",
  },
};

export const Outlined: Story = {
  args: {
    children: "This is an outlined card with border.",
    variant: "outlined",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
      <Card variant="default">
        Default Card
      </Card>
      <Card variant="elevated">
        Elevated Card
      </Card>
      <Card variant="outlined">
        Outlined Card
      </Card>
    </div>
  ),
};
