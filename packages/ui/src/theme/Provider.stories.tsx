import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "./Provider";

const meta: Meta<typeof ThemeProvider> = {
  title: "Theme/Provider",
  component: ThemeProvider,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Theme provider component that wraps the application with theme context.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    defaultTheme: {
      control: "select",
      options: ["light", "dark", "high-contrast"],
      description: "Initial theme when the provider mounts",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    defaultTheme: "light",
  },
  render: (args) => (
    <ThemeProvider {...args}>
      <div style={{ padding: "2rem", background: "var(--background)", color: "var(--foreground)" }}>
        <h2>Light Theme</h2>
        <p>This content is wrapped in a light theme provider.</p>
        <button
          type="button"
          style={{
            padding: "0.5rem 1rem",
            background: "var(--primary)",
            color: "var(--primary-foreground)",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Themed Button
        </button>
      </div>
    </ThemeProvider>
  ),
};

export const Dark: Story = {
  args: {
    defaultTheme: "dark",
  },
  render: (args) => (
    <ThemeProvider {...args}>
      <div style={{ padding: "2rem", background: "var(--background)", color: "var(--foreground)" }}>
        <h2>Dark Theme</h2>
        <p>This content is wrapped in a dark theme provider.</p>
        <button
          type="button"
          style={{
            padding: "0.5rem 1rem",
            background: "var(--primary)",
            color: "var(--primary-foreground)",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Themed Button
        </button>
      </div>
    </ThemeProvider>
  ),
};

export const HighContrast: Story = {
  args: {
    defaultTheme: "high-contrast",
  },
  render: (args) => (
    <ThemeProvider {...args}>
      <div style={{ padding: "2rem", background: "var(--background)", color: "var(--foreground)" }}>
        <h2>High Contrast Theme</h2>
        <p>This theme prioritizes contrast for improved accessibility.</p>
        <button
          type="button"
          style={{
            padding: "0.5rem 1rem",
            background: "var(--primary)",
            color: "var(--primary-foreground)",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Themed Button
        </button>
      </div>
    </ThemeProvider>
  ),
};

export const WithMultipleElements: Story = {
  args: {
    defaultTheme: "light",
  },
  render: (args) => (
    <ThemeProvider {...args}>
      <div style={{ padding: "2rem", background: "var(--background)", color: "var(--foreground)" }}>
        <h1>Multiple Elements</h1>
        <p>This demonstrates how the theme provider affects multiple elements.</p>
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <button
            type="button"
            style={{
              padding: "0.5rem 1rem",
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Primary
          </button>
          <button
            type="button"
            style={{
              padding: "0.5rem 1rem",
              background: "var(--secondary)",
              color: "var(--secondary-foreground)",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Secondary
          </button>
          <button
            type="button"
            style={{
              padding: "0.5rem 1rem",
              background: "var(--destructive)",
              color: "var(--destructive-foreground)",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Destructive
          </button>
        </div>
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            background: "var(--muted)",
            borderRadius: "4px",
          }}
        >
          <p>This is a muted background element.</p>
        </div>
      </div>
    </ThemeProvider>
  ),
};

export const ThemeComparison: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
      <ThemeProvider defaultTheme="light">
        <div
          style={{
            padding: "1rem",
            background: "var(--background)",
            color: "var(--foreground)",
            border: "1px solid var(--border)",
          }}
        >
          <h3>Light Theme</h3>
          <p>Light theme content</p>
          <button
            type="button"
            style={{
              padding: "0.5rem 1rem",
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Button
          </button>
        </div>
      </ThemeProvider>
      <ThemeProvider defaultTheme="dark">
        <div
          style={{
            padding: "1rem",
            background: "var(--background)",
            color: "var(--foreground)",
            border: "1px solid var(--border)",
          }}
        >
          <h3>Dark Theme</h3>
          <p>Dark theme content</p>
          <button
            type="button"
            style={{
              padding: "0.5rem 1rem",
              background: "var(--primary)",
              color: "var(--primary-foreground)",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Button
          </button>
        </div>
      </ThemeProvider>
    </div>
  ),
};
