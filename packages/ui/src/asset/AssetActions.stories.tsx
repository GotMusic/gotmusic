import { storybookFixtures } from "@gotmusic/fixtures";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { AssetActions } from "./AssetActions";

const meta: Meta<typeof AssetActions> = {
  title: "Asset/AssetActions",
  component: AssetActions,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "compact", "minimal"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    placement: {
      control: { type: "select" },
      options: ["top", "bottom", "left", "right"],
    },
    align: {
      control: { type: "select" },
      options: ["start", "center", "end"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof AssetActions>;

// ============================================================================
// BASIC STORIES
// ============================================================================

export const Default: Story = {
  args: {
    actions: [
      {
        type: "edit",
        label: "Edit",
        icon: () => null,
        onClick: () => ,
      },
      {
        type: "delete",
        label: "Delete",
        icon: () => null,
        isDestructive: true,
        onClick: () => ,
      },
    ],
  },
};

export const WithAllActions: Story = {
  args: {
    actions: [
      {
        type: "edit",
        label: "Edit",
        icon: () => null,
        onClick: () => ,
      },
      {
        type: "publish",
        label: "Publish",
        icon: () => null,
        onClick: () => ,
      },
      {
        type: "archive",
        label: "Archive",
        icon: () => null,
        onClick: () => ,
      },
      {
        type: "duplicate",
        label: "Duplicate",
        icon: () => null,
        onClick: () => ,
      },
      {
        type: "delete",
        label: "Delete",
        icon: () => null,
        isDestructive: true,
        onClick: () => ,
      },
    ],
  },
};

// ============================================================================
// VARIANT STORIES
// ============================================================================

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Default</h3>
        <AssetActions
          actions={[
            { type: "edit", label: "Edit", icon: () => null, onClick: () => {} },
            {
              type: "delete",
              label: "Delete",
              icon: () => null,
              isDestructive: true,
              onClick: () => {},
            },
          ]}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Compact</h3>
        <AssetActions
          variant="compact"
          actions={[
            { type: "edit", label: "Edit", icon: () => null, onClick: () => {} },
            {
              type: "delete",
              label: "Delete",
              icon: () => null,
              isDestructive: true,
              onClick: () => {},
            },
          ]}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Minimal</h3>
        <AssetActions
          variant="minimal"
          actions={[
            { type: "edit", label: "Edit", icon: () => null, onClick: () => {} },
            {
              type: "delete",
              label: "Delete",
              icon: () => null,
              isDestructive: true,
              onClick: () => {},
            },
          ]}
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
    <div className="flex items-center gap-4">
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Small</h3>
        <AssetActions
          size="sm"
          actions={[
            { type: "edit", label: "Edit", icon: () => null, onClick: () => {} },
            {
              type: "delete",
              label: "Delete",
              icon: () => null,
              isDestructive: true,
              onClick: () => {},
            },
          ]}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Medium</h3>
        <AssetActions
          size="md"
          actions={[
            { type: "edit", label: "Edit", icon: () => null, onClick: () => {} },
            {
              type: "delete",
              label: "Delete",
              icon: () => null,
              isDestructive: true,
              onClick: () => {},
            },
          ]}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Large</h3>
        <AssetActions
          size="lg"
          actions={[
            { type: "edit", label: "Edit", icon: () => null, onClick: () => {} },
            {
              type: "delete",
              label: "Delete",
              icon: () => null,
              isDestructive: true,
              onClick: () => {},
            },
          ]}
        />
      </div>
    </div>
  ),
};

// ============================================================================
// PLACEMENT STORIES
// ============================================================================

export const Placements: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Top</h3>
        <div className="relative h-32 flex items-end justify-center">
          <AssetActions
            placement="top"
            actions={[
              { type: "edit", label: "Edit", icon: () => null, onClick: () => {} },
              {
                type: "delete",
                label: "Delete",
                icon: () => null,
                isDestructive: true,
                onClick: () => {},
              },
            ]}
          />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Bottom</h3>
        <div className="relative h-32 flex items-start justify-center">
          <AssetActions
            placement="bottom"
            actions={[
              { type: "edit", label: "Edit", icon: () => null, onClick: () => {} },
              {
                type: "delete",
                label: "Delete",
                icon: () => null,
                isDestructive: true,
                onClick: () => {},
              },
            ]}
          />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Left</h3>
        <div className="relative w-32 h-16 flex items-center justify-end">
          <AssetActions
            placement="left"
            actions={[
              { type: "edit", label: "Edit", icon: () => null, onClick: () => {} },
              {
                type: "delete",
                label: "Delete",
                icon: () => null,
                isDestructive: true,
                onClick: () => {},
              },
            ]}
          />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Right</h3>
        <div className="relative w-32 h-16 flex items-center justify-start">
          <AssetActions
            placement="right"
            actions={[
              { type: "edit", label: "Edit", icon: () => null, onClick: () => {} },
              {
                type: "delete",
                label: "Delete",
                icon: () => null,
                isDestructive: true,
                onClick: () => {},
              },
            ]}
          />
        </div>
      </div>
    </div>
  ),
};

// ============================================================================
// ALIGNMENT STORIES
// ============================================================================

export const Alignments: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Start</h3>
        <div className="relative h-16 flex items-start justify-center">
          <AssetActions
            align="start"
            actions={[
              { type: "edit", label: "Edit", icon: () => null, onClick: () => {} },
              {
                type: "delete",
                label: "Delete",
                icon: () => null,
                isDestructive: true,
                onClick: () => {},
              },
            ]}
          />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Center</h3>
        <div className="relative h-16 flex items-start justify-center">
          <AssetActions
            align="center"
            actions={[
              { type: "edit", label: "Edit", icon: () => null, onClick: () => {} },
              {
                type: "delete",
                label: "Delete",
                icon: () => null,
                isDestructive: true,
                onClick: () => {},
              },
            ]}
          />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">End</h3>
        <div className="relative h-16 flex items-start justify-center">
          <AssetActions
            align="end"
            actions={[
              { type: "edit", label: "Edit", icon: () => null, onClick: () => {} },
              {
                type: "delete",
                label: "Delete",
                icon: () => null,
                isDestructive: true,
                onClick: () => {},
              },
            ]}
          />
        </div>
      </div>
    </div>
  ),
};

// ============================================================================
// DISABLED STORIES
// ============================================================================

export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Some Disabled</h3>
        <AssetActions
          actions={[
            { type: "edit", label: "Edit", icon: () => null, onClick: () => {} },
            {
              type: "publish",
              label: "Publish",
              icon: () => null,
              isDisabled: true,
              onClick: () => {},
            },
            {
              type: "delete",
              label: "Delete",
              icon: () => null,
              isDestructive: true,
              onClick: () => {},
            },
          ]}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">All Disabled</h3>
        <AssetActions
          actions={[
            { type: "edit", label: "Edit", icon: () => null, isDisabled: true, onClick: () => {} },
            {
              type: "delete",
              label: "Delete",
              icon: () => null,
              isDisabled: true,
              isDestructive: true,
              onClick: () => {},
            },
          ]}
        />
      </div>
    </div>
  ),
};

// ============================================================================
// INTERACTION STORIES
// ============================================================================

export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <div className="space-y-4">
        <AssetActions
          actions={[
            {
              type: "edit",
              label: "Edit",
              icon: () => null,
              onClick: () => ,
            },
            {
              type: "publish",
              label: "Publish",
              icon: () => null,
              onClick: () => ,
            },
            {
              type: "archive",
              label: "Archive",
              icon: () => null,
              onClick: () => ,
            },
            {
              type: "duplicate",
              label: "Duplicate",
              icon: () => null,
              onClick: () => ,
            },
            {
              type: "delete",
              label: "Delete",
              icon: () => null,
              isDestructive: true,
              onClick: () => ,
            },
          ]}
          isOpen={isOpen}
          onToggle={setIsOpen}
        />
        <p className="text-xs text-fg-muted">
          Click the menu to open/close. Menu is {isOpen ? "open" : "closed"}
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
        <p className="text-xs text-fg-muted mb-2">
          Use Tab to focus, Enter/Space to open menu, Arrow keys to navigate, Escape to close
        </p>
        <AssetActions
          actions={[
            { type: "edit", label: "Edit", icon: () => null, onClick: () => {} },
            {
              type: "delete",
              label: "Delete",
              icon: () => null,
              isDestructive: true,
              onClick: () => {},
            },
          ]}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Screen Reader</h3>
        <p className="text-xs text-fg-muted mb-2">Proper ARIA labels and menu semantics</p>
        <AssetActions
          actions={[
            { type: "edit", label: "Edit", icon: () => null, onClick: () => {} },
            {
              type: "delete",
              label: "Delete",
              icon: () => null,
              isDestructive: true,
              onClick: () => {},
            },
          ]}
        />
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
      {Array.from({ length: 10 }, (_, i) => (
        <AssetActions
          key={`actions-${Date.now()}-${i}`}
          actions={[
            { type: "edit", label: "Edit", icon: () => null, onClick: () => {} },
            {
              type: "delete",
              label: "Delete",
              icon: () => null,
              isDestructive: true,
              onClick: () => {},
            },
          ]}
        />
      ))}
    </div>
  ),
};
