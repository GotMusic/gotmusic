import type React from "react";
import type { IconProps } from "../../types";

export const HeadphonesIcon: React.FC<IconProps> = ({
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
      <title>Headphones</title>
      <path d="M3 14v3a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2Z" />
      <path d="M21 14v3a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2Z" />
      <path d="M6 12v-2a6 6 0 0 1 12 0v2" />
    </svg>
  );
};
