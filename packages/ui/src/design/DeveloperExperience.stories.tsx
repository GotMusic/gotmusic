import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta: Meta = {
  title: "Design System/Developer Experience",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Developer experience guidelines and best practices for working with the GotMusic design system across all platforms.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const GettingStarted: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-fg mb-2">
          Getting Started with GotMusic Design System
        </h1>
        <p className="text-lg text-fg-muted mb-8">
          Quick start guide for developers to begin using the GotMusic design system across web,
          mobile, desktop, and DAW platforms.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
            <h2 className="text-xl font-semibold text-fg mb-4">🚀 Quick Start</h2>
            <div className="space-y-3">
              <div className="font-mono text-sm bg-bg-muted p-3 rounded">
                <div className="text-fg"># Install the design system</div>
                <div className="text-fg">npm install @gotmusic/ui @gotmusic/tokens</div>
                <div className="text-fg"> </div>
                <div className="text-fg"># Import components</div>
                <div className="text-fg">
                  import {"{"} Button, Card, Input {"}"} from '@gotmusic/ui'
                </div>
                <div className="text-fg">import '@gotmusic/tokens/dist/web.css'</div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
            <h2 className="text-xl font-semibold text-fg mb-4">📚 Documentation</h2>
            <ul className="text-sm text-fg-muted space-y-2">
              <li>
                •{" "}
                <a href="/docs" className="text-brand-primary hover:underline">
                  Component API Reference
                </a>
              </li>
              <li>
                •{" "}
                <a href="/docs/tokens" className="text-brand-primary hover:underline">
                  Design Token Guide
                </a>
              </li>
              <li>
                •{" "}
                <a href="/docs/platforms" className="text-brand-primary hover:underline">
                  Platform-Specific Usage
                </a>
              </li>
              <li>
                •{" "}
                <a href="/docs/accessibility" className="text-brand-primary hover:underline">
                  Accessibility Guidelines
                </a>
              </li>
              <li>
                •{" "}
                <a href="/docs/performance" className="text-brand-primary hover:underline">
                  Performance Best Practices
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const BestPractices: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-fg mb-2">Best Practices</h1>
        <p className="text-lg text-fg-muted mb-8">
          Essential best practices for working with the GotMusic design system to ensure
          consistency, accessibility, and performance.
        </p>

        <div className="space-y-6">
          <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
            <h2 className="text-xl font-semibold text-fg mb-4">🎨 Design System Usage</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-fg mb-2">✅ Do</h3>
                <ul className="text-sm text-fg-muted space-y-1">
                  <li>• Use design tokens for all colors, spacing, and typography</li>
                  <li>• Follow the component API and prop interfaces</li>
                  <li>• Implement platform-specific optimizations</li>
                  <li>• Test across all target platforms</li>
                  <li>• Follow accessibility guidelines</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-fg mb-2">❌ Don't</h3>
                <ul className="text-sm text-fg-muted space-y-1">
                  <li>• Hardcode colors or spacing values</li>
                  <li>• Override component styles without good reason</li>
                  <li>• Ignore platform-specific requirements</li>
                  <li>• Skip accessibility testing</li>
                  <li>• Use components outside their intended context</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
            <h2 className="text-xl font-semibold text-fg mb-4">♿ Accessibility Guidelines</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-fg mb-2">WCAG 2.1 AA Compliance</h3>
                <ul className="text-sm text-fg-muted space-y-1">
                  <li>• Ensure 4.5:1 color contrast ratio for normal text</li>
                  <li>• Provide keyboard navigation support</li>
                  <li>• Include proper ARIA labels and roles</li>
                  <li>• Support screen readers and assistive technologies</li>
                  <li>• Test with real users and accessibility tools</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
            <h2 className="text-xl font-semibold text-fg mb-4">⚡ Performance Guidelines</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-fg mb-2">Performance Targets</h3>
                <ul className="text-sm text-fg-muted space-y-1">
                  <li>• 60fps animations across all platforms</li>
                  <li>• Less than 50KB design system bundle size (web)</li>
                  <li>• Less than 100ms component render time</li>
                  <li>• Less than 100MB memory usage (mobile)</li>
                  <li>• Real-time performance (DAW)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Troubleshooting: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-fg mb-2">Troubleshooting Guide</h1>
        <p className="text-lg text-fg-muted mb-8">
          Common issues and solutions when working with the GotMusic design system across different
          platforms.
        </p>

        <div className="space-y-6">
          <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
            <h2 className="text-xl font-semibold text-fg mb-4">🐛 Common Issues</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-fg mb-2">Web Platform Issues</h3>
                <div className="space-y-2">
                  <div className="p-3 rounded border border-border-subtle bg-bg-muted">
                    <div className="font-medium text-fg">
                      Issue: CSS custom properties not loading
                    </div>
                    <div className="text-sm text-fg-muted mt-1">
                      Solution: Ensure you're importing the tokens CSS file
                    </div>
                    <div className="font-mono text-xs bg-bg-subtle p-2 rounded mt-2">
                      import '@gotmusic/tokens/dist/web.css'
                    </div>
                  </div>

                  <div className="p-3 rounded border border-border-subtle bg-bg-muted">
                    <div className="font-medium text-fg">
                      Issue: TailwindCSS classes not working
                    </div>
                    <div className="text-sm text-fg-muted mt-1">
                      Solution: Check your TailwindCSS configuration includes the design system
                    </div>
                    <div className="font-mono text-xs bg-bg-subtle p-2 rounded mt-2">
                      {/* tailwind.config.js */}
                      <br />
                      theme: {"{"} extend: {"{"} colors: require('@gotmusic/tokens/colors') {"}"}{" "}
                      {"}"}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-fg mb-2">Mobile Platform Issues</h3>
                <div className="space-y-2">
                  <div className="p-3 rounded border border-border-subtle bg-bg-muted">
                    <div className="font-medium text-fg">Issue: NativeWind styles not applying</div>
                    <div className="text-sm text-fg-muted mt-1">
                      Solution: Ensure NativeWind is properly configured in your babel.config.js
                    </div>
                    <div className="font-mono text-xs bg-bg-subtle p-2 rounded mt-2">
                      plugins: ['nativewind/babel']
                    </div>
                  </div>

                  <div className="p-3 rounded border border-border-subtle bg-bg-muted">
                    <div className="font-medium text-fg">Issue: Touch targets too small</div>
                    <div className="text-sm text-fg-muted mt-1">
                      Solution: Use the mobile-specific component variants with touch-target classes
                    </div>
                    <div className="font-mono text-xs bg-bg-subtle p-2 rounded mt-2">
                      &lt;Button className="mobile-button touch-target"&gt;Button&lt;/Button&gt;
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
            <h2 className="text-xl font-semibold text-fg mb-4">🔧 Debugging Tools</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-fg mb-2">Web Debugging</h3>
                <ul className="text-sm text-fg-muted space-y-1">
                  <li>• Use browser dev tools to inspect CSS custom properties</li>
                  <li>• Check TailwindCSS class generation</li>
                  <li>• Test accessibility with axe-core</li>
                  <li>• Monitor performance with Lighthouse</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-fg mb-2">Mobile Debugging</h3>
                <ul className="text-sm text-fg-muted space-y-1">
                  <li>• Use React Native Debugger</li>
                  <li>• Test with different screen sizes and orientations</li>
                  <li>• Verify touch target sizes (44px minimum)</li>
                  <li>• Test with VoiceOver/TalkBack</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Contributing: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-fg mb-2">Contributing to the Design System</h1>
        <p className="text-lg text-fg-muted mb-8">
          Guidelines for contributing to the GotMusic design system, including component
          development, documentation, and testing.
        </p>

        <div className="space-y-6">
          <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
            <h2 className="text-xl font-semibold text-fg mb-4">🤝 How to Contribute</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-fg mb-2">1. Component Development</h3>
                <ul className="text-sm text-fg-muted space-y-1">
                  <li>• Follow the existing component patterns and API design</li>
                  <li>• Implement platform-specific variants</li>
                  <li>• Include comprehensive TypeScript types</li>
                  <li>• Add Storybook stories for all variants</li>
                  <li>• Test across all target platforms</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-fg mb-2">2. Documentation</h3>
                <ul className="text-sm text-fg-muted space-y-1">
                  <li>• Update API documentation for new components</li>
                  <li>• Add usage examples for each platform</li>
                  <li>• Include accessibility guidelines</li>
                  <li>• Document performance considerations</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-fg mb-2">3. Testing</h3>
                <ul className="text-sm text-fg-muted space-y-1">
                  <li>• Write unit tests for component logic</li>
                  <li>• Test accessibility with automated tools</li>
                  <li>• Performance test on target platforms</li>
                  <li>• Visual regression testing</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
            <h2 className="text-xl font-semibold text-fg mb-4">📋 Contribution Checklist</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-fg mb-2">Before Submitting</h3>
                <ul className="text-sm text-fg-muted space-y-1">
                  <li>✅ Component follows design system patterns</li>
                  <li>✅ All platforms supported (web, mobile, desktop, DAW)</li>
                  <li>✅ Accessibility requirements met</li>
                  <li>✅ Performance targets achieved</li>
                  <li>✅ Documentation updated</li>
                  <li>✅ Tests written and passing</li>
                  <li>✅ Storybook stories added</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
