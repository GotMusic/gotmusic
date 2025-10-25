import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Button } from "../core/Button";
import { Card } from "../core/Card";
import { Checkbox } from "../core/Checkbox";
import { Input } from "../core/Input";

const meta: Meta = {
  title: "Design System/Platform-Specific Components",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Platform-specific component variants optimized for web, mobile, desktop, and DAW environments with unique behaviors and styling.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Web-specific Button with hover effects and keyboard navigation
export const WebButton: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-fg mb-4">Web Button Component</h2>
        <p className="text-fg-muted mb-6">
          Optimized for web browsers with hover effects, focus states, and keyboard navigation.
        </p>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-border-subtle bg-bg-elevated">
            <h3 className="text-lg font-medium text-fg mb-3">Web-Specific Features</h3>
            <ul className="text-sm text-fg-muted space-y-1 mb-4">
              <li>• Hover states with smooth transitions</li>
              <li>• Focus rings for keyboard navigation</li>
              <li>• CSS custom properties for theming</li>
              <li>• ARIA attributes for accessibility</li>
              <li>• Touch-friendly sizing (44px minimum)</li>
            </ul>

            <div className="flex flex-wrap gap-3">
              <Button variant="primary" className="web-button">
                Primary Web Button
              </Button>
              <Button variant="secondary" className="web-button">
                Secondary Web Button
              </Button>
              <Button variant="outline" className="web-button">
                Outline Web Button
              </Button>
              <Button variant="ghost" className="web-button">
                Ghost Web Button
              </Button>
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
          "Web-optimized button component with hover effects, focus states, and keyboard navigation.",
      },
    },
  },
};

// Mobile-specific Button with touch optimization
export const MobileButton: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-fg mb-4">Mobile Button Component</h2>
        <p className="text-fg-muted mb-6">
          Optimized for mobile devices with touch targets, haptic feedback, and native animations.
        </p>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-border-subtle bg-bg-elevated">
            <h3 className="text-lg font-medium text-fg mb-3">Mobile-Specific Features</h3>
            <ul className="text-sm text-fg-muted space-y-1 mb-4">
              <li>• Touch targets (44px minimum)</li>
              <li>• Native press animations</li>
              <li>• Haptic feedback support</li>
              <li>• NativeWind styling</li>
              <li>• Accessibility labels for screen readers</li>
            </ul>

            <div className="flex flex-wrap gap-3">
              <Button variant="primary" className="mobile-button touch-target">
                Primary Mobile Button
              </Button>
              <Button variant="secondary" className="mobile-button touch-target">
                Secondary Mobile Button
              </Button>
              <Button variant="outline" className="mobile-button touch-target">
                Outline Mobile Button
              </Button>
              <Button variant="ghost" className="mobile-button touch-target">
                Ghost Mobile Button
              </Button>
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
          "Mobile-optimized button component with touch targets, haptic feedback, and native animations.",
      },
    },
  },
};

// Desktop-specific Button with keyboard shortcuts
export const DesktopButton: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-fg mb-4">Desktop Button Component</h2>
        <p className="text-fg-muted mb-6">
          Optimized for desktop applications with keyboard shortcuts, native OS styling, and
          high-DPI support.
        </p>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-border-subtle bg-bg-elevated">
            <h3 className="text-lg font-medium text-fg mb-3">Desktop-Specific Features</h3>
            <ul className="text-sm text-fg-muted space-y-1 mb-4">
              <li>• Keyboard shortcuts (Ctrl/Cmd + key)</li>
              <li>• Native OS styling and themes</li>
              <li>• High-DPI display support</li>
              <li>• JUCE Colour system integration</li>
              <li>• Focus management for accessibility</li>
            </ul>

            <div className="flex flex-wrap gap-3">
              <Button variant="primary" className="desktop-button keyboard-focused">
                Primary Desktop Button
              </Button>
              <Button variant="secondary" className="desktop-button keyboard-focused">
                Secondary Desktop Button
              </Button>
              <Button variant="outline" className="desktop-button keyboard-focused">
                Outline Desktop Button
              </Button>
              <Button variant="ghost" className="desktop-button keyboard-focused">
                Ghost Desktop Button
              </Button>
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
          "Desktop-optimized button component with keyboard shortcuts, native OS styling, and high-DPI support.",
      },
    },
  },
};

// DAW-specific Button with compact sizing
export const DAWButton: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-fg mb-4">DAW Button Component</h2>
        <p className="text-fg-muted mb-6">
          Optimized for DAW plugins with compact sizing, real-time performance, and VST/AU
          compliance.
        </p>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-border-subtle bg-bg-elevated">
            <h3 className="text-lg font-medium text-fg mb-3">DAW-Specific Features</h3>
            <ul className="text-sm text-fg-muted space-y-1 mb-4">
              <li>• Compact sizing for plugin windows</li>
              <li>• Real-time performance optimization</li>
              <li>• VST/AU plugin compliance</li>
              <li>• Parameter automation support</li>
              <li>• Plugin-specific styling</li>
            </ul>

            <div className="flex flex-wrap gap-2">
              <Button variant="primary" size="sm" className="daw-button compact">
                Primary DAW Button
              </Button>
              <Button variant="secondary" size="sm" className="daw-button compact">
                Secondary DAW Button
              </Button>
              <Button variant="outline" size="sm" className="daw-button compact">
                Outline DAW Button
              </Button>
              <Button variant="ghost" size="sm" className="daw-button compact">
                Ghost DAW Button
              </Button>
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
          "DAW-optimized button component with compact sizing, real-time performance, and VST/AU compliance.",
      },
    },
  },
};

// Web-specific Input with HTML5 validation
export const WebInput: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-fg mb-4">Web Input Component</h2>
        <p className="text-fg-muted mb-6">
          Optimized for web browsers with HTML5 validation, auto-complete, and keyboard navigation.
        </p>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-border-subtle bg-bg-elevated">
            <h3 className="text-lg font-medium text-fg mb-3">Web-Specific Features</h3>
            <ul className="text-sm text-fg-muted space-y-1 mb-4">
              <li>• HTML5 validation and constraints</li>
              <li>• Auto-complete and suggestions</li>
              <li>• Keyboard navigation (Tab, Enter)</li>
              <li>• Screen reader compatibility</li>
              <li>• Focus management</li>
            </ul>

            <div className="space-y-3">
              <Input placeholder="Enter your email" type="email" className="web-input" />
              <Input placeholder="Enter your password" type="password" className="web-input" />
              <Input placeholder="Search..." type="search" className="web-input" />
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
          "Web-optimized input component with HTML5 validation, auto-complete, and keyboard navigation.",
      },
    },
  },
};

// Mobile-specific Input with touch optimization
export const MobileInput: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-fg mb-4">Mobile Input Component</h2>
        <p className="text-fg-muted mb-6">
          Optimized for mobile devices with touch-friendly inputs, native keyboards, and haptic
          feedback.
        </p>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-border-subtle bg-bg-elevated">
            <h3 className="text-lg font-medium text-fg mb-3">Mobile-Specific Features</h3>
            <ul className="text-sm text-fg-muted space-y-1 mb-4">
              <li>• Touch-optimized input sizing</li>
              <li>• Native keyboard types (email, numeric, etc.)</li>
              <li>• Haptic feedback on interaction</li>
              <li>• Native validation and error states</li>
              <li>• VoiceOver/TalkBack support</li>
            </ul>

            <div className="space-y-3">
              <Input
                placeholder="Enter your email"
                type="email"
                className="mobile-input touch-target"
              />
              <Input
                placeholder="Enter your password"
                type="password"
                className="mobile-input touch-target"
              />
              <Input placeholder="Search..." type="search" className="mobile-input touch-target" />
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
          "Mobile-optimized input component with touch optimization, native keyboards, and haptic feedback.",
      },
    },
  },
};

// Desktop-specific Input with keyboard shortcuts
export const DesktopInput: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-fg mb-4">Desktop Input Component</h2>
        <p className="text-fg-muted mb-6">
          Optimized for desktop applications with keyboard shortcuts, native OS styling, and
          high-DPI support.
        </p>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-border-subtle bg-bg-elevated">
            <h3 className="text-lg font-medium text-fg mb-3">Desktop-Specific Features</h3>
            <ul className="text-sm text-fg-muted space-y-1 mb-4">
              <li>• Keyboard shortcuts (Ctrl+A, Ctrl+C, etc.)</li>
              <li>• Native OS styling and themes</li>
              <li>• High-DPI display support</li>
              <li>• JUCE TextEditor integration</li>
              <li>• Focus management and tab order</li>
            </ul>

            <div className="space-y-3">
              <Input
                placeholder="Enter your email"
                type="email"
                className="desktop-input keyboard-focused"
              />
              <Input
                placeholder="Enter your password"
                type="password"
                className="desktop-input keyboard-focused"
              />
              <Input
                placeholder="Search..."
                type="search"
                className="desktop-input keyboard-focused"
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
          "Desktop-optimized input component with keyboard shortcuts, native OS styling, and high-DPI support.",
      },
    },
  },
};

// DAW-specific Input with parameter automation
export const DAWInput: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-fg mb-4">DAW Input Component</h2>
        <p className="text-fg-muted mb-6">
          Optimized for DAW plugins with parameter automation, real-time updates, and VST/AU
          compliance.
        </p>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-border-subtle bg-bg-elevated">
            <h3 className="text-lg font-medium text-fg mb-3">DAW-Specific Features</h3>
            <ul className="text-sm text-fg-muted space-y-1 mb-4">
              <li>• Parameter automation support</li>
              <li>• Real-time value updates</li>
              <li>• VST/AU plugin compliance</li>
              <li>• Compact sizing for plugin windows</li>
              <li>• Plugin-specific validation</li>
            </ul>

            <div className="space-y-3">
              <Input placeholder="Parameter value" type="number" className="daw-input compact" />
              <Input placeholder="Effect name" type="text" className="daw-input compact" />
              <Input placeholder="Search presets..." type="search" className="daw-input compact" />
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
          "DAW-optimized input component with parameter automation, real-time updates, and VST/AU compliance.",
      },
    },
  },
};

// Web-specific Card with responsive design
export const WebCard: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-fg mb-4">Web Card Component</h2>
        <p className="text-fg-muted mb-6">
          Optimized for web browsers with responsive design, hover effects, and semantic HTML
          structure.
        </p>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-border-subtle bg-bg-elevated">
            <h3 className="text-lg font-medium text-fg mb-3">Web-Specific Features</h3>
            <ul className="text-sm text-fg-muted space-y-1 mb-4">
              <li>• Responsive grid layouts</li>
              <li>• Hover effects and transitions</li>
              <li>• Semantic HTML structure</li>
              <li>• CSS Grid and Flexbox</li>
              <li>• Accessibility attributes</li>
            </ul>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="p-4 web-card">
                <h4 className="font-semibold text-fg mb-2">Web Card 1</h4>
                <p className="text-sm text-fg-muted mb-3">
                  Responsive card with hover effects and semantic HTML structure.
                </p>
                <Button size="sm">Action</Button>
              </Card>
              <Card className="p-4 web-card">
                <h4 className="font-semibold text-fg mb-2">Web Card 2</h4>
                <p className="text-sm text-fg-muted mb-3">
                  Optimized for web browsers with CSS custom properties.
                </p>
                <Button size="sm" variant="outline">
                  Action
                </Button>
              </Card>
              <Card className="p-4 web-card">
                <h4 className="font-semibold text-fg mb-2">Web Card 3</h4>
                <p className="text-sm text-fg-muted mb-3">
                  Accessible card with proper ARIA attributes and focus management.
                </p>
                <Button size="sm" variant="ghost">
                  Action
                </Button>
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
        story:
          "Web-optimized card component with responsive design, hover effects, and semantic HTML structure.",
      },
    },
  },
};

// Mobile-specific Card with touch optimization
export const MobileCard: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-fg mb-4">Mobile Card Component</h2>
        <p className="text-fg-muted mb-6">
          Optimized for mobile devices with touch-friendly layouts, native animations, and haptic
          feedback.
        </p>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-border-subtle bg-bg-elevated">
            <h3 className="text-lg font-medium text-fg mb-3">Mobile-Specific Features</h3>
            <ul className="text-sm text-fg-muted space-y-1 mb-4">
              <li>• Touch-friendly layouts</li>
              <li>• Native press animations</li>
              <li>• Haptic feedback on interaction</li>
              <li>• NativeWind styling</li>
              <li>• VoiceOver/TalkBack support</li>
            </ul>

            <div className="space-y-3">
              <Card className="p-4 mobile-card touch-target">
                <h4 className="font-semibold text-fg mb-2">Mobile Card 1</h4>
                <p className="text-sm text-fg-muted mb-3">
                  Touch-optimized card with native press animations and haptic feedback.
                </p>
                <Button size="sm" className="mobile-button">
                  Action
                </Button>
              </Card>
              <Card className="p-4 mobile-card touch-target">
                <h4 className="font-semibold text-fg mb-2">Mobile Card 2</h4>
                <p className="text-sm text-fg-muted mb-3">
                  NativeWind styled card with touch-friendly interactions.
                </p>
                <Button size="sm" variant="outline" className="mobile-button">
                  Action
                </Button>
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
        story:
          "Mobile-optimized card component with touch-friendly layouts, native animations, and haptic feedback.",
      },
    },
  },
};

// Desktop-specific Card with native OS styling
export const DesktopCard: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-fg mb-4">Desktop Card Component</h2>
        <p className="text-fg-muted mb-6">
          Optimized for desktop applications with native OS styling, keyboard navigation, and
          high-DPI support.
        </p>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-border-subtle bg-bg-elevated">
            <h3 className="text-lg font-medium text-fg mb-3">Desktop-Specific Features</h3>
            <ul className="text-sm text-fg-muted space-y-1 mb-4">
              <li>• Native OS styling and themes</li>
              <li>• Keyboard navigation support</li>
              <li>• High-DPI display support</li>
              <li>• JUCE Component integration</li>
              <li>• Focus management</li>
            </ul>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 desktop-card keyboard-focused">
                <h4 className="font-semibold text-fg mb-2">Desktop Card 1</h4>
                <p className="text-sm text-fg-muted mb-3">
                  Native OS styled card with keyboard navigation and high-DPI support.
                </p>
                <Button size="sm" className="desktop-button">
                  Action
                </Button>
              </Card>
              <Card className="p-4 desktop-card keyboard-focused">
                <h4 className="font-semibold text-fg mb-2">Desktop Card 2</h4>
                <p className="text-sm text-fg-muted mb-3">
                  JUCE integrated card with native OS theming and focus management.
                </p>
                <Button size="sm" variant="outline" className="desktop-button">
                  Action
                </Button>
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
        story:
          "Desktop-optimized card component with native OS styling, keyboard navigation, and high-DPI support.",
      },
    },
  },
};

// DAW-specific Card with compact design
export const DAWCard: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-fg mb-4">DAW Card Component</h2>
        <p className="text-fg-muted mb-6">
          Optimized for DAW plugins with compact design, real-time updates, and VST/AU compliance.
        </p>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-border-subtle bg-bg-elevated">
            <h3 className="text-lg font-medium text-fg mb-3">DAW-Specific Features</h3>
            <ul className="text-sm text-fg-muted space-y-1 mb-4">
              <li>• Compact sizing for plugin windows</li>
              <li>• Real-time parameter updates</li>
              <li>• VST/AU plugin compliance</li>
              <li>• Plugin-specific styling</li>
              <li>• Parameter automation support</li>
            </ul>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Card className="p-3 daw-card compact">
                <h4 className="text-sm font-semibold text-fg mb-2">DAW Card 1</h4>
                <p className="text-xs text-fg-muted mb-2">
                  Compact card optimized for plugin interfaces with real-time updates.
                </p>
                <Button size="sm" className="daw-button">
                  Action
                </Button>
              </Card>
              <Card className="p-3 daw-card compact">
                <h4 className="text-sm font-semibold text-fg mb-2">DAW Card 2</h4>
                <p className="text-xs text-fg-muted mb-2">
                  VST/AU compliant card with parameter automation support.
                </p>
                <Button size="sm" variant="outline" className="daw-button">
                  Action
                </Button>
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
        story:
          "DAW-optimized card component with compact design, real-time updates, and VST/AU compliance.",
      },
    },
  },
};
