module.exports = {
  content: ["./App.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: "#0B0D12", elevated: "#121520" },
        fg: { DEFAULT: "#E6EAF2", muted: "#A9B1C1" },
        brand: { primary: "#6AE6A6", accent: "#5BD0FF" },
        success: "#39D98A",
        warning: "#F7C948",
        danger: "#F97066",
      },
      borderRadius: { xs: 6, md: 12, xl: 20 },
      spacing: { 1: 4, 2: 8, 3: 12, 4: 16 },
    },
  },
};
