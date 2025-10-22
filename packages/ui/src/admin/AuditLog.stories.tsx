import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { AuditLog } from "./AuditLog";
import type { AuditLogEntry } from "./AuditLog";

const meta: Meta<typeof AuditLog> = {
  title: "Admin/AuditLog",
  component: AuditLog,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Audit log component for tracking system events and user actions in the admin dashboard.",
      },
    },
  },
  argTypes: {
    entries: {
      control: "object",
      description: "Array of audit log entries",
    },
    loading: {
      control: "boolean",
      description: "Whether the audit log is loading",
    },
    emptyMessage: {
      control: "text",
      description: "Message to show when no entries are available",
    },
    showUserInfo: {
      control: "boolean",
      description: "Whether to show user information",
    },
    showTechnicalDetails: {
      control: "boolean",
      description: "Whether to show technical details like IP and user agent",
    },
    maxHeight: {
      control: "text",
      description: "Maximum height of the audit log container",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AuditLog>;

// Sample audit log entries
const sampleEntries: AuditLogEntry[] = [
  {
    id: "1",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    action: "login",
    resource: "User Session",
    userId: "user-123",
    userName: "john.doe@example.com",
    details: "Successful login from web browser",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    id: "2",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    action: "create",
    resource: "Audio Track",
    userId: "user-123",
    userName: "john.doe@example.com",
    details: "Created new audio track: 'Summer Vibes'",
    ipAddress: "192.168.1.100",
  },
  {
    id: "3",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    action: "update",
    resource: "User Profile",
    userId: "user-456",
    userName: "jane.smith@example.com",
    details: "Updated profile information and preferences",
    ipAddress: "192.168.1.101",
  },
  {
    id: "4",
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    action: "delete",
    resource: "Audio Track",
    userId: "user-789",
    userName: "admin@example.com",
    details: "Deleted audio track: 'Old Demo'",
    ipAddress: "192.168.1.102",
  },
  {
    id: "5",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    action: "error",
    resource: "File Upload",
    userId: "user-123",
    userName: "john.doe@example.com",
    details: "Upload failed: File size exceeds limit",
    ipAddress: "192.168.1.100",
  },
  {
    id: "6",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    action: "logout",
    resource: "User Session",
    userId: "user-456",
    userName: "jane.smith@example.com",
    details: "User logged out",
    ipAddress: "192.168.1.101",
  },
];

export const Default: Story = {
  args: {
    entries: sampleEntries,
    showUserInfo: true,
    showTechnicalDetails: false,
  },
};

export const WithTechnicalDetails: Story = {
  args: {
    entries: sampleEntries,
    showUserInfo: true,
    showTechnicalDetails: true,
  },
};

export const WithoutUserInfo: Story = {
  args: {
    entries: sampleEntries,
    showUserInfo: false,
    showTechnicalDetails: false,
  },
};

export const Loading: Story = {
  args: {
    entries: [],
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    entries: [],
    loading: false,
    emptyMessage: "No audit entries found for the selected time period",
  },
};

export const CustomEmptyMessage: Story = {
  args: {
    entries: [],
    loading: false,
    emptyMessage: "No activity recorded in the last 24 hours",
  },
};

export const Compact: Story = {
  args: {
    entries: sampleEntries.slice(0, 3),
    showUserInfo: true,
    showTechnicalDetails: false,
    maxHeight: "200px",
  },
};

export const LongList: Story = {
  args: {
    entries: [
      ...sampleEntries,
      ...sampleEntries.map((entry, index) => ({
        ...entry,
        id: `${entry.id}-copy-${index}`,
        timestamp: new Date(entry.timestamp.getTime() - 1000 * 60 * 60 * (index + 1)),
      })),
    ],
    showUserInfo: true,
    showTechnicalDetails: true,
    maxHeight: "300px",
  },
};

export const Interactive: Story = {
  render: () => {
    const [entries, setEntries] = useState(sampleEntries);
    const [showUserInfo, setShowUserInfo] = useState(true);
    const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

    const handleEntryClick = (entry: AuditLogEntry) => {
      alert(`Clicked on entry: ${entry.action} - ${entry.resource}`);
    };

    const addRandomEntry = () => {
      const actions = ["create", "update", "delete", "login", "logout", "error"] as const;
      const resources = ["Audio Track", "User Profile", "Settings", "File Upload"];
      const users = [
        { id: "user-123", name: "john.doe@example.com" },
        { id: "user-456", name: "jane.smith@example.com" },
        { id: "user-789", name: "admin@example.com" },
      ];

      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const randomResource = resources[Math.floor(Math.random() * resources.length)];
      const randomUser = users[Math.floor(Math.random() * users.length)];

      const newEntry: AuditLogEntry = {
        id: `entry-${Date.now()}`,
        timestamp: new Date(),
        action: randomAction,
        resource: randomResource,
        userId: randomUser.id,
        userName: randomUser.name,
        details: `Random ${randomAction} action on ${randomResource}`,
        ipAddress: "192.168.1.100",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      };

      setEntries([newEntry, ...entries]);
    };

    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showUserInfo}
              onChange={(e) => setShowUserInfo(e.target.checked)}
            />
            Show User Info
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showTechnicalDetails}
              onChange={(e) => setShowTechnicalDetails(e.target.checked)}
            />
            Show Technical Details
          </label>
          <button
            type="button"
            onClick={addRandomEntry}
            className="px-3 py-1 bg-primary-600 text-white rounded text-sm hover:bg-primary-700"
          >
            Add Random Entry
          </button>
        </div>

        <AuditLog
          entries={entries}
          showUserInfo={showUserInfo}
          showTechnicalDetails={showTechnicalDetails}
          onEntryClick={handleEntryClick}
        />
      </div>
    );
  },
};

export const DifferentActions: Story = {
  render: () => {
    const actionEntries: AuditLogEntry[] = [
      {
        id: "create-1",
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        action: "create",
        resource: "New Project",
        userId: "user-1",
        userName: "creator@example.com",
        details: "Created a new project workspace",
      },
      {
        id: "update-1",
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
        action: "update",
        resource: "Project Settings",
        userId: "user-1",
        userName: "creator@example.com",
        details: "Updated project configuration",
      },
      {
        id: "delete-1",
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        action: "delete",
        resource: "Old File",
        userId: "user-1",
        userName: "creator@example.com",
        details: "Removed outdated file from project",
      },
      {
        id: "login-1",
        timestamp: new Date(Date.now() - 1000 * 60 * 20),
        action: "login",
        resource: "User Session",
        userId: "user-2",
        userName: "collaborator@example.com",
        details: "Logged in from mobile device",
      },
      {
        id: "logout-1",
        timestamp: new Date(Date.now() - 1000 * 60 * 25),
        action: "logout",
        resource: "User Session",
        userId: "user-2",
        userName: "collaborator@example.com",
        details: "Logged out after session timeout",
      },
      {
        id: "error-1",
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        action: "error",
        resource: "File Upload",
        userId: "user-1",
        userName: "creator@example.com",
        details: "Upload failed due to network timeout",
      },
    ];

    return <AuditLog entries={actionEntries} showUserInfo={true} showTechnicalDetails={true} />;
  },
};

export const Accessibility: Story = {
  args: {
    entries: sampleEntries.slice(0, 3),
    showUserInfo: true,
    showTechnicalDetails: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the accessibility features of the AuditLog component, including proper keyboard navigation and screen reader support.",
      },
    },
  },
};
