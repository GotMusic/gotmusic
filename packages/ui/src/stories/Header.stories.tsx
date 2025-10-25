import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "Stories/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Story-specific header component for demonstrations.",
      },
    },
  },
  tags: ["autodocs"],
  render: (args) => (
    <Header
      {...args}
      onLogin={args.onLogin ?? (() => undefined)}
      onLogout={args.onLogout ?? (() => undefined)}
      onCreateAccount={args.onCreateAccount ?? (() => undefined)}
    />
  ),
  argTypes: {
    user: {
      control: "object",
      description: "Authenticated user information",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    user: {
      name: "Jane Doe",
    },
  },
};

export const LoggedOut: Story = {
  args: {
    user: undefined,
  },
};
