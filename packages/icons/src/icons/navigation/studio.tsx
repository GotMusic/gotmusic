import type React from "react";
import type { IconProps } from "../../types";

export const StudioIcon: React.FC<IconProps> = ({
  size = "md",
  stroke = "default",
  fill = "default",
  className,
  ...props
}) => {
  const sizeValue =
    typeof size === "number"
      ? size
      : {
          xs: 12,
          sm: 14,
          md: 16,
          lg: 20,
          xl: 24,
          xxl: 32,
        }[size];

  return (
    <svg
      width={sizeValue}
      height={sizeValue}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="miter"
      className={className}
      {...props}
    >
      <title>Studio</title>
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <circle cx="12" cy="10" r="2" />
    </svg>
  );
};
