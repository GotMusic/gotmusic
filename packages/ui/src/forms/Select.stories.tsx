import type { Meta, StoryObj } from "@storybook/react";
import { Select, SelectContent, SelectItem } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Components/Forms/Select",
  component: Select,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A select component built on Radix UI primitives with customizable styling and keyboard navigation.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size variant of the select",
    },
    disabled: {
      control: "boolean",
      description: "Whether the select is disabled",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the select",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => (
    <Select>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: "A basic select with three options.",
      },
    },
  },
};

export const WithDefaultValue: Story = {
  render: () => (
    <Select defaultValue="option2">
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: "A select with a default selected value.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Small</label>
        <Select size="sm">
          <SelectContent>
            <SelectItem value="small1">Small Option 1</SelectItem>
            <SelectItem value="small2">Small Option 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Medium (Default)</label>
        <Select size="md">
          <SelectContent>
            <SelectItem value="medium1">Medium Option 1</SelectItem>
            <SelectItem value="medium2">Medium Option 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Large</label>
        <Select size="lg">
          <SelectContent>
            <SelectItem value="large1">Large Option 1</SelectItem>
            <SelectItem value="large2">Large Option 2</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different size variants of the select component.",
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Normal</label>
        <Select>
          <SelectContent>
            <SelectItem value="normal1">Normal Option 1</SelectItem>
            <SelectItem value="normal2">Normal Option 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-fg/50">Disabled</label>
        <Select disabled>
          <SelectContent>
            <SelectItem value="disabled1">Disabled Option 1</SelectItem>
            <SelectItem value="disabled2">Disabled Option 2</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different states of the select component.",
      },
    },
  },
};

export const WithManyOptions: Story = {
  render: () => (
    <Select>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="cherry">Cherry</SelectItem>
        <SelectItem value="date">Date</SelectItem>
        <SelectItem value="elderberry">Elderberry</SelectItem>
        <SelectItem value="fig">Fig</SelectItem>
        <SelectItem value="grape">Grape</SelectItem>
        <SelectItem value="honeydew">Honeydew</SelectItem>
        <SelectItem value="kiwi">Kiwi</SelectItem>
        <SelectItem value="lemon">Lemon</SelectItem>
        <SelectItem value="mango">Mango</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
        <SelectItem value="papaya">Papaya</SelectItem>
        <SelectItem value="quince">Quince</SelectItem>
        <SelectItem value="raspberry">Raspberry</SelectItem>
        <SelectItem value="strawberry">Strawberry</SelectItem>
        <SelectItem value="tangerine">Tangerine</SelectItem>
        <SelectItem value="watermelon">Watermelon</SelectItem>
      </SelectContent>
    </Select>
  ),
  parameters: {
    docs: {
      description: {
        story: "A select with many options to test scrolling and performance.",
      },
    },
  },
};

export const A11y: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <label htmlFor="a11y-select" className="block text-sm font-medium mb-2">
          Accessible Select
        </label>
        <Select>
          <SelectContent>
            <SelectItem value="accessible1">Accessible Option 1</SelectItem>
            <SelectItem value="accessible2">Accessible Option 2</SelectItem>
            <SelectItem value="accessible3">Accessible Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="required-select" className="block text-sm font-medium mb-2">
          Required Select <span className="text-danger">*</span>
        </label>
        <Select>
          <SelectContent>
            <SelectItem value="required1">Required Option 1</SelectItem>
            <SelectItem value="required2">Required Option 2</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Selects with proper accessibility attributes and ARIA relationships.",
      },
    },
  },
};

export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Empty Select</label>
        <Select>
          <SelectContent>{/* No options */}</SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Single Option</label>
        <Select>
          <SelectContent>
            <SelectItem value="only">Only Option</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Long Option Text</label>
        <Select>
          <SelectContent>
            <SelectItem value="long1">This is a very long option text that might wrap</SelectItem>
            <SelectItem value="long2">
              Another very long option text that might also wrap
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Special Characters</label>
        <Select>
          <SelectContent>
            <SelectItem value="special1">Option with @#$%^&*()</SelectItem>
            <SelectItem value="special2">Option with 🚀🎉✨</SelectItem>
            <SelectItem value="special3">Option with 中文</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Edge cases showing how selects handle various content scenarios.",
      },
    },
  },
};

export const Interactive: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Interactive Select</label>
        <Select onValueChange={(value) => }>
          <SelectContent>
            <SelectItem value="interactive1">Interactive Option 1</SelectItem>
            <SelectItem value="interactive2">Interactive Option 2</SelectItem>
            <SelectItem value="interactive3">Interactive Option 3</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-fg/60 mt-1">Check console for selection events</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Interactive select demonstrating event handling.",
      },
    },
  },
};

export const Theming: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Custom Styled Select</label>
        <Select className="border-brand bg-brand/5">
          <SelectContent>
            <SelectItem value="custom1">Custom Option 1</SelectItem>
            <SelectItem value="custom2">Custom Option 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Danger Styled Select</label>
        <Select className="border-danger bg-danger/5">
          <SelectContent>
            <SelectItem value="danger1">Danger Option 1</SelectItem>
            <SelectItem value="danger2">Danger Option 2</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Selects with custom styling and theme variations.",
      },
    },
  },
};

export const Performance: Story = {
  render: () => (
    <div className="space-y-2">
      {Array.from({ length: 5 }, (_, i) => (
        <div key={i}>
          <label className="block text-sm font-medium mb-1">Select {i + 1}</label>
          <Select>
            <SelectContent>
              {Array.from({ length: 10 }, (_, j) => (
                <SelectItem key={j} value={`perf-${i}-${j}`}>
                  Option {j + 1} in Select {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Performance test with multiple selects to ensure efficient rendering.",
      },
    },
  },
};
