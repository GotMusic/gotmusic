/**
 * Icon Design Tokens
 * Generated from @gotmusic/tokens
 */

export const iconTokens = {
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  strokeWidth: 1.5,
  corner: "miter" as const,
  fill: {
    default: "none",
    solid: "currentColor",
    brand: "#6AE6A6",
    accent: "#5BD0FF",
    success: "#39D98A",
    warning: "#F7C948",
    danger: "#F97066",
    info: "#7CD4FF",
  },
  stroke: {
    default: "currentColor",
    brand: "#6AE6A6",
    accent: "#5BD0FF",
    muted: "#A9B1C1",
    subtle: "rgba(230,234,242,0.75)",
  },
  animation: {
    duration: 180,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
} as const;

export type IconSize = keyof typeof iconTokens.size;
export type IconFill = keyof typeof iconTokens.fill;
export type IconStroke = keyof typeof iconTokens.stroke;
