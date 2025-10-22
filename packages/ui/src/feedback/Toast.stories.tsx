import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../core/Button";
import { Toast } from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "Feedback/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["success", "error", "warning", "info"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    autoClose: {
      control: { type: "boolean" },
    },
    persistent: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    title: "Success!",
    description: "Your changes have been saved successfully.",
    variant: "success",
  },
};

export const ErrorToast: Story = {
  args: {
    title: "Error",
    description: "Something went wrong. Please try again.",
    variant: "error",
  },
};

export const Warning: Story = {
  args: {
    title: "Warning",
    description: "Please review your input before continuing.",
    variant: "warning",
  },
};

export const Info: Story = {
  args: {
    title: "Information",
    description: "Here's some helpful information for you.",
    variant: "info",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Toast size="sm" title="Small Toast" description="This is a small toast notification." />
      <Toast size="md" title="Medium Toast" description="This is a medium toast notification." />
      <Toast size="lg" title="Large Toast" description="This is a large toast notification." />
    </div>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Toast
      title="File uploaded"
      description="Your file has been uploaded successfully."
      variant="success"
      action={
        <Button size="sm" variant="outline">
          View
        </Button>
      }
    />
  ),
};

export const Persistent: Story = {
  render: () => (
    <Toast
      title="Important Notice"
      description="This is a persistent notification that won't auto-close."
      variant="warning"
      persistent
    />
  ),
};

export const CustomIcon: Story = {
  render: () => (
    <Toast
      title="Custom Icon"
      description="This toast has a custom icon."
      icon={<span>🎉</span>}
      variant="success"
    />
  ),
};

export const Interactive: Story = {
  render: () => {
    const [toasts, setToasts] = useState<
      Array<{ id: number; variant: "success" | "error" | "warning" | "info" }>
    >([]);

    const addToast = (variant: "success" | "error" | "warning" | "info") => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, variant }]);
    };

    const removeToast = (id: number) => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={() => addToast("success")}>Success Toast</Button>
          <Button onClick={() => addToast("error")} variant="danger">
            Error Toast
          </Button>
          <Button onClick={() => addToast("warning")} variant="secondary">
            Warning Toast
          </Button>
          <Button onClick={() => addToast("info")} variant="outline">
            Info Toast
          </Button>
        </div>

        <div className="space-y-2">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              title={`${toast.variant.charAt(0).toUpperCase() + toast.variant.slice(1)} Toast`}
              description={`This is a ${toast.variant} notification.`}
              variant={toast.variant}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </div>
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Toast title="Success" description="Operation completed successfully." variant="success" />
      <Toast title="Error" description="An error occurred during the operation." variant="error" />
      <Toast title="Warning" description="Please review your input." variant="warning" />
      <Toast title="Info" description="Here's some helpful information." variant="info" />
    </div>
  ),
};

export const A11y: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Screen Reader Support</h4>
        <p className="text-sm text-fg-muted mb-4">
          Toasts have proper ARIA roles and live regions for screen readers
        </p>
        <Toast
          title="Accessible Toast"
          description="This toast is properly announced to screen readers"
          variant="info"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Keyboard Navigation</h4>
        <p className="text-sm text-fg-muted mb-4">Close buttons are keyboard accessible</p>
        <Toast
          title="Keyboard Accessible"
          description="Press Tab to focus the close button, Enter to close"
          variant="success"
          onClose={() => {}}
        />
      </div>
    </div>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Long Content</h4>
        <Toast
          title="This is a very long title that might wrap to multiple lines and test the layout"
          description="This is a very long description that might wrap to multiple lines and test how the toast handles overflow and text wrapping in different scenarios."
          variant="info"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">No Title</h4>
        <Toast description="This toast has no title, just a description." variant="success" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">No Description</h4>
        <Toast title="This toast has no description" variant="warning" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Custom Content</h4>
        <Toast variant="info">
          <div className="space-y-2">
            <h4 className="font-medium">Custom Content</h4>
            <p className="text-sm text-fg-muted">This toast contains custom React content.</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                Action 1
              </Button>
              <Button size="sm" variant="outline">
                Action 2
              </Button>
            </div>
          </div>
        </Toast>
      </div>
    </div>
  ),
};
