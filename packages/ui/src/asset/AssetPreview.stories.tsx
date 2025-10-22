import React from "react";
import { storybookFixtures } from "@gotmusic/fixtures";
import type { Meta, StoryObj } from "@storybook/react";
import { AssetPreview } from "./AssetPreview";

const meta: Meta<typeof AssetPreview> = {
  title: "Asset/AssetPreview",
  component: AssetPreview,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "compact", "detailed"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof AssetPreview>;

// ============================================================================
// BASIC STORIES
// ============================================================================

export const Default: Story = {
  args: {
    asset: {
      id: "asset-001",
      title: "Midnight Glass",
      artist: "Kairo",
      coverUrl: "https://picsum.photos/300/300?random=1",
      duration: 198,
      waveform: Array.from({ length: 50 }, () => Math.random()),
    },
  },
};

export const Playing: Story = {
  args: {
    asset: {
      id: "asset-002",
      title: "Night Drive 88",
      artist: "KiloWav",
      coverUrl: "https://picsum.photos/300/300?random=2",
      duration: 180,
      currentTime: 45,
      isPlaying: true,
      volume: 0.8,
      waveform: Array.from({ length: 50 }, () => Math.random()),
    },
  },
};

export const WithoutCover: Story = {
  args: {
    asset: {
      id: "asset-003",
      title: "Untitled Beat",
      artist: "Producer",
      duration: 120,
      waveform: Array.from({ length: 50 }, () => Math.random()),
    },
  },
};

// ============================================================================
// VARIANT STORIES
// ============================================================================

export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Default</h3>
        <AssetPreview
          asset={{
            id: "asset-001",
            title: "Midnight Glass",
            artist: "Kairo",
            coverUrl: "https://picsum.photos/300/300?random=1",
            duration: 198,
            waveform: Array.from({ length: 50 }, () => Math.random()),
          }}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Compact</h3>
        <AssetPreview
          variant="compact"
          asset={{
            id: "asset-002",
            title: "Night Drive 88",
            artist: "KiloWav",
            coverUrl: "https://picsum.photos/300/300?random=2",
            duration: 180,
            waveform: Array.from({ length: 50 }, () => Math.random()),
          }}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Detailed</h3>
        <AssetPreview
          variant="detailed"
          asset={{
            id: "asset-003",
            title: "Very Long Track Title That Might Wrap to Multiple Lines",
            artist: "ProducerName",
            coverUrl: "https://picsum.photos/300/300?random=3",
            duration: 240,
            waveform: Array.from({ length: 50 }, () => Math.random()),
          }}
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
    <div className="flex gap-4 items-start">
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Small</h3>
        <AssetPreview
          size="sm"
          asset={{
            id: "asset-001",
            title: "Midnight Glass",
            artist: "Kairo",
            coverUrl: "https://picsum.photos/300/300?random=1",
            duration: 198,
            waveform: Array.from({ length: 50 }, () => Math.random()),
          }}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Medium</h3>
        <AssetPreview
          size="md"
          asset={{
            id: "asset-002",
            title: "Night Drive 88",
            artist: "KiloWav",
            coverUrl: "https://picsum.photos/300/300?random=2",
            duration: 180,
            waveform: Array.from({ length: 50 }, () => Math.random()),
          }}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Large</h3>
        <AssetPreview
          size="lg"
          asset={{
            id: "asset-003",
            title: "Very Long Track Title",
            artist: "ProducerName",
            coverUrl: "https://picsum.photos/300/300?random=3",
            duration: 240,
            waveform: Array.from({ length: 50 }, () => Math.random()),
          }}
        />
      </div>
    </div>
  ),
};

// ============================================================================
// PLAYBACK STORIES
// ============================================================================

export const PlaybackStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Paused</h3>
        <AssetPreview
          asset={{
            id: "asset-001",
            title: "Midnight Glass",
            artist: "Kairo",
            coverUrl: "https://picsum.photos/300/300?random=1",
            duration: 198,
            currentTime: 45,
            isPlaying: false,
            volume: 0.8,
            waveform: Array.from({ length: 50 }, () => Math.random()),
          }}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Playing</h3>
        <AssetPreview
          asset={{
            id: "asset-002",
            title: "Night Drive 88",
            artist: "KiloWav",
            coverUrl: "https://picsum.photos/300/300?random=2",
            duration: 180,
            currentTime: 90,
            isPlaying: true,
            volume: 0.6,
            waveform: Array.from({ length: 50 }, () => Math.random()),
          }}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Muted</h3>
        <AssetPreview
          asset={{
            id: "asset-003",
            title: "Silent Track",
            artist: "Producer",
            coverUrl: "https://picsum.photos/300/300?random=3",
            duration: 120,
            currentTime: 30,
            isPlaying: true,
            volume: 0,
            isMuted: true,
            waveform: Array.from({ length: 50 }, () => Math.random()),
          }}
        />
      </div>
    </div>
  ),
};

// ============================================================================
// WAVEFORM STORIES
// ============================================================================

export const Waveforms: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Simple Waveform</h3>
        <AssetPreview
          asset={{
            id: "asset-001",
            title: "Simple Beat",
            artist: "Producer",
            coverUrl: "https://picsum.photos/300/300?random=1",
            duration: 120,
            waveform: Array.from({ length: 20 }, () => Math.random() * 0.5),
          }}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Complex Waveform</h3>
        <AssetPreview
          asset={{
            id: "asset-002",
            title: "Complex Track",
            artist: "Producer",
            coverUrl: "https://picsum.photos/300/300?random=2",
            duration: 240,
            waveform: Array.from({ length: 100 }, () => Math.random()),
          }}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">No Waveform</h3>
        <AssetPreview
          asset={{
            id: "asset-003",
            title: "No Waveform",
            artist: "Producer",
            coverUrl: "https://picsum.photos/300/300?random=3",
            duration: 180,
          }}
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
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [currentTime, setCurrentTime] = React.useState(0);
    const [volume, setVolume] = React.useState(0.8);
    const [isMuted, setIsMuted] = React.useState(false);

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleSeek = (time: number) => {
      setCurrentTime(time);
    };

    const handleVolumeChange = (newVolume: number) => {
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    };

    const handleMute = () => {
      setIsMuted(true);
    };

    const handleUnmute = () => {
      setIsMuted(false);
    };

    return (
      <div className="space-y-4">
        <AssetPreview
          asset={{
            id: "asset-interactive",
            title: "Interactive Track",
            artist: "Producer",
            coverUrl: "https://picsum.photos/300/300?random=1",
            duration: 180,
            currentTime,
            isPlaying,
            volume: isMuted ? 0 : volume,
            isMuted,
            waveform: Array.from({ length: 50 }, () => Math.random()),
          }}
          onPlay={handlePlay}
          onPause={handlePause}
          onSeek={handleSeek}
          onVolumeChange={handleVolumeChange}
          onMute={handleMute}
          onUnmute={handleUnmute}
        />
        <div className="text-xs text-fg-muted space-y-1">
          <p>Playing: {isPlaying ? "Yes" : "No"}</p>
          <p>
            Time: {Math.floor(currentTime / 60)}:{(currentTime % 60).toFixed(0).padStart(2, "0")}
          </p>
          <p>Volume: {Math.round(volume * 100)}%</p>
          <p>Muted: {isMuted ? "Yes" : "No"}</p>
        </div>
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
          Use Tab to focus controls, Enter/Space to activate
        </p>
        <AssetPreview
          asset={{
            id: "asset-001",
            title: "Midnight Glass",
            artist: "Kairo",
            coverUrl: "https://picsum.photos/300/300?random=1",
            duration: 198,
            waveform: Array.from({ length: 50 }, () => Math.random()),
          }}
        />
      </div>
      <div>
        <h3 className="text-sm font-medium text-fg-muted mb-2">Screen Reader</h3>
        <p className="text-xs text-fg-muted mb-2">
          Proper ARIA labels and semantic markup for media controls
        </p>
        <AssetPreview
          asset={{
            id: "asset-002",
            title: "Night Drive 88",
            artist: "KiloWav",
            coverUrl: "https://picsum.photos/300/300?random=2",
            duration: 180,
            currentTime: 45,
            isPlaying: true,
            volume: 0.8,
            waveform: Array.from({ length: 50 }, () => Math.random()),
          }}
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }, (_, i) => (
        <AssetPreview
          key={`preview-${Date.now()}-${i}`}
          asset={{
            id: `asset-${i}`,
            title: `Track ${i + 1}`,
            artist: `Artist ${i + 1}`,
            coverUrl: `https://picsum.photos/300/300?random=${i + 1}`,
            duration: 120 + i * 30,
            waveform: Array.from({ length: 50 }, () => Math.random()),
          }}
        />
      ))}
    </div>
  ),
};
