import type { Meta, StoryObj } from "@storybook/react";
import { Page } from "./Page";

const meta: Meta<typeof Page> = {
  title: "Stories/Page",
  component: Page,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Story-specific page component for demonstrations.",
      },
    },
  },
  tags: ["autodocs"],
  render: () => <Page />,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
