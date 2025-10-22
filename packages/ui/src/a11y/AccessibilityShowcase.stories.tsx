import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { Card, CardMeta, CardTitle } from "../Card";
import { Badge } from "../data/Badge";
import { Tag } from "../data/Tag";
import { Checkbox } from "../forms/Checkbox";
import { Input } from "../forms/Input";
import { Select, SelectContent, SelectItem } from "../forms/Select";
import { VisuallyHidden } from "../primitives/VisuallyHidden";

const meta: Meta = {
  title: "Accessibility/AccessibilityShowcase",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A comprehensive showcase of accessibility features across all GotMusic UI components.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const KeyboardNavigation: Story = {
  render: () => (
    <div className="space-y-6">
      <Card>
        <CardTitle>Keyboard Navigation</CardTitle>
        <CardMeta>Test keyboard navigation with Tab, Shift+Tab, Enter, and Space keys</CardMeta>

        <div className="mt-4 space-y-4">
          <div className="flex gap-2">
            <Button>First Button</Button>
            <Button variant="ghost">Second Button</Button>
            <Button variant="ghost">Third Button</Button>
          </div>

          <div className="flex gap-2">
            <Checkbox id="kb-checkbox-1" />
            <label htmlFor="kb-checkbox-1" className="text-sm cursor-pointer">
              Checkbox 1
            </label>
            <Checkbox id="kb-checkbox-2" />
            <label htmlFor="kb-checkbox-2" className="text-sm cursor-pointer">
              Checkbox 2
            </label>
          </div>

          <div className="flex gap-2">
            <Input placeholder="First input" />
            <Input placeholder="Second input" />
            <Input placeholder="Third input" />
          </div>
        </div>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates keyboard navigation through interactive elements. Use Tab to move forward, Shift+Tab to move backward, Enter/Space to activate.",
      },
    },
  },
};

export const ScreenReaderSupport: Story = {
  render: () => (
    <div className="space-y-6">
      <Card>
        <CardTitle>Screen Reader Support</CardTitle>
        <CardMeta>Components with proper ARIA labels and screen reader announcements</CardMeta>

        <div className="mt-4 space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Buttons with ARIA Labels</h4>
            <div className="flex gap-2">
              <Button aria-label="Close dialog">
                <span aria-hidden="true">×</span>
              </Button>
              <Button aria-label="Save changes">
                <span aria-hidden="true">💾</span>
              </Button>
              <Button aria-label="Delete item">
                <span aria-hidden="true">🗑️</span>
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Form with Proper Labels</h4>
            <div className="space-y-2">
              <div>
                <label htmlFor="sr-email" className="block text-sm font-medium">
                  Email Address <span className="text-danger">*</span>
                </label>
                <Input
                  id="sr-email"
                  type="email"
                  placeholder="Enter your email"
                  aria-required="true"
                  aria-describedby="sr-email-help"
                />
                <p id="sr-email-help" className="text-xs text-fg/60">
                  We'll never share your email
                </p>
              </div>

              <div>
                <label htmlFor="sr-password" className="block text-sm font-medium">
                  Password
                </label>
                <Input
                  id="sr-password"
                  type="password"
                  placeholder="Enter your password"
                  aria-describedby="sr-password-help"
                />
                <p id="sr-password-help" className="text-xs text-fg/60">
                  Must be at least 8 characters
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Status Indicators</h4>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-success rounded-full" aria-hidden="true" />
              <span>Online</span>
              <VisuallyHidden>Status: Connected and ready</VisuallyHidden>
            </div>
          </div>
        </div>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Components with proper ARIA attributes, labels, and screen reader support.",
      },
    },
  },
};

export const FocusManagement: Story = {
  render: () => (
    <div className="space-y-6">
      <Card>
        <CardTitle>Focus Management</CardTitle>
        <CardMeta>Proper focus indicators and focus trapping</CardMeta>

        <div className="mt-4 space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Focus Indicators</h4>
            <div className="flex gap-2">
              <Button className="focus:ring-2 focus:ring-brand/50 focus:outline-none">
                Custom Focus Ring
              </Button>
              <Button className="focus:ring-2 focus:ring-accent/50 focus:outline-none">
                Accent Focus Ring
              </Button>
              <Button className="focus:ring-2 focus:ring-danger/50 focus:outline-none">
                Danger Focus Ring
              </Button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Focusable Elements</h4>
            <div className="flex gap-2">
              <Button tabIndex={0}>Focusable Button</Button>
              <button
                type="button"
                className="px-4 py-2 bg-muted text-fg rounded-md border cursor-pointer hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-brand/50"
                aria-label="Focusable button"
              >
                Focusable Button
              </button>
              <a
                href="#focus"
                className="px-4 py-2 bg-accent text-fg-inverse rounded-md hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent/50"
              >
                Focusable Link
              </a>
            </div>
          </div>
        </div>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Demonstrates proper focus management with visible focus indicators.",
      },
    },
  },
};

export const ColorContrast: Story = {
  render: () => (
    <div className="space-y-6">
      <Card>
        <CardTitle>Color Contrast</CardTitle>
        <CardMeta>Components with WCAG AA compliant color contrast ratios</CardMeta>

        <div className="mt-4 space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">High Contrast Text</h4>
            <div className="space-y-2">
              <p className="text-fg">Primary text with high contrast</p>
              <p className="text-fg/80">Secondary text with good contrast</p>
              <p className="text-fg/60">Muted text with adequate contrast</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Button Contrast</h4>
            <div className="flex gap-2">
              <Button>High Contrast Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button className="bg-danger text-white hover:bg-danger/90">Danger Button</Button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Status Badges</h4>
            <div className="flex gap-2">
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="info">Info</Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Components demonstrating WCAG AA compliant color contrast ratios.",
      },
    },
  },
};

export const FormAccessibility: Story = {
  render: () => (
    <div className="space-y-6">
      <Card>
        <CardTitle>Form Accessibility</CardTitle>
        <CardMeta>Accessible form elements with proper labeling and validation</CardMeta>

        <div className="mt-4 space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Required Fields</h4>
            <div className="space-y-2">
              <div>
                <label htmlFor="req-name" className="block text-sm font-medium">
                  Full Name <span className="text-danger">*</span>
                </label>
                <Input
                  id="req-name"
                  placeholder="Enter your full name"
                  required
                  aria-required="true"
                />
              </div>

              <div>
                <label htmlFor="req-email" className="block text-sm font-medium">
                  Email <span className="text-danger">*</span>
                </label>
                <Input
                  id="req-email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  aria-required="true"
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Form Validation</h4>
            <div className="space-y-2">
              <div>
                <label htmlFor="val-password" className="block text-sm font-medium">
                  Password
                </label>
                <Input
                  id="val-password"
                  type="password"
                  placeholder="Enter password"
                  aria-describedby="val-password-error"
                />
                <p id="val-password-error" className="text-xs text-danger" role="alert">
                  Password must be at least 8 characters
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Checkbox Groups</h4>
            <fieldset>
              <legend className="text-sm font-medium mb-2">Select your interests</legend>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Checkbox id="interest-music" />
                  <label htmlFor="interest-music" className="text-sm cursor-pointer">
                    Music
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="interest-art" />
                  <label htmlFor="interest-art" className="text-sm cursor-pointer">
                    Art
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="interest-tech" />
                  <label htmlFor="interest-tech" className="text-sm cursor-pointer">
                    Technology
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Accessible form elements with proper labeling, validation, and error handling.",
      },
    },
  },
};

export const InteractiveElements: Story = {
  render: () => (
    <div className="space-y-6">
      <Card>
        <CardTitle>Interactive Elements</CardTitle>
        <CardMeta>Properly labeled and accessible interactive components</CardMeta>

        <div className="mt-4 space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Removable Tags</h4>
            <div className="flex flex-wrap gap-2">
              <Tag onClose={() => alert("Removed!")}>React</Tag>
              <Tag onClose={() => alert("Removed!")}>TypeScript</Tag>
              <Tag onClose={() => alert("Removed!")}>Storybook</Tag>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Select with Options</h4>
            <Select>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Action Buttons</h4>
            <div className="flex gap-2">
              <Button onClick={() => alert("Saved!")} aria-label="Save current changes">
                Save
              </Button>
              <Button
                variant="ghost"
                onClick={() => alert("Cancelled!")}
                aria-label="Cancel current operation"
              >
                Cancel
              </Button>
              <Button
                className="bg-danger text-white hover:bg-danger/90"
                onClick={() => alert("Deleted!")}
                aria-label="Delete selected item"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Interactive elements with proper accessibility attributes and user feedback.",
      },
    },
  },
};

export const Performance: Story = {
  render: () => (
    <div className="space-y-6">
      <Card>
        <CardTitle>Accessibility Performance</CardTitle>
        <CardMeta>Large number of accessible components for performance testing</CardMeta>

        <div className="mt-4 space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Many Interactive Elements</h4>
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 20 }, (_, i) => (
                <Button key={`performance-button-${i + 1}`} aria-label={`Button ${i + 1}`}>
                  Button {i + 1}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Many Form Elements</h4>
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 10 }, (_, i) => (
                <div key={`performance-form-${i + 1}`}>
                  <label htmlFor={`perf-input-${i}`} className="block text-sm font-medium">
                    Input {i + 1}
                  </label>
                  <Input
                    id={`perf-input-${i}`}
                    placeholder={`Input ${i + 1}`}
                    aria-label={`Input field ${i + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Performance test with many accessible components to ensure efficient rendering.",
      },
    },
  },
};
