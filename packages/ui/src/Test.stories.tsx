import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Test/Basic",
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <div>
      <h1>Hello World</h1>
      <button style={{ cursor: 'pointer', padding: '10px', backgroundColor: 'blue', color: 'white' }}>
        Click me
      </button>
    </div>
  ),
};
