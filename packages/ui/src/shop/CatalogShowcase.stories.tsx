import { storybookFixtures } from "@gotmusic/fixtures";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ActiveFilters, CatalogFilters } from "../forms/CatalogFilters";
import { CatalogGrid } from "../layout/CatalogGrid";
import { CatalogCard } from "../media/CatalogCard";

const meta: Meta = {
  title: "Shop/CatalogShowcase",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Complete shop catalog system showcasing grid layout, filtering, and card components working together.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Extended sample data for the showcase
const extendedAssets = [
  storybookFixtures.assets.basic,
  storybookFixtures.assets.expensive,
  storybookFixtures.assets.free,
  storybookFixtures.assets.longTitle,
  // Add more sample data
  {
    id: "trap-beat-1",
    title: "Dark Trap Beat",
    artist: "ProducerX",
    price: { amount: 15 },
    bpm: 140,
    key: "Am",
    tags: ["trap", "dark", "808"],
    coverUrl: storybookFixtures.assets.basic.coverUrl,
    previewUrl: storybookFixtures.assets.basic.previewUrl,
  },
  {
    id: "hip-hop-1",
    title: "Old School Hip Hop",
    artist: "BeatMaker",
    price: { amount: 25 },
    bpm: 90,
    key: "C",
    tags: ["hip-hop", "old-school", "boom-bap"],
    coverUrl: storybookFixtures.assets.expensive.coverUrl,
    previewUrl: storybookFixtures.assets.expensive.previewUrl,
  },
  {
    id: "electronic-1",
    title: "Synthwave Dreams",
    artist: "SynthMaster",
    price: { amount: 8 },
    bpm: 120,
    key: "G",
    tags: ["electronic", "synthwave", "retro"],
    coverUrl: storybookFixtures.assets.free.coverUrl,
    previewUrl: storybookFixtures.assets.free.previewUrl,
  },
  {
    id: "ambient-1",
    title: "Forest Ambience",
    artist: "NatureSounds",
    price: { amount: 0 },
    bpm: 60,
    key: "F",
    tags: ["ambient", "nature", "meditation"],
    coverUrl: storybookFixtures.assets.basic.coverUrl,
    previewUrl: storybookFixtures.assets.basic.previewUrl,
  },
];

export const CompleteCatalog: Story = {
  render: () => {
    const [selectedGenres, setSelectedGenres] = React.useState<string[]>([]);
    const [selectedBpmRange, setSelectedBpmRange] = React.useState({ min: 60, max: 200 });
    const [selectedPriceRange, setSelectedPriceRange] = React.useState({ min: 0, max: 100 });
    const [selectedKeySignatures, setSelectedKeySignatures] = React.useState<string[]>([]);
    const [loading, setLoading] = React.useState(false);

    // Filter assets based on selected filters
    const filteredAssets = React.useMemo(() => {
      return extendedAssets.filter((asset) => {
        // Genre filter
        if (selectedGenres.length > 0) {
          const hasMatchingGenre = asset.tags.some((tag: string) =>
            selectedGenres.some((genre: string) => tag.toLowerCase().includes(genre.toLowerCase())),
          );
          if (!hasMatchingGenre) return false;
        }

        // BPM filter
        if (asset.bpm < selectedBpmRange.min || asset.bpm > selectedBpmRange.max) {
          return false;
        }

        // Price filter
        if (
          asset.price.amount < selectedPriceRange.min ||
          asset.price.amount > selectedPriceRange.max
        ) {
          return false;
        }

        // Key signature filter
        if (selectedKeySignatures.length > 0 && !selectedKeySignatures.includes(asset.key)) {
          return false;
        }

        return true;
      });
    }, [selectedGenres, selectedBpmRange, selectedPriceRange, selectedKeySignatures]);

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

    const handleLoadMore = () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    const activeFilters = [
      ...selectedGenres.map((genre) => ({ label: genre, value: genre, type: "genre" })),
      ...(selectedBpmRange.min !== 60 || selectedBpmRange.max !== 200
        ? [
            {
              label: `BPM: ${selectedBpmRange.min}-${selectedBpmRange.max}`,
              value: "bpm",
              type: "bpm",
            },
          ]
        : []),
      ...(selectedPriceRange.min !== 0 || selectedPriceRange.max !== 100
        ? [
            {
              label: `Price: $${selectedPriceRange.min}-$${selectedPriceRange.max}`,
              value: "price",
              type: "price",
            },
          ]
        : []),
      ...selectedKeySignatures.map((key) => ({ label: key, value: key, type: "key" })),
    ];

    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Music Catalog</h1>
            <p className="text-muted-foreground">
              Discover and preview high-quality music tracks from talented producers.
            </p>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <div className="w-80 shrink-0">
              <div className="sticky top-4">
                <CatalogFilters
                  genres={[
                    { value: "trap", label: "Trap", count: 24 },
                    { value: "hip-hop", label: "Hip Hop", count: 18 },
                    { value: "electronic", label: "Electronic", count: 32 },
                    { value: "ambient", label: "Ambient", count: 12 },
                    { value: "drum-and-bass", label: "Drum & Bass", count: 8 },
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
                    { value: "Em", label: "E Minor", count: 8 },
                    { value: "F", label: "F Major", count: 6 },
                    { value: "Dm", label: "D Minor", count: 5 },
                  ]}
                  selectedKeySignatures={selectedKeySignatures}
                  onKeySignaturesChange={setSelectedKeySignatures}
                  activeFilterCount={activeFilterCount}
                  onClearAll={handleClearAll}
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Active Filters */}
              {activeFilters.length > 0 && (
                <div className="mb-6">
                  <ActiveFilters
                    filters={activeFilters}
                    onRemove={(value, type) => {
                      switch (type) {
                        case "genre":
                          setSelectedGenres(selectedGenres.filter((g) => g !== value));
                          break;
                        case "bpm":
                          setSelectedBpmRange({ min: 60, max: 200 });
                          break;
                        case "price":
                          setSelectedPriceRange({ min: 0, max: 100 });
                          break;
                        case "key":
                          setSelectedKeySignatures(
                            selectedKeySignatures.filter((k) => k !== value),
                          );
                          break;
                      }
                    }}
                    onClearAll={handleClearAll}
                  />
                </div>
              )}

              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold">
                    {filteredAssets.length} {filteredAssets.length === 1 ? "track" : "tracks"} found
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {activeFilterCount > 0 &&
                      `${activeFilterCount} filter${activeFilterCount === 1 ? "" : "s"} applied`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              </div>

              {/* Catalog Grid */}
              <CatalogGrid
                columns={{ default: 1, sm: 2, md: 3, lg: 4 }}
                loading={loading}
                emptyState={
                  <div className="text-center py-12">
                    <h3 className="text-lg font-semibold mb-2">No tracks found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or search terms.
                    </p>
                    <button
                      type="button"
                      onClick={handleClearAll}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                    >
                      Clear all filters
                    </button>
                  </div>
                }
              >
                {filteredAssets.map((asset) => (
                  <CatalogCard
                    key={asset.id}
                    id={asset.id}
                    title={asset.title}
                    producer={asset.artist}
                    price={asset.price.amount === 0 ? "Free" : `$${asset.price.amount}`}
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
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Complete shop catalog system with filtering, grid layout, and responsive design. This showcases all components working together.",
      },
    },
  },
};

export const MobileLayout: Story = {
  render: () => (
    <div className="max-w-sm mx-auto bg-background">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Music Catalog</h1>

        {/* Mobile Filters */}
        <div className="mb-6">
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

        {/* Mobile Grid */}
        <CatalogGrid columns={{ default: 1 }}>
          {extendedAssets.slice(0, 4).map((asset) => (
            <CatalogCard
              key={asset.id}
              id={asset.id}
              title={asset.title}
              producer={asset.artist}
              price={asset.price.amount === 0 ? "Free" : `$${asset.price.amount}`}
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
        story: "Mobile-optimized layout showing single column grid and compact filters.",
      },
    },
  },
};
