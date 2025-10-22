import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import { cn } from "../utils/cn";

const modalVariants = cva(
  "relative bg-bg-elevated border border-border-default rounded-lg shadow-lg transition-all",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        fullscreen: "max-w-none w-full h-full rounded-none",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface ModalProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClose">,
    VariantProps<typeof modalVariants> {
  open?: boolean;
  onClose?: () => void;
  title?: string;
  description?: string;
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      className,
      size,
      open = false,
      onClose,
      title,
      description,
      showCloseButton = true,
      closeOnBackdropClick = true,
      closeOnEscape = true,
      children,
      ...props
    },
    ref,
  ) => {
    const [isVisible, setIsVisible] = React.useState(open);

    React.useEffect(() => {
      setIsVisible(open);
    }, [open]);

    React.useEffect(() => {
      if (!closeOnEscape || !onClose) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      if (isVisible) {
        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";
      }

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "unset";
      };
    }, [isVisible, closeOnEscape, onClose]);

    const handleBackdropClick = (e: React.MouseEvent) => {
      if (closeOnBackdropClick && e.target === e.currentTarget) {
        onClose?.();
      }
    };

    if (!isVisible) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={handleBackdropClick}
        onKeyDown={(e) => {
          if (e.key === "Escape" && closeOnEscape) {
            onClose?.();
          }
        }}
        tabIndex={-1}
      >
        <div
          ref={ref}
          className={cn(modalVariants({ size }), "w-full max-h-[90vh] overflow-hidden", className)}
          // biome-ignore lint/a11y/useSemanticElements: Using div with role="dialog" for better styling control
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "modal-title" : undefined}
          aria-describedby={description ? "modal-description" : undefined}
          {...props}
        >
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-6 border-b border-border-subtle">
              <div className="flex-1">
                {title && (
                  <h2 id="modal-title" className="text-lg font-semibold text-fg">
                    {title}
                  </h2>
                )}
                {description && (
                  <p id="modal-description" className="text-sm text-fg-muted mt-1">
                    {description}
                  </p>
                )}
              </div>
              {showCloseButton && onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="ml-4 p-2 rounded-md hover:bg-bg-subtle transition-colors"
                  aria-label="Close modal"
                >
                  <span className="text-lg">×</span>
                </button>
              )}
            </div>
          )}

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">{children}</div>
        </div>
      </div>
    );
  },
);

Modal.displayName = "Modal";
