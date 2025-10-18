import type { Meta, StoryObj } from "@storybook/react";
import { CatalogCard } from "./CatalogCard";

const meta: Meta<typeof CatalogCard> = {
  title: "Media/CatalogCard",
  component: CatalogCard,
  tags: ["autodocs"],
  argTypes: {
    onPreviewToggle: { action: "preview toggled" },
    onOpen: { action: "opened" },
  },
};

export default meta;
type Story = StoryObj<typeof CatalogCard>;

export const Default: Story = {
  args: {
    id: "sample-1",
    title: "Dark Synthwave Loop",
    producer: "NeonBeats",
    price: "$2.99",
    bpm: 128,
    keySig: "C minor",
    tags: ["synthwave", "dark", "loop"],
    artworkUrl: "https://picsum.photos/seed/sample1/200/200",
    previewUrl: "https://example.com/preview.mp3",
    isPlaying: false,
  },
};

export const Playing: Story = {
  args: {
    ...Default.args,
    isPlaying: true,
  },
};

export const LongTitle: Story = {
  args: {
    ...Default.args,
    title: "This is a very long title that should truncate with an ellipsis",
    producer: "Producer with a super long name that also needs truncation",
  },
};

export const ManyTags: Story = {
  args: {
    ...Default.args,
    tags: ["synthwave", "dark", "loop", "atmospheric", "cinematic", "epic", "energetic"],
  },
};

export const MinimalMetadata: Story = {
  args: {
    ...Default.args,
    bpm: undefined,
    keySig: undefined,
    tags: [],
  },
};

export const NoArtwork: Story = {
  args: {
    ...Default.args,
    artworkUrl: undefined,
  },
};

export const HighPrice: Story = {
  args: {
    ...Default.args,
    price: "$99.99",
  },
};
