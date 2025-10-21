import type { Meta, StoryObj } from '@storybook/react';
import { Field } from './Field';
import { Input } from './Input';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Field> = {
  title: 'Components/Forms/Field',
  component: Field,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A field wrapper component that provides consistent labeling, error handling, and spacing for form elements.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant affecting spacing',
    },
    label: {
      control: 'text',
      description: 'Label text for the field',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the field is disabled',
    },
    htmlFor: {
      control: 'text',
      description: 'ID of the associated form element',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the field',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: 'Field Label',
    children: <Input placeholder="Enter text..." />,
  },
  parameters: {
    docs: {
      description: {
        story: 'A basic field with label and input.',
      },
    },
  },
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    error: 'Please enter a valid email address',
    children: <Input placeholder="Enter email..." />,
  },
  parameters: {
    docs: {
      description: {
        story: 'A field with an error message.',
      },
    },
  },
};

export const Required: Story = {
  args: {
    label: 'Password',
    required: true,
    children: <Input type="password" placeholder="Enter password..." />,
  },
  parameters: {
    docs: {
      description: {
        story: 'A required field with asterisk indicator.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    disabled: true,
    children: <Input placeholder="Disabled input..." disabled />,
  },
  parameters: {
    docs: {
      description: {
        story: 'A disabled field with muted styling.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <Field size="sm" label="Small Field">
        <Input placeholder="Small spacing..." />
      </Field>
      
      <Field size="md" label="Medium Field">
        <Input placeholder="Medium spacing..." />
      </Field>
      
      <Field size="lg" label="Large Field">
        <Input placeholder="Large spacing..." />
      </Field>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different size variants affecting spacing between elements.',
      },
    },
  },
};

export const WithCheckbox: Story = {
  render: () => (
    <div className="space-y-4">
      <Field label="Agree to terms" htmlFor="terms">
        <div className="flex items-center gap-2">
          <Checkbox id="terms" />
          <label htmlFor="terms" className="text-sm cursor-pointer">
            I agree to the terms and conditions
          </label>
        </div>
      </Field>
      
      <Field label="Newsletter subscription" htmlFor="newsletter">
        <div className="flex items-center gap-2">
          <Checkbox id="newsletter" checked />
          <label htmlFor="newsletter" className="text-sm cursor-pointer">
            Subscribe to newsletter
          </label>
        </div>
      </Field>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Fields containing checkbox elements.',
      },
    },
  },
};

export const A11y: Story = {
  render: () => (
    <div className="space-y-4">
      <Field 
        label="Accessible Input" 
        htmlFor="a11y-input"
        error="This field has proper accessibility attributes"
      >
        <Input 
          id="a11y-input"
          placeholder="Accessible input..."
          aria-describedby="a11y-input-error"
        />
      </Field>
      
      <Field 
        label="Required Field" 
        htmlFor="required-input"
        required
      >
        <Input 
          id="required-input"
          placeholder="Required input..."
          aria-required="true"
        />
      </Field>
      
      <Field 
        label="Disabled Field" 
        htmlFor="disabled-input"
        disabled
      >
        <Input 
          id="disabled-input"
          placeholder="Disabled input..."
          disabled
          aria-disabled="true"
        />
      </Field>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Fields with proper accessibility attributes and ARIA relationships.',
      },
    },
  },
};

export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-4">
      <Field label="No Error">
        <Input placeholder="Field without error..." />
      </Field>
      
      <Field error="Error without label">
        <Input placeholder="Field with error but no label..." />
      </Field>
      
      <Field label="Very Long Label That Might Wrap to Multiple Lines and Should Be Handled Gracefully">
        <Input placeholder="Long label test..." />
      </Field>
      
      <Field 
        label="Field with Long Error Message" 
        error="This is a very long error message that might wrap to multiple lines and should be handled gracefully by the field component"
      >
        <Input placeholder="Long error test..." />
      </Field>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Edge cases showing how fields handle various content scenarios.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => (
    <div className="space-y-4">
      <Field 
        label="Interactive Field" 
        htmlFor="interactive-input"
      >
        <Input 
          id="interactive-input"
          placeholder="Type to see changes..."
          onChange={(e) => console.log('Input changed:', e.target.value)}
        />
      </Field>
      
      <Field 
        label="Validation Field" 
        htmlFor="validation-input"
        error=""
      >
        <Input 
          id="validation-input"
          placeholder="Enter email..."
          onChange={(e) => {
            const isValid = e.target.value.includes('@');
            // In a real app, you'd update the error state here
            console.log('Email valid:', isValid);
          }}
        />
      </Field>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive fields demonstrating event handling and validation.',
      },
    },
  },
};

export const Theming: Story = {
  render: () => (
    <div className="space-y-4">
      <Field 
        label="Custom Styled Field" 
        className="border border-brand/20 rounded-lg p-3 bg-brand/5"
      >
        <Input placeholder="Custom styled field..." />
      </Field>
      
      <Field 
        label="Danger Field" 
        error="Custom error styling"
        className="border border-danger/20 rounded-lg p-3 bg-danger/5"
      >
        <Input placeholder="Danger styled field..." />
      </Field>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Fields with custom styling and theme variations.',
      },
    },
  },
};

export const Performance: Story = {
  render: () => (
    <div className="space-y-2">
      {Array.from({ length: 20 }, (_, i) => (
        <Field 
          key={i}
          label={`Field ${i + 1}`}
          htmlFor={`perf-input-${i}`}
        >
          <Input 
            id={`perf-input-${i}`}
            placeholder={`Performance test input ${i + 1}...`}
          />
        </Field>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Performance test with many fields to ensure efficient rendering.',
      },
    },
  },
};
