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
    <div style={{ padding: "20px", backgroundColor: "#f0f0f0" }}>
      <h3 style={{ marginBottom: "16px", fontSize: "18px" }}>Direct CSS Test</h3>
      <p style={{ marginBottom: "16px", fontSize: "14px", color: "#666" }}>
        These should show different cursor states
      </p>
      <div style={{ display: "flex", gap: "16px" }}>
        <button
          type="button"
          style={{
            padding: "8px 16px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Pointer Cursor
        </button>
        <button
          type="button"
          style={{
            padding: "8px 16px",
            backgroundColor: "#10b981",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "wait",
          }}
        >
          Wait Cursor
        </button>
        <button
          type="button"
          style={{
            padding: "8px 16px",
            backgroundColor: "#6b7280",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "not-allowed",
          }}
          disabled
        >
          Not Allowed
        </button>
      </div>
    </div>
  ),
};
