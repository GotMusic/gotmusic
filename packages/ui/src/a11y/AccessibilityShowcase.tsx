import React from "react";

interface AccessibilityShowcaseProps {
  title?: string;
  description?: string;
  showKeyboardNavigation?: boolean;
  showScreenReader?: boolean;
  showColorContrast?: boolean;
  showFocusManagement?: boolean;
}

export const AccessibilityShowcase: React.FC<AccessibilityShowcaseProps> = ({
  title = "Accessibility Showcase",
  description = "Demonstrating accessibility features and best practices",
  showKeyboardNavigation = true,
  showScreenReader = true,
  showColorContrast = true,
  showFocusManagement = true,
}) => {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>{title}</h1>
      <p>{description}</p>

      <div style={{ display: "grid", gap: "2rem", marginTop: "2rem" }}>
        {showKeyboardNavigation && (
          <section>
            <h2>Keyboard Navigation</h2>
            <p>Use Tab to navigate through these interactive elements:</p>
            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
              <button>First Button</button>
              <button>Second Button</button>
              <button>Third Button</button>
            </div>
          </section>
        )}

        {showScreenReader && (
          <section>
            <h2>Screen Reader Support</h2>
            <p>These elements have proper ARIA labels and descriptions:</p>
            <div style={{ marginTop: "1rem" }}>
              <button aria-label="Close dialog">×</button>
              <input
                type="text"
                aria-label="Search for music"
                placeholder="Search..."
                style={{ marginLeft: "1rem", padding: "0.5rem" }}
              />
              <div
                role="alert"
                aria-live="polite"
                style={{
                  marginTop: "1rem",
                  padding: "1rem",
                  background: "#f0f0f0",
                  borderRadius: "4px",
                }}
              >
                This is an alert that screen readers will announce
              </div>
            </div>
          </section>
        )}

        {showColorContrast && (
          <section>
            <h2>Color Contrast</h2>
            <p>These elements demonstrate proper color contrast ratios:</p>
            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
              <div
                style={{
                  padding: "1rem",
                  background: "#000",
                  color: "#fff",
                  borderRadius: "4px",
                }}
              >
                High Contrast
              </div>
              <div
                style={{
                  padding: "1rem",
                  background: "#0066cc",
                  color: "#fff",
                  borderRadius: "4px",
                }}
              >
                Good Contrast
              </div>
            </div>
          </section>
        )}

        {showFocusManagement && (
          <section>
            <h2>Focus Management</h2>
            <p>Focus indicators are visible and properly styled:</p>
            <div style={{ marginTop: "1rem" }}>
              <button
                style={{
                  padding: "0.5rem 1rem",
                  margin: "0.5rem",
                  border: "2px solid transparent",
                  borderRadius: "4px",
                  background: "#007bff",
                  color: "white",
                }}
              >
                Focusable Button
              </button>
              <button
                style={{
                  padding: "0.5rem 1rem",
                  margin: "0.5rem",
                  border: "2px solid transparent",
                  borderRadius: "4px",
                  background: "#28a745",
                  color: "white",
                }}
              >
                Another Button
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
