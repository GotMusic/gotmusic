import { storybookFixtures } from "@gotmusic/fixtures";
import type { Meta, StoryObj } from "@storybook/react";
import { AssetStatus } from "./AssetStatus";

const meta: Meta<typeof AssetStatus> = {
  title: "Asset/AssetStatus",
  component: AssetStatus,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "success", "warning", "destructive", "muted"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    showIcon: {
      control: { type: "boolean" },
    },
    showLabel: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AssetStatus>;

// ============================================================================
// BASIC STORIES
// ============================================================================

export const Default: Story = {
  args: {
    status: "ready",
  },
};

export const WithIcon: Story = {
  args: {
    status: "processing",
    showIcon: true,
  },
};

export const WithoutIcon: Story = {
  args: {
    status: "ready",
    showIcon: false,
  },
};

export const WithoutLabel: Story = {
  args: {
    status: "error",
    showLabel: false,
  },
};

// ============================================================================
// STATUS STORIES
// ============================================================================

export const Statuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <AssetStatus status="draft" />
      <AssetStatus status="processing" />
      <AssetStatus status="ready" />
      <AssetStatus status="error" />
      <AssetStatus status="archived" />
      <AssetStatus status="published" />
    </div>
  ),
};

// ============================================================================
// VARIANT STORIES
// ============================================================================

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <AssetStatus status="ready" variant="default" />
      <AssetStatus status="ready" variant="success" />
      <AssetStatus status="processing" variant="warning" />
      <AssetStatus status="error" variant="destructive" />
      <AssetStatus status="archived" variant="muted" />
    </div>
  ),
};

// ============================================================================
// SIZE STORIES
// ============================================================================

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Small</h3>
        <AssetStatus status="ready" size="sm" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Medium</h3>
        <AssetStatus status="ready" size="md" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Large</h3>
        <AssetStatus status="ready" size="lg" />
      </div>
    </div>
  ),
};

// ============================================================================
// PROCESSING STORIES
// ============================================================================

export const Processing: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">With Progress</h3>
        <AssetStatus status="processing" isProcessing progress={65} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Without Progress</h3>
        <AssetStatus status="processing" isProcessing />
      </div>
    </div>
  ),
};

// ============================================================================
// ERROR STORIES
// ============================================================================

export const ErrorState: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">With Message</h3>
        <AssetStatus status="error" errorMessage="Upload failed: File format not supported" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Without Message</h3>
        <AssetStatus status="error" />
      </div>
    </div>
  ),
};

// ============================================================================
// ACCESSIBILITY STORIES
// ============================================================================

export const Accessibility: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Screen Reader</h3>
        <p className="text-xs text-fg-muted mb-2">
          Proper semantic markup for status announcements
        </p>
        <div className="flex flex-wrap gap-2">
          <AssetStatus status="ready" />
          <AssetStatus status="processing" isProcessing progress={45} />
          <AssetStatus status="error" errorMessage="Upload failed" />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">High Contrast</h3>
        <p className="text-xs text-fg-muted mb-2">Clear visual hierarchy and contrast ratios</p>
        <div className="flex flex-wrap gap-2">
          <AssetStatus status="ready" variant="success" />
          <AssetStatus status="processing" variant="warning" />
          <AssetStatus status="error" variant="destructive" />
        </div>
      </div>
    </div>
  ),
};

// ============================================================================
// PERFORMANCE STORIES
// ============================================================================

export const Performance: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: 20 }, (_, i) => {
        const status = ["draft", "processing", "ready", "error", "archived", "published"][i % 6] as
          | "draft"
          | "processing"
          | "ready"
          | "error"
          | "archived"
          | "published";
        return <AssetStatus key={`status-${status}-${Date.now()}-${i}`} status={status} />;
      })}
    </div>
  ),
};
