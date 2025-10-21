import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

// Import the tokens CSS to make variables available
import "../theme/tokens.css";

// Token display components
const ColorSwatch = ({
  name,
  token,
  description,
}: { name: string; token: string; description?: string }) => (
  <div className="flex items-center gap-4 p-3 rounded-lg border border-border-subtle bg-bg-elevated">
    <div
      className="h-12 w-12 rounded-md border border-border-subtle flex-shrink-0"
      style={{ background: `var(${token})` }}
    />
    <div className="flex-1 min-w-0">
      <div className="font-medium text-fg">{name}</div>
      <code className="text-xs text-fg-muted font-mono">{token}</code>
      {description && <div className="text-sm text-fg-subtle mt-1">{description}</div>}
    </div>
  </div>
);

const SpacingSwatch = ({ name, token, size }: { name: string; token: string; size: number }) => (
  <div className="flex items-center gap-4 p-3 rounded-lg border border-border-subtle bg-bg-elevated">
    <div className="flex items-center gap-2">
      <div className="bg-brand-primary rounded-sm" style={{ width: `${size}px`, height: "8px" }} />
      <span className="text-sm text-fg-muted">{size}px</span>
    </div>
    <div className="flex-1 min-w-0">
      <div className="font-medium text-fg">{name}</div>
      <code className="text-xs text-fg-muted font-mono">{token}</code>
    </div>
  </div>
);

const RadiusSwatch = ({ name, token, radius }: { name: string; token: string; radius: number }) => (
  <div className="flex items-center gap-4 p-3 rounded-lg border border-border-subtle bg-bg-elevated">
    <div
      className="bg-brand-primary"
      style={{
        width: "32px",
        height: "32px",
        borderRadius: `${radius}px`,
      }}
    />
    <div className="flex-1 min-w-0">
      <div className="font-medium text-fg">{name}</div>
      <code className="text-xs text-fg-muted font-mono">{token}</code>
      <div className="text-sm text-fg-subtle">{radius}px</div>
    </div>
  </div>
);

const ShadowSwatch = ({
  name,
  token,
  description,
}: { name: string; token: string; description?: string }) => (
  <div className="flex items-center gap-4 p-3 rounded-lg border border-border-subtle bg-bg-elevated">
    <div
      className="h-12 w-12 rounded-md bg-bg-elevated flex-shrink-0"
      style={{ boxShadow: `var(${token})` }}
    />
    <div className="flex-1 min-w-0">
      <div className="font-medium text-fg">{name}</div>
      <code className="text-xs text-fg-muted font-mono">{token}</code>
      {description && <div className="text-sm text-fg-subtle mt-1">{description}</div>}
    </div>
  </div>
);

const TypographySample = ({
  name,
  token,
  className,
}: { name: string; token: string; className: string }) => (
  <div className="flex items-center gap-4 p-3 rounded-lg border border-border-subtle bg-bg-elevated">
    <div className="flex-1 min-w-0">
      <div className="font-medium text-fg mb-1">{name}</div>
      <div className={className}>The quick brown fox jumps over the lazy dog</div>
      <code className="text-xs text-fg-muted font-mono mt-1">{token}</code>
    </div>
  </div>
);

const meta: Meta = {
  title: "Design System/Tokens Gallery",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A comprehensive showcase of the GotMusic design system tokens, including colors, spacing, typography, shadows, and more.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ColorPalette: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-fg mb-6">Color Palette</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-fg mb-4">Neutral Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <ColorSwatch
                name="Neutral 0"
                token="--color-palette-neutral-0"
                description="Darkest background"
              />
              <ColorSwatch
                name="Neutral 50"
                token="--color-palette-neutral-50"
                description="Default background"
              />
              <ColorSwatch
                name="Neutral 100"
                token="--color-palette-neutral-100"
                description="Muted background"
              />
              <ColorSwatch
                name="Neutral 200"
                token="--color-palette-neutral-200"
                description="Elevated background"
              />
              <ColorSwatch
                name="Neutral 300"
                token="--color-palette-neutral-300"
                description="Active background"
              />
              <ColorSwatch
                name="Neutral 400"
                token="--color-palette-neutral-400"
                description="Subtle background"
              />
              <ColorSwatch
                name="Neutral 500"
                token="--color-palette-neutral-500"
                description="Medium background"
              />
              <ColorSwatch
                name="Neutral 600"
                token="--color-palette-neutral-600"
                description="Emphasis background"
              />
              <ColorSwatch
                name="Neutral 700"
                token="--color-palette-neutral-700"
                description="Strong background"
              />
              <ColorSwatch
                name="Neutral 800"
                token="--color-palette-neutral-800"
                description="Muted foreground"
              />
              <ColorSwatch
                name="Neutral 900"
                token="--color-palette-neutral-900"
                description="Subtle foreground"
              />
              <ColorSwatch
                name="Neutral 1000"
                token="--color-palette-neutral-1000"
                description="Default foreground"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-fg mb-4">Brand Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <ColorSwatch
                name="Mint"
                token="--color-palette-brand-mint"
                description="Primary brand color"
              />
              <ColorSwatch
                name="Mint 200"
                token="--color-palette-brand-mint-200"
                description="Light mint variant"
              />
              <ColorSwatch
                name="Mint 700"
                token="--color-palette-brand-mint-700"
                description="Dark mint variant"
              />
              <ColorSwatch
                name="Ice"
                token="--color-palette-brand-ice"
                description="Accent brand color"
              />
              <ColorSwatch
                name="Ice 200"
                token="--color-palette-brand-ice-200"
                description="Light ice variant"
              />
              <ColorSwatch
                name="Ice 700"
                token="--color-palette-brand-ice-700"
                description="Dark ice variant"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-fg mb-4">Semantic Colors</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <ColorSwatch
                name="Success"
                token="--color-palette-semantic-success"
                description="Success states"
              />
              <ColorSwatch
                name="Warning"
                token="--color-palette-semantic-warning"
                description="Warning states"
              />
              <ColorSwatch
                name="Danger"
                token="--color-palette-semantic-danger"
                description="Error states"
              />
              <ColorSwatch
                name="Info"
                token="--color-palette-semantic-info"
                description="Information states"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "The complete color palette including neutral, brand, and semantic colors with their CSS custom property names.",
      },
    },
  },
};

export const BackgroundColors: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-fg mb-6">Background Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <ColorSwatch
            name="Default Background"
            token="--color-bg-default"
            description="Main background color"
          />
          <ColorSwatch
            name="Elevated Background"
            token="--color-bg-elevated"
            description="Cards and elevated surfaces"
          />
          <ColorSwatch
            name="Muted Background"
            token="--color-bg-muted"
            description="Subtle background variations"
          />
          <ColorSwatch
            name="Active Background"
            token="--color-bg-active"
            description="Active and selected states"
          />
          <ColorSwatch
            name="Overlay Background"
            token="--color-bg-overlay"
            description="Modal and overlay backgrounds"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Background color tokens used throughout the application for different surface levels.",
      },
    },
  },
};

export const ForegroundColors: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-fg mb-6">Foreground Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <ColorSwatch
            name="Default Foreground"
            token="--color-fg-default"
            description="Primary text color"
          />
          <ColorSwatch
            name="Muted Foreground"
            token="--color-fg-muted"
            description="Secondary text color"
          />
          <ColorSwatch
            name="Subtle Foreground"
            token="--color-fg-subtle"
            description="Tertiary text color"
          />
          <ColorSwatch
            name="Inverse Foreground"
            token="--color-fg-inverse"
            description="Text on brand backgrounds"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Foreground color tokens for text and content with different emphasis levels.",
      },
    },
  },
};

export const BrandColors: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-fg mb-6">Brand Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <ColorSwatch
            name="Brand Primary"
            token="--color-brand-primary"
            description="Main brand color"
          />
          <ColorSwatch
            name="Brand Accent"
            token="--color-brand-accent"
            description="Accent brand color"
          />
          <ColorSwatch
            name="Brand Ring"
            token="--color-brand-ring"
            description="Focus ring color"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Core brand colors used for primary actions, accents, and focus states.",
      },
    },
  },
};

export const BorderColors: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-fg mb-6">Border Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <ColorSwatch
            name="Hairline Border"
            token="--color-border-hairline"
            description="Subtle borders"
          />
          <ColorSwatch
            name="Subtle Border"
            token="--color-border-subtle"
            description="Standard borders"
          />
          <ColorSwatch
            name="Emphasis Border"
            token="--color-border-emphasis"
            description="Strong borders"
          />
          <ColorSwatch
            name="Brand Border"
            token="--color-border-brand"
            description="Brand-colored borders"
          />
          <ColorSwatch
            name="Danger Border"
            token="--color-border-danger"
            description="Error borders"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Border color tokens for different emphasis levels and semantic states.",
      },
    },
  },
};

export const StateColors: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-fg mb-6">State Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <ColorSwatch
            name="Hover State"
            token="--color-state-hover"
            description="Hover interactions"
          />
          <ColorSwatch
            name="Press State"
            token="--color-state-press"
            description="Active press states"
          />
          <ColorSwatch
            name="Focus State"
            token="--color-state-focus"
            description="Keyboard focus"
          />
          <ColorSwatch
            name="Selected State"
            token="--color-state-selected"
            description="Selected items"
          />
          <ColorSwatch
            name="Disabled Foreground"
            token="--color-state-disabled-fg"
            description="Disabled text"
          />
          <ColorSwatch
            name="Disabled Background"
            token="--color-state-disabled-bg"
            description="Disabled surfaces"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Interactive state colors for hover, focus, selection, and disabled states.",
      },
    },
  },
};

export const SpacingScale: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-fg mb-6">Spacing Scale</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <SpacingSwatch name="Space 0" token="--space-0" size={0} />
          <SpacingSwatch name="Space 1" token="--space-1" size={4} />
          <SpacingSwatch name="Space 2" token="--space-2" size={8} />
          <SpacingSwatch name="Space 3" token="--space-3" size={12} />
          <SpacingSwatch name="Space 4" token="--space-4" size={16} />
          <SpacingSwatch name="Space 5" token="--space-5" size={20} />
          <SpacingSwatch name="Space 6" token="--space-6" size={24} />
          <SpacingSwatch name="Space 8" token="--space-8" size={32} />
          <SpacingSwatch name="Space 10" token="--space-10" size={40} />
          <SpacingSwatch name="Space 12" token="--space-12" size={48} />
          <SpacingSwatch name="Space 16" token="--space-16" size={64} />
          <SpacingSwatch name="Space 24" token="--space-24" size={96} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Consistent spacing scale based on a 4px grid system for layout and component spacing.",
      },
    },
  },
};

export const BorderRadius: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-fg mb-6">Border Radius</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <RadiusSwatch name="Extra Small" token="--radius-xs" radius={6} />
          <RadiusSwatch name="Small" token="--radius-sm" radius={8} />
          <RadiusSwatch name="Medium" token="--radius-md" radius={12} />
          <RadiusSwatch name="Large" token="--radius-lg" radius={16} />
          <RadiusSwatch name="Extra Large" token="--radius-xl" radius={20} />
          <RadiusSwatch name="Full" token="--radius-full" radius={999} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Border radius tokens for consistent corner rounding across components.",
      },
    },
  },
};

export const Shadows: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-fg mb-6">Shadows & Elevation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <ShadowSwatch
            name="Ambient 1"
            token="--elevation-ambient-1"
            description="Subtle elevation"
          />
          <ShadowSwatch
            name="Ambient 2"
            token="--elevation-ambient-2"
            description="Medium elevation"
          />
          <ShadowSwatch
            name="Ambient 3"
            token="--elevation-ambient-3"
            description="Strong elevation"
          />
          <ShadowSwatch
            name="Brand Glow Soft"
            token="--elevation-glow-brand-soft"
            description="Brand glow effect"
          />
          <ShadowSwatch
            name="Accent Glow Soft"
            token="--elevation-glow-accent-soft"
            description="Accent glow effect"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Shadow and elevation tokens for creating depth and visual hierarchy.",
      },
    },
  },
};

export const Typography: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-fg mb-6">Typography Scale</h2>
        <div className="space-y-4">
          <TypographySample
            name="Display Large"
            token="--text-display-lg"
            className="text-display-lg font-bold text-fg"
          />
          <TypographySample
            name="Display Medium"
            token="--text-display-md"
            className="text-display-md font-semibold text-fg"
          />
          <TypographySample
            name="Display Small"
            token="--text-display-sm"
            className="text-display-sm font-semibold text-fg"
          />
          <TypographySample name="Extra Large" token="--text-xl" className="text-xl text-fg" />
          <TypographySample name="Large" token="--text-lg" className="text-lg text-fg" />
          <TypographySample name="Medium" token="--text-md" className="text-md text-fg" />
          <TypographySample name="Small" token="--text-sm" className="text-sm text-fg" />
          <TypographySample name="Extra Small" token="--text-xs" className="text-xs text-fg" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Typography scale with consistent sizing, line heights, and font weights.",
      },
    },
  },
};

export const IconSizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-fg mb-6">Icon Sizes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { name: "Extra Small", token: "--size-icon-xs", size: 12 },
            { name: "Small", token: "--size-icon-sm", size: 14 },
            { name: "Medium", token: "--size-icon-md", size: 16 },
            { name: "Large", token: "--size-icon-lg", size: 20 },
            { name: "Extra Large", token: "--size-icon-xl", size: 24 },
            { name: "2X Large", token: "--size-icon-xxl", size: 32 },
          ].map(({ name, token, size }) => (
            <div
              key={token}
              className="flex items-center gap-4 p-3 rounded-lg border border-border-subtle bg-bg-elevated"
            >
              <div
                className="bg-brand-primary rounded-sm flex items-center justify-center text-xs text-fg-inverse font-bold"
                style={{ width: `${size}px`, height: `${size}px` }}
              >
                {size}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-fg">{name}</div>
                <code className="text-xs text-fg-muted font-mono">{token}</code>
                <div className="text-sm text-fg-subtle">{size}px</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Icon size tokens for consistent iconography across the application.",
      },
    },
  },
};

export const ControlSizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-fg mb-6">Control Sizes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { name: "Small Control", token: "--size-control-sm", size: 28 },
            { name: "Medium Control", token: "--size-control-md", size: 36 },
            { name: "Large Control", token: "--size-control-lg", size: 44 },
          ].map(({ name, token, size }) => (
            <div
              key={token}
              className="flex items-center gap-4 p-3 rounded-lg border border-border-subtle bg-bg-elevated"
            >
              <div
                className="bg-brand-primary rounded-md flex items-center justify-center text-xs text-fg-inverse font-bold"
                style={{ width: `${size}px`, height: `${size}px` }}
              >
                {size}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-fg">{name}</div>
                <code className="text-xs text-fg-muted font-mono">{token}</code>
                <div className="text-sm text-fg-subtle">{size}px</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Control size tokens for interactive elements like buttons and form inputs.",
      },
    },
  },
};

export const ContainerSizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-fg mb-6">Container Breakpoints</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { name: "Small Container", token: "--size-container-sm", size: 640 },
            { name: "Medium Container", token: "--size-container-md", size: 768 },
            { name: "Large Container", token: "--size-container-lg", size: 1024 },
            { name: "Extra Large Container", token: "--size-container-xl", size: 1280 },
          ].map(({ name, token, size }) => (
            <div
              key={token}
              className="flex items-center gap-4 p-3 rounded-lg border border-border-subtle bg-bg-elevated"
            >
              <div className="flex-1 min-w-0">
                <div className="font-medium text-fg">{name}</div>
                <code className="text-xs text-fg-muted font-mono">{token}</code>
                <div className="text-sm text-fg-subtle">{size}px</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Container breakpoint tokens for responsive design and layout constraints.",
      },
    },
  },
};

export const ZIndexScale: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-fg mb-6">Z-Index Scale</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { name: "Base", token: "--z-base", value: 0 },
            { name: "Dropdown", token: "--z-dropdown", value: 10 },
            { name: "Sticky", token: "--z-sticky", value: 20 },
            { name: "Overlay", token: "--z-overlay", value: 30 },
            { name: "Modal", token: "--z-modal", value: 40 },
            { name: "Toast", token: "--z-toast", value: 50 },
          ].map(({ name, token, value }) => (
            <div
              key={token}
              className="flex items-center gap-4 p-3 rounded-lg border border-border-subtle bg-bg-elevated"
            >
              <div className="flex-1 min-w-0">
                <div className="font-medium text-fg">{name}</div>
                <code className="text-xs text-fg-muted font-mono">{token}</code>
                <div className="text-sm text-fg-subtle">z-index: {value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Z-index scale for layering elements and managing stacking context.",
      },
    },
  },
};

export const OpacityScale: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-fg mb-6">Opacity Scale</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { name: "0%", token: "--opacity-0", value: 0 },
            { name: "4%", token: "--opacity-4", value: 0.04 },
            { name: "6%", token: "--opacity-6", value: 0.06 },
            { name: "10%", token: "--opacity-10", value: 0.1 },
            { name: "16%", token: "--opacity-16", value: 0.16 },
            { name: "20%", token: "--opacity-20", value: 0.2 },
            { name: "35%", token: "--opacity-35", value: 0.35 },
            { name: "70%", token: "--opacity-70", value: 0.7 },
          ].map(({ name, token, value }) => (
            <div
              key={token}
              className="flex items-center gap-4 p-3 rounded-lg border border-border-subtle bg-bg-elevated"
            >
              <div
                className="h-8 w-8 rounded-md bg-brand-primary flex-shrink-0"
                style={{ opacity: value }}
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-fg">{name}</div>
                <code className="text-xs text-fg-muted font-mono">{token}</code>
                <div className="text-sm text-fg-subtle">{Math.round(value * 100)}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Opacity scale for creating transparency effects and visual hierarchy.",
      },
    },
  },
};

export const BlurValues: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-fg mb-6">Blur Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { name: "Backdrop Blur", token: "--blur-backdrop", value: 12 },
            { name: "Popover Blur", token: "--blur-popover", value: 20 },
          ].map(({ name, token, value }) => (
            <div
              key={token}
              className="flex items-center gap-4 p-3 rounded-lg border border-border-subtle bg-bg-elevated"
            >
              <div
                className="h-8 w-8 rounded-md bg-brand-primary flex-shrink-0"
                style={{ filter: `blur(${value}px)` }}
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-fg">{name}</div>
                <code className="text-xs text-fg-muted font-mono">{token}</code>
                <div className="text-sm text-fg-subtle">{value}px</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Blur values for backdrop effects and visual depth.",
      },
    },
  },
};

export const AllTokens: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold text-fg mb-2">GotMusic Design System</h1>
        <p className="text-lg text-fg-muted mb-8">
          A comprehensive showcase of all design tokens in the GotMusic design system.
        </p>
      </div>

      {/* Color Palette */}
      <div>
        <h2 className="text-2xl font-bold text-fg mb-6">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <ColorSwatch name="Neutral 0" token="--color-palette-neutral-0" />
          <ColorSwatch name="Neutral 50" token="--color-palette-neutral-50" />
          <ColorSwatch name="Neutral 100" token="--color-palette-neutral-100" />
          <ColorSwatch name="Neutral 200" token="--color-palette-neutral-200" />
          <ColorSwatch name="Neutral 300" token="--color-palette-neutral-300" />
          <ColorSwatch name="Neutral 400" token="--color-palette-neutral-400" />
          <ColorSwatch name="Neutral 500" token="--color-palette-neutral-500" />
          <ColorSwatch name="Neutral 600" token="--color-palette-neutral-600" />
          <ColorSwatch name="Neutral 700" token="--color-palette-neutral-700" />
          <ColorSwatch name="Neutral 800" token="--color-palette-neutral-800" />
          <ColorSwatch name="Neutral 900" token="--color-palette-neutral-900" />
          <ColorSwatch name="Neutral 1000" token="--color-palette-neutral-1000" />
        </div>
      </div>

      {/* Brand Colors */}
      <div>
        <h2 className="text-2xl font-bold text-fg mb-6">Brand Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <ColorSwatch name="Mint" token="--color-palette-brand-mint" />
          <ColorSwatch name="Mint 200" token="--color-palette-brand-mint-200" />
          <ColorSwatch name="Mint 700" token="--color-palette-brand-mint-700" />
          <ColorSwatch name="Ice" token="--color-palette-brand-ice" />
          <ColorSwatch name="Ice 200" token="--color-palette-brand-ice-200" />
          <ColorSwatch name="Ice 700" token="--color-palette-brand-ice-700" />
        </div>
      </div>

      {/* Semantic Colors */}
      <div>
        <h2 className="text-2xl font-bold text-fg mb-6">Semantic Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <ColorSwatch name="Success" token="--color-palette-semantic-success" />
          <ColorSwatch name="Warning" token="--color-palette-semantic-warning" />
          <ColorSwatch name="Danger" token="--color-palette-semantic-danger" />
          <ColorSwatch name="Info" token="--color-palette-semantic-info" />
        </div>
      </div>

      {/* Spacing Scale */}
      <div>
        <h2 className="text-2xl font-bold text-fg mb-6">Spacing Scale</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <SpacingSwatch name="0" token="--space-0" size={0} />
          <SpacingSwatch name="1" token="--space-1" size={4} />
          <SpacingSwatch name="2" token="--space-2" size={8} />
          <SpacingSwatch name="3" token="--space-3" size={12} />
          <SpacingSwatch name="4" token="--space-4" size={16} />
          <SpacingSwatch name="5" token="--space-5" size={20} />
          <SpacingSwatch name="6" token="--space-6" size={24} />
          <SpacingSwatch name="8" token="--space-8" size={32} />
          <SpacingSwatch name="10" token="--space-10" size={40} />
          <SpacingSwatch name="12" token="--space-12" size={48} />
          <SpacingSwatch name="16" token="--space-16" size={64} />
          <SpacingSwatch name="24" token="--space-24" size={96} />
        </div>
      </div>

      {/* Border Radius */}
      <div>
        <h2 className="text-2xl font-bold text-fg mb-6">Border Radius</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <RadiusSwatch name="XS" token="--radius-xs" radius={6} />
          <RadiusSwatch name="SM" token="--radius-sm" radius={8} />
          <RadiusSwatch name="MD" token="--radius-md" radius={12} />
          <RadiusSwatch name="LG" token="--radius-lg" radius={16} />
          <RadiusSwatch name="XL" token="--radius-xl" radius={20} />
          <RadiusSwatch name="Full" token="--radius-full" radius={999} />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "A comprehensive overview of all design tokens in the GotMusic design system.",
      },
    },
  },
};
