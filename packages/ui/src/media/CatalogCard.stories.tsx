import type { Meta, StoryObj } from '@storybook/react';
import { CatalogCard } from './CatalogCard';
import { storybookFixtures } from '@gotmusic/fixtures';

const meta: Meta<typeof CatalogCard> = {
  title: 'Media/CatalogCard',
  component: CatalogCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Catalog card component for displaying music assets with preview, metadata, and purchase options. Features hover states, accessibility, and responsive design.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description: 'Unique identifier for the asset',
    },
    title: {
      control: 'text',
      description: 'Asset title',
    },
    producer: {
      control: 'text',
      description: 'Producer/artist name',
    },
    price: {
      control: 'text',
      description: 'Price display string (e.g., "$2.99")',
    },
    bpm: {
      control: 'number',
      description: 'Beats per minute',
    },
    keySig: {
      control: 'text',
      description: 'Key signature (e.g., "C minor")',
    },
    tags: {
      control: 'object',
      description: 'Array of tag strings',
    },
    artworkUrl: {
      control: 'text',
      description: 'Cover art image URL',
    },
    previewUrl: {
      control: 'text',
      description: '30-second preview audio URL',
    },
    isPlaying: {
      control: 'boolean',
      description: 'Whether the preview is currently playing',
    },
    onPreviewToggle: {
      action: 'preview-toggled',
      description: 'Callback when preview play/pause is toggled',
    },
    onOpen: {
      action: 'opened',
      description: 'Callback when card is clicked to open details',
    },
  },
  args: {
    id: storybookFixtures.assets.basic.id,
    title: storybookFixtures.assets.basic.title,
    producer: storybookFixtures.assets.basic.artist,
    price: `$${storybookFixtures.assets.basic.price.amount}`,
    bpm: storybookFixtures.assets.basic.bpm,
    keySig: storybookFixtures.assets.basic.key,
    tags: storybookFixtures.assets.basic.tags,
    artworkUrl: storybookFixtures.assets.basic.coverUrl,
    previewUrl: storybookFixtures.assets.basic.previewUrl,
    isPlaying: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// PRIMARY STORIES (Required by STORYBOOK-GUIDE.md)
// ============================================================================

export const Primary: Story = {
  args: {
    id: storybookFixtures.assets.basic.id,
    title: storybookFixtures.assets.basic.title,
    producer: storybookFixtures.assets.basic.artist,
    price: `$${storybookFixtures.assets.basic.price.amount}`,
    bpm: storybookFixtures.assets.basic.bpm,
    keySig: storybookFixtures.assets.basic.key,
    tags: storybookFixtures.assets.basic.tags,
    artworkUrl: storybookFixtures.assets.basic.coverUrl,
    previewUrl: storybookFixtures.assets.basic.previewUrl,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default catalog card with all metadata and preview functionality.',
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Basic Card */}
      <CatalogCard
        id={storybookFixtures.assets.basic.id}
        title={storybookFixtures.assets.basic.title}
        producer={storybookFixtures.assets.basic.artist}
        price={`$${storybookFixtures.assets.basic.price.amount}`}
        bpm={storybookFixtures.assets.basic.bpm}
        keySig={storybookFixtures.assets.basic.key}
        tags={storybookFixtures.assets.basic.tags}
        artworkUrl={storybookFixtures.assets.basic.coverUrl}
        previewUrl={storybookFixtures.assets.basic.previewUrl}
      />
      
      {/* Expensive Card */}
      <CatalogCard
        id={storybookFixtures.assets.expensive.id}
        title={storybookFixtures.assets.expensive.title}
        producer={storybookFixtures.assets.expensive.artist}
        price={`$${storybookFixtures.assets.expensive.price.amount}`}
        bpm={storybookFixtures.assets.expensive.bpm}
        keySig={storybookFixtures.assets.expensive.key}
        tags={storybookFixtures.assets.expensive.tags}
        artworkUrl={storybookFixtures.assets.expensive.coverUrl}
        previewUrl={storybookFixtures.assets.expensive.previewUrl}
      />
      
      {/* Free Card */}
      <CatalogCard
        id={storybookFixtures.assets.free.id}
        title={storybookFixtures.assets.free.title}
        producer={storybookFixtures.assets.free.artist}
        price="Free"
        bpm={storybookFixtures.assets.free.bpm}
        keySig={storybookFixtures.assets.free.key}
        tags={storybookFixtures.assets.free.tags}
        artworkUrl={storybookFixtures.assets.free.coverUrl}
        previewUrl={storybookFixtures.assets.free.previewUrl}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different card variants showing basic, expensive, and free assets.',
      },
    },
  },
};

export const A11y: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Keyboard Navigation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CatalogCard
            id={storybookFixtures.assets.basic.id}
            title={storybookFixtures.assets.basic.title}
            producer={storybookFixtures.assets.basic.artist}
            price={`$${storybookFixtures.assets.basic.price.amount}`}
            bpm={storybookFixtures.assets.basic.bpm}
            keySig={storybookFixtures.assets.basic.key}
            tags={storybookFixtures.assets.basic.tags}
            artworkUrl={storybookFixtures.assets.basic.coverUrl}
            previewUrl={storybookFixtures.assets.basic.previewUrl}
          />
          <CatalogCard
            id={storybookFixtures.assets.expensive.id}
            title={storybookFixtures.assets.expensive.title}
            producer={storybookFixtures.assets.expensive.artist}
            price={`$${storybookFixtures.assets.expensive.price.amount}`}
            bpm={storybookFixtures.assets.expensive.bpm}
            keySig={storybookFixtures.assets.expensive.key}
            tags={storybookFixtures.assets.expensive.tags}
            artworkUrl={storybookFixtures.assets.expensive.coverUrl}
            previewUrl={storybookFixtures.assets.expensive.previewUrl}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Use Tab to navigate between cards, Enter/Space to activate preview, Arrow keys for focus management.
        </p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Screen Reader Support</h3>
        <CatalogCard
          id={storybookFixtures.assets.basic.id}
          title="Screen reader accessible track - Night Drive 88"
          producer="KiloWav"
          price="$12"
          bpm={88}
          keySig="Am"
          tags={["trap", "dark", "808"]}
          artworkUrl={storybookFixtures.assets.basic.coverUrl}
          previewUrl={storybookFixtures.assets.basic.previewUrl}
        />
        <p className="text-xs text-muted-foreground mt-2">
          Card announces title, producer, price, and playback state to screen readers.
        </p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Focus Management</h3>
        <CatalogCard
          id={storybookFixtures.assets.basic.id}
          title={storybookFixtures.assets.basic.title}
          producer={storybookFixtures.assets.basic.artist}
          price={`$${storybookFixtures.assets.basic.price.amount}`}
          bpm={storybookFixtures.assets.basic.bpm}
          keySig={storybookFixtures.assets.basic.key}
          tags={storybookFixtures.assets.basic.tags}
          artworkUrl={storybookFixtures.assets.basic.coverUrl}
          previewUrl={storybookFixtures.assets.basic.previewUrl}
        />
        <p className="text-xs text-muted-foreground mt-2">
          Card shows visible focus indicators and proper tab order for all interactive elements.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility features including keyboard navigation, screen reader support, and focus management.',
      },
    },
  },
};

export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Long Title</h3>
        <CatalogCard
          id={storybookFixtures.assets.longTitle.id}
          title={storybookFixtures.assets.longTitle.title}
          producer={storybookFixtures.assets.longTitle.artist}
          price={`$${storybookFixtures.assets.longTitle.price.amount}`}
          bpm={storybookFixtures.assets.longTitle.bpm}
          keySig={storybookFixtures.assets.longTitle.key}
          tags={storybookFixtures.assets.longTitle.tags}
          artworkUrl={storybookFixtures.assets.longTitle.coverUrl}
          previewUrl={storybookFixtures.assets.longTitle.previewUrl}
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">No Artwork</h3>
        <CatalogCard
          id={storybookFixtures.assets.basic.id}
          title={storybookFixtures.assets.basic.title}
          producer={storybookFixtures.assets.basic.artist}
          price={`$${storybookFixtures.assets.basic.price.amount}`}
          bpm={storybookFixtures.assets.basic.bpm}
          keySig={storybookFixtures.assets.basic.key}
          tags={storybookFixtures.assets.basic.tags}
          previewUrl={storybookFixtures.assets.basic.previewUrl}
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">No Preview</h3>
        <CatalogCard
          id={storybookFixtures.assets.basic.id}
          title={storybookFixtures.assets.basic.title}
          producer={storybookFixtures.assets.basic.artist}
          price={`$${storybookFixtures.assets.basic.price.amount}`}
          bpm={storybookFixtures.assets.basic.bpm}
          keySig={storybookFixtures.assets.basic.key}
          tags={storybookFixtures.assets.basic.tags}
          artworkUrl={storybookFixtures.assets.basic.coverUrl}
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Many Tags</h3>
        <CatalogCard
          id={storybookFixtures.assets.basic.id}
          title={storybookFixtures.assets.basic.title}
          producer={storybookFixtures.assets.basic.artist}
          price={`$${storybookFixtures.assets.basic.price.amount}`}
          bpm={storybookFixtures.assets.basic.bpm}
          keySig={storybookFixtures.assets.basic.key}
          tags={["trap", "dark", "808", "hip-hop", "instrumental", "melodic", "ambient", "electronic"]}
          artworkUrl={storybookFixtures.assets.basic.coverUrl}
          previewUrl={storybookFixtures.assets.basic.previewUrl}
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">No Metadata</h3>
        <CatalogCard
          id="minimal"
          title="Minimal Track"
          producer="Unknown Artist"
          price="$5"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Edge cases including long titles, missing artwork, no preview, many tags, and minimal metadata.',
      },
    },
  },
};

// ============================================================================
// INTERACTIVE STORIES
// ============================================================================

export const Interactive: Story = {
  render: () => {
    const handlePreviewToggle = (id: string) => {
      console.log(`Preview toggled for ${id}`);
    };
    
    const handleOpen = (id: string) => {
      console.log(`Card opened for ${id}`);
    };
    
    return (
      <div className="space-y-4">
        <CatalogCard
          id={storybookFixtures.assets.basic.id}
          title={storybookFixtures.assets.basic.title}
          producer={storybookFixtures.assets.basic.artist}
          price={`$${storybookFixtures.assets.basic.price.amount}`}
          bpm={storybookFixtures.assets.basic.bpm}
          keySig={storybookFixtures.assets.basic.key}
          tags={storybookFixtures.assets.basic.tags}
          artworkUrl={storybookFixtures.assets.basic.coverUrl}
          previewUrl={storybookFixtures.assets.basic.previewUrl}
          onPreviewToggle={handlePreviewToggle}
          onOpen={handleOpen}
        />
        <p className="text-xs text-muted-foreground">
          Check the Actions panel to see preview toggle and open events.
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive card with event handling. Check the Actions panel for preview toggle and open events.',
      },
    },
  },
};

// ============================================================================
// PLAYING STATE STORIES
// ============================================================================

export const PlayingStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Idle State</h3>
        <CatalogCard
          id={storybookFixtures.assets.basic.id}
          title={storybookFixtures.assets.basic.title}
          producer={storybookFixtures.assets.basic.artist}
          price={`$${storybookFixtures.assets.basic.price.amount}`}
          bpm={storybookFixtures.assets.basic.bpm}
          keySig={storybookFixtures.assets.basic.key}
          tags={storybookFixtures.assets.basic.tags}
          artworkUrl={storybookFixtures.assets.basic.coverUrl}
          previewUrl={storybookFixtures.assets.basic.previewUrl}
          isPlaying={false}
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Playing State</h3>
        <CatalogCard
          id={storybookFixtures.assets.basic.id}
          title={storybookFixtures.assets.basic.title}
          producer={storybookFixtures.assets.basic.artist}
          price={`$${storybookFixtures.assets.basic.price.amount}`}
          bpm={storybookFixtures.assets.basic.bpm}
          keySig={storybookFixtures.assets.basic.key}
          tags={storybookFixtures.assets.basic.tags}
          artworkUrl={storybookFixtures.assets.basic.coverUrl}
          previewUrl={storybookFixtures.assets.basic.previewUrl}
          isPlaying={true}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different playing states showing idle and playing previews.',
      },
    },
  },
};

// ============================================================================
// PERFORMANCE STORIES (e18e Standards)
// ============================================================================

export const Performance: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Bundle Size</h3>
        <p className="text-xs text-muted-foreground mb-2">
          CatalogCard component is optimized for minimal bundle size with lazy loading.
        </p>
        <CatalogCard
          id={storybookFixtures.assets.basic.id}
          title={storybookFixtures.assets.basic.title}
          producer={storybookFixtures.assets.basic.artist}
          price={`$${storybookFixtures.assets.basic.price.amount}`}
          bpm={storybookFixtures.assets.basic.bpm}
          keySig={storybookFixtures.assets.basic.key}
          tags={storybookFixtures.assets.basic.tags}
          artworkUrl={storybookFixtures.assets.basic.coverUrl}
          previewUrl={storybookFixtures.assets.basic.previewUrl}
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Rendering Performance</h3>
        <p className="text-xs text-muted-foreground mb-2">
          Card uses efficient rendering with proper memoization and minimal re-renders.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }, (_, i) => (
            <CatalogCard
              key={i}
              id={`perf-${i}`}
              title={`Performance Test ${i + 1}`}
              producer="Test Producer"
              price="$10"
              bpm={120 + i * 10}
              keySig="C"
              tags={["test", "performance"]}
              artworkUrl={storybookFixtures.assets.basic.coverUrl}
              previewUrl={storybookFixtures.assets.basic.previewUrl}
            />
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Performance optimizations following e18e standards including bundle size and rendering performance.',
      },
    },
  },
};