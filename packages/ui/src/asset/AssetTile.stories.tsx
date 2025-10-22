import { storybookFixtures } from "@gotmusic/fixtures";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { AssetTile } from "./AssetTile";

const meta: Meta<typeof AssetTile> = {
  title: "Asset/AssetTile",
  component: AssetTile,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "selected", "disabled"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    isSelected: {
      control: { type: "boolean" },
    },
    showActions: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AssetTile>;

// ============================================================================
// BASIC STORIES
// ============================================================================

export const Default: Story = {
  args: {
    asset: storybookFixtures.assetTiles.draft,
  },
};

export const Selected: Story = {
  args: {
    asset: storybookFixtures.assetTiles.ready,
    isSelected: true,
  },
};

export const Disabled: Story = {
  args: {
    asset: storybookFixtures.assetTiles.ready,
    disabled: true,
  },
};

// ============================================================================
// VARIANT STORIES
// ============================================================================

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Default</h3>
        <AssetTile asset={storybookFixtures.assetTiles.ready} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Selected</h3>
        <AssetTile asset={storybookFixtures.assetTiles.ready} isSelected />
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Disabled</h3>
        <AssetTile asset={storybookFixtures.assetTiles.ready} disabled />
      </div>
    </div>
  ),
};

// ============================================================================
// SIZE STORIES
// ============================================================================

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-start">
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Small</h3>
        <AssetTile asset={storybookFixtures.assetTiles.ready} size="sm" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Medium</h3>
        <AssetTile asset={storybookFixtures.assetTiles.ready} size="md" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Large</h3>
        <AssetTile asset={storybookFixtures.assetTiles.ready} size="lg" />
      </div>
    </div>
  ),
};

// ============================================================================
// STATUS STORIES
// ============================================================================

export const Statuses: Story = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Draft</h3>
        <AssetTile asset={storybookFixtures.assetTiles.draft} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Processing</h3>
        <AssetTile asset={storybookFixtures.assetTiles.processing} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Ready</h3>
        <AssetTile asset={storybookFixtures.assetTiles.ready} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Error</h3>
        <AssetTile asset={storybookFixtures.assetTiles.error} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Archived</h3>
        <AssetTile asset={storybookFixtures.assetTiles.archived} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Published</h3>
        <AssetTile asset={storybookFixtures.assetTiles.published} />
      </div>
    </div>
  ),
};

// ============================================================================
// INTERACTION STORIES
// ============================================================================

export const Interactive: Story = {
  render: () => {
    const [selectedId, setSelectedId] = React.useState<string | null>(null);
    
    const assets = [
      storybookFixtures.assetTiles.draft,
      storybookFixtures.assetTiles.processing,
      storybookFixtures.assetTiles.ready,
      storybookFixtures.assetTiles.error,
      storybookFixtures.assetTiles.archived,
      storybookFixtures.assetTiles.published,
    ];
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {assets.map((asset) => (
            <AssetTile
              key={asset.id}
              asset={asset}
              isSelected={selectedId === asset.id}
              onSelect={setSelectedId}
            />
          ))}
        </div>
        <p className="text-xs text-fg-muted">
          Click tiles to select them. Selected: {selectedId || "None"}
        </p>
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
        <p className="text-xs text-fg-muted mb-2">Use Tab to focus, Enter/Space to select</p>
        <div className="grid grid-cols-2 gap-4">
          <AssetTile asset={storybookFixtures.assetTiles.ready} />
          <AssetTile asset={storybookFixtures.assetTiles.published} />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Screen Reader</h3>
        <p className="text-xs text-fg-muted mb-2">Proper ARIA labels and semantic markup</p>
        <AssetTile asset={storybookFixtures.assetTiles.ready} />
      </div>
    </div>
  ),
};

// ============================================================================
// PERFORMANCE STORIES
// ============================================================================

export const Performance: Story = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 8 }, (_, i) => (
        <AssetTile
          key={`asset-${Date.now()}-${i}`}
          asset={{
            ...storybookFixtures.assetTiles.ready,
            id: `asset-${i}`,
            title: `Asset ${i + 1}`,
          }}
        />
      ))}
    </div>
  ),
};
