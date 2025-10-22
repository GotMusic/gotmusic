import { storybookFixtures } from "@gotmusic/fixtures";
import type { Meta, StoryObj } from "@storybook/react";
import { ReceiptPanel } from "./ReceiptPanel";

const meta: Meta<typeof ReceiptPanel> = {
  title: "Commerce/ReceiptPanel",
  component: ReceiptPanel,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Receipt panel component for displaying transaction results, payment status, and post-purchase actions. Supports success, error, and pending states.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    status: {
      description: "Transaction status",
      control: "select",
      options: ["success", "error", "pending"],
    },
    transaction: {
      description: "Transaction information",
      control: "object",
    },
    onDownload: {
      description: "Callback for download action",
      action: "download",
    },
    onViewTransaction: {
      description: "Callback for view transaction action",
      action: "viewTransaction",
    },
  },
  args: {
    status: "success",
    transaction: {
      id: "tx_123456789",
      amount: 12.99,
      currency: "PYUSD",
      timestamp: new Date("2024-01-15T14:30:00Z"),
      method: "MetaMask",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// PRIMARY STORIES
// ============================================================================

export const Primary: Story = {
  args: {
    status: "success",
  },
};

export const StatusVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Success
        </h3>
        <ReceiptPanel
          status="success"
          transaction={{
            id: "tx_123456789",
            amount: 12.99,
            currency: "PYUSD",
            timestamp: new Date("2024-01-15T14:30:00Z"),
            method: "MetaMask",
          }}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Error
        </h3>
        <ReceiptPanel
          status="error"
          transaction={{
            id: "tx_123456789",
            amount: 12.99,
            currency: "PYUSD",
            timestamp: new Date("2024-01-15T14:30:00Z"),
            method: "MetaMask",
          }}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Pending
        </h3>
        <ReceiptPanel
          status="pending"
          transaction={{
            id: "tx_123456789",
            amount: 12.99,
            currency: "PYUSD",
            timestamp: new Date("2024-01-15T14:30:00Z"),
            method: "MetaMask",
          }}
        />
      </div>
    </div>
  ),
};

export const WithAsset: Story = {
  args: {
    status: "success",
  },
};

export const WithoutAsset: Story = {
  args: {
    status: "success",
  },
};

// ============================================================================
// TRANSACTION VARIANTS
// ============================================================================

export const TransactionVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          PYUSD Payment
        </h3>
        <ReceiptPanel
          status="success"
          transaction={{
            id: "tx_pyusd_001",
            amount: 12.99,
            currency: "PYUSD",
            timestamp: new Date("2024-01-15T14:30:00Z"),
            method: "MetaMask",
          }}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          USD Payment
        </h3>
        <ReceiptPanel
          status="success"
          transaction={{
            id: "tx_usd_001",
            amount: 15.99,
            currency: "USD",
            timestamp: new Date("2024-01-15T14:30:00Z"),
            method: "Visa •••• 4242",
          }}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          High Value
        </h3>
        <ReceiptPanel
          status="success"
          transaction={{
            id: "tx_premium_001",
            amount: 99.99,
            currency: "PYUSD",
            timestamp: new Date("2024-01-15T14:30:00Z"),
            method: "MetaMask",
          }}
        />
      </div>
    </div>
  ),
};

// ============================================================================
// ACCESSIBILITY STORIES
// ============================================================================

export const A11y: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Screen Reader
        </h3>
        <p className="text-xs text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Proper semantic markup for transaction announcements
        </p>
        <ReceiptPanel
          status="success"
          transaction={{
            id: "tx_123456789",
            amount: 12.99,
            currency: "PYUSD",
            timestamp: new Date("2024-01-15T14:30:00Z"),
            method: "MetaMask",
          }}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Keyboard Navigation
        </h3>
        <p className="text-xs text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Action buttons are keyboard accessible
        </p>
        <ReceiptPanel
          status="success"
          transaction={{
            id: "tx_123456789",
            amount: 12.99,
            currency: "PYUSD",
            timestamp: new Date("2024-01-15T14:30:00Z"),
            method: "MetaMask",
          }}
        />
      </div>
    </div>
  ),
};

// ============================================================================
// EDGE CASES
// ============================================================================

export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          No Details
        </h3>
        <ReceiptPanel
          status="success"
          transaction={{
            id: "tx_123456789",
            amount: 12.99,
            currency: "PYUSD",
            timestamp: new Date("2024-01-15T14:30:00Z"),
            method: "MetaMask",
          }}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          No Actions
        </h3>
        <ReceiptPanel
          status="success"
          transaction={{
            id: "tx_123456789",
            amount: 12.99,
            currency: "PYUSD",
            timestamp: new Date("2024-01-15T14:30:00Z"),
            method: "MetaMask",
          }}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Minimal
        </h3>
        <ReceiptPanel
          status="success"
          transaction={{
            id: "tx_123456789",
            amount: 12.99,
            currency: "PYUSD",
            timestamp: new Date("2024-01-15T14:30:00Z"),
            method: "MetaMask",
          }}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--color-text-secondary,#A9B1C1)] mb-2">
          Long Transaction ID
        </h3>
        <ReceiptPanel
          status="success"
          transaction={{
            id: "tx_very_long_transaction_id_that_might_wrap_to_multiple_lines",
            amount: 12.99,
            currency: "PYUSD",
            timestamp: new Date("2024-01-15T14:30:00Z"),
            method: "MetaMask",
          }}
        />
      </div>
    </div>
  ),
};

// ============================================================================
// INTERACTIVE STORIES
// ============================================================================

export const Interactive: Story = {
  render: () => {
    const handleDownload = () => {
      // Download action
    };

    const handleViewTransaction = () => {
      // View transaction action
    };

    const handleRetry = () => {
      // Retry action
    };

    return (
      <div className="space-y-4">
        <ReceiptPanel
          status="success"
          transaction={{
            id: "tx_123456789",
            amount: 12.99,
            currency: "PYUSD",
            timestamp: new Date("2024-01-15T14:30:00Z"),
            method: "MetaMask",
          }}
          onDownload={handleDownload}
          onViewTransaction={handleViewTransaction}
        />
        <p className="text-xs text-[var(--color-text-secondary,#A9B1C1)]">
          Click action buttons to trigger callbacks
        </p>
      </div>
    );
  },
};

// ============================================================================
// PERFORMANCE STORIES
// ============================================================================

export const Performance: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4">
      {Array.from({ length: 4 }, (_, i) => (
        <ReceiptPanel
          key={`receipt-panel-${i}`}
          status="success"
          transaction={{
            id: `tx_${i}`,
            amount: 12.99,
            currency: "PYUSD",
            timestamp: new Date("2024-01-15T14:30:00Z"),
            method: "MetaMask",
          }}
        />
      ))}
    </div>
  ),
};
