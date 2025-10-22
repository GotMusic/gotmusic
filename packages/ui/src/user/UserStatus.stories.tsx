import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { UserStatus } from "./UserStatus";

const meta: Meta<typeof UserStatus> = {
  title: "User/UserStatus",
  component: UserStatus,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "User status component for displaying and managing user account status with visual indicators and timestamps.",
      },
    },
  },
  argTypes: {
    status: {
      control: "select",
      options: ["active", "inactive", "pending", "suspended", "banned", "offline"],
      description: "The user status type",
    },
    displayName: {
      control: "text",
      description: "Custom display name for the status",
    },
    description: {
      control: "text",
      description: "Custom description for the status",
    },
    lastSeen: {
      control: "date",
      description: "When the user was last seen",
    },
    showLastSeen: {
      control: "boolean",
      description: "Whether to show the last seen timestamp",
    },
    showDescription: {
      control: "boolean",
      description: "Whether to show the status description",
    },
    showIcon: {
      control: "boolean",
      description: "Whether to show the status icon",
    },
    editable: {
      control: "boolean",
      description: "Whether the status can be changed by clicking",
    },
    compact: {
      control: "boolean",
      description: "Whether to use compact layout",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the status badge",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof UserStatus>;

export const Default: Story = {
  args: {
    status: "active",
    showDescription: false,
    showIcon: true,
    showLastSeen: true,
    lastSeen: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
  },
};

export const Active: Story = {
  args: {
    status: "active",
    showDescription: true,
    showIcon: true,
    showLastSeen: true,
    lastSeen: new Date(Date.now() - 1000 * 60 * 2), // 2 minutes ago
  },
};

export const Inactive: Story = {
  args: {
    status: "inactive",
    showDescription: true,
    showIcon: true,
    showLastSeen: true,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
};

export const Pending: Story = {
  args: {
    status: "pending",
    showDescription: true,
    showIcon: true,
    showLastSeen: false,
  },
};

export const Suspended: Story = {
  args: {
    status: "suspended",
    showDescription: true,
    showIcon: true,
    showLastSeen: true,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
  },
};

export const Banned: Story = {
  args: {
    status: "banned",
    showDescription: true,
    showIcon: true,
    showLastSeen: true,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
  },
};

export const Offline: Story = {
  args: {
    status: "offline",
    showDescription: true,
    showIcon: true,
    showLastSeen: true,
    lastSeen: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
};

export const Editable: Story = {
  args: {
    status: "active",
    editable: true,
    showDescription: true,
    showIcon: true,
    showLastSeen: true,
    lastSeen: new Date(Date.now() - 1000 * 60 * 5),
  },
};

export const Compact: Story = {
  args: {
    status: "active",
    compact: true,
    showIcon: true,
    showLastSeen: false,
  },
};

export const WithoutIcon: Story = {
  args: {
    status: "active",
    showIcon: false,
    showDescription: true,
    showLastSeen: true,
    lastSeen: new Date(Date.now() - 1000 * 60 * 10),
  },
};

export const WithoutDescription: Story = {
  args: {
    status: "inactive",
    showDescription: false,
    showIcon: true,
    showLastSeen: true,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
};

export const WithoutLastSeen: Story = {
  args: {
    status: "pending",
    showDescription: true,
    showIcon: true,
    showLastSeen: false,
  },
};

export const CustomDisplayName: Story = {
  args: {
    status: "active",
    displayName: "Online",
    description: "User is currently online and active",
    showDescription: true,
    showIcon: true,
    showLastSeen: true,
    lastSeen: new Date(Date.now() - 1000 * 30), // 30 seconds ago
  },
};

export const SmallSize: Story = {
  args: {
    status: "active",
    size: "sm",
    showDescription: true,
    showIcon: true,
    showLastSeen: true,
    lastSeen: new Date(Date.now() - 1000 * 60 * 5),
  },
};

export const LargeSize: Story = {
  args: {
    status: "inactive",
    size: "lg",
    showDescription: true,
    showIcon: true,
    showLastSeen: true,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 3),
  },
};

export const Interactive: Story = {
  render: () => {
    const [status, setStatus] = useState<
      "active" | "inactive" | "pending" | "suspended" | "banned" | "offline"
    >("active");

    return (
      <div className="space-y-4">
        <UserStatus
          status={status}
          editable={true}
          showDescription={true}
          showIcon={true}
          showLastSeen={true}
          lastSeen={new Date(Date.now() - 1000 * 60 * 5)}
          onChange={setStatus}
        />

        <div className="text-sm text-fg-muted">
          Current status: <strong>{status}</strong>
        </div>
      </div>
    );
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div className="space-y-3">
      <UserStatus
        status="active"
        showDescription={true}
        showIcon={true}
        showLastSeen={true}
        lastSeen={new Date(Date.now() - 1000 * 60 * 2)}
      />
      <UserStatus
        status="inactive"
        showDescription={true}
        showIcon={true}
        showLastSeen={true}
        lastSeen={new Date(Date.now() - 1000 * 60 * 60 * 24)}
      />
      <UserStatus status="pending" showDescription={true} showIcon={true} showLastSeen={false} />
      <UserStatus
        status="suspended"
        showDescription={true}
        showIcon={true}
        showLastSeen={true}
        lastSeen={new Date(Date.now() - 1000 * 60 * 60 * 48)}
      />
      <UserStatus
        status="banned"
        showDescription={true}
        showIcon={true}
        showLastSeen={true}
        lastSeen={new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)}
      />
      <UserStatus
        status="offline"
        showDescription={true}
        showIcon={true}
        showLastSeen={true}
        lastSeen={new Date(Date.now() - 1000 * 60 * 30)}
      />
    </div>
  ),
};

export const EditableStatuses: Story = {
  render: () => {
    const [statuses, setStatuses] = useState<
      Array<"active" | "inactive" | "pending" | "suspended" | "banned" | "offline">
    >(["active", "inactive", "pending", "suspended", "banned", "offline"]);

    const handleStatusChange = (
      index: number,
      newStatus: "active" | "inactive" | "pending" | "suspended" | "banned" | "offline",
    ) => {
      const newStatuses = [...statuses];
      newStatuses[index] = newStatus;
      setStatuses(newStatuses);
    };

    return (
      <div className="space-y-3">
        {statuses.map((status, index) => (
          <UserStatus
            key={`${status}-${Date.now()}-${index}`}
            status={status}
            editable={true}
            showDescription={true}
            showIcon={true}
            showLastSeen={true}
            lastSeen={new Date(Date.now() - 1000 * 60 * (index + 1) * 5)}
            onChange={(newStatus) => handleStatusChange(index, newStatus)}
          />
        ))}
      </div>
    );
  },
};

export const CompactStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <UserStatus status="active" compact={true} showIcon={true} showLastSeen={false} />
      <UserStatus status="inactive" compact={true} showIcon={true} showLastSeen={false} />
      <UserStatus status="pending" compact={true} showIcon={true} showLastSeen={false} />
      <UserStatus status="suspended" compact={true} showIcon={true} showLastSeen={false} />
      <UserStatus status="banned" compact={true} showIcon={true} showLastSeen={false} />
      <UserStatus status="offline" compact={true} showIcon={true} showLastSeen={false} />
    </div>
  ),
};

export const Accessibility: Story = {
  args: {
    status: "active",
    showDescription: true,
    showIcon: true,
    showLastSeen: true,
    lastSeen: new Date(Date.now() - 1000 * 60 * 5),
    editable: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the accessibility features of the UserStatus component, including proper ARIA labels and keyboard navigation.",
      },
    },
  },
};
