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
  argTypes: {
    user: {
      control: "object",
      description: "User object for display.",
    },
    onLogin: {
      action: "logged in",
      description: "Callback for login action.",
    },
    onLogout: {
      action: "logged out",
      description: "Callback for logout action.",
    },
    onCreateAccount: {
      action: "account created",
      description: "Callback for create account action.",
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
  args: {},
};
