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
          muted: tokens.color.bg.muted,
          overlay: tokens.color.bg.overlay,
          active: tokens.color.bg.active,
        },
        fg: {
          DEFAULT: tokens.color.fg.default,
          muted: tokens.color.fg.muted,
          subtle: tokens.color.fg.subtle,
          inverse: tokens.color.fg.inverse,
        },
        brand: {
          primary: tokens.color.brand.primary,
          accent: tokens.color.brand.accent,
          ring: tokens.color.brand.ring,
        },
        border: {
          hairline: tokens.color.border.hairline,
          subtle: tokens.color.border.subtle,
          emphasis: tokens.color.border.emphasis,
          brand: tokens.color.border.brand,
          danger: tokens.color.border.danger,
        },
        success: tokens.color.palette.semantic.success,
        warning: tokens.color.palette.semantic.warning,
        danger: tokens.color.palette.semantic.danger,
        info: tokens.color.palette.semantic.info,
      },
      borderRadius: {
        xs: tokens.radius.xs,
        sm: tokens.radius.sm,
        md: tokens.radius.md,
        lg: tokens.radius.lg,
        xl: tokens.radius.xl,
        full: tokens.radius.full,
      },
      spacing: {
        0: tokens.space["0"],
        1: tokens.space["1"],
        2: tokens.space["2"],
        3: tokens.space["3"],
        4: tokens.space["4"],
        5: tokens.space["5"],
        6: tokens.space["6"],
        8: tokens.space["8"],
        10: tokens.space["10"],
        12: tokens.space["12"],
        16: tokens.space["16"],
        24: tokens.space["24"],
      },
      fontFamily: {
        sans: tokens.font.family.sans.split(", "),
        mono: tokens.font.family.mono.split(", "),
      },
      fontSize: {
        xs: [tokens.text.xs.size + "px", { lineHeight: tokens.text.xs.line + "px" }],
        sm: [tokens.text.sm.size + "px", { lineHeight: tokens.text.sm.line + "px" }],
        base: [tokens.text.md.size + "px", { lineHeight: tokens.text.md.line + "px" }],
        lg: [tokens.text.lg.size + "px", { lineHeight: tokens.text.lg.line + "px" }],
        xl: [tokens.text.xl.size + "px", { lineHeight: tokens.text.xl.line + "px" }],
      },
      boxShadow: {
        ambient1: tokens.elevation["ambient-1"],
        ambient2: tokens.elevation["ambient-2"],
        ambient3: tokens.elevation["ambient-3"],
      },
    },
  },
};
