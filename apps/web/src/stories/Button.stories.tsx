import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../components/ui/Button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  args: { children: "Continue" },
};
export default meta;

type S = StoryObj<typeof Button>;
export const Primary: S = {};
export const Loading: S = { args: { loading: true } };
export const Ghost: S = { args: { variant: "ghost" } };
