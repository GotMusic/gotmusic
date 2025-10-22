import React from 'react';
import { IconProps } from '../../types';

export const GotMusicLogoIcon: React.FC<IconProps> = ({
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
      {/* Custom GotMusic Logo - Music Note with G */}
      <path d="M12 2v20" />
      <path d="M8 6l4-4 4 4" />
      <circle cx="12" cy="12" r="3" />
      <path d="M9 15l3-3 3 3" />
    </svg>
  );
};
