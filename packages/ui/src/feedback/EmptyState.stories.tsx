import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../core/Button";
import { EmptyState } from "./EmptyState";

const meta: Meta<typeof EmptyState> = {
  title: "Feedback/EmptyState",
  component: EmptyState,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["no-data", "error", "loading", "success"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NoData: Story = {
  args: {
    title: "No items found",
    description: "There are no items to display at the moment.",
    variant: "no-data",
  },
};

export const ErrorState: Story = {
  args: {
    title: "Failed to load",
    description: "We couldn't load your data. Please try again.",
    variant: "error",
  },
};

export const Loading: Story = {
  args: {
    title: "Loading...",
    description: "Please wait while we fetch your data.",
    variant: "loading",
  },
};

export const Success: Story = {
  args: {
    title: "All done!",
    description: "Everything has been completed successfully.",
    variant: "success",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <EmptyState
        size="sm"
        title="Small Empty State"
        description="This is a small empty state."
        variant="no-data"
      />
      <EmptyState
        size="md"
        title="Medium Empty State"
        description="This is a medium empty state."
        variant="error"
      />
      <EmptyState
        size="lg"
        title="Large Empty State"
        description="This is a large empty state."
        variant="success"
      />
    </div>
  ),
};

export const WithAction: Story = {
  render: () => (
    <EmptyState
      title="No projects yet"
      description="Get started by creating your first project."
      variant="no-data"
      action={{
        label: "Create Project",
        onClick: () => {},
      }}
    />
  ),
};

export const WithSecondaryAction: Story = {
  render: () => (
    <EmptyState
      title="No data available"
      description="You don't have any data to display."
      variant="no-data"
      action={{
        label: "Import Data",
        onClick: () => {},
      }}
      secondaryAction={{
        label: "Learn More",
        onClick: () => {},
      }}
    />
  ),
};

export const CustomIcon: Story = {
  render: () => (
    <EmptyState
      title="Custom Icon"
      description="This empty state has a custom icon."
      icon={<span>🎨</span>}
      variant="no-data"
    />
  ),
};

export const Interactive: Story = {
  render: () => {
    const [variant, setVariant] = useState<"no-data" | "error" | "loading" | "success">("no-data");

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button
            onClick={() => setVariant("no-data")}
            variant={variant === "no-data" ? "primary" : "outline"}
          >
            No Data
          </Button>
          <Button
            onClick={() => setVariant("error")}
            variant={variant === "error" ? "primary" : "outline"}
          >
            Error
          </Button>
          <Button
            onClick={() => setVariant("loading")}
            variant={variant === "loading" ? "primary" : "outline"}
          >
            Loading
          </Button>
          <Button
            onClick={() => setVariant("success")}
            variant={variant === "success" ? "primary" : "outline"}
          >
            Success
          </Button>
        </div>

        <EmptyState
          variant={variant}
          action={{
            label: "Try Again",
            onClick: () => {},
          }}
        />
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <EmptyState title="No Data" description="There's nothing to show here." variant="no-data" />
      <EmptyState title="Error" description="Something went wrong." variant="error" />
      <EmptyState title="Loading" description="Please wait..." variant="loading" />
      <EmptyState title="Success" description="All done!" variant="success" />
    </div>
  ),
};

export const A11y: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h4 className="text-sm font-medium mb-2">Screen Reader Support</h4>
        <p className="text-sm text-fg-muted mb-4">
          Empty states have proper semantic structure for screen readers
        </p>
        <EmptyState
          title="Accessible Empty State"
          description="This empty state is properly structured for screen readers"
          variant="no-data"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Keyboard Navigation</h4>
        <p className="text-sm text-fg-muted mb-4">Action buttons are keyboard accessible</p>
        <EmptyState
          title="Keyboard Accessible"
          description="Press Tab to focus buttons, Enter to activate"
          variant="error"
          action={{
            label: "Retry",
            onClick: () => {},
          }}
        />
      </div>
    </div>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h4 className="text-sm font-medium mb-2">Long Content</h4>
        <EmptyState
          title="This is a very long title that might wrap to multiple lines and test the layout"
          description="This is a very long description that might wrap to multiple lines and test how the empty state handles overflow and text wrapping in different scenarios."
          variant="no-data"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">No Title</h4>
        <EmptyState
          description="This empty state has no title, just a description."
          variant="error"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">No Description</h4>
        <EmptyState title="This empty state has no description" variant="success" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Custom Content</h4>
        <EmptyState variant="no-data">
          <div className="space-y-4">
            <h4 className="font-medium">Custom Empty State Content</h4>
            <p className="text-sm text-fg-muted">This empty state contains custom React content.</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                Action 1
              </Button>
              <Button size="sm" variant="outline">
                Action 2
              </Button>
            </div>
          </div>
        </EmptyState>
      </div>
    </div>
  ),
};
