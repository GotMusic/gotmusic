import type { IconFill, IconSize, IconStroke } from "./tokens/icon-tokens";

export interface IconProps {
  size?: IconSize | number;
  stroke?: IconStroke;
  fill?: IconFill;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
}

export interface IconComponentProps extends IconProps {
  children?: React.ReactNode;
}

export type IconVariant = "outline" | "filled" | "brand" | "accent";

export interface IconSystemConfig {
  defaultSize: IconSize;
  defaultStroke: IconStroke;
  defaultFill: IconFill;
  enableAnimations: boolean;
  animationDuration: number;
}
