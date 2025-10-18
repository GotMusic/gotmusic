import * as SliderPrimitive from "@radix-ui/react-slider";
import { type VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "../utils";

const sliderVariants = cva("relative flex w-full touch-none select-none items-center", {
  variants: {
    size: {
      sm: "h-4",
      md: "h-5",
      lg: "h-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface SliderProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>, "size">,
    VariantProps<typeof sliderVariants> {}

const Slider = forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  ({ className, size, ...props }, ref) => (
    <SliderPrimitive.Root ref={ref} className={cn(sliderVariants({ size, className }))} {...props}>
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-bg-muted">
        <SliderPrimitive.Range className="absolute h-full bg-brand-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-brand-primary bg-bg-elevated ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  ),
);

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
