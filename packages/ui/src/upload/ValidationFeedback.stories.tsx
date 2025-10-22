import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ValidationFeedback } from "./ValidationFeedback";

const meta: Meta<typeof ValidationFeedback> = {
  title: "Upload/ValidationFeedback",
  component: ValidationFeedback,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "A feedback component for displaying validation messages, errors, warnings, and success states.",
      },
    },
  },
  argTypes: {
    status: {
      control: "select",
      options: ["valid", "invalid", "warning", "info"],
      description: "Validation status",
    },
    errors: {
      control: "object",
      description: "Error messages array",
    },
    warnings: {
      control: "object",
      description: "Warning messages array",
    },
    success: {
      control: "object",
      description: "Success messages array",
    },
    info: {
      control: "object",
      description: "Info messages array",
    },
    showIcons: {
      control: "boolean",
      description: "Whether to show icons",
    },
    showClose: {
      control: "boolean",
      description: "Whether to show close button",
    },
    maxMessages: {
      control: "number",
      description: "Maximum number of messages to show",
    },
    variant: {
      control: "select",
      options: ["valid", "invalid", "warning", "info"],
      description: "Visual variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    status: "info",
    info: ["Ready to upload files"],
    showIcons: true,
    showClose: false,
    maxMessages: 5,
    variant: "info",
    size: "md",
  },
};

export const Valid: Story = {
  args: {
    status: "valid",
    success: ["File uploaded successfully", "All validations passed"],
    showIcons: true,
    showClose: false,
  },
};

export const Invalid: Story = {
  args: {
    status: "invalid",
    errors: [
      "File type not supported",
      "File size exceeds 50MB limit",
      "Invalid audio format",
    ],
    showIcons: true,
    showClose: false,
  },
};

export const Warning: Story = {
  args: {
    status: "warning",
    warnings: [
      "Large file size may take longer to upload",
      "Consider compressing audio for faster upload",
    ],
    showIcons: true,
    showClose: false,
  },
};

export const Mixed: Story = {
  args: {
    status: "warning",
    errors: ["File type not supported"],
    warnings: ["Large file size detected"],
    success: ["File validation passed"],
    info: ["Processing will begin after upload"],
    showIcons: true,
    showClose: false,
  },
};

export const WithClose: Story = {
  args: {
    ...Invalid.args,
    showClose: true,
  },
};

export const NoIcons: Story = {
  args: {
    ...Invalid.args,
    showIcons: false,
  },
};

export const Small: Story = {
  args: {
    ...Invalid.args,
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    ...Invalid.args,
    size: "lg",
  },
};

export const LimitedMessages: Story = {
  args: {
    status: "invalid",
    errors: [
      "Error 1",
      "Error 2", 
      "Error 3",
      "Error 4",
      "Error 5",
      "Error 6",
      "Error 7",
    ],
    maxMessages: 3,
    showIcons: true,
  },
};

export const SingleError: Story = {
  args: {
    status: "invalid",
    errors: ["File size too large"],
    showIcons: true,
  },
};

export const SingleWarning: Story = {
  args: {
    status: "warning",
    warnings: ["Consider compressing audio"],
    showIcons: true,
  },
};

export const SingleSuccess: Story = {
  args: {
    status: "valid",
    success: ["Upload complete!"],
    showIcons: true,
  },
};

export const SingleInfo: Story = {
  args: {
    status: "info",
    info: ["Drag and drop files here"],
    showIcons: true,
  },
};

export const A11y: Story = {
  args: {
    ...Invalid.args,
    showIcons: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Accessible validation feedback with proper ARIA attributes and screen reader support.",
      },
    },
  },
};

export const Performance: Story = {
  args: {
    status: "invalid",
    errors: Array.from({ length: 20 }, (_, i) => `Error message ${i + 1}`),
    maxMessages: 5,
    showIcons: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Performance test with many messages to ensure efficient rendering.",
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const [messages, setMessages] = React.useState({
      errors: [] as string[],
      warnings: [] as string[],
      success: [] as string[],
      info: [] as string[],
    });

    const addError = () => {
      setMessages(prev => ({
        ...prev,
        errors: [...prev.errors, `Error ${prev.errors.length + 1}`],
      }));
    };

    const addWarning = () => {
      setMessages(prev => ({
        ...prev,
        warnings: [...prev.warnings, `Warning ${prev.warnings.length + 1}`],
      }));
    };

    const addSuccess = () => {
      setMessages(prev => ({
        ...prev,
        success: [...prev.success, `Success ${prev.success.length + 1}`],
      }));
    };

    const addInfo = () => {
      setMessages(prev => ({
        ...prev,
        info: [...prev.info, `Info ${prev.info.length + 1}`],
      }));
    };

    const clearAll = () => {
      setMessages({
        errors: [],
        warnings: [],
        success: [],
        info: [],
      });
    };

    const getStatus = () => {
      if (messages.errors.length > 0) return "invalid";
      if (messages.warnings.length > 0) return "warning";
      if (messages.success.length > 0) return "valid";
      return "info";
    };

    return (
      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          <button
            type="button"
            onClick={addError}
            className="px-3 py-1 bg-semantic-danger text-bg-inverse rounded text-sm"
          >
            Add Error
          </button>
          <button
            type="button"
            onClick={addWarning}
            className="px-3 py-1 bg-semantic-warning text-bg-inverse rounded text-sm"
          >
            Add Warning
          </button>
          <button
            type="button"
            onClick={addSuccess}
            className="px-3 py-1 bg-semantic-success text-bg-inverse rounded text-sm"
          >
            Add Success
          </button>
          <button
            type="button"
            onClick={addInfo}
            className="px-3 py-1 bg-semantic-info text-bg-inverse rounded text-sm"
          >
            Add Info
          </button>
          <button
            type="button"
            onClick={clearAll}
            className="px-3 py-1 bg-bg-elevated text-fg-default border border-border-subtle rounded text-sm"
          >
            Clear All
          </button>
        </div>
        <ValidationFeedback
          status={getStatus()}
          errors={messages.errors}
          warnings={messages.warnings}
          success={messages.success}
          info={messages.info}
          showIcons={true}
          showClose={true}
          onClose={clearAll}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Interactive validation feedback. Use the buttons to add different types of messages and test the component behavior.",
      },
    },
  },
};
