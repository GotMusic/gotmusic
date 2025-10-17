import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Feedback/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "subtle", "strong"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
    },
    shape: {
      control: { type: "select" },
      options: ["rectangle", "circle", "text"],
    },
    lines: {
      control: { type: "number", min: 1, max: 10 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Text: Story = {
  args: {
    shape: "text",
    width: "200px",
  },
};

export const Circle: Story = {
  args: {
    shape: "circle",
    width: "40px",
    height: "40px",
  },
};

export const Rectangle: Story = {
  args: {
    shape: "rectangle",
    width: "300px",
    height: "100px",
  },
};

export const MultipleLines: Story = {
  args: {
    lines: 3,
    shape: "text",
    width: "250px",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    width: "150px",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    width: "200px",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    width: "300px",
  },
};

export const ExtraLarge: Story = {
  args: {
    size: "xl",
    width: "400px",
  },
};

export const Subtle: Story = {
  args: {
    variant: "subtle",
    width: "200px",
  },
};

export const Strong: Story = {
  args: {
    variant: "strong",
    width: "200px",
  },
};

export const CardSkeleton: Story = {
  render: () => (
    <div className="w-80 p-4 border rounded-lg">
      <div className="flex items-center space-x-4 mb-4">
        <Skeleton shape="circle" width="40px" height="40px" />
        <div className="space-y-2 flex-1">
          <Skeleton shape="text" width="60%" />
          <Skeleton shape="text" width="40%" />
        </div>
      </div>
      <Skeleton width="100%" height="120px" className="mb-4" />
      <div className="space-y-2">
        <Skeleton shape="text" width="100%" />
        <Skeleton shape="text" width="80%" />
        <Skeleton shape="text" width="60%" />
      </div>
    </div>
  ),
};

export const ListSkeleton: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      {Array.from({ length: 5 }, (_, i) => (
        <div key={`list-item-${Date.now()}-${i}`} className="flex items-center space-x-4">
          <Skeleton shape="circle" width="32px" height="32px" />
          <div className="space-y-2 flex-1">
            <Skeleton shape="text" width="70%" />
            <Skeleton shape="text" width="50%" />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const TableSkeleton: Story = {
  render: () => (
    <div className="w-full">
      <div className="space-y-3">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={`table-row-${Date.now()}-${i}`} className="flex space-x-4">
            <Skeleton width="40px" height="20px" />
            <Skeleton width="120px" height="20px" />
            <Skeleton width="80px" height="20px" />
            <Skeleton width="60px" height="20px" />
          </div>
        ))}
      </div>
    </div>
  ),
};
