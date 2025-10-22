import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import { cn } from "../utils/cn";

const cardVariants = cva("rounded-lg border bg-bg-elevated transition-colors", {
  variants: {
    variant: {
      default: "border-border-default",
      elevated: "border-border-subtle shadow-sm",
      interactive:
        "border-border-default hover:border-border-strong hover:shadow-sm cursor-pointer",
      disabled: "border-border-subtle bg-bg-subtle opacity-60 cursor-not-allowed",
    },
    padding: {
      none: "p-0",
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "md",
  },
});

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick">,
    VariantProps<typeof cardVariants> {
  onClick?: () => void;
  disabled?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, onClick, disabled = false, children, ...props }, ref) => {
    const isInteractive = variant === "interactive" && !disabled;
    const isDisabled = disabled || variant === "disabled";

    return (
      <div
        className={cn(
          cardVariants({ variant, padding }),
          isInteractive && "hover:bg-bg-subtle",
          isDisabled && "pointer-events-none",
          className,
        )}
        onClick={isInteractive ? onClick : undefined}
        ref={ref}
        role={isInteractive ? "button" : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onKeyDown={(e) => {
          if (isInteractive && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onClick?.();
          }
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

// Card sub-components
export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-fg-muted", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  ),
);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";
