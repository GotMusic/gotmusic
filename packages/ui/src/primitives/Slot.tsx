import { Slot as RadixSlot } from "@radix-ui/react-slot";
import type React from "react";

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * If true, merges props onto the immediate child element instead of rendering a wrapper.
   * Enables composition patterns like rendering a button as a link.
   */
  asChild?: boolean;
  children: React.ReactNode;
}

/**
 * Slot component for polymorphic composition
 *
 * Allows components to be rendered as different elements while maintaining their props.
 *
 * @example
 * // Default: renders as span
 * <Slot>Content</Slot>
 *
 * @example
 * // asChild: renders as Link, merges props
 * <Slot asChild>
 *   <Link href="/catalog">Browse</Link>
 * </Slot>
 */
export function Slot({ asChild = false, children, ...props }: SlotProps) {
  const Comp = asChild ? RadixSlot : "span";
  return <Comp {...props}>{children}</Comp>;
}

export type { SlotProps };
