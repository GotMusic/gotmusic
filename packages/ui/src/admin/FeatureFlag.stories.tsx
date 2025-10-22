import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FeatureFlag } from "./FeatureFlag";

const meta: Meta<typeof FeatureFlag> = {
  title: "Admin/FeatureFlag",
  component: FeatureFlag,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Feature flag component for admin dashboard with toggle functionality and status indicators.",
      },
    },
  },
  argTypes: {
    name: {
      control: "text",
      description: "Name of the feature flag",
    },
    description: {
      control: "text",
      description: "Optional description of the feature flag",
    },
    enabled: {
      control: "boolean",
      description: "Whether the feature flag is enabled",
    },
    experimental: {
      control: "boolean",
      description: "Whether the feature flag is experimental",
    },
    deprecated: {
      control: "boolean",
      description: "Whether the feature flag is deprecated",
    },
    showToggle: {
      control: "boolean",
      description: "Whether to show the toggle switch",
    },
    status: {
      control: "select",
      options: ["enabled", "disabled", "experimental", "deprecated"],
      description: "Override status (if not using enabled/experimental/deprecated props)",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the status badge",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FeatureFlag>;

export const Default: Story = {
  args: {
    name: "Dark Mode",
    description: "Enable dark mode theme for the application",
    enabled: false,
    showToggle: true,
  },
};

export const Enabled: Story = {
  args: {
    name: "User Analytics",
    description: "Track user behavior and analytics data",
    enabled: true,
    showToggle: true,
  },
};

export const Experimental: Story = {
  args: {
    name: "AI Recommendations",
    description: "Experimental AI-powered music recommendations",
    experimental: true,
    showToggle: true,
  },
};

export const Deprecated: Story = {
  args: {
    name: "Legacy Upload",
    description: "Old file upload system (will be removed in v2.0)",
    deprecated: true,
    showToggle: false,
  },
};

export const WithoutToggle: Story = {
  args: {
    name: "System Feature",
    description: "System-level feature that cannot be toggled by users",
    enabled: true,
    showToggle: false,
  },
};

export const LongDescription: Story = {
  args: {
    name: "Advanced Audio Processing",
    description:
      "Enable advanced audio processing algorithms including real-time noise reduction, dynamic range compression, and intelligent EQ adjustments. This feature requires additional server resources and may impact performance on lower-end devices.",
    enabled: false,
    showToggle: true,
  },
};

export const SmallSize: Story = {
  args: {
    name: "Quick Feature",
    description: "Small feature flag",
    enabled: true,
    showToggle: true,
    size: "sm",
  },
};

export const LargeSize: Story = {
  args: {
    name: "Important Feature",
    description: "Large feature flag for important features",
    enabled: true,
    showToggle: true,
    size: "lg",
  },
};

export const Interactive: Story = {
  render: () => {
    const [enabled, setEnabled] = useState(false);
    const [experimental, setExperimental] = useState(false);
    const [deprecated, setDeprecated] = useState(false);

    return (
      <div className="space-y-4">
        <FeatureFlag
          name="Interactive Feature"
          description="This feature can be toggled interactively"
          enabled={enabled}
          experimental={experimental}
          deprecated={deprecated}
          showToggle={!deprecated}
          onToggle={setEnabled}
        />

        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
            />
            Enabled
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={experimental}
              onChange={(e) => setExperimental(e.target.checked)}
            />
            Experimental
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={deprecated}
              onChange={(e) => setDeprecated(e.target.checked)}
            />
            Deprecated
          </label>
        </div>
      </div>
    );
  },
};

export const MultipleFlags: Story = {
  render: () => (
    <div className="space-y-3">
      <FeatureFlag
        name="User Authentication"
        description="Secure user authentication system"
        enabled={true}
        showToggle={true}
      />
      <FeatureFlag
        name="Beta Features"
        description="Access to experimental beta features"
        experimental={true}
        showToggle={true}
      />
      <FeatureFlag
        name="Legacy API"
        description="Old API endpoints (deprecated)"
        deprecated={true}
        showToggle={false}
      />
      <FeatureFlag
        name="Analytics Tracking"
        description="User behavior analytics and tracking"
        enabled={false}
        showToggle={true}
      />
    </div>
  ),
};

export const Accessibility: Story = {
  args: {
    name: "Accessible Feature",
    description: "This feature flag demonstrates proper accessibility attributes",
    enabled: true,
    showToggle: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the accessibility features of the FeatureFlag component, including proper ARIA labels and keyboard navigation.",
      },
    },
  },
};
