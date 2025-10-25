import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import { cn } from "../utils/cn";

const cardVariants = cva("relative overflow-hidden transition-all duration-300 ease-out group", {
  variants: {
    variant: {
      // SINGULAR Glass-Neumorphic Hybrid Design - The Ultimate Fusion
      default: [
        // Glass Foundation with Neumorphic Depth
        "bg-gradient-to-br from-white/20 via-white/10 to-white/5",
        "backdrop-blur-xl backdrop-saturate-150",
        "border border-white/30",
        
        // Neumorphic Inset Shadows (Soft & Tactile)
        "shadow-[inset_-1px_-1px_3px_rgba(255,255,255,0.3),inset_1px_1px_3px_rgba(0,0,0,0.1)]",
        
        // Glass Outer Glow with Neumorphic Depth
        "shadow-[0_8px_32px_0_rgba(31,38,135,0.2),0_4px_16px_0_rgba(0,0,0,0.1)]",
        
        // Hybrid Hover Effects
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/15 before:via-white/5 before:to-transparent before:opacity-0 before:transition-all before:duration-300",
        "hover:before:opacity-100",
        "hover:shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.4),inset_2px_2px_4px_rgba(0,0,0,0.15),0_12px_40px_0_rgba(31,38,135,0.3),0_6px_20px_0_rgba(0,0,0,0.15)]",
        "hover:border-white/40 hover:-translate-y-1 hover:scale-[1.02]",
        
        // Active Press State (Neumorphic Feedback)
        "active:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2),inset_-1px_-1px_2px_rgba(255,255,255,0.1)]",
        "active:translate-y-0 active:scale-[0.98]",
      ],
      
      // Premium Music Variant (Same Hybrid, Brand Colors)
      music: [
        "bg-gradient-to-br from-brand-primary/25 via-brand-accent/15 to-brand-primary/5",
        "backdrop-blur-xl backdrop-saturate-150",
        "border border-brand-primary/40",
        
        // Neumorphic Inset with Brand Colors
        "shadow-[inset_-1px_-1px_3px_rgba(106,230,166,0.3),inset_1px_1px_3px_rgba(0,0,0,0.1)]",
        "shadow-[0_8px_32px_0_rgba(106,230,166,0.25),0_4px_16px_0_rgba(0,0,0,0.1)]",
        
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-brand-primary/20 before:via-brand-accent/10 before:to-transparent before:opacity-0 before:transition-all before:duration-300",
        "hover:before:opacity-100",
        "hover:shadow-[inset_-2px_-2px_4px_rgba(106,230,166,0.4),inset_2px_2px_4px_rgba(0,0,0,0.15),0_12px_40px_0_rgba(106,230,166,0.35),0_6px_20px_0_rgba(0,0,0,0.15)]",
        "hover:border-brand-primary/50 hover:-translate-y-1 hover:scale-[1.02]",
        "active:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2),inset_-1px_-1px_2px_rgba(106,230,166,0.2)]",
        "active:translate-y-0 active:scale-[0.98]",
      ],
      
      // Disabled State
      disabled: [
        "bg-bg-subtle border-border-subtle",
        "opacity-60 cursor-not-allowed",
        "shadow-none backdrop-blur-none",
      ],
    },
    size: {
      xs: "rounded-md p-2",
      sm: "rounded-lg p-3",
      md: "rounded-xl p-4",
      lg: "rounded-2xl p-6",
      xl: "rounded-3xl p-8",
    },
    glow: {
      none: "",
      soft: "shadow-glow-brand",
      medium: "shadow-[0_0_20px_rgba(106,230,166,0.3)]",
      strong: "shadow-[0_0_30px_rgba(106,230,166,0.5)]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    glow: "none",
  },
});

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick">,
    VariantProps<typeof cardVariants> {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  animated?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      size,
      glow,
      onClick,
      disabled = false,
      loading = false,
      animated = true,
      children,
      ...props
    },
    ref,
  ) => {
    const isInteractive =
      (variant === "default" || variant === "music") && !disabled;
    const isDisabled = disabled || variant === "disabled";

    return (
      <div
        className={cn(
          cardVariants({ variant, size, glow }),
          isInteractive && "cursor-pointer",
          isDisabled && "pointer-events-none",
          loading && "animate-pulse",
          animated && "transition-all duration-300 ease-out",
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
        {loading && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        )}
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

// Enhanced Card sub-components with premium styling
export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col space-y-2 p-6 relative z-10",
        "group-hover:translate-y-[-2px] transition-transform duration-300",
        className,
      )}
      {...props}
    />
  ),
);
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-bold leading-tight tracking-tight",
      "bg-gradient-to-r from-fg-default to-fg-muted bg-clip-text text-transparent",
      "group-hover:from-brand-primary group-hover:to-brand-accent",
      "transition-all duration-300",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-sm text-fg-muted leading-relaxed",
      "group-hover:text-fg-default transition-colors duration-300",
      className,
    )}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "p-6 pt-0 relative z-10",
        "group-hover:translate-y-[-1px] transition-transform duration-300",
        className,
      )}
      {...props}
    />
  ),
);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-between p-6 pt-0 relative z-10",
        "group-hover:translate-y-[-1px] transition-transform duration-300",
        className,
      )}
      {...props}
    />
  ),
);
CardFooter.displayName = "CardFooter";

// New premium Card components
export const CardIcon = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center w-12 h-12 rounded-xl",
        "bg-gradient-to-br from-brand-primary to-brand-accent",
        "shadow-lg group-hover:shadow-xl group-hover:scale-110",
        "transition-all duration-300",
        className,
      )}
      {...props}
    />
  ),
);
CardIcon.displayName = "CardIcon";

export const CardBadge = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        "bg-brand-primary/20 text-brand-primary border border-brand-primary/30",
        "group-hover:bg-brand-primary/30 group-hover:border-brand-primary/50",
        "transition-all duration-300",
        className,
      )}
      {...props}
    />
  ),
);
CardBadge.displayName = "CardBadge";
