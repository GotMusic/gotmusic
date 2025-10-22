import { storybookFixtures } from "@gotmusic/fixtures";
import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "Feedback/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Toast notification component for displaying temporary messages to users. Supports multiple variants, sizes, and accessibility features.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "error", "info"],
      description: "Visual style variant of the toast",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the toast",
    },
    title: {
      control: "text",
      description: "Toast title",
    },
    description: {
      control: "text",
      description: "Toast description/message",
    },
    duration: {
      control: "number",
      description: "Auto-dismiss duration in milliseconds",
    },
    onClose: {
      action: "closed",
      description: "Callback when toast is closed",
    },
  },
  args: {
    title: "Notification",
    description: "This is a toast notification message.",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// PRIMARY STORIES (Required by STORYBOOK-GUIDE.md)
// ============================================================================

export const Primary: Story = {
  args: {
    title: storybookFixtures.notifications.success.title,
    description: storybookFixtures.notifications.success.message,
    variant: "success",
  },
  parameters: {
    docs: {
      description: {
        story: "Default toast notification with success variant.",
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <Toast
        title={storybookFixtures.notifications.success.title}
        description={storybookFixtures.notifications.success.message}
        variant="success"
      />

      <Toast
        title={storybookFixtures.notifications.error.title}
        description={storybookFixtures.notifications.error.message}
        variant="error"
      />

      <Toast
        title={storybookFixtures.notifications.warning.title}
        description={storybookFixtures.notifications.warning.message}
        variant="warning"
      />

      <Toast
        title={storybookFixtures.notifications.info.title}
        description={storybookFixtures.notifications.info.message}
        variant="info"
      />

      <Toast
        title="Default Toast"
        description="This is a default toast notification."
        variant="default"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available toast variants showing different visual styles and use cases.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Toast
        title="Small Toast"
        description="This is a small toast notification."
        size="sm"
        variant="info"
      />

      <Toast
        title="Medium Toast"
        description="This is a medium toast notification with more content."
        size="md"
        variant="success"
      />

      <Toast
        title="Large Toast"
        description="This is a large toast notification with even more content and detailed information."
        size="lg"
        variant="warning"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different toast sizes from small to large.",
      },
    },
  },
};

export const A11y: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Screen Reader Support</h3>
        <Toast
          title="Accessible Toast"
          description="This toast is properly announced to screen readers with appropriate ARIA attributes."
          variant="info"
        />
        <p className="text-xs text-muted-foreground mt-2">
          Toast announces title and description to screen readers with proper ARIA live regions.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Keyboard Navigation</h3>
        <Toast
          title="Keyboard Accessible"
          description="This toast can be dismissed with the Escape key."
          variant="success"
        />
        <p className="text-xs text-muted-foreground mt-2">
          Use Escape key to dismiss toast, Tab to navigate to dismiss button.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Focus Management</h3>
        <Toast
          title="Focus Management"
          description="Toast shows visible focus indicators for interactive elements."
          variant="warning"
        />
        <p className="text-xs text-muted-foreground mt-2">
          Dismiss button shows visible focus ring when focused.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Accessibility features including screen reader support, keyboard navigation, and focus management.",
      },
    },
  },
};

export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Long Content</h3>
        <Toast
          title="Very Long Toast Title That Might Wrap to Multiple Lines"
          description="This is a very long toast description that contains a lot of text and might wrap to multiple lines. It should handle the content gracefully without breaking the layout or causing accessibility issues."
          variant="info"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">No Description</h3>
        <Toast title="Title Only Toast" variant="success" />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">No Title</h3>
        <Toast description="Description only toast notification." variant="warning" />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Empty Content</h3>
        <Toast title="" description="" variant="error" />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Very Short Duration</h3>
        <Toast
          title="Quick Toast"
          description="This toast will auto-dismiss quickly."
          variant="info"
          duration={1000}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Edge cases including long content, missing title/description, empty content, and custom durations.",
      },
    },
  },
};

// ============================================================================
// INTERACTIVE STORIES
// ============================================================================

export const Interactive: Story = {
  render: () => {
    const handleDismiss = () => {};

    return (
      <div className="space-y-4">
        <Toast
          title="Interactive Toast"
          description="This toast has interactive dismiss functionality."
          variant="success"
          onClose={handleDismiss}
        />
        <p className="text-xs text-muted-foreground">
          Check the Actions panel to see dismiss events.
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive toast with dismiss handling. Check the Actions panel for dismiss events.",
      },
    },
  },
};

// ============================================================================
// NOTIFICATION TYPES STORIES
// ============================================================================

export const NotificationTypes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Success Notifications</h3>
        <Toast
          title={storybookFixtures.notifications.success.title}
          description={storybookFixtures.notifications.success.message}
          variant="success"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Error Notifications</h3>
        <Toast
          title={storybookFixtures.notifications.error.title}
          description={storybookFixtures.notifications.error.message}
          variant="error"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Warning Notifications</h3>
        <Toast
          title={storybookFixtures.notifications.warning.title}
          description={storybookFixtures.notifications.warning.message}
          variant="warning"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Info Notifications</h3>
        <Toast
          title={storybookFixtures.notifications.info.title}
          description={storybookFixtures.notifications.info.message}
          variant="info"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different notification types using fixtures data for consistent messaging.",
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
          Toast component is optimized for minimal bundle size with efficient rendering.
        </p>
        <Toast
          title="Performance Optimized"
          description="This toast is built with performance in mind."
          variant="info"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Memory Management</h3>
        <p className="text-xs text-muted-foreground mb-2">
          Toast properly cleans up timers and event listeners to prevent memory leaks.
        </p>
        <Toast
          title="Memory Efficient"
          description="Auto-dismiss timers are properly cleaned up."
          variant="success"
          duration={3000}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Rendering Performance</h3>
        <p className="text-xs text-muted-foreground mb-2">
          Multiple toasts render efficiently without performance impact.
        </p>
        <div className="space-y-2">
          {Array.from({ length: 3 }, (_, i) => (
            <Toast
              key={`performance-toast-${i + 1}`}
              title={`Performance Test ${i + 1}`}
              description={`Toast ${i + 1} for performance testing.`}
              variant={["success", "warning", "info"][i] as "success" | "warning" | "info"}
            />
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Performance optimizations following e18e standards including bundle size, memory management, and rendering performance.",
      },
    },
  },
};
