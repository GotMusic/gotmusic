import React from 'react';
import { IconProps } from '../../types';

export const HomeIcon: React.FC<IconProps> = ({
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9,22 9,12 15,12 15,22" />
    </svg>
  );
};
