import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

const meta: Meta = {
  title: "Design System/Performance Optimization",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Performance optimization guidelines and best practices for the GotMusic design system across all platforms.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const PerformanceTargets: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-fg mb-2">Performance Targets</h1>
        <p className="text-lg text-fg-muted mb-8">
          Performance targets and optimization strategies for the GotMusic design system across all platforms.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Web Performance */}
          <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-brand-primary" />
              <h3 className="text-lg font-semibold text-fg">Web</h3>
            </div>
            <div className="space-y-3">
              <div className="text-sm">
                <div className="font-medium text-fg">Bundle Size</div>
                <div className="text-fg-muted">< 50KB design system</div>
              </div>
              <div className="text-sm">
                <div className="font-medium text-fg">Render Time</div>
                <div className="text-fg-muted">< 100ms components</div>
              </div>
              <div className="text-sm">
                <div className="font-medium text-fg">FPS</div>
                <div className="text-fg-muted">60fps animations</div>
              </div>
              <div className="text-sm">
                <div className="font-medium text-fg">Lighthouse</div>
                <div className="text-fg-muted">> 90 performance</div>
              </div>
            </div>
          </div>

          {/* Mobile Performance */}
          <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-brand-accent" />
              <h3 className="text-lg font-semibold text-fg">Mobile</h3>
            </div>
            <div className="space-y-3">
              <div className="text-sm">
                <div className="font-medium text-fg">Memory</div>
                <div className="text-fg-muted">< 100MB usage</div>
              </div>
              <div className="text-sm">
                <div className="font-medium text-fg">Battery</div>
                <div className="text-fg-muted">Optimized</div>
              </div>
              <div className="text-sm">
                <div className="font-medium text-fg">FPS</div>
                <div className="text-fg-muted">60fps animations</div>
              </div>
              <div className="text-sm">
                <div className="font-medium text-fg">Touch</div>
                <div className="text-fg-muted">< 16ms response</div>
              </div>
            </div>
          </div>

          {/* Desktop Performance */}
          <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-semantic-success" />
              <h3 className="text-lg font-semibold text-fg">Desktop</h3>
            </div>
            <div className="space-y-3">
              <div className="text-sm">
                <div className="font-medium text-fg">CPU</div>
                <div className="text-fg-muted">Low usage</div>
              </div>
              <div className="text-sm">
                <div className="font-medium text-fg">Memory</div>
                <div className="text-fg-muted">Efficient</div>
              </div>
              <div className="text-sm">
                <div className="font-medium text-fg">FPS</div>
                <div className="text-fg-muted">60fps animations</div>
              </div>
              <div className="text-sm">
                <div className="font-medium text-fg">DPI</div>
                <div className="text-fg-muted">High-DPI support</div>
              </div>
            </div>
          </div>

          {/* DAW Performance */}
          <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-semantic-warning" />
              <h3 className="text-lg font-semibold text-fg">DAW</h3>
            </div>
            <div className="space-y-3">
              <div className="text-sm">
                <div className="font-medium text-fg">Latency</div>
                <div className="text-fg-muted">< 5ms</div>
              </div>
              <div className="text-sm">
                <div className="font-medium text-fg">CPU</div>
                <div className="text-fg-muted">Real-time</div>
              </div>
              <div className="text-sm">
                <div className="font-medium text-fg">Memory</div>
                <div className="text-fg-muted">Minimal</div>
              </div>
              <div className="text-sm">
                <div className="font-medium text-fg">Threads</div>
                <div className="text-fg-muted">Audio thread safe</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const OptimizationStrategies: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-fg mb-2">Optimization Strategies</h1>
        <p className="text-lg text-fg-muted mb-8">
          Specific optimization strategies for each platform to achieve performance targets.
        </p>

        <div className="space-y-6">
          <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
            <h2 className="text-xl font-semibold text-fg mb-4">Web Optimizations</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-fg mb-2">Bundle Size Optimization</h3>
                <ul className="text-sm text-fg-muted space-y-1">
                  <li>• Tree-shaking unused components and tokens</li>
                  <li>• CSS custom properties instead of runtime values</li>
                  <li>• Minimal JavaScript runtime</li>
                  <li>• Optimized SVG icons and assets</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-fg mb-2">Render Performance</h3>
                <ul className="text-sm text-fg-muted space-y-1">
                  <li>• CSS-only animations where possible</li>
                  <li>• Hardware acceleration for transforms</li>
                  <li>• Efficient re-rendering strategies</li>
                  <li>• Lazy loading for non-critical components</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
            <h2 className="text-xl font-semibold text-fg mb-4">Mobile Optimizations</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-fg mb-2">Memory Management</h3>
                <ul className="text-sm text-fg-muted space-y-1">
                  <li>• Efficient image loading and caching</li>
                  <li>• Minimal component re-renders</li>
                  <li>• Optimized animation performance</li>
                  <li>• Native performance where possible</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-fg mb-2">Battery Optimization</h3>
                <ul className="text-sm text-fg-muted space-y-1">
                  <li>• Reduced animation complexity</li>
                  <li>• Efficient touch handling</li>
                  <li>• Background processing minimization</li>
                  <li>• NativeWind optimization</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
            <h2 className="text-xl font-semibold text-fg mb-4">Desktop Optimizations</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-fg mb-2">JUCE Performance</h3>
                <ul className="text-sm text-fg-muted space-y-1">
                  <li>• Efficient painting and repainting</li>
                  <li>• Optimized component hierarchy</li>
                  <li>• Native OS integration</li>
                  <li>• High-DPI rendering optimization</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-fg mb-2">Memory Efficiency</h3>
                <ul className="text-sm text-fg-muted space-y-1">
                  <li>• Smart pointer usage</li>
                  <li>• Efficient color and font management</li>
                  <li>• Minimal allocations in hot paths</li>
                  <li>• Resource pooling where appropriate</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
            <h2 className="text-xl font-semibold text-fg mb-4">DAW Optimizations</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-fg mb-2">Real-time Performance</h3>
                <ul className="text-sm text-fg-muted space-y-1">
                  <li>• Audio thread safety</li>
                  <li>• Lock-free data structures</li>
                  <li>• Minimal latency operations</li>
                  <li>• Efficient parameter updates</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-fg mb-2">Plugin Optimization</h3>
                <ul className="text-sm text-fg-muted space-y-1">
                  <li>• Compact UI components</li>
                  <li>• Efficient parameter automation</li>
                  <li>• VST/AU compliance</li>
                  <li>• Real-time parameter updates</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const PerformanceMonitoring: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-fg mb-2">Performance Monitoring</h1>
        <p className="text-lg text-fg-muted mb-8">
          Tools and techniques for monitoring and measuring performance across all platforms.
        </p>

        <div className="space-y-6">
          <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
            <h2 className="text-xl font-semibold text-fg mb-4">Web Performance Monitoring</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-fg mb-2">Tools & Metrics</h3>
                <ul className="text-sm text-fg-muted space-y-1">
                  <li>• Lighthouse for performance auditing</li>
                  <li>• Chrome DevTools for runtime analysis</li>
                  <li>• Bundle analyzer for size optimization</li>
                  <li>• Web Vitals for user experience metrics</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-fg mb-2">Key Metrics to Track</h3>
                <ul className="text-sm text-fg-muted space-y-1">
                  <li>• First Contentful Paint (FCP)</li>
                  <li>• Largest Contentful Paint (LCP)</li>
                  <li>• Cumulative Layout Shift (CLS)</li>
                  <li>• First Input Delay (FID)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
            <h2 className="text-xl font-semibold text-fg mb-4">Mobile Performance Monitoring</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-fg mb-2">Tools & Metrics</h3>
                <ul className="text-sm text-fg-muted space-y-1">
                  <li>• React Native Performance Monitor</li>
                  <li>• Flipper for debugging</li>
                  <li>• Memory profiler for optimization</li>
                  <li>• Battery usage monitoring</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-fg mb-2">Key Metrics to Track</h3>
                <ul className="text-sm text-fg-muted space-y-1">
                  <li>• Memory usage and leaks</li>
                  <li>• Animation frame rate</li>
                  <li>• Touch response time</li>
                  <li>• Battery consumption</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
            <h2 className="text-xl font-semibold text-fg mb-4">Desktop Performance Monitoring</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-fg mb-2">Tools & Metrics</h3>
                <ul className="text-sm text-fg-muted space-y-1">
                  <li>• JUCE Performance Profiler</li>
                  <li>• Native OS performance tools</li>
                  <li>• Memory usage monitoring</li>
                  <li>• CPU usage profiling</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-fg mb-2">Key Metrics to Track</h3>
                <ul className="text-sm text-fg-muted space-y-1">
                  <li>• CPU usage efficiency</li>
                  <li>• Memory allocation patterns</li>
                  <li>• Rendering performance</li>
                  <li>• High-DPI scaling performance</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg border border-border-subtle bg-bg-elevated">
            <h2 className="text-xl font-semibold text-fg mb-4">DAW Performance Monitoring</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-fg mb-2">Tools & Metrics</h3>
                <ul className="text-sm text-fg-muted space-y-1">
                  <li>• VST/AU plugin performance tools</li>
                  <li>• Real-time audio monitoring</li>
                  <li>• Latency measurement tools</li>
                  <li>• CPU usage in audio context</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-fg mb-2">Key Metrics to Track</h3>
                <ul className="text-sm text-fg-muted space-y-1">
                  <li>• Audio processing latency</li>
                  <li>• Real-time performance</li>
                  <li>• Memory efficiency</li>
                  <li>• Plugin stability</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
