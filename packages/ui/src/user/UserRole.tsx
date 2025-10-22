import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import { cn } from "../utils/cn";

const userRoleVariants = cva(
  "inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium",
  {
    variants: {
      role: {
        admin: "bg-error-100 text-error-700 border border-error-200",
        moderator: "bg-warning-100 text-warning-700 border border-warning-200",
        user: "bg-primary-100 text-primary-700 border border-primary-200",
        guest: "bg-neutral-100 text-neutral-700 border border-neutral-200",
        banned: "bg-neutral-200 text-neutral-500 border border-neutral-300",
      },
      size: {
        sm: "px-1.5 py-0.5 text-xs",
        md: "px-2 py-1 text-xs",
        lg: "px-3 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      role: "user",
      size: "md",
    },
  },
);

export interface UserRoleProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "role">,
    VariantProps<typeof userRoleVariants> {
  role: "admin" | "moderator" | "user" | "guest" | "banned";
  displayName?: string;
  description?: string;
  editable?: boolean;
  onChange?: (newRole: UserRoleProps["role"]) => void;
  showDescription?: boolean;
  showIcon?: boolean;
}

export const UserRole = React.forwardRef<HTMLDivElement, UserRoleProps>(
  (
    {
      role,
      displayName,
      description,
      editable = false,
      onChange,
      showDescription = false,
      showIcon = true,
      size,
      className,
      ...props
    },
    ref,
  ) => {
    const getRoleIcon = (roleType: UserRoleProps["role"]) => {
      switch (roleType) {
        case "admin":
          return "👑";
        case "moderator":
          return "🛡️";
        case "user":
          return "👤";
        case "guest":
          return "👥";
        case "banned":
          return "🚫";
        default:
          return "👤";
      }
    };

    const getRoleDisplayName = (roleType: UserRoleProps["role"]) => {
      if (displayName) return displayName;

      switch (roleType) {
        case "admin":
          return "Administrator";
        case "moderator":
          return "Moderator";
        case "user":
          return "User";
        case "guest":
          return "Guest";
        case "banned":
          return "Banned";
        default:
          return "User";
      }
    };

    const getRoleDescription = (roleType: UserRoleProps["role"]) => {
      if (description) return description;

      switch (roleType) {
        case "admin":
          return "Full system access and administrative privileges";
        case "moderator":
          return "Content moderation and user management capabilities";
        case "user":
          return "Standard user with basic platform access";
        case "guest":
          return "Limited access for unregistered users";
        case "banned":
          return "Account suspended or banned from platform";
        default:
          return "Standard user access";
      }
    };

    const handleClick = () => {
      if (editable && onChange) {
        // Cycle through roles (for demo purposes)
        const roles: UserRoleProps["role"][] = ["admin", "moderator", "user", "guest", "banned"];
        const currentIndex = roles.indexOf(role);
        const nextIndex = (currentIndex + 1) % roles.length;
        onChange(roles[nextIndex]);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-2 p-3 rounded-lg border bg-bg-elevated",
          editable && "cursor-pointer hover:bg-bg-subtle transition-colors",
          className,
        )}
        onClick={handleClick}
        {...props}
      >
        <div className="flex items-center gap-2">
          {showIcon && (
            <span className="text-sm" aria-hidden="true">
              {getRoleIcon(role)}
            </span>
          )}
          <span className={cn(userRoleVariants({ role, size }))}>{getRoleDisplayName(role)}</span>
        </div>

        {showDescription && (
          <div className="flex-1 min-w-0">
            <p className="text-sm text-fg-muted line-clamp-2">{getRoleDescription(role)}</p>
          </div>
        )}

        {editable && (
          <div className="flex items-center gap-1 text-xs text-fg-muted">
            <span>Click to change</span>
            <span>↻</span>
          </div>
        )}
      </div>
    );
  },
);

UserRole.displayName = "UserRole";
