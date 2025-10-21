import { storybookFixtures } from "@gotmusic/fixtures";
import type { Meta, StoryObj } from "@storybook/react";
import { Player } from "./Player";

const meta: Meta<typeof Player> = {
  title: "Media/Player",
  component: Player,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Audio player component with playback controls, waveform visualization, and accessibility features. Supports both preview mode (30s clamp) and full playback.",
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
      description: "Audio title for accessibility",
    },
    clamp: {
      control: "number",
      description: "Time limit in seconds (30 for preview, undefined for full)",
    },
    showDownload: {
      control: "boolean",
      description: "Show download button (only in full mode)",
    },
    onEnd: {
      action: "ended",
      description: "Callback when playback ends or reaches clamp limit",
    },
  },
  args: {
    src: "/samples/kick.mp3",
    title: "Sample Audio Track",
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
    clamp: 30,
  },
  parameters: {
    docs: {
      description: {
        story: "Default player in preview mode with 30-second clamp limit.",
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Preview Mode (30s clamp)</h3>
        <Player
          src={storybookFixtures.assets.basic.previewUrl}
          title={storybookFixtures.assets.basic.title}
          clamp={30}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Full Mode (no clamp)</h3>
        <Player
          src={storybookFixtures.assets.basic.previewUrl}
          title={storybookFixtures.assets.basic.title}
          showDownload={true}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Player variants showing preview mode (30s clamp) and full mode (no clamp, with download).",
      },
    },
  },
};

export const A11y: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Keyboard Navigation</h3>
        <Player
          src={storybookFixtures.assets.basic.previewUrl}
          title={storybookFixtures.assets.basic.title}
          clamp={30}
        />
        <p className="text-xs text-muted-foreground mt-2">
          Use Tab to navigate controls, Space/Enter to play/pause, Arrow keys for volume.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Screen Reader Support</h3>
        <Player
          src={storybookFixtures.assets.basic.previewUrl}
          title="Screen reader accessible track - Night Drive 88 by KiloWav"
          clamp={30}
        />
        <p className="text-xs text-muted-foreground mt-2">
          Player announces track title, playback state, and time to screen readers.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Focus Management</h3>
        <Player
          src={storybookFixtures.assets.basic.previewUrl}
          title={storybookFixtures.assets.basic.title}
          clamp={30}
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
        <Player
          src={storybookFixtures.assets.longTitle.previewUrl}
          title={storybookFixtures.assets.longTitle.title}
          clamp={30}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Short Preview (5s clamp)</h3>
        <Player
          src={storybookFixtures.assets.basic.previewUrl}
          title={storybookFixtures.assets.basic.title}
          clamp={5}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">No Audio Source</h3>
        <Player src="" title="Missing audio file" clamp={30} />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Very Long Title</h3>
        <Player
          src={storybookFixtures.assets.basic.previewUrl}
          title="This is an extremely long track title that should be truncated properly in the UI to prevent layout issues and maintain good user experience"
          clamp={30}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Edge cases including long titles, short previews, missing audio, and layout handling.",
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
        <Player
          src={storybookFixtures.assets.basic.previewUrl}
          title={storybookFixtures.assets.basic.title}
          clamp={30}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Loading State</h3>
        <Player
          src={storybookFixtures.assets.basic.previewUrl}
          title={storybookFixtures.assets.basic.title}
          clamp={30}
        />
        <p className="text-xs text-muted-foreground mt-2">
          Shows loading spinner while audio loads.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different player states including idle and loading states.",
      },
    },
  },
};

// ============================================================================
// INTERACTIVE STORIES
// ============================================================================

export const Interactive: Story = {
  render: () => {
    const handleEnd = () => {};

    return (
      <div className="space-y-4">
        <Player
          src={storybookFixtures.assets.basic.previewUrl}
          title={storybookFixtures.assets.basic.title}
          clamp={30}
          onEnd={handleEnd}
        />
        <p className="text-xs text-muted-foreground">
          Check the Actions panel to see onEnd events when playback completes.
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive player with event handling. Check the Actions panel for onEnd events.",
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
          Player component is optimized for minimal bundle size with lazy loading.
        </p>
        <Player
          src={storybookFixtures.assets.basic.previewUrl}
          title={storybookFixtures.assets.basic.title}
          clamp={30}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Memory Management</h3>
        <p className="text-xs text-muted-foreground mb-2">
          Audio elements are properly cleaned up to prevent memory leaks.
        </p>
        <Player
          src={storybookFixtures.assets.basic.previewUrl}
          title={storybookFixtures.assets.basic.title}
          clamp={30}
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

export const Preview: Story = {
  args: {
    src: "/samples/kick.mp3",
    title: "Dark Techno Kick",
    clamp: 30,
    className: "w-96",
  },
};

export const Full: Story = {
  args: {
    src: "/samples/kick.mp3",
    title: "Dark Techno Kick",
    className: "w-96",
  },
};

export const WithDownload: Story = {
  args: {
    src: "/samples/kick.mp3",
    title: "Dark Techno Kick",
    showDownload: true,
    className: "w-96",
  },
};

export const LongTitle: Story = {
  args: {
    src: "/samples/kick.mp3",
    title: "Very Long Track Title That Might Wrap to Multiple Lines",
    clamp: 30,
    className: "w-96",
  },
};
