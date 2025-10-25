"use client";
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Bpm: () => import_lucide_react3.Activity,
  Button: () => Button,
  Card: () => Card,
  CardBadge: () => CardBadge,
  CardContent: () => CardContent,
  CardDescription: () => CardDescription,
  CardFooter: () => CardFooter,
  CardHeader: () => CardHeader,
  CardIcon: () => CardIcon,
  CardImage: () => CardImage,
  CardTitle: () => CardTitle,
  CatalogCard: () => CatalogCard,
  Checkbox: () => Checkbox,
  ChevronLeft: () => import_lucide_react.ChevronLeft,
  ChevronRight: () => import_lucide_react.ChevronRight,
  Download: () => import_lucide_react.Download,
  HeroImage: () => HeroImage,
  Input: () => Input,
  KeySig: () => import_lucide_react4.Music2,
  Music: () => import_lucide_react.Music,
  OptimizedImage: () => OptimizedImage,
  Pagination: () => Pagination,
  Pause: () => import_lucide_react.Pause,
  Play: () => import_lucide_react.Play,
  Player: () => Player,
  Select: () => Select,
  Spinner: () => import_lucide_react.Loader2,
  Tag: () => Tag,
  TagIcon: () => import_lucide_react.Tag,
  ThemeProvider: () => ThemeProvider,
  ThumbnailImage: () => ThumbnailImage,
  Volume: () => import_lucide_react.Volume2,
  VolumeMute: () => import_lucide_react.VolumeX,
  Wave: () => import_lucide_react2.Play,
  cn: () => cn,
  useTheme: () => useTheme
});
module.exports = __toCommonJS(src_exports);

// src/theme/Provider.tsx
var import_react = require("react");
var React = __toESM(require("react"), 1);
var import_jsx_runtime = require("react/jsx-runtime");
var ThemeContext = (0, import_react.createContext)(void 0);
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
  const [systemTheme, setSystemTheme] = (0, import_react.useState)(() => getSystemTheme());
  const [theme, setThemeState] = (0, import_react.useState)(() => {
    const stored = getStoredTheme();
    return stored ?? defaultTheme;
  });
  (0, import_react.useEffect)(() => {
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
  (0, import_react.useEffect)(() => {
    const root = window.document.documentElement;
    root.classList.remove("dark", "light", "high-contrast");
    root.classList.add(theme);
    root.setAttribute("data-theme", theme);
  }, [theme]);
  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    storeTheme(newTheme);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, { value: { theme, setTheme, systemTheme }, children });
}
function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === void 0) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// src/utils/cn.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}

// src/utils/cva.ts
var import_class_variance_authority = require("class-variance-authority");

// src/core/Button.tsx
var import_class_variance_authority2 = require("class-variance-authority");
var import_react2 = __toESM(require("react"), 1);
var import_jsx_runtime2 = require("react/jsx-runtime");
var buttonVariants = (0, import_class_variance_authority2.cva)(
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
var Button = import_react2.default.forwardRef(
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
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "button",
      {
        className: cn(buttonVariants({ variant, size, loading }), className),
        disabled: isDisabled,
        ref,
        ...props,
        children: [
          loading && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            "svg",
            {
              className: "h-4 w-4 animate-spin",
              fill: "none",
              viewBox: "0 0 24 24",
              xmlns: "http://www.w3.org/2000/svg",
              role: "img",
              "aria-label": "Loading",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
          !loading && leftIcon && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "flex-shrink-0", children: leftIcon }),
          children && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children }),
          !loading && rightIcon && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "flex-shrink-0", children: rightIcon })
        ]
      }
    );
  }
);
Button.displayName = "Button";

// src/core/Card.tsx
var import_class_variance_authority3 = require("class-variance-authority");
var import_react3 = __toESM(require("react"), 1);
var import_jsx_runtime3 = require("react/jsx-runtime");
var cardVariants = (0, import_class_variance_authority3.cva)("relative overflow-hidden transition-all duration-300 ease-out group", {
  variants: {
    variant: {
      // SINGULAR Glass-Neumorphic Hybrid Design - The Ultimate Fusion
      default: [
        // Glass Foundation with Neumorphic Depth
        "bg-gradient-to-br from-white/20 via-white/10 to-white/5",
        "backdrop-blur-xl backdrop-saturate-150",
        "border border-white/30",
        // Neumorphic Inset Shadows (Soft & Tactile)
        "shadow-[inset_-1px_-1px_3px_rgba(255,255,255,0.3),inset_1px_1px_3px_rgba(0,0,0,0.1)]",
        // Glass Outer Glow with Neumorphic Depth
        "shadow-[0_8px_32px_0_rgba(31,38,135,0.2),0_4px_16px_0_rgba(0,0,0,0.1)]",
        // Hybrid Hover Effects
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/15 before:via-white/5 before:to-transparent before:opacity-0 before:transition-all before:duration-300",
        "hover:before:opacity-100",
        "hover:shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.4),inset_2px_2px_4px_rgba(0,0,0,0.15),0_12px_40px_0_rgba(31,38,135,0.3),0_6px_20px_0_rgba(0,0,0,0.15)]",
        "hover:border-white/40 hover:-translate-y-1 hover:scale-[1.02]",
        // Active Press State (Neumorphic Feedback)
        "active:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2),inset_-1px_-1px_2px_rgba(255,255,255,0.1)]",
        "active:translate-y-0 active:scale-[0.98]"
      ],
      // Premium Music Variant (Same Hybrid, Brand Colors)
      music: [
        "bg-gradient-to-br from-brand-primary/25 via-brand-accent/15 to-brand-primary/5",
        "backdrop-blur-xl backdrop-saturate-150",
        "border border-brand-primary/40",
        // Neumorphic Inset with Brand Colors
        "shadow-[inset_-1px_-1px_3px_rgba(106,230,166,0.3),inset_1px_1px_3px_rgba(0,0,0,0.1)]",
        "shadow-[0_8px_32px_0_rgba(106,230,166,0.25),0_4px_16px_0_rgba(0,0,0,0.1)]",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-brand-primary/20 before:via-brand-accent/10 before:to-transparent before:opacity-0 before:transition-all before:duration-300",
        "hover:before:opacity-100",
        "hover:shadow-[inset_-2px_-2px_4px_rgba(106,230,166,0.4),inset_2px_2px_4px_rgba(0,0,0,0.15),0_12px_40px_0_rgba(106,230,166,0.35),0_6px_20px_0_rgba(0,0,0,0.15)]",
        "hover:border-brand-primary/50 hover:-translate-y-1 hover:scale-[1.02]",
        "active:shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2),inset_-1px_-1px_2px_rgba(106,230,166,0.2)]",
        "active:translate-y-0 active:scale-[0.98]"
      ],
      // Disabled State
      disabled: [
        "bg-bg-subtle border-border-subtle",
        "opacity-60 cursor-not-allowed",
        "shadow-none backdrop-blur-none"
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
    variant: "default",
    size: "md",
    glow: "none"
  }
});
var Card = import_react3.default.forwardRef(
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
    const isInteractive = (variant === "default" || variant === "music") && !disabled;
    const isDisabled = disabled || variant === "disabled";
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
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
          loading && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" }),
          children
        ]
      }
    );
  }
);
Card.displayName = "Card";
var CardHeader = import_react3.default.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
var CardTitle = import_react3.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
var CardDescription = import_react3.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
var CardContent = import_react3.default.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
var CardFooter = import_react3.default.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
var CardIcon = import_react3.default.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
var CardBadge = import_react3.default.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
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
var import_class_variance_authority4 = require("class-variance-authority");
var import_react4 = __toESM(require("react"), 1);
var import_jsx_runtime4 = require("react/jsx-runtime");
var inputVariants = (0, import_class_variance_authority4.cva)(
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
var Input = import_react4.default.forwardRef(
  ({ className, variant, size, label, error, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const hasError = Boolean(error);
    const inputVariant = hasError ? "error" : variant;
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "space-y-1", children: [
      label && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("label", { htmlFor: inputId, className: "text-sm font-medium text-fg", children: [
        label,
        props.required && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-error ml-1", children: "*" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "relative", children: [
        leftIcon && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted", children: leftIcon }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
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
        rightIcon && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted", children: rightIcon })
      ] }),
      error && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-sm text-error", children: error }),
      helperText && !error && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-sm text-fg-muted", children: helperText })
    ] });
  }
);
Input.displayName = "Input";

// src/core/Select.tsx
var import_class_variance_authority5 = require("class-variance-authority");
var import_react5 = __toESM(require("react"), 1);
var import_jsx_runtime5 = require("react/jsx-runtime");
var selectVariants = (0, import_class_variance_authority5.cva)(
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
var Select = import_react5.default.forwardRef(
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
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "space-y-1", children: [
      label && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("label", { htmlFor: selectId, className: "text-sm font-medium text-fg", children: [
        label,
        props.required && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-error ml-1", children: "*" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "relative", children: [
        leftIcon && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted", children: leftIcon }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
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
              placeholder && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("option", { value: "", disabled: true, children: placeholder }),
              options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("option", { value: option.value, disabled: option.disabled, children: option.label }, option.value))
            ]
          }
        ),
        rightIcon && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted", children: rightIcon })
      ] }),
      error && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-sm text-error", children: error }),
      helperText && !error && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-sm text-fg-muted", children: helperText })
    ] });
  }
);
Select.displayName = "Select";

// src/core/Checkbox.tsx
var import_class_variance_authority6 = require("class-variance-authority");
var import_react6 = __toESM(require("react"), 1);
var import_jsx_runtime6 = require("react/jsx-runtime");
var checkboxVariants = (0, import_class_variance_authority6.cva)(
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
var Checkbox = import_react6.default.forwardRef(
  ({ className, size, label, error, helperText, indeterminate = false, id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = Boolean(error);
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "space-y-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-start space-x-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "relative", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
          indeterminate && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "svg",
            {
              className: "h-3 w-3 text-fg-inverse",
              fill: "currentColor",
              viewBox: "0 0 20 20",
              role: "img",
              "aria-label": "Indeterminate",
              children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
        label && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
          "label",
          {
            htmlFor: checkboxId,
            className: cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              hasError && "text-error"
            ),
            children: [
              label,
              props.required && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-error ml-1", children: "*" })
            ]
          }
        )
      ] }),
      error && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-sm text-error", children: error }),
      helperText && !error && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-sm text-fg-muted", children: helperText })
    ] });
  }
);
Checkbox.displayName = "Checkbox";

// src/data/Tag.tsx
var import_react7 = require("react");
var import_jsx_runtime7 = require("react/jsx-runtime");
var Tag = (0, import_react7.forwardRef)(
  ({ className, children, onClose, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
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
        onClose && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "ml-1 h-4 w-4 rounded-full hover:bg-fg/30 focus:outline-none focus:ring-1 focus:ring-fg/50",
            "aria-label": "Remove tag",
            children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
              "svg",
              {
                className: "h-3 w-3",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                "aria-hidden": "true",
                children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
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
var import_react8 = require("react");

// src/icons/index.ts
var import_lucide_react = require("lucide-react");
var import_lucide_react2 = require("lucide-react");
var import_lucide_react3 = require("lucide-react");
var import_lucide_react4 = require("lucide-react");

// src/media/Player.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
var Player = (0, import_react8.forwardRef)(
  ({ className, src, title, clamp, onEnd, showDownload = false, ...props }, ref) => {
    const audioRef = (0, import_react8.useRef)(null);
    const [isPlaying, setIsPlaying] = (0, import_react8.useState)(false);
    const [currentTime, setCurrentTime] = (0, import_react8.useState)(0);
    const [duration, setDuration] = (0, import_react8.useState)(0);
    const [volume, setVolume] = (0, import_react8.useState)(1);
    const [isLoading, setIsLoading] = (0, import_react8.useState)(false);
    (0, import_react8.useEffect)(() => {
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
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
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
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("audio", { ref: audioRef, src, preload: "metadata", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("track", { kind: "captions", src: "", label: "No captions available" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
                children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_lucide_react.Loader2, { className: "w-5 h-5 animate-spin", "aria-hidden": "true" }) : isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_lucide_react.Pause, { className: "w-5 h-5", "aria-hidden": "true" }) : /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_lucide_react.Play, { className: "w-5 h-5", "aria-hidden": "true" })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex items-center gap-2 text-sm text-[var(--color-fg-muted,#A9B1C1)]", children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { "aria-label": `Current time: ${formatTime(currentTime)}`, children: formatTime(currentTime) }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { "aria-hidden": "true", children: "/" }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                "span",
                {
                  "aria-label": `Duration: ${formatTime(clamp ? Math.min(clamp, duration) : duration)}`,
                  children: formatTime(clamp ? Math.min(clamp, duration) : duration)
                }
              )
            ] }),
            showDownload && !clamp && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
                children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_lucide_react.Download, { className: "w-4 h-4", "aria-hidden": "true" })
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "hidden sm:flex items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(import_lucide_react.Volume2, { className: "w-4 h-4 text-[var(--color-fg-muted,#A9B1C1)]", "aria-hidden": "true" }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
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
var import_react9 = require("react");

// src/media/OptimizedImage.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
function OptimizedImage({
  assetId,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw",
  quality = 80,
  placeholder = "empty",
  blurDataURL,
  baseUrl,
  fallbackSrc
}) {
  const base = baseUrl || (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");
  const srcSet = generateSrcSet(assetId, base);
  const src = `${base}/api/images/${assetId}/cover_1024.webp`;
  const fallback = fallbackSrc || `${base}/api/images/${assetId}/cover_1024.jpg`;
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    "img",
    {
      src,
      alt,
      className: cn("object-cover", className),
      loading: priority ? "eager" : "lazy",
      sizes,
      onError: (e) => {
        const target = e.target;
        if (target.src !== fallback) {
          target.src = fallback;
        }
      }
    }
  );
}
function generateSrcSet(assetId, baseUrl) {
  const sizes = [512, 1024, 3e3];
  return sizes.map((size) => {
    const webpUrl = `${baseUrl}/api/images/${assetId}/cover_${size}.webp`;
    const jpegUrl = `${baseUrl}/api/images/${assetId}/cover_${size}.jpg`;
    return `${webpUrl} ${size}w, ${jpegUrl} ${size}w`;
  }).join(", ");
}
var IMAGE_SIZES = {
  thumbnail: {
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw",
    srcSet: "512w, 1024w"
  },
  hero: {
    sizes: "(max-width: 1200px) 100vw, 80vw",
    srcSet: "1024w, 3000w"
  },
  card: {
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw",
    srcSet: "512w, 1024w"
  }
};
function ThumbnailImage({
  assetId,
  alt,
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    OptimizedImage,
    {
      assetId,
      alt,
      className: cn("w-full h-full", className),
      sizes: IMAGE_SIZES.thumbnail.sizes,
      ...props
    }
  );
}
function HeroImage({
  assetId,
  alt,
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    OptimizedImage,
    {
      assetId,
      alt,
      className: cn("w-full h-full", className),
      sizes: IMAGE_SIZES.hero.sizes,
      priority: true,
      ...props
    }
  );
}
function CardImage({
  assetId,
  alt,
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    OptimizedImage,
    {
      assetId,
      alt,
      className: cn("w-full h-full", className),
      sizes: IMAGE_SIZES.card.sizes,
      ...props
    }
  );
}

// src/media/CatalogCard.tsx
var import_jsx_runtime10 = require("react/jsx-runtime");
var CTA_TEXT = {
  neutral: "Get This",
  track: "Get the Track",
  loop: "Get the Loop",
  kit: "Get the Kit",
  pack: "Get the Pack",
  license: "Get License",
  brand: "Get the Sound",
  premium: "Get Yours",
  access: "Get Access",
  marketing: "Get Into It"
};
var catalogCardVariants = (0, import_class_variance_authority.cva)(
  "group relative overflow-hidden transition-all duration-300 ease-out cursor-pointer backdrop-blur-sm",
  {
    variants: {
      variant: {
        default: "bg-card",
        music: "bg-card",
        disabled: "bg-card/50 cursor-not-allowed opacity-60"
      },
      size: {
        xs: "rounded-lg p-3 gap-2",
        sm: "rounded-lg p-4 gap-3",
        md: "rounded-xl p-5 gap-4",
        lg: "rounded-xl p-6 gap-5",
        xl: "rounded-2xl p-8 gap-6"
      },
      glow: {
        none: "",
        soft: "shadow-elevation-ambient-1 hover:shadow-elevation-ambient-2",
        medium: "shadow-elevation-ambient-2 hover:shadow-elevation-ambient-3",
        strong: "shadow-elevation-ambient-3 hover:shadow-elevation-glow-brand-soft"
      },
      density: {
        comfy: "",
        compact: "p-3 gap-2"
      },
      ctaMode: {
        neutral: "border-cta-neutral hover:border-cta-neutral-hover shadow-elevation-cta-neutral",
        track: "border-cta-track hover:border-cta-track-hover shadow-elevation-cta-track",
        loop: "border-cta-track hover:border-cta-track-hover shadow-elevation-cta-track",
        kit: "border-cta-track hover:border-cta-track-hover shadow-elevation-cta-track",
        pack: "border-cta-track hover:border-cta-track-hover shadow-elevation-cta-track",
        license: "border-cta-track hover:border-cta-track-hover shadow-elevation-cta-track",
        brand: "border-cta-brand hover:border-cta-brand-hover shadow-elevation-cta-brand hover:shadow-elevation-glow-brand-soft",
        premium: "border-cta-premium hover:border-cta-premium-hover shadow-elevation-cta-premium hover:shadow-elevation-glow-premium-soft",
        access: "border-cta-neutral hover:border-cta-neutral-hover shadow-elevation-cta-neutral",
        marketing: "border-cta-marketing hover:border-cta-marketing-hover shadow-elevation-cta-marketing hover:shadow-elevation-glow-marketing-soft"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      glow: "soft",
      density: "comfy",
      ctaMode: "neutral"
    }
  }
);
var Chip = ({
  children,
  tone = "default",
  className,
  ...props
}) => {
  const toneClasses = {
    default: "bg-bg-muted text-fg-muted border-border-subtle",
    brand: "bg-brand-primary/10 text-brand-primary border-brand-primary/20",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    danger: "bg-danger/10 text-danger border-danger/20"
  };
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    "span",
    {
      className: cn(
        "inline-flex items-center px-2 py-1 text-xs font-medium border rounded-full",
        toneClasses[tone],
        className
      ),
      ...props,
      children
    }
  );
};
var Badge = ({
  children,
  tone = "default",
  className,
  ...props
}) => {
  const toneClasses = {
    default: "bg-bg-muted text-fg-muted",
    new: "bg-success/20 text-success",
    featured: "bg-brand-primary/20 text-brand-primary",
    exclusive: "bg-purple-500/20 text-purple-400",
    sale: "bg-danger/20 text-danger"
  };
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    "span",
    {
      className: cn(
        "inline-flex items-center px-2 py-1 text-xs font-bold rounded-full border",
        toneClasses[tone],
        className
      ),
      ...props,
      children
    }
  );
};
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
  onPreviewToggle,
  isPlaying = false,
  onOpen,
  onDownload,
  onFavorite,
  onShare,
  isFavorited = false,
  duration,
  quality,
  genre,
  mood,
  energy,
  popularity,
  isNew = false,
  isFeatured = false,
  isExclusive = false,
  discount,
  originalPrice,
  variant = "default",
  size = "md",
  glow = "soft",
  density = "comfy",
  ctaMode = "neutral",
  className,
  ...props
}) {
  const [showActions, setShowActions] = (0, import_react9.useState)(false);
  const isInteractive = variant !== "disabled";
  const handleKeyDown = (e) => {
    if (isInteractive && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onOpen?.(id);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "space-y-2 border border-white/20 hover:border-white/40 hover:shadow-lg hover:shadow-white/10 transition-all duration-300 ease-out rounded-xl p-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
      "article",
      {
        className: cn(
          catalogCardVariants({ variant, size, glow, density }),
          "relative overflow-hidden aspect-square",
          // Square aspect ratio for background image
          className
        ),
        onClick: () => isInteractive && onOpen?.(id),
        onKeyDown: handleKeyDown,
        role: isInteractive ? "button" : void 0,
        tabIndex: isInteractive ? 0 : void 0,
        "aria-labelledby": `card-title-${id}`,
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "absolute inset-0", children: artworkUrl ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
            CardImage,
            {
              assetId: id,
              alt: `${title} artwork`,
              className: "w-full h-full object-cover",
              fallbackSrc: artworkUrl
            }
          ) : /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "w-full h-full flex items-center justify-center text-6xl text-fg-muted bg-bg-muted", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_lucide_react.Music, { className: "w-16 h-16" }) }) }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: cn(
            "absolute inset-0 bg-black/40 backdrop-blur-sm",
            "opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out",
            "pointer-events-none"
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "relative z-10 h-full flex flex-col justify-between p-4 pb-0", children: [
            /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "flex items-start justify-between", children: [
              isNew && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "z-20", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Badge, { tone: "new", children: "NEW" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "flex gap-1 ml-auto", children: [
                onFavorite && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
                  "button",
                  {
                    type: "button",
                    onClick: (e) => {
                      e.stopPropagation();
                      onFavorite(id);
                    },
                    className: cn(
                      "p-1.5 rounded-full transition-all duration-200",
                      "bg-black/40 backdrop-blur-sm border border-white/20",
                      "hover:bg-danger/30 hover:border-danger/50",
                      "focus:outline-none focus:ring-2 focus:ring-danger/50",
                      isFavorited && "bg-danger/40 border-danger/60"
                    ),
                    "aria-label": isFavorited ? `Remove ${title} from favorites` : `Add ${title} to favorites`,
                    children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_lucide_react.Heart, { className: cn("h-3 w-3", isFavorited ? "text-danger fill-current" : "text-white") })
                  }
                ),
                onShare && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
                  "button",
                  {
                    type: "button",
                    onClick: (e) => {
                      e.stopPropagation();
                      onShare(id);
                    },
                    className: cn(
                      "p-1.5 rounded-full transition-all duration-200",
                      "bg-black/40 backdrop-blur-sm border border-white/20",
                      "hover:bg-brand-primary/30 hover:border-brand-primary/50",
                      "focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                    ),
                    "aria-label": `Share ${title}`,
                    children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_lucide_react.Share2, { className: "h-3 w-3 text-white" })
                  }
                )
              ] })
            ] }),
            previewUrl && isInteractive && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "flex-1 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
              "button",
              {
                type: "button",
                onClick: (e) => {
                  e.stopPropagation();
                  onPreviewToggle?.(id);
                },
                className: cn(
                  "p-3 rounded-full transition-all duration-300",
                  "bg-white/20 backdrop-blur-sm border border-white/30",
                  "hover:bg-white/30 hover:scale-110",
                  "focus:outline-none focus:ring-2 focus:ring-white/50",
                  "opacity-0 group-hover:opacity-100"
                ),
                "aria-label": isPlaying ? `Pause preview of ${title}` : `Play preview of ${title}`,
                children: isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_lucide_react.Pause, { className: "h-6 w-6 text-white" }) : /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_lucide_react.Play, { className: "h-6 w-6 text-white ml-0.5" })
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "mt-auto", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
              "div",
              {
                className: cn(
                  // base surface
                  "bg-black/40 backdrop-blur-md border-t border-white/20 px-3 pt-0.5 pb-0.5",
                  // subtle base opacity + smooth transitions
                  "opacity-95 transition-all duration-300 ease-out",
                  // hover polish
                  "group-hover:opacity-100 group-hover:bg-black/60 group-hover:border-white/30",
                  "group-hover:shadow-lg group-hover:shadow-black/20"
                ),
                children: /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "flex items-center justify-between gap-2", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "flex flex-col leading-tight min-w-0 flex-1", children: [
                    originalPrice && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "text-xs text-white/60 line-through", children: originalPrice }),
                    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "text-base font-bold text-white truncate", children: price }),
                    discount && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "text-xs text-success font-medium", children: discount })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
                    "button",
                    {
                      type: "button",
                      onClick: (e) => {
                        e.stopPropagation();
                        onOpen?.(id);
                      },
                      className: cn(
                        "inline-flex items-center gap-1 text-brand-accent text-xs font-semibold",
                        "hover:text-brand-primary transition-colors duration-200",
                        "focus:outline-none focus:ring-2 focus:ring-brand-accent/50 rounded",
                        "bg-black/40 backdrop-blur-sm border border-white/20 px-2 py-1.5",
                        "hover:bg-brand-primary/20 hover:border-brand-primary/50",
                        "flex-shrink-0"
                      ),
                      "aria-label": `Open details for ${title}`,
                      children: [
                        CTA_TEXT[ctaMode],
                        " ",
                        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_lucide_react.ChevronRight, { className: "h-3 w-3" })
                      ]
                    }
                  )
                ] })
              }
            ) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "space-y-1 pb-2", children: [
      tags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "flex flex-wrap items-center gap-1 justify-center", children: tags.slice(0, 2).map((tag) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        Chip,
        {
          tone: "default",
          className: "text-xs bg-white/20 text-white border-white/30 px-1.5 py-0.5",
          children: tag
        },
        tag
      )) }),
      (isFeatured || isExclusive || !!discount) && /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "flex flex-wrap gap-1 justify-center", children: [
        isFeatured && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Badge, { tone: "featured", className: "text-xs px-2 py-0.5", children: "FEATURED" }),
        isExclusive && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Badge, { tone: "exclusive", className: "text-xs px-2 py-0.5", children: "EXCLUSIVE" }),
        discount && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Badge, { tone: "sale", className: "text-xs px-2 py-0.5", children: discount })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
        "h3",
        {
          id: `card-title-${id}`,
          className: "text-sm font-bold text-white truncate group-hover:text-brand-primary transition-colors duration-200",
          children: title
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "text-xs text-white/80 truncate", children: producer }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "flex items-center gap-2", children: [
          typeof bpm === "number" && /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("span", { className: "text-xs text-white/60", children: [
            bpm,
            " BPM"
          ] }),
          keySig && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "text-xs text-white/60", children: keySig }),
          duration && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "text-xs text-white/60", children: duration })
        ] })
      ] })
    ] })
  ] });
}

// src/navigation/Pagination.tsx
var import_jsx_runtime11 = require("react/jsx-runtime");
var paginationVariants = (0, import_class_variance_authority.cva)(
  "flex items-center justify-center gap-1",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
var paginationButtonVariants = (0, import_class_variance_authority.cva)(
  "flex items-center justify-center rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-ring",
  {
    variants: {
      variant: {
        default: "bg-card border-border-subtle hover:border-border-emphasis hover:bg-bg-elevated text-fg",
        active: "bg-brand-primary border-brand-primary text-bg shadow-elevation-cta-brand",
        disabled: "bg-card/50 border-border-subtle/50 text-fg-muted cursor-not-allowed opacity-60"
      },
      size: {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  maxVisiblePages = 5,
  size = "md",
  className,
  ...props
}) {
  const getVisiblePages = () => {
    const pages = [];
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);
    if (end - start + 1 < maxVisiblePages) {
      if (start === 1) {
        end = Math.min(totalPages, start + maxVisiblePages - 1);
      } else {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
    }
    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push("...");
      }
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }
    return pages;
  };
  const visiblePages = getVisiblePages();
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
    "nav",
    {
      className: cn(paginationVariants({ size }), className),
      "aria-label": "Pagination Navigation",
      ...props,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
          "button",
          {
            type: "button",
            className: cn(
              paginationButtonVariants({
                variant: currentPage === 1 ? "disabled" : "default",
                size
              }),
              "px-3"
            ),
            onClick: () => onPageChange(currentPage - 1),
            disabled: currentPage === 1,
            "aria-label": "Previous page",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_lucide_react.ChevronLeft, { className: "h-4 w-4" }),
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "sr-only", children: "Previous" })
            ]
          }
        ),
        visiblePages.map((page, index) => {
          if (page === "...") {
            return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
              "span",
              {
                className: "flex h-10 w-10 items-center justify-center text-fg-muted",
                children: "..."
              },
              `ellipsis-${index}`
            );
          }
          const pageNumber = page;
          const isActive = pageNumber === currentPage;
          return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
            "button",
            {
              type: "button",
              className: cn(
                paginationButtonVariants({
                  variant: isActive ? "active" : "default",
                  size
                })
              ),
              onClick: () => onPageChange(pageNumber),
              "aria-label": `Go to page ${pageNumber}`,
              "aria-current": isActive ? "page" : void 0,
              children: pageNumber
            },
            pageNumber
          );
        }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
          "button",
          {
            type: "button",
            className: cn(
              paginationButtonVariants({
                variant: currentPage === totalPages ? "disabled" : "default",
                size
              }),
              "px-3"
            ),
            onClick: () => onPageChange(currentPage + 1),
            disabled: currentPage === totalPages,
            "aria-label": "Next page",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_lucide_react.ChevronRight, { className: "h-4 w-4" }),
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "sr-only", children: "Next" })
            ]
          }
        )
      ]
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Bpm,
  Button,
  Card,
  CardBadge,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardIcon,
  CardImage,
  CardTitle,
  CatalogCard,
  Checkbox,
  ChevronLeft,
  ChevronRight,
  Download,
  HeroImage,
  Input,
  KeySig,
  Music,
  OptimizedImage,
  Pagination,
  Pause,
  Play,
  Player,
  Select,
  Spinner,
  Tag,
  TagIcon,
  ThemeProvider,
  ThumbnailImage,
  Volume,
  VolumeMute,
  Wave,
  cn,
  useTheme
});
//# sourceMappingURL=index.cjs.map