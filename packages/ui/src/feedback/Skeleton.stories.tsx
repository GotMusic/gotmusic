import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Skeleton } from './Skeleton';
import { storybookFixtures } from '@gotmusic/fixtures';

const meta: Meta<typeof Skeleton> = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Skeleton loading component for displaying placeholder content while data is loading. Supports multiple variants, sizes, and shapes with smooth animations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'subtle', 'strong'],
      description: 'Visual intensity of the skeleton',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Height of the skeleton',
    },
    shape: {
      control: 'select',
      options: ['rectangle', 'circle', 'text'],
      description: 'Shape of the skeleton',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  args: {
    className: 'w-32',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// PRIMARY STORIES (Required by STORYBOOK-GUIDE.md)
// ============================================================================

export const Primary: Story = {
  args: {
    className: 'w-32 h-6',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default skeleton with medium size and rectangle shape.',
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Default Variant</h3>
        <Skeleton className="w-32 h-6" variant="default" />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Subtle Variant</h3>
        <Skeleton className="w-32 h-6" variant="subtle" />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Strong Variant</h3>
        <Skeleton className="w-32 h-6" variant="strong" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different skeleton variants showing varying opacity levels.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Small</h3>
        <Skeleton className="w-32" size="sm" />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Medium</h3>
        <Skeleton className="w-32" size="md" />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Large</h3>
        <Skeleton className="w-32" size="lg" />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Extra Large</h3>
        <Skeleton className="w-32" size="xl" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different skeleton sizes from small to extra large.',
      },
    },
  },
};

export const Shapes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Rectangle</h3>
        <Skeleton className="w-32 h-6" shape="rectangle" />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Circle</h3>
        <Skeleton className="w-12 h-12" shape="circle" />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Text</h3>
        <Skeleton className="w-32 h-4" shape="text" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different skeleton shapes for various content types.',
      },
    },
  },
};

export const A11y: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Screen Reader Support</h3>
        <Skeleton 
          className="w-32 h-6" 
          aria-label="Loading content"
        />
        <p className="text-xs text-muted-foreground mt-2">
          Skeleton has proper aria-label for screen readers.
        </p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Reduced Motion</h3>
        <Skeleton 
          className="w-32 h-6" 
          style={{ animation: 'none' }}
        />
        <p className="text-xs text-muted-foreground mt-2">
          Animation respects user's reduced motion preferences.
        </p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Focus Management</h3>
        <Skeleton 
          className="w-32 h-6" 
          tabIndex={-1}
        />
        <p className="text-xs text-muted-foreground mt-2">
          Skeleton is not focusable to avoid keyboard navigation issues.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility features including screen reader support, reduced motion, and focus management.',
      },
    },
  },
};

export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Very Wide</h3>
        <Skeleton className="w-96 h-6" />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Very Narrow</h3>
        <Skeleton className="w-8 h-6" />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Custom Dimensions</h3>
        <Skeleton className="w-24 h-24" shape="circle" />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Multiple Lines</h3>
        <div className="space-y-2">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-3/4 h-4" />
          <Skeleton className="w-1/2 h-4" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Edge cases including various dimensions and multiple skeleton elements.',
      },
    },
  },
};

// ============================================================================
// LOADING STATE STORIES
// ============================================================================

export const LoadingStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Card Loading</h3>
        <div className="border rounded-lg p-4 space-y-3">
          <Skeleton className="w-16 h-16" shape="circle" />
          <Skeleton className="w-3/4 h-4" />
          <Skeleton className="w-1/2 h-4" />
          <Skeleton className="w-full h-8" />
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">List Loading</h3>
        <div className="space-y-2">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <Skeleton className="w-8 h-8" shape="circle" />
              <div className="space-y-1 flex-1">
                <Skeleton className="w-3/4 h-4" />
                <Skeleton className="w-1/2 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Table Loading</h3>
        <div className="space-y-2">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="flex space-x-4">
              <Skeleton className="w-12 h-4" />
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-16 h-4" />
              <Skeleton className="w-20 h-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common loading state patterns using skeleton components.',
      },
    },
  },
};

// ============================================================================
// INTERACTIVE STORIES
// ============================================================================

export const Interactive: Story = {
  render: () => {
    const [isLoading, setIsLoading] = React.useState(true);
    
    React.useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }, []);
    
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">
            {isLoading ? 'Loading...' : 'Content Loaded'}
          </h3>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-3/4 h-4" />
              <Skeleton className="w-1/2 h-4" />
            </div>
          ) : (
            <div className="space-y-2">
              <p>This is the actual content that was loading.</p>
              <p>It appears after the skeleton animation completes.</p>
            </div>
          )}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive skeleton that transitions to real content after 3 seconds.',
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
          Skeleton component is optimized for minimal bundle size with efficient animations.
        </p>
        <Skeleton className="w-32 h-6" />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Animation Performance</h3>
        <p className="text-xs text-muted-foreground mb-2">
          Uses CSS animations for smooth performance without JavaScript overhead.
        </p>
        <div className="space-y-2">
          {Array.from({ length: 5 }, (_, i) => (
            <Skeleton key={i} className="w-full h-4" />
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Memory Efficiency</h3>
        <p className="text-xs text-muted-foreground mb-2">
          No JavaScript timers or event listeners - pure CSS animations.
        </p>
        <Skeleton className="w-32 h-6" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Performance optimizations following e18e standards including bundle size and animation performance.',
      },
    },
  },
};