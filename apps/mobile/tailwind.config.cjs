const { tokens } = require("@gotmusic/tokens/native.cjs");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{ts,tsx}", "./app/**/*.{ts,tsx}", "../../packages/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: tokens.color.bg.default,
          elevated: tokens.color.bg.elevated,
        },
        fg: {
          DEFAULT: tokens.color.fg.default,
          muted: tokens.color.fg.muted,
        },
        brand: {
          primary: tokens.color.brand.primary,
          accent: tokens.color.brand.accent,
        },
        success: tokens.color.semantic.success,
        warning: tokens.color.semantic.warning,
        danger: tokens.color.semantic.danger,
      },
      borderRadius: {
        xs: tokens.radius.xs,
        md: tokens.radius.md,
        xl: tokens.radius.xl,
      },
      spacing: {
        1: tokens.space["1"],
        2: tokens.space["2"],
        3: tokens.space["3"],
        4: tokens.space["4"],
      },
      fontFamily: {
        sans: tokens.font.sans.split(", "),
      },
      fontSize: {
        sm: tokens.text.sm,
        base: tokens.text.md,
        lg: tokens.text.lg,
        xl: tokens.text.xl,
      },
    },
  },
};
