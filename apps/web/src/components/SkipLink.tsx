/**
 * Skip Link Component
 *
 * Provides keyboard navigation users a way to skip to main content.
 * Visible only when focused, positioned at top of page.
 *
 * WCAG 2.1 Success Criterion 2.4.1 (Bypass Blocks)
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
    >
      Skip to main content
    </a>
  );
}
