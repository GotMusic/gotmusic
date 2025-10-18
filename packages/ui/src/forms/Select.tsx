import * as SelectPrimitive from "@radix-ui/react-select";
import { type VariantProps, cva } from "class-variance-authority";
import { Check, ChevronDown } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "../utils";

const selectVariants = cva(
  "flex w-full items-center justify-between rounded-sm border bg-bg-muted px-3 py-2 text-sm text-fg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-8 px-2 text-xs",
        md: "h-9 px-3 text-sm",
        lg: "h-10 px-4 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface SelectProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>,
    VariantProps<typeof selectVariants> {
  children: React.ReactNode;
  className?: string;
}

const Select = forwardRef<React.ElementRef<typeof SelectPrimitive.Trigger>, SelectProps>(
  ({ className, size, children, ...props }, ref) => (
    <SelectPrimitive.Root {...props}>
      <SelectPrimitive.Trigger ref={ref} className={cn(selectVariants({ size, className }))}>
        {children}
        <SelectPrimitive.Icon asChild>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    </SelectPrimitive.Root>
  ),
);

Select.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-border-subtle bg-bg-elevated shadow-lg",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));

SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectItem = forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-bg-active focus:text-fg data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));

SelectItem.displayName = SelectPrimitive.Item.displayName;

export { Select, SelectContent, SelectItem };
