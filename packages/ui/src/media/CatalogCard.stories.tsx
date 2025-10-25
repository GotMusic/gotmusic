import { storybookFixtures } from "@gotmusic/fixtures";
import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { CatalogCard } from "./CatalogCard";

const meta: Meta<typeof CatalogCard> = {
  title: "Media/CatalogCard",
  component: CatalogCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Premium catalog card with unified Glass-Neumorphic hybrid design - the perfect fusion of frosted glass effects and tactile neumorphic depth. Features advanced animations, hover effects, and comprehensive metadata display.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "music", "disabled"],
      description: "Visual variant of the card",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Size of the card",
    },
    glow: {
      control: "select",
      options: ["none", "soft", "medium", "strong"],
      description: "Glow effect intensity",
    },
    id: {
      control: "text",
      description: "Unique identifier for the asset",
    },
    title: {
      control: "text",
      description: "Asset title",
    },
    producer: {
      control: "text",
      description: "Producer/artist name",
    },
    price: {
      control: "text",
      description: 'Price display string (e.g., "$2.99")',
    },
    bpm: {
      control: "number",
      description: "Beats per minute",
    },
    keySig: {
      control: "text",
      description: 'Key signature (e.g., "C minor")',
    },
    tags: {
      control: "object",
      description: "Array of tag strings",
    },
    artworkUrl: {
      control: "text",
      description: "Cover art image URL",
    },
    previewUrl: {
      control: "text",
      description: "30-second preview audio URL",
    },
    isPlaying: {
      control: "boolean",
      description: "Whether the preview is currently playing",
    },
    isFavorited: {
      control: "boolean",
      description: "Whether the item is favorited",
    },
    isNew: {
      control: "boolean",
      description: "Whether the item is new",
    },
    isFeatured: {
      control: "boolean",
      description: "Whether the item is featured",
    },
    isExclusive: {
      control: "boolean",
      description: "Whether the item is exclusive",
    },
    discount: {
      control: "text",
      description: "Discount text (e.g., '20% OFF')",
    },
    originalPrice: {
      control: "text",
      description: "Original price before discount",
    },
    duration: {
      control: "text",
      description: "Track duration (e.g., '3:45')",
    },
    quality: {
      control: "text",
      description: "Audio quality (e.g., '24-bit/48kHz')",
    },
    energy: {
      control: { type: "range", min: 1, max: 10, step: 1 },
      description: "Energy level (1-10)",
    },
    onPreviewToggle: {
      action: "preview-toggled",
      description: "Callback when preview play/pause is toggled",
    },
    onOpen: {
      action: "opened",
      description: "Callback when card is clicked to open details",
    },
    onDownload: {
      action: "download",
      description: "Callback when download is clicked",
    },
    onFavorite: {
      action: "favorite",
      description: "Callback when favorite is toggled",
    },
    onShare: {
      action: "share",
      description: "Callback when share is clicked",
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
    variant: "default",
    size: "md",
    glow: "none",
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
    variant: "default",
    size: "md",
    glow: "none",
  },
};

// ============================================================================
// PREMIUM VARIANTS
// ============================================================================

export const GlassNeumorphicHybrid: Story = {
  args: {
    ...Primary.args,
    variant: "default",
    glow: "soft",
    title: "Epic Beat 2025",
    producer: "Grant Edwards",
    price: "$4.99",
    bpm: 128,
    keySig: "C Minor",
    tags: ["Electronic", "Dance", "Synthwave"],
    duration: "3:45",
    quality: "24-bit/48kHz",
    energy: 8,
  },
  parameters: {
    docs: {
      description: {
        story:
          "The unified Glass-Neumorphic hybrid design - combining frosted glass effects with tactile neumorphic depth for the ultimate premium feel.",
      },
    },
  },
};

export const MusicBrand: Story = {
  args: {
    ...Primary.args,
    variant: "music",
    glow: "medium",
    title: "GotMusic Anthem",
    producer: "GotMusic Studios",
    price: "$5.99",
    bpm: 140,
    keySig: "A Minor",
    tags: ["Anthem", "Epic", "Cinematic"],
    duration: "4:20",
    quality: "32-bit/96kHz",
    energy: 9,
    isFeatured: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Same Glass-Neumorphic hybrid design with brand colors for premium music app styling.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    ...Primary.args,
    variant: "disabled",
    title: "Unavailable Track",
    producer: "Unknown Artist",
    price: "N/A",
    bpm: 0,
    keySig: "",
    tags: [],
    energy: 0,
  },
  parameters: {
    docs: {
      description: {
        story: "Disabled variant showing unavailable or inactive content.",
      },
    },
  },
};

// ============================================================================
// SIZE VARIANTS
// ============================================================================

export const SizeVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-fg mb-3">Size Variants</h3>
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-fg-muted mb-2">Extra Small (xs)</h4>
            <CatalogCard
              {...Primary.args}
              id="compact-beat"
              variant="default"
              size="xs"
              title="Compact Beat"
              producer="Mini Producer"
              price="$0.99"
            />
          </div>
          <div>
            <h4 className="text-sm font-medium text-fg-muted mb-2">Small (sm)</h4>
            <CatalogCard
              {...Primary.args}
              id="small-track"
              variant="default"
              size="sm"
              title="Small Track"
              producer="Small Artist"
              price="$1.99"
            />
          </div>
          <div>
            <h4 className="text-sm font-medium text-fg-muted mb-2">Medium (md)</h4>
            <CatalogCard
              {...Primary.args}
              id="medium-track"
              variant="default"
              size="md"
              title="Medium Track"
              producer="Medium Artist"
              price="$2.99"
            />
          </div>
          <div>
            <h4 className="text-sm font-medium text-fg-muted mb-2">Large (lg)</h4>
            <CatalogCard
              {...Primary.args}
              id="large-track"
              variant="default"
              size="lg"
              title="Large Track"
              producer="Large Artist"
              price="$3.99"
            />
          </div>
          <div>
            <h4 className="text-sm font-medium text-fg-muted mb-2">Extra Large (xl)</h4>
            <CatalogCard
              {...Primary.args}
              id="xl-track"
              variant="default"
              size="xl"
              title="Extra Large Track"
              producer="Extra Large Artist"
              price="$4.99"
            />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All size variants from xs to xl showing different card dimensions.",
      },
    },
  },
};

// ============================================================================
// PREMIUM FEATURES
// ============================================================================

export const PremiumFeatures: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-fg mb-4">Premium Features Showcase</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* New Track */}
          <CatalogCard
            {...Primary.args}
            id="brand-new-hit"
            variant="music"
            glow="medium"
            title="Brand New Hit"
            producer="Fresh Artist"
            price="$4.99"
            bpm={140}
            keySig="C Major"
            tags={["New", "Hit", "Popular"]}
            duration="3:30"
            quality="24-bit/48kHz"
            energy={9}
            isNew={true}
            isFavorited={false}
            onFavorite={() => {}}
            onShare={() => {}}
            onDownload={() => {}}
          />

          {/* Featured Track */}
          <CatalogCard
            {...Primary.args}
            id="featured-selection"
            variant="default"
            glow="soft"
            title="Featured Selection"
            producer="Featured Artist"
            price="$5.99"
            bpm={128}
            keySig="D Minor"
            tags={["Featured", "Exclusive", "Premium"]}
            duration="4:15"
            quality="32-bit/96kHz"
            energy={8}
            isFeatured={true}
            isFavorited={true}
            onFavorite={() => {}}
            onShare={() => {}}
            onDownload={() => {}}
          />

          {/* Exclusive Track */}
          <CatalogCard
            {...Primary.args}
            id="exclusive-release"
            variant="music"
            glow="strong"
            title="Exclusive Release"
            producer="Exclusive Artist"
            price="$7.99"
            bpm={120}
            keySig="A Major"
            tags={["Exclusive", "Limited", "Special"]}
            duration="5:00"
            quality="32-bit/96kHz"
            energy={7}
            isExclusive={true}
            isFavorited={false}
            onFavorite={() => {}}
            onShare={() => {}}
            onDownload={() => {}}
          />

          {/* Discounted Track */}
          <CatalogCard
            {...Primary.args}
            id="discounted-classic"
            variant="default"
            title="Discounted Classic"
            producer="Classic Artist"
            price="$2.99"
            originalPrice="$4.99"
            discount="40% OFF"
            bpm={110}
            keySig="G Major"
            tags={["Classic", "Discounted", "Sale"]}
            duration="3:45"
            energy={6}
            isFavorited={false}
            onFavorite={() => {}}
            onShare={() => {}}
            onDownload={() => {}}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Showcase of premium features including badges, favorites, sharing, and discounts.",
      },
    },
  },
};

// ============================================================================
// INTERACTIVE DEMO
// ============================================================================

export const InteractiveDemo: Story = {
  render: () => {
    const [playingId, setPlayingId] = useState<string | null>(null);
    const [favoritedIds, setFavoritedIds] = useState<Set<string>>(new Set());

    const handlePreviewToggle = (id: string) => {
      setPlayingId(playingId === id ? null : id);
    };

    const handleFavorite = (id: string) => {
      const newFavorited = new Set(favoritedIds);
      if (newFavorited.has(id)) {
        newFavorited.delete(id);
      } else {
        newFavorited.add(id);
      }
      setFavoritedIds(newFavorited);
    };

    const tracks = [
      {
        id: "1",
        title: "Epic Beat 2025",
        producer: "Grant Edwards",
        price: "$4.99",
        bpm: 140,
        keySig: "C Major",
        tags: ["Electronic", "Dance", "Epic"],
        duration: "3:45",
        quality: "24-bit/48kHz",
        energy: 9,
        variant: "music" as const,
        glow: "medium" as const,
        isNew: true,
      },
      {
        id: "2",
        title: "Deep House Vibes",
        producer: "Studio Master",
        price: "$3.99",
        bpm: 120,
        keySig: "F Minor",
        tags: ["House", "Deep", "Groove"],
        duration: "4:20",
        quality: "24-bit/48kHz",
        energy: 7,
        variant: "default" as const,
        glow: "soft" as const,
        isFeatured: true,
      },
      {
        id: "3",
        title: "Ambient Dreams",
        producer: "Cyber Producer",
        price: "$2.99",
        bpm: 90,
        keySig: "A Minor",
        tags: ["Ambient", "Chill", "Atmospheric"],
        duration: "6:30",
        quality: "24-bit/48kHz",
        energy: 3,
        variant: "music" as const,
        glow: "strong" as const,
        isExclusive: true,
      },
    ];

    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-fg mb-4">Interactive Demo</h3>
          <p className="text-sm text-fg-muted mb-4">
            Click play buttons, favorite hearts, and share buttons to see interactions.
          </p>
        </div>
        <div className="space-y-3">
          {tracks.map((track) => (
            <CatalogCard
              key={track.id}
              id={track.id}
              title={track.title}
              producer={track.producer}
              price={track.price}
              bpm={track.bpm}
              keySig={track.keySig}
              tags={track.tags}
              duration={track.duration}
              quality={track.quality}
              energy={track.energy}
              variant={track.variant}
              glow={track.glow}
              isNew={track.isNew}
              isFeatured={track.isFeatured}
              isExclusive={track.isExclusive}
              isPlaying={playingId === track.id}
              isFavorited={favoritedIds.has(track.id)}
              onPreviewToggle={handlePreviewToggle}
              onFavorite={handleFavorite}
              onShare={(id) => alert(`Sharing track ${id}`)}
              onDownload={(id) => alert(`Downloading track ${id}`)}
              onOpen={(id) => alert(`Opening details for track ${id}`)}
            />
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive demo showing all the card interactions including play/pause, favorites, sharing, and downloads.",
      },
    },
  },
};
