import { storybookFixtures } from "@gotmusic/fixtures";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ActiveFilters, CatalogFilters, FilterChip } from "./CatalogFilters";

const meta: Meta<typeof CatalogFilters> = {
  title: "Forms/CatalogFilters",
  component: CatalogFilters,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Comprehensive filter system for catalog browsing with genre, BPM, price, and key signature filters.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    genres: {
      control: "object",
      description: "Available genres for filtering",
    },
    selectedGenres: {
      control: "object",
      description: "Selected genre values",
    },
    onGenresChange: {
      action: "genres-changed",
      description: "Callback when genres change",
    },
    bpmRange: {
      control: "object",
      description: "Available BPM range",
    },
    selectedBpmRange: {
      control: "object",
      description: "Selected BPM range",
    },
    onBpmRangeChange: {
      action: "bpm-range-changed",
      description: "Callback when BPM range changes",
    },
    priceRange: {
      control: "object",
      description: "Available price range",
    },
    selectedPriceRange: {
      control: "object",
      description: "Selected price range",
    },
    onPriceRangeChange: {
      action: "price-range-changed",
      description: "Callback when price range changes",
    },
    keySignatures: {
      control: "object",
      description: "Available key signatures",
    },
    selectedKeySignatures: {
      control: "object",
      description: "Selected key signatures",
    },
    onKeySignaturesChange: {
      action: "key-signatures-changed",
      description: "Callback when key signatures change",
    },
    loading: {
      control: "boolean",
      description: "Whether filters are loading",
    },
    activeFilterCount: {
      control: "number",
      description: "Number of active filters",
    },
    onClearAll: {
      action: "clear-all",
      description: "Callback to clear all filters",
    },
    showClearAll: {
      control: "boolean",
      description: "Whether to show the clear all button",
    },
  },
  args: {
    genres: [
      { value: "trap", label: "Trap", count: 24 },
      { value: "hip-hop", label: "Hip Hop", count: 18 },
      { value: "electronic", label: "Electronic", count: 32 },
      { value: "ambient", label: "Ambient", count: 12 },
      { value: "drum-and-bass", label: "Drum & Bass", count: 8 },
    ],
    selectedGenres: [],
    bpmRange: { min: 60, max: 200 },
    selectedBpmRange: { min: 60, max: 200 },
    priceRange: { min: 0, max: 100 },
    selectedPriceRange: { min: 0, max: 100 },
    keySignatures: [
      { value: "C", label: "C Major", count: 15 },
      { value: "Am", label: "A Minor", count: 12 },
      { value: "G", label: "G Major", count: 10 },
      { value: "Em", label: "E Minor", count: 8 },
      { value: "F", label: "F Major", count: 6 },
      { value: "Dm", label: "D Minor", count: 5 },
    ],
    selectedKeySignatures: [],
    loading: false,
    activeFilterCount: 0,
    showClearAll: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// PRIMARY STORIES (Required by STORYBOOK-GUIDE.md)
// ============================================================================

export const Primary: Story = {
  args: {
    genres: [
      { value: "trap", label: "Trap", count: 24 },
      { value: "hip-hop", label: "Hip Hop", count: 18 },
      { value: "electronic", label: "Electronic", count: 32 },
    ],
    bpmRange: { min: 60, max: 200 },
    priceRange: { min: 0, max: 100 },
    keySignatures: [
      { value: "C", label: "C Major", count: 15 },
      { value: "Am", label: "A Minor", count: 12 },
      { value: "G", label: "G Major", count: 10 },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default filter interface with genre badges, BPM slider, price range, and key signature checkboxes.",
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium mb-4">Minimal Filters</h3>
        <CatalogFilters
          genres={[
            { value: "trap", label: "Trap", count: 24 },
            { value: "hip-hop", label: "Hip Hop", count: 18 },
          ]}
          bpmRange={{ min: 60, max: 200 }}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4">Full Filters</h3>
        <CatalogFilters
          genres={[
            { value: "trap", label: "Trap", count: 24 },
            { value: "hip-hop", label: "Hip Hop", count: 18 },
            { value: "electronic", label: "Electronic", count: 32 },
            { value: "ambient", label: "Ambient", count: 12 },
            { value: "drum-and-bass", label: "Drum & Bass", count: 8 },
          ]}
          bpmRange={{ min: 60, max: 200 }}
          priceRange={{ min: 0, max: 100 }}
          keySignatures={[
            { value: "C", label: "C Major", count: 15 },
            { value: "Am", label: "A Minor", count: 12 },
            { value: "G", label: "G Major", count: 10 },
            { value: "Em", label: "E Minor", count: 8 },
            { value: "F", label: "F Major", count: 6 },
            { value: "Dm", label: "D Minor", count: 5 },
          ]}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-4">No Clear All Button</h3>
        <CatalogFilters
          genres={[
            { value: "trap", label: "Trap", count: 24 },
            { value: "hip-hop", label: "Hip Hop", count: 18 },
          ]}
          showClearAll={false}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different filter variants showing minimal, full, and custom configurations.",
      },
    },
  },
};

export const A11y: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Keyboard Navigation</h3>
        <CatalogFilters
          genres={[
            { value: "trap", label: "Trap", count: 24 },
            { value: "hip-hop", label: "Hip Hop", count: 18 },
            { value: "electronic", label: "Electronic", count: 32 },
          ]}
          bpmRange={{ min: 60, max: 200 }}
          keySignatures={[
            { value: "C", label: "C Major", count: 15 },
            { value: "Am", label: "A Minor", count: 12 },
          ]}
        />
        <p className="text-xs text-muted-foreground mt-2">
          Use Tab to navigate between filter controls, Enter/Space to activate badges, Arrow keys
          for sliders.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Screen Reader Support</h3>
        <CatalogFilters
          genres={[
            { value: "trap", label: "Trap", count: 24 },
            { value: "hip-hop", label: "Hip Hop", count: 18 },
          ]}
          bpmRange={{ min: 60, max: 200 }}
        />
        <p className="text-xs text-muted-foreground mt-2">
          All filter controls announce their state and values to screen readers with proper labels.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Focus Management</h3>
        <CatalogFilters
          genres={[
            { value: "trap", label: "Trap", count: 24 },
            { value: "hip-hop", label: "Hip Hop", count: 18 },
          ]}
        />
        <p className="text-xs text-muted-foreground mt-2">
          Filter controls show visible focus indicators and maintain proper tab order.
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
        <CatalogFilters loading />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">No Filters Available</h3>
        <CatalogFilters />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Many Genres</h3>
        <CatalogFilters
          genres={[
            { value: "trap", label: "Trap", count: 24 },
            { value: "hip-hop", label: "Hip Hop", count: 18 },
            { value: "electronic", label: "Electronic", count: 32 },
            { value: "ambient", label: "Ambient", count: 12 },
            { value: "drum-and-bass", label: "Drum & Bass", count: 8 },
            { value: "house", label: "House", count: 15 },
            { value: "techno", label: "Techno", count: 20 },
            { value: "trance", label: "Trance", count: 10 },
          ]}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Active Filters</h3>
        <CatalogFilters
          genres={[
            { value: "trap", label: "Trap", count: 24 },
            { value: "hip-hop", label: "Hip Hop", count: 18 },
          ]}
          selectedGenres={["trap"]}
          selectedBpmRange={{ min: 80, max: 140 }}
          selectedPriceRange={{ min: 5, max: 50 }}
          selectedKeySignatures={["C", "Am"]}
          activeFilterCount={4}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Edge cases including loading states, no filters, many genres, and active filter states.",
      },
    },
  },
};

// ============================================================================
// INTERACTIVE STORIES
// ============================================================================

export const Interactive: Story = {
  render: () => {
    const [selectedGenres, setSelectedGenres] = React.useState<string[]>([]);
    const [selectedBpmRange, setSelectedBpmRange] = React.useState({ min: 60, max: 200 });
    const [selectedPriceRange, setSelectedPriceRange] = React.useState({ min: 0, max: 100 });
    const [selectedKeySignatures, setSelectedKeySignatures] = React.useState<string[]>([]);

    const activeFilterCount =
      selectedGenres.length +
      (selectedBpmRange.min !== 60 || selectedBpmRange.max !== 200 ? 1 : 0) +
      (selectedPriceRange.min !== 0 || selectedPriceRange.max !== 100 ? 1 : 0) +
      selectedKeySignatures.length;

    const handleClearAll = () => {
      setSelectedGenres([]);
      setSelectedBpmRange({ min: 60, max: 200 });
      setSelectedPriceRange({ min: 0, max: 100 });
      setSelectedKeySignatures([]);
    };

    return (
      <div className="space-y-4">
        <div className="p-4 bg-muted/20 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Active Filters:</h4>
          <div className="text-xs text-muted-foreground">
            <p>Genres: {selectedGenres.length > 0 ? selectedGenres.join(", ") : "None"}</p>
            <p>
              BPM: {selectedBpmRange.min} - {selectedBpmRange.max}
            </p>
            <p>
              Price: ${selectedPriceRange.min} - ${selectedPriceRange.max}
            </p>
            <p>
              Keys: {selectedKeySignatures.length > 0 ? selectedKeySignatures.join(", ") : "None"}
            </p>
            <p>Total Active: {activeFilterCount}</p>
          </div>
        </div>

        <CatalogFilters
          genres={[
            { value: "trap", label: "Trap", count: 24 },
            { value: "hip-hop", label: "Hip Hop", count: 18 },
            { value: "electronic", label: "Electronic", count: 32 },
          ]}
          selectedGenres={selectedGenres}
          onGenresChange={setSelectedGenres}
          bpmRange={{ min: 60, max: 200 }}
          selectedBpmRange={selectedBpmRange}
          onBpmRangeChange={setSelectedBpmRange}
          priceRange={{ min: 0, max: 100 }}
          selectedPriceRange={selectedPriceRange}
          onPriceRangeChange={setSelectedPriceRange}
          keySignatures={[
            { value: "C", label: "C Major", count: 15 },
            { value: "Am", label: "A Minor", count: 12 },
            { value: "G", label: "G Major", count: 10 },
          ]}
          selectedKeySignatures={selectedKeySignatures}
          onKeySignaturesChange={setSelectedKeySignatures}
          activeFilterCount={activeFilterCount}
          onClearAll={handleClearAll}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive filters with real-time state updates. Check the Actions panel for filter change events.",
      },
    },
  },
};

// ============================================================================
// FILTER CHIPS STORIES
// ============================================================================

export const FilterChips: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-2">Active Filters Display</h3>
        <ActiveFilters
          filters={[
            { label: "Trap", value: "trap", type: "genre" },
            { label: "Hip Hop", value: "hip-hop", type: "genre" },
            { label: "BPM: 80-140", value: "bpm-80-140", type: "bpm" },
            { label: "Price: $5-$50", value: "price-5-50", type: "price" },
            { label: "C Major", value: "C", type: "key" },
          ]}
          onRemove={(value, type) => }
          onClearAll={() => }
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Individual Filter Chips</h3>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            label="Trap"
            value="trap"
            onRemove={(value) => }
          />
          <FilterChip
            label="Hip Hop"
            value="hip-hop"
            onRemove={(value) => }
          />
          <FilterChip
            label="BPM: 80-140"
            value="bpm-80-140"
            onRemove={(value) => }
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Filter chips for displaying and managing active filters with remove functionality.",
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
        <CatalogFilters
          genres={[
            { value: "trap", label: "Trap", count: 24 },
            { value: "hip-hop", label: "Hip Hop", count: 18 },
          ]}
          bpmRange={{ min: 60, max: 200 }}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Custom Styling</h3>
        <CatalogFilters
          genres={[
            { value: "trap", label: "Trap", count: 24 },
            { value: "hip-hop", label: "Hip Hop", count: 18 },
          ]}
          bpmRange={{ min: 60, max: 200 }}
          className="bg-muted/20 p-6 rounded-lg border-2 border-primary/20"
        />
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
          CatalogFilters component is optimized for minimal bundle size with efficient form
          controls.
        </p>
        <CatalogFilters
          genres={[
            { value: "trap", label: "Trap", count: 24 },
            { value: "hip-hop", label: "Hip Hop", count: 18 },
            { value: "electronic", label: "Electronic", count: 32 },
          ]}
          bpmRange={{ min: 60, max: 200 }}
          priceRange={{ min: 0, max: 100 }}
          keySignatures={[
            { value: "C", label: "C Major", count: 15 },
            { value: "Am", label: "A Minor", count: 12 },
          ]}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Rendering Performance</h3>
        <p className="text-xs text-muted-foreground mb-4">
          Filters use efficient rendering with proper memoization and minimal re-renders.
        </p>
        <CatalogFilters
          genres={Array.from({ length: 20 }, (_, i) => ({
            value: `genre-${i}`,
            label: `Genre ${i + 1}`,
            count: Math.floor(Math.random() * 50),
          }))}
          bpmRange={{ min: 60, max: 200 }}
          priceRange={{ min: 0, max: 100 }}
          keySignatures={Array.from({ length: 12 }, (_, i) => ({
            value: `key-${i}`,
            label: `Key ${i + 1}`,
            count: Math.floor(Math.random() * 20),
          }))}
        />
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
