import React from 'react';
import { IconProps } from '../../types';

export const BlockchainIcon: React.FC<IconProps> = ({
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
      <rect x="3" y="3" width="6" height="6" />
      <rect x="15" y="3" width="6" height="6" />
      <rect x="3" y="15" width="6" height="6" />
      <rect x="15" y="15" width="6" height="6" />
      <path d="M9 6h6" />
      <path d="M9 18h6" />
      <path d="M6 9v6" />
      <path d="M18 9v6" />
    </svg>
  );
};
