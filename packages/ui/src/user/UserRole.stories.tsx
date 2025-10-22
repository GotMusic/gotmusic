import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { UserRole } from "./UserRole";

const meta: Meta<typeof UserRole> = {
  title: "User/UserRole",
  component: UserRole,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "User role component for displaying and managing user roles with visual indicators and descriptions.",
      },
    },
  },
  argTypes: {
    role: {
      control: "select",
      options: ["admin", "moderator", "user", "guest", "banned"],
      description: "The user role type",
    },
    displayName: {
      control: "text",
      description: "Custom display name for the role",
    },
    description: {
      control: "text",
      description: "Custom description for the role",
    },
    editable: {
      control: "boolean",
      description: "Whether the role can be changed by clicking",
    },
    showDescription: {
      control: "boolean",
      description: "Whether to show the role description",
    },
    showIcon: {
      control: "boolean",
      description: "Whether to show the role icon",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the role badge",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof UserRole>;

export const Default: Story = {
  args: {
    role: "user",
    showDescription: false,
    showIcon: true,
  },
};

export const Admin: Story = {
  args: {
    role: "admin",
    showDescription: true,
    showIcon: true,
  },
};

export const Moderator: Story = {
  args: {
    role: "moderator",
    showDescription: true,
    showIcon: true,
  },
};

export const Guest: Story = {
  args: {
    role: "guest",
    showDescription: true,
    showIcon: true,
  },
};

export const Banned: Story = {
  args: {
    role: "banned",
    showDescription: true,
    showIcon: true,
  },
};

export const Editable: Story = {
  args: {
    role: "user",
    editable: true,
    showDescription: true,
    showIcon: true,
  },
};

export const WithoutIcon: Story = {
  args: {
    role: "admin",
    showIcon: false,
    showDescription: true,
  },
};

export const WithoutDescription: Story = {
  args: {
    role: "moderator",
    showIcon: true,
    showDescription: false,
  },
};

export const CustomDisplayName: Story = {
  args: {
    role: "user",
    displayName: "Premium User",
    description: "User with premium subscription benefits",
    showDescription: true,
    showIcon: true,
  },
};

export const SmallSize: Story = {
  args: {
    role: "admin",
    size: "sm",
    showDescription: true,
    showIcon: true,
  },
};

export const LargeSize: Story = {
  args: {
    role: "moderator",
    size: "lg",
    showDescription: true,
    showIcon: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [role, setRole] = useState<"admin" | "moderator" | "user" | "guest" | "banned">("user");

    return (
      <div className="space-y-4">
        <UserRole
          role={role}
          editable={true}
          showDescription={true}
          showIcon={true}
          onChange={setRole}
        />

        <div className="text-sm text-fg-muted">
          Current role: <strong>{role}</strong>
        </div>
      </div>
    );
  },
};

export const AllRoles: Story = {
  render: () => (
    <div className="space-y-3">
      <UserRole showDescription={true} showIcon={true} />
      <UserRole showDescription={true} showIcon={true} />
      <UserRole showDescription={true} showIcon={true} />
      <UserRole showDescription={true} showIcon={true} />
      <UserRole showDescription={true} showIcon={true} />
    </div>
  ),
};

export const EditableRoles: Story = {
  render: () => {
    const [roles, setRoles] = useState<Array<"admin" | "moderator" | "user" | "guest" | "banned">>([
      "admin",
      "moderator",
      "user",
      "guest",
      "banned",
    ]);

    const handleRoleChange = (
      index: number,
      newRole: "admin" | "moderator" | "user" | "guest" | "banned",
    ) => {
      const newRoles = [...roles];
      newRoles[index] = newRole;
      setRoles(newRoles);
    };

    return (
      <div className="space-y-3">
        {roles.map((role, index) => (
          <UserRole
            key={`${role}-${Date.now()}-${index}`}
            role={role}
            editable={true}
            showDescription={true}
            showIcon={true}
            onChange={(newRole) => handleRoleChange(index, newRole)}
          />
        ))}
      </div>
    );
  },
};

export const Accessibility: Story = {
  args: {
    role: "admin",
    showDescription: true,
    showIcon: true,
    editable: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the accessibility features of the UserRole component, including proper ARIA labels and keyboard navigation.",
      },
    },
  },
};
