import { storybookFixtures } from "@gotmusic/fixtures";
import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "./ProgressBar";

const meta: Meta<typeof ProgressBar> = {
  title: "Media/ProgressBar",
  component: ProgressBar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Interactive progress bar component for audio playback with seek functionality, buffering indicators, and accessibility features.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    currentTime: {
      control: "number",
      description: "Current playback time in seconds",
    },
    duration: {
      control: "number",
      description: "Total duration in seconds",
    },
    bufferedTime: {
      control: "number",
      description: "Buffered time in seconds",
    },
    isLoading: {
      control: "boolean",
      description: "Loading state",
    },
    isBuffering: {
      control: "boolean",
      description: "Buffering state",
    },
    hasError: {
      control: "boolean",
      description: "Error state",
    },
    isInteractive: {
      control: "boolean",
      description: "Interactive mode",
    },
    showTime: {
      control: "boolean",
      description: "Show time display",
    },
    showBuffered: {
      control: "boolean",
      description: "Show buffered progress",
    },
    onSeek: {
      action: "seek",
      description: "Seek callback",
    },
    onHover: {
      action: "hover",
      description: "Hover callback",
    },
    onLeave: {
      action: "leave",
      description: "Leave callback",
    },
  },
  args: {
    currentTime: 45,
    duration: 180,
    bufferedTime: 90,
    isLoading: false,
    isBuffering: false,
    hasError: false,
    isInteractive: true,
    showTime: true,
    showBuffered: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// PRIMARY STORIES (Required by STORYBOOK-GUIDE.md)
// ============================================================================

export const Primary: Story = {
  args: {
    currentTime: 45,
    duration: 180,
    bufferedTime: 90,
    isLoading: false,
    isBuffering: false,
    hasError: false,
    isInteractive: true,
    showTime: true,
    showBuffered: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Default progress bar with interactive seek functionality and buffering indicators.",
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Interactive Progress Bar</h3>
        <ProgressBar
          currentTime={45}
          duration={180}
          bufferedTime={90}
          isLoading={false}
          isBuffering={false}
          hasError={false}
          isInteractive={true}
          showTime={true}
          showBuffered={true}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Non-Interactive Progress Bar</h3>
        <ProgressBar
          currentTime={45}
          duration={180}
          bufferedTime={90}
          isLoading={false}
          isBuffering={false}
          hasError={false}
          isInteractive={false}
          showTime={true}
          showBuffered={true}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Minimal Progress Bar</h3>
        <ProgressBar
          currentTime={45}
          duration={180}
          bufferedTime={90}
          isLoading={false}
          isBuffering={false}
          hasError={false}
          isInteractive={true}
          showTime={false}
          showBuffered={false}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Progress bar variants showing interactive, non-interactive, and minimal configurations.",
      },
    },
  },
};

export const A11y: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Keyboard Navigation</h3>
        <ProgressBar
          currentTime={45}
          duration={180}
          bufferedTime={90}
          isLoading={false}
          isBuffering={false}
          hasError={false}
          isInteractive={true}
          showTime={true}
          showBuffered={true}
        />
        <p className="text-xs text-muted-foreground mt-2">
          Use Tab to focus, Arrow keys to seek, Home/End for start/end.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Screen Reader Support</h3>
        <ProgressBar
          currentTime={45}
          duration={180}
          bufferedTime={90}
          isLoading={false}
          isBuffering={false}
          hasError={false}
          isInteractive={true}
          showTime={true}
          showBuffered={true}
        />
        <p className="text-xs text-muted-foreground mt-2">
          Progress bar announces current time, duration, and buffered status to screen readers.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Focus Management</h3>
        <ProgressBar
          currentTime={45}
          duration={180}
          bufferedTime={90}
          isLoading={false}
          isBuffering={false}
          hasError={false}
          isInteractive={true}
          showTime={true}
          showBuffered={true}
        />
        <p className="text-xs text-muted-foreground mt-2">
          Progress bar shows visible focus indicators and proper ARIA attributes.
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
        <ProgressBar
          currentTime={0}
          duration={0}
          bufferedTime={0}
          isLoading={true}
          isBuffering={false}
          hasError={false}
          isInteractive={false}
          showTime={true}
          showBuffered={false}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Buffering State</h3>
        <ProgressBar
          currentTime={45}
          duration={180}
          bufferedTime={90}
          isLoading={false}
          isBuffering={true}
          hasError={false}
          isInteractive={true}
          showTime={true}
          showBuffered={true}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Error State</h3>
        <ProgressBar
          currentTime={0}
          duration={0}
          bufferedTime={0}
          isLoading={false}
          isBuffering={false}
          hasError={true}
          isInteractive={false}
          showTime={true}
          showBuffered={false}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Zero Duration</h3>
        <ProgressBar
          currentTime={0}
          duration={0}
          bufferedTime={0}
          isLoading={false}
          isBuffering={false}
          hasError={false}
          isInteractive={false}
          showTime={true}
          showBuffered={false}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Complete Buffering</h3>
        <ProgressBar
          currentTime={45}
          duration={180}
          bufferedTime={180}
          isLoading={false}
          isBuffering={false}
          hasError={false}
          isInteractive={true}
          showTime={true}
          showBuffered={true}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Edge cases including loading state, buffering state, error state, zero duration, and complete buffering.",
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
        <ProgressBar
          currentTime={0}
          duration={180}
          bufferedTime={0}
          isLoading={false}
          isBuffering={false}
          hasError={false}
          isInteractive={true}
          showTime={true}
          showBuffered={true}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Playing State</h3>
        <ProgressBar
          currentTime={45}
          duration={180}
          bufferedTime={90}
          isLoading={false}
          isBuffering={false}
          hasError={false}
          isInteractive={true}
          showTime={true}
          showBuffered={true}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Paused State</h3>
        <ProgressBar
          currentTime={45}
          duration={180}
          bufferedTime={90}
          isLoading={false}
          isBuffering={false}
          hasError={false}
          isInteractive={true}
          showTime={true}
          showBuffered={true}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Loading State</h3>
        <ProgressBar
          currentTime={0}
          duration={0}
          bufferedTime={0}
          isLoading={true}
          isBuffering={false}
          hasError={false}
          isInteractive={false}
          showTime={true}
          showBuffered={false}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different progress bar states including idle, playing, paused, and loading states.",
      },
    },
  },
};

// ============================================================================
// INTERACTIVE STORIES
// ============================================================================

export const Interactive: Story = {
  render: () => {
    const handleSeek = (time: number) => {
      console.log("Seek to:", time);
    };
    const handleHover = (time: number) => {
      console.log("Hover at:", time);
    };
    const handleLeave = () => {
      console.log("Leave progress bar");
    };

    return (
      <div className="space-y-4">
        <ProgressBar
          currentTime={45}
          duration={180}
          bufferedTime={90}
          isLoading={false}
          isBuffering={false}
          hasError={false}
          isInteractive={true}
          showTime={true}
          showBuffered={true}
          onSeek={handleSeek}
          onHover={handleHover}
          onLeave={handleLeave}
        />
        <p className="text-xs text-muted-foreground">
          Check the Actions panel to see interaction events. Hover over the progress bar to see the time tooltip.
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive progress bar with event handling. Check the Actions panel for events.",
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
          Progress bar component is optimized for minimal bundle size with efficient rendering.
        </p>
        <ProgressBar
          currentTime={45}
          duration={180}
          bufferedTime={90}
          isLoading={false}
          isBuffering={false}
          hasError={false}
          isInteractive={true}
          showTime={true}
          showBuffered={true}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Memory Management</h3>
        <p className="text-xs text-muted-foreground mb-2">
          Component uses efficient state management and minimal re-renders.
        </p>
        <ProgressBar
          currentTime={45}
          duration={180}
          bufferedTime={90}
          isLoading={false}
          isBuffering={false}
          hasError={false}
          isInteractive={true}
          showTime={true}
          showBuffered={true}
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
    currentTime: 45,
    duration: 180,
    bufferedTime: 90,
    isLoading: false,
    isBuffering: false,
    hasError: false,
    isInteractive: true,
    showTime: true,
    showBuffered: true,
  },
};

export const Loading: Story = {
  args: {
    currentTime: 0,
    duration: 0,
    bufferedTime: 0,
    isLoading: true,
    isBuffering: false,
    hasError: false,
    isInteractive: false,
    showTime: true,
    showBuffered: false,
  },
};

export const Buffering: Story = {
  args: {
    currentTime: 45,
    duration: 180,
    bufferedTime: 90,
    isLoading: false,
    isBuffering: true,
    hasError: false,
    isInteractive: true,
    showTime: true,
    showBuffered: true,
  },
};

export const Error: Story = {
  args: {
    currentTime: 0,
    duration: 0,
    bufferedTime: 0,
    isLoading: false,
    isBuffering: false,
    hasError: true,
    isInteractive: false,
    showTime: true,
    showBuffered: false,
  },
};

export const NonInteractive: Story = {
  args: {
    currentTime: 45,
    duration: 180,
    bufferedTime: 90,
    isLoading: false,
    isBuffering: false,
    hasError: false,
    isInteractive: false,
    showTime: true,
    showBuffered: true,
  },
};

export const Minimal: Story = {
  args: {
    currentTime: 45,
    duration: 180,
    bufferedTime: 90,
    isLoading: false,
    isBuffering: false,
    hasError: false,
    isInteractive: true,
    showTime: false,
    showBuffered: false,
  },
};
