import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Core/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "error", "success"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "search", "tel", "url"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Email Address",
    placeholder: "Enter your email",
    type: "email",
    required: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Password",
    type: "password",
    helperText: "Must be at least 8 characters long",
    required: true,
  },
};

export const WithError: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    error: "Username is already taken",
    required: true,
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <Input
        label="Search"
        placeholder="Search..."
        leftIcon={<span>🔍</span>}
        rightIcon={<span>⌨️</span>}
      />
      <Input label="Email" type="email" placeholder="Enter email" leftIcon={<span>📧</span>} />
      <Input
        label="Password"
        type="password"
        placeholder="Enter password"
        rightIcon={<span>👁️</span>}
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input (default)" />
      <Input size="lg" placeholder="Large input" />
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div className="space-y-4">
      <Input label="Text" type="text" placeholder="Enter text" />
      <Input label="Email" type="email" placeholder="Enter email" />
      <Input label="Password" type="password" placeholder="Enter password" />
      <Input label="Search" type="search" placeholder="Search..." />
      <Input label="Phone" type="tel" placeholder="Enter phone number" />
      <Input label="URL" type="url" placeholder="Enter URL" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <Input label="Default" placeholder="Normal state" />
      <Input label="Error" placeholder="Error state" error="This field is required" />
      <Input label="Success" placeholder="Success state" variant="success" />
      <Input label="Disabled" placeholder="Disabled state" disabled />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);

      if (newValue.length < 3) {
        setError("Must be at least 3 characters");
      } else {
        setError("");
      }
    };

    return (
      <div className="space-y-4">
        <Input
          label="Interactive Input"
          placeholder="Type to see validation"
          value={value}
          onChange={handleChange}
          error={error}
        />
        <p className="text-sm text-fg-muted">
          Current value: "{value}" ({value.length} characters)
        </p>
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Default Variants</h4>
        <Input label="Default" placeholder="Default input" />
        <Input label="Success" placeholder="Success input" variant="success" />
        <Input label="Error" placeholder="Error input" error="This field has an error" />
      </div>
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Size Variants</h4>
        <Input size="sm" label="Small" placeholder="Small input" />
        <Input size="md" label="Medium" placeholder="Medium input" />
        <Input size="lg" label="Large" placeholder="Large input" />
      </div>
    </div>
  ),
};

export const A11y: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Keyboard Navigation</h4>
        <p className="text-sm text-fg-muted mb-4">
          Use Tab to navigate between inputs, type to enter text
        </p>
        <div className="space-y-2">
          <Input label="First Input" placeholder="Tab to focus" />
          <Input label="Second Input" placeholder="Tab to focus" />
          <Input label="Third Input" placeholder="Tab to focus" />
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Screen Reader Support</h4>
        <p className="text-sm text-fg-muted mb-4">
          Inputs have proper labels, descriptions, and error announcements
        </p>
        <Input
          label="Accessible Input"
          helperText="This input is properly labeled for screen readers"
          placeholder="Screen readers will announce the label and helper text"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Error Announcements</h4>
        <p className="text-sm text-fg-muted mb-4">
          Errors are announced to screen readers when they appear
        </p>
        <Input
          label="Input with Error"
          placeholder="This input has an error"
          error="This field is required and must be filled out"
          required
        />
      </div>
    </div>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Long Labels</h4>
        <Input
          label="This is a very long label that might wrap to multiple lines and test the layout"
          placeholder="Input with long label"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Long Helper Text</h4>
        <Input
          label="Input with Long Helper"
          placeholder="Input with long helper text"
          helperText="This is a very long helper text that might wrap to multiple lines and test how the layout handles overflow and text wrapping in different scenarios"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Long Error Message</h4>
        <Input
          label="Input with Long Error"
          placeholder="Input with long error message"
          error="This is a very long error message that might wrap to multiple lines and test how the layout handles overflow and text wrapping in different scenarios"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">No Label</h4>
        <Input placeholder="Input without label" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Required Field</h4>
        <Input label="Required Field" placeholder="This field is required" required />
      </div>
    </div>
  ),
};
