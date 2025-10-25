"use client";

// src/theme/Provider.tsx
import { createContext, useEffect, useState } from "react";
import * as React from "react";
import { jsx } from "react/jsx-runtime";
var ThemeContext = createContext(void 0);
var STORAGE_KEY = "gotmusic-theme";
function getSystemTheme() {
  if (typeof window === "undefined") return "dark";
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const contrastQuery = window.matchMedia("(prefers-contrast: more)");
  if (contrastQuery.matches) return "high-contrast";
  return darkQuery.matches ? "dark" : "light";
}
function getStoredTheme() {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "dark" || stored === "light" || stored === "high-contrast") {
      return stored;
    }
  } catch {
  }
  return null;
}
function storeTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
  }
}
function ThemeProvider({ children, defaultTheme = "dark" }) {
  const [systemTheme, setSystemTheme] = useState(() => getSystemTheme());
  const [theme, setThemeState] = useState(() => {
    const stored = getStoredTheme();
    return stored ?? defaultTheme;
  });
  useEffect(() => {
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const contrastQuery = window.matchMedia("(prefers-contrast: more)");
    const handleChange = () => {
      const newSystemTheme = getSystemTheme();
      setSystemTheme(newSystemTheme);
    };
    darkQuery.addEventListener("change", handleChange);
    contrastQuery.addEventListener("change", handleChange);
    return () => {
      darkQuery.removeEventListener("change", handleChange);
      contrastQuery.removeEventListener("change", handleChange);
    };
  }, []);
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("dark", "light", "high-contrast");
    root.classList.add(theme);
    root.setAttribute("data-theme", theme);
  }, [theme]);
  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    storeTheme(newTheme);
  };
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { theme, setTheme, systemTheme }, children });
}
function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === void 0) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// src/utils/cn.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/utils/cva.ts
import { cva } from "class-variance-authority";

// src/core/Button.tsx
import { cva as cva2 } from "class-variance-authority";
import React2 from "react";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var buttonVariants = cva2(
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-95",
  {
    variants: {
      variant: {
        primary: [
          "bg-brand-primary text-fg-inverse",
          "hover:bg-brand-primary/90 hover:shadow-glow-brand-soft",
          "active:bg-brand-primary/80 active:scale-95",
          "focus-visible:ring-brand-ring",
          "shadow-elevation-ambient-1"
        ],
        secondary: [
          "bg-bg-elevated text-fg border border-border-subtle",
          "hover:bg-bg-subtle hover:border-border-emphasis",
          "active:bg-bg-active active:scale-95",
          "focus-visible:ring-brand-ring"
        ],
        danger: [
          "bg-semantic-danger text-fg-inverse",
          "hover:bg-semantic-danger/90 hover:shadow-[0_0_20px_rgba(249,112,102,0.3)]",
          "active:bg-semantic-danger/80 active:scale-95",
          "focus-visible:ring-danger"
        ],
        ghost: [
          "text-fg hover:bg-bg-subtle",
          "active:bg-bg-active active:scale-95",
          "focus-visible:ring-brand-ring"
        ],
        outline: [
          "border border-border-default text-fg",
          "hover:bg-bg-subtle hover:border-border-emphasis",
          "active:bg-bg-active active:scale-95",
          "focus-visible:ring-brand-ring"
        ]
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-8 text-base",
        icon: "h-10 w-10"
      },
      loading: {
        true: "cursor-wait",
        false: ""
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      loading: false
    }
  }
);
var Button = React2.forwardRef(
  ({
    className,
    variant,
    size,
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props
  }, ref) => {
    const isDisabled = disabled || loading;
    return /* @__PURE__ */ jsxs(
      "button",
      {
        className: cn(buttonVariants({ variant, size, loading }), className),
        disabled: isDisabled,
        ref,
        ...props,
        children: [
          loading && /* @__PURE__ */ jsxs(
            "svg",
            {
              className: "h-4 w-4 animate-spin",
              fill: "none",
              viewBox: "0 0 24 24",
              xmlns: "http://www.w3.org/2000/svg",
              role: "img",
              "aria-label": "Loading",
              children: [
                /* @__PURE__ */ jsx2(
                  "circle",
                  {
                    className: "opacity-25",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    strokeWidth: "4"
                  }
                ),
                /* @__PURE__ */ jsx2(
                  "path",
                  {
                    className: "opacity-75",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
                    fill: "currentColor"
                  }
                )
              ]
            }
          ),
          !loading && leftIcon && /* @__PURE__ */ jsx2("span", { className: "flex-shrink-0", children: leftIcon }),
          children && /* @__PURE__ */ jsx2("span", { children }),
          !loading && rightIcon && /* @__PURE__ */ jsx2("span", { className: "flex-shrink-0", children: rightIcon })
        ]
      }
    );
  }
);
Button.displayName = "Button";

// src/core/Card.tsx
import { cva as cva3 } from "class-variance-authority";
import React3 from "react";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var cardVariants = cva3(
  "relative overflow-hidden transition-all duration-300 ease-out group",
  {
    variants: {
      variant: {
        // Glass-Neumorphic Hybrid Design
        glass: [
          "bg-gradient-to-br from-white/10 to-white/5",
          "backdrop-blur-xl backdrop-saturate-150",
          "border border-white/20",
          "shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300",
          "hover:before:opacity-100 hover:shadow-[0_8px_40px_0_rgba(31,38,135,0.5)]",
          "hover:border-white/30 hover:-translate-y-1"
        ],
        neumorphic: [
          "bg-gradient-to-br from-bg-elevated to-bg-subtle",
          "border border-border-subtle",
          "shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.1),inset_2px_2px_4px_rgba(0,0,0,0.1),0_4px_8px_rgba(0,0,0,0.1)]",
          "hover:shadow-[inset_-3px_-3px_6px_rgba(255,255,255,0.15),inset_3px_3px_6px_rgba(0,0,0,0.15),0_6px_12px_rgba(0,0,0,0.15)]",
          "hover:-translate-y-0.5"
        ],
        hybrid: [
          "bg-gradient-to-br from-white/15 via-white/5 to-transparent",
          "backdrop-blur-md backdrop-saturate-125",
          "border border-white/25",
          "shadow-[inset_-1px_-1px_2px_rgba(255,255,255,0.2),inset_1px_1px_2px_rgba(0,0,0,0.1),0_6px_20px_rgba(0,0,0,0.15)]",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-0 before:transition-all before:duration-300",
          "hover:before:opacity-100 hover:shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.25),inset_2px_2px_4px_rgba(0,0,0,0.1),0_8px_25px_rgba(0,0,0,0.2)]",
          "hover:border-white/35 hover:-translate-y-1 hover:scale-[1.02]"
        ],
        // Premium Music App Variants
        music: [
          "bg-gradient-to-br from-brand-primary/20 via-brand-accent/10 to-transparent",
          "backdrop-blur-lg backdrop-saturate-150",
          "border border-brand-primary/30",
          "shadow-[0_8px_32px_0_rgba(106,230,166,0.2)]",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-brand-primary/10 before:to-transparent before:opacity-0 before:transition-all before:duration-300",
          "hover:before:opacity-100 hover:shadow-[0_12px_40px_0_rgba(106,230,166,0.3)]",
          "hover:border-brand-primary/50 hover:-translate-y-1 hover:scale-[1.02]"
        ],
        waveform: [
          "bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-pink-500/5",
          "backdrop-blur-xl backdrop-saturate-150",
          "border border-blue-400/30",
          "shadow-[0_8px_32px_0_rgba(59,130,246,0.2)]",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-400/10 before:to-transparent before:opacity-0 before:transition-all before:duration-300",
          "hover:before:opacity-100 hover:shadow-[0_12px_40px_0_rgba(59,130,246,0.3)]",
          "hover:border-blue-400/50 hover:-translate-y-1 hover:scale-[1.02]"
        ],
        // Interactive States
        interactive: [
          "bg-gradient-to-br from-bg-elevated to-bg-subtle",
          "border border-border-default",
          "shadow-[0_4px_12px_rgba(0,0,0,0.1)]",
          "cursor-pointer",
          "hover:bg-gradient-to-br hover:from-bg-subtle hover:to-bg-elevated",
          "hover:border-border-strong hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)]",
          "hover:-translate-y-1 hover:scale-[1.02]",
          "active:translate-y-0 active:scale-[0.98]"
        ],
        disabled: [
          "bg-bg-subtle border-border-subtle",
          "opacity-60 cursor-not-allowed",
          "shadow-none"
        ]
      },
      size: {
        xs: "rounded-md p-2",
        sm: "rounded-lg p-3",
        md: "rounded-xl p-4",
        lg: "rounded-2xl p-6",
        xl: "rounded-3xl p-8"
      },
      glow: {
        none: "",
        soft: "shadow-glow-brand",
        medium: "shadow-[0_0_20px_rgba(106,230,166,0.3)]",
        strong: "shadow-[0_0_30px_rgba(106,230,166,0.5)]"
      }
    },
    defaultVariants: {
      variant: "hybrid",
      size: "md",
      glow: "none"
    }
  }
);
var Card = React3.forwardRef(
  ({
    className,
    variant,
    size,
    glow,
    onClick,
    disabled = false,
    loading = false,
    animated = true,
    children,
    ...props
  }, ref) => {
    const isInteractive = (variant === "interactive" || variant === "music" || variant === "waveform") && !disabled;
    const isDisabled = disabled || variant === "disabled";
    return /* @__PURE__ */ jsxs2(
      "div",
      {
        className: cn(
          cardVariants({ variant, size, glow }),
          isInteractive && "cursor-pointer",
          isDisabled && "pointer-events-none",
          loading && "animate-pulse",
          animated && "transition-all duration-300 ease-out",
          className
        ),
        onClick: isInteractive ? onClick : void 0,
        ref,
        role: isInteractive ? "button" : void 0,
        tabIndex: isInteractive ? 0 : void 0,
        onKeyDown: (e) => {
          if (isInteractive && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onClick?.();
          }
        },
        ...props,
        children: [
          loading && /* @__PURE__ */ jsx3("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" }),
          children
        ]
      }
    );
  }
);
Card.displayName = "Card";
var CardHeader = React3.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx3(
    "div",
    {
      ref,
      className: cn(
        "flex flex-col space-y-2 p-6 relative z-10",
        "group-hover:translate-y-[-2px] transition-transform duration-300",
        className
      ),
      ...props
    }
  )
);
CardHeader.displayName = "CardHeader";
var CardTitle = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx3(
  "h3",
  {
    ref,
    className: cn(
      "text-xl font-bold leading-tight tracking-tight",
      "bg-gradient-to-r from-fg-default to-fg-muted bg-clip-text text-transparent",
      "group-hover:from-brand-primary group-hover:to-brand-accent",
      "transition-all duration-300",
      className
    ),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
var CardDescription = React3.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx3(
  "p",
  {
    ref,
    className: cn(
      "text-sm text-fg-muted leading-relaxed",
      "group-hover:text-fg-default transition-colors duration-300",
      className
    ),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
var CardContent = React3.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx3(
    "div",
    {
      ref,
      className: cn(
        "p-6 pt-0 relative z-10",
        "group-hover:translate-y-[-1px] transition-transform duration-300",
        className
      ),
      ...props
    }
  )
);
CardContent.displayName = "CardContent";
var CardFooter = React3.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx3(
    "div",
    {
      ref,
      className: cn(
        "flex items-center justify-between p-6 pt-0 relative z-10",
        "group-hover:translate-y-[-1px] transition-transform duration-300",
        className
      ),
      ...props
    }
  )
);
CardFooter.displayName = "CardFooter";
var CardIcon = React3.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx3(
    "div",
    {
      ref,
      className: cn(
        "flex items-center justify-center w-12 h-12 rounded-xl",
        "bg-gradient-to-br from-brand-primary to-brand-accent",
        "shadow-lg group-hover:shadow-xl group-hover:scale-110",
        "transition-all duration-300",
        className
      ),
      ...props
    }
  )
);
CardIcon.displayName = "CardIcon";
var CardBadge = React3.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx3(
    "span",
    {
      ref,
      className: cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        "bg-brand-primary/20 text-brand-primary border border-brand-primary/30",
        "group-hover:bg-brand-primary/30 group-hover:border-brand-primary/50",
        "transition-all duration-300",
        className
      ),
      ...props
    }
  )
);
CardBadge.displayName = "CardBadge";

// src/core/Input.tsx
import { cva as cva4 } from "class-variance-authority";
import React4 from "react";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var inputVariants = cva4(
  "flex h-10 w-full rounded-md border bg-bg-elevated px-3 py-2 text-sm ring-offset-bg transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-fg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-border-default focus-visible:ring-primary",
        error: "border-error focus-visible:ring-error",
        success: "border-success focus-visible:ring-success"
      },
      size: {
        sm: "h-8 px-2 text-xs",
        md: "h-10 px-3 text-sm",
        lg: "h-11 px-4 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
var Input = React4.forwardRef(
  ({ className, variant, size, label, error, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const hasError = Boolean(error);
    const inputVariant = hasError ? "error" : variant;
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    return /* @__PURE__ */ jsxs3("div", { className: "space-y-1", children: [
      label && /* @__PURE__ */ jsxs3("label", { htmlFor: inputId, className: "text-sm font-medium text-fg", children: [
        label,
        props.required && /* @__PURE__ */ jsx4("span", { className: "text-error ml-1", children: "*" })
      ] }),
      /* @__PURE__ */ jsxs3("div", { className: "relative", children: [
        leftIcon && /* @__PURE__ */ jsx4("div", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted", children: leftIcon }),
        /* @__PURE__ */ jsx4(
          "input",
          {
            id: inputId,
            className: cn(
              inputVariants({ variant: inputVariant, size }),
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            ),
            ref,
            ...props
          }
        ),
        rightIcon && /* @__PURE__ */ jsx4("div", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted", children: rightIcon })
      ] }),
      error && /* @__PURE__ */ jsx4("p", { className: "text-sm text-error", children: error }),
      helperText && !error && /* @__PURE__ */ jsx4("p", { className: "text-sm text-fg-muted", children: helperText })
    ] });
  }
);
Input.displayName = "Input";

// src/core/Select.tsx
import { cva as cva5 } from "class-variance-authority";
import React5 from "react";
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
var selectVariants = cva5(
  "flex h-10 w-full items-center justify-between rounded-md border bg-bg-elevated px-3 py-2 text-sm ring-offset-bg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-border-default focus-visible:ring-primary",
        error: "border-error focus-visible:ring-error",
        success: "border-success focus-visible:ring-success"
      },
      size: {
        sm: "h-8 px-2 text-xs",
        md: "h-10 px-3 text-sm",
        lg: "h-11 px-4 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
var Select = React5.forwardRef(
  ({
    className,
    variant,
    size,
    label,
    error,
    helperText,
    placeholder,
    options,
    leftIcon,
    rightIcon,
    id,
    ...props
  }, ref) => {
    const hasError = Boolean(error);
    const selectVariant = hasError ? "error" : variant;
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    return /* @__PURE__ */ jsxs4("div", { className: "space-y-1", children: [
      label && /* @__PURE__ */ jsxs4("label", { htmlFor: selectId, className: "text-sm font-medium text-fg", children: [
        label,
        props.required && /* @__PURE__ */ jsx5("span", { className: "text-error ml-1", children: "*" })
      ] }),
      /* @__PURE__ */ jsxs4("div", { className: "relative", children: [
        leftIcon && /* @__PURE__ */ jsx5("div", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted", children: leftIcon }),
        /* @__PURE__ */ jsxs4(
          "select",
          {
            id: selectId,
            className: cn(
              selectVariants({ variant: selectVariant, size }),
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            ),
            ref,
            ...props,
            children: [
              placeholder && /* @__PURE__ */ jsx5("option", { value: "", disabled: true, children: placeholder }),
              options.map((option) => /* @__PURE__ */ jsx5("option", { value: option.value, disabled: option.disabled, children: option.label }, option.value))
            ]
          }
        ),
        rightIcon && /* @__PURE__ */ jsx5("div", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted", children: rightIcon })
      ] }),
      error && /* @__PURE__ */ jsx5("p", { className: "text-sm text-error", children: error }),
      helperText && !error && /* @__PURE__ */ jsx5("p", { className: "text-sm text-fg-muted", children: helperText })
    ] });
  }
);
Select.displayName = "Select";

// src/core/Checkbox.tsx
import { cva as cva6 } from "class-variance-authority";
import React6 from "react";
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
var checkboxVariants = cva6(
  "peer h-4 w-4 shrink-0 rounded-sm border border-border-default ring-offset-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-fg-inverse data-[state=checked]:border-primary",
  {
    variants: {
      size: {
        sm: "h-3 w-3",
        md: "h-4 w-4",
        lg: "h-5 w-5"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
var Checkbox = React6.forwardRef(
  ({ className, size, label, error, helperText, indeterminate = false, id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = Boolean(error);
    return /* @__PURE__ */ jsxs5("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxs5("div", { className: "flex items-start space-x-2", children: [
        /* @__PURE__ */ jsxs5("div", { className: "relative", children: [
          /* @__PURE__ */ jsx6(
            "input",
            {
              type: "checkbox",
              id: checkboxId,
              ref,
              className: cn(checkboxVariants({ size }), className),
              "data-state": indeterminate ? "indeterminate" : void 0,
              ...props
            }
          ),
          indeterminate && /* @__PURE__ */ jsx6("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx6(
            "svg",
            {
              className: "h-3 w-3 text-fg-inverse",
              fill: "currentColor",
              viewBox: "0 0 20 20",
              role: "img",
              "aria-label": "Indeterminate",
              children: /* @__PURE__ */ jsx6(
                "path",
                {
                  fillRule: "evenodd",
                  d: "M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z",
                  clipRule: "evenodd"
                }
              )
            }
          ) })
        ] }),
        label && /* @__PURE__ */ jsxs5(
          "label",
          {
            htmlFor: checkboxId,
            className: cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              hasError && "text-error"
            ),
            children: [
              label,
              props.required && /* @__PURE__ */ jsx6("span", { className: "text-error ml-1", children: "*" })
            ]
          }
        )
      ] }),
      error && /* @__PURE__ */ jsx6("p", { className: "text-sm text-error", children: error }),
      helperText && !error && /* @__PURE__ */ jsx6("p", { className: "text-sm text-fg-muted", children: helperText })
    ] });
  }
);
Checkbox.displayName = "Checkbox";

// src/data/Tag.tsx
import { forwardRef } from "react";
import { jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
var Tag = forwardRef(
  ({ className, children, onClose, ...props }, ref) => /* @__PURE__ */ jsxs6(
    "div",
    {
      ref,
      className: cn(
        "inline-flex items-center gap-1 rounded-full bg-fg/10 px-2 py-1 text-sm text-fg/80 hover:bg-fg/20",
        className
      ),
      ...props,
      children: [
        children,
        onClose && /* @__PURE__ */ jsx7(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "ml-1 h-4 w-4 rounded-full hover:bg-fg/30 focus:outline-none focus:ring-1 focus:ring-fg/50",
            "aria-label": "Remove tag",
            children: /* @__PURE__ */ jsx7(
              "svg",
              {
                className: "h-3 w-3",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                "aria-hidden": "true",
                children: /* @__PURE__ */ jsx7(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M6 18L18 6M6 6l12 12"
                  }
                )
              }
            )
          }
        )
      ]
    }
  )
);
Tag.displayName = "Tag";

// src/media/Player.tsx
import { forwardRef as forwardRef2, useEffect as useEffect2, useRef, useState as useState2 } from "react";

// src/icons/index.ts
import {
  Play,
  Pause,
  ChevronRight,
  ChevronDown,
  Tag as Tag2,
  Music,
  Download,
  Loader2,
  Volume2,
  VolumeX,
  VolumeX as VolumeX2,
  SkipBack,
  SkipForward,
  Check,
  CheckCircle,
  CreditCard,
  Lock,
  ShoppingCart,
  X,
  XCircle,
  ArrowRight,
  Star,
  Wallet,
  ExternalLink,
  Upload,
  AlertCircle,
  AlertTriangle,
  File,
  Clock,
  Info,
  Archive,
  Copy,
  Edit,
  Globe,
  MoreHorizontal,
  MoreVertical,
  Trash2,
  Archive as Archive2,
  Save
} from "lucide-react";
import { Play as Play2 } from "lucide-react";
import { Activity } from "lucide-react";
import { Music2 } from "lucide-react";

// src/media/Player.tsx
import { jsx as jsx8, jsxs as jsxs7 } from "react/jsx-runtime";
var Player = forwardRef2(
  ({ className, src, title, clamp, onEnd, showDownload = false, ...props }, ref) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState2(false);
    const [currentTime, setCurrentTime] = useState2(0);
    const [duration, setDuration] = useState2(0);
    const [volume, setVolume] = useState2(1);
    const [isLoading, setIsLoading] = useState2(false);
    useEffect2(() => {
      const audio = audioRef.current;
      if (!audio) return;
      const handleTimeUpdate = () => {
        const time = audio.currentTime;
        setCurrentTime(time);
        if (clamp && time >= clamp) {
          audio.pause();
          setIsPlaying(false);
          onEnd?.();
        }
      };
      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
        setIsLoading(false);
      };
      const handleEnded = () => {
        setIsPlaying(false);
        onEnd?.();
      };
      const handleLoadStart = () => {
        setIsLoading(true);
      };
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("loadstart", handleLoadStart);
      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("loadstart", handleLoadStart);
      };
    }, [clamp, onEnd]);
    const togglePlay = async () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (error) {
          console.error("Playback failed:", error);
        }
      }
    };
    const handleSeek = (e) => {
      const audio = audioRef.current;
      if (!audio || clamp) return;
      const newTime = Number.parseFloat(e.target.value);
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    };
    const handleVolumeChange = (e) => {
      const audio = audioRef.current;
      if (!audio) return;
      const newVolume = Number.parseFloat(e.target.value);
      audio.volume = newVolume;
      setVolume(newVolume);
    };
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        togglePlay();
      }
    };
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    };
    const progress = duration > 0 ? currentTime / duration * 100 : 0;
    return /* @__PURE__ */ jsxs7(
      "section",
      {
        ref,
        className: cn(
          "flex flex-col gap-3 p-4",
          "bg-[var(--color-bg-elevated,#121520)]",
          "border border-[var(--border-subtle,rgba(255,255,255,0.10))]",
          "rounded-[var(--radius-lg,16px)]",
          "shadow-[var(--shadow-2,0_8px_32px_0_rgba(0,0,0,0.35))]",
          className
        ),
        "aria-label": `Audio player for ${title}`,
        ...props,
        children: [
          /* @__PURE__ */ jsx8("audio", { ref: audioRef, src, preload: "metadata", children: /* @__PURE__ */ jsx8("track", { kind: "captions", src: "", label: "No captions available" }) }),
          /* @__PURE__ */ jsxs7("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx8(
              "button",
              {
                type: "button",
                onClick: togglePlay,
                disabled: isLoading,
                className: cn(
                  "flex items-center justify-center w-10 h-10",
                  "rounded-full bg-[var(--color-brand-primary,#6AE6A6)]",
                  "text-[var(--color-fg-inverse,#0B0D12)]",
                  "hover:bg-[var(--color-brand-primary-hover,#5ADFA0)]",
                  "active:scale-95",
                  "cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent,#5BD0FF)]",
                  "transition-all duration-150"
                ),
                "aria-label": isPlaying ? `Pause ${title}` : `Play ${title}`,
                "aria-pressed": isPlaying,
                children: isLoading ? /* @__PURE__ */ jsx8(Loader2, { className: "w-5 h-5 animate-spin", "aria-hidden": "true" }) : isPlaying ? /* @__PURE__ */ jsx8(Pause, { className: "w-5 h-5", "aria-hidden": "true" }) : /* @__PURE__ */ jsx8(Play, { className: "w-5 h-5", "aria-hidden": "true" })
              }
            ),
            /* @__PURE__ */ jsxs7("div", { className: "flex items-center gap-2 text-sm text-[var(--color-fg-muted,#A9B1C1)]", children: [
              /* @__PURE__ */ jsx8("span", { "aria-label": `Current time: ${formatTime(currentTime)}`, children: formatTime(currentTime) }),
              /* @__PURE__ */ jsx8("span", { "aria-hidden": "true", children: "/" }),
              /* @__PURE__ */ jsx8(
                "span",
                {
                  "aria-label": `Duration: ${formatTime(clamp ? Math.min(clamp, duration) : duration)}`,
                  children: formatTime(clamp ? Math.min(clamp, duration) : duration)
                }
              )
            ] }),
            showDownload && !clamp && /* @__PURE__ */ jsx8(
              "a",
              {
                href: src,
                download: title,
                className: cn(
                  "ml-auto p-2",
                  "text-[var(--color-fg-muted,#A9B1C1)]",
                  "hover:text-[var(--color-fg,#E6EAF2)]",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent,#5BD0FF)]",
                  "rounded-[var(--radius-sm,8px)]",
                  "transition-colors duration-150"
                ),
                "aria-label": `Download ${title}`,
                children: /* @__PURE__ */ jsx8(Download, { className: "w-4 h-4", "aria-hidden": "true" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx8("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx8(
            "input",
            {
              type: "range",
              min: "0",
              max: clamp ? clamp : duration,
              value: currentTime,
              onChange: handleSeek,
              disabled: !!clamp,
              className: cn(
                "flex-1 h-2 rounded-lg appearance-none cursor-pointer",
                "bg-[var(--color-bg-muted,#0F131B)]",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent,#5BD0FF)]"
              ),
              role: "progressbar",
              "aria-valuenow": currentTime,
              "aria-valuemin": 0,
              "aria-valuemax": clamp ? clamp : duration,
              "aria-label": "Audio progress"
            }
          ) }),
          /* @__PURE__ */ jsxs7("div", { className: "hidden sm:flex items-center gap-2", children: [
            /* @__PURE__ */ jsx8(Volume2, { className: "w-4 h-4 text-[var(--color-fg-muted,#A9B1C1)]", "aria-hidden": "true" }),
            /* @__PURE__ */ jsx8(
              "input",
              {
                type: "range",
                min: "0",
                max: "1",
                step: "0.1",
                value: volume,
                onChange: handleVolumeChange,
                className: cn(
                  "w-20 h-2 rounded-lg appearance-none cursor-pointer",
                  "bg-[var(--color-bg-muted,#0F131B)]",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent,#5BD0FF)]"
                ),
                "aria-label": "Volume",
                "aria-valuenow": Math.round(volume * 100),
                "aria-valuemin": 0,
                "aria-valuemax": 100
              }
            )
          ] })
        ]
      }
    );
  }
);
Player.displayName = "Player";

// src/media/CatalogCard.tsx
import { jsx as jsx9, jsxs as jsxs8 } from "react/jsx-runtime";
var catalogCardVariants = cva(
  "group relative overflow-hidden rounded-md border transition-transform duration-150 will-change-transform focus-within:outline focus-within:outline-2 focus-within:outline-brand-accent hover:translate-y-[-1px]",
  {
    variants: {
      variant: {
        default: "border-border-emphasis bg-bg-elevated shadow-ambient-2",
        compact: "border-border-subtle bg-bg-elevated shadow-ambient-1",
        minimal: "border-border-hairline bg-bg-elevated"
      },
      size: {
        sm: "p-2",
        md: "p-3",
        lg: "p-4"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
function CatalogCard({
  id,
  title,
  producer,
  price,
  bpm,
  keySig,
  tags = [],
  artworkUrl,
  previewUrl,
  // Extract but don't use
  isPlaying,
  onPreviewToggle,
  onOpen,
  variant,
  size,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx9(
    "article",
    {
      className: cn(catalogCardVariants({ variant, size }), className),
      "data-testid": "catalog-card",
      ...props,
      children: /* @__PURE__ */ jsxs8("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsx9(
          "div",
          {
            className: cn(
              "h-16 w-16 shrink-0 overflow-hidden rounded-md",
              !artworkUrl && "bg-bg-muted"
            ),
            "aria-hidden": true,
            children: artworkUrl ? /* @__PURE__ */ jsx9("img", { src: artworkUrl, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsx9("div", { className: "h-full w-full bg-gradient-to-br from-brand-primary/10 to-brand-accent/10" })
          }
        ),
        /* @__PURE__ */ jsxs8("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsx9("h3", { className: "truncate text-fg-default text-base font-semibold", children: title }),
          /* @__PURE__ */ jsx9("p", { className: "truncate text-fg-muted text-sm", children: producer }),
          /* @__PURE__ */ jsxs8("div", { className: "mt-2 flex flex-wrap items-center gap-2", children: [
            typeof bpm === "number" && /* @__PURE__ */ jsxs8(Tag, { className: "text-xs px-1.5 py-0.5 bg-bg-muted text-fg-muted", children: [
              bpm,
              " BPM"
            ] }),
            keySig && /* @__PURE__ */ jsx9(Tag, { className: "text-xs px-1.5 py-0.5 bg-bg-muted text-fg-muted", children: keySig }),
            tags.slice(0, 3).map((t) => /* @__PURE__ */ jsx9(Tag, { className: "text-xs px-1.5 py-0.5 bg-brand-primary/20 text-brand-primary", children: t }, t)),
            tags.length > 3 && /* @__PURE__ */ jsxs8(Tag, { className: "text-xs px-1.5 py-0.5 bg-bg-muted text-fg-subtle", children: [
              "+",
              tags.length - 3
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs8("div", { className: "flex h-16 w-16 shrink-0 flex-col items-end justify-between", children: [
          /* @__PURE__ */ jsx9(
            "button",
            {
              type: "button",
              "aria-label": isPlaying ? `Pause preview of ${title}` : `Play 30-second preview of ${title}`,
              className: cn(
                "grid h-9 w-9 place-content-center rounded-md border",
                "border-border-subtle bg-bg-muted",
                "hover:bg-brand-primary/10 active:scale-[0.98]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent",
                "transition-all duration-150"
              ),
              onClick: () => onPreviewToggle?.(id),
              "data-testid": "preview-toggle",
              children: isPlaying ? /* @__PURE__ */ jsx9(Pause, { className: "h-4 w-4", "aria-hidden": "true" }) : /* @__PURE__ */ jsx9(Play, { className: "h-4 w-4", "aria-hidden": "true" })
            }
          ),
          /* @__PURE__ */ jsxs8("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx9("div", { className: "text-fg-default text-sm font-semibold", children: price }),
            /* @__PURE__ */ jsxs8(
              "button",
              {
                type: "button",
                className: "inline-flex items-center gap-1 text-brand-accent text-xs hover:opacity-90 focus:underline focus:outline-none",
                onClick: () => onOpen?.(id),
                "aria-label": `Open details for ${title}`,
                children: [
                  "Details ",
                  /* @__PURE__ */ jsx9(ChevronRight, { className: "h-3.5 w-3.5", "aria-hidden": "true" })
                ]
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
export {
  Activity as Bpm,
  Button,
  Card,
  CardBadge,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardIcon,
  CardTitle,
  CatalogCard,
  Checkbox,
  ChevronRight,
  Download,
  Input,
  Music2 as KeySig,
  Music,
  Pause,
  Play,
  Player,
  Select,
  Loader2 as Spinner,
  Tag,
  Tag2 as TagIcon,
  ThemeProvider,
  Volume2 as Volume,
  VolumeX as VolumeMute,
  Play2 as Wave,
  cn,
  useTheme
};
//# sourceMappingURL=index.js.map