import type React from "react";

let idCounter = 0;

/**
 * Generate a unique ID for accessibility attributes
 *
 * Useful for aria-describedby, aria-labelledby, and other ARIA relationships.
 *
 * @param prefix - Optional prefix for the ID
 * @returns A unique ID string
 *
 * @example
 * const hintId = generateId("hint");
 * // → "hint-1", "hint-2", etc.
 *
 * <input aria-describedby={hintId} />
 * <span id={hintId}>Enter your name</span>
 */
export function generateId(prefix = "a11y"): string {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}

/**
 * Merge multiple refs into a single ref callback
 *
 * Allows passing multiple refs to a single element, useful when combining
 * forwarded refs with local refs.
 *
 * @param refs - Array of refs to merge
 * @returns A ref callback that updates all provided refs
 *
 * @example
 * const localRef = useRef<HTMLDivElement>(null);
 * const mergedRef = mergeRefs(localRef, forwardedRef);
 *
 * <div ref={mergedRef}>Content</div>
 */
export function mergeRefs<T>(...refs: Array<React.Ref<T> | undefined>): React.RefCallback<T> {
  return (value: T) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T>).current = value;
      }
    }
  };
}

/**
 * Check if an element is a valid interactive element
 *
 * @param element - Element to check
 * @returns True if element is interactive (button, link, input, etc.)
 */
export function isInteractive(element: HTMLElement): boolean {
  const interactiveTags = ["A", "BUTTON", "INPUT", "SELECT", "TEXTAREA"];
  const hasTabIndex = element.hasAttribute("tabindex");
  const hasRole = element.hasAttribute("role");

  return (
    interactiveTags.includes(element.tagName) ||
    hasTabIndex ||
    (hasRole &&
      ["button", "link", "checkbox", "radio"].includes(element.getAttribute("role") || ""))
  );
}

/**
 * Get the computed accessible name of an element
 *
 * @param element - Element to get name for
 * @returns The accessible name string
 */
export function getAccessibleName(element: HTMLElement): string {
  // Check aria-label first
  const ariaLabel = element.getAttribute("aria-label");
  if (ariaLabel) return ariaLabel;

  // Check aria-labelledby
  const labelledBy = element.getAttribute("aria-labelledby");
  if (labelledBy) {
    const labelElement = document.getElementById(labelledBy);
    if (labelElement) return labelElement.textContent || "";
  }

  // For inputs, check associated label
  if (element instanceof HTMLInputElement) {
    const id = element.id;
    if (id) {
      const label = document.querySelector(`label[for="${id}"]`);
      if (label) return label.textContent || "";
    }
  }

  // Fall back to text content
  return element.textContent || "";
}
