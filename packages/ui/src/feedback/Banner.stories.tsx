import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../core/Button";
import { Banner } from "./Banner";

const meta: Meta<typeof Banner> = {
  title: "Feedback/Banner",
  component: Banner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["announcement", "warning", "maintenance"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    dismissible: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Announcement: Story = {
  args: {
    title: "New Feature Available",
    description: "Check out our latest feature that will improve your workflow.",
    variant: "announcement",
  },
};

export const Warning: Story = {
  args: {
    title: "System Maintenance",
    description: "Scheduled maintenance will occur tonight from 2-4 AM EST.",
    variant: "warning",
  },
};

export const Maintenance: Story = {
  args: {
    title: "Service Disruption",
    description: "We are currently experiencing issues with our payment system.",
    variant: "maintenance",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Banner
        size="sm"
        title="Small Banner"
        description="This is a small banner."
        variant="announcement"
      />
      <Banner
        size="md"
        title="Medium Banner"
        description="This is a medium banner."
        variant="warning"
      />
      <Banner
        size="lg"
        title="Large Banner"
        description="This is a large banner."
        variant="maintenance"
      />
    </div>
  ),
};

export const WithLink: Story = {
  render: () => (
    <Banner
      title="Learn More"
      description="Discover new features and improvements in our latest update."
      variant="announcement"
      link={{
        href: "https://example.com",
        text: "Read the changelog",
      }}
    />
  ),
};

export const WithAction: Story = {
  render: () => (
    <Banner
      title="Action Required"
      description="Please update your password to continue using the service."
      variant="warning"
      action={
        <Button size="sm" variant="outline">
          Update Password
        </Button>
      }
    />
  ),
};

export const Dismissible: Story = {
  render: () => {
    const [banners, setBanners] = useState([
      {
        id: 1,
        variant: "announcement" as const,
        title: "Dismissible Banner",
        description: "This banner can be dismissed.",
      },
      {
        id: 2,
        variant: "warning" as const,
        title: "Another Banner",
        description: "This is another dismissible banner.",
      },
    ]);

    const removeBanner = (id: number) => {
      setBanners((prev) => prev.filter((banner) => banner.id !== id));
    };

    return (
      <div className="space-y-4">
        {banners.map((banner) => (
          <Banner
            key={banner.id}
            title={banner.title}
            description={banner.description}
            variant={banner.variant}
            dismissible
            onClose={() => removeBanner(banner.id)}
          />
        ))}
      </div>
    );
  },
};

export const CustomIcon: Story = {
  render: () => (
    <Banner
      title="Custom Icon"
      description="This banner has a custom icon."
      icon={<span>🎉</span>}
      variant="announcement"
    />
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Banner
        title="Announcement Banner"
        description="This is an announcement banner."
        variant="announcement"
      />
      <Banner title="Warning Banner" description="This is a warning banner." variant="warning" />
      <Banner
        title="Maintenance Banner"
        description="This is a maintenance banner."
        variant="maintenance"
      />
    </div>
  ),
};

export const A11y: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Screen Reader Support</h4>
        <p className="text-sm text-fg-muted mb-4">
          Banners have proper ARIA roles and live regions for screen readers
        </p>
        <Banner
          title="Accessible Banner"
          description="This banner is properly announced to screen readers"
          variant="announcement"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Keyboard Navigation</h4>
        <p className="text-sm text-fg-muted mb-4">
          Dismissible banners have keyboard accessible close buttons
        </p>
        <Banner
          title="Keyboard Accessible"
          description="Press Tab to focus the close button, Enter to dismiss"
          variant="warning"
          dismissible
          onClose={() => {}}
        />
      </div>
    </div>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Long Content</h4>
        <Banner
          title="This is a very long title that might wrap to multiple lines and test the layout"
          description="This is a very long description that might wrap to multiple lines and test how the banner handles overflow and text wrapping in different scenarios."
          variant="announcement"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">No Title</h4>
        <Banner description="This banner has no title, just a description." variant="warning" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">No Description</h4>
        <Banner title="This banner has no description" variant="maintenance" />
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Custom Content</h4>
        <Banner variant="announcement">
          <div className="space-y-2">
            <h4 className="font-medium">Custom Banner Content</h4>
            <p className="text-sm text-fg-muted">This banner contains custom React content.</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                Action 1
              </Button>
              <Button size="sm" variant="outline">
                Action 2
              </Button>
            </div>
          </div>
        </Banner>
      </div>
    </div>
  ),
};
