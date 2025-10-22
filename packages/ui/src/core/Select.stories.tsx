import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Core/Select",
  component: Select,
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const countryOptions = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
];

export const Default: Story = {
  args: {
    options: basicOptions,
    placeholder: "Select an option...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Country",
    options: countryOptions,
    placeholder: "Choose your country",
    required: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Theme",
    options: [
      { value: "light", label: "Light" },
      { value: "dark", label: "Dark" },
      { value: "auto", label: "Auto" },
    ],
    helperText: "Choose your preferred theme",
  },
};

export const WithError: Story = {
  args: {
    label: "Priority",
    options: [
      { value: "low", label: "Low" },
      { value: "medium", label: "Medium" },
      { value: "high", label: "High" },
    ],
    error: "Please select a priority level",
    required: true,
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <Select
        label="Search"
        options={basicOptions}
        placeholder="Search options..."
        leftIcon={<span>🔍</span>}
        rightIcon={<span>⌄</span>}
      />
      <Select
        label="Category"
        options={[
          { value: "tech", label: "Technology" },
          { value: "design", label: "Design" },
          { value: "business", label: "Business" },
        ]}
        placeholder="Choose category"
        leftIcon={<span>📁</span>}
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Select size="sm" options={basicOptions} placeholder="Small select" />
      <Select size="md" options={basicOptions} placeholder="Medium select (default)" />
      <Select size="lg" options={basicOptions} placeholder="Large select" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <Select label="Default" options={basicOptions} placeholder="Normal state" />
      <Select
        label="Error"
        options={basicOptions}
        placeholder="Error state"
        error="This field is required"
      />
      <Select
        label="Success"
        options={basicOptions}
        placeholder="Success state"
        variant="success"
      />
      <Select label="Disabled" options={basicOptions} placeholder="Disabled state" disabled />
    </div>
  ),
};

export const WithDisabledOptions: Story = {
  render: () => (
    <Select
      label="Status"
      options={[
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive", disabled: true },
        { value: "pending", label: "Pending" },
        { value: "archived", label: "Archived", disabled: true },
      ]}
      placeholder="Select status"
    />
  ),
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newValue = e.target.value;
      setValue(newValue);

      if (!newValue) {
        setError("Please select an option");
      } else {
        setError("");
      }
    };

    return (
      <div className="space-y-4">
        <Select
          label="Interactive Select"
          options={basicOptions}
          placeholder="Select to see validation"
          value={value}
          onChange={handleChange}
          error={error}
        />
        <p className="text-sm text-fg-muted">
          Selected value: "{value}"{" "}
          {value && `(${basicOptions.find((opt) => opt.value === value)?.label})`}
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
        <Select label="Default" options={basicOptions} placeholder="Default select" />
        <Select
          label="Success"
          options={basicOptions}
          placeholder="Success select"
          variant="success"
        />
        <Select
          label="Error"
          options={basicOptions}
          placeholder="Error select"
          error="This field has an error"
        />
      </div>
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Size Variants</h4>
        <Select size="sm" label="Small" options={basicOptions} placeholder="Small select" />
        <Select size="md" label="Medium" options={basicOptions} placeholder="Medium select" />
        <Select size="lg" label="Large" options={basicOptions} placeholder="Large select" />
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
          Use Tab to navigate between selects, Arrow keys to navigate options, Enter to select
        </p>
        <div className="space-y-2">
          <Select label="First Select" options={basicOptions} placeholder="Tab to focus" />
          <Select label="Second Select" options={basicOptions} placeholder="Tab to focus" />
          <Select label="Third Select" options={basicOptions} placeholder="Tab to focus" />
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Screen Reader Support</h4>
        <p className="text-sm text-fg-muted mb-4">
          Selects have proper labels, descriptions, and option announcements
        </p>
        <Select
          label="Accessible Select"
          options={basicOptions}
          helperText="This select is properly labeled for screen readers"
          placeholder="Screen readers will announce the label and helper text"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Error Announcements</h4>
        <p className="text-sm text-fg-muted mb-4">
          Errors are announced to screen readers when they appear
        </p>
        <Select
          label="Select with Error"
          options={basicOptions}
          placeholder="This select has an error"
          error="This field is required and must be selected"
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
        <Select
          label="This is a very long label that might wrap to multiple lines and test the layout"
          options={basicOptions}
          placeholder="Select with long label"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Long Helper Text</h4>
        <Select
          label="Select with Long Helper"
          options={basicOptions}
          placeholder="Select with long helper text"
          helperText="This is a very long helper text that might wrap to multiple lines and test how the layout handles overflow and text wrapping in different scenarios"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Long Error Message</h4>
        <Select
          label="Select with Long Error"
          options={basicOptions}
          placeholder="Select with long error message"
          error="This is a very long error message that might wrap to multiple lines and test how the layout handles overflow and text wrapping in different scenarios"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">No Label</h4>
        <Select options={basicOptions} placeholder="Select without label" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Required Field</h4>
        <Select
          label="Required Select"
          options={basicOptions}
          placeholder="This field is required"
          required
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Many Options</h4>
        <Select label="Country" options={countryOptions} placeholder="Choose from many options" />
      </div>
    </div>
  ),
};
