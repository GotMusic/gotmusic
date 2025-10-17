import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "Components/Feedback/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "success", "warning", "error", "info"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    duration: {
      control: { type: "number" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Default Toast",
    description: "This is a default toast message.",
  },
};

export const Success: Story = {
  args: {
    title: "Success!",
    description: "Your action was completed successfully.",
    variant: "success",
  },
};

export const Warning: Story = {
  args: {
    title: "Warning",
    description: "Please check your input before proceeding.",
    variant: "warning",
  },
};

export const Error: Story = {
  args: {
    title: "Error",
    description: "Something went wrong. Please try again.",
    variant: "error",
  },
};

export const Info: Story = {
  args: {
    title: "Information",
    description: "Here's some helpful information for you.",
    variant: "info",
  },
};

export const WithAction: Story = {
  args: {
    title: "Action Required",
    description: "Please confirm your action.",
    variant: "warning",
    action: (
      <button className="px-3 py-1 text-sm bg-white text-gray-900 rounded hover:bg-gray-100">
        Confirm
      </button>
    ),
  },
};

export const Small: Story = {
  args: {
    title: "Small Toast",
    description: "This is a small toast message.",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    title: "Large Toast",
    description: "This is a large toast message with more content.",
    size: "lg",
  },
};

export const WithoutDescription: Story = {
  args: {
    title: "Simple Toast",
  },
};

export const WithCustomContent: Story = {
  args: {
    title: "Custom Content",
    children: (
      <div className="mt-2">
        <p className="text-sm">This toast contains custom content.</p>
        <div className="flex gap-2 mt-2">
          <button className="px-2 py-1 text-xs bg-blue-500 text-white rounded">
            Action 1
          </button>
          <button className="px-2 py-1 text-xs bg-gray-500 text-white rounded">
            Action 2
          </button>
        </div>
      </div>
    ),
  },
};

export const AutoDismiss: Story = {
  args: {
    title: "Auto Dismiss",
    description: "This toast will auto-dismiss in 3 seconds.",
    duration: 3000,
  },
};

export const Persistent: Story = {
  args: {
    title: "Persistent Toast",
    description: "This toast will not auto-dismiss.",
    duration: 0,
  },
};
