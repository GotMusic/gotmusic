import type { Meta, StoryObj } from '@storybook/react';
import { Slot } from './Slot';

const meta: Meta<typeof Slot> = {
  title: 'Components/Primitives/Slot',
  component: Slot,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A polymorphic slot component that enables composition patterns by merging props onto child elements.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    asChild: {
      control: 'boolean',
      description: 'Whether to merge props onto the immediate child element',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the slot',
    },
    children: {
      control: false,
      description: 'Child elements to render',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Default slot content',
  },
  parameters: {
    docs: {
      description: {
        story: 'A basic slot that renders as a span by default.',
      },
    },
  },
};

export const WithStyling: Story = {
  args: {
    className: 'px-4 py-2 bg-brand text-fg-inverse rounded-md',
    children: 'Styled slot content',
  },
  parameters: {
    docs: {
      description: {
        story: 'A slot with custom styling applied.',
      },
    },
  },
};

export const AsChild: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Default (asChild=false)</h4>
        <Slot className="px-4 py-2 bg-brand text-fg-inverse rounded-md">
          <button onClick={() => alert('Button clicked!')}>
            Button inside slot
          </button>
        </Slot>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">asChild=true</h4>
        <Slot asChild className="px-4 py-2 bg-brand text-fg-inverse rounded-md">
          <button onClick={() => alert('Button clicked!')}>
            Button with merged props
          </button>
        </Slot>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison between default slot behavior and asChild prop.',
      },
    },
  },
};

export const Composition: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Button as Link</h4>
        <Slot asChild>
          <a 
            href="#composition" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand text-fg-inverse rounded-md hover:bg-brand/90 transition-colors"
          >
            Link styled as button
          </a>
        </Slot>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Link as Button</h4>
        <Slot asChild>
          <button 
            onClick={() => alert('Button clicked!')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-fg-inverse rounded-md hover:bg-accent/90 transition-colors"
          >
            Button styled as link
          </button>
        </Slot>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Custom Element</h4>
        <Slot asChild>
          <div 
            className="px-4 py-2 bg-muted text-fg rounded-md border cursor-pointer hover:bg-muted/80 transition-colors"
            onClick={() => alert('Custom element clicked!')}
          >
            Custom div with button behavior
          </div>
        </Slot>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Various composition patterns using the slot component.',
      },
    },
  },
};

export const A11y: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Accessible Button</h4>
        <Slot asChild>
          <button 
            onClick={() => alert('Accessible button clicked!')}
            className="px-4 py-2 bg-brand text-fg-inverse rounded-md hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-brand/50 transition-colors"
            aria-label="Click to show alert"
          >
            Accessible Button
          </button>
        </Slot>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Accessible Link</h4>
        <Slot asChild>
          <a 
            href="#a11y" 
            className="px-4 py-2 bg-accent text-fg-inverse rounded-md hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors"
            aria-label="Navigate to accessibility section"
          >
            Accessible Link
          </a>
        </Slot>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Focusable Div</h4>
        <Slot asChild>
          <div 
            className="px-4 py-2 bg-muted text-fg rounded-md border cursor-pointer hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-brand/50 transition-colors"
            onClick={() => alert('Focusable div clicked!')}
            tabIndex={0}
            role="button"
            aria-label="Click to show alert"
          >
            Focusable Div
          </div>
        </Slot>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Slots with proper accessibility attributes and keyboard navigation.',
      },
    },
  },
};

export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Empty Children</h4>
        <Slot className="px-4 py-2 bg-muted text-fg rounded-md border">
          {/* Empty children */}
        </Slot>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Multiple Children</h4>
        <Slot className="px-4 py-2 bg-muted text-fg rounded-md border">
          <span>First child</span>
          <span>Second child</span>
        </Slot>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Nested Elements</h4>
        <Slot asChild>
          <div className="px-4 py-2 bg-muted text-fg rounded-md border">
            <span>Nested content</span>
            <button onClick={() => alert('Nested button!')}>
              Nested button
            </button>
          </div>
        </Slot>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Edge cases showing how slots handle various content scenarios.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Interactive Button</h4>
        <Slot asChild>
          <button 
            onClick={() => console.log('Button clicked!')}
            className="px-4 py-2 bg-brand text-fg-inverse rounded-md hover:bg-brand/90 active:scale-95 transition-all"
          >
            Click me (check console)
          </button>
        </Slot>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Interactive Link</h4>
        <Slot asChild>
          <a 
            href="#interactive" 
            className="px-4 py-2 bg-accent text-fg-inverse rounded-md hover:bg-accent/90 active:scale-95 transition-all"
            onClick={(e) => {
              e.preventDefault();
              console.log('Link clicked!');
            }}
          >
            Click me (check console)
          </a>
        </Slot>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive slots demonstrating event handling.',
      },
    },
  },
};

export const Theming: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Brand Theme</h4>
        <Slot asChild>
          <button className="px-4 py-2 bg-brand text-fg-inverse rounded-md hover:bg-brand/90 transition-colors">
            Brand Button
          </button>
        </Slot>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Accent Theme</h4>
        <Slot asChild>
          <button className="px-4 py-2 bg-accent text-fg-inverse rounded-md hover:bg-accent/90 transition-colors">
            Accent Button
          </button>
        </Slot>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Danger Theme</h4>
        <Slot asChild>
          <button className="px-4 py-2 bg-danger text-white rounded-md hover:bg-danger/90 transition-colors">
            Danger Button
          </button>
        </Slot>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Custom Gradient</h4>
        <Slot asChild>
          <button className="px-4 py-2 bg-gradient-to-r from-brand to-accent text-fg-inverse rounded-md hover:from-brand/90 hover:to-accent/90 transition-all">
            Gradient Button
          </button>
        </Slot>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Slots with different theme variations and custom styling.',
      },
    },
  },
};

export const Performance: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: 50 }, (_, i) => (
        <Slot 
          key={i}
          asChild
          className="px-2 py-1 bg-muted text-fg rounded text-xs hover:bg-muted/80 transition-colors"
        >
          <button onClick={() => console.log(`Button ${i + 1} clicked`)}>
            Slot {i + 1}
          </button>
        </Slot>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Performance test with many slots to ensure efficient rendering.',
      },
    },
  },
};
