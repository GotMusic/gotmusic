import { storybookFixtures } from "@gotmusic/fixtures";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Forms/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Input field component for text entry with validation states, sizes, and accessibility features. Supports various input types and error handling.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url", "search"],
      description: "HTML input type",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the input field",
    },
    variant: {
      control: "select",
      options: ["default", "error"],
      description: "Visual variant of the input",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    required: {
      control: "boolean",
      description: "Whether the input is required",
    },
    value: {
      control: "text",
      description: "Input value",
    },
    onChange: {
      action: "changed",
      description: "Change handler function",
    },
  },
  args: {
    placeholder: "Enter text...",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// PRIMARY STORIES (Required by STORYBOOK-GUIDE.md)
// ============================================================================

export const Primary: Story = {
  args: {
    placeholder: "Enter your text here",
    value: "",
  },
  parameters: {
    docs: {
      description: {
        story: "Default input field with placeholder text.",
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Default Variant</h3>
        <Input placeholder="Default input" />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Error Variant</h3>
        <Input placeholder="Input with error" variant="error" value="invalid@email" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different input variants showing default and error states.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Small</h3>
        <Input placeholder="Small input" size="sm" />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Medium</h3>
        <Input placeholder="Medium input" size="md" />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Large</h3>
        <Input placeholder="Large input" size="lg" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different input sizes from small to large.",
      },
    },
  },
};

export const InputTypes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Text Input</h3>
        <Input type="text" placeholder="Enter text" />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Email Input</h3>
        <Input type="email" placeholder="Enter email" />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Password Input</h3>
        <Input type="password" placeholder="Enter password" />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Number Input</h3>
        <Input type="number" placeholder="Enter number" />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Search Input</h3>
        <Input type="search" placeholder="Search..." />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different input types for various use cases.",
      },
    },
  },
};

export const A11y: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Screen Reader Support</h3>
        <Input
          placeholder="Accessible input"
          aria-label="Enter your name"
          aria-describedby="name-help"
        />
        <p id="name-help" className="text-xs text-muted-foreground mt-1">
          This input has proper ARIA labels for screen readers.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Keyboard Navigation</h3>
        <div className="space-y-2">
          <Input placeholder="First input" />
          <Input placeholder="Second input" />
          <Input placeholder="Third input" />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Use Tab to navigate between inputs, Enter to submit forms.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Focus Management</h3>
        <Input placeholder="Focus me" className="focus:outline-2 focus:outline-blue-500" />
        <p className="text-xs text-muted-foreground mt-2">
          Input shows visible focus indicators when focused.
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Required Field</h3>
        <Input placeholder="Required field" required aria-required="true" />
        <p className="text-xs text-muted-foreground mt-2">
          Required fields are properly marked for screen readers.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Accessibility features including screen reader support, keyboard navigation, focus management, and required field handling.",
      },
    },
  },
};

export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Long Text</h3>
        <Input
          placeholder="Enter very long text here"
          value="This is a very long text that might cause layout issues if not handled properly"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Disabled State</h3>
        <Input placeholder="Disabled input" disabled value="Cannot edit this" />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Error with Long Text</h3>
        <Input
          placeholder="Invalid input"
          variant="error"
          value="This is a very long invalid input that should show error state"
        />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Empty Placeholder</h3>
        <Input placeholder="" />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Very Long Placeholder</h3>
        <Input placeholder="This is an extremely long placeholder text that might wrap to multiple lines and should be handled gracefully" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Edge cases including long text, disabled state, error with long text, empty placeholder, and very long placeholder.",
      },
    },
  },
};

// ============================================================================
// FORM STATES STORIES
// ============================================================================

export const FormStates: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Valid Input</h3>
        <Input placeholder="Valid input" value={storybookFixtures.forms.validInput.value} />
        <p className="text-xs text-green-600 mt-1">✓ Valid input</p>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Invalid Input</h3>
        <Input
          placeholder="Invalid input"
          variant="error"
          value={storybookFixtures.forms.invalidInput.value}
        />
        <p className="text-xs text-red-600 mt-1">✗ {storybookFixtures.forms.invalidInput.error}</p>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Loading Input</h3>
        <Input
          placeholder="Loading..."
          value={storybookFixtures.forms.loadingInput.value}
          disabled
        />
        <p className="text-xs text-blue-600 mt-1">⏳ Loading...</p>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Disabled Input</h3>
        <Input
          placeholder="Disabled input"
          value={storybookFixtures.forms.disabledInput.value}
          disabled
        />
        <p className="text-xs text-gray-600 mt-1">🚫 Disabled</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different form states using fixtures data for consistent validation messaging.",
      },
    },
  },
};

// ============================================================================
// INTERACTIVE STORIES
// ============================================================================

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    const [isValid, setIsValid] = React.useState(true);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);

      // Simple email validation
      if (newValue.includes("@")) {
        setIsValid(true);
      } else if (newValue.length > 0) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    };

    return (
      <div className="space-y-4">
        <Input
          type="email"
          placeholder="Enter email address"
          value={value}
          onChange={handleChange}
          variant={isValid ? "default" : "error"}
        />
        <p className="text-xs text-muted-foreground">
          Type an email address to see validation in action.
        </p>
        {value && (
          <p className={`text-xs ${isValid ? "text-green-600" : "text-red-600"}`}>
            {isValid ? "✓ Valid email" : "✗ Invalid email format"}
          </p>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive input with real-time validation. Type an email to see validation in action.",
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
          Input component is optimized for minimal bundle size with efficient rendering.
        </p>
        <Input placeholder="Performance optimized input" />
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Rendering Performance</h3>
        <p className="text-xs text-muted-foreground mb-2">
          Multiple inputs render efficiently without performance impact.
        </p>
        <div className="space-y-2">
          {Array.from({ length: 5 }, (_, i) => (
            <Input key={i} placeholder={`Performance test input ${i + 1}`} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Event Handling</h3>
        <p className="text-xs text-muted-foreground mb-2">
          Efficient event handling with minimal re-renders.
        </p>
        <Input
          placeholder="Type to test performance"
          onChange={(e) => {
            // Handle input change
          }}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Performance optimizations following e18e standards including bundle size, rendering performance, and event handling.",
      },
    },
  },
};
