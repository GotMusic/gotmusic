import React from 'react';
import { IconProps } from '../../types';

export const LibraryIcon: React.FC<IconProps> = ({
  size = 'md',
  stroke = 'default',
  fill = 'default',
  className,
  ...props
}) => {
  const sizeValue = typeof size === 'number' ? size : {
    xs: 12, sm: 14, md: 16, lg: 20, xl: 24, xxl: 32
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
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
};
