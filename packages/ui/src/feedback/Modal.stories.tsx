import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../core/Button";
import { Modal } from "./Modal";

const meta: Meta<typeof Modal> = {
  title: "Feedback/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl", "2xl", "fullscreen"],
    },
    open: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    title: "Modal Title",
    description: "This is a modal description.",
    children: "Modal content goes here.",
  },
};

export const Sizes: Story = {
  render: () => {
    const [openSize, setOpenSize] = useState<string | null>(null);

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={() => setOpenSize("sm")}>Small</Button>
          <Button onClick={() => setOpenSize("md")}>Medium</Button>
          <Button onClick={() => setOpenSize("lg")}>Large</Button>
          <Button onClick={() => setOpenSize("xl")}>Extra Large</Button>
          <Button onClick={() => setOpenSize("2xl")}>2X Large</Button>
          <Button onClick={() => setOpenSize("fullscreen")}>Fullscreen</Button>
        </div>

        {openSize && (
          <Modal
            open={true}
            size={openSize as "sm" | "md" | "lg" | "xl" | "2xl" | "fullscreen"}
            title={`${openSize} Modal`}
            description={`This is a ${openSize} modal.`}
            onClose={() => setOpenSize(null)}
          >
            <div className="space-y-4">
              <p>This is the modal content for a {openSize} modal.</p>
              <div className="flex gap-2">
                <Button>Primary Action</Button>
                <Button variant="outline">Secondary Action</Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    );
  },
};

export const WithoutTitle: Story = {
  render: () => (
    <Modal open={true} onClose={() => {}}>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Custom Header</h3>
        <p>This modal has no title prop, just custom content.</p>
        <div className="flex gap-2">
          <Button>Save</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </div>
    </Modal>
  ),
};

export const WithoutCloseButton: Story = {
  render: () => (
    <Modal
      open={true}
      title="No Close Button"
      description="This modal cannot be closed with the X button."
      showCloseButton={false}
      onClose={() => {}}
    >
      <div className="space-y-4">
        <p>This modal requires action to close.</p>
        <div className="flex gap-2">
          <Button>Confirm</Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </div>
    </Modal>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="space-y-4">
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

        <Modal
          open={isOpen}
          title="Interactive Modal"
          description="This modal can be opened and closed."
          onClose={() => setIsOpen(false)}
        >
          <div className="space-y-4">
            <p>This is an interactive modal that responds to user actions.</p>
            <div className="flex gap-2">
              <Button onClick={() => setIsOpen(false)}>Close Modal</Button>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  },
};

export const ComplexContent: Story = {
  render: () => (
    <Modal
      open={true}
      title="Complex Modal"
      description="This modal contains complex content with forms and multiple sections."
      onClose={() => {}}
      size="lg"
    >
      <div className="space-y-6">
        <div>
          <h4 className="font-medium mb-2">User Information</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="first-name" className="block text-sm font-medium mb-1">
                First Name
              </label>
              <input
                id="first-name"
                type="text"
                className="w-full px-3 py-2 border border-border-default rounded-md"
                placeholder="Enter first name"
              />
            </div>
            <div>
              <label htmlFor="last-name" className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                id="last-name"
                type="text"
                className="w-full px-3 py-2 border border-border-default rounded-md"
                placeholder="Enter last name"
              />
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Preferences</h4>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Email notifications
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              SMS notifications
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t border-border-subtle">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </Modal>
  ),
};

export const A11y: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Keyboard Navigation</h4>
        <p className="text-sm text-fg-muted mb-4">
          Press Tab to navigate, Escape to close, Enter to activate buttons
        </p>
        <Modal
          open={true}
          title="Keyboard Accessible Modal"
          description="This modal supports keyboard navigation"
          onClose={() => {}}
        >
          <div className="space-y-4">
            <p>Use Tab to navigate between elements, Escape to close.</p>
            <div className="flex gap-2">
              <Button>First Button</Button>
              <Button variant="outline">Second Button</Button>
            </div>
          </div>
        </Modal>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Screen Reader Support</h4>
        <p className="text-sm text-fg-muted mb-4">
          Modal has proper ARIA attributes for screen readers
        </p>
        <Modal
          open={true}
          title="Screen Reader Friendly"
          description="This modal is properly labeled for screen readers"
          onClose={() => {}}
        >
          <p>Screen readers will announce the title and description.</p>
        </Modal>
      </div>
    </div>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Long Content</h4>
        <Modal
          open={true}
          title="Modal with Long Content"
          description="This modal contains a lot of content to test scrolling behavior"
          onClose={() => {}}
          size="lg"
        >
          <div className="space-y-4">
            {Array.from({ length: 20 }, (_, i) => {
              const content = `This is paragraph ${i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;
              return (
                <p key={content} className="text-sm">
                  {content}
                </p>
              );
            })}
          </div>
        </Modal>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">No Description</h4>
        <Modal open={true} title="Modal without Description" onClose={() => {}}>
          <p>This modal has no description prop.</p>
        </Modal>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Fullscreen Modal</h4>
        <Modal
          open={true}
          title="Fullscreen Modal"
          description="This modal takes up the entire screen"
          size="fullscreen"
          onClose={() => {}}
        >
          <div className="h-full flex items-center justify-center">
            <p>This is a fullscreen modal.</p>
          </div>
        </Modal>
      </div>
    </div>
  ),
};
