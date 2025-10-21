import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';

// Mock performance data - in real implementation, this would come from API or file system
const mockPerformanceData = {
  timestamp: new Date().toISOString(),
  summary: {
    totalPackages: 7,
    packagesWithinBudget: 6,
    packagesOverBudget: 1,
    totalOptimizations: 12,
    performanceScore: 86
  },
  packages: {
    'packages/ui': {
      dependencies: 10,
      devDependencies: 21,
      totalDependencies: 31,
      budget: { bundleSize: '100KB', dependencies: 20 },
      withinBudget: { dependencies: false, devDependencies: false },
      potentialOptimizations: [
        { from: 'lodash', to: 'ramda', reason: 'Replace lodash with ramda for better performance', impact: 'high' },
        { from: 'moment', to: 'date-fns', reason: 'Replace moment with date-fns for smaller bundle', impact: 'medium' }
      ]
    },
    'packages/api': {
      dependencies: 4,
      devDependencies: 5,
      totalDependencies: 9,
      budget: { bundleSize: '50KB', dependencies: 15 },
      withinBudget: { dependencies: true, devDependencies: true },
      potentialOptimizations: []
    },
    'packages/fixtures': {
      dependencies: 1,
      devDependencies: 2,
      totalDependencies: 3,
      budget: { bundleSize: '25KB', dependencies: 10 },
      withinBudget: { dependencies: true, devDependencies: true },
      potentialOptimizations: []
    },
    'packages/tokens': {
      dependencies: 0,
      devDependencies: 1,
      totalDependencies: 1,
      budget: { bundleSize: '50KB', dependencies: 10 },
      withinBudget: { dependencies: true, devDependencies: true },
      potentialOptimizations: []
    },
    'apps/web': {
      dependencies: 17,
      devDependencies: 18,
      totalDependencies: 35,
      budget: { bundleSize: '500KB', dependencies: 30 },
      withinBudget: { dependencies: false, devDependencies: false },
      potentialOptimizations: [
        { from: 'axios', to: 'fetch', reason: 'Replace axios with native fetch for better performance', impact: 'high' }
      ]
    },
    'apps/mobile': {
      dependencies: 19,
      devDependencies: 2,
      totalDependencies: 21,
      budget: { bundleSize: '200KB', dependencies: 25 },
      withinBudget: { dependencies: true, devDependencies: true },
      potentialOptimizations: []
    },
    'apps/worker': {
      dependencies: 4,
      devDependencies: 1,
      totalDependencies: 5,
      budget: { bundleSize: '100KB', dependencies: 15 },
      withinBudget: { dependencies: true, devDependencies: true },
      potentialOptimizations: []
    }
  },
  performance: {
    'packages/ui': {
      dependencyScore: 45,
      optimizationOpportunities: 2,
      recommendations: [
        'Replace lodash with ramda for better performance',
        'Replace moment with date-fns for smaller bundle'
      ]
    },
    'apps/web': {
      dependencyScore: 70,
      optimizationOpportunities: 1,
      recommendations: [
        'Replace axios with native fetch for better performance'
      ]
    }
  }
};

// Dashboard components
const MetricCard = ({ title, value, status, budget, description }: {
  title: string;
  value: string | number;
  status: 'pass' | 'fail' | 'warning';
  budget?: string;
  description?: string;
}) => (
  <div className="bg-bg-elevated border border-border-subtle rounded-lg p-4">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-medium text-fg">{title}</h3>
      <div className={`w-3 h-3 rounded-full ${
        status === 'pass' ? 'bg-success' : 
        status === 'warning' ? 'bg-warning' : 'bg-danger'
      }`} />
    </div>
    <div className="text-2xl font-bold text-fg mb-1">{value}</div>
    {budget && <div className="text-xs text-fg-muted">Budget: {budget}</div>}
    {description && <div className="text-xs text-fg-subtle mt-1">{description}</div>}
  </div>
);

const PackageCard = ({ name, data }: { name: string; data: any }) => (
  <div className="bg-bg-elevated border border-border-subtle rounded-lg p-4">
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-sm font-medium text-fg">{name}</h3>
      <div className={`w-3 h-3 rounded-full ${
        data.withinBudget.dependencies && data.withinBudget.devDependencies ? 'bg-success' : 'bg-danger'
      }`} />
    </div>
    
    <div className="grid grid-cols-2 gap-3 mb-3">
      <div>
        <div className="text-xs text-fg-muted">Dependencies</div>
        <div className="text-lg font-semibold text-fg">{data.dependencies}</div>
        <div className="text-xs text-fg-subtle">Budget: {data.budget.dependencies}</div>
      </div>
      <div>
        <div className="text-xs text-fg-muted">Dev Dependencies</div>
        <div className="text-lg font-semibold text-fg">{data.devDependencies}</div>
        <div className="text-xs text-fg-subtle">Total: {data.totalDependencies}</div>
      </div>
    </div>
    
    {data.potentialOptimizations.length > 0 && (
      <div className="mt-3 pt-3 border-t border-border-subtle">
        <div className="text-xs text-fg-muted mb-2">Optimization Opportunities:</div>
        {data.potentialOptimizations.map((opt: any, index: number) => (
          <div key={index} className="text-xs text-fg-subtle mb-1">
            • {opt.reason}
          </div>
        ))}
      </div>
    )}
  </div>
);

const OptimizationCard = ({ optimization }: { optimization: any }) => (
  <div className="bg-bg-elevated border border-border-subtle rounded-lg p-4">
    <div className="flex items-center justify-between mb-2">
      <div className="text-sm font-medium text-fg">
        {optimization.from} → {optimization.to}
      </div>
      <div className={`px-2 py-1 rounded text-xs ${
        optimization.impact === 'high' ? 'bg-danger/20 text-danger' :
        optimization.impact === 'medium' ? 'bg-warning/20 text-warning' :
        'bg-info/20 text-info'
      }`}>
        {optimization.impact}
      </div>
    </div>
    <div className="text-xs text-fg-subtle">{optimization.reason}</div>
  </div>
);

const E18eDashboard = () => {
  const [data, setData] = useState(mockPerformanceData);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => ({
        ...prevData,
        timestamp: new Date().toISOString(),
        summary: {
          ...prevData.summary,
          performanceScore: Math.min(100, prevData.summary.performanceScore + Math.random() * 2 - 1)
        }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const allOptimizations = Object.values(data.packages)
    .flatMap((pkg: any) => pkg.potentialOptimizations);

  return (
    <div className="min-h-screen bg-bg-default p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-fg mb-2">⚡ e18e Performance Dashboard</h1>
          <p className="text-fg-muted">
            Real-time monitoring of ecosystem performance standards - Cleanup, Speedup, Levelup
          </p>
          <div className="text-xs text-fg-subtle mt-2">
            Last updated: {new Date(data.timestamp).toLocaleString()}
          </div>
        </div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard
            title="Performance Score"
            value={`${Math.round(data.summary.performanceScore)}%`}
            status={data.summary.performanceScore >= 90 ? 'pass' : data.summary.performanceScore >= 70 ? 'warning' : 'fail'}
            description="Overall e18e compliance score"
          />
          <MetricCard
            title="Total Packages"
            value={data.summary.totalPackages}
            status="pass"
            description="Packages analyzed"
          />
          <MetricCard
            title="Within Budget"
            value={`${data.summary.packagesWithinBudget}/${data.summary.totalPackages}`}
            status={data.summary.packagesWithinBudget === data.summary.totalPackages ? 'pass' : 'warning'}
            description="Packages meeting performance budgets"
          />
          <MetricCard
            title="Optimizations"
            value={data.summary.totalOptimizations}
            status={data.summary.totalOptimizations === 0 ? 'pass' : 'warning'}
            description="Available performance improvements"
          />
        </div>

        {/* Package Analysis */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-fg mb-4">Package Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(data.packages).map(([name, pkgData]: [string, any]) => (
              <PackageCard key={name} name={name} data={pkgData} />
            ))}
          </div>
        </div>

        {/* Optimization Opportunities */}
        {allOptimizations.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-fg mb-4">
              Optimization Opportunities ({allOptimizations.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allOptimizations.map((opt: any, index: number) => (
                <OptimizationCard key={index} optimization={opt} />
              ))}
            </div>
          </div>
        )}

        {/* Performance Trends */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-fg mb-4">Performance Trends</h2>
          <div className="bg-bg-elevated border border-border-subtle rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-sm text-fg-muted mb-2">Dependency Health</div>
                <div className="space-y-2">
                  {Object.entries(data.packages).map(([name, pkg]: [string, any]) => (
                    <div key={name} className="flex items-center justify-between">
                      <span className="text-xs text-fg-subtle">{name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-bg-muted rounded-full h-2">
                          <div 
                            className="bg-brand-primary h-2 rounded-full" 
                            style={{ width: `${Math.min(100, (pkg.totalDependencies / pkg.budget.dependencies) * 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-fg-muted">{pkg.totalDependencies}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-fg-muted mb-2">Optimization Impact</div>
                <div className="space-y-2">
                  {['high', 'medium', 'low'].map(impact => {
                    const count = allOptimizations.filter((opt: any) => opt.impact === impact).length;
                    return (
                      <div key={impact} className="flex items-center justify-between">
                        <span className="text-xs text-fg-subtle capitalize">{impact}</span>
                        <span className="text-xs text-fg-muted">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-fg-muted mb-2">e18e Standards</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-fg-subtle">Cleanup</span>
                    <div className="w-3 h-3 bg-success rounded-full" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-fg-subtle">Speedup</span>
                    <div className="w-3 h-3 bg-warning rounded-full" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-fg-subtle">Levelup</span>
                    <div className="w-3 h-3 bg-info rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-bg-elevated border border-border-subtle rounded-lg p-6">
          <h2 className="text-xl font-semibold text-fg mb-4">Recommended Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border border-border-subtle rounded-lg">
              <h3 className="text-sm font-medium text-fg mb-2">🧹 Cleanup</h3>
              <p className="text-xs text-fg-subtle mb-3">Remove unused dependencies and optimize imports</p>
              <button className="text-xs bg-brand-primary text-fg-inverse px-3 py-1 rounded hover:bg-brand-primary/90">
                Run Cleanup
              </button>
            </div>
            
            <div className="p-4 border border-border-subtle rounded-lg">
              <h3 className="text-sm font-medium text-fg mb-2">⚡ Speedup</h3>
              <p className="text-xs text-fg-subtle mb-3">Optimize bundle size and build performance</p>
              <button className="text-xs bg-brand-accent text-fg-inverse px-3 py-1 rounded hover:bg-brand-accent/90">
                Run Speedup
              </button>
            </div>
            
            <div className="p-4 border border-border-subtle rounded-lg">
              <h3 className="text-sm font-medium text-fg mb-2">🚀 Levelup</h3>
              <p className="text-xs text-fg-subtle mb-3">Upgrade to modern alternatives and best practices</p>
              <button className="text-xs bg-info text-fg-inverse px-3 py-1 rounded hover:bg-info/90">
                Run Levelup
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-fg-subtle">
          <p>Following e18e.dev ecosystem performance standards</p>
          <p>Cleanup • Speedup • Levelup</p>
        </div>
      </div>
    </div>
  );
};

const meta: Meta = {
  title: 'Performance/e18e Dashboard',
  component: E18eDashboard,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Real-time e18e performance monitoring dashboard showing ecosystem performance standards compliance, optimization opportunities, and recommended actions.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <E18eDashboard />,
  parameters: {
    docs: {
      description: {
        story: 'The default e18e performance dashboard with real-time monitoring of all packages and optimization opportunities.',
      },
    },
  },
};

export const HighPerformance: Story = {
  render: () => {
    const highPerfData = {
      ...mockPerformanceData,
      summary: {
        ...mockPerformanceData.summary,
        performanceScore: 95,
        packagesWithinBudget: 7,
        packagesOverBudget: 0,
        totalOptimizations: 0
      }
    };
    
    return <E18eDashboard />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Dashboard showing high performance scenario with all packages within budget and no optimization opportunities.',
      },
    },
  },
};

export const NeedsOptimization: Story = {
  render: () => {
    const needsOptData = {
      ...mockPerformanceData,
      summary: {
        ...mockPerformanceData.summary,
        performanceScore: 45,
        packagesWithinBudget: 2,
        packagesOverBudget: 5,
        totalOptimizations: 25
      }
    };
    
    return <E18eDashboard />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Dashboard showing scenario requiring significant optimization with many packages over budget.',
      },
    },
  },
};

export const RealTimeUpdates: Story = {
  render: () => <E18eDashboard />,
  parameters: {
    docs: {
      description: {
        story: 'Dashboard with simulated real-time updates showing live performance monitoring capabilities.',
      },
    },
  },
};
