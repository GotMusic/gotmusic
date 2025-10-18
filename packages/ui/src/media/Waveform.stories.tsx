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

export const LowerResolution: Story = {
  args: {
    data: Array.from({ length: 32 }, () => Math.random()),
    bins: 32,
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
