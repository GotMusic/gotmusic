import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../core/Button";
import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Feedback/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["info", "success", "warning", "error"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    dismissible: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    title: "Information",
    description: "This is an informational alert.",
    variant: "info",
  },
};

export const Success: Story = {
  args: {
    title: "Success!",
    description: "Your operation completed successfully.",
    variant: "success",
  },
};

export const Warning: Story = {
  args: {
    title: "Warning",
    description: "Please review your input before continuing.",
    variant: "warning",
  },
};

export const ErrorAlert: Story = {
  args: {
    title: "Error",
    description: "Something went wrong. Please try again.",
    variant: "error",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert size="sm" title="Small Alert" description="This is a small alert." variant="info" />
      <Alert
        size="md"
        title="Medium Alert"
        description="This is a medium alert."
        variant="success"
      />
      <Alert size="lg" title="Large Alert" description="This is a large alert." variant="warning" />
    </div>
  ),
};

export const Dismissible: Story = {
  render: () => {
    const [alerts, setAlerts] = useState([
      {
        id: 1,
        variant: "info" as const,
        title: "Dismissible Alert",
        description: "This alert can be dismissed.",
      },
      {
        id: 2,
        variant: "success" as const,
        title: "Another Alert",
        description: "This is another dismissible alert.",
      },
    ]);

    const removeAlert = (id: number) => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    };

    return (
      <div className="space-y-4">
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            title={alert.title}
            description={alert.description}
            variant={alert.variant}
            dismissible
            onClose={() => removeAlert(alert.id)}
          />
        ))}
      </div>
    );
  },
};

export const WithAction: Story = {
  render: () => (
    <Alert
      title="Action Required"
      description="Please complete your profile to continue."
      variant="warning"
      action={
        <Button size="sm" variant="outline">
          Complete Profile
        </Button>
      }
    />
  ),
};

export const CustomIcon: Story = {
  render: () => (
    <Alert
      title="Custom Icon"
      description="This alert has a custom icon."
      icon={<span>🚀</span>}
      variant="info"
    />
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert title="Info Alert" description="This is an info alert." variant="info" />
      <Alert title="Success Alert" description="This is a success alert." variant="success" />
      <Alert title="Warning Alert" description="This is a warning alert." variant="warning" />
      <Alert title="Error Alert" description="This is an error alert." variant="error" />
    </div>
  ),
};

export const A11y: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Screen Reader Support</h4>
        <p className="text-sm text-fg-muted mb-4">
          Alerts have proper ARIA roles and live regions for screen readers
        </p>
        <Alert
          title="Accessible Alert"
          description="This alert is properly announced to screen readers"
          variant="info"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Keyboard Navigation</h4>
        <p className="text-sm text-fg-muted mb-4">
          Dismissible alerts have keyboard accessible close buttons
        </p>
        <Alert
          title="Keyboard Accessible"
          description="Press Tab to focus the close button, Enter to dismiss"
          variant="success"
          dismissible
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
        <Alert
          title="This is a very long title that might wrap to multiple lines and test the layout"
          description="This is a very long description that might wrap to multiple lines and test how the alert handles overflow and text wrapping in different scenarios."
          variant="info"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">No Title</h4>
        <Alert description="This alert has no title, just a description." variant="success" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">No Description</h4>
        <Alert title="This alert has no description" variant="warning" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Custom Content</h4>
        <Alert variant="info">
          <div className="space-y-2">
            <h4 className="font-medium">Custom Alert Content</h4>
            <p className="text-sm text-fg-muted">This alert contains custom React content.</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                Action 1
              </Button>
              <Button size="sm" variant="outline">
                Action 2
              </Button>
            </div>
          </div>
        </Alert>
      </div>
    </div>
  ),
};
