import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Test/ButtonTest",
  component: Button,
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
        <h3 className="text-lg font-medium mb-4">Cursor Pointer Test</h3>
        <p className="text-sm text-fg-muted mb-4">
          Hover over these buttons - you should see cursor pointer
        </p>
        <div className="flex gap-4">
          <Button variant="primary" style={{ cursor: 'pointer' }}>Primary Button</Button>
          <Button variant="secondary" style={{ cursor: 'pointer' }}>Secondary Button</Button>
          <Button variant="danger" style={{ cursor: 'pointer' }}>Danger Button</Button>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-4">Loading State Test</h3>
        <p className="text-sm text-fg-muted mb-4">
          Loading button should show cursor-wait
        </p>
        <Button loading style={{ cursor: 'wait' }}>Loading Button</Button>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-4">Disabled State Test</h3>
        <p className="text-sm text-fg-muted mb-4">
          Disabled button should show no cursor
        </p>
        <Button disabled style={{ cursor: 'not-allowed' }}>Disabled Button</Button>
      </div>
    </div>
  ),
};
