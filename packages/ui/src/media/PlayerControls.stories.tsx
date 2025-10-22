import { storybookFixtures } from "@gotmusic/fixtures";
import type { Meta, StoryObj } from "@storybook/react";
import { PlayerControls } from "./PlayerControls";

const meta: Meta<typeof PlayerControls> = {
  title: "Media/PlayerControls",
  component: PlayerControls,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Comprehensive audio player controls with play/pause, seek, volume, speed, and skip functionality. Supports keyboard navigation and accessibility features.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
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
    playbackRate: {
      control: { type: "select", options: [0.5, 0.75, 1, 1.25, 1.5, 2] },
      description: "Playback speed",
    },
    isMuted: {
      control: "boolean",
      description: "Muted state",
    },
    isLoading: {
      control: "boolean",
      description: "Loading state",
    },
    hasError: {
      control: "boolean",
      description: "Error state",
    },
    showDownload: {
      control: "boolean",
      description: "Show download button",
    },
    showSkip: {
      control: "boolean",
      description: "Show skip buttons",
    },
    showSpeed: {
      control: "boolean",
      description: "Show speed control",
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
    onSkipBack: {
      action: "skipBack",
      description: "Skip back callback",
    },
    onSkipForward: {
      action: "skipForward",
      description: "Skip forward callback",
    },
    onSpeedChange: {
      action: "speedChange",
      description: "Speed change callback",
    },
    onDownload: {
      action: "download",
      description: "Download callback",
    },
  },
  args: {
    currentTime: 45,
    duration: 180,
    volume: 0.8,
    playbackRate: 1,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// PRIMARY STORIES (Required by STORYBOOK-GUIDE.md)
// ============================================================================

export const Primary: Story = {
  args: {
    isPlaying: false,
    currentTime: 45,
    duration: 180,
    volume: 0.8,
    playbackRate: 1,
    isMuted: false,
    isLoading: false,
    hasError: false,
    showDownload: false,
    showSkip: false,
    showSpeed: false,
  },
  parameters: {
    docs: {
      description: {
        story: "Default player controls with basic play/pause, seek, and volume controls.",
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Basic Controls</h3>
        <PlayerControls
          isPlaying={false}
          currentTime={45}
          duration={180}
          volume={0.8}
          playbackRate={1}
          isMuted={false}
          isLoading={false}
          hasError={false}
          showDownload={false}
          showSkip={false}
          showSpeed={false}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Full Controls</h3>
        <PlayerControls
          isPlaying={true}
          currentTime={45}
          duration={180}
          volume={0.8}
          playbackRate={1}
          isMuted={false}
          isLoading={false}
          hasError={false}
          showDownload={true}
          showSkip={true}
          showSpeed={true}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Minimal Controls</h3>
        <PlayerControls
          isPlaying={false}
          currentTime={45}
          duration={180}
          volume={0.8}
          playbackRate={1}
          isMuted={false}
          isLoading={false}
          hasError={false}
          showDownload={false}
          showSkip={false}
          showSpeed={false}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Player controls variants showing basic, full, and minimal control sets.",
      },
    },
  },
};

export const A11y: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Keyboard Navigation</h3>
        <PlayerControls
          isPlaying={false}
          currentTime={45}
          duration={180}
          volume={0.8}
          playbackRate={1}
          isMuted={false}
          isLoading={false}
          hasError={false}
          showDownload={true}
          showSkip={true}
          showSpeed={true}
        />
        <p className="text-xs text-muted-foreground mt-2">
          Use Tab to navigate controls, Space/Enter to play/pause, Arrow keys for seek and volume.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Screen Reader Support</h3>
        <PlayerControls
          isPlaying={true}
          currentTime={45}
          duration={180}
          volume={0.8}
          playbackRate={1}
          isMuted={false}
          isLoading={false}
          hasError={false}
          showDownload={true}
          showSkip={true}
          showSpeed={true}
        />
        <p className="text-xs text-muted-foreground mt-2">
          All controls have proper ARIA labels and announce state changes to screen readers.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Focus Management</h3>
        <PlayerControls
          isPlaying={false}
          currentTime={45}
          duration={180}
          volume={0.8}
          playbackRate={1}
          isMuted={false}
          isLoading={false}
          hasError={false}
          showDownload={true}
          showSkip={true}
          showSpeed={true}
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
        <h3 className="text-sm font-medium mb-2">Loading State</h3>
        <PlayerControls
          isPlaying={false}
          currentTime={0}
          duration={0}
          volume={0.8}
          playbackRate={1}
          isMuted={false}
          isLoading={true}
          hasError={false}
          showDownload={false}
          showSkip={false}
          showSpeed={false}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Error State</h3>
        <PlayerControls
          isPlaying={false}
          currentTime={0}
          duration={0}
          volume={0.8}
          playbackRate={1}
          isMuted={false}
          isLoading={false}
          hasError={true}
          showDownload={false}
          showSkip={false}
          showSpeed={false}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Muted State</h3>
        <PlayerControls
          isPlaying={true}
          currentTime={45}
          duration={180}
          volume={0.8}
          playbackRate={1}
          isMuted={true}
          isLoading={false}
          hasError={false}
          showDownload={true}
          showSkip={true}
          showSpeed={true}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Zero Duration</h3>
        <PlayerControls
          isPlaying={false}
          currentTime={0}
          duration={0}
          volume={0.8}
          playbackRate={1}
          isMuted={false}
          isLoading={false}
          hasError={false}
          showDownload={false}
          showSkip={false}
          showSpeed={false}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Edge cases including loading state, error state, muted state, and zero duration.",
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
        <PlayerControls
          isPlaying={false}
          currentTime={0}
          duration={180}
          volume={0.8}
          playbackRate={1}
          isMuted={false}
          isLoading={false}
          hasError={false}
          showDownload={true}
          showSkip={true}
          showSpeed={true}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Playing State</h3>
        <PlayerControls
          isPlaying={true}
          currentTime={45}
          duration={180}
          volume={0.8}
          playbackRate={1}
          isMuted={false}
          isLoading={false}
          hasError={false}
          showDownload={true}
          showSkip={true}
          showSpeed={true}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Paused State</h3>
        <PlayerControls
          isPlaying={false}
          currentTime={45}
          duration={180}
          volume={0.8}
          playbackRate={1}
          isMuted={false}
          isLoading={false}
          hasError={false}
          showDownload={true}
          showSkip={true}
          showSpeed={true}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Loading State</h3>
        <PlayerControls
          isPlaying={false}
          currentTime={0}
          duration={0}
          volume={0.8}
          playbackRate={1}
          isMuted={false}
          isLoading={true}
          hasError={false}
          showDownload={false}
          showSkip={false}
          showSpeed={false}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Different player control states including idle, playing, paused, and loading states.",
      },
    },
  },
};

// ============================================================================
// INTERACTIVE STORIES
// ============================================================================

export const Interactive: Story = {
  render: () => {
    const handlePlayPause = () => {
      // Play/Pause toggled
    };
    const handleSeek = (time: number) => {
      // Seek to time
    };
    const handleVolumeChange = (volume: number) => {
      // Volume changed
    };
    const handleToggleMute = () => {
      // Toggle mute
    };
    const handleSkipBack = () => {
      // Skip back
    };
    const handleSkipForward = () => {
      // Skip forward
    };
    const handleSpeedChange = (rate: number) => {
      // Speed changed
    };
    const handleDownload = () => {
      // Download
    };

    return (
      <div className="space-y-4">
        <PlayerControls
          isPlaying={false}
          currentTime={45}
          duration={180}
          volume={0.8}
          playbackRate={1}
          isMuted={false}
          isLoading={false}
          hasError={false}
          showDownload={true}
          showSkip={true}
          showSpeed={true}
          onPlayPause={handlePlayPause}
          onSeek={handleSeek}
          onVolumeChange={handleVolumeChange}
          onToggleMute={handleToggleMute}
          onSkipBack={handleSkipBack}
          onSkipForward={handleSkipForward}
          onSpeedChange={handleSpeedChange}
          onDownload={handleDownload}
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
        story:
          "Interactive player controls with event handling. Check the Actions panel for events.",
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
          Player controls component is optimized for minimal bundle size with efficient rendering.
        </p>
        <PlayerControls
          isPlaying={false}
          currentTime={45}
          duration={180}
          volume={0.8}
          playbackRate={1}
          isMuted={false}
          isLoading={false}
          hasError={false}
          showDownload={true}
          showSkip={true}
          showSpeed={true}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Memory Management</h3>
        <p className="text-xs text-muted-foreground mb-2">
          Component uses efficient state management and minimal re-renders.
        </p>
        <PlayerControls
          isPlaying={true}
          currentTime={45}
          duration={180}
          volume={0.8}
          playbackRate={1}
          isMuted={false}
          isLoading={false}
          hasError={false}
          showDownload={true}
          showSkip={true}
          showSpeed={true}
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

export const Basic: Story = {
  args: {
    isPlaying: false,
    currentTime: 45,
    duration: 180,
    volume: 0.8,
    playbackRate: 1,
    isMuted: false,
    isLoading: false,
    hasError: false,
    showDownload: false,
    showSkip: false,
    showSpeed: false,
  },
};

export const Full: Story = {
  args: {
    isPlaying: true,
    currentTime: 45,
    duration: 180,
    volume: 0.8,
    playbackRate: 1,
    isMuted: false,
    isLoading: false,
    hasError: false,
    showDownload: true,
    showSkip: true,
    showSpeed: true,
  },
};

export const Loading: Story = {
  args: {
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.8,
    playbackRate: 1,
    isMuted: false,
    isLoading: true,
    hasError: false,
    showDownload: false,
    showSkip: false,
    showSpeed: false,
  },
};

export const ErrorState: Story = {
  args: {
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.8,
    playbackRate: 1,
    isMuted: false,
    isLoading: false,
    hasError: true,
    showDownload: false,
    showSkip: false,
    showSpeed: false,
  },
};

export const Muted: Story = {
  args: {
    isPlaying: true,
    currentTime: 45,
    duration: 180,
    volume: 0.8,
    playbackRate: 1,
    isMuted: true,
    isLoading: false,
    hasError: false,
    showDownload: true,
    showSkip: true,
    showSpeed: true,
  },
};

export const FastSpeed: Story = {
  args: {
    isPlaying: true,
    currentTime: 45,
    duration: 180,
    volume: 0.8,
    playbackRate: 1.5,
    isMuted: false,
    isLoading: false,
    hasError: false,
    showDownload: true,
    showSkip: true,
    showSpeed: true,
  },
};
