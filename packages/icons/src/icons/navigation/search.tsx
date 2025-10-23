import type React from "react";
import type { IconProps } from "../../types";

export const SearchIcon: React.FC<IconProps> = ({
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
};
