import { type VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "../utils";

const skeletonVariants = cva("animate-pulse rounded-md bg-muted", {
  variants: {
    variant: {
      default: "bg-muted",
      subtle: "bg-muted/50",
      strong: "bg-muted/80",
    },
    size: {
      sm: "h-4",
      md: "h-6",
      lg: "h-8",
      xl: "h-12",
    },
    shape: {
      rectangle: "rounded-md",
      circle: "rounded-full",
      text: "rounded-sm",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    shape: "rectangle",
  },
});

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  lines?: number;
  width?: string | number;
  height?: string | number;
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, size, shape, lines = 1, width, height, style, ...props }, ref) => {
    const customStyle = {
      width: width || (shape === "circle" ? height || "2rem" : "100%"),
      height: height || (shape === "circle" ? width || "2rem" : undefined),
      ...style,
    };

    if (lines > 1) {
      return (
        <div className="space-y-2" ref={ref}>
          {Array.from({ length: lines }, (_, index) => (
            <div
              key={`skeleton-${Date.now()}-${index}`}
              className={cn(skeletonVariants({ variant, size, shape }), className)}
              style={customStyle}
              {...props}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant, size, shape }), className)}
        style={customStyle}
        {...props}
      />
    );
  },
);
Skeleton.displayName = "Skeleton";

export { Skeleton, skeletonVariants };
