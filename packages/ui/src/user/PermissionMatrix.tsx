import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import { cn } from "../utils/cn";

const permissionVariants = cva(
  "inline-flex items-center justify-center w-6 h-6 rounded text-xs font-medium transition-colors",
  {
    variants: {
      permission: {
        granted: "bg-success-100 text-success-700 border border-success-200",
        denied: "bg-error-100 text-error-700 border border-error-200",
        inherited: "bg-primary-100 text-primary-700 border border-primary-200",
        conditional: "bg-warning-100 text-warning-700 border border-warning-200",
        unknown: "bg-neutral-100 text-neutral-500 border border-neutral-200",
      },
      size: {
        sm: "w-5 h-5 text-xs",
        md: "w-6 h-6 text-xs",
        lg: "w-8 h-8 text-sm",
      },
    },
    defaultVariants: {
      permission: "unknown",
      size: "md",
    },
  },
);

export interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  level: "read" | "write" | "admin" | "system";
}

export interface RolePermission {
  roleId: string;
  permissionId: string;
  status: "granted" | "denied" | "inherited" | "conditional" | "unknown";
  grantedBy?: string;
  grantedAt?: Date;
  expiresAt?: Date;
}

export interface PermissionMatrixProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof permissionVariants> {
  permissions: Permission[];
  rolePermissions: RolePermission[];
  roles: Array<{ id: string; name: string; color?: string }>;
  selectedRole?: string;
  onPermissionChange?: (
    roleId: string,
    permissionId: string,
    status: RolePermission["status"],
  ) => void;
  showDescriptions?: boolean;
  showCategories?: boolean;
  compact?: boolean;
  editable?: boolean;
}

export const PermissionMatrix = React.forwardRef<HTMLDivElement, PermissionMatrixProps>(
  (
    {
      permissions,
      rolePermissions,
      roles,
      selectedRole,
      onPermissionChange,
      showDescriptions = true,
      showCategories = true,
      compact = false,
      editable = false,
      size,
      className,
      ...props
    },
    ref,
  ) => {
    const getPermissionStatus = (
      roleId: string,
      permissionId: string,
    ): RolePermission["status"] => {
      const rolePermission = rolePermissions.find(
        (rp) => rp.roleId === roleId && rp.permissionId === permissionId,
      );
      return rolePermission?.status || "unknown";
    };

    const getPermissionIcon = (status: RolePermission["status"]) => {
      switch (status) {
        case "granted":
          return "✓";
        case "denied":
          return "✗";
        case "inherited":
          return "↗";
        case "conditional":
          return "?";
        case "unknown":
          return "?";
        default:
          return "?";
      }
    };

    const handlePermissionClick = (roleId: string, permissionId: string) => {
      if (!editable || !onPermissionChange) return;

      const currentStatus = getPermissionStatus(roleId, permissionId);
      const statuses: RolePermission["status"][] = [
        "granted",
        "denied",
        "inherited",
        "conditional",
        "unknown",
      ];
      const currentIndex = statuses.indexOf(currentStatus);
      const nextIndex = (currentIndex + 1) % statuses.length;

      onPermissionChange(roleId, permissionId, statuses[nextIndex]);
    };

    const groupedPermissions = permissions.reduce(
      (acc, permission) => {
        if (!acc[permission.category]) {
          acc[permission.category] = [];
        }
        acc[permission.category].push(permission);
        return acc;
      },
      {} as Record<string, Permission[]>,
    );

    return (
      <div
        ref={ref}
        className={cn(
          "border border-border-default rounded-lg bg-bg-elevated overflow-hidden",
          className,
        )}
        {...props}
      >
        {/* Header */}
        <div className="px-4 py-3 border-b border-border-default bg-bg-subtle">
          <h3 className="text-sm font-medium text-fg-default">Permission Matrix</h3>
          <p className="text-xs text-fg-muted">
            {roles.length} roles × {permissions.length} permissions
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-subtle">
                <th className="text-left p-3 text-xs font-medium text-fg-muted">Permission</th>
                {roles.map((role) => (
                  <th
                    key={role.id}
                    className={cn(
                      "text-center p-3 text-xs font-medium",
                      selectedRole === role.id && "bg-primary-50 text-primary-700",
                    )}
                  >
                    {role.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
                <React.Fragment key={category}>
                  {showCategories && (
                    <tr className="bg-bg-subtle">
                      <td
                        colSpan={roles.length + 1}
                        className="px-3 py-2 text-xs font-medium text-fg-muted uppercase tracking-wide"
                      >
                        {category}
                      </td>
                    </tr>
                  )}
                  {categoryPermissions.map((permission) => (
                    <tr
                      key={permission.id}
                      className="border-b border-border-subtle last:border-b-0 hover:bg-bg-subtle"
                    >
                      <td className="p-3">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm font-medium text-fg-default">
                            {permission.name}
                          </span>
                          {showDescriptions && (
                            <span className="text-xs text-fg-muted line-clamp-2">
                              {permission.description}
                            </span>
                          )}
                          <span className="text-xs text-fg-muted">Level: {permission.level}</span>
                        </div>
                      </td>
                      {roles.map((role) => {
                        const status = getPermissionStatus(role.id, permission.id);
                        return (
                          <td key={role.id} className="text-center p-3">
                            <button
                              type="button"
                              onClick={() => handlePermissionClick(role.id, permission.id)}
                              disabled={!editable}
                              className={cn(
                                permissionVariants({ permission: status, size }),
                                editable && "cursor-pointer hover:opacity-80",
                                !editable && "cursor-default",
                              )}
                              aria-label={`${permission.name} for ${role.name}: ${status}`}
                              title={`${permission.name} for ${role.name}: ${status}`}
                            >
                              {getPermissionIcon(status)}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="px-4 py-3 border-t border-border-default bg-bg-subtle">
          <div className="flex items-center gap-4 text-xs text-fg-muted">
            <div className="flex items-center gap-1">
              <span className={cn(permissionVariants({ permission: "granted", size: "sm" }))}>
                ✓
              </span>
              <span>Granted</span>
            </div>
            <div className="flex items-center gap-1">
              <span className={cn(permissionVariants({ permission: "denied", size: "sm" }))}>
                ✗
              </span>
              <span>Denied</span>
            </div>
            <div className="flex items-center gap-1">
              <span className={cn(permissionVariants({ permission: "inherited", size: "sm" }))}>
                ↗
              </span>
              <span>Inherited</span>
            </div>
            <div className="flex items-center gap-1">
              <span className={cn(permissionVariants({ permission: "conditional", size: "sm" }))}>
                ?
              </span>
              <span>Conditional</span>
            </div>
            <div className="flex items-center gap-1">
              <span className={cn(permissionVariants({ permission: "unknown", size: "sm" }))}>
                ?
              </span>
              <span>Unknown</span>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

PermissionMatrix.displayName = "PermissionMatrix";
