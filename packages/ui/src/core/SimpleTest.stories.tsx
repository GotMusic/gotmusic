import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Test/SimpleTest",
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CursorTest: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-4">Direct CSS Test</h3>
        <p className="text-sm text-gray-600 mb-4">
          These should show different cursor states
        </p>
        <div className="flex gap-4">
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
            style={{ cursor: 'pointer' }}
          >
            Inline + Class Cursor
          </button>
          <button 
            className="px-4 py-2 bg-green-500 text-white rounded cursor-wait"
            style={{ cursor: 'wait' }}
          >
            Wait Cursor
          </button>
          <button 
            className="px-4 py-2 bg-gray-500 text-white rounded cursor-not-allowed"
            style={{ cursor: 'not-allowed' }}
            disabled
          >
            Not Allowed
          </button>
        </div>
      </div>
    </div>
  ),
};
