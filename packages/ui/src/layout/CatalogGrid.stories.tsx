import { storybookFixtures } from "@gotmusic/fixtures";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { CatalogCard } from "../media/CatalogCard";
import { CatalogGrid, CatalogGridEmpty, CatalogGridSkeleton } from "./CatalogGrid";

const meta: Meta<typeof CatalogGrid> = {
  title: "Layout/CatalogGrid",
  component: CatalogGrid,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Responsive grid layout for displaying catalog items with loading states, empty states, and customizable columns.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    columns: {
      control: "object",
      description: "Number of columns for different screen sizes",
    },
    gap: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Gap between grid items",
    },
    loading: {
      control: "boolean",
      description: "Whether to show loading skeleton",
    },
    skeletonCount: {
      control: "number",
      description: "Number of skeleton items to show when loading",
    },
    scrollable: {
      control: "boolean",
      description: "Whether the grid is scrollable",
    },
  },
  args: {
    gap: "md",
    loading: false,
    skeletonCount: 6,
    scrollable: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for stories
const sampleAssets = [
  storybookFixtures.assets.basic,
  storybookFixtures.assets.expensive,
  storybookFixtures.assets.free,
  storybookFixtures.assets.longTitle,
];

// ============================================================================
// PRIMARY STORIES (Required by STORYBOOK-GUIDE.md)
// ============================================================================

export const Primary: Story = {
  render: () => (
    <CatalogGrid columns={{ default: 1, sm: 2, md: 3, lg: 4 }}>
      {sampleAssets.map((asset) => (
        <CatalogCard
          key={asset.id}
          id={asset.id}
          title={asset.title}
          producer={asset.artist}
          price={`$${asset.price.amount}`}
          bpm={asset.bpm}
          keySig={asset.key}
          tags={asset.tags}
          artworkUrl={asset.coverUrl}
          previewUrl={asset.previewUrl}
        />
      ))}
    </CatalogGrid>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Default responsive grid layout for catalog items with proper spacing and responsive columns.",
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-4">Small Gap</h3>
        <CatalogGrid gap="sm" columns={{ default: 1, sm: 2, md: 3 }}>
          {sampleAssets.slice(0, 3).map((asset) => (
            <CatalogCard
              key={asset.id}
              id={asset.id}
              title={asset.title}
              producer={asset.artist}
              price={`$${asset.price.amount}`}
              bpm={asset.bpm}
              keySig={asset.key}
              tags={asset.tags}
              artworkUrl={asset.coverUrl}
              previewUrl={asset.previewUrl}
            />
          ))}
        </CatalogGrid>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4">Large Gap</h3>
        <CatalogGrid gap="lg" columns={{ default: 1, sm: 2, md: 3 }}>
          {sampleAssets.slice(0, 3).map((asset) => (
            <CatalogCard
              key={asset.id}
              id={asset.id}
              title={asset.title}
              producer={asset.artist}
              price={`$${asset.price.amount}`}
              bpm={asset.bpm}
              keySig={asset.key}
              tags={asset.tags}
              artworkUrl={asset.coverUrl}
              previewUrl={asset.previewUrl}
            />
          ))}
        </CatalogGrid>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4">Single Column</h3>
        <CatalogGrid columns={{ default: 1 }}>
          {sampleAssets.slice(0, 2).map((asset) => (
            <CatalogCard
              key={asset.id}
              id={asset.id}
              title={asset.title}
              producer={asset.artist}
              price={`$${asset.price.amount}`}
              bpm={asset.bpm}
              keySig={asset.key}
              tags={asset.tags}
              artworkUrl={asset.coverUrl}
              previewUrl={asset.previewUrl}
            />
          ))}
        </CatalogGrid>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different grid variants showing various gap sizes and column configurations.",
      },
    },
  },
};

export const A11y: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Keyboard Navigation</h3>
        <CatalogGrid columns={{ default: 1, sm: 2, md: 3 }}>
          {sampleAssets.map((asset) => (
            <CatalogCard
              key={asset.id}
              id={asset.id}
              title={asset.title}
              producer={asset.artist}
              price={`$${asset.price.amount}`}
              bpm={asset.bpm}
              keySig={asset.key}
              tags={asset.tags}
              artworkUrl={asset.coverUrl}
              previewUrl={asset.previewUrl}
            />
          ))}
        </CatalogGrid>
        <p className="text-xs text-muted-foreground mt-2">
          Use Tab to navigate between cards, Enter/Space to activate preview, Arrow keys for focus
          management.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Screen Reader Support</h3>
        <CatalogGrid columns={{ default: 1, sm: 2 }}>
          {sampleAssets.slice(0, 2).map((asset) => (
            <CatalogCard
              key={asset.id}
              id={asset.id}
              title={asset.title}
              producer={asset.artist}
              price={`$${asset.price.amount}`}
              bpm={asset.bpm}
              keySig={asset.key}
              tags={asset.tags}
              artworkUrl={asset.coverUrl}
              previewUrl={asset.previewUrl}
            />
          ))}
        </CatalogGrid>
        <p className="text-xs text-muted-foreground mt-2">
          Grid announces number of items and each card announces its content to screen readers.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Focus Management</h3>
        <CatalogGrid columns={{ default: 1, sm: 2 }}>
          {sampleAssets.slice(0, 2).map((asset) => (
            <CatalogCard
              key={asset.id}
              id={asset.id}
              title={asset.title}
              producer={asset.artist}
              price={`$${asset.price.amount}`}
              bpm={asset.bpm}
              keySig={asset.key}
              tags={asset.tags}
              artworkUrl={asset.coverUrl}
              previewUrl={asset.previewUrl}
            />
          ))}
        </CatalogGrid>
        <p className="text-xs text-muted-foreground mt-2">
          Grid maintains proper tab order and focus indicators for all interactive elements.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Accessibility features including keyboard navigation, screen reader support, and focus management.",
      },
    },
  },
};

export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Loading State</h3>
        <CatalogGrid loading skeletonCount={6} />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Empty State</h3>
        <CatalogGrid
          emptyState={
            <CatalogGridEmpty
              title="No tracks found"
              description="Try adjusting your search or filters to find what you're looking for."
              action={
                <button type="button" className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                  Clear filters
                </button>
              }
            />
          }
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Single Item</h3>
        <CatalogGrid columns={{ default: 1, sm: 2, md: 3 }}>
          <CatalogCard
            id={sampleAssets[0].id}
            title={sampleAssets[0].title}
            producer={sampleAssets[0].artist}
            price={`$${sampleAssets[0].price.amount}`}
            bpm={sampleAssets[0].bpm}
            keySig={sampleAssets[0].key}
            tags={sampleAssets[0].tags}
            artworkUrl={sampleAssets[0].coverUrl}
            previewUrl={sampleAssets[0].previewUrl}
          />
        </CatalogGrid>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Many Items</h3>
        <CatalogGrid columns={{ default: 1, sm: 2, md: 3, lg: 4 }}>
          {Array.from({ length: 12 }, (_, i) => (
            <CatalogCard
              key={`grid-item-${i + 1}`}
              id={`item-${i}`}
              title={`Track ${i + 1}`}
              producer={`Producer ${i + 1}`}
              price={`$${(i + 1) * 2}`}
              bpm={120 + i * 5}
              keySig="C"
              tags={["test", "demo"]}
              artworkUrl={sampleAssets[0].coverUrl}
              previewUrl={sampleAssets[0].previewUrl}
            />
          ))}
        </CatalogGrid>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Edge cases including loading states, empty states, single items, and many items.",
      },
    },
  },
};

// ============================================================================
// INTERACTIVE STORIES
// ============================================================================

export const Interactive: Story = {
  render: () => {
    const [loading, setLoading] = React.useState(false);
    const [items, setItems] = React.useState(sampleAssets);

    const handleLoadMore = () => {
      setLoading(true);
      setTimeout(() => {
        setItems([...items, ...sampleAssets]);
        setLoading(false);
      }, 1000);
    };

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setLoading(!loading)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            {loading ? "Stop Loading" : "Start Loading"}
          </button>
          <button
            type="button"
            onClick={handleLoadMore}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90"
          >
            Load More
          </button>
        </div>

        <CatalogGrid columns={{ default: 1, sm: 2, md: 3 }} loading={loading}>
          {items.map((asset) => (
            <CatalogCard
              key={asset.id}
              id={asset.id}
              title={asset.title}
              producer={asset.artist}
              price={`$${asset.price.amount}`}
              bpm={asset.bpm}
              keySig={asset.key}
              tags={asset.tags}
              artworkUrl={asset.coverUrl}
              previewUrl={asset.previewUrl}
            />
          ))}
        </CatalogGrid>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive grid with loading states and dynamic content. Use the buttons to test different states.",
      },
    },
  },
};

// ============================================================================
// THEMING STORIES
// ============================================================================

export const Theming: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Default Theme</h3>
        <CatalogGrid columns={{ default: 1, sm: 2, md: 3 }}>
          {sampleAssets.slice(0, 3).map((asset) => (
            <CatalogCard
              key={asset.id}
              id={asset.id}
              title={asset.title}
              producer={asset.artist}
              price={`$${asset.price.amount}`}
              bpm={asset.bpm}
              keySig={asset.key}
              tags={asset.tags}
              artworkUrl={asset.coverUrl}
              previewUrl={asset.previewUrl}
            />
          ))}
        </CatalogGrid>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Custom Styling</h3>
        <CatalogGrid columns={{ default: 1, sm: 2, md: 3 }} className="bg-muted/20 p-4 rounded-lg">
          {sampleAssets.slice(0, 3).map((asset) => (
            <CatalogCard
              key={asset.id}
              id={asset.id}
              title={asset.title}
              producer={asset.artist}
              price={`$${asset.price.amount}`}
              bpm={asset.bpm}
              keySig={asset.key}
              tags={asset.tags}
              artworkUrl={asset.coverUrl}
              previewUrl={asset.previewUrl}
              className="border-2 border-primary/20"
            />
          ))}
        </CatalogGrid>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Theming examples showing default styling and custom styling options.",
      },
    },
  },
};

// ============================================================================
// PERFORMANCE STORIES (e18e Standards)
// ============================================================================

export const Performance: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Bundle Size</h3>
        <p className="text-xs text-muted-foreground mb-4">
          CatalogGrid component is optimized for minimal bundle size with efficient CSS Grid
          implementation.
        </p>
        <CatalogGrid columns={{ default: 1, sm: 2, md: 3 }}>
          {sampleAssets.slice(0, 3).map((asset) => (
            <CatalogCard
              key={asset.id}
              id={asset.id}
              title={asset.title}
              producer={asset.artist}
              price={`$${asset.price.amount}`}
              bpm={asset.bpm}
              keySig={asset.key}
              tags={asset.tags}
              artworkUrl={asset.coverUrl}
              previewUrl={asset.previewUrl}
            />
          ))}
        </CatalogGrid>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Rendering Performance</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Grid uses CSS Grid for optimal rendering performance and minimal reflows.
        </p>
        <CatalogGrid columns={{ default: 1, sm: 2, md: 3, lg: 4 }}>
          {Array.from({ length: 20 }, (_, i) => (
            <CatalogCard
              key={`performance-grid-${i + 1}`}
              id={`perf-${i}`}
              title={`Performance Test ${i + 1}`}
              producer="Test Producer"
              price="$10"
              bpm={120 + i * 5}
              keySig="C"
              tags={["test", "performance"]}
              artworkUrl={sampleAssets[0].coverUrl}
              previewUrl={sampleAssets[0].previewUrl}
            />
          ))}
        </CatalogGrid>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Performance optimizations following e18e standards including bundle size and rendering performance.",
      },
    },
  },
};
