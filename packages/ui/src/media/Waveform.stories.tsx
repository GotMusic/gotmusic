import type { Meta, StoryObj } from "@storybook/react";
import { Waveform } from "./Waveform";

const meta: Meta<typeof Waveform> = {
  title: "Media/Waveform",
  component: Waveform,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    data: {
      control: "object",
      description: "Array of waveform data values (0-1)",
    },
    color: {
      control: "text",
      description: "CSS class for bar color",
    },
    hoverColor: {
      control: "text",
      description: "CSS class for hover color",
    },
    bins: {
      control: "number",
      description: "Number of bars to display",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: Array.from({ length: 64 }, () => Math.random()),
    className: "h-16 w-full",
  },
};

export const Empty: Story = {
  args: {
    data: [],
    className: "h-16 w-full",
  },
};

export const CustomColors: Story = {
  args: {
    data: Array.from({ length: 32 }, () => Math.random()),
    color: "bg-blue-500",
    hoverColor: "bg-blue-700",
    className: "h-20 w-full",
  },
};

export const HighResolution: Story = {
  args: {
    data: Array.from({ length: 128 }, () => Math.random()),
    bins: 128,
    className: "h-24 w-full",
  },
};
