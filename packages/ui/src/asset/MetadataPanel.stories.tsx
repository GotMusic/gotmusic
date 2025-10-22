import { storybookFixtures } from "@gotmusic/fixtures";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MetadataPanel } from "./MetadataPanel";

const meta: Meta<typeof MetadataPanel> = {
  title: "Asset/MetadataPanel",
  component: MetadataPanel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "editing", "error"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    isEditing: {
      control: { type: "boolean" },
    },
    isSaving: {
      control: { type: "boolean" },
    },
    hasError: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MetadataPanel>;

// ============================================================================
// BASIC STORIES
// ============================================================================

export const Default: Story = {
  args: {
    metadata: storybookFixtures.assetMetadata.basic,
  },
};

export const Editing: Story = {
  args: {
    metadata: storybookFixtures.assetMetadata.basic,
    isEditing: true,
  },
};

export const Saving: Story = {
  args: {
    metadata: storybookFixtures.assetMetadata.basic,
    isEditing: true,
    isSaving: true,
  },
};

export const ErrorState: Story = {
  args: {
    metadata: storybookFixtures.assetMetadata.basic,
    hasError: true,
    errorMessage: "Failed to save metadata. Please try again.",
  },
};

// ============================================================================
// METADATA STORIES
// ============================================================================

export const MetadataTypes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Basic Metadata</h3>
        <MetadataPanel metadata={storybookFixtures.assetMetadata.basic} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Complete Metadata</h3>
        <MetadataPanel metadata={storybookFixtures.assetMetadata.complete} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Minimal Metadata</h3>
        <MetadataPanel metadata={storybookFixtures.assetMetadata.minimal} />
      </div>
    </div>
  ),
};

// ============================================================================
// VARIANT STORIES
// ============================================================================

export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Default</h3>
        <MetadataPanel metadata={storybookFixtures.assetMetadata.basic} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Editing</h3>
        <MetadataPanel metadata={storybookFixtures.assetMetadata.basic} isEditing />
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Error</h3>
        <MetadataPanel
          metadata={storybookFixtures.assetMetadata.basic}
          hasError
          errorMessage="Validation failed"
        />
      </div>
    </div>
  ),
};

// ============================================================================
// SIZE STORIES
// ============================================================================

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Small</h3>
        <MetadataPanel metadata={storybookFixtures.assetMetadata.basic} size="sm" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Medium</h3>
        <MetadataPanel metadata={storybookFixtures.assetMetadata.basic} size="md" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Large</h3>
        <MetadataPanel metadata={storybookFixtures.assetMetadata.basic} size="lg" />
      </div>
    </div>
  ),
};

// ============================================================================
// INTERACTION STORIES
// ============================================================================

export const Interactive: Story = {
  render: () => {
    const [isEditing, setIsEditing] = React.useState(false);
    const [metadata, setMetadata] = React.useState(storybookFixtures.assetMetadata.basic);

    const handleSave = (newMetadata: typeof metadata) => {
      setMetadata(newMetadata);
      setIsEditing(false);
    };

    const handleCancel = () => {
      setIsEditing(false);
    };

    return (
      <div className="space-y-4">
        <MetadataPanel
          metadata={metadata}
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onSave={handleSave}
          onCancel={handleCancel}
        />
        <p className="text-xs text-fg-muted">
          Click "Edit" to modify metadata, then "Save" or "Cancel"
        </p>
      </div>
    );
  },
};

// ============================================================================
// VALIDATION STORIES
// ============================================================================

export const Validation: Story = {
  render: () => {
    const [validationErrors, setValidationErrors] = React.useState<Record<string, string[]>>({
      title: ["Title is required"],
      bpm: ["BPM must be between 60 and 200"],
    });

    return (
      <div className="space-y-4">
        <MetadataPanel
          metadata={storybookFixtures.assetMetadata.basic}
          isEditing
          validationErrors={validationErrors}
        />
        <p className="text-xs text-fg-muted">Shows validation errors for required fields</p>
      </div>
    );
  },
};

// ============================================================================
// ACCESSIBILITY STORIES
// ============================================================================

export const Accessibility: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Keyboard Navigation</h3>
        <p className="text-xs text-fg-muted mb-2">
          Use Tab to navigate between fields, Enter to save
        </p>
        <MetadataPanel metadata={storybookFixtures.assetMetadata.basic} isEditing />
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Screen Reader</h3>
        <p className="text-xs text-fg-muted mb-2">Proper form labels and field associations</p>
        <MetadataPanel metadata={storybookFixtures.assetMetadata.basic} />
      </div>
    </div>
  ),
};

// ============================================================================
// PERFORMANCE STORIES
// ============================================================================

export const Performance: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: 4 }, (_, i) => (
        <MetadataPanel
          key={`metadata-${Date.now()}-${i}`}
          metadata={{
            ...storybookFixtures.assetMetadata.basic,
            title: `Asset ${i + 1}`,
            artist: `Artist ${i + 1}`,
          }}
        />
      ))}
    </div>
  ),
};
