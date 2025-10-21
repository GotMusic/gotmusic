import type { Meta, StoryObj } from '@storybook/react';
import { Waveform } from './Waveform';
import { storybookFixtures } from '@gotmusic/fixtures';

const meta: Meta<typeof Waveform> = {
  title: 'Media/Waveform',
  component: Waveform,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Audio waveform visualization component for displaying audio data as interactive bars. Supports custom data, bin counts, and accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: 'object',
      description: 'Array of waveform data values (0-1)',
    },
    bins: {
      control: 'number',
      description: 'Number of waveform bars to display',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
  args: {
    bins: 64,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// PRIMARY STORIES (Required by STORYBOOK-GUIDE.md)
// ============================================================================

export const Primary: Story = {
  args: {
    data: storybookFixtures.waveforms.medium,
    bins: 64,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default waveform with medium-length data and 64 bins.',
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Short Waveform (32 bins)</h3>
        <Waveform data={storybookFixtures.waveforms.short} bins={32} />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Medium Waveform (64 bins)</h3>
        <Waveform data={storybookFixtures.waveforms.medium} bins={64} />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Long Waveform (128 bins)</h3>
        <Waveform data={storybookFixtures.waveforms.long} bins={128} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different waveform lengths showing short, medium, and long data.',
      },
    },
  },
};

export const WaveformTypes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Flat Waveform</h3>
        <Waveform data={storybookFixtures.waveforms.flat} bins={64} />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Peak Waveform</h3>
        <Waveform data={storybookFixtures.waveforms.peak} bins={64} />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Empty Waveform</h3>
        <Waveform data={storybookFixtures.waveforms.empty} bins={64} />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Random Waveform</h3>
        <Waveform data={storybookFixtures.waveforms.medium} bins={64} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different waveform types including flat, peak, empty, and random patterns.',
      },
    },
  },
};

export const A11y: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Screen Reader Support</h3>
        <Waveform 
          data={storybookFixtures.waveforms.medium} 
          bins={64}
          aria-label="Audio waveform for Night Drive 88 by KiloWav"
        />
        <p className="text-xs text-muted-foreground mt-2">
          Waveform has proper aria-label for screen readers describing the audio content.
        </p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Keyboard Navigation</h3>
        <Waveform 
          data={storybookFixtures.waveforms.medium} 
          bins={64}
          tabIndex={0}
          role="button"
          aria-label="Interactive waveform - press Enter to play"
        />
        <p className="text-xs text-muted-foreground mt-2">
          Interactive waveform can be focused and activated with keyboard.
        </p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Focus Management</h3>
        <Waveform 
          data={storybookFixtures.waveforms.medium} 
          bins={64}
          tabIndex={0}
          className="focus:outline-2 focus:outline-blue-500"
        />
        <p className="text-xs text-muted-foreground mt-2">
          Waveform shows visible focus indicators when focused.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility features including screen reader support, keyboard navigation, and focus management.',
      },
    },
  },
};

export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">No Data (Uses Mock)</h3>
        <Waveform bins={64} />
        <p className="text-xs text-muted-foreground mt-2">
          When no data is provided, uses realistic mock waveform.
        </p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Very Few Bins (8)</h3>
        <Waveform data={storybookFixtures.waveforms.medium} bins={8} />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Many Bins (256)</h3>
        <Waveform data={storybookFixtures.waveforms.long} bins={256} />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Invalid Data (Negative Values)</h3>
        <Waveform data={[-0.5, 0.2, -0.1, 0.8, 1.5]} bins={5} />
        <p className="text-xs text-muted-foreground mt-2">
          Handles invalid data by clamping values to 0-1 range.
        </p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Single Value</h3>
        <Waveform data={[0.5]} bins={1} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Edge cases including no data, extreme bin counts, invalid values, and single values.',
      },
    },
  },
};

// ============================================================================
// INTERACTIVE STORIES
// ============================================================================

export const Interactive: Story = {
  render: () => {
    const [currentBin, setCurrentBin] = React.useState<number | null>(null);
    
    const handleBinClick = (binIndex: number) => {
      setCurrentBin(binIndex);
      console.log(`Clicked bin ${binIndex}`);
    };
    
    return (
      <div className="space-y-4">
        <Waveform 
          data={storybookFixtures.waveforms.medium} 
          bins={64}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const binIndex = Math.floor((x / rect.width) * 64);
            handleBinClick(binIndex);
          }}
          className="cursor-pointer"
        />
        <p className="text-xs text-muted-foreground">
          Click on the waveform to select a bin. Current bin: {currentBin ?? 'None'}
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive waveform with click handling. Click on bars to select them.',
      },
    },
  },
};

// ============================================================================
// SIZES AND LAYOUTS
// ============================================================================

export const SizesAndLayouts: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Small Height</h3>
        <Waveform 
          data={storybookFixtures.waveforms.medium} 
          bins={64}
          className="h-8"
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Medium Height</h3>
        <Waveform 
          data={storybookFixtures.waveforms.medium} 
          bins={64}
          className="h-16"
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Large Height</h3>
        <Waveform 
          data={storybookFixtures.waveforms.medium} 
          bins={64}
          className="h-24"
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Narrow Width</h3>
        <Waveform 
          data={storybookFixtures.waveforms.medium} 
          bins={64}
          className="w-32"
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Wide Width</h3>
        <Waveform 
          data={storybookFixtures.waveforms.medium} 
          bins={64}
          className="w-96"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different waveform sizes and layouts for various use cases.',
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
          Waveform component is optimized for minimal bundle size with efficient rendering.
        </p>
        <Waveform data={storybookFixtures.waveforms.medium} bins={64} />
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Rendering Performance</h3>
        <p className="text-xs text-muted-foreground mb-2">
          Multiple waveforms render efficiently without performance impact.
        </p>
        <div className="space-y-2">
          {Array.from({ length: 5 }, (_, i) => (
            <Waveform 
              key={i} 
              data={storybookFixtures.waveforms.medium} 
              bins={32}
            />
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Memory Efficiency</h3>
        <p className="text-xs text-muted-foreground mb-2">
          Uses efficient data structures and minimal DOM manipulation.
        </p>
        <Waveform data={storybookFixtures.waveforms.long} bins={128} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Performance optimizations following e18e standards including bundle size, rendering performance, and memory efficiency.',
      },
    },
  },
};