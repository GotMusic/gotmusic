import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta: Meta = {
  title: "Design System/API Documentation",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Comprehensive API documentation for the GotMusic design system, including component props, design tokens, and platform-specific usage.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Component API Documentation
export const ComponentAPI: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-fg mb-2">GotMusic Design System API</h1>
        <p className="text-lg text-fg-muted mb-8">
          Complete API documentation for all components, design tokens, and platform-specific
          implementations.
        </p>

        {/* Button Component API */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-fg mb-4">Button Component</h2>

          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-medium text-fg mb-3">Props Interface</h3>
              <div className="space-y-3">
                <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                  <div className="text-fg-muted">interface ButtonProps</div>
                  <div className="text-fg-muted">{"{"}</div>
                  <div className="ml-4 text-fg">
                    <div>variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline'</div>
                    <div>size?: 'sm' | 'md' | 'lg' | 'icon'</div>
                    <div>loading?: boolean</div>
                    <div>disabled?: boolean</div>
                    <div>leftIcon?: React.ReactNode</div>
                    <div>rightIcon?: React.ReactNode</div>
                    <div>children?: React.ReactNode</div>
                    <div>className?: string</div>
                    <div>onClick?: (event: React.MouseEvent) =&gt; void</div>
                  </div>
                  <div className="text-fg-muted">{"}"}</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-medium text-fg mb-3">Usage Examples</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-fg mb-2">Basic Usage</h4>
                  <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                    <div className="text-fg-muted">
                      import {"{"} Button {"}"} from '@gotmusic/ui'
                    </div>
                    <div className="text-fg-muted"> </div>
                    <div className="text-fg">&lt;Button variant="primary" size="md"&gt;</div>
                    <div className="text-fg ml-4">Click me</div>
                    <div className="text-fg">&lt;/Button&gt;</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-fg mb-2">With Icons</h4>
                  <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                    <div className="text-fg">&lt;Button</div>
                    <div className="text-fg ml-4">variant="primary"</div>
                    <div className="text-fg ml-4">
                      leftIcon={"{"} <span>💾</span> {"}"}
                    </div>
                    <div className="text-fg ml-4">
                      rightIcon={"{"} <span>→</span> {"}"}
                    </div>
                    <div className="text-fg ml-4">
                      loading={"{"}isLoading{"}"}
                    </div>
                    <div className="text-fg">&gt;</div>
                    <div className="text-fg ml-4">Save and Continue</div>
                    <div className="text-fg">&lt;/Button&gt;</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-medium text-fg mb-3">Platform-Specific Usage</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-fg mb-2">Web (Next.js)</h4>
                  <div className="font-mono text-xs bg-bg-muted p-2 rounded">
                    <div className="text-fg">&lt;Button</div>
                    <div className="text-fg ml-4">variant="primary"</div>
                    <div className="text-fg ml-4">className="web-button"</div>
                    <div className="text-fg ml-4">
                      onClick={"{"}handleClick{"}"}
                    </div>
                    <div className="text-fg">&gt;</div>
                    <div className="text-fg ml-4">Web Button</div>
                    <div className="text-fg">&lt;/Button&gt;</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-fg mb-2">Mobile (React Native)</h4>
                  <div className="font-mono text-xs bg-bg-muted p-2 rounded">
                    <div className="text-fg">&lt;Button</div>
                    <div className="text-fg ml-4">variant="primary"</div>
                    <div className="text-fg ml-4">className="mobile-button"</div>
                    <div className="text-fg ml-4">
                      onPress={"{"}handlePress{"}"}
                    </div>
                    <div className="text-fg">&gt;</div>
                    <div className="text-fg ml-4">Mobile Button</div>
                    <div className="text-fg">&lt;/Button&gt;</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-fg mb-2">Desktop (JUCE C++)</h4>
                  <div className="font-mono text-xs bg-bg-muted p-2 rounded">
                    <div className="text-fg">
                      auto button = std::make_unique&lt;TextButton&gt;()
                    </div>
                    <div className="text-fg">button-&gt;setButtonText("Desktop Button")</div>
                    <div className="text-fg">button-&gt;setColour(TextButton::buttonColourId,</div>
                    <div className="text-fg ml-4">Colour(0xFF6AE6A6))</div>
                    <div className="text-fg">
                      button-&gt;onClick = []() {"{"} /* handle click */ {"}"}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-fg mb-2">DAW (VST/AU)</h4>
                  <div className="font-mono text-xs bg-bg-muted p-2 rounded">
                    <div className="text-fg">
                      auto button = std::make_unique&lt;TextButton&gt;()
                    </div>
                    <div className="text-fg">button-&gt;setButtonText("DAW Button")</div>
                    <div className="text-fg">button-&gt;setSize(80, 24)</div>
                    <div className="text-fg">
                      button-&gt;onClick = []() {"{"} /* handle click */ {"}"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Component API */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-fg mb-4">Input Component</h2>

          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-medium text-fg mb-3">Props Interface</h3>
              <div className="space-y-3">
                <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                  <div className="text-fg-muted">interface InputProps</div>
                  <div className="text-fg-muted">{"{"}</div>
                  <div className="ml-4 text-fg">
                    <div>type?: 'text' | 'email' | 'password' | 'search' | 'number'</div>
                    <div>placeholder?: string</div>
                    <div>value?: string</div>
                    <div>onChange?: (event: React.ChangeEvent) =&gt; void</div>
                    <div>onBlur?: (event: React.FocusEvent) =&gt; void</div>
                    <div>onFocus?: (event: React.FocusEvent) =&gt; void</div>
                    <div>disabled?: boolean</div>
                    <div>required?: boolean</div>
                    <div>className?: string</div>
                  </div>
                  <div className="text-fg-muted">{"}"}</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-medium text-fg mb-3">Usage Examples</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-fg mb-2">Basic Usage</h4>
                  <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                    <div className="text-fg-muted">
                      import {"{"} Input {"}"} from '@gotmusic/ui'
                    </div>
                    <div className="text-fg-muted"> </div>
                    <div className="text-fg">&lt;Input</div>
                    <div className="text-fg ml-4">type="email"</div>
                    <div className="text-fg ml-4">placeholder="Enter your email"</div>
                    <div className="text-fg ml-4">
                      onChange={"{"}handleChange{"}"}
                    </div>
                    <div className="text-fg">&gt;</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-fg mb-2">Controlled Input</h4>
                  <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                    <div className="text-fg">const [value, setValue] = useState('')</div>
                    <div className="text-fg-muted"> </div>
                    <div className="text-fg">&lt;Input</div>
                    <div className="text-fg ml-4">type="text"</div>
                    <div className="text-fg ml-4">
                      value={"{"}value{"}"}
                    </div>
                    <div className="text-fg ml-4">
                      onChange={"{"}e =&gt; setValue(e.target.value){"}"}
                    </div>
                    <div className="text-fg">&gt;</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Component API */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-fg mb-4">Card Component</h2>

          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-medium text-fg mb-3">Props Interface</h3>
              <div className="space-y-3">
                <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                  <div className="text-fg-muted">interface CardProps</div>
                  <div className="text-fg-muted">{"{"}</div>
                  <div className="ml-4 text-fg">
                    <div>children?: React.ReactNode</div>
                    <div>className?: string</div>
                    <div>onClick?: (event: React.MouseEvent) =&gt; void</div>
                    <div>variant?: 'default' | 'elevated' | 'outlined'</div>
                    <div>padding?: 'sm' | 'md' | 'lg'</div>
                  </div>
                  <div className="text-fg-muted">{"}"}</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-medium text-fg mb-3">Usage Examples</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-fg mb-2">Basic Usage</h4>
                  <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                    <div className="text-fg-muted">
                      import {"{"} Card {"}"} from '@gotmusic/ui'
                    </div>
                    <div className="text-fg-muted"> </div>
                    <div className="text-fg">&lt;Card className="p-6"&gt;</div>
                    <div className="text-fg ml-4">&lt;h3&gt;Card Title&lt;/h3&gt;</div>
                    <div className="text-fg ml-4">&lt;p&gt;Card content&lt;/p&gt;</div>
                    <div className="text-fg">&lt;/Card&gt;</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-fg mb-2">Interactive Card</h4>
                  <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                    <div className="text-fg">&lt;Card</div>
                    <div className="text-fg ml-4">variant="elevated"</div>
                    <div className="text-fg ml-4">padding="lg"</div>
                    <div className="text-fg ml-4">
                      onClick={"{"}handleClick{"}"}
                    </div>
                    <div className="text-fg">&gt;</div>
                    <div className="text-fg ml-4">&lt;h3&gt;Interactive Card&lt;/h3&gt;</div>
                    <div className="text-fg ml-4">&lt;p&gt;Click me!&lt;/p&gt;</div>
                    <div className="text-fg">&lt;/Card&gt;</div>
                  </div>
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
        story:
          "Complete API documentation for all design system components with props, usage examples, and platform-specific implementations.",
      },
    },
  },
};

// Design Tokens API Documentation
export const DesignTokensAPI: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-fg mb-2">Design Tokens API</h1>
        <p className="text-lg text-fg-muted mb-8">
          Complete documentation for all design tokens, including CSS custom properties,
          platform-specific implementations, and usage guidelines.
        </p>

        {/* Color Tokens */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-fg mb-4">Color Tokens</h2>

          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-medium text-fg mb-3">CSS Custom Properties</h3>
              <div className="space-y-3">
                <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                  <div className="text-fg-muted">/* Brand Colors */</div>
                  <div className="text-fg">--color-brand-primary: #6AE6A6</div>
                  <div className="text-fg">--color-brand-accent: #5BD0FF</div>
                  <div className="text-fg">--color-brand-ring: #6AE6A6</div>
                  <div className="text-fg-muted"> </div>
                  <div className="text-fg-muted">/* Semantic Colors */</div>
                  <div className="text-fg">--color-semantic-success: #10B981</div>
                  <div className="text-fg">--color-semantic-warning: #F59E0B</div>
                  <div className="text-fg">--color-semantic-danger: #EF4444</div>
                  <div className="text-fg">--color-semantic-info: #3B82F6</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-medium text-fg mb-3">Platform-Specific Usage</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-fg mb-2">Web (CSS)</h4>
                  <div className="font-mono text-xs bg-bg-muted p-2 rounded">
                    <div className="text-fg">.button {"{"}</div>
                    <div className="text-fg ml-4">background-color: var(--color-brand-primary)</div>
                    <div className="text-fg ml-4">color: var(--color-fg-inverse)</div>
                    <div className="text-fg ml-4">border-radius: var(--radius-md)</div>
                    <div className="text-fg">{"}"}</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-fg mb-2">Mobile (NativeWind)</h4>
                  <div className="font-mono text-xs bg-bg-muted p-2 rounded">
                    <div className="text-fg">
                      &lt;Button className="bg-brand-primary text-fg-inverse rounded-md"&gt;
                    </div>
                    <div className="text-fg ml-4">Mobile Button</div>
                    <div className="text-fg">&lt;/Button&gt;</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-fg mb-2">Desktop (JUCE C++)</h4>
                  <div className="font-mono text-xs bg-bg-muted p-2 rounded">
                    <div className="text-fg">button-&gt;setColour(TextButton::buttonColourId,</div>
                    <div className="text-fg ml-4">Colour(0xFF6AE6A6))</div>
                    <div className="text-fg">button-&gt;setColour(TextButton::textColourId,</div>
                    <div className="text-fg ml-4">Colour(0xFFFFFFFF))</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-fg mb-2">DAW (VST/AU)</h4>
                  <div className="font-mono text-xs bg-bg-muted p-2 rounded">
                    <div className="text-fg">// VST/AU Plugin Colors</div>
                    <div className="text-fg">constexpr uint32_t PRIMARY_COLOR = 0xFF6AE6A6</div>
                    <div className="text-fg">constexpr uint32_t TEXT_COLOR = 0xFFFFFFFF</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spacing Tokens */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-fg mb-4">Spacing Tokens</h2>

          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-medium text-fg mb-3">Spacing Scale</h3>
              <div className="space-y-3">
                <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                  <div className="text-fg-muted">/* Spacing Scale (4px grid) */</div>
                  <div className="text-fg">--space-0: 0px</div>
                  <div className="text-fg">--space-1: 4px</div>
                  <div className="text-fg">--space-2: 8px</div>
                  <div className="text-fg">--space-3: 12px</div>
                  <div className="text-fg">--space-4: 16px</div>
                  <div className="text-fg">--space-5: 20px</div>
                  <div className="text-fg">--space-6: 24px</div>
                  <div className="text-fg">--space-8: 32px</div>
                  <div className="text-fg">--space-10: 40px</div>
                  <div className="text-fg">--space-12: 48px</div>
                  <div className="text-fg">--space-16: 64px</div>
                  <div className="text-fg">--space-24: 96px</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-medium text-fg mb-3">Usage Examples</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-fg mb-2">Web (CSS)</h4>
                  <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                    <div className="text-fg">.card {"{"}</div>
                    <div className="text-fg ml-4">padding: var(--space-6)</div>
                    <div className="text-fg ml-4">margin-bottom: var(--space-4)</div>
                    <div className="text-fg ml-4">gap: var(--space-3)</div>
                    <div className="text-fg">{"}"}</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-fg mb-2">Mobile (NativeWind)</h4>
                  <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                    <div className="text-fg">&lt;View className="p-6 mb-4 gap-3"&gt;</div>
                    <div className="text-fg ml-4">&lt;Text&gt;Mobile Card&lt;/Text&gt;</div>
                    <div className="text-fg">&lt;/View&gt;</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Typography Tokens */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-fg mb-4">Typography Tokens</h2>

          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-medium text-fg mb-3">Typography Scale</h3>
              <div className="space-y-3">
                <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                  <div className="text-fg-muted">/* Typography Scale */</div>
                  <div className="text-fg">--text-display-lg: 3rem / 1.2 / 700</div>
                  <div className="text-fg">--text-display-md: 2.25rem / 1.2 / 600</div>
                  <div className="text-fg">--text-display-sm: 1.875rem / 1.2 / 600</div>
                  <div className="text-fg">--text-xl: 1.25rem / 1.5 / 500</div>
                  <div className="text-fg">--text-lg: 1.125rem / 1.5 / 500</div>
                  <div className="text-fg">--text-md: 1rem / 1.5 / 400</div>
                  <div className="text-fg">--text-sm: 0.875rem / 1.5 / 400</div>
                  <div className="text-fg">--text-xs: 0.75rem / 1.5 / 400</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-medium text-fg mb-3">Usage Examples</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-fg mb-2">Web (CSS)</h4>
                  <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                    <div className="text-fg">.heading {"{"}</div>
                    <div className="text-fg ml-4">font-size: var(--text-display-lg)</div>
                    <div className="text-fg ml-4">font-weight: 700</div>
                    <div className="text-fg ml-4">line-height: 1.2</div>
                    <div className="text-fg">{"}"}</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-fg mb-2">Mobile (NativeWind)</h4>
                  <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                    <div className="text-fg">
                      &lt;Text className="text-display-lg font-bold"&gt;
                    </div>
                    <div className="text-fg ml-4">Mobile Heading</div>
                    <div className="text-fg">&lt;/Text&gt;</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Border Radius Tokens */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-fg mb-4">Border Radius Tokens</h2>

          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-medium text-fg mb-3">Radius Scale</h3>
              <div className="space-y-3">
                <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                  <div className="text-fg-muted">/* Border Radius Scale */</div>
                  <div className="text-fg">--radius-xs: 6px</div>
                  <div className="text-fg">--radius-sm: 8px</div>
                  <div className="text-fg">--radius-md: 12px</div>
                  <div className="text-fg">--radius-lg: 16px</div>
                  <div className="text-fg">--radius-xl: 20px</div>
                  <div className="text-fg">--radius-full: 999px</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-medium text-fg mb-3">Usage Examples</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-fg mb-2">Web (CSS)</h4>
                  <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                    <div className="text-fg">.button {"{"}</div>
                    <div className="text-fg ml-4">border-radius: var(--radius-md)</div>
                    <div className="text-fg">{"}"}</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-fg mb-2">Mobile (NativeWind)</h4>
                  <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                    <div className="text-fg">&lt;Button className="rounded-md"&gt;</div>
                    <div className="text-fg ml-4">Mobile Button</div>
                    <div className="text-fg">&lt;/Button&gt;</div>
                  </div>
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
        story:
          "Complete documentation for all design tokens including CSS custom properties, platform-specific implementations, and usage guidelines.",
      },
    },
  },
};

// Platform-Specific API Documentation
export const PlatformSpecificAPI: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-fg mb-2">Platform-Specific API</h1>
        <p className="text-lg text-fg-muted mb-8">
          Platform-specific implementations and optimizations for web, mobile, desktop, and DAW
          environments.
        </p>

        {/* Web Platform API */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-fg mb-4">Web Platform API</h2>

          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-medium text-fg mb-3">Web-Specific Features</h3>
              <ul className="text-sm text-fg-muted space-y-1 mb-4">
                <li>• CSS Custom Properties for theming</li>
                <li>• TailwindCSS utility classes</li>
                <li>• Responsive design breakpoints</li>
                <li>• HTML5 semantic elements</li>
                <li>• ARIA accessibility attributes</li>
                <li>• Keyboard navigation support</li>
                <li>• Focus management</li>
                <li>• Screen reader compatibility</li>
              </ul>
            </div>

            <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-medium text-fg mb-3">Web Implementation</h3>
              <div className="space-y-3">
                <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                  <div className="text-fg-muted">// Web-specific button implementation</div>
                  <div className="text-fg">
                    const WebButton = ({" children, ...props "}) =&gt; {"{"}
                  </div>
                  <div className="text-fg ml-4">return (</div>
                  <div className="text-fg ml-8">&lt;button</div>
                  <div className="text-fg ml-12">className="web-button"</div>
                  <div className="text-fg ml-12">
                    onClick={"{"}props.onClick{"}"}
                  </div>
                  <div className="text-fg ml-12">
                    onMouseEnter={"{"}props.onMouseEnter{"}"}
                  </div>
                  <div className="text-fg ml-12">
                    onFocus={"{"}props.onFocus{"}"}
                  </div>
                  <div className="text-fg ml-12">
                    aria-label={"{"}props.ariaLabel{"}"}
                  </div>
                  <div className="text-fg ml-8">&gt;</div>
                  <div className="text-fg ml-12">
                    {"{"}children{"}"}
                  </div>
                  <div className="text-fg ml-8">&lt;/button&gt;</div>
                  <div className="text-fg ml-4">)</div>
                  <div className="text-fg">{"}"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Platform API */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-fg mb-4">Mobile Platform API</h2>

          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-medium text-fg mb-3">Mobile-Specific Features</h3>
              <ul className="text-sm text-fg-muted space-y-1 mb-4">
                <li>• NativeWind styling system</li>
                <li>• Touch target optimization (44px minimum)</li>
                <li>• Native press animations</li>
                <li>• Haptic feedback support</li>
                <li>• VoiceOver/TalkBack accessibility</li>
                <li>• Dynamic Type scaling</li>
                <li>• Native keyboard types</li>
                <li>• React Native performance optimization</li>
              </ul>
            </div>

            <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-medium text-fg mb-3">Mobile Implementation</h3>
              <div className="space-y-3">
                <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                  <div className="text-fg-muted">// Mobile-specific button implementation</div>
                  <div className="text-fg">
                    const MobileButton = ({" children, ...props "}) =&gt; {"{"}
                  </div>
                  <div className="text-fg ml-4">return (</div>
                  <div className="text-fg ml-8">&lt;TouchableOpacity</div>
                  <div className="text-fg ml-12">className="mobile-button touch-target"</div>
                  <div className="text-fg ml-12">
                    onPress={"{"}props.onPress{"}"}
                  </div>
                  <div className="text-fg ml-12">
                    onPressIn={"{"}props.onPressIn{"}"}
                  </div>
                  <div className="text-fg ml-12">
                    onPressOut={"{"}props.onPressOut{"}"}
                  </div>
                  <div className="text-fg ml-12">
                    accessibilityLabel={"{"}props.accessibilityLabel{"}"}
                  </div>
                  <div className="text-fg ml-12">accessibilityRole="button"</div>
                  <div className="text-fg ml-8">&gt;</div>
                  <div className="text-fg ml-12">
                    {"{"}children{"}"}
                  </div>
                  <div className="text-fg ml-8">&lt;/TouchableOpacity&gt;</div>
                  <div className="text-fg ml-4">)</div>
                  <div className="text-fg">{"}"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Platform API */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-fg mb-4">Desktop Platform API</h2>

          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-medium text-fg mb-3">Desktop-Specific Features</h3>
              <ul className="text-sm text-fg-muted space-y-1 mb-4">
                <li>• JUCE C++ Framework integration</li>
                <li>• Native OS styling and themes</li>
                <li>• High-DPI display support</li>
                <li>• Keyboard shortcuts (Ctrl/Cmd + key)</li>
                <li>• Focus management and tab order</li>
                <li>• Native accessibility APIs</li>
                <li>• JUCE Colour system</li>
                <li>• Real-time performance optimization</li>
              </ul>
            </div>

            <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-medium text-fg mb-3">Desktop Implementation</h3>
              <div className="space-y-3">
                <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                  <div className="text-fg-muted">// Desktop-specific button implementation</div>
                  <div className="text-fg">class DesktopButton : public TextButton</div>
                  <div className="text-fg">{"{"}</div>
                  <div className="text-fg ml-4">public:</div>
                  <div className="text-fg ml-8">DesktopButton()</div>
                  <div className="text-fg ml-8">{"{"}</div>
                  <div className="text-fg ml-12">
                    setColour(TextButton::buttonColourId, Colour(0xFF6AE6A6))
                  </div>
                  <div className="text-fg ml-12">
                    setColour(TextButton::textColourId, Colour(0xFFFFFFFF))
                  </div>
                  <div className="text-fg ml-12">setSize(80, 32)</div>
                  <div className="text-fg ml-8">{"}"}</div>
                  <div className="text-fg ml-8"> </div>
                  <div className="text-fg ml-8">void paint(Graphics& g) override</div>
                  <div className="text-fg ml-8">{"{"}</div>
                  <div className="text-fg ml-12">// Custom painting logic</div>
                  <div className="text-fg ml-8">{"}"}</div>
                  <div className="text-fg">{"}"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DAW Platform API */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-fg mb-4">DAW Platform API</h2>

          <div className="space-y-4">
            <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-medium text-fg mb-3">DAW-Specific Features</h3>
              <ul className="text-sm text-fg-muted space-y-1 mb-4">
                <li>• VST/AU Plugin compliance</li>
                <li>• Real-time performance optimization</li>
                <li>• Compact sizing for plugin windows</li>
                <li>• Parameter automation support</li>
                <li>• Plugin-specific styling</li>
                <li>• Low latency requirements</li>
                <li>• CPU efficiency</li>
                <li>• Memory optimization</li>
              </ul>
            </div>

            <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
              <h3 className="text-lg font-medium text-fg mb-3">DAW Implementation</h3>
              <div className="space-y-3">
                <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                  <div className="text-fg-muted">// DAW-specific button implementation</div>
                  <div className="text-fg">class DAWButton : public TextButton</div>
                  <div className="text-fg">{"{"}</div>
                  <div className="text-fg ml-4">public:</div>
                  <div className="text-fg ml-8">DAWButton()</div>
                  <div className="text-fg ml-8">{"{"}</div>
                  <div className="text-fg ml-12">
                    setColour(TextButton::buttonColourId, Colour(0xFF6AE6A6))
                  </div>
                  <div className="text-fg ml-12">
                    setColour(TextButton::textColourId, Colour(0xFFFFFFFF))
                  </div>
                  <div className="text-fg ml-12">setSize(60, 20)</div>
                  <div className="text-fg ml-12">setButtonText("DAW Button")</div>
                  <div className="text-fg ml-8">{"}"}</div>
                  <div className="text-fg ml-8"> </div>
                  <div className="text-fg ml-8">void paint(Graphics& g) override</div>
                  <div className="text-fg ml-8">{"{"}</div>
                  <div className="text-fg ml-12">// Compact, efficient painting</div>
                  <div className="text-fg ml-8">{"}"}</div>
                  <div className="text-fg">{"}"}</div>
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
        story:
          "Platform-specific API implementations and optimizations for web, mobile, desktop, and DAW environments.",
      },
    },
  },
};
