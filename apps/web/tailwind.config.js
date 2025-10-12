module.exports = {
  content: ["./src/**/*.{ts,tsx,js,jsx,html}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: "var(--color-bg-default)", elevated: "var(--color-bg-elevated)" },
        fg: { DEFAULT: "var(--color-fg-default)", muted: "var(--color-fg-muted)" },
        brand: { primary: "var(--color-brand-primary)", accent: "var(--color-brand-accent)" },
        success: "var(--color-semantic-success)",
        warning: "var(--color-semantic-warning)",
        danger: "var(--color-semantic-danger)",
      },
      borderRadius: { xs: "var(--radius-xs)", md: "var(--radius-md)", xl: "var(--radius-xl)" },
      boxShadow: { "elev-1": "var(--elevation-1)" },
      fontFamily: { sans: "var(--font-sans)" },
    },
  },
  plugins: [],
};
