import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { PermissionMatrix } from "./PermissionMatrix";
import type { Permission, RolePermission } from "./PermissionMatrix";

const meta: Meta<typeof PermissionMatrix> = {
  title: "User/PermissionMatrix",
  component: PermissionMatrix,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Permission matrix component for managing role-based permissions with visual indicators and interactive controls.",
      },
    },
  },
  argTypes: {
    permissions: {
      control: "object",
      description: "Array of permissions to display",
    },
    rolePermissions: {
      control: "object",
      description: "Array of role-permission mappings",
    },
    roles: {
      control: "object",
      description: "Array of roles",
    },
    selectedRole: {
      control: "text",
      description: "Currently selected role ID",
    },
    showDescriptions: {
      control: "boolean",
      description: "Whether to show permission descriptions",
    },
    showCategories: {
      control: "boolean",
      description: "Whether to show permission categories",
    },
    compact: {
      control: "boolean",
      description: "Whether to use compact layout",
    },
    editable: {
      control: "boolean",
      description: "Whether permissions can be edited",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PermissionMatrix>;

// Sample data
const samplePermissions: Permission[] = [
  {
    id: "read-users",
    name: "Read Users",
    description: "View user profiles and basic information",
    category: "User Management",
    level: "read",
  },
  {
    id: "write-users",
    name: "Edit Users",
    description: "Modify user profiles and settings",
    category: "User Management",
    level: "write",
  },
  {
    id: "delete-users",
    name: "Delete Users",
    description: "Remove users from the system",
    category: "User Management",
    level: "admin",
  },
  {
    id: "read-content",
    name: "Read Content",
    description: "View posts, comments, and other content",
    category: "Content",
    level: "read",
  },
  {
    id: "write-content",
    name: "Create Content",
    description: "Create new posts and comments",
    category: "Content",
    level: "write",
  },
  {
    id: "moderate-content",
    name: "Moderate Content",
    description: "Review and moderate user-generated content",
    category: "Content",
    level: "admin",
  },
  {
    id: "system-settings",
    name: "System Settings",
    description: "Configure system-wide settings",
    category: "System",
    level: "system",
  },
  {
    id: "view-analytics",
    name: "View Analytics",
    description: "Access system analytics and reports",
    category: "Analytics",
    level: "read",
  },
];

const sampleRoles = [
  { id: "admin", name: "Administrator" },
  { id: "moderator", name: "Moderator" },
  { id: "user", name: "User" },
  { id: "guest", name: "Guest" },
];

const sampleRolePermissions: RolePermission[] = [
  // Admin permissions
  { roleId: "admin", permissionId: "read-users", status: "granted" },
  { roleId: "admin", permissionId: "write-users", status: "granted" },
  { roleId: "admin", permissionId: "delete-users", status: "granted" },
  { roleId: "admin", permissionId: "read-content", status: "granted" },
  { roleId: "admin", permissionId: "write-content", status: "granted" },
  { roleId: "admin", permissionId: "moderate-content", status: "granted" },
  { roleId: "admin", permissionId: "system-settings", status: "granted" },
  { roleId: "admin", permissionId: "view-analytics", status: "granted" },

  // Moderator permissions
  { roleId: "moderator", permissionId: "read-users", status: "granted" },
  { roleId: "moderator", permissionId: "write-users", status: "conditional" },
  { roleId: "moderator", permissionId: "delete-users", status: "denied" },
  { roleId: "moderator", permissionId: "read-content", status: "granted" },
  { roleId: "moderator", permissionId: "write-content", status: "granted" },
  { roleId: "moderator", permissionId: "moderate-content", status: "granted" },
  { roleId: "moderator", permissionId: "system-settings", status: "denied" },
  { roleId: "moderator", permissionId: "view-analytics", status: "conditional" },

  // User permissions
  { roleId: "user", permissionId: "read-users", status: "conditional" },
  { roleId: "user", permissionId: "write-users", status: "denied" },
  { roleId: "user", permissionId: "delete-users", status: "denied" },
  { roleId: "user", permissionId: "read-content", status: "granted" },
  { roleId: "user", permissionId: "write-content", status: "granted" },
  { roleId: "user", permissionId: "moderate-content", status: "denied" },
  { roleId: "user", permissionId: "system-settings", status: "denied" },
  { roleId: "user", permissionId: "view-analytics", status: "denied" },

  // Guest permissions
  { roleId: "guest", permissionId: "read-users", status: "denied" },
  { roleId: "guest", permissionId: "write-users", status: "denied" },
  { roleId: "guest", permissionId: "delete-users", status: "denied" },
  { roleId: "guest", permissionId: "read-content", status: "conditional" },
  { roleId: "guest", permissionId: "write-content", status: "denied" },
  { roleId: "guest", permissionId: "moderate-content", status: "denied" },
  { roleId: "guest", permissionId: "system-settings", status: "denied" },
  { roleId: "guest", permissionId: "view-analytics", status: "denied" },
];

export const Default: Story = {
  args: {
    permissions: samplePermissions,
    rolePermissions: sampleRolePermissions,
    roles: sampleRoles,
    showDescriptions: true,
    showCategories: true,
    editable: false,
  },
};

export const Editable: Story = {
  args: {
    permissions: samplePermissions,
    rolePermissions: sampleRolePermissions,
    roles: sampleRoles,
    showDescriptions: true,
    showCategories: true,
    editable: true,
  },
};

export const WithoutDescriptions: Story = {
  args: {
    permissions: samplePermissions,
    rolePermissions: sampleRolePermissions,
    roles: sampleRoles,
    showDescriptions: false,
    showCategories: true,
    editable: false,
  },
};

export const WithoutCategories: Story = {
  args: {
    permissions: samplePermissions,
    rolePermissions: sampleRolePermissions,
    roles: sampleRoles,
    showDescriptions: true,
    showCategories: false,
    editable: false,
  },
};

export const Compact: Story = {
  args: {
    permissions: samplePermissions.slice(0, 4),
    rolePermissions: sampleRolePermissions.slice(0, 16),
    roles: sampleRoles,
    showDescriptions: false,
    showCategories: false,
    editable: false,
    compact: true,
  },
};

export const SelectedRole: Story = {
  args: {
    permissions: samplePermissions,
    rolePermissions: sampleRolePermissions,
    roles: sampleRoles,
    selectedRole: "moderator",
    showDescriptions: true,
    showCategories: true,
    editable: false,
  },
};

export const Interactive: Story = {
  render: () => {
    const [rolePermissions, setRolePermissions] = useState<RolePermission[]>(sampleRolePermissions);

    const handlePermissionChange = (
      roleId: string,
      permissionId: string,
      status: RolePermission["status"],
    ) => {
      setRolePermissions((prev) => {
        const existing = prev.find(
          (rp) => rp.roleId === roleId && rp.permissionId === permissionId,
        );
        if (existing) {
          return prev.map((rp) =>
            rp.roleId === roleId && rp.permissionId === permissionId ? { ...rp, status } : rp,
          );
        }
        return [...prev, { roleId, permissionId, status }];
      });
    };

    return (
      <div className="space-y-4">
        <div className="text-sm text-fg-muted">
          Click on permission cells to change their status. Status cycles through: granted → denied
          → inherited → conditional → unknown
        </div>

        <PermissionMatrix
          permissions={samplePermissions}
          rolePermissions={rolePermissions}
          roles={sampleRoles}
          showDescriptions={true}
          showCategories={true}
          editable={true}
          onPermissionChange={handlePermissionChange}
        />
      </div>
    );
  },
};

export const LargeDataset: Story = {
  args: {
    permissions: [
      ...samplePermissions,
      {
        id: "manage-roles",
        name: "Manage Roles",
        description: "Create and modify user roles",
        category: "User Management",
        level: "admin",
      },
      {
        id: "view-logs",
        name: "View Logs",
        description: "Access system logs and audit trails",
        category: "System",
        level: "admin",
      },
      {
        id: "export-data",
        name: "Export Data",
        description: "Export user and system data",
        category: "System",
        level: "admin",
      },
    ],
    rolePermissions: [
      ...sampleRolePermissions,
      { roleId: "admin", permissionId: "manage-roles", status: "granted" },
      { roleId: "admin", permissionId: "view-logs", status: "granted" },
      { roleId: "admin", permissionId: "export-data", status: "granted" },
      { roleId: "moderator", permissionId: "manage-roles", status: "denied" },
      { roleId: "moderator", permissionId: "view-logs", status: "conditional" },
      { roleId: "moderator", permissionId: "export-data", status: "denied" },
      { roleId: "user", permissionId: "manage-roles", status: "denied" },
      { roleId: "user", permissionId: "view-logs", status: "denied" },
      { roleId: "user", permissionId: "export-data", status: "denied" },
      { roleId: "guest", permissionId: "manage-roles", status: "denied" },
      { roleId: "guest", permissionId: "view-logs", status: "denied" },
      { roleId: "guest", permissionId: "export-data", status: "denied" },
    ],
    roles: sampleRoles,
    showDescriptions: true,
    showCategories: true,
    editable: false,
  },
};

export const Accessibility: Story = {
  args: {
    permissions: samplePermissions,
    rolePermissions: sampleRolePermissions,
    roles: sampleRoles,
    showDescriptions: true,
    showCategories: true,
    editable: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the accessibility features of the PermissionMatrix component, including proper ARIA labels and keyboard navigation.",
      },
    },
  },
};
