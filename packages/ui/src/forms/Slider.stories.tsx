import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Forms/Slider',
  component: Slider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A slider component built on Radix UI primitives for selecting values within a range.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the slider',
    },
    min: {
      control: 'number',
      description: 'Minimum value of the slider',
    },
    max: {
      control: 'number',
      description: 'Maximum value of the slider',
    },
    step: {
      control: 'number',
      description: 'Step size for the slider',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the slider is disabled',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the slider',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
  },
  parameters: {
    docs: {
      description: {
        story: 'A basic slider with default settings.',
      },
    },
  },
};

export const WithValue: Story = {
  args: {
    value: [75],
    max: 100,
    step: 1,
  },
  parameters: {
    docs: {
      description: {
        story: 'A slider with a specific value.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Small</label>
        <Slider size="sm" defaultValue={[30]} max={100} step={1} />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Medium (Default)</label>
        <Slider size="md" defaultValue={[50]} max={100} step={1} />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Large</label>
        <Slider size="lg" defaultValue={[70]} max={100} step={1} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different size variants of the slider component.',
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Normal</label>
        <Slider defaultValue={[50]} max={100} step={1} />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2 text-fg/50">Disabled</label>
        <Slider defaultValue={[50]} max={100} step={1} disabled />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different states of the slider component.',
      },
    },
  },
};

export const Range: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Single Value</label>
        <Slider defaultValue={[50]} max={100} step={1} />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Range (Two Values)</label>
        <Slider defaultValue={[25, 75]} max={100} step={1} />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Multiple Values</label>
        <Slider defaultValue={[20, 50, 80]} max={100} step={1} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sliders with different value ranges and multiple handles.',
      },
    },
  },
};

export const WithSteps: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Step: 1 (Default)</label>
        <Slider defaultValue={[50]} max={100} step={1} />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Step: 5</label>
        <Slider defaultValue={[50]} max={100} step={5} />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Step: 10</label>
        <Slider defaultValue={[50]} max={100} step={10} />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Step: 0.1 (Decimal)</label>
        <Slider defaultValue={[5]} max={10} step={0.1} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sliders with different step sizes including decimal steps.',
      },
    },
  },
};

export const A11y: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <label htmlFor="a11y-slider" className="block text-sm font-medium mb-2">
          Accessible Slider
        </label>
        <Slider 
          id="a11y-slider"
          defaultValue={[50]} 
          max={100} 
          step={1}
          aria-label="Volume control"
        />
      </div>
      
      <div>
        <label htmlFor="range-slider" className="block text-sm font-medium mb-2">
          Range Slider
        </label>
        <Slider 
          id="range-slider"
          defaultValue={[25, 75]} 
          max={100} 
          step={1}
          aria-label="Price range"
        />
      </div>
      
      <div>
        <label htmlFor="disabled-slider" className="block text-sm font-medium mb-2 text-fg/50">
          Disabled Slider
        </label>
        <Slider 
          id="disabled-slider"
          defaultValue={[50]} 
          max={100} 
          step={1}
          disabled
          aria-label="Disabled volume control"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sliders with proper accessibility attributes and ARIA relationships.',
      },
    },
  },
};

export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Min Value</label>
        <Slider defaultValue={[0]} min={0} max={100} step={1} />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Max Value</label>
        <Slider defaultValue={[100]} min={0} max={100} step={1} />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Negative Range</label>
        <Slider defaultValue={[0]} min={-100} max={100} step={1} />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Small Range</label>
        <Slider defaultValue={[5]} min={0} max={10} step={0.1} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Edge cases showing various slider configurations and ranges.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Interactive Slider</label>
        <Slider 
          defaultValue={[50]} 
          max={100} 
          step={1}
          onValueChange={(value) => console.log('Slider value:', value)}
        />
        <p className="text-xs text-fg/60 mt-1">Check console for value changes</p>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Range Slider</label>
        <Slider 
          defaultValue={[25, 75]} 
          max={100} 
          step={1}
          onValueChange={(value) => console.log('Range value:', value)}
        />
        <p className="text-xs text-fg/60 mt-1">Check console for range changes</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive sliders demonstrating event handling.',
      },
    },
  },
};

export const Theming: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Custom Styled Slider</label>
        <Slider 
          defaultValue={[50]} 
          max={100} 
          step={1}
          className="[&_[data-radix-slider-track]]:bg-gradient-to-r from-brand to-accent [&_[data-radix-slider-range]]:bg-gradient-to-r from-accent to-brand"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Danger Styled Slider</label>
        <Slider 
          defaultValue={[50]} 
          max={100} 
          step={1}
          className="[&_[data-radix-slider-track]]:bg-danger/20 [&_[data-radix-slider-range]]:bg-danger [&_[data-radix-slider-thumb]]:border-danger"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Sliders with custom styling and theme variations.',
      },
    },
  },
};

export const Performance: Story = {
  render: () => (
    <div className="space-y-4">
      {Array.from({ length: 10 }, (_, i) => (
        <div key={i}>
          <label className="block text-sm font-medium mb-2">Slider {i + 1}</label>
          <Slider 
            defaultValue={[Math.random() * 100]} 
            max={100} 
            step={1}
            onValueChange={(value) => console.log(`Slider ${i + 1}:`, value)}
          />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Performance test with multiple sliders to ensure efficient rendering.',
      },
    },
  },
};
