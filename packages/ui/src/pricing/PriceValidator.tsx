"use client";

import { forwardRef, useEffect, useState } from "react";
import { AlertCircle, CheckCircle, XCircle } from "../icons";
import { type VariantProps, cn, cva } from "../utils";

export interface PriceValidationRule {
  type: "min" | "max" | "step" | "custom";
  value?: number;
  message: string;
  validator?: (value: number) => boolean;
}

export interface PriceValidatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof priceValidatorVariants> {
  value: number | null;
  rules: PriceValidationRule[];
  showIcon?: boolean;
  showMessage?: boolean;
  inline?: boolean;
}

const priceValidatorVariants = cva("flex items-center gap-2", {
  variants: {
    variant: {
      default: "text-fg-default",
      error: "text-semantic-danger",
      success: "text-semantic-success",
      warning: "text-semantic-warning",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

const PriceValidator = forwardRef<HTMLDivElement, PriceValidatorProps>(
  (
    {
      className,
      value,
      rules,
      showIcon = true,
      showMessage = true,
      inline = false,
      variant,
      size,
      ...props
    },
    ref,
  ) => {
    const [validationState, setValidationState] = useState<{
      isValid: boolean;
      message: string;
      variant: "default" | "error" | "success" | "warning";
    }>({
      isValid: true,
      message: "",
      variant: "default",
    });

    useEffect(() => {
      if (value === null || value === undefined) {
        setValidationState({
          isValid: true,
          message: "",
          variant: "default",
        });
        return;
      }

      // Check all rules
      for (const rule of rules) {
        let isValid = true;

        switch (rule.type) {
          case "min":
            isValid = value >= (rule.value || 0);
            break;
          case "max":
            isValid = value <= (rule.value || Number.POSITIVE_INFINITY);
            break;
          case "step": {
            const step = rule.value || 1;
            isValid = Math.abs(value % step) < 0.0001 || Math.abs((value % step) - step) < 0.0001;
            break;
          }
          case "custom":
            isValid = rule.validator ? rule.validator(value) : true;
            break;
        }

        if (!isValid) {
          setValidationState({
            isValid: false,
            message: rule.message,
            variant: "error",
          });
          return;
        }
      }

      // All rules passed
      setValidationState({
        isValid: true,
        message: "Price is valid",
        variant: "success",
      });
    }, [value, rules]);

    const getIcon = () => {
      if (!showIcon) return null;

      switch (validationState.variant) {
        case "error":
          return <XCircle className="h-4 w-4" />;
        case "success":
          return <CheckCircle className="h-4 w-4" />;
        case "warning":
          return <AlertCircle className="h-4 w-4" />;
        default:
          return null;
      }
    };

    if (!showMessage && !showIcon) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          priceValidatorVariants({ variant: validationState.variant, size }),
          inline ? "flex-row" : "flex-col items-start",
          className,
        )}
        {...props}
      >
        {showIcon && (
          <div className="flex items-center gap-2">
            {getIcon()}
            {showMessage && <span className="text-sm">{validationState.message}</span>}
          </div>
        )}
        {showMessage && !showIcon && <span className="text-sm">{validationState.message}</span>}
      </div>
    );
  },
);

PriceValidator.displayName = "PriceValidator";

export { PriceValidator };
