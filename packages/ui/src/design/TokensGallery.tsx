import type React from "react";

interface Token {
  name: string;
  value: string;
  category: string;
  description?: string;
}

interface TokensGalleryProps {
  title?: string;
  tokens?: Token[];
  showCategories?: boolean;
  showValues?: boolean;
  showDescriptions?: boolean;
}

const defaultTokens: Token[] = [
  { name: "primary", value: "#007bff", category: "colors", description: "Primary brand color" },
  { name: "secondary", value: "#6c757d", category: "colors", description: "Secondary color" },
  { name: "success", value: "#28a745", category: "colors", description: "Success state color" },
  { name: "warning", value: "#ffc107", category: "colors", description: "Warning state color" },
  { name: "danger", value: "#dc3545", category: "colors", description: "Danger state color" },
  { name: "xs", value: "0.25rem", category: "spacing", description: "Extra small spacing" },
  { name: "sm", value: "0.5rem", category: "spacing", description: "Small spacing" },
  { name: "md", value: "1rem", category: "spacing", description: "Medium spacing" },
  { name: "lg", value: "1.5rem", category: "spacing", description: "Large spacing" },
  { name: "xl", value: "2rem", category: "spacing", description: "Extra large spacing" },
  {
    name: "font-sans",
    value: "system-ui, sans-serif",
    category: "typography",
    description: "Sans-serif font family",
  },
  {
    name: "font-mono",
    value: "Monaco, Consolas, monospace",
    category: "typography",
    description: "Monospace font family",
  },
  {
    name: "text-xs",
    value: "0.75rem",
    category: "typography",
    description: "Extra small text size",
  },
  { name: "text-sm", value: "0.875rem", category: "typography", description: "Small text size" },
  { name: "text-base", value: "1rem", category: "typography", description: "Base text size" },
  { name: "text-lg", value: "1.125rem", category: "typography", description: "Large text size" },
  {
    name: "text-xl",
    value: "1.25rem",
    category: "typography",
    description: "Extra large text size",
  },
];

export const TokensGallery: React.FC<TokensGalleryProps> = ({
  title = "Design Tokens Gallery",
  tokens = defaultTokens,
  showCategories = true,
  showValues = true,
  showDescriptions = true,
}) => {
  const categories = [...new Set(tokens.map((token) => token.category))];

  return (
    <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>{title}</h1>
      <p>Explore the design tokens used throughout the application.</p>

      {categories.map((category) => (
        <section key={category} style={{ marginTop: "2rem" }}>
          <h2
            style={{
              textTransform: "capitalize",
              borderBottom: "2px solid #e9ecef",
              paddingBottom: "0.5rem",
              marginBottom: "1rem",
            }}
          >
            {category}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1rem",
            }}
          >
            {tokens
              .filter((token) => token.category === category)
              .map((token) => (
                <div
                  key={token.name}
                  style={{
                    border: "1px solid #e9ecef",
                    borderRadius: "8px",
                    padding: "1rem",
                    background: "white",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <code
                      style={{
                        background: "#f8f9fa",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "0.875rem",
                      }}
                    >
                      {token.name}
                    </code>
                    {token.category === "colors" && (
                      <div
                        style={{
                          width: "2rem",
                          height: "2rem",
                          borderRadius: "4px",
                          background: token.value,
                          border: "1px solid #e9ecef",
                        }}
                      />
                    )}
                  </div>

                  {showValues && (
                    <div style={{ marginBottom: "0.5rem" }}>
                      <strong>Value:</strong> <code>{token.value}</code>
                    </div>
                  )}

                  {showDescriptions && token.description && (
                    <div style={{ fontSize: "0.875rem", color: "#6c757d" }}>
                      {token.description}
                    </div>
                  )}

                  {token.category === "spacing" && (
                    <div style={{ marginTop: "0.5rem" }}>
                      <div
                        style={{
                          height: "1rem",
                          background: "#007bff",
                          width: token.value,
                          borderRadius: "2px",
                        }}
                      />
                    </div>
                  )}

                  {token.category === "typography" && token.name.startsWith("font-") && (
                    <div style={{ marginTop: "0.5rem" }}>
                      <div style={{ fontFamily: token.value, fontSize: "1rem" }}>
                        Sample text in {token.name}
                      </div>
                    </div>
                  )}

                  {token.category === "typography" && token.name.startsWith("text-") && (
                    <div style={{ marginTop: "0.5rem" }}>
                      <div style={{ fontSize: token.value }}>Sample text at {token.name} size</div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
};
