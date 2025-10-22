import React from 'react';
import { IconProps } from '../../types';

export const MicrophoneIcon: React.FC<IconProps> = ({
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
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
};
