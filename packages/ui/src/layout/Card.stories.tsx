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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const CardBody = ({ title, description }: { title: string; description: string }) => (
  <div style={{ padding: "1rem", display: "grid", gap: "0.5rem" }}>
    <h3 style={{ margin: 0 }}>{title}</h3>
    <p style={{ margin: 0 }}>{description}</p>
  </div>
);

export const Default: Story = {
  args: {
    variant: "default",
  },
  render: (args) => (
    <Card {...args}>
      <CardBody title="Default Card" description="This is a layout card with default styling." />
    </Card>
  ),
};

export const Elevated: Story = {
  args: {
    variant: "elevated",
  },
  render: (args) => (
    <Card {...args}>
      <CardBody title="Elevated Card" description="This card includes a subtle shadow." />
    </Card>
  ),
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
  },
  render: (args) => (
    <Card {...args}>
      <CardBody title="Outlined Card" description="Outlined styling emphasizes the border." />
    </Card>
  ),
};

export const WithCustomContent: Story = {
  args: {
    variant: "default",
  },
  render: (args) => (
    <Card {...args}>
      <div style={{ padding: "1rem" }}>
        <h3 style={{ margin: 0 }}>Card with Actions</h3>
        <p style={{ margin: "0.5rem 0" }}>
          Combine layout cards with buttons or links to create dashboard elements.
        </p>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button type="button" style={{ padding: "0.5rem 1rem" }}>
            Primary action
          </button>
          <button type="button" style={{ padding: "0.5rem 1rem" }}>
            Secondary action
          </button>
        </div>
      </div>
    </Card>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "1rem" }}>
      <Card>
        <CardBody title="Default" description="Balanced border for most layouts." />
      </Card>
      <Card variant="elevated">
        <CardBody title="Elevated" description="Shadow adds depth against the background." />
      </Card>
      <Card variant="outlined">
        <CardBody title="Outlined" description="Transparent background with visible outline." />
      </Card>
    </div>
  ),
};
