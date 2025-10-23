import type React from "react";
import type { IconProps } from "../../types";

export const RecordIcon: React.FC<IconProps> = ({
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
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="miter"
      className={className}
      {...props}
    >
      <title>Record</title>
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
};
