import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

const Swatch = ({ name, token }: { name: string; token: string }) => (
  <div className="flex items-center gap-3">
    <div className="h-10 w-10 rounded-md border" style={{ background: `var(${token})` }} />
    <code className="text-sm">
      {name} — {token}
    </code>
  </div>
);

const meta: Meta = { title: "Design/Tokens" };
export default meta;

type S = StoryObj;
export const Colors: S = {
  render: () => (
    <div className="grid gap-3">
      <Swatch name="Brand Primary" token="--color-brand-primary" />
      <Swatch name="Foreground" token="--color-fg-default" />
      <Swatch name="Background" token="--color-bg-default" />
    </div>
  ),
};
