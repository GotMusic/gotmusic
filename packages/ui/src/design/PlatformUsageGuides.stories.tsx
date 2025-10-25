import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta: Meta = {
  title: "Design System/Platform Usage Guides",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Platform-specific usage guides for implementing the GotMusic design system across web, mobile, desktop, and DAW platforms.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WebPlatformGuide: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-fg mb-2">Web Platform Usage Guide</h1>
        <p className="text-lg text-fg-muted mb-8">
          Complete guide for implementing the GotMusic design system in web applications using
          Next.js and TailwindCSS.
        </p>

        <div className="space-y-6">
          <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
            <h2 className="text-xl font-semibold text-fg mb-4">Installation & Setup</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-fg mb-2">1. Install Dependencies</h3>
                <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                  <div className="text-fg">npm install @gotmusic/ui @gotmusic/tokens</div>
                  <div className="text-fg">npm install tailwindcss @tailwindcss/typography</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-fg mb-2">2. Configure TailwindCSS</h3>
                <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                  <div className="text-fg">{/* tailwind.config.js */}</div>
                  <div className="text-fg">module.exports = {"{"}</div>
                  <div className="text-fg ml-4">
                    content: ['./src{/**/}*.{"js,ts,jsx,tsx"}'],
                  </div>
                  <div className="text-fg ml-4">theme: {"{"}</div>
                  <div className="text-fg ml-8">extend: {"{"}</div>
                  <div className="text-fg ml-12">colors: require('@gotmusic/tokens/colors'),</div>
                  <div className="text-fg ml-12">spacing: require('@gotmusic/tokens/spacing'),</div>
                  <div className="text-fg ml-12">
                    fontSize: require('@gotmusic/tokens/typography')
                  </div>
                  <div className="text-fg ml-8">{"}"}</div>
                  <div className="text-fg ml-4">{"}"}</div>
                  <div className="text-fg">{"}"}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
            <h2 className="text-xl font-semibold text-fg mb-4">Component Usage</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-fg mb-2">Basic Component Import</h3>
                <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                  <div className="text-fg">
                    import {"{"} Button, Card, Input {"}"} from '@gotmusic/ui'
                  </div>
                  <div className="text-fg">import '@gotmusic/tokens/dist/web.css'</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-fg mb-2">Web-Specific Features</h3>
                <ul className="text-sm text-fg-muted space-y-1">
                  <li>• CSS Custom Properties for theming</li>
                  <li>• TailwindCSS utility classes</li>
                  <li>• Responsive design breakpoints</li>
                  <li>• HTML5 semantic elements</li>
                  <li>• ARIA accessibility attributes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const MobilePlatformGuide: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-fg mb-2">Mobile Platform Usage Guide</h1>
        <p className="text-lg text-fg-muted mb-8">
          Complete guide for implementing the GotMusic design system in mobile applications using
          React Native and NativeWind.
        </p>

        <div className="space-y-6">
          <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
            <h2 className="text-xl font-semibold text-fg mb-4">Installation & Setup</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-fg mb-2">1. Install Dependencies</h3>
                <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                  <div className="text-fg">npm install @gotmusic/ui @gotmusic/tokens</div>
                  <div className="text-fg">npm install nativewind react-native-reanimated</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-fg mb-2">2. Configure NativeWind</h3>
                <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                  <div className="text-fg">{/* tailwind.config.js */}</div>
                  <div className="text-fg">module.exports = {"{"}</div>
                  <div className="text-fg ml-4">
                    content: ['./app{/**/}*.{"js,ts,jsx,tsx"}'],
                  </div>
                  <div className="text-fg ml-4">presets: [require('nativewind/preset')],</div>
                  <div className="text-fg ml-4">theme: {"{"}</div>
                  <div className="text-fg ml-8">extend: {"{"}</div>
                  <div className="text-fg ml-12">colors: require('@gotmusic/tokens/colors')</div>
                  <div className="text-fg ml-8">{"}"}</div>
                  <div className="text-fg ml-4">{"}"}</div>
                  <div className="text-fg">{"}"}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
            <h2 className="text-xl font-semibold text-fg mb-4">Component Usage</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-fg mb-2">Mobile Component Import</h3>
                <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                  <div className="text-fg">
                    import {"{"} Button, Card, Input {"}"} from '@gotmusic/ui'
                  </div>
                  <div className="text-fg">import '@gotmusic/tokens/dist/mobile.css'</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-fg mb-2">Mobile-Specific Features</h3>
                <ul className="text-sm text-fg-muted space-y-1">
                  <li>• Touch target optimization (44px minimum)</li>
                  <li>• Native press animations</li>
                  <li>• Haptic feedback support</li>
                  <li>• VoiceOver/TalkBack accessibility</li>
                  <li>• Dynamic Type scaling</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const DesktopPlatformGuide: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-fg mb-2">Desktop Platform Usage Guide</h1>
        <p className="text-lg text-fg-muted mb-8">
          Complete guide for implementing the GotMusic design system in desktop applications using
          JUCE C++ Framework.
        </p>

        <div className="space-y-6">
          <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
            <h2 className="text-xl font-semibold text-fg mb-4">Installation & Setup</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-fg mb-2">1. JUCE Project Setup</h3>
                <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                  <div className="text-fg">{/* Create new JUCE project */}</div>
                  <div className="text-fg">juce::createProjectFromPIP</div>
                  <div className="text-fg">{/* Add GotMusic design tokens */}</div>
                  <div className="text-fg">#include "GotMusicDesignTokens.h"</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-fg mb-2">2. Design Token Integration</h3>
                <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                  <div className="text-fg">{/* GotMusicDesignTokens.h */}</div>
                  <div className="text-fg">namespace GotMusic {"{"}</div>
                  <div className="text-fg ml-4">namespace Colors {"{"}</div>
                  <div className="text-fg ml-8">constexpr auto Primary = Colour(0xFF6AE6A6)</div>
                  <div className="text-fg ml-8">constexpr auto Accent = Colour(0xFF5BD0FF)</div>
                  <div className="text-fg ml-4">{"}"}</div>
                  <div className="text-fg">{"}"}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
            <h2 className="text-xl font-semibold text-fg mb-4">Component Usage</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-fg mb-2">
                  Desktop Component Implementation
                </h3>
                <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                  <div className="text-fg">class GotMusicButton : public TextButton</div>
                  <div className="text-fg">{"{"}</div>
                  <div className="text-fg ml-4">public:</div>
                  <div className="text-fg ml-8">GotMusicButton()</div>
                  <div className="text-fg ml-8">{"{"}</div>
                  <div className="text-fg ml-12">
                    setColour(buttonColourId, GotMusic::Colors::Primary)
                  </div>
                  <div className="text-fg ml-12">
                    setColour(textColourId, GotMusic::Colors::Text)
                  </div>
                  <div className="text-fg ml-8">{"}"}</div>
                  <div className="text-fg">{"}"}</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-fg mb-2">Desktop-Specific Features</h3>
                <ul className="text-sm text-fg-muted space-y-1">
                  <li>• Native OS styling and themes</li>
                  <li>• High-DPI display support</li>
                  <li>• Keyboard shortcuts (Ctrl/Cmd + key)</li>
                  <li>• Focus management and tab order</li>
                  <li>• JUCE Colour system integration</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const DAWPlatformGuide: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-fg mb-2">DAW Platform Usage Guide</h1>
        <p className="text-lg text-fg-muted mb-8">
          Complete guide for implementing the GotMusic design system in DAW plugins using VST/AU
          formats.
        </p>

        <div className="space-y-6">
          <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
            <h2 className="text-xl font-semibold text-fg mb-4">Installation & Setup</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-fg mb-2">1. VST/AU Plugin Setup</h3>
                <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                  <div className="text-fg">{/* Create VST/AU plugin project */}</div>
                  <div className="text-fg">juce::createPluginFromPIP</div>
                  <div className="text-fg">{/* Add GotMusic design tokens */}</div>
                  <div className="text-fg">#include "GotMusicDAWTokens.h"</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-fg mb-2">2. DAW-Specific Design Tokens</h3>
                <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                  <div className="text-fg">{/* GotMusicDAWTokens.h */}</div>
                  <div className="text-fg">namespace GotMusic {"{"}</div>
                  <div className="text-fg ml-4">namespace DAW {"{"}</div>
                  <div className="text-fg ml-8">constexpr auto Primary = 0xFF6AE6A6</div>
                  <div className="text-fg ml-8">constexpr auto WindowMinWidth = 400</div>
                  <div className="text-fg ml-8">constexpr auto WindowMinHeight = 300</div>
                  <div className="text-fg ml-4">{"}"}</div>
                  <div className="text-fg">{"}"}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
            <h2 className="text-xl font-semibold text-fg mb-4">Component Usage</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-fg mb-2">DAW Component Implementation</h3>
                <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                  <div className="text-fg">class GotMusicDAWButton : public TextButton</div>
                  <div className="text-fg">{"{"}</div>
                  <div className="text-fg ml-4">public:</div>
                  <div className="text-fg ml-8">GotMusicDAWButton()</div>
                  <div className="text-fg ml-8">{"{"}</div>
                  <div className="text-fg ml-12">
                    setColour(buttonColourId, GotMusic::DAW::Primary)
                  </div>
                  <div className="text-fg ml-12">setSize(60, 20)</div>
                  <div className="text-fg ml-12">setButtonText("DAW Button")</div>
                  <div className="text-fg ml-8">{"}"}</div>
                  <div className="text-fg">{"}"}</div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-fg mb-2">DAW-Specific Features</h3>
                <ul className="text-sm text-fg-muted space-y-1">
                  <li>• VST/AU Plugin compliance</li>
                  <li>• Real-time performance optimization</li>
                  <li>• Compact sizing for plugin windows</li>
                  <li>• Parameter automation support</li>
                  <li>• Low latency requirements</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
