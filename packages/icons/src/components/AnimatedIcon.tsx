import type React from "react";
import { useEffect, useRef } from "react";
import type { IconComponentProps } from "./Icon";

export interface AnimatedIconProps extends IconComponentProps {
  animation?: "pulse" | "spin" | "bounce" | "shake";
  duration?: number;
  delay?: number;
  children?: React.ReactNode;
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  animation = "pulse",
  duration = 1000,
  delay = 0,
  children,
  ...props
}) => {
  const iconRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!iconRef.current) return;

    const icon = iconRef.current;

    const keyframes = {
      pulse: [
        { transform: "scale(1)", opacity: 1 },
        { transform: "scale(1.1)", opacity: 0.8 },
        { transform: "scale(1)", opacity: 1 },
      ],
      spin: [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
      bounce: [
        { transform: "translateY(0)" },
        { transform: "translateY(-4px)" },
        { transform: "translateY(0)" },
      ],
      shake: [
        { transform: "translateX(0)" },
        { transform: "translateX(-2px)" },
        { transform: "translateX(2px)" },
        { transform: "translateX(-2px)" },
        { transform: "translateX(0)" },
      ],
    };

    const animationConfig = {
      duration,
      delay,
      iterations: animation === "spin" ? Number.POSITIVE_INFINITY : 1,
      easing: "ease-in-out",
    };

    icon.animate(keyframes[animation], animationConfig);
  }, [animation, duration, delay]);

  return (
    <svg ref={iconRef} {...props}>
      <title>Animated Icon</title>
      {children}
    </svg>
  );
};
