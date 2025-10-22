"use client";

import { forwardRef } from "react";
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from "../icons";
import { type VariantProps, cn, cva } from "../utils";

export interface ValidationFeedbackProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof validationFeedbackVariants> {
  /**
   * Validation status
   */
  status?: "valid" | "invalid" | "warning" | "info";
  /**
   * Error messages
   */
  errors?: string[];
  /**
   * Warning messages
   */
  warnings?: string[];
  /**
   * Success messages
   */
  success?: string[];
  /**
   * Info messages
   */
  info?: string[];
  /**
   * Whether to show icons
   */
  showIcons?: boolean;
  /**
   * Whether to show close button
   */
  showClose?: boolean;
  /**
   * Callback when close button is clicked
   */
  onClose?: () => void;
  /**
   * Maximum number of messages to show
   */
  maxMessages?: number;
}

const validationFeedbackVariants = cva("rounded-lg border p-3 space-y-2", {
  variants: {
    variant: {
      valid: "bg-semantic-success/10 border-semantic-success text-semantic-success",
      invalid: "bg-semantic-danger/10 border-semantic-danger text-semantic-danger",
      warning: "bg-semantic-warning/10 border-semantic-warning text-semantic-warning",
      info: "bg-semantic-info/10 border-semantic-info text-semantic-info",
    },
    size: {
      sm: "p-2 text-sm",
      md: "p-3 text-sm",
      lg: "p-4 text-base",
    },
  },
  defaultVariants: {
    variant: "info",
    size: "md",
  },
});

const ValidationFeedback = forwardRef<HTMLDivElement, ValidationFeedbackProps>(
  (
    {
      className,
      status = "info",
      errors = [],
      warnings = [],
      success = [],
      info = [],
      showIcons = true,
      showClose = false,
      onClose,
      maxMessages = 5,
      variant,
      size,
      ...props
    },
    ref,
  ) => {
    const getStatusIcon = () => {
      switch (status) {
        case "valid":
          return <CheckCircle className="h-4 w-4" />;
        case "invalid":
          return <AlertCircle className="h-4 w-4" />;
        case "warning":
          return <AlertTriangle className="h-4 w-4" />;
        default:
          return <Info className="h-4 w-4" />;
      }
    };

    const getStatusColor = () => {
      switch (status) {
        case "valid":
          return "text-semantic-success";
        case "invalid":
          return "text-semantic-danger";
        case "warning":
          return "text-semantic-warning";
        default:
          return "text-semantic-info";
      }
    };

    const getMessages = () => {
      const allMessages = [
        ...errors.map((msg) => ({ type: "error", message: msg })),
        ...warnings.map((msg) => ({ type: "warning", message: msg })),
        ...success.map((msg) => ({ type: "success", message: msg })),
        ...info.map((msg) => ({ type: "info", message: msg })),
      ];

      return allMessages.slice(0, maxMessages);
    };

    const messages = getMessages();

    if (messages.length === 0) {
      return null;
    }

    const getVariant = () => {
      if (errors.length > 0) return "invalid";
      if (warnings.length > 0) return "warning";
      if (success.length > 0) return "valid";
      return variant || "info";
    };

    return (
      <div
        ref={ref}
        className={cn(validationFeedbackVariants({ variant: getVariant(), size }), className)}
        role="alert"
        aria-live="polite"
        {...props}
      >
        {/* Header */}
        <div className="flex items-start gap-2">
          {showIcons && <div className="flex-shrink-0 mt-0.5">{getStatusIcon()}</div>}
          <div className="flex-1 min-w-0">
            <div className="space-y-1">
              {messages.map((message, index) => (
                <div key={`${message.type}-${index}-${message.message.slice(0, 10)}`} className="flex items-start gap-2">
                  {showIcons && (
                    <div className="flex-shrink-0 mt-0.5">
                      {message.type === "error" && <AlertCircle className="h-3 w-3" />}
                      {message.type === "warning" && <AlertTriangle className="h-3 w-3" />}
                      {message.type === "success" && <CheckCircle className="h-3 w-3" />}
                      {message.type === "info" && <Info className="h-3 w-3" />}
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{message.message}</p>
                </div>
              ))}
            </div>
          </div>
          {showClose && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex-shrink-0 p-1 hover:bg-bg-hover rounded transition-colors"
              aria-label="Close feedback"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Additional Messages Indicator */}
        {messages.length >= maxMessages && (
          <p className="text-xs opacity-75">
            {messages.length - maxMessages} more message
            {messages.length - maxMessages > 1 ? "s" : ""}...
          </p>
        )}
      </div>
    );
  },
);

ValidationFeedback.displayName = "ValidationFeedback";

export { ValidationFeedback };
