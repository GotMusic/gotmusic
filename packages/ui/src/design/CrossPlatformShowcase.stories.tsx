import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Button } from "../core/Button";
import { Card } from "../core/Card";
import { Input } from "../core/Input";
import { Checkbox } from "../core/Checkbox";

// Platform-specific component variants
const WebButton = ({ children, ...props }: any) => (
  <Button {...props} className="web-button">
    {children}
  </Button>
);

const MobileButton = ({ children, ...props }: any) => (
  <Button {...props} className="mobile-button touch-target">
    {children}
  </Button>
);

const DesktopButton = ({ children, ...props }: any) => (
  <Button {...props} className="desktop-button keyboard-focused">
    {children}
  </Button>
);

const DAWButton = ({ children, ...props }: any) => (
  <Button {...props} className="daw-button compact">
    {children}
  </Button>
);

// Platform indicators
const PlatformIndicator = ({ platform, description }: { platform: string; description: string }) => (
  <div className="flex items-center gap-2 p-2 rounded-md bg-bg-elevated border border-border-subtle">
    <div className="w-2 h-2 rounded-full bg-brand-primary" />
    <span className="text-sm font-medium text-fg">{platform}</span>
    <span className="text-xs text-fg-muted">•</span>
    <span className="text-xs text-fg-subtle">{description}</span>
  </div>
);

const meta: Meta = {
  title: "Design System/Cross-Platform Showcase",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A comprehensive showcase of how GotMusic components adapt across web, mobile, desktop, and DAW platforms with platform-specific optimizations.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonCrossPlatform: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-fg mb-6">Button Component Across Platforms</h2>
        <p className="text-fg-muted mb-8">
          The same Button component with platform-specific optimizations for touch, keyboard, and compact interfaces.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Web Platform */}
          <div className="space-y-4">
            <PlatformIndicator platform="Web" description="Next.js + TailwindCSS" />
            <div className="space-y-4 p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-semibold text-fg">Web Optimizations</h3>
              <ul className="text-sm text-fg-muted space-y-1">
                <li>• Hover states and transitions</li>
                <li>• Keyboard navigation (Tab, Enter, Space)</li>
                <li>• Focus rings for accessibility</li>
                <li>• CSS custom properties</li>
              </ul>
              <div className="flex flex-wrap gap-3">
                <WebButton variant="primary">Primary</WebButton>
                <WebButton variant="secondary">Secondary</WebButton>
                <WebButton variant="outline">Outline</WebButton>
                <WebButton variant="ghost">Ghost</WebButton>
              </div>
            </div>
          </div>

          {/* Mobile Platform */}
          <div className="space-y-4">
            <PlatformIndicator platform="Mobile" description="React Native + NativeWind" />
            <div className="space-y-4 p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-semibold text-fg">Mobile Optimizations</h3>
              <ul className="text-sm text-fg-muted space-y-1">
                <li>• Touch targets (44px minimum)</li>
                <li>• Native press animations</li>
                <li>• Haptic feedback support</li>
                <li>• NativeWind styling</li>
              </ul>
              <div className="flex flex-wrap gap-3">
                <MobileButton variant="primary">Primary</MobileButton>
                <MobileButton variant="secondary">Secondary</MobileButton>
                <MobileButton variant="outline">Outline</MobileButton>
                <MobileButton variant="ghost">Ghost</MobileButton>
              </div>
            </div>
          </div>

          {/* Desktop Platform */}
          <div className="space-y-4">
            <PlatformIndicator platform="Desktop" description="JUCE C++ Framework" />
            <div className="space-y-4 p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-semibold text-fg">Desktop Optimizations</h3>
              <ul className="text-sm text-fg-muted space-y-1">
                <li>• Keyboard shortcuts (Ctrl/Cmd)</li>
                <li>• High-DPI support</li>
                <li>• Native OS styling</li>
                <li>• JUCE Colour system</li>
              </ul>
              <div className="flex flex-wrap gap-3">
                <DesktopButton variant="primary">Primary</DesktopButton>
                <DesktopButton variant="secondary">Secondary</DesktopButton>
                <DesktopButton variant="outline">Outline</DesktopButton>
                <DesktopButton variant="ghost">Ghost</DesktopButton>
              </div>
            </div>
          </div>

          {/* DAW Platform */}
          <div className="space-y-4">
            <PlatformIndicator platform="DAW" description="VST/AU Plugin" />
            <div className="space-y-4 p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-semibold text-fg">DAW Optimizations</h3>
              <ul className="text-sm text-fg-muted space-y-1">
                <li>• Compact sizing for plugin windows</li>
                <li>• Real-time performance</li>
                <li>• Plugin-specific styling</li>
                <li>• VST/AU compliance</li>
              </ul>
              <div className="flex flex-wrap gap-3">
                <DAWButton variant="primary">Primary</DAWButton>
                <DAWButton variant="secondary">Secondary</DAWButton>
                <DAWButton variant="outline">Outline</DAWButton>
                <DAWButton variant="ghost">Ghost</DAWButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Button component showcasing platform-specific optimizations for web, mobile, desktop, and DAW environments.",
      },
    },
  },
};

export const FormComponentsCrossPlatform: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-fg mb-6">Form Components Across Platforms</h2>
        <p className="text-fg-muted mb-8">
          Input, Checkbox, and other form components with platform-specific behaviors and styling.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Web Forms */}
          <div className="space-y-4">
            <PlatformIndicator platform="Web Forms" description="HTML5 + React" />
            <div className="space-y-4 p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-semibold text-fg">Web Form Features</h3>
              <ul className="text-sm text-fg-muted space-y-1">
                <li>• HTML5 validation</li>
                <li>• Auto-complete support</li>
                <li>• Keyboard navigation</li>
                <li>• Screen reader compatibility</li>
              </ul>
              <div className="space-y-4">
                <Input placeholder="Enter your email" />
                <div className="flex items-center gap-2">
                  <Checkbox id="web-checkbox" />
                  <label htmlFor="web-checkbox" className="text-sm text-fg">
                    Remember me
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Forms */}
          <div className="space-y-4">
            <PlatformIndicator platform="Mobile Forms" description="React Native + NativeWind" />
            <div className="space-y-4 p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-semibold text-fg">Mobile Form Features</h3>
              <ul className="text-sm text-fg-muted space-y-1">
                <li>• Touch-optimized inputs</li>
                <li>• Native keyboard types</li>
                <li>• Haptic feedback</li>
                <li>• Native validation</li>
              </ul>
              <div className="space-y-4">
                <Input placeholder="Enter your email" className="mobile-input" />
                <div className="flex items-center gap-2">
                  <Checkbox id="mobile-checkbox" />
                  <label htmlFor="mobile-checkbox" className="text-sm text-fg">
                    Remember me
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Forms */}
          <div className="space-y-4">
            <PlatformIndicator platform="Desktop Forms" description="JUCE C++ Framework" />
            <div className="space-y-4 p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-semibold text-fg">Desktop Form Features</h3>
              <ul className="text-sm text-fg-muted space-y-1">
                <li>• Native OS styling</li>
                <li>• Keyboard shortcuts</li>
                <li>• High-DPI rendering</li>
                <li>• Native validation</li>
              </ul>
              <div className="space-y-4">
                <Input placeholder="Enter your email" className="desktop-input" />
                <div className="flex items-center gap-2">
                  <Checkbox id="desktop-checkbox" />
                  <label htmlFor="desktop-checkbox" className="text-sm text-fg">
                    Remember me
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* DAW Forms */}
          <div className="space-y-4">
            <PlatformIndicator platform="DAW Forms" description="VST/AU Plugin Interface" />
            <div className="space-y-4 p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-semibold text-fg">DAW Form Features</h3>
              <ul className="text-sm text-fg-muted space-y-1">
                <li>• Compact sizing</li>
                <li>• Real-time updates</li>
                <li>• Plugin-specific styling</li>
                <li>• VST/AU compliance</li>
              </ul>
              <div className="space-y-4">
                <Input placeholder="Parameter value" className="daw-input" />
                <div className="flex items-center gap-2">
                  <Checkbox id="daw-checkbox" />
                  <label htmlFor="daw-checkbox" className="text-sm text-fg">
                    Enable effect
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Form components showcasing platform-specific optimizations for different input methods and validation.",
      },
    },
  },
};

export const CardComponentsCrossPlatform: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-fg mb-6">Card Components Across Platforms</h2>
        <p className="text-fg-muted mb-8">
          Card components with platform-specific layouts, interactions, and content organization.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Web Cards */}
          <div className="space-y-4">
            <PlatformIndicator platform="Web Cards" description="Responsive Grid Layout" />
            <div className="space-y-4">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-fg mb-2">Web Card</h3>
                <p className="text-fg-muted mb-4">
                  Responsive card with hover effects, focus states, and semantic HTML structure.
                </p>
                <div className="flex gap-2">
                  <Button size="sm">Action</Button>
                  <Button size="sm" variant="outline">Cancel</Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="space-y-4">
            <PlatformIndicator platform="Mobile Cards" description="Touch-Optimized Layout" />
            <div className="space-y-4">
              <Card className="p-6 mobile-card">
                <h3 className="text-lg font-semibold text-fg mb-2">Mobile Card</h3>
                <p className="text-fg-muted mb-4">
                  Touch-optimized card with native press animations and haptic feedback.
                </p>
                <div className="flex gap-2">
                  <Button size="sm">Action</Button>
                  <Button size="sm" variant="outline">Cancel</Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Desktop Cards */}
          <div className="space-y-4">
            <PlatformIndicator platform="Desktop Cards" description="Native OS Styling" />
            <div className="space-y-4">
              <Card className="p-6 desktop-card">
                <h3 className="text-lg font-semibold text-fg mb-2">Desktop Card</h3>
                <p className="text-fg-muted mb-4">
                  Native OS-styled card with keyboard navigation and high-DPI support.
                </p>
                <div className="flex gap-2">
                  <Button size="sm">Action</Button>
                  <Button size="sm" variant="outline">Cancel</Button>
                </div>
              </Card>
            </div>
          </div>

          {/* DAW Cards */}
          <div className="space-y-4">
            <PlatformIndicator platform="DAW Cards" description="Plugin Interface Layout" />
            <div className="space-y-4">
              <Card className="p-4 daw-card">
                <h3 className="text-base font-semibold text-fg mb-2">DAW Card</h3>
                <p className="text-sm text-fg-muted mb-3">
                  Compact card optimized for plugin interfaces with real-time updates.
                </p>
                <div className="flex gap-2">
                  <Button size="sm">Action</Button>
                  <Button size="sm" variant="outline">Cancel</Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Card components showcasing platform-specific layouts and interaction patterns.",
      },
    },
  },
};

export const AccessibilityCrossPlatform: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-fg mb-6">Accessibility Across Platforms</h2>
        <p className="text-fg-muted mb-8">
          WCAG 2.1 AA compliance and platform-specific accessibility features.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Web Accessibility */}
          <div className="space-y-4">
            <PlatformIndicator platform="Web A11y" description="WCAG 2.1 AA + ARIA" />
            <div className="space-y-4 p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-semibold text-fg">Web Accessibility Features</h3>
              <ul className="text-sm text-fg-muted space-y-1">
                <li>• ARIA labels and roles</li>
                <li>• Keyboard navigation</li>
                <li>• Screen reader support</li>
                <li>• Focus management</li>
                <li>• Color contrast (4.5:1 minimum)</li>
              </ul>
              <div className="space-y-2">
                <Button aria-label="Save document">💾 Save</Button>
                <Button aria-label="Delete item">🗑️ Delete</Button>
                <Button aria-label="Edit settings">⚙️ Settings</Button>
              </div>
            </div>
          </div>

          {/* Mobile Accessibility */}
          <div className="space-y-4">
            <PlatformIndicator platform="Mobile A11y" description="iOS/Android Guidelines" />
            <div className="space-y-4 p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-semibold text-fg">Mobile Accessibility Features</h3>
              <ul className="text-sm text-fg-muted space-y-1">
                <li>• VoiceOver/TalkBack support</li>
                <li>• Dynamic Type scaling</li>
                <li>• Touch target sizing (44px)</li>
                <li>• Haptic feedback</li>
                <li>• Native accessibility APIs</li>
              </ul>
              <div className="space-y-2">
                <Button accessibilityLabel="Save document">💾 Save</Button>
                <Button accessibilityLabel="Delete item">🗑️ Delete</Button>
                <Button accessibilityLabel="Edit settings">⚙️ Settings</Button>
              </div>
            </div>
          </div>

          {/* Desktop Accessibility */}
          <div className="space-y-4">
            <PlatformIndicator platform="Desktop A11y" description="Native OS Guidelines" />
            <div className="space-y-4 p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-semibold text-fg">Desktop Accessibility Features</h3>
              <ul className="text-sm text-fg-muted space-y-1">
                <li>• Native OS accessibility</li>
                <li>• High contrast mode</li>
                <li>• Keyboard shortcuts</li>
                <li>• Screen reader support</li>
                <li>• Focus indicators</li>
              </ul>
              <div className="space-y-2">
                <Button>💾 Save (Ctrl+S)</Button>
                <Button>🗑️ Delete (Del)</Button>
                <Button>⚙️ Settings (Ctrl+,)</Button>
              </div>
            </div>
          </div>

          {/* DAW Accessibility */}
          <div className="space-y-4">
            <PlatformIndicator platform="DAW A11y" description="Plugin Accessibility" />
            <div className="space-y-4 p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-semibold text-fg">DAW Accessibility Features</h3>
              <ul className="text-sm text-fg-muted space-y-1">
                <li>• Plugin accessibility APIs</li>
                <li>• Parameter descriptions</li>
                <li>• Keyboard navigation</li>
                <li>• Screen reader support</li>
                <li>• Real-time updates</li>
              </ul>
              <div className="space-y-2">
                <Button>💾 Save</Button>
                <Button>🗑️ Reset</Button>
                <Button>⚙️ Presets</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Accessibility features and WCAG 2.1 AA compliance across all platforms.",
      },
    },
  },
};

export const PerformanceCrossPlatform: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-fg mb-6">Performance Across Platforms</h2>
        <p className="text-fg-muted mb-8">
          Performance targets and optimizations for each platform environment.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Web Performance */}
          <div className="space-y-4">
            <PlatformIndicator platform="Web Performance" description="60fps + &lt;50KB Bundle" />
            <div className="space-y-4 p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-semibold text-fg">Web Performance Targets</h3>
              <ul className="text-sm text-fg-muted space-y-1">
                <li>• 60fps animations</li>
                <li>• &lt;50KB design system bundle</li>
                <li>• &lt;100ms component render time</li>
                <li>• CSS custom properties</li>
                <li>• Tree-shaking optimization</li>
              </ul>
              <div className="text-xs text-fg-subtle bg-bg-muted p-2 rounded">
                Bundle Size: 42KB | Render Time: 85ms | FPS: 60
              </div>
            </div>
          </div>

          {/* Mobile Performance */}
          <div className="space-y-4">
            <PlatformIndicator platform="Mobile Performance" description="60fps + &lt;100MB Memory" />
            <div className="space-y-4 p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-semibold text-fg">Mobile Performance Targets</h3>
              <ul className="text-sm text-fg-muted space-y-1">
                <li>• 60fps animations</li>
                <li>• &lt;100MB memory usage</li>
                <li>• Battery optimization</li>
                <li>• Native performance</li>
                <li>• React Native optimization</li>
              </ul>
              <div className="text-xs text-fg-subtle bg-bg-muted p-2 rounded">
                Memory: 78MB | Battery: Optimized | FPS: 60
              </div>
            </div>
          </div>

          {/* Desktop Performance */}
          <div className="space-y-4">
            <PlatformIndicator platform="Desktop Performance" description="60fps + Low CPU" />
            <div className="space-y-4 p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-semibold text-fg">Desktop Performance Targets</h3>
              <ul className="text-sm text-fg-muted space-y-1">
                <li>• 60fps animations</li>
                <li>• Low CPU usage</li>
                <li>• Efficient memory usage</li>
                <li>• Native performance</li>
                <li>• JUCE optimization</li>
              </ul>
              <div className="text-xs text-fg-subtle bg-bg-muted p-2 rounded">
                CPU: 2.3% | Memory: 45MB | FPS: 60
              </div>
            </div>
          </div>

          {/* DAW Performance */}
          <div className="space-y-4">
            <PlatformIndicator platform="DAW Performance" description="Real-time + Low Latency" />
            <div className="space-y-4 p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-semibold text-fg">DAW Performance Targets</h3>
              <ul className="text-sm text-fg-muted space-y-1">
                <li>• Real-time processing</li>
                <li>• Low latency (&lt;5ms)</li>
                <li>• Minimal CPU usage</li>
                <li>• Efficient memory</li>
                <li>• VST/AU compliance</li>
              </ul>
              <div className="text-xs text-fg-subtle bg-bg-muted p-2 rounded">
                Latency: 3.2ms | CPU: 0.8% | Memory: 12MB
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Performance targets and optimizations for each platform environment.",
      },
    },
  },
};

export const DesignTokensCrossPlatform: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-fg mb-6">Design Tokens Across Platforms</h2>
        <p className="text-fg-muted mb-8">
          How design tokens are implemented and consumed across different platforms.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Web Tokens */}
          <div className="space-y-4">
            <PlatformIndicator platform="Web Tokens" description="CSS Custom Properties" />
            <div className="space-y-4 p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-semibold text-fg">Web Token Implementation</h3>
              <div className="space-y-2 text-sm">
                <div className="font-mono text-xs bg-bg-muted p-2 rounded">
                  --color-brand-primary: #6AE6A6
                </div>
                <div className="font-mono text-xs bg-bg-muted p-2 rounded">
                  --space-4: 16px
                </div>
                <div className="font-mono text-xs bg-bg-muted p-2 rounded">
                  --radius-md: 12px
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Tokens */}
          <div className="space-y-4">
            <PlatformIndicator platform="Mobile Tokens" description="NativeWind + React Native" />
            <div className="space-y-4 p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-semibold text-fg">Mobile Token Implementation</h3>
              <div className="space-y-2 text-sm">
                <div className="font-mono text-xs bg-bg-muted p-2 rounded">
                  bg-brand-primary
                </div>
                <div className="font-mono text-xs bg-bg-muted p-2 rounded">
                  p-4
                </div>
                <div className="font-mono text-xs bg-bg-muted p-2 rounded">
                  rounded-md
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Tokens */}
          <div className="space-y-4">
            <PlatformIndicator platform="Desktop Tokens" description="JUCE Colour System" />
            <div className="space-y-4 p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-semibold text-fg">Desktop Token Implementation</h3>
              <div className="space-y-2 text-sm">
                <div className="font-mono text-xs bg-bg-muted p-2 rounded">
                  Colour(0xFF6AE6A6)
                </div>
                <div className="font-mono text-xs bg-bg-muted p-2 rounded">
                  Rectangle(16, 16)
                </div>
                <div className="font-mono text-xs bg-bg-muted p-2 rounded">
                  BorderRadius(12.0f)
                </div>
              </div>
            </div>
          </div>

          {/* DAW Tokens */}
          <div className="space-y-4">
            <PlatformIndicator platform="DAW Tokens" description="VST/AU Plugin Format" />
            <div className="space-y-4 p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-semibold text-fg">DAW Token Implementation</h3>
              <div className="space-y-2 text-sm">
                <div className="font-mono text-xs bg-bg-muted p-2 rounded">
                  ARGB: 0xFF6AE6A6
                </div>
                <div className="font-mono text-xs bg-bg-muted p-2 rounded">
                  Size: 16x16
                </div>
                <div className="font-mono text-xs bg-bg-muted p-2 rounded">
                  Radius: 12px
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Design token implementation across different platforms and frameworks.",
      },
    },
  },
};

export const AllPlatformsOverview: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-fg mb-2">GotMusic Cross-Platform Design System</h1>
        <p className="text-lg text-fg-muted mb-8">
          A premier design system that works seamlessly across web, mobile, desktop, and DAW platforms.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Web Platform */}
          <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-brand-primary" />
              <h3 className="text-lg font-semibold text-fg">Web</h3>
            </div>
            <p className="text-sm text-fg-muted mb-4">
              Next.js + TailwindCSS with CSS custom properties and responsive design.
            </p>
            <ul className="text-xs text-fg-subtle space-y-1">
              <li>• CSS Custom Properties</li>
              <li>• TailwindCSS Classes</li>
              <li>• Responsive Design</li>
              <li>• WCAG 2.1 AA</li>
              <li>• 60fps Performance</li>
            </ul>
          </div>

          {/* Mobile Platform */}
          <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-brand-accent" />
              <h3 className="text-lg font-semibold text-fg">Mobile</h3>
            </div>
            <p className="text-sm text-fg-muted mb-4">
              React Native + NativeWind with touch optimization and native performance.
            </p>
            <ul className="text-xs text-fg-subtle space-y-1">
              <li>• NativeWind Styling</li>
              <li>• Touch Optimization</li>
              <li>• Haptic Feedback</li>
              <li>• VoiceOver/TalkBack</li>
              <li>• 60fps Animations</li>
            </ul>
          </div>

          {/* Desktop Platform */}
          <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-semantic-success" />
              <h3 className="text-lg font-semibold text-fg">Desktop</h3>
            </div>
            <p className="text-sm text-fg-muted mb-4">
              JUCE C++ Framework with native OS styling and high-DPI support.
            </p>
            <ul className="text-xs text-fg-subtle space-y-1">
              <li>• JUCE Colour System</li>
              <li>• Native OS Styling</li>
              <li>• High-DPI Support</li>
              <li>• Keyboard Navigation</li>
              <li>• Low CPU Usage</li>
            </ul>
          </div>

          {/* DAW Platform */}
          <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-semantic-warning" />
              <h3 className="text-lg font-semibold text-fg">DAW</h3>
            </div>
            <p className="text-sm text-fg-muted mb-4">
              VST/AU Plugin format with real-time performance and compact design.
            </p>
            <ul className="text-xs text-fg-subtle space-y-1">
              <li>• VST/AU Compliance</li>
              <li>• Real-time Performance</li>
              <li>• Compact Sizing</li>
              <li>• Low Latency</li>
              <li>• Plugin APIs</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 p-6 rounded-lg border border-brand-primary bg-brand-primary/10">
          <h3 className="text-lg font-semibold text-fg mb-2">🎯 Design System Goals</h3>
          <ul className="text-sm text-fg-muted space-y-1">
            <li>• <strong>Consistency:</strong> Visual and behavioral consistency across all platforms</li>
            <li>• <strong>Accessibility:</strong> WCAG 2.1 AA compliance with platform-specific optimizations</li>
            <li>• <strong>Performance:</strong> 60fps animations and optimized bundle sizes</li>
            <li>• <strong>Developer Experience:</strong> Easy-to-use components with comprehensive documentation</li>
            <li>• <strong>User Experience:</strong> Intuitive interactions that feel native to each platform</li>
          </ul>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Complete overview of the GotMusic cross-platform design system across all target platforms.",
      },
    },
  },
};
