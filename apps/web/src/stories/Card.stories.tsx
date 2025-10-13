import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardMeta, CardTitle } from "../components/ui/Card";

const meta: Meta<typeof Card> = { title: "UI/Card", component: Card };
export default meta;

type S = StoryObj<typeof Card>;
export const Basic: S = {
  render: () => (
    <Card>
      <CardTitle>808 Pack Vol.1</CardTitle>
      <CardMeta>By Drumsmith · 120 files · 320kbps preview</CardMeta>
    </Card>
  ),
};
