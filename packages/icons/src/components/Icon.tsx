import React from 'react';
import { IconProps, IconVariant } from '../types';
import { iconTokens } from '../tokens/icon-tokens';

export interface IconComponentProps extends IconProps {
  variant?: IconVariant;
  animated?: boolean;
  children?: React.ReactNode;
}

export const Icon: React.FC<IconComponentProps> = ({
  size = 'md',
  stroke = 'default',
  fill = 'default',
  variant = 'outline',
  animated = false,
  className,
  style,
  children,
  ...props
}) => {
  const sizeValue = typeof size === 'number' ? size : iconTokens.size[size];
  
  const getStrokeColor = () => {
    if (variant === 'brand') return iconTokens.stroke.brand;
    if (variant === 'accent') return iconTokens.stroke.accent;
    return iconTokens.stroke[stroke];
  };

  const getFillColor = () => {
    if (variant === 'filled') return iconTokens.fill.solid;
    if (variant === 'brand') return iconTokens.fill.brand;
    if (variant === 'accent') return iconTokens.fill.accent;
    return iconTokens.fill[fill];
  };

  const animationStyle = animated ? {
    transition: `all ${iconTokens.animation.duration}ms ${iconTokens.animation.easing}`,
  } : {};

  return (
    <svg
      width={sizeValue}
      height={sizeValue}
      viewBox="0 0 24 24"
      fill={getFillColor()}
      stroke={getStrokeColor()}
      strokeWidth={iconTokens.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin={iconTokens.corner}
      className={className}
      style={{ ...animationStyle, ...style }}
      {...props}
    >
      {children}
    </svg>
  );
};
