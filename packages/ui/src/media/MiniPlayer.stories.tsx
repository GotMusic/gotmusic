import { storybookFixtures } from "@gotmusic/fixtures";
import type { Meta, StoryObj } from "@storybook/react";
import { MiniPlayer } from "./MiniPlayer";

const meta: Meta<typeof MiniPlayer> = {
  title: "Media/MiniPlayer",
  component: MiniPlayer,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Compact audio player component for minimized playback. Supports collapsed/expanded states, docked/floating positioning, and essential playback controls.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: "text",
      description: "Audio source URL",
    },
    title: {
      control: "text",
      description: "Track title",
    },
    artist: {
      control: "text",
      description: "Artist name",
    },
    coverUrl: {
      control: "text",
      description: "Cover art URL",
    },
    isPlaying: {
      control: "boolean",
      description: "Playing state",
    },
    currentTime: {
      control: "number",
      description: "Current playback time in seconds",
    },
    duration: {
      control: "number",
      description: "Total duration in seconds",
    },
    volume: {
      control: { type: "range", min: 0, max: 1, step: 0.1 },
      description: "Volume level (0-1)",
    },
    isMuted: {
      control: "boolean",
      description: "Muted state",
    },
    isExpanded: {
      control: "boolean",
      description: "Expanded state",
    },
    isDocked: {
      control: "boolean",
      description: "Docked positioning",
    },
    onPlayPause: {
      action: "playPause",
      description: "Play/pause callback",
    },
    onSeek: {
      action: "seek",
      description: "Seek callback",
    },
    onVolumeChange: {
      action: "volumeChange",
      description: "Volume change callback",
    },
    onToggleMute: {
      action: "toggleMute",
      description: "Mute toggle callback",
    },
    onToggleExpand: {
      action: "toggleExpand",
      description: "Expand toggle callback",
    },
    onClose: {
      action: "close",
      description: "Close callback",
    },
  },
  args: {
    src: storybookFixtures.assets.basic.previewUrl,
    title: storybookFixtures.assets.basic.title,
    artist: storybookFixtures.assets.basic.artist,
    coverUrl: storybookFixtures.assets.basic.coverUrl,
    currentTime: 45,
    duration: 180,
    volume: 0.8,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// PRIMARY STORIES (Required by STORYBOOK-GUIDE.md)
// ============================================================================

export const Primary: Story = {
  args: {
    src: storybookFixtures.assets.basic.previewUrl,
    title: storybookFixtures.assets.basic.title,
    artist: storybookFixtures.assets.basic.artist,
    coverUrl: storybookFixtures.assets.basic.coverUrl,
    currentTime: 45,
    duration: 180,
    volume: 0.8,
    isPlaying: false,
    isExpanded: false,
    isDocked: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Default mini player in collapsed state with basic controls.",
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Collapsed State</h3>
        <MiniPlayer
          src={storybookFixtures.assets.basic.previewUrl}
          title={storybookFixtures.assets.basic.title}
          artist={storybookFixtures.assets.basic.artist}
          coverUrl={storybookFixtures.assets.basic.coverUrl}
          currentTime={45}
          duration={180}
          volume={0.8}
          isPlaying={false}
          isExpanded={false}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Expanded State</h3>
        <MiniPlayer
          src={storybookFixtures.assets.basic.previewUrl}
          title={storybookFixtures.assets.basic.title}
          artist={storybookFixtures.assets.basic.artist}
          coverUrl={storybookFixtures.assets.basic.coverUrl}
          currentTime={45}
          duration={180}
          volume={0.8}
          isPlaying={true}
          isExpanded={true}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Docked State</h3>
        <MiniPlayer
          src={storybookFixtures.assets.basic.previewUrl}
          title={storybookFixtures.assets.basic.title}
          artist={storybookFixtures.assets.basic.artist}
          coverUrl={storybookFixtures.assets.basic.coverUrl}
          currentTime={45}
          duration={180}
          volume={0.8}
          isPlaying={true}
          isExpanded={false}
          isDocked={true}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Mini player variants showing collapsed, expanded, and docked states.",
      },
    },
  },
};

export const A11y: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Keyboard Navigation</h3>
        <MiniPlayer
          src={storybookFixtures.assets.basic.previewUrl}
          title={storybookFixtures.assets.basic.title}
          artist={storybookFixtures.assets.basic.artist}
          coverUrl={storybookFixtures.assets.basic.coverUrl}
          currentTime={45}
          duration={180}
          volume={0.8}
          isPlaying={false}
          isExpanded={true}
        />
        <p className="text-xs text-muted-foreground mt-2">
          Use Tab to navigate controls, Space/Enter to play/pause, Arrow keys for volume.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Screen Reader Support</h3>
        <MiniPlayer
          src={storybookFixtures.assets.basic.previewUrl}
          title="Screen reader accessible track - Night Drive 88 by KiloWav"
          artist="KiloWav"
          coverUrl={storybookFixtures.assets.basic.coverUrl}
          currentTime={45}
          duration={180}
          volume={0.8}
          isPlaying={true}
          isExpanded={true}
        />
        <p className="text-xs text-muted-foreground mt-2">
          Mini player announces track title, artist, playback state, and time to screen readers.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Focus Management</h3>
        <MiniPlayer
          src={storybookFixtures.assets.basic.previewUrl}
          title={storybookFixtures.assets.basic.title}
          artist={storybookFixtures.assets.basic.artist}
          coverUrl={storybookFixtures.assets.basic.coverUrl}
          currentTime={45}
          duration={180}
          volume={0.8}
          isPlaying={false}
          isExpanded={true}
        />
        <p className="text-xs text-muted-foreground mt-2">
          All controls show visible focus indicators and proper tab order.
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
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Long Track Title</h3>
        <MiniPlayer
          src={storybookFixtures.assets.longTitle.previewUrl}
          title={storybookFixtures.assets.longTitle.title}
          artist={storybookFixtures.assets.longTitle.artist}
          coverUrl={storybookFixtures.assets.longTitle.coverUrl}
          currentTime={45}
          duration={180}
          volume={0.8}
          isPlaying={false}
          isExpanded={false}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">No Cover Art</h3>
        <MiniPlayer
          src={storybookFixtures.assets.basic.previewUrl}
          title={storybookFixtures.assets.basic.title}
          artist={storybookFixtures.assets.basic.artist}
          currentTime={45}
          duration={180}
          volume={0.8}
          isPlaying={false}
          isExpanded={false}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">No Artist</h3>
        <MiniPlayer
          src={storybookFixtures.assets.basic.previewUrl}
          title={storybookFixtures.assets.basic.title}
          coverUrl={storybookFixtures.assets.basic.coverUrl}
          currentTime={45}
          duration={180}
          volume={0.8}
          isPlaying={false}
          isExpanded={false}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Muted State</h3>
        <MiniPlayer
          src={storybookFixtures.assets.basic.previewUrl}
          title={storybookFixtures.assets.basic.title}
          artist={storybookFixtures.assets.basic.artist}
          coverUrl={storybookFixtures.assets.basic.coverUrl}
          currentTime={45}
          duration={180}
          volume={0.8}
          isMuted={true}
          isPlaying={true}
          isExpanded={true}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Edge cases including long titles, missing cover art, missing artist, and muted state.",
      },
    },
  },
};

// ============================================================================
// PLAYER STATE STORIES
// ============================================================================

export const PlayerStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Idle State</h3>
        <MiniPlayer
          src={storybookFixtures.assets.basic.previewUrl}
          title={storybookFixtures.assets.basic.title}
          artist={storybookFixtures.assets.basic.artist}
          coverUrl={storybookFixtures.assets.basic.coverUrl}
          currentTime={0}
          duration={180}
          volume={0.8}
          isPlaying={false}
          isExpanded={false}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Playing State</h3>
        <MiniPlayer
          src={storybookFixtures.assets.basic.previewUrl}
          title={storybookFixtures.assets.basic.title}
          artist={storybookFixtures.assets.basic.artist}
          coverUrl={storybookFixtures.assets.basic.coverUrl}
          currentTime={45}
          duration={180}
          volume={0.8}
          isPlaying={true}
          isExpanded={false}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Paused State</h3>
        <MiniPlayer
          src={storybookFixtures.assets.basic.previewUrl}
          title={storybookFixtures.assets.basic.title}
          artist={storybookFixtures.assets.basic.artist}
          coverUrl={storybookFixtures.assets.basic.coverUrl}
          currentTime={45}
          duration={180}
          volume={0.8}
          isPlaying={false}
          isExpanded={false}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different mini player states including idle, playing, and paused states.",
      },
    },
  },
};

// ============================================================================
// INTERACTIVE STORIES
// ============================================================================

export const Interactive: Story = {
  render: () => {
    const handlePlayPause = () => {};
    const handleSeek = (time: number) => {
      // Seek to time
    };
    const handleVolumeChange = (volume: number) => {
      // Volume changed
    };
    const handleToggleMute = () => {
      // Toggle mute
    };
    const handleToggleExpand = () => {
      // Toggle expand
    };
    const handleClose = () => {
      // Close mini player
    };

    return (
      <div className="space-y-4">
        <MiniPlayer
          src={storybookFixtures.assets.basic.previewUrl}
          title={storybookFixtures.assets.basic.title}
          artist={storybookFixtures.assets.basic.artist}
          coverUrl={storybookFixtures.assets.basic.coverUrl}
          currentTime={45}
          duration={180}
          volume={0.8}
          isPlaying={false}
          isExpanded={true}
          onPlayPause={handlePlayPause}
          onSeek={handleSeek}
          onVolumeChange={handleVolumeChange}
          onToggleMute={handleToggleMute}
          onToggleExpand={handleToggleExpand}
          onClose={handleClose}
        />
        <p className="text-xs text-muted-foreground">
          Check the Actions panel to see interaction events.
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive mini player with event handling. Check the Actions panel for events.",
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
          Mini player component is optimized for minimal bundle size with efficient rendering.
        </p>
        <MiniPlayer
          src={storybookFixtures.assets.basic.previewUrl}
          title={storybookFixtures.assets.basic.title}
          artist={storybookFixtures.assets.basic.artist}
          coverUrl={storybookFixtures.assets.basic.coverUrl}
          currentTime={45}
          duration={180}
          volume={0.8}
          isPlaying={true}
          isExpanded={false}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Memory Management</h3>
        <p className="text-xs text-muted-foreground mb-2">
          Component uses efficient state management and minimal re-renders.
        </p>
        <MiniPlayer
          src={storybookFixtures.assets.basic.previewUrl}
          title={storybookFixtures.assets.basic.title}
          artist={storybookFixtures.assets.basic.artist}
          coverUrl={storybookFixtures.assets.basic.coverUrl}
          currentTime={45}
          duration={180}
          volume={0.8}
          isPlaying={true}
          isExpanded={true}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Performance optimizations following e18e standards including bundle size and memory management.",
      },
    },
  },
};

// ============================================================================
// QUICK STORIES
// ============================================================================

export const Collapsed: Story = {
  args: {
    src: storybookFixtures.assets.basic.previewUrl,
    title: storybookFixtures.assets.basic.title,
    artist: storybookFixtures.assets.basic.artist,
    coverUrl: storybookFixtures.assets.basic.coverUrl,
    currentTime: 45,
    duration: 180,
    volume: 0.8,
    isPlaying: false,
    isExpanded: false,
  },
};

export const Expanded: Story = {
  args: {
    src: storybookFixtures.assets.basic.previewUrl,
    title: storybookFixtures.assets.basic.title,
    artist: storybookFixtures.assets.basic.artist,
    coverUrl: storybookFixtures.assets.basic.coverUrl,
    currentTime: 45,
    duration: 180,
    volume: 0.8,
    isPlaying: true,
    isExpanded: true,
  },
};

export const Docked: Story = {
  args: {
    src: storybookFixtures.assets.basic.previewUrl,
    title: storybookFixtures.assets.basic.title,
    artist: storybookFixtures.assets.basic.artist,
    coverUrl: storybookFixtures.assets.basic.coverUrl,
    currentTime: 45,
    duration: 180,
    volume: 0.8,
    isPlaying: true,
    isExpanded: false,
    isDocked: true,
  },
};

export const Playing: Story = {
  args: {
    src: storybookFixtures.assets.basic.previewUrl,
    title: storybookFixtures.assets.basic.title,
    artist: storybookFixtures.assets.basic.artist,
    coverUrl: storybookFixtures.assets.basic.coverUrl,
    currentTime: 45,
    duration: 180,
    volume: 0.8,
    isPlaying: true,
    isExpanded: false,
  },
};

export const Muted: Story = {
  args: {
    src: storybookFixtures.assets.basic.previewUrl,
    title: storybookFixtures.assets.basic.title,
    artist: storybookFixtures.assets.basic.artist,
    coverUrl: storybookFixtures.assets.basic.coverUrl,
    currentTime: 45,
    duration: 180,
    volume: 0.8,
    isMuted: true,
    isPlaying: true,
    isExpanded: true,
  },
};
