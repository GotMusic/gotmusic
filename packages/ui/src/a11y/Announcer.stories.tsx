import type { Meta, StoryObj } from "@storybook/react";
import { Announcer } from "./Announcer";

const meta: Meta<typeof Announcer> = {
  title: "A11y/Announcer",
  component: Announcer,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Screen reader announcement component for accessibility.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    message: {
      control: "text",
      description: "Message to announce to screen readers",
    },
    politeness: {
      control: "select",
      options: ["polite", "assertive"],
      description: "Announcement priority level",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: "This is a polite announcement",
    politeness: "polite",
  },
};

export const Assertive: Story = {
  args: {
    message: "This is an assertive announcement",
    politeness: "assertive",
  },
};

export const LongMessage: Story = {
  args: {
    message:
      "This is a longer announcement that demonstrates how the component handles extended text content for screen readers.",
    politeness: "polite",
  },
};

export const Interactive: Story = {
  args: {
    message: "Click the button to trigger an announcement",
    politeness: "polite",
  },
  render: ({
    message = "Click the button to trigger an announcement",
    politeness = "polite",
    ...rest
  }) => (
    <div>
      <Announcer message={message} politeness={politeness} {...rest} />
      <button
        type="button"
        onClick={() => {
          // In a real app, this would trigger an announcement
        }}
        style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
      >
        Trigger Announcement
      </button>
    </div>
  ),
};
