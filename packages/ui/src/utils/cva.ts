import { type VariantProps, cva } from "class-variance-authority";

/**
 * CVA (Class Variance Authority) utility for consistent component variants
 *
 * This utility provides a standardized way to create component variants
 * using the GotMusic design token system.
 *
 * Usage:
 * ```tsx
 * const buttonVariants = cva("base-classes", {
 *   variants: {
 *     variant: { primary: "bg-brand-primary", secondary: "bg-bg-elevated" },
 *     size: { sm: "h-9", md: "h-10", lg: "h-11" }
 *   }
 * });
 * ```
 */
export { cva, type VariantProps };
