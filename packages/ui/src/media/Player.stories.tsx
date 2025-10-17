import type { Meta, StoryObj } from "@storybook/react";
import { Player } from "./Player";

const meta: Meta<typeof Player> = {
  title: "Media/Player",
  component: Player,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: "text",
      description: "Audio source URL",
    },
    title: {
      control: "text",
      description: "Audio title for accessibility",
    },
    clamp: {
      control: "number",
      description: "Time limit in seconds (30 for preview, undefined for full)",
    },
    showDownload: {
      control: "boolean",
      description: "Show download button (only in full mode)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    src: "/samples/kick.mp3",
    title: "Dark Techno Kick",
    clamp: 30,
    className: "w-96",
  },
};

export const Full: Story = {
  args: {
    src: "/samples/kick.mp3",
    title: "Dark Techno Kick",
    className: "w-96",
  },
};

export const WithDownload: Story = {
  args: {
    src: "/samples/kick.mp3",
    title: "Dark Techno Kick",
    showDownload: true,
    className: "w-96",
  },
};

export const LongTitle: Story = {
  args: {
    src: "/samples/kick.mp3",
    title: "Very Long Track Title That Might Wrap to Multiple Lines",
    clamp: 30,
    className: "w-96",
  },
};
