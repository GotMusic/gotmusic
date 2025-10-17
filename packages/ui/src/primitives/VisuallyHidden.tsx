import type * as React from "react";

interface VisuallyHiddenProps {
  /**
   * Content to hide visually but keep accessible to screen readers
   */
  children: React.ReactNode;
  /**
   * HTML element to render (default: span)
   */
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * VisuallyHidden - Screen reader only content
 *
 * Hides content visually while keeping it accessible to assistive technologies.
 * Uses CSS clip-path technique (not display:none) to ensure screen reader compatibility.
 *
 * @example
 * <button>
 *   <span aria-hidden="true">▶</span>
 *   <VisuallyHidden>Play audio preview</VisuallyHidden>
 * </button>
 *
 * @example
 * // Skip to main content link
 * <VisuallyHidden as="a" href="#main">
 *   Skip to main content
 * </VisuallyHidden>
 */
export function VisuallyHidden({ children, as = "span" }: VisuallyHiddenProps) {
  const Comp = as as React.ElementType;
  return (
    <Comp
      style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: 0,
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        border: 0,
      }}
    >
      {children}
    </Comp>
  );
}

export type { VisuallyHiddenProps };
