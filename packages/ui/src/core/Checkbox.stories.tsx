import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Core/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Accept terms and conditions",
  },
};

export const Checked: Story = {
  args: {
    label: "Subscribe to newsletter",
    defaultChecked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: "Select all items",
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled checkbox",
    disabled: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Marketing emails",
    helperText: "Receive updates about new features and products",
  },
};

export const WithError: Story = {
  args: {
    label: "Required agreement",
    error: "You must agree to continue",
    required: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox size="sm" label="Small checkbox" />
      <Checkbox size="md" label="Medium checkbox (default)" />
      <Checkbox size="lg" label="Large checkbox" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox label="Default" />
      <Checkbox label="Checked" defaultChecked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Error" error="This field is required" required />
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    const [indeterminate, setIndeterminate] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.target.checked;
      setChecked(isChecked);
      setIndeterminate(false);
    };

    const handleIndeterminate = () => {
      setIndeterminate(true);
      setChecked(false);
    };

    return (
      <div className="space-y-4">
        <Checkbox
          label="Interactive checkbox"
          checked={checked}
          indeterminate={indeterminate}
          onChange={handleChange}
        />
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleIndeterminate}
            className="text-sm text-primary hover:underline"
          >
            Set indeterminate
          </button>
          <p className="text-sm text-fg-muted">
            State: {indeterminate ? "Indeterminate" : checked ? "Checked" : "Unchecked"}
          </p>
        </div>
      </div>
    );
  },
};

export const CheckboxGroup: Story = {
  render: () => {
    const [selections, setSelections] = useState<string[]>([]);

    const options = [
      { id: "option1", label: "Option 1" },
      { id: "option2", label: "Option 2" },
      { id: "option3", label: "Option 3" },
    ];

    const handleChange = (optionId: string, checked: boolean) => {
      setSelections((prev) =>
        checked ? [...prev, optionId] : prev.filter((id) => id !== optionId),
      );
    };

    const allChecked = selections.length === options.length;
    const someChecked = selections.length > 0 && selections.length < options.length;

    const handleSelectAll = (checked: boolean) => {
      setSelections(checked ? options.map((opt) => opt.id) : []);
    };

    return (
      <div className="space-y-4">
        <Checkbox
          label="Select all"
          checked={allChecked}
          indeterminate={someChecked}
          onChange={(e) => handleSelectAll(e.target.checked)}
        />
        <div className="space-y-2 pl-4">
          {options.map((option) => (
            <Checkbox
              key={option.id}
              label={option.label}
              checked={selections.includes(option.id)}
              onChange={(e) => handleChange(option.id, e.target.checked)}
            />
          ))}
        </div>
        <p className="text-sm text-fg-muted">
          Selected: {selections.length} of {options.length}
        </p>
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Size Variants</h4>
        <Checkbox size="sm" label="Small checkbox" />
        <Checkbox size="md" label="Medium checkbox" />
        <Checkbox size="lg" label="Large checkbox" />
      </div>
      <div className="space-y-4">
        <h4 className="text-sm font-medium">State Variants</h4>
        <Checkbox label="Unchecked" />
        <Checkbox label="Checked" defaultChecked />
        <Checkbox label="Indeterminate" indeterminate />
        <Checkbox label="Disabled" disabled />
        <Checkbox label="Error" error="This field is required" required />
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
          Use Tab to navigate between checkboxes, Space to toggle
        </p>
        <div className="space-y-2">
          <Checkbox label="First checkbox" />
          <Checkbox label="Second checkbox" />
          <Checkbox label="Third checkbox" />
        </div>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Screen Reader Support</h4>
        <p className="text-sm text-fg-muted mb-4">
          Checkboxes have proper labels, descriptions, and state announcements
        </p>
        <Checkbox
          label="Accessible checkbox"
          helperText="This checkbox is properly labeled for screen readers"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Error Announcements</h4>
        <p className="text-sm text-fg-muted mb-4">
          Errors are announced to screen readers when they appear
        </p>
        <Checkbox
          label="Checkbox with Error"
          error="This field is required and must be checked"
          required
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Indeterminate State</h4>
        <p className="text-sm text-fg-muted mb-4">
          Indeterminate state is properly announced to screen readers
        </p>
        <Checkbox label="Indeterminate checkbox" indeterminate />
      </div>
    </div>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Long Labels</h4>
        <Checkbox label="This is a very long label that might wrap to multiple lines and test the layout" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Long Helper Text</h4>
        <Checkbox
          label="Checkbox with Long Helper"
          helperText="This is a very long helper text that might wrap to multiple lines and test how the layout handles overflow and text wrapping in different scenarios"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Long Error Message</h4>
        <Checkbox
          label="Checkbox with Long Error"
          error="This is a very long error message that might wrap to multiple lines and test how the layout handles overflow and text wrapping in different scenarios"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">No Label</h4>
        <Checkbox />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Required Field</h4>
        <Checkbox label="Required checkbox" required />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Complex State</h4>
        <Checkbox
          label="Complex checkbox"
          checked={true}
          indeterminate={false}
          helperText="This checkbox is checked and not indeterminate"
        />
      </div>
    </div>
  ),
};
