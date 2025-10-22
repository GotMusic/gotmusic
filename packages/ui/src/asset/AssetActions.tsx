"use client";

import { forwardRef, useState } from "react";
import {
  Archive,
  Copy,
  Edit,
  Globe,
  MoreHorizontal,
  MoreVertical,
  Trash2,
  Unarchive,
} from "../icons";
import { type VariantProps, cn, cva } from "../utils";

export type AssetActionType = "edit" | "delete" | "publish" | "archive" | "unarchive" | "duplicate";

export interface AssetAction {
  type: AssetActionType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isDestructive?: boolean;
  isDisabled?: boolean;
  onClick: () => void;
}

export interface AssetActionsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof assetActionsVariants> {
  actions: AssetAction[];
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  trigger?: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

const assetActionsVariants = cva("relative inline-flex items-center", {
  variants: {
    variant: {
      default: "",
      compact: "text-sm",
      minimal: "text-xs",
    },
    size: {
      sm: "h-8",
      md: "h-10",
      lg: "h-12",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

const getActionIcon = (type: AssetActionType) => {
  switch (type) {
    case "edit":
      return Edit;
    case "delete":
      return Trash2;
    case "publish":
      return Globe;
    case "archive":
      return Archive;
    case "unarchive":
      return Unarchive;
    case "duplicate":
      return Copy;
    default:
      return MoreHorizontal;
  }
};

const getActionLabel = (type: AssetActionType) => {
  switch (type) {
    case "edit":
      return "Edit";
    case "delete":
      return "Delete";
    case "publish":
      return "Publish";
    case "archive":
      return "Archive";
    case "unarchive":
      return "Unarchive";
    case "duplicate":
      return "Duplicate";
    default:
      return "Action";
  }
};

const AssetActions = forwardRef<HTMLDivElement, AssetActionsProps>(
  (
    {
      className,
      actions,
      isOpen: controlledIsOpen,
      onToggle,
      trigger,
      placement = "bottom",
      align = "end",
      variant,
      size,
      ...props
    },
    ref,
  ) => {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const isOpen = controlledIsOpen ?? internalIsOpen;

    const handleToggle = () => {
      const newIsOpen = !isOpen;
      setInternalIsOpen(newIsOpen);
      onToggle?.(newIsOpen);
    };

    const handleActionClick = (action: AssetAction) => {
      if (!action.isDisabled) {
        action.onClick();
        setInternalIsOpen(false);
        onToggle?.(false);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setInternalIsOpen(false);
        onToggle?.(false);
      }
    };

    const getPlacementClasses = () => {
      const baseClasses = "absolute z-50 min-w-48";

      switch (placement) {
        case "top":
          return `${baseClasses} bottom-full mb-2`;
        case "bottom":
          return `${baseClasses} top-full mt-2`;
        case "left":
          return `${baseClasses} right-full mr-2`;
        case "right":
          return `${baseClasses} left-full ml-2`;
        default:
          return `${baseClasses} top-full mt-2`;
      }
    };

    const getAlignClasses = () => {
      switch (align) {
        case "start":
          return "left-0";
        case "center":
          return "left-1/2 -translate-x-1/2";
        case "end":
          return "right-0";
        default:
          return "right-0";
      }
    };

    return (
      <div
        ref={ref}
        className={cn(assetActionsVariants({ variant, size }), className)}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {/* Trigger */}
        <button
          type="button"
          onClick={handleToggle}
          className="flex items-center justify-center w-full h-full rounded-md bg-bg-elevated border border-border-subtle hover:bg-bg-hover focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-colors"
          aria-label="Asset actions"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {trigger || <MoreVertical className="w-4 h-4 text-fg-muted" />}
        </button>

        {/* Actions Menu */}
        {isOpen && (
          <div
            className={cn(
              getPlacementClasses(),
              getAlignClasses(),
              "bg-bg-elevated border border-border-subtle rounded-lg shadow-lg py-1",
            )}
            role="menu"
            aria-orientation="vertical"
          >
            {actions.map((action, index) => {
              const Icon = action.icon;
              const isDisabled = action.isDisabled;

              return (
                <button
                  key={`action-${action.type}-${index}`}
                  type="button"
                  onClick={() => handleActionClick(action)}
                  disabled={isDisabled}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 text-sm text-left transition-colors",
                    "hover:bg-bg-hover focus:bg-bg-hover focus:outline-none",
                    isDisabled && "opacity-50 cursor-not-allowed",
                    action.isDestructive && "text-semantic-danger hover:text-semantic-danger",
                  )}
                  role="menuitem"
                  aria-disabled={isDisabled}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="flex-1">{action.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => {
              setInternalIsOpen(false);
              onToggle?.(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setInternalIsOpen(false);
                onToggle?.(false);
              }
            }}
            aria-hidden="true"
          />
        )}
      </div>
    );
  },
);

AssetActions.displayName = "AssetActions";

export { AssetActions };
