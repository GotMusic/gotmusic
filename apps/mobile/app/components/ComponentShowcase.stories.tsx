import type { Meta, StoryObj } from "@storybook/react-native";
import ComponentShowcase, {
  type ComponentShowcaseProps,
  SHOWCASE_FALLBACK_ASSETS,
} from "./ComponentShowcase";

const meta: Meta<ComponentShowcaseProps> = {
  title: "Mobile/ComponentShowcase",
  component: ComponentShowcase,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Complete mobile component showcase with API integration, design tokens, and interactive examples.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  name: "Component Showcase",
  args: {
    enableQueries: false,
    initialAssets: SHOWCASE_FALLBACK_ASSETS,
  },
};

export const Loading: Story = {
  name: "Loading State",
  args: {
    enableQueries: false,
    debugState: "loading",
    initialAssets: SHOWCASE_FALLBACK_ASSETS,
  },
  parameters: {
    docs: {
      description: {
        story: "Shows the component while the query is loading data from the API.",
      },
    },
  },
};

export const ErrorState: Story = {
  name: "Error State",
  args: {
    enableQueries: false,
    debugState: "error",
    initialAssets: SHOWCASE_FALLBACK_ASSETS,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates how the showcase surfaces API errors while falling back to local fixtures.",
      },
    },
  },
};
