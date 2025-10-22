import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ReceiptPanel } from "./ReceiptPanel";

const meta: Meta<typeof ReceiptPanel> = {
  title: "Commerce/ReceiptPanel",
  component: ReceiptPanel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["success", "error", "pending"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    status: {
      control: { type: "select" },
      options: ["success", "error", "pending"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    status: "success",
    transactionId: "TXN-123456789",
    amount: 29.99,
    currency: "USD",
    description: "Your payment has been processed successfully.",
    timestamp: new Date("2024-01-15T14:30:00Z"),
    paymentMethod: "Credit Card ending in 1234",
  },
};

export const ErrorReceipt: Story = {
  args: {
    status: "error",
    transactionId: "TXN-123456789",
    amount: 29.99,
    currency: "USD",
    description: "Your payment could not be processed. Please try again.",
    timestamp: new Date("2024-01-15T14:30:00Z"),
    paymentMethod: "Credit Card ending in 1234",
  },
};

export const Pending: Story = {
  args: {
    status: "pending",
    transactionId: "TXN-123456789",
    amount: 29.99,
    currency: "USD",
    description: "Your payment is being processed. This may take a few minutes.",
    timestamp: new Date("2024-01-15T14:30:00Z"),
    paymentMethod: "Credit Card ending in 1234",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Success</h4>
        <ReceiptPanel
          status="success"
          transactionId="TXN-123456789"
          amount={29.99}
          currency="USD"
          description="Your payment has been processed successfully."
          timestamp={new Date("2024-01-15T14:30:00Z")}
          paymentMethod="Credit Card ending in 1234"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Error</h4>
        <ReceiptPanel
          status="error"
          transactionId="TXN-123456789"
          amount={29.99}
          currency="USD"
          description="Your payment could not be processed. Please try again."
          timestamp={new Date("2024-01-15T14:30:00Z")}
          paymentMethod="Credit Card ending in 1234"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Pending</h4>
        <ReceiptPanel
          status="pending"
          transactionId="TXN-123456789"
          amount={29.99}
          currency="USD"
          description="Your payment is being processed. This may take a few minutes."
          timestamp={new Date("2024-01-15T14:30:00Z")}
          paymentMethod="Credit Card ending in 1234"
        />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Small</h4>
        <ReceiptPanel
          status="success"
          transactionId="TXN-123456789"
          amount={29.99}
          currency="USD"
          size="sm"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Medium</h4>
        <ReceiptPanel
          status="success"
          transactionId="TXN-123456789"
          amount={29.99}
          currency="USD"
          size="md"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Large</h4>
        <ReceiptPanel
          status="success"
          transactionId="TXN-123456789"
          amount={29.99}
          currency="USD"
          size="lg"
        />
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [status, setStatus] = useState<"success" | "error" | "pending">("pending");

    const handleRetry = () => {
      setStatus("pending");
      setTimeout(() => setStatus("success"), 3000);
    };

    const handleDownload = () => {
      // Download receipt functionality would go here
    };

    const handleShare = () => {
      // Share receipt functionality would go here
    };

    return (
      <div className="space-y-4">
        <ReceiptPanel
          status={status}
          transactionId="TXN-123456789"
          amount={29.99}
          currency="USD"
          description={
            status === "success"
              ? "Your payment has been processed successfully."
              : status === "error"
                ? "Your payment could not be processed. Please try again."
                : "Your payment is being processed. This may take a few minutes."
          }
          timestamp={new Date("2024-01-15T14:30:00Z")}
          paymentMethod="Credit Card ending in 1234"
          onRetry={status === "error" ? handleRetry : undefined}
          onDownload={status === "success" ? handleDownload : undefined}
          onShare={status === "success" ? handleShare : undefined}
        />

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setStatus("success")}
            className="px-3 py-1 bg-success text-fg-inverse rounded text-sm"
          >
            Success
          </button>
          <button
            type="button"
            onClick={() => setStatus("error")}
            className="px-3 py-1 bg-error text-fg-inverse rounded text-sm"
          >
            Error
          </button>
          <button
            type="button"
            onClick={() => setStatus("pending")}
            className="px-3 py-1 bg-warning text-fg-inverse rounded text-sm"
          >
            Pending
          </button>
        </div>
      </div>
    );
  },
};

export const WithActions: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Success with Actions</h4>
        <ReceiptPanel
          status="success"
          transactionId="TXN-123456789"
          amount={29.99}
          currency="USD"
          description="Your payment has been processed successfully."
          timestamp={new Date("2024-01-15T14:30:00Z")}
          paymentMethod="Credit Card ending in 1234"
          onDownload={() => console.log("Downloading receipt...")}
          onShare={() => console.log("Sharing receipt...")}
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Error with Retry</h4>
        <ReceiptPanel
          status="error"
          transactionId="TXN-123456789"
          amount={29.99}
          currency="USD"
          description="Your payment could not be processed. Please try again."
          timestamp={new Date("2024-01-15T14:30:00Z")}
          paymentMethod="Credit Card ending in 1234"
          onRetry={() => console.log("Retrying payment...")}
        />
      </div>
    </div>
  ),
};

export const A11y: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Screen Reader Support</h4>
        <p className="text-sm text-fg-muted mb-4">
          Receipt panels have proper semantic structure for screen readers
        </p>
        <ReceiptPanel
          status="success"
          transactionId="TXN-123456789"
          amount={29.99}
          currency="USD"
          description="Your payment has been processed successfully."
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Keyboard Navigation</h4>
        <p className="text-sm text-fg-muted mb-4">Action buttons are keyboard accessible</p>
        <ReceiptPanel
          status="success"
          transactionId="TXN-123456789"
          amount={29.99}
          currency="USD"
          description="Your payment has been processed successfully."
          onDownload={() => console.log("Downloading receipt...")}
          onShare={() => console.log("Sharing receipt...")}
        />
      </div>
    </div>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Minimal Information</h4>
        <ReceiptPanel status="success" description="Payment completed" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">High Amount</h4>
        <ReceiptPanel
          status="success"
          transactionId="TXN-123456789"
          amount={9999.99}
          currency="USD"
          description="Your payment has been processed successfully."
          timestamp={new Date("2024-01-15T14:30:00Z")}
          paymentMethod="Credit Card ending in 1234"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Long Transaction ID</h4>
        <ReceiptPanel
          status="success"
          transactionId="TXN-12345678901234567890"
          amount={29.99}
          currency="USD"
          description="Your payment has been processed successfully."
          timestamp={new Date("2024-01-15T14:30:00Z")}
          paymentMethod="Credit Card ending in 1234"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Different Currency</h4>
        <ReceiptPanel
          status="success"
          transactionId="TXN-123456789"
          amount={29.99}
          currency="EUR"
          description="Your payment has been processed successfully."
          timestamp={new Date("2024-01-15T14:30:00Z")}
          paymentMethod="Credit Card ending in 1234"
        />
      </div>
    </div>
  ),
};
