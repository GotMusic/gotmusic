import { ClassValue } from 'clsx';
export { VariantProps, cva } from 'class-variance-authority';

/**
 * Utility for merging Tailwind CSS classes
 *
 * Combines clsx for conditional classes with tailwind-merge for proper precedence.
 *
 * @example
 * cn("px-2 py-1", isActive && "bg-primary", className)
 * // → "px-2 py-1 bg-primary <additional-classes>"
 *
 * @example
 * cn("px-2", "px-4") // → "px-4" (tailwind-merge handles conflicts)
 */
declare function cn(...inputs: ClassValue[]): string;

export { cn };
