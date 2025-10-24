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
  ActiveFilters: () => ActiveFilters,
  Alert: () => Alert,
  Announcer: () => Announcer,
  AnnouncerProvider: () => AnnouncerProvider,
  AssetActions: () => AssetActions,
  AssetPreview: () => AssetPreview,
  AssetStatus: () => AssetStatus,
  AssetTile: () => AssetTile,
  AuditLog: () => AuditLog,
  Badge: () => Badge,
  Banner: () => Banner,
  Bpm: () => import_lucide_react3.Activity,
  Button: () => Button,
  BuyButton: () => BuyButton,
  Card: () => Card,
  CardContent: () => CardContent,
  CardDescription: () => CardDescription,
  CardFooter: () => CardFooter,
  CardHeader: () => CardHeader,
  CardMeta: () => CardMeta,
  CardTitle: () => CardTitle2,
  CatalogCard: () => CatalogCard,
  CatalogFilters: () => CatalogFilters,
  CatalogGrid: () => CatalogGrid,
  CatalogGridEmpty: () => CatalogGridEmpty,
  CatalogGridSkeleton: () => CatalogGridSkeleton,
  Checkbox: () => Checkbox,
  CheckoutCTA: () => CheckoutCTA,
  ChevronRight: () => import_lucide_react.ChevronRight,
  CoreCard: () => Card2,
  CoreCardTitle: () => CardTitle,
  CurrencySelector: () => CurrencySelector,
  Download: () => import_lucide_react.Download,
  EmptyState: () => EmptyState,
  FeatureFlag: () => FeatureFlag,
  Field: () => Field,
  FileUpload: () => FileUpload,
  FilterChip: () => FilterChip,
  HealthStatus: () => HealthStatus,
  Input: () => Input,
  KeySig: () => import_lucide_react4.Music2,
  LegacyCard: () => Card3,
  MetadataPanel: () => MetadataPanel,
  MiniPlayer: () => MiniPlayer,
  Modal: () => Modal,
  Music: () => import_lucide_react.Music,
  Pause: () => import_lucide_react.Pause,
  PaymentMethod: () => PaymentMethod,
  PermissionMatrix: () => PermissionMatrix,
  Play: () => import_lucide_react.Play,
  Player: () => Player,
  PlayerControls: () => PlayerControls,
  PriceDisplay: () => PriceDisplay,
  PriceInput: () => PriceInput,
  PriceRange: () => PriceRange,
  PriceValidator: () => PriceValidator,
  ProgressBar: () => ProgressBar,
  ReceiptPanel: () => ReceiptPanel,
  Select: () => Select,
  SelectContent: () => SelectContent,
  SelectItem: () => SelectItem,
  Skeleton: () => Skeleton,
  Slider: () => Slider,
  Slot: () => Slot,
  Spinner: () => import_lucide_react.Loader2,
  Tag: () => Tag,
  TagIcon: () => import_lucide_react.Tag,
  ThemeProvider: () => ThemeProvider,
  Toast: () => Toast,
  UploadProgress: () => UploadProgress,
  UserRole: () => UserRole,
  UserStatus: () => UserStatus,
  ValidationFeedback: () => ValidationFeedback,
  VisuallyHidden: () => VisuallyHidden,
  Volume: () => import_lucide_react.Volume2,
  VolumeMute: () => import_lucide_react.VolumeX,
  Wave: () => import_lucide_react2.Play,
  Waveform: () => Waveform,
  cn: () => cn,
  generateId: () => generateId,
  getAccessibleName: () => getAccessibleName,
  isInteractive: () => isInteractive,
  mergeRefs: () => mergeRefs,
  useAnnouncer: () => useAnnouncer,
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

// src/primitives/Slot.tsx
var import_react_slot = require("@radix-ui/react-slot");
var import_jsx_runtime2 = require("react/jsx-runtime");
function Slot({ asChild = false, children, ...props }) {
  const Comp = asChild ? import_react_slot.Slot : "span";
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Comp, { ...props, children });
}

// src/primitives/VisuallyHidden.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
function VisuallyHidden({ children, as = "span" }) {
  const Comp = as;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    Comp,
    {
      style: {
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: 0,
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        border: 0
      },
      children
    }
  );
}

// src/a11y/Announcer.tsx
var import_react2 = require("react");
var import_jsx_runtime4 = require("react/jsx-runtime");
var AnnouncerContext = (0, import_react2.createContext)(void 0);
function AnnouncerProvider({ children }) {
  const [announcements, setAnnouncements] = (0, import_react2.useState)([]);
  const announce = (0, import_react2.useCallback)((message, politeness = "polite") => {
    const id = Math.random().toString(36).slice(2, 11);
    const announcement = { id, message, politeness };
    setAnnouncements((prev) => [...prev, announcement]);
    setTimeout(() => {
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
    }, 5e3);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(AnnouncerContext.Provider, { value: { announce }, children: [
    children,
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(LiveRegion, { announcements })
  ] });
}
function LiveRegion({ announcements }) {
  const politeMessages = announcements.filter((a) => a.politeness === "polite");
  const assertiveMessages = announcements.filter((a) => a.politeness === "assertive");
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "div",
      {
        role: "status",
        "aria-live": "polite",
        "aria-atomic": "true",
        style: {
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0
        },
        children: politeMessages.map((announcement) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { children: announcement.message }, announcement.id))
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "div",
      {
        role: "alert",
        "aria-live": "assertive",
        "aria-atomic": "true",
        style: {
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0
        },
        children: assertiveMessages.map((announcement) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { children: announcement.message }, announcement.id))
      }
    )
  ] });
}
function useAnnouncer() {
  const context = (0, import_react2.useContext)(AnnouncerContext);
  if (context === void 0) {
    throw new Error("useAnnouncer must be used within an AnnouncerProvider");
  }
  return context;
}
function Announcer({ message, politeness = "polite", clearAfter = 5e3 }) {
  const { announce } = useAnnouncer();
  (0, import_react2.useEffect)(() => {
    if (message) {
      announce(message, politeness);
    }
  }, [message, politeness, announce]);
  return null;
}

// src/utils/cn.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}

// src/utils/cva.ts
var import_class_variance_authority = require("class-variance-authority");

// src/utils/a11y.ts
var idCounter = 0;
function generateId(prefix = "a11y") {
  idCounter += 1;
  return `${prefix}-${idCounter}`;
}
function mergeRefs(...refs) {
  return (value) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    }
  };
}
function isInteractive(element) {
  const interactiveTags = ["A", "BUTTON", "INPUT", "SELECT", "TEXTAREA"];
  const hasTabIndex = element.hasAttribute("tabindex");
  const hasRole = element.hasAttribute("role");
  return interactiveTags.includes(element.tagName) || hasTabIndex || hasRole && ["button", "link", "checkbox", "radio"].includes(element.getAttribute("role") || "");
}
function getAccessibleName(element) {
  const ariaLabel = element.getAttribute("aria-label");
  if (ariaLabel) return ariaLabel;
  const labelledBy = element.getAttribute("aria-labelledby");
  if (labelledBy) {
    const labelElement = document.getElementById(labelledBy);
    if (labelElement) return labelElement.textContent || "";
  }
  if (element instanceof HTMLInputElement) {
    const id = element.id;
    if (id) {
      const label = document.querySelector(`label[for="${id}"]`);
      if (label) return label.textContent || "";
    }
  }
  return element.textContent || "";
}

// src/layout/Card.tsx
var import_class_variance_authority2 = require("class-variance-authority");
var import_react3 = require("react");
var import_jsx_runtime5 = require("react/jsx-runtime");
var cardVariants = (0, import_class_variance_authority2.cva)("rounded-lg border bg-card text-card-foreground", {
  variants: {
    variant: {
      default: "border-border",
      elevated: "border-border shadow-md",
      outlined: "border-border bg-transparent"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
var Card = (0, import_react3.forwardRef)(({ className, variant, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { ref, className: cn(cardVariants({ variant }), className), ...props }));
Card.displayName = "Card";

// src/layout/Button.tsx
var import_react_slot2 = require("@radix-ui/react-slot");
var import_class_variance_authority3 = require("class-variance-authority");
var import_react4 = require("react");
var import_jsx_runtime6 = require("react/jsx-runtime");
var buttonVariants = (0, import_class_variance_authority3.cva)(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-brand-primary text-brand-primary-foreground hover:bg-brand-primary/90",
        secondary: "bg-bg-muted text-fg hover:bg-bg-muted/80",
        ghost: "hover:bg-bg-muted hover:text-fg",
        link: "text-fg underline-offset-4 hover:underline"
      },
      size: {
        sm: "h-9 px-3",
        md: "h-10 px-4 py-2",
        lg: "h-11 px-8"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
var Button = (0, import_react4.forwardRef)(
  ({ className, variant, size, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? import_react_slot2.Slot : "button";
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        disabled: disabled || loading,
        "aria-busy": loading,
        ...props,
        children: [
          loading && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
            "svg",
            {
              className: "mr-2 h-4 w-4 animate-spin",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              "aria-hidden": "true",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
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
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                  "path",
                  {
                    className: "opacity-75",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  }
                )
              ]
            }
          ),
          children
        ]
      }
    );
  }
);
Button.displayName = "Button";

// src/layout/CatalogGrid.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
var catalogGridVariants = (0, import_class_variance_authority.cva)("grid", {
  variants: {
    gap: {
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6"
    },
    scrollable: {
      true: "overflow-x-auto",
      false: ""
    }
  },
  defaultVariants: {
    gap: "md",
    scrollable: false
  }
});
function CatalogGrid({
  children,
  columns = { default: 1, sm: 2, md: 3, lg: 4 },
  gap,
  loading = false,
  skeletonCount = 6,
  emptyState,
  scrollable,
  className,
  ...props
}) {
  const gridClasses = cn(
    catalogGridVariants({ gap, scrollable }),
    // Responsive columns
    columns.default && `grid-cols-${columns.default}`,
    columns.sm && `sm:grid-cols-${columns.sm}`,
    columns.md && `md:grid-cols-${columns.md}`,
    columns.lg && `lg:grid-cols-${columns.lg}`,
    columns.xl && `xl:grid-cols-${columns.xl}`,
    className
  );
  if (loading) {
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: gridClasses, ...props, children: Array.from({ length: skeletonCount }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      "div",
      {
        className: "animate-pulse rounded-lg border bg-bg-muted/20 h-32",
        "data-testid": "catalog-grid-skeleton"
      },
      `skeleton-item-${i + 1}`
    )) });
  }
  if (emptyState) {
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "flex flex-col items-center justify-center py-12 text-center", children: emptyState });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: gridClasses, ...props, children });
}
function CatalogGridSkeleton({
  count = 6,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className), children: Array.from({ length: count }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    "div",
    {
      className: "animate-pulse rounded-lg border bg-bg-muted/20 h-32",
      "data-testid": "catalog-grid-skeleton"
    },
    `empty-skeleton-${i + 1}`
  )) });
}
function CatalogGridEmpty({
  title = "No items found",
  description = "Try adjusting your filters or search terms.",
  action,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: cn("flex flex-col items-center justify-center py-12 text-center", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "w-16 h-16 rounded-full bg-bg-muted/20 flex items-center justify-center mb-4", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      "svg",
      {
        className: "w-8 h-8 text-fg-muted",
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        role: "img",
        "aria-label": "No items found icon",
        children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 2,
            d: "M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709"
          }
        )
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h3", { className: "text-lg font-semibold text-fg-default mb-2", children: title }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "text-fg-muted mb-4 max-w-sm", children: description }),
    action
  ] });
}

// src/data/Badge.tsx
var import_class_variance_authority4 = require("class-variance-authority");
var import_react5 = require("react");
var import_jsx_runtime8 = require("react/jsx-runtime");
var badgeVariants = (0, import_class_variance_authority4.cva)(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        success: "border-transparent bg-green-500 text-white",
        warning: "border-transparent bg-yellow-500 text-white",
        danger: "border-transparent bg-red-500 text-white",
        info: "border-transparent bg-blue-500 text-white",
        neutral: "border-transparent bg-gray-500 text-white"
      }
    },
    defaultVariants: {
      variant: "neutral"
    }
  }
);
var Badge = (0, import_react5.forwardRef)(({ className, variant, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { ref, className: cn(badgeVariants({ variant }), className), ...props }));
Badge.displayName = "Badge";

// src/data/Tag.tsx
var import_react6 = require("react");
var import_jsx_runtime9 = require("react/jsx-runtime");
var Tag = (0, import_react6.forwardRef)(
  ({ className, children, onClose, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
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
        onClose && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "ml-1 h-4 w-4 rounded-full hover:bg-fg/30 focus:outline-none focus:ring-1 focus:ring-fg/50",
            "aria-label": "Remove tag",
            children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
              "svg",
              {
                className: "h-3 w-3",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
                "aria-hidden": "true",
                children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
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

// src/media/Waveform.tsx
var import_react7 = require("react");
var import_jsx_runtime10 = require("react/jsx-runtime");
var MOCK_BINS = Array.from({ length: 64 }, (_, i) => {
  const phase = i / 64 * Math.PI * 2;
  const base2 = Math.sin(phase) * 0.3 + 0.5;
  const noise = Math.random() * 0.2;
  return Math.min(1, Math.max(0.15, base2 + noise));
});
var Waveform = (0, import_react7.forwardRef)(
  ({ className, data, bins = 64, ...props }, ref) => {
    const waveformData = data && data.length > 0 ? data : MOCK_BINS;
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      "div",
      {
        ref,
        className: cn("flex items-end gap-0.5 h-16 w-full", className),
        role: "img",
        "aria-label": "Audio waveform visualization",
        ...props,
        children: waveformData.slice(0, bins).map((value, index) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
          "div",
          {
            className: cn(
              "flex-1 min-h-[15%] rounded-sm transition-all duration-150",
              "bg-[var(--audio-waveform-fill,rgba(230,234,242,0.9))]",
              "hover:bg-[var(--color-brand-accent,#5BD0FF)]"
            ),
            style: {
              height: `${Math.max(15, value * 100)}%`
            },
            "aria-hidden": "true"
          },
          `waveform-${// biome-ignore lint/suspicious/noArrayIndexKey: static waveform data
          index}`
        ))
      }
    );
  }
);
Waveform.displayName = "Waveform";

// src/media/Player.tsx
var import_react8 = require("react");

// src/icons/index.ts
var import_lucide_react = require("lucide-react");
var import_lucide_react2 = require("lucide-react");
var import_lucide_react3 = require("lucide-react");
var import_lucide_react4 = require("lucide-react");

// src/media/Player.tsx
var import_jsx_runtime11 = require("react/jsx-runtime");
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
    const formatTime2 = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    };
    const progress = duration > 0 ? currentTime / duration * 100 : 0;
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(
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
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("audio", { ref: audioRef, src, preload: "metadata", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("track", { kind: "captions", src: "", label: "No captions available" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
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
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent,#5BD0FF)]",
                  "transition-all duration-150"
                ),
                "aria-label": isPlaying ? `Pause ${title}` : `Play ${title}`,
                "aria-pressed": isPlaying,
                children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_lucide_react.Loader2, { className: "w-5 h-5 animate-spin", "aria-hidden": "true" }) : isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_lucide_react.Pause, { className: "w-5 h-5", "aria-hidden": "true" }) : /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_lucide_react.Play, { className: "w-5 h-5", "aria-hidden": "true" })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "flex items-center gap-2 text-sm text-[var(--color-fg-muted,#A9B1C1)]", children: [
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { "aria-label": `Current time: ${formatTime2(currentTime)}`, children: formatTime2(currentTime) }),
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { "aria-hidden": "true", children: "/" }),
              /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
                "span",
                {
                  "aria-label": `Duration: ${formatTime2(clamp ? Math.min(clamp, duration) : duration)}`,
                  children: formatTime2(clamp ? Math.min(clamp, duration) : duration)
                }
              )
            ] }),
            showDownload && !clamp && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
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
                children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_lucide_react.Download, { className: "w-4 h-4", "aria-hidden": "true" })
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
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
          /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "hidden sm:flex items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_lucide_react.Volume2, { className: "w-4 h-4 text-[var(--color-fg-muted,#A9B1C1)]", "aria-hidden": "true" }),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
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

// src/media/MiniPlayer.tsx
var import_react9 = require("react");
var import_jsx_runtime12 = require("react/jsx-runtime");
var MiniPlayer = (0, import_react9.forwardRef)(
  ({
    className,
    src,
    title,
    artist,
    coverUrl,
    isPlaying = false,
    currentTime = 0,
    duration = 0,
    volume = 0.8,
    isMuted = false,
    isExpanded = false,
    isDocked = false,
    onPlayPause,
    onSeek,
    onVolumeChange,
    onToggleMute,
    onToggleExpand,
    onClose,
    ...props
  }, ref) => {
    const [isHovered, setIsHovered] = (0, import_react9.useState)(false);
    const formatTime2 = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    };
    const progress = duration > 0 ? currentTime / duration * 100 : 0;
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
      "div",
      {
        ref,
        className: cn(
          "flex items-center gap-3 p-3",
          "bg-[var(--color-bg-elevated,#121520)]",
          "border border-[var(--border-subtle,rgba(255,255,255,0.10))]",
          "rounded-[var(--radius-lg,16px)]",
          "shadow-[var(--shadow-2,0_8px_32px_0_rgba(0,0,0,0.35))]",
          "transition-all duration-300",
          isDocked && "fixed bottom-4 left-4 right-4 z-50",
          isExpanded && "w-full",
          !isExpanded && "w-80",
          className
        ),
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        "aria-label": `Mini player for ${title}`,
        ...props,
        children: [
          coverUrl && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("img", { src: coverUrl, alt: `${title} cover`, className: "w-full h-full object-cover" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h4", { className: "text-sm font-medium text-[var(--color-fg,#E6EAF2)] truncate", children: title }),
              onClose && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "flex-shrink-0 p-1 text-[var(--color-fg-muted,#A9B1C1)] hover:text-[var(--color-fg,#E6EAF2)]",
                  "aria-label": "Close mini player",
                  children: "\xD7"
                }
              )
            ] }),
            artist && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "text-xs text-[var(--color-fg-muted,#A9B1C1)] truncate", children: artist })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              "button",
              {
                type: "button",
                onClick: onPlayPause,
                className: cn(
                  "flex items-center justify-center w-8 h-8",
                  "rounded-full bg-[var(--color-brand-primary,#6AE6A6)]",
                  "text-[var(--color-fg-inverse,#0B0D12)]",
                  "hover:bg-[var(--color-brand-primary-hover,#5ADFA0)]",
                  "active:scale-95",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent,#5BD0FF)]",
                  "transition-all duration-150"
                ),
                "aria-label": isPlaying ? "Pause" : "Play",
                "aria-pressed": isPlaying,
                children: isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_lucide_react.Pause, { className: "w-4 h-4", "aria-hidden": "true" }) : /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_lucide_react.Play, { className: "w-4 h-4", "aria-hidden": "true" })
              }
            ),
            isExpanded && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                "button",
                {
                  type: "button",
                  onClick: onToggleMute,
                  className: "p-1 text-[var(--color-fg-muted,#A9B1C1)] hover:text-[var(--color-fg,#E6EAF2)]",
                  "aria-label": isMuted ? "Unmute" : "Mute",
                  children: isMuted ? /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_lucide_react.VolumeX, { className: "w-4 h-4", "aria-hidden": "true" }) : /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(import_lucide_react.Volume2, { className: "w-4 h-4", "aria-hidden": "true" })
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                "input",
                {
                  type: "range",
                  min: "0",
                  max: "1",
                  step: "0.1",
                  value: isMuted ? 0 : volume,
                  onChange: (e) => onVolumeChange?.(Number.parseFloat(e.target.value)),
                  className: cn(
                    "w-16 h-1 rounded-lg appearance-none cursor-pointer",
                    "bg-[var(--color-bg-muted,#0F131B)]",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent,#5BD0FF)]"
                  ),
                  "aria-label": "Volume"
                }
              )
            ] }),
            onToggleExpand && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              "button",
              {
                type: "button",
                onClick: onToggleExpand,
                className: "p-1 text-[var(--color-fg-muted,#A9B1C1)] hover:text-[var(--color-fg,#E6EAF2)]",
                "aria-label": isExpanded ? "Collapse" : "Expand",
                children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
                  "div",
                  {
                    className: cn(
                      "w-4 h-4 transition-transform duration-200",
                      isExpanded ? "rotate-180" : "rotate-0"
                    ),
                    "aria-hidden": "true",
                    children: "\u25B2"
                  }
                )
              }
            )
          ] }),
          isExpanded && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "absolute bottom-0 left-0 right-0 p-3 pt-0", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex items-center gap-2 text-xs text-[var(--color-fg-muted,#A9B1C1)]", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { children: formatTime2(currentTime) }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "flex-1 h-1 bg-[var(--color-bg-muted,#0F131B)] rounded-lg overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              "div",
              {
                className: "h-full bg-[var(--color-brand-primary,#6AE6A6)] transition-all duration-150",
                style: { width: `${progress}%` }
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { children: formatTime2(duration) })
          ] }) }),
          isExpanded && onSeek && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "absolute bottom-0 left-0 right-0 p-3 pt-0", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            "input",
            {
              type: "range",
              min: "0",
              max: duration,
              value: currentTime,
              onChange: (e) => onSeek(Number.parseFloat(e.target.value)),
              className: cn(
                "w-full h-1 rounded-lg appearance-none cursor-pointer",
                "bg-[var(--color-bg-muted,#0F131B)]",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent,#5BD0FF)]"
              ),
              "aria-label": "Seek"
            }
          ) })
        ]
      }
    );
  }
);
MiniPlayer.displayName = "MiniPlayer";

// src/media/PlayerControls.tsx
var import_react10 = require("react");
var import_jsx_runtime13 = require("react/jsx-runtime");
var SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2];
var PlayerControls = (0, import_react10.forwardRef)(
  ({
    className,
    isPlaying = false,
    currentTime = 0,
    duration = 0,
    volume = 0.8,
    playbackRate = 1,
    isMuted = false,
    isLoading = false,
    hasError = false,
    showDownload = false,
    showSkip = false,
    showSpeed = false,
    onPlayPause,
    onSeek,
    onVolumeChange,
    onToggleMute,
    onSkipBack,
    onSkipForward,
    onSpeedChange,
    onDownload,
    ...props
  }, ref) => {
    const [showSpeedMenu, setShowSpeedMenu] = (0, import_react10.useState)(false);
    const formatTime2 = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    };
    const progress = duration > 0 ? currentTime / duration * 100 : 0;
    const handleSeek = (e) => {
      const newTime = Number.parseFloat(e.target.value);
      onSeek?.(newTime);
    };
    const handleVolumeChange = (e) => {
      const newVolume = Number.parseFloat(e.target.value);
      onVolumeChange?.(newVolume);
    };
    const handleSpeedChange = (rate) => {
      onSpeedChange?.(rate);
      setShowSpeedMenu(false);
    };
    return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
      "div",
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
        "aria-label": "Player controls",
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex items-center gap-2", children: [
              showSkip && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                "button",
                {
                  type: "button",
                  onClick: onSkipBack,
                  disabled: isLoading,
                  className: cn(
                    "flex items-center justify-center w-8 h-8",
                    "rounded-full bg-[var(--color-bg-muted,#0F131B)]",
                    "text-[var(--color-fg-muted,#A9B1C1)]",
                    "hover:bg-[var(--color-bg-hover,#1A1F2E)]",
                    "hover:text-[var(--color-fg,#E6EAF2)]",
                    "active:scale-95",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent,#5BD0FF)]",
                    "transition-all duration-150"
                  ),
                  "aria-label": "Skip back 10 seconds",
                  children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_lucide_react.SkipBack, { className: "w-4 h-4", "aria-hidden": "true" })
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                "button",
                {
                  type: "button",
                  onClick: onPlayPause,
                  disabled: isLoading || hasError,
                  className: cn(
                    "flex items-center justify-center w-12 h-12",
                    "rounded-full bg-[var(--color-brand-primary,#6AE6A6)]",
                    "text-[var(--color-fg-inverse,#0B0D12)]",
                    "hover:bg-[var(--color-brand-primary-hover,#5ADFA0)]",
                    "active:scale-95",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent,#5BD0FF)]",
                    "transition-all duration-150"
                  ),
                  "aria-label": isPlaying ? "Pause" : "Play",
                  "aria-pressed": isPlaying,
                  children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "w-6 h-6 animate-spin", "aria-hidden": "true", children: "\u27F3" }) : isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_lucide_react.Pause, { className: "w-6 h-6", "aria-hidden": "true" }) : /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_lucide_react.Play, { className: "w-6 h-6", "aria-hidden": "true" })
                }
              ),
              showSkip && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                "button",
                {
                  type: "button",
                  onClick: onSkipForward,
                  disabled: isLoading,
                  className: cn(
                    "flex items-center justify-center w-8 h-8",
                    "rounded-full bg-[var(--color-bg-muted,#0F131B)]",
                    "text-[var(--color-fg-muted,#A9B1C1)]",
                    "hover:bg-[var(--color-bg-hover,#1A1F2E)]",
                    "hover:text-[var(--color-fg,#E6EAF2)]",
                    "active:scale-95",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent,#5BD0FF)]",
                    "transition-all duration-150"
                  ),
                  "aria-label": "Skip forward 10 seconds",
                  children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_lucide_react.SkipForward, { className: "w-4 h-4", "aria-hidden": "true" })
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex items-center gap-2 text-sm text-[var(--color-fg-muted,#A9B1C1)]", children: [
              /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { "aria-label": `Current time: ${formatTime2(currentTime)}`, children: formatTime2(currentTime) }),
              /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { "aria-hidden": "true", children: "/" }),
              /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { "aria-label": `Duration: ${formatTime2(duration)}`, children: formatTime2(duration) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex items-center gap-2", children: [
              showSpeed && /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "relative", children: [
                /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
                  "button",
                  {
                    type: "button",
                    onClick: () => setShowSpeedMenu(!showSpeedMenu),
                    className: cn(
                      "px-3 py-1 text-sm",
                      "bg-[var(--color-bg-muted,#0F131B)]",
                      "text-[var(--color-fg-muted,#A9B1C1)]",
                      "hover:bg-[var(--color-bg-hover,#1A1F2E)]",
                      "hover:text-[var(--color-fg,#E6EAF2)]",
                      "rounded-[var(--radius-sm,8px)]",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent,#5BD0FF)]",
                      "transition-all duration-150"
                    ),
                    "aria-label": "Playback speed",
                    "aria-expanded": showSpeedMenu,
                    children: [
                      playbackRate,
                      "x"
                    ]
                  }
                ),
                showSpeedMenu && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "absolute bottom-full right-0 mb-2 p-2 bg-[var(--color-bg-elevated,#121520)] border border-[var(--border-subtle,rgba(255,255,255,0.10))] rounded-lg shadow-lg z-10", children: SPEED_OPTIONS.map((rate) => /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleSpeedChange(rate),
                    className: cn(
                      "block w-full px-3 py-1 text-sm text-left",
                      "hover:bg-[var(--color-bg-hover,#1A1F2E)]",
                      "rounded-[var(--radius-sm,8px)]",
                      "transition-colors duration-150",
                      rate === playbackRate && "bg-[var(--color-brand-primary,#6AE6A6)] text-[var(--color-fg-inverse,#0B0D12)]"
                    ),
                    children: [
                      rate,
                      "x"
                    ]
                  },
                  rate
                )) })
              ] }),
              showDownload && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                "button",
                {
                  type: "button",
                  onClick: onDownload,
                  className: cn(
                    "flex items-center justify-center w-8 h-8",
                    "rounded-full bg-[var(--color-bg-muted,#0F131B)]",
                    "text-[var(--color-fg-muted,#A9B1C1)]",
                    "hover:bg-[var(--color-bg-hover,#1A1F2E)]",
                    "hover:text-[var(--color-fg,#E6EAF2)]",
                    "active:scale-95",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent,#5BD0FF)]",
                    "transition-all duration-150"
                  ),
                  "aria-label": "Download",
                  children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_lucide_react.Download, { className: "w-4 h-4", "aria-hidden": "true" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            "input",
            {
              type: "range",
              min: "0",
              max: duration,
              value: currentTime,
              onChange: handleSeek,
              disabled: isLoading || hasError,
              className: cn(
                "flex-1 h-2 rounded-lg appearance-none cursor-pointer",
                "bg-[var(--color-bg-muted,#0F131B)]",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent,#5BD0FF)]"
              ),
              role: "progressbar",
              "aria-valuenow": currentTime,
              "aria-valuemin": 0,
              "aria-valuemax": duration,
              "aria-label": "Audio progress"
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
              "button",
              {
                type: "button",
                onClick: onToggleMute,
                className: cn(
                  "flex items-center justify-center w-8 h-8",
                  "rounded-full bg-[var(--color-bg-muted,#0F131B)]",
                  "text-[var(--color-fg-muted,#A9B1C1)]",
                  "hover:bg-[var(--color-bg-hover,#1A1F2E)]",
                  "hover:text-[var(--color-fg,#E6EAF2)]",
                  "active:scale-95",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent,#5BD0FF)]",
                  "transition-all duration-150"
                ),
                "aria-label": isMuted ? "Unmute" : "Mute",
                children: isMuted ? /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_lucide_react.VolumeX, { className: "w-4 h-4", "aria-hidden": "true" }) : /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_lucide_react.Volume2, { className: "w-4 h-4", "aria-hidden": "true" })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
              "input",
              {
                type: "range",
                min: "0",
                max: "1",
                step: "0.1",
                value: isMuted ? 0 : volume,
                onChange: handleVolumeChange,
                className: cn(
                  "w-24 h-2 rounded-lg appearance-none cursor-pointer",
                  "bg-[var(--color-bg-muted,#0F131B)]",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent,#5BD0FF)]"
                ),
                "aria-label": "Volume",
                "aria-valuenow": Math.round((isMuted ? 0 : volume) * 100),
                "aria-valuemin": 0,
                "aria-valuemax": 100
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("span", { className: "text-xs text-[var(--color-fg-muted,#A9B1C1)] w-8", children: [
              Math.round((isMuted ? 0 : volume) * 100),
              "%"
            ] })
          ] }),
          hasError && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "text-sm text-[var(--color-destructive,#FF6B6B)] text-center", children: "Failed to load audio. Please try again." })
        ]
      }
    );
  }
);
PlayerControls.displayName = "PlayerControls";

// src/media/ProgressBar.tsx
var import_react11 = require("react");
var import_jsx_runtime14 = require("react/jsx-runtime");
var ProgressBar = (0, import_react11.forwardRef)(
  ({
    className,
    currentTime = 0,
    duration = 0,
    bufferedTime = 0,
    isLoading = false,
    isBuffering = false,
    hasError = false,
    isInteractive: isInteractive2 = true,
    showTime = true,
    showBuffered = true,
    onSeek,
    onHover,
    onLeave,
    ...props
  }, ref) => {
    const [isHovered, setIsHovered] = (0, import_react11.useState)(false);
    const [hoverTime, setHoverTime] = (0, import_react11.useState)(0);
    const progress = duration > 0 ? currentTime / duration * 100 : 0;
    const bufferedProgress = duration > 0 ? bufferedTime / duration * 100 : 0;
    const formatTime2 = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    };
    const handleMouseMove = (e) => {
      if (!isInteractive2) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      const time = percentage * duration;
      setHoverTime(time);
      onHover?.(time);
    };
    const handleMouseLeave = () => {
      setIsHovered(false);
      setHoverTime(0);
      onLeave?.();
    };
    const handleClick = (e) => {
      if (!isInteractive2 || !onSeek) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      const time = percentage * duration;
      onSeek(time);
    };
    const handleKeyDown = (e) => {
      if (!isInteractive2 || !onSeek) return;
      const step = duration * 0.05;
      let newTime = currentTime;
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          newTime = Math.max(0, currentTime - step);
          onSeek(newTime);
          break;
        case "ArrowRight":
          e.preventDefault();
          newTime = Math.min(duration, currentTime + step);
          onSeek(newTime);
          break;
        case "Home":
          e.preventDefault();
          onSeek(0);
          break;
        case "End":
          e.preventDefault();
          onSeek(duration);
          break;
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
      "div",
      {
        ref,
        className: cn("flex flex-col gap-2", "w-full", className),
        "aria-label": "Audio progress",
        ...props,
        children: [
          showTime && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex justify-between text-xs text-[var(--color-fg-muted,#A9B1C1)]", children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { "aria-label": `Current time: ${formatTime2(currentTime)}`, children: formatTime2(currentTime) }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { "aria-label": `Duration: ${formatTime2(duration)}`, children: formatTime2(duration) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "relative", children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
              "div",
              {
                className: cn(
                  "w-full h-2 rounded-lg overflow-hidden",
                  "bg-[var(--color-bg-muted,#0F131B)]",
                  "relative"
                ),
                onMouseMove: handleMouseMove,
                onMouseLeave: handleMouseLeave,
                onClick: handleClick,
                onKeyDown: handleKeyDown,
                tabIndex: isInteractive2 ? 0 : -1,
                role: isInteractive2 ? "slider" : "progressbar",
                "aria-valuenow": currentTime,
                "aria-valuemin": 0,
                "aria-valuemax": duration,
                "aria-label": "Audio progress",
                "aria-disabled": !isInteractive2,
                children: [
                  showBuffered && bufferedProgress > 0 && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                    "div",
                    {
                      className: "absolute top-0 left-0 h-full bg-[var(--color-bg-hover,#1A1F2E)] transition-all duration-150",
                      style: { width: `${bufferedProgress}%` },
                      "aria-hidden": "true"
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                    "div",
                    {
                      className: cn(
                        "absolute top-0 left-0 h-full transition-all duration-150",
                        "bg-[var(--color-brand-primary,#6AE6A6)]",
                        hasError && "bg-[var(--color-destructive,#FF6B6B)]",
                        isBuffering && "animate-pulse"
                      ),
                      style: { width: `${progress}%` },
                      "aria-hidden": "true"
                    }
                  ),
                  isHovered && isInteractive2 && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
                    "div",
                    {
                      className: "absolute top-0 h-full w-0.5 bg-[var(--color-brand-accent,#5BD0FF)] transition-all duration-150",
                      style: { left: `${hoverTime / duration * 100}%` },
                      "aria-hidden": "true"
                    }
                  ),
                  isLoading && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "w-4 h-4 animate-spin rounded-full border-2 border-[var(--color-brand-primary,#6AE6A6)] border-t-transparent" }) }),
                  isBuffering && !isLoading && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex gap-1", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "w-1 h-1 bg-[var(--color-brand-primary,#6AE6A6)] rounded-full animate-bounce" }),
                    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "w-1 h-1 bg-[var(--color-brand-primary,#6AE6A6)] rounded-full animate-bounce [animation-delay:0.1s]" }),
                    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "w-1 h-1 bg-[var(--color-brand-primary,#6AE6A6)] rounded-full animate-bounce [animation-delay:0.2s]" })
                  ] }) })
                ]
              }
            ),
            isHovered && isInteractive2 && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
              "div",
              {
                className: "absolute bottom-full mb-2 px-2 py-1 text-xs bg-[var(--color-bg-elevated,#121520)] text-[var(--color-fg,#E6EAF2)] rounded border border-[var(--border-subtle,rgba(255,255,255,0.10))] shadow-lg pointer-events-none z-10",
                style: { left: `${hoverTime / duration * 100}%`, transform: "translateX(-50%)" },
                children: formatTime2(hoverTime)
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex items-center justify-between text-xs", children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex items-center gap-2", children: [
              isLoading && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "text-[var(--color-brand-primary,#6AE6A6)]", children: "Loading..." }),
              isBuffering && !isLoading && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "text-[var(--color-brand-primary,#6AE6A6)]", children: "Buffering..." }),
              hasError && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "text-[var(--color-destructive,#FF6B6B)]", children: "Error loading audio" })
            ] }),
            showBuffered && bufferedTime > 0 && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("span", { className: "text-[var(--color-fg-muted,#A9B1C1)]", children: [
              "Buffered: ",
              formatTime2(bufferedTime)
            ] })
          ] })
        ]
      }
    );
  }
);
ProgressBar.displayName = "ProgressBar";

// src/media/CatalogCard.tsx
var import_jsx_runtime15 = require("react/jsx-runtime");
var catalogCardVariants = (0, import_class_variance_authority.cva)(
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
  isPlaying,
  onPreviewToggle,
  onOpen,
  variant,
  size,
  className,
  ...props
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    "article",
    {
      className: cn(catalogCardVariants({ variant, size }), className),
      "data-testid": "catalog-card",
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
          "div",
          {
            className: cn(
              "h-16 w-16 shrink-0 overflow-hidden rounded-md",
              !artworkUrl && "bg-bg-muted"
            ),
            "aria-hidden": true,
            children: artworkUrl ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("img", { src: artworkUrl, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "h-full w-full bg-gradient-to-br from-brand-primary/10 to-brand-accent/10" })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("h3", { className: "truncate text-fg-default text-base font-semibold", children: title }),
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "truncate text-fg-muted text-sm", children: producer }),
          /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "mt-2 flex flex-wrap items-center gap-2", children: [
            typeof bpm === "number" && /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(Tag, { className: "text-xs px-1.5 py-0.5 bg-bg-muted text-fg-muted", children: [
              bpm,
              " BPM"
            ] }),
            keySig && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Tag, { className: "text-xs px-1.5 py-0.5 bg-bg-muted text-fg-muted", children: keySig }),
            tags.slice(0, 3).map((t) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Tag, { className: "text-xs px-1.5 py-0.5 bg-brand-primary/20 text-brand-primary", children: t }, t)),
            tags.length > 3 && /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(Tag, { className: "text-xs px-1.5 py-0.5 bg-bg-muted text-fg-subtle", children: [
              "+",
              tags.length - 3
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "flex h-16 w-16 shrink-0 flex-col items-end justify-between", children: [
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
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
              children: isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_lucide_react.Pause, { className: "h-4 w-4", "aria-hidden": "true" }) : /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_lucide_react.Play, { className: "h-4 w-4", "aria-hidden": "true" })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "text-right", children: [
            /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "text-fg-default text-sm font-semibold", children: price }),
            /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
              "button",
              {
                type: "button",
                className: "inline-flex items-center gap-1 text-brand-accent text-xs hover:opacity-90 focus:underline focus:outline-none",
                onClick: () => onOpen?.(id),
                "aria-label": `Open details for ${title}`,
                children: [
                  "Details ",
                  /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(import_lucide_react.ChevronRight, { className: "h-3.5 w-3.5", "aria-hidden": "true" })
                ]
              }
            )
          ] })
        ] })
      ] })
    }
  );
}

// src/feedback/Skeleton.tsx
var import_class_variance_authority5 = require("class-variance-authority");
var import_react12 = require("react");
var import_jsx_runtime16 = require("react/jsx-runtime");
var skeletonVariants = (0, import_class_variance_authority5.cva)("animate-pulse rounded-md bg-muted", {
  variants: {
    variant: {
      default: "bg-muted",
      subtle: "bg-muted/50",
      strong: "bg-muted/80"
    },
    size: {
      sm: "h-4",
      md: "h-6",
      lg: "h-8",
      xl: "h-12"
    },
    shape: {
      rectangle: "rounded-md",
      circle: "rounded-full",
      text: "rounded-sm"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    shape: "rectangle"
  }
});
var Skeleton = (0, import_react12.forwardRef)(
  ({ className, variant, size, shape, lines = 1, width, height, style, ...props }, ref) => {
    const customStyle = {
      width: width || (shape === "circle" ? height || "2rem" : "100%"),
      height: height || (shape === "circle" ? width || "2rem" : void 0),
      ...style
    };
    if (lines > 1) {
      return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "space-y-2", ref, children: Array.from({ length: lines }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
        "div",
        {
          className: cn(skeletonVariants({ variant, size, shape }), className),
          style: customStyle,
          ...props
        },
        `skeleton-${Date.now()}-${index}`
      )) });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
      "div",
      {
        ref,
        className: cn(skeletonVariants({ variant, size, shape }), className),
        style: customStyle,
        ...props
      }
    );
  }
);
Skeleton.displayName = "Skeleton";

// src/forms/Field.tsx
var import_class_variance_authority6 = require("class-variance-authority");
var import_react13 = require("react");
var import_jsx_runtime17 = require("react/jsx-runtime");
var fieldVariants = (0, import_class_variance_authority6.cva)("flex flex-col gap-1", {
  variants: {
    size: {
      sm: "gap-1",
      md: "gap-2",
      lg: "gap-3"
    }
  },
  defaultVariants: {
    size: "md"
  }
});
var Field = (0, import_react13.forwardRef)(
  ({ className, label, error, required, disabled, htmlFor, children, size, ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { ref, className: cn(fieldVariants({ size, className })), ...props, children: [
      label && /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
        "label",
        {
          htmlFor,
          className: cn(
            "text-sm font-medium",
            disabled ? "text-[var(--color-state-disabled-fg,rgba(230,234,242,0.35))]" : "text-[var(--color-fg,#E6EAF2)]",
            error && "text-[var(--color-semantic-danger,#F97066)]"
          ),
          children: [
            label,
            required && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "ml-1 text-[var(--color-semantic-danger,#F97066)]", children: "*" })
          ]
        }
      ),
      children,
      error && /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(
        "p",
        {
          className: "text-xs text-[var(--color-semantic-danger,#F97066)]",
          role: "alert",
          id: htmlFor ? `${htmlFor}-error` : void 0,
          "aria-live": "polite",
          children: error
        }
      )
    ] });
  }
);
Field.displayName = "Field";

// src/forms/Input.tsx
var import_class_variance_authority7 = require("class-variance-authority");
var import_react14 = require("react");
var import_jsx_runtime18 = require("react/jsx-runtime");
var inputVariants = (0, import_class_variance_authority7.cva)(
  [
    "flex w-full border transition-colors",
    "rounded-[var(--radius-sm,8px)]",
    "bg-[var(--color-bg-muted,#0F131B)]",
    "text-[var(--color-fg,#E6EAF2)]",
    "placeholder:text-[var(--color-fg-muted,#A9B1C1)]",
    "focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-accent,#5BD0FF)]",
    "focus:border-[var(--color-brand-accent,#5BD0FF)]",
    "disabled:cursor-not-allowed disabled:opacity-50"
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-8 px-2 text-xs",
        md: "h-9 px-3 text-sm",
        lg: "h-10 px-4 text-base"
      },
      variant: {
        default: "border-[var(--border-subtle,rgba(255,255,255,0.10))]",
        error: "border-[var(--border-danger,rgba(249,112,102,0.55))] focus:ring-[var(--border-danger,rgba(249,112,102,0.55))] focus:border-[var(--border-danger,rgba(249,112,102,0.55))]"
      }
    },
    defaultVariants: {
      size: "md",
      variant: "default"
    }
  }
);
var Input = (0, import_react14.forwardRef)(
  ({ className, size, variant, ...props }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)("input", { className: cn(inputVariants({ size, variant, className })), ref, ...props });
  }
);
Input.displayName = "Input";

// src/forms/Select.tsx
var SelectPrimitive = __toESM(require("@radix-ui/react-select"), 1);
var import_class_variance_authority8 = require("class-variance-authority");
var import_lucide_react5 = require("lucide-react");
var import_react15 = require("react");
var import_jsx_runtime19 = require("react/jsx-runtime");
var selectVariants = (0, import_class_variance_authority8.cva)(
  "flex w-full items-center justify-between rounded-sm border bg-bg-muted px-3 py-2 text-sm text-fg transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-8 px-2 text-xs",
        md: "h-9 px-3 text-sm",
        lg: "h-10 px-4 text-base"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
var Select = (0, import_react15.forwardRef)(
  ({ className, size, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(SelectPrimitive.Root, { ...props, children: /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(SelectPrimitive.Trigger, { ref, className: cn(selectVariants({ size, className })), children: [
    children,
    /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_lucide_react5.ChevronDown, { className: "h-4 w-4 opacity-50" }) })
  ] }) })
);
Select.displayName = SelectPrimitive.Trigger.displayName;
var SelectContent = (0, import_react15.forwardRef)(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(SelectPrimitive.Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-border-subtle bg-bg-elevated shadow-lg",
      className
    ),
    ...props,
    children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(SelectPrimitive.Viewport, { className: "p-1", children })
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectItem = (0, import_react15.forwardRef)(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime19.jsxs)(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-bg-active focus:text-fg data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(import_lucide_react5.Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

// src/forms/Checkbox.tsx
var CheckboxPrimitive = __toESM(require("@radix-ui/react-checkbox"), 1);
var import_class_variance_authority9 = require("class-variance-authority");
var import_lucide_react6 = require("lucide-react");
var import_react16 = require("react");
var import_jsx_runtime20 = require("react/jsx-runtime");
var checkboxVariants = (0, import_class_variance_authority9.cva)(
  "peer h-4 w-4 shrink-0 rounded-sm border border-border-subtle bg-bg-muted ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-brand-primary data-[state=checked]:text-brand-primary-foreground data-[state=checked]:border-brand-primary",
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
var Checkbox = (0, import_react16.forwardRef)(
  ({ className, size, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
    CheckboxPrimitive.Root,
    {
      ref,
      className: cn(checkboxVariants({ size, className })),
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(CheckboxPrimitive.Indicator, { className: "flex items-center justify-center text-current", children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_lucide_react6.Check, { className: "h-3 w-3" }) })
    }
  )
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// src/forms/Slider.tsx
var SliderPrimitive = __toESM(require("@radix-ui/react-slider"), 1);
var import_class_variance_authority10 = require("class-variance-authority");
var import_react17 = require("react");
var import_jsx_runtime21 = require("react/jsx-runtime");
var sliderVariants = (0, import_class_variance_authority10.cva)("relative flex w-full touch-none select-none items-center", {
  variants: {
    size: {
      sm: "h-4",
      md: "h-5",
      lg: "h-6"
    }
  },
  defaultVariants: {
    size: "md"
  }
});
var Slider = (0, import_react17.forwardRef)(
  ({ className, size, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(SliderPrimitive.Root, { ref, className: cn(sliderVariants({ size, className })), ...props, children: [
    /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(SliderPrimitive.Track, { className: "relative h-2 w-full grow overflow-hidden rounded-full bg-bg-muted", children: /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(SliderPrimitive.Range, { className: "absolute h-full bg-brand-primary" }) }),
    /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(SliderPrimitive.Thumb, { className: "block h-5 w-5 rounded-full border-2 border-brand-primary bg-bg-elevated ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" })
  ] })
);
Slider.displayName = SliderPrimitive.Root.displayName;

// src/Button.tsx
var import_react_slot3 = require("@radix-ui/react-slot");
var import_clsx2 = __toESM(require("clsx"), 1);
var import_jsx_runtime22 = require("react/jsx-runtime");
var base = "inline-flex items-center justify-center rounded-md font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent disabled:opacity-50 disabled:pointer-events-none";
var sizes = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-base",
  lg: "h-11 px-5 text-lg"
};
var variants = {
  primary: "bg-brand-primary text-bg hover:opacity-95",
  secondary: "bg-bg-elevated text-fg hover:opacity-90 border border-white/10",
  ghost: "bg-transparent text-fg hover:bg-white/5"
};
function Button2({
  variant = "primary",
  size = "md",
  loading = false,
  className,
  asChild = false,
  children,
  ...rest
}) {
  const Comp = asChild ? import_react_slot3.Slot : "button";
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
    Comp,
    {
      "aria-busy": loading,
      className: (0, import_clsx2.default)(base, sizes[size], variants[variant], className),
      ...rest,
      children: loading ? "\u2026" : children
    }
  );
}

// src/forms/CatalogFilters.tsx
var import_jsx_runtime23 = require("react/jsx-runtime");
var catalogFiltersVariants = (0, import_class_variance_authority.cva)("space-y-6 p-4", {
  variants: {
    variant: {
      default: "bg-bg-elevated border border-border-subtle rounded-lg",
      minimal: "bg-transparent",
      sidebar: "bg-bg-muted border-r border-border-subtle"
    },
    size: {
      sm: "p-3 space-y-4",
      md: "p-4 space-y-6",
      lg: "p-6 space-y-8"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
});
function CatalogFilters({
  genres = [],
  selectedGenres = [],
  onGenresChange,
  bpmRange = { min: 60, max: 200 },
  selectedBpmRange,
  onBpmRangeChange,
  priceRange = { min: 0, max: 100 },
  selectedPriceRange,
  onPriceRangeChange,
  keySignatures = [],
  selectedKeySignatures = [],
  onKeySignaturesChange,
  loading = false,
  activeFilterCount = 0,
  onClearAll,
  showClearAll = true,
  variant,
  size,
  className,
  ...props
}) {
  const handleGenreToggle = (genre) => {
    if (!onGenresChange) return;
    const newGenres = selectedGenres.includes(genre) ? selectedGenres.filter((g) => g !== genre) : [...selectedGenres, genre];
    onGenresChange(newGenres);
  };
  const handleKeySignatureToggle = (key) => {
    if (!onKeySignaturesChange) return;
    const newKeys = selectedKeySignatures.includes(key) ? selectedKeySignatures.filter((k) => k !== key) : [...selectedKeySignatures, key];
    onKeySignaturesChange(newKeys);
  };
  if (loading) {
    return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: cn(catalogFiltersVariants({ variant, size }), className), ...props, children: /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "animate-pulse space-y-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "h-4 bg-bg-muted/20 rounded w-1/4" }),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "space-y-2", children: Array.from({ length: 4 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "h-3 bg-bg-muted/20 rounded w-3/4" }, `skeleton-item-${i + 1}`)) })
    ] }) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: cn(catalogFiltersVariants({ variant, size }), className), ...props, children: [
    /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("h3", { className: "text-lg font-semibold text-fg-default", children: "Filters" }),
      showClearAll && activeFilterCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
        Button2,
        {
          variant: "ghost",
          size: "sm",
          onClick: onClearAll,
          className: "text-fg-muted hover:text-fg-default",
          children: [
            "Clear all (",
            activeFilterCount,
            ")"
          ]
        }
      )
    ] }),
    genres.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "space-y-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("h4", { className: "text-sm font-medium text-fg-default", children: "Genre" }),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "flex flex-wrap gap-2", children: genres.map((genre) => /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
        Badge,
        {
          variant: selectedGenres.includes(genre.value) ? "info" : "neutral",
          className: "cursor-pointer hover:bg-brand-primary/10",
          onClick: () => handleGenreToggle(genre.value),
          children: [
            genre.label,
            genre.count && /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("span", { className: "ml-1 text-xs opacity-70", children: [
              "(",
              genre.count,
              ")"
            ] })
          ]
        },
        genre.value
      )) })
    ] }),
    bpmRange && onBpmRangeChange && /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "space-y-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("h4", { className: "text-sm font-medium text-fg-default", children: [
        "BPM: ",
        selectedBpmRange?.min || bpmRange.min,
        " - ",
        selectedBpmRange?.max || bpmRange.max
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
        Slider,
        {
          min: bpmRange.min,
          max: bpmRange.max,
          value: [selectedBpmRange?.min || bpmRange.min, selectedBpmRange?.max || bpmRange.max],
          onValueChange: ([min, max]) => onBpmRangeChange({ min, max }),
          step: 5,
          className: "w-full"
        }
      )
    ] }),
    priceRange && onPriceRangeChange && /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "space-y-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("h4", { className: "text-sm font-medium text-fg-default", children: [
        "Price: $",
        selectedPriceRange?.min || priceRange.min,
        " - $",
        selectedPriceRange?.max || priceRange.max
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
        Slider,
        {
          min: priceRange.min,
          max: priceRange.max,
          value: [
            selectedPriceRange?.min || priceRange.min,
            selectedPriceRange?.max || priceRange.max
          ],
          onValueChange: ([min, max]) => onPriceRangeChange({ min, max }),
          step: 1,
          className: "w-full"
        }
      )
    ] }),
    keySignatures.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "space-y-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("h4", { className: "text-sm font-medium text-fg-default", children: "Key Signature" }),
      /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("div", { className: "grid grid-cols-2 gap-2", children: keySignatures.map((key) => /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
          Checkbox,
          {
            id: `key-${key.value}`,
            checked: selectedKeySignatures.includes(key.value),
            onCheckedChange: () => handleKeySignatureToggle(key.value)
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
          "label",
          {
            htmlFor: `key-${key.value}`,
            className: "text-sm cursor-pointer text-fg-default",
            children: [
              key.label,
              key.count && /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("span", { className: "ml-1 text-xs text-fg-muted", children: [
                "(",
                key.count,
                ")"
              ] })
            ]
          }
        )
      ] }, key.value)) })
    ] })
  ] });
}
function FilterChip({
  label,
  value,
  onRemove,
  className
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)(
    Badge,
    {
      variant: "neutral",
      className: cn("cursor-pointer hover:bg-semantic-danger hover:text-fg-inverse", className),
      onClick: () => onRemove?.(value),
      children: [
        label,
        /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("span", { className: "ml-1 text-xs", children: "\xD7" })
      ]
    }
  );
}
function ActiveFilters({
  filters,
  onRemove,
  onClearAll,
  className
}) {
  if (filters.length === 0) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsxs)("div", { className: cn("flex flex-wrap gap-2 items-center", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("span", { className: "text-sm text-fg-muted", children: "Active filters:" }),
    filters.map((filter) => /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
      FilterChip,
      {
        label: filter.label,
        value: filter.value,
        onRemove: (value) => onRemove?.(value, filter.type)
      },
      `${filter.type}-${filter.value}`
    )),
    onClearAll && /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
      Button2,
      {
        variant: "ghost",
        size: "sm",
        onClick: onClearAll,
        className: "text-fg-muted hover:text-fg-default",
        children: "Clear all"
      }
    )
  ] });
}

// src/upload/FileUpload.tsx
var import_react18 = require("react");
var import_jsx_runtime24 = require("react/jsx-runtime");
var fileUploadVariants = (0, import_class_variance_authority.cva)(
  "relative flex flex-col items-center justify-center border-2 border-dashed rounded-lg transition-all duration-200 focus-within:outline-none focus-within:ring-2 focus-within:ring-brand-ring focus-within:ring-offset-2 focus-within:ring-offset-bg-default",
  {
    variants: {
      variant: {
        default: "border-border-subtle bg-bg-elevated hover:border-brand-primary hover:bg-brand-primary/5",
        minimal: "border-border-muted bg-transparent hover:border-border-subtle hover:bg-bg-muted",
        success: "border-semantic-success bg-semantic-success/5 hover:border-semantic-success",
        error: "border-semantic-danger bg-semantic-danger/5 hover:border-semantic-danger"
      },
      size: {
        sm: "p-4 min-h-[120px]",
        md: "p-6 min-h-[160px]",
        lg: "p-8 min-h-[200px]"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
var FileUpload = (0, import_react18.forwardRef)(
  ({
    className,
    accept = "audio/*",
    maxSize = 50 * 1024 * 1024,
    // 50MB default
    maxFiles = 1,
    multiple = false,
    disabled = false,
    files = [],
    status = "idle",
    progress = 0,
    error,
    success,
    onChange,
    onDrop,
    onUpload,
    onComplete,
    onError,
    variant,
    size,
    ...props
  }, ref) => {
    const [isDragOver, setIsDragOver] = (0, import_react18.useState)(false);
    const [validationErrors, setValidationErrors] = (0, import_react18.useState)([]);
    const validateFile = (0, import_react18.useCallback)(
      (file) => {
        const errors = [];
        if (file.size > maxSize) {
          errors.push(`File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`);
        }
        if (accept && !accept.split(",").some((type) => file.type.match(type.replace("*", ".*")))) {
          errors.push(`File type must be one of: ${accept}`);
        }
        return errors;
      },
      [accept, maxSize]
    );
    const handleFiles = (0, import_react18.useCallback)(
      (newFiles) => {
        if (disabled) return;
        const fileArray = Array.from(newFiles);
        const errors = [];
        for (const file of fileArray) {
          const fileErrors = validateFile(file);
          errors.push(...fileErrors);
        }
        if (files.length + fileArray.length > maxFiles) {
          errors.push(`Maximum ${maxFiles} file${maxFiles > 1 ? "s" : ""} allowed`);
        }
        setValidationErrors(errors);
        if (errors.length === 0) {
          const updatedFiles = multiple ? [...files, ...fileArray] : fileArray;
          onChange?.(updatedFiles);
          onDrop?.(fileArray);
        } else {
          onError?.(errors.join(", "));
        }
      },
      [disabled, files, maxFiles, multiple, onChange, onDrop, onError, validateFile]
    );
    const handleDragOver = (0, import_react18.useCallback)(
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
          setIsDragOver(true);
        }
      },
      [disabled]
    );
    const handleDragLeave = (0, import_react18.useCallback)((e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
    }, []);
    const handleDrop = (0, import_react18.useCallback)(
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
        if (disabled) return;
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length > 0) {
          handleFiles(droppedFiles);
        }
      },
      [disabled, handleFiles]
    );
    const handleFileInput = (0, import_react18.useCallback)(
      (e) => {
        const selectedFiles = e.target.files;
        if (selectedFiles && selectedFiles.length > 0) {
          handleFiles(selectedFiles);
        }
      },
      [handleFiles]
    );
    const removeFile = (0, import_react18.useCallback)(
      (index) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        onChange?.(updatedFiles);
      },
      [files, onChange]
    );
    const formatFileSize2 = (bytes) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes2 = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes2[i]}`;
    };
    const getStatusIcon2 = () => {
      switch (status) {
        case "success":
          return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_lucide_react.CheckCircle, { className: "h-8 w-8 text-semantic-success" });
        case "error":
          return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_lucide_react.AlertCircle, { className: "h-8 w-8 text-semantic-danger" });
        case "uploading":
        case "processing":
          return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "h-8 w-8 animate-spin rounded-full border-2 border-brand-primary border-t-transparent" });
        default:
          return /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_lucide_react.Upload, { className: "h-8 w-8 text-fg-muted" });
      }
    };
    const getStatusMessage = () => {
      if (error) return error;
      if (success) return success;
      if (status === "uploading") return `Uploading... ${Math.round(progress)}%`;
      if (status === "processing") return "Processing files...";
      if (files.length > 0) return `${files.length} file${files.length > 1 ? "s" : ""} selected`;
      return "Drag and drop files here, or click to select";
    };
    const getVariant = () => {
      if (error || status === "error") return "error";
      if (success || status === "success") return "success";
      return variant;
    };
    return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { ref, className: cn("w-full", className), ...props, children: [
      /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(
        "div",
        {
          className: cn(fileUploadVariants({ variant: getVariant(), size }), {
            "opacity-50 cursor-not-allowed": disabled,
            "cursor-pointer": !disabled,
            "border-brand-primary bg-brand-primary/10": isDragOver && !disabled
          }),
          onDragOver: handleDragOver,
          onDragLeave: handleDragLeave,
          onDrop: handleDrop,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
              "input",
              {
                type: "file",
                accept,
                multiple,
                disabled,
                onChange: handleFileInput,
                className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed",
                "aria-label": "File upload input"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "flex flex-col items-center gap-3 text-center", children: [
              getStatusIcon2(),
              /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "space-y-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("p", { className: "text-sm font-medium text-fg-default", children: getStatusMessage() }),
                /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("p", { className: "text-xs text-fg-muted", children: [
                  accept.includes("audio") ? "Audio files" : "Files",
                  " up to",
                  " ",
                  Math.round(maxSize / 1024 / 1024),
                  "MB"
                ] })
              ] }),
              status === "uploading" && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "w-full max-w-xs", children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "h-2 bg-bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
                "div",
                {
                  className: "h-full bg-brand-primary transition-all duration-300",
                  style: { width: `${progress}%` }
                }
              ) }) })
            ] })
          ]
        }
      ),
      files.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "mt-4 space-y-2", children: files.map((file, index) => /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)(
        "div",
        {
          className: "flex items-center gap-3 p-3 bg-bg-elevated border border-border-subtle rounded-lg",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "flex-shrink-0", children: file.type.startsWith("audio/") ? /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_lucide_react.Music, { className: "h-5 w-5 text-brand-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_lucide_react.File, { className: "h-5 w-5 text-fg-muted" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("p", { className: "text-sm font-medium text-fg-default truncate", children: file.name }),
              /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("p", { className: "text-xs text-fg-muted", children: formatFileSize2(file.size) })
            ] }),
            !disabled && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
              "button",
              {
                type: "button",
                onClick: () => removeFile(index),
                className: "flex-shrink-0 p-1 text-fg-muted hover:text-fg-default transition-colors",
                "aria-label": `Remove ${file.name}`,
                children: /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(import_lucide_react.X, { className: "h-4 w-4" })
              }
            )
          ]
        },
        `${file.name}-${index}`
      )) }),
      validationErrors.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "mt-3 space-y-1", children: validationErrors.map((error2, index) => /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
        "p",
        {
          className: "text-sm text-semantic-danger",
          children: error2
        },
        `error-${index}-${error2.slice(0, 10)}`
      )) })
    ] });
  }
);
FileUpload.displayName = "FileUpload";

// src/upload/UploadProgress.tsx
var import_react19 = require("react");
var import_jsx_runtime25 = require("react/jsx-runtime");
var uploadProgressVariants = (0, import_class_variance_authority.cva)("w-full", {
  variants: {
    variant: {
      default: "bg-bg-elevated border border-border-subtle rounded-lg p-4",
      minimal: "bg-transparent",
      inline: "bg-bg-muted border border-border-muted rounded-md p-3"
    },
    size: {
      sm: "p-3",
      md: "p-4",
      lg: "p-6"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
});
var UploadProgress = (0, import_react19.forwardRef)(
  ({
    className,
    progress = 0,
    status = "idle",
    fileName,
    fileSize,
    speed,
    timeRemaining,
    error,
    success,
    showDetails = true,
    showEstimates = true,
    variant,
    size,
    ...props
  }, ref) => {
    const formatFileSize2 = (bytes) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes2 = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes2[i]}`;
    };
    const formatSpeed = (bytesPerSecond) => {
      if (bytesPerSecond === 0) return "0 B/s";
      const k = 1024;
      const sizes2 = ["B/s", "KB/s", "MB/s", "GB/s"];
      const i = Math.floor(Math.log(bytesPerSecond) / Math.log(k));
      return `${Number.parseFloat((bytesPerSecond / k ** i).toFixed(1))} ${sizes2[i]}`;
    };
    const formatTime2 = (seconds) => {
      if (seconds === 0) return "0s";
      if (seconds < 60) return `${Math.round(seconds)}s`;
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.round(seconds % 60);
      return `${minutes}m ${remainingSeconds}s`;
    };
    const getStatusIcon2 = () => {
      switch (status) {
        case "success":
          return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_lucide_react.CheckCircle, { className: "h-5 w-5 text-semantic-success" });
        case "error":
          return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_lucide_react.AlertCircle, { className: "h-5 w-5 text-semantic-danger" });
        case "uploading":
          return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_lucide_react.Loader2, { className: "h-5 w-5 text-brand-primary animate-spin" });
        case "processing":
          return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_lucide_react.Clock, { className: "h-5 w-5 text-brand-primary animate-pulse" });
        default:
          return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(import_lucide_react.Clock, { className: "h-5 w-5 text-fg-muted" });
      }
    };
    const getStatusMessage = () => {
      if (error) return error;
      if (success) return success;
      if (status === "uploading") return `Uploading... ${Math.round(progress)}%`;
      if (status === "processing") return "Processing file...";
      if (status === "success") return "Upload complete!";
      if (status === "error") return "Upload failed";
      return "Ready to upload";
    };
    const getProgressColor = () => {
      switch (status) {
        case "success":
          return "bg-semantic-success";
        case "error":
          return "bg-semantic-danger";
        case "uploading":
        case "processing":
          return "bg-brand-primary";
        default:
          return "bg-fg-muted";
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)(
      "div",
      {
        ref,
        className: cn(uploadProgressVariants({ variant, size }), className),
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "flex items-center gap-3 mb-3", children: [
            getStatusIcon2(),
            /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "flex-1 min-w-0", children: [
              fileName && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("p", { className: "text-sm font-medium text-fg-default truncate", children: fileName }),
              /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("p", { className: "text-sm text-fg-muted", children: getStatusMessage() })
            ] }),
            showDetails && fileSize && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("span", { className: "text-xs text-fg-muted", children: formatFileSize2(fileSize) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "space-y-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "w-full bg-bg-muted rounded-full h-2 overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
              "div",
              {
                className: cn("h-full transition-all duration-300 ease-out", getProgressColor()),
                style: { width: `${Math.min(100, Math.max(0, progress))}%` }
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "flex items-center justify-between text-xs text-fg-muted", children: [
              /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("span", { children: [
                Math.round(progress),
                "%"
              ] }),
              showEstimates && speed && timeRemaining && status === "uploading" && /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("span", { children: formatSpeed(speed) }),
                /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("span", { children: "\u2022" }),
                /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("span", { children: [
                  formatTime2(timeRemaining),
                  " remaining"
                ] })
              ] })
            ] })
          ] }),
          showDetails && /* @__PURE__ */ (0, import_jsx_runtime25.jsx)("div", { className: "mt-3 pt-3 border-t border-border-subtle", children: /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("div", { className: "flex items-center justify-between text-xs text-fg-muted", children: [
            /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("span", { children: [
              "Status: ",
              status
            ] }),
            speed && /* @__PURE__ */ (0, import_jsx_runtime25.jsxs)("span", { children: [
              "Speed: ",
              formatSpeed(speed)
            ] })
          ] }) })
        ]
      }
    );
  }
);
UploadProgress.displayName = "UploadProgress";

// src/upload/ValidationFeedback.tsx
var import_react20 = require("react");
var import_jsx_runtime26 = require("react/jsx-runtime");
var validationFeedbackVariants = (0, import_class_variance_authority.cva)("rounded-lg border p-3 space-y-2", {
  variants: {
    variant: {
      valid: "bg-semantic-success/10 border-semantic-success text-semantic-success",
      invalid: "bg-semantic-danger/10 border-semantic-danger text-semantic-danger",
      warning: "bg-semantic-warning/10 border-semantic-warning text-semantic-warning",
      info: "bg-semantic-info/10 border-semantic-info text-semantic-info"
    },
    size: {
      sm: "p-2 text-sm",
      md: "p-3 text-sm",
      lg: "p-4 text-base"
    }
  },
  defaultVariants: {
    variant: "info",
    size: "md"
  }
});
var ValidationFeedback = (0, import_react20.forwardRef)(
  ({
    className,
    status = "info",
    errors = [],
    warnings = [],
    success = [],
    info = [],
    showIcons = true,
    showClose = false,
    onClose,
    maxMessages = 5,
    variant,
    size,
    ...props
  }, ref) => {
    const getStatusIcon2 = () => {
      switch (status) {
        case "valid":
          return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_lucide_react.CheckCircle, { className: "h-4 w-4" });
        case "invalid":
          return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_lucide_react.AlertCircle, { className: "h-4 w-4" });
        case "warning":
          return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_lucide_react.AlertTriangle, { className: "h-4 w-4" });
        default:
          return /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_lucide_react.Info, { className: "h-4 w-4" });
      }
    };
    const getStatusColor2 = () => {
      switch (status) {
        case "valid":
          return "text-semantic-success";
        case "invalid":
          return "text-semantic-danger";
        case "warning":
          return "text-semantic-warning";
        default:
          return "text-semantic-info";
      }
    };
    const getMessages = () => {
      const allMessages = [
        ...errors.map((msg) => ({ type: "error", message: msg })),
        ...warnings.map((msg) => ({ type: "warning", message: msg })),
        ...success.map((msg) => ({ type: "success", message: msg })),
        ...info.map((msg) => ({ type: "info", message: msg }))
      ];
      return allMessages.slice(0, maxMessages);
    };
    const messages = getMessages();
    if (messages.length === 0) {
      return null;
    }
    const getVariant = () => {
      if (errors.length > 0) return "invalid";
      if (warnings.length > 0) return "warning";
      if (success.length > 0) return "valid";
      return variant || "info";
    };
    return /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(
      "div",
      {
        ref,
        className: cn(validationFeedbackVariants({ variant: getVariant(), size }), className),
        role: "alert",
        "aria-live": "polite",
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { className: "flex items-start gap-2", children: [
            showIcons && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "flex-shrink-0 mt-0.5", children: getStatusIcon2() }),
            /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("div", { className: "space-y-1", children: messages.map((message, index) => /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)(
              "div",
              {
                className: "flex items-start gap-2",
                children: [
                  showIcons && /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("div", { className: "flex-shrink-0 mt-0.5", children: [
                    message.type === "error" && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_lucide_react.AlertCircle, { className: "h-3 w-3" }),
                    message.type === "warning" && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_lucide_react.AlertTriangle, { className: "h-3 w-3" }),
                    message.type === "success" && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_lucide_react.CheckCircle, { className: "h-3 w-3" }),
                    message.type === "info" && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_lucide_react.Info, { className: "h-3 w-3" })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime26.jsx)("p", { className: "text-sm leading-relaxed", children: message.message })
                ]
              },
              `${message.type}-${index}-${message.message.slice(0, 10)}`
            )) }) }),
            showClose && onClose && /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(
              "button",
              {
                type: "button",
                onClick: onClose,
                className: "flex-shrink-0 p-1 hover:bg-bg-hover rounded transition-colors",
                "aria-label": "Close feedback",
                children: /* @__PURE__ */ (0, import_jsx_runtime26.jsx)(import_lucide_react.X, { className: "h-4 w-4" })
              }
            )
          ] }),
          messages.length >= maxMessages && /* @__PURE__ */ (0, import_jsx_runtime26.jsxs)("p", { className: "text-xs opacity-75", children: [
            messages.length - maxMessages,
            " more message",
            messages.length - maxMessages > 1 ? "s" : "",
            "..."
          ] })
        ]
      }
    );
  }
);
ValidationFeedback.displayName = "ValidationFeedback";

// src/asset/AssetTile.tsx
var import_react21 = require("react");
var import_jsx_runtime27 = require("react/jsx-runtime");
var assetTileVariants = (0, import_class_variance_authority.cva)(
  "relative flex flex-col rounded-lg border transition-all duration-200 cursor-pointer group",
  {
    variants: {
      variant: {
        default: "bg-bg-elevated border-border-subtle hover:border-brand-primary",
        selected: "bg-bg-elevated border-brand-primary ring-2 ring-brand-ring",
        disabled: "bg-bg-muted border-border-subtle opacity-50 cursor-not-allowed"
      },
      size: {
        sm: "w-48 h-64",
        md: "w-56 h-72",
        lg: "w-64 h-80"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
var getStatusIcon = (status) => {
  switch (status) {
    case "draft":
      return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_lucide_react.Edit, { className: "w-4 h-4" });
    case "processing":
      return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_lucide_react.Clock, { className: "w-4 h-4" });
    case "ready":
      return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_lucide_react.Check, { className: "w-4 h-4" });
    case "error":
      return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_lucide_react.X, { className: "w-4 h-4" });
    case "archived":
      return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_lucide_react.Archive, { className: "w-4 h-4" });
    case "published":
      return /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_lucide_react.Globe, { className: "w-4 h-4" });
    default:
      return null;
  }
};
var getStatusColor = (status) => {
  switch (status) {
    case "draft":
      return "text-fg-muted";
    case "processing":
      return "text-warning";
    case "ready":
      return "text-semantic-success";
    case "error":
      return "text-semantic-danger";
    case "archived":
      return "text-fg-muted";
    case "published":
      return "text-semantic-success";
    default:
      return "text-fg-muted";
  }
};
var formatDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};
var formatDate = (date) => {
  const now = /* @__PURE__ */ new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1e3 * 60 * 60 * 24));
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return `${Math.floor(days / 30)} months ago`;
};
var AssetTile = (0, import_react21.forwardRef)(
  ({
    className,
    asset,
    isSelected = false,
    showActions = true,
    disabled = false,
    variant,
    size,
    onSelect,
    onEdit,
    onDelete,
    onPublish,
    onArchive,
    onUnarchive,
    onDuplicate,
    ...props
  }, ref) => {
    const handleClick = () => {
      if (asset.status === "processing") return;
      onSelect?.(asset.id);
    };
    const handleActionClick = (e) => {
      e.stopPropagation();
    };
    const isDisabled = disabled || asset.status === "processing" || asset.hasError;
    return /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(
      "div",
      {
        ref,
        className: cn(
          assetTileVariants({ variant: isSelected ? "selected" : variant }),
          size,
          isDisabled && "opacity-50 cursor-not-allowed",
          className
        ),
        onClick: handleClick,
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "relative w-full h-3/5 rounded-t-lg overflow-hidden", children: [
            asset.coverUrl ? /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
              "img",
              {
                src: asset.coverUrl,
                alt: `${asset.title} cover`,
                className: "w-full h-full object-cover"
              }
            ) : /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "w-full h-full bg-bg-muted flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "text-fg-muted text-4xl", children: "\u{1F3B5}" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "absolute top-2 left-2", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)(
              "div",
              {
                className: cn(
                  "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                  "bg-bg-elevated/90 backdrop-blur-sm",
                  getStatusColor(asset.status)
                ),
                children: [
                  getStatusIcon(asset.status),
                  /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { className: "capitalize", children: asset.status })
                ]
              }
            ) }),
            asset.isProcessing && asset.progress !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "absolute bottom-0 left-0 right-0 h-1 bg-bg-muted", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
              "div",
              {
                className: "h-full bg-brand-primary transition-all duration-300",
                style: { width: `${asset.progress}%` }
              }
            ) }),
            asset.hasError && /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "absolute inset-0 bg-semantic-danger/20 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "text-semantic-danger text-sm font-medium text-center", children: asset.errorMessage || "Upload failed" }) }),
            showActions && !isDisabled && /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(
              "button",
              {
                type: "button",
                onClick: handleActionClick,
                className: "p-1 rounded-full bg-bg-elevated/90 backdrop-blur-sm hover:bg-bg-hover",
                "aria-label": "Asset actions",
                children: /* @__PURE__ */ (0, import_jsx_runtime27.jsx)(import_lucide_react.MoreHorizontal, { className: "w-4 h-4 text-fg-muted" })
              }
            ) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "flex-1 p-3 space-y-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "space-y-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("h3", { className: "font-medium text-fg truncate", title: asset.title, children: asset.title }),
              /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("p", { className: "text-sm text-fg-muted truncate", title: asset.artist, children: asset.artist })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "space-y-1 text-xs text-fg-muted", children: [
              asset.duration && /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { children: "Duration" }),
                /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { children: formatDuration(asset.duration) })
              ] }),
              asset.bpm && /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { children: "BPM" }),
                /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { children: asset.bpm })
              ] }),
              asset.key && /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { children: "Key" }),
                /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { children: asset.key })
              ] }),
              asset.price && /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("span", { children: "Price" }),
                /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("span", { className: "font-medium text-fg", children: [
                  asset.price.currency,
                  " ",
                  asset.price.amount
                ] })
              ] })
            ] }),
            asset.status === "published" && (asset.sales || asset.views) && /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("div", { className: "flex items-center gap-3 text-xs text-fg-muted", children: [
              asset.sales && /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("span", { children: [
                asset.sales,
                " sales"
              ] }),
              asset.views && /* @__PURE__ */ (0, import_jsx_runtime27.jsxs)("span", { children: [
                asset.views,
                " views"
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime27.jsx)("div", { className: "text-xs text-fg-muted", children: formatDate(asset.updatedAt) })
          ] })
        ]
      }
    );
  }
);
AssetTile.displayName = "AssetTile";

// src/asset/AssetStatus.tsx
var import_react22 = require("react");
var import_jsx_runtime28 = require("react/jsx-runtime");
var assetStatusVariants = (0, import_class_variance_authority.cva)(
  "inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-bg-elevated text-fg-muted",
        success: "bg-semantic-success/20 text-semantic-success",
        warning: "bg-warning/20 text-warning",
        destructive: "bg-semantic-danger/20 text-semantic-danger",
        muted: "bg-bg-muted text-fg-muted"
      },
      size: {
        sm: "text-xs px-1.5 py-0.5",
        md: "text-xs px-2 py-1",
        lg: "text-sm px-2.5 py-1.5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
var getStatusConfig = (status) => {
  switch (status) {
    case "draft":
      return {
        icon: import_lucide_react.Edit,
        label: "Draft",
        variant: "muted",
        color: "text-fg-muted"
      };
    case "processing":
      return {
        icon: import_lucide_react.Clock,
        label: "Processing",
        variant: "warning",
        color: "text-warning"
      };
    case "ready":
      return {
        icon: import_lucide_react.Check,
        label: "Ready",
        variant: "success",
        color: "text-semantic-success"
      };
    case "error":
      return {
        icon: import_lucide_react.X,
        label: "Error",
        variant: "destructive",
        color: "text-semantic-danger"
      };
    case "archived":
      return {
        icon: import_lucide_react.Archive,
        label: "Archived",
        variant: "muted",
        color: "text-fg-muted"
      };
    case "published":
      return {
        icon: import_lucide_react.Globe,
        label: "Published",
        variant: "success",
        color: "text-semantic-success"
      };
    default:
      return {
        icon: import_lucide_react.Edit,
        label: "Unknown",
        variant: "muted",
        color: "text-fg-muted"
      };
  }
};
var AssetStatus = (0, import_react22.forwardRef)(
  ({
    className,
    status,
    showIcon = true,
    showLabel = true,
    isProcessing = false,
    progress,
    errorMessage,
    variant,
    size,
    ...props
  }, ref) => {
    const config = getStatusConfig(status);
    const Icon2 = config.icon;
    return /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)(
      "div",
      {
        ref,
        className: cn(assetStatusVariants({ variant: variant || config.variant, size }), className),
        ...props,
        children: [
          showIcon && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)(Icon2, { className: "w-3 h-3 flex-shrink-0", "aria-hidden": "true" }),
          showLabel && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("span", { className: "capitalize", children: config.label }),
          isProcessing && progress !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime28.jsxs)("span", { className: "ml-1 text-xs opacity-75", children: [
            Math.round(progress),
            "%"
          ] }),
          status === "error" && errorMessage && /* @__PURE__ */ (0, import_jsx_runtime28.jsx)("span", { className: "ml-1 text-xs opacity-75", title: errorMessage, children: "!" })
        ]
      }
    );
  }
);
AssetStatus.displayName = "AssetStatus";

// src/asset/MetadataPanel.tsx
var import_react23 = require("react");
var import_jsx_runtime29 = require("react/jsx-runtime");
var metadataPanelVariants = (0, import_class_variance_authority.cva)("rounded-lg border transition-all duration-200", {
  variants: {
    variant: {
      default: "bg-bg-elevated border-border-subtle",
      editing: "bg-bg-elevated border-brand-primary ring-2 ring-brand-ring",
      error: "bg-bg-elevated border-semantic-danger ring-2 ring-semantic-danger/20"
    },
    size: {
      sm: "p-3",
      md: "p-4",
      lg: "p-6"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
});
var formatFileSize = (bytes) => {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
};
var formatDuration2 = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};
var MetadataPanel = (0, import_react23.forwardRef)(
  ({
    className,
    metadata,
    isEditing = false,
    isSaving = false,
    hasError = false,
    errorMessage,
    validationErrors = {},
    onChange,
    onSave,
    onCancel,
    onEdit,
    variant,
    size,
    ...props
  }, ref) => {
    const [localMetadata, setLocalMetadata] = (0, import_react23.useState)(metadata);
    const handleFieldChange = (field, value) => {
      const updated = { ...localMetadata, [field]: value };
      setLocalMetadata(updated);
      onChange?.(updated);
    };
    const handleSave = () => {
      onSave?.(localMetadata);
    };
    const handleCancel = () => {
      setLocalMetadata(metadata);
      onCancel?.();
    };
    const getFieldError = (field) => {
      return validationErrors[field]?.[0] || null;
    };
    const currentVariant = hasError ? "error" : isEditing ? "editing" : variant;
    return /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
      "div",
      {
        ref,
        className: cn(metadataPanelVariants({ variant: currentVariant, size }), className),
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("h3", { className: "text-lg font-semibold text-fg", children: "Asset Metadata" }),
            /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("div", { className: "flex items-center gap-2", children: isEditing ? /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(import_jsx_runtime29.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
                "button",
                {
                  type: "button",
                  onClick: handleSave,
                  disabled: isSaving,
                  className: "flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md bg-brand-primary text-fg-inverse hover:bg-brand-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_lucide_react.Save, { className: "w-4 h-4" }),
                    isSaving ? "Saving..." : "Save"
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)(
                "button",
                {
                  type: "button",
                  onClick: handleCancel,
                  disabled: isSaving,
                  className: "flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md bg-bg-muted text-fg-muted hover:bg-bg-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(import_lucide_react.X, { className: "w-4 h-4" }),
                    "Cancel"
                  ]
                }
              )
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
              "button",
              {
                type: "button",
                onClick: onEdit,
                className: "px-3 py-1.5 text-sm font-medium rounded-md bg-bg-muted text-fg-muted hover:bg-bg-hover transition-colors",
                children: "Edit"
              }
            ) })
          ] }),
          hasError && errorMessage && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("div", { className: "mb-4 p-3 rounded-md bg-semantic-danger/10 border border-semantic-danger/20", children: /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("p", { className: "text-sm text-semantic-danger", children: errorMessage }) }),
          /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { className: "space-y-4", children: [
              /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("label", { htmlFor: "title", className: "block text-sm font-medium text-fg mb-1", children: "Title" }),
                isEditing ? /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
                  "input",
                  {
                    id: "title",
                    type: "text",
                    value: localMetadata.title,
                    onChange: (e) => handleFieldChange("title", e.target.value),
                    className: "w-full px-3 py-2 text-sm rounded-md bg-bg-muted border border-border-subtle text-fg focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent",
                    placeholder: "Enter track title"
                  }
                ) : /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("p", { className: "text-sm text-fg-muted", children: metadata.title }),
                getFieldError("title") && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("p", { className: "text-xs text-semantic-danger mt-1", children: getFieldError("title") })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("label", { htmlFor: "artist", className: "block text-sm font-medium text-fg mb-1", children: "Artist" }),
                isEditing ? /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
                  "input",
                  {
                    id: "artist",
                    type: "text",
                    value: localMetadata.artist,
                    onChange: (e) => handleFieldChange("artist", e.target.value),
                    className: "w-full px-3 py-2 text-sm rounded-md bg-bg-muted border border-border-subtle text-fg focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent",
                    placeholder: "Enter artist name"
                  }
                ) : /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("p", { className: "text-sm text-fg-muted", children: metadata.artist }),
                getFieldError("artist") && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("p", { className: "text-xs text-semantic-danger mt-1", children: getFieldError("artist") })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("label", { htmlFor: "description", className: "block text-sm font-medium text-fg mb-1", children: "Description" }),
                isEditing ? /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
                  "textarea",
                  {
                    id: "description",
                    value: localMetadata.description,
                    onChange: (e) => handleFieldChange("description", e.target.value),
                    rows: 3,
                    className: "w-full px-3 py-2 text-sm rounded-md bg-bg-muted border border-border-subtle text-fg focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent resize-none",
                    placeholder: "Enter track description"
                  }
                ) : /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("p", { className: "text-sm text-fg-muted", children: metadata.description || "No description" }),
                getFieldError("description") && /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("p", { className: "text-xs text-semantic-danger mt-1", children: getFieldError("description") })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { className: "space-y-4", children: [
              /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("label", { htmlFor: "bpm", className: "block text-sm font-medium text-fg mb-1", children: "BPM" }),
                  isEditing ? /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
                    "input",
                    {
                      id: "bpm",
                      type: "number",
                      value: localMetadata.bpm,
                      onChange: (e) => handleFieldChange("bpm", Number(e.target.value)),
                      className: "w-full px-3 py-2 text-sm rounded-md bg-bg-muted border border-border-subtle text-fg focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent",
                      placeholder: "120"
                    }
                  ) : /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("p", { className: "text-sm text-fg-muted", children: metadata.bpm || "\u2014" })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("label", { htmlFor: "key", className: "block text-sm font-medium text-fg mb-1", children: "Key" }),
                  isEditing ? /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
                    "input",
                    {
                      id: "key",
                      type: "text",
                      value: localMetadata.key,
                      onChange: (e) => handleFieldChange("key", e.target.value),
                      className: "w-full px-3 py-2 text-sm rounded-md bg-bg-muted border border-border-subtle text-fg focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent",
                      placeholder: "C"
                    }
                  ) : /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("p", { className: "text-sm text-fg-muted", children: metadata.key || "\u2014" })
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("label", { htmlFor: "genre", className: "block text-sm font-medium text-fg mb-1", children: "Genre" }),
                  isEditing ? /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
                    "input",
                    {
                      id: "genre",
                      type: "text",
                      value: localMetadata.genre,
                      onChange: (e) => handleFieldChange("genre", e.target.value),
                      className: "w-full px-3 py-2 text-sm rounded-md bg-bg-muted border border-border-subtle text-fg focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent",
                      placeholder: "Hip-Hop"
                    }
                  ) : /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("p", { className: "text-sm text-fg-muted", children: metadata.genre || "\u2014" })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("label", { htmlFor: "mood", className: "block text-sm font-medium text-fg mb-1", children: "Mood" }),
                  isEditing ? /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
                    "input",
                    {
                      id: "mood",
                      type: "text",
                      value: localMetadata.mood,
                      onChange: (e) => handleFieldChange("mood", e.target.value),
                      className: "w-full px-3 py-2 text-sm rounded-md bg-bg-muted border border-border-subtle text-fg focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent",
                      placeholder: "Dark"
                    }
                  ) : /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("p", { className: "text-sm text-fg-muted", children: metadata.mood || "\u2014" })
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("label", { htmlFor: "tags", className: "block text-sm font-medium text-fg mb-1", children: "Tags" }),
                isEditing ? /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
                  "input",
                  {
                    id: "tags",
                    type: "text",
                    value: localMetadata.tags.join(", "),
                    onChange: (e) => handleFieldChange("tags", e.target.value.split(", ").filter(Boolean)),
                    className: "w-full px-3 py-2 text-sm rounded-md bg-bg-muted border border-border-subtle text-fg focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent",
                    placeholder: "trap, dark, 808"
                  }
                ) : /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("div", { className: "flex flex-wrap gap-1", children: metadata.tags.length > 0 ? metadata.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime29.jsx)(
                  "span",
                  {
                    className: "inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-bg-muted text-fg-muted",
                    children: tag
                  },
                  `tag-${tag}-${Date.now()}`
                )) : /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("span", { className: "text-sm text-fg-muted", children: "No tags" }) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { className: "mt-6 pt-4 border-t border-border-subtle", children: [
            /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("h4", { className: "text-sm font-medium text-fg mb-3", children: "Technical Details" }),
            /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 text-sm", children: [
              /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("span", { className: "text-fg-muted", children: "Duration" }),
                /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("p", { className: "text-fg", children: formatDuration2(metadata.duration) })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("span", { className: "text-fg-muted", children: "File Size" }),
                /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("p", { className: "text-fg", children: formatFileSize(metadata.fileSize) })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("span", { className: "text-fg-muted", children: "Sample Rate" }),
                /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("p", { className: "text-fg", children: [
                  metadata.sampleRate,
                  " Hz"
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime29.jsx)("span", { className: "text-fg-muted", children: "Bit Depth" }),
                /* @__PURE__ */ (0, import_jsx_runtime29.jsxs)("p", { className: "text-fg", children: [
                  metadata.bitDepth,
                  "-bit"
                ] })
              ] })
            ] })
          ] })
        ]
      }
    );
  }
);
MetadataPanel.displayName = "MetadataPanel";

// src/asset/AssetActions.tsx
var import_react24 = require("react");
var import_jsx_runtime30 = require("react/jsx-runtime");
var assetActionsVariants = (0, import_class_variance_authority.cva)("relative inline-flex items-center", {
  variants: {
    variant: {
      default: "",
      compact: "text-sm",
      minimal: "text-xs"
    },
    size: {
      sm: "h-8",
      md: "h-10",
      lg: "h-12"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
});
var AssetActions = (0, import_react24.forwardRef)(
  ({
    className,
    actions,
    isOpen: controlledIsOpen,
    onToggle,
    trigger,
    placement = "bottom",
    align = "end",
    variant,
    size,
    ...props
  }, ref) => {
    const [internalIsOpen, setInternalIsOpen] = (0, import_react24.useState)(false);
    const isOpen = controlledIsOpen ?? internalIsOpen;
    const handleToggle = () => {
      const newIsOpen = !isOpen;
      setInternalIsOpen(newIsOpen);
      onToggle?.(newIsOpen);
    };
    const handleActionClick = (action) => {
      if (!action.isDisabled) {
        action.onClick();
        setInternalIsOpen(false);
        onToggle?.(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setInternalIsOpen(false);
        onToggle?.(false);
      }
    };
    const getPlacementClasses = () => {
      const baseClasses = "absolute z-50 min-w-48";
      switch (placement) {
        case "top":
          return `${baseClasses} bottom-full mb-2`;
        case "bottom":
          return `${baseClasses} top-full mt-2`;
        case "left":
          return `${baseClasses} right-full mr-2`;
        case "right":
          return `${baseClasses} left-full ml-2`;
        default:
          return `${baseClasses} top-full mt-2`;
      }
    };
    const getAlignClasses = () => {
      switch (align) {
        case "start":
          return "left-0";
        case "center":
          return "left-1/2 -translate-x-1/2";
        case "end":
          return "right-0";
        default:
          return "right-0";
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(
      "div",
      {
        ref,
        className: cn(assetActionsVariants({ variant, size }), className),
        onKeyDown: handleKeyDown,
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
            "button",
            {
              type: "button",
              onClick: handleToggle,
              className: "flex items-center justify-center w-full h-full rounded-md bg-bg-elevated border border-border-subtle hover:bg-bg-hover focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-colors",
              "aria-label": "Asset actions",
              "aria-expanded": isOpen,
              "aria-haspopup": "true",
              children: trigger || /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(import_lucide_react.MoreVertical, { className: "w-4 h-4 text-fg-muted" })
            }
          ),
          isOpen && /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
            "div",
            {
              className: cn(
                getPlacementClasses(),
                getAlignClasses(),
                "bg-bg-elevated border border-border-subtle rounded-lg shadow-lg py-1"
              ),
              role: "menu",
              "aria-orientation": "vertical",
              children: actions.map((action, index) => {
                const Icon2 = action.icon;
                const isDisabled = action.isDisabled;
                return /* @__PURE__ */ (0, import_jsx_runtime30.jsxs)(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleActionClick(action),
                    disabled: isDisabled,
                    className: cn(
                      "w-full flex items-center gap-3 px-3 py-2 text-sm text-left transition-colors",
                      "hover:bg-bg-hover focus:bg-bg-hover focus:outline-none",
                      isDisabled && "opacity-50 cursor-not-allowed",
                      action.isDestructive && "text-semantic-danger hover:text-semantic-danger"
                    ),
                    role: "menuitem",
                    "aria-disabled": isDisabled,
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(Icon2, { className: "w-4 h-4 flex-shrink-0" }),
                      /* @__PURE__ */ (0, import_jsx_runtime30.jsx)("span", { className: "flex-1", children: action.label })
                    ]
                  },
                  `action-${action.type}-${index}`
                );
              })
            }
          ),
          isOpen && /* @__PURE__ */ (0, import_jsx_runtime30.jsx)(
            "div",
            {
              className: "fixed inset-0 z-40",
              onClick: () => {
                setInternalIsOpen(false);
                onToggle?.(false);
              },
              onKeyDown: (e) => {
                if (e.key === "Escape") {
                  setInternalIsOpen(false);
                  onToggle?.(false);
                }
              },
              "aria-hidden": "true"
            }
          )
        ]
      }
    );
  }
);
AssetActions.displayName = "AssetActions";

// src/asset/AssetPreview.tsx
var import_react25 = require("react");
var import_jsx_runtime31 = require("react/jsx-runtime");
var assetPreviewVariants = (0, import_class_variance_authority.cva)(
  "relative flex flex-col rounded-lg border bg-bg-elevated border-border-subtle overflow-hidden",
  {
    variants: {
      variant: {
        default: "",
        compact: "p-3",
        detailed: "p-4"
      },
      size: {
        sm: "w-64 h-48",
        md: "w-80 h-60",
        lg: "w-96 h-72"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
var formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};
var formatDuration3 = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};
var AssetPreview = (0, import_react25.forwardRef)(
  ({
    className,
    asset,
    onPlay,
    onPause,
    onSeek,
    onVolumeChange,
    onMute,
    onUnmute,
    variant,
    size,
    ...props
  }, ref) => {
    const progress = asset.duration && asset.currentTime ? asset.currentTime / asset.duration * 100 : 0;
    const handlePlayPause = () => {
      if (asset.isPlaying) {
        onPause?.();
      } else {
        onPlay?.();
      }
    };
    const handleSeek = (e) => {
      if (!asset.duration || !onSeek) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      const newTime = percentage * asset.duration;
      onSeek(newTime);
    };
    const handleVolumeChange = (e) => {
      const volume = Number.parseFloat(e.target.value);
      onVolumeChange?.(volume);
    };
    const handleMuteToggle = () => {
      if (asset.isMuted) {
        onUnmute?.();
      } else {
        onMute?.();
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { ref, className: cn(assetPreviewVariants({ variant, size }), className), ...props, children: [
      /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: "relative w-full h-32 overflow-hidden", children: [
        asset.coverUrl ? /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
          "img",
          {
            src: asset.coverUrl,
            alt: `${asset.title} cover`,
            className: "w-full h-full object-cover"
          }
        ) : /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("div", { className: "w-full h-full bg-bg-muted flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("div", { className: "text-fg-muted text-4xl", children: "\u{1F3B5}" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("div", { className: "absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity", children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
          "button",
          {
            type: "button",
            onClick: handlePlayPause,
            className: "flex items-center justify-center w-12 h-12 rounded-full bg-white/90 hover:bg-white transition-colors",
            "aria-label": asset.isPlaying ? "Pause" : "Play",
            children: asset.isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_lucide_react.Pause, { className: "w-6 h-6 text-fg" }) : /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_lucide_react.Play, { className: "w-6 h-6 text-fg ml-0.5" })
          }
        ) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: "flex-1 p-4 space-y-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: "space-y-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("h3", { className: "font-medium text-fg truncate", title: asset.title, children: asset.title }),
          /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("p", { className: "text-sm text-fg-muted truncate", title: asset.artist, children: asset.artist })
        ] }),
        asset.waveform && asset.waveform.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: "space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: "flex items-center justify-between text-xs text-fg-muted", children: [
            /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { children: asset.currentTime ? formatTime(asset.currentTime) : "0:00" }),
            /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("span", { children: asset.duration ? formatDuration3(asset.duration) : "0:00" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)(
            "div",
            {
              className: "relative h-8 bg-bg-muted rounded cursor-pointer",
              onClick: handleSeek,
              onKeyDown: (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = rect.width / 2;
                  const percentage = x / rect.width;
                  const newTime = percentage * (asset.duration || 0);
                  onSeek?.(newTime);
                }
              },
              role: "progressbar",
              tabIndex: 0,
              "aria-valuenow": progress,
              "aria-valuemin": 0,
              "aria-valuemax": 100,
              "aria-label": "Seek bar",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime31.jsx)("div", { className: "flex items-center gap-0.5 h-4", children: asset.waveform.slice(0, 50).map((value, index) => /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                  "div",
                  {
                    className: "bg-fg-muted rounded-sm transition-all duration-200",
                    style: {
                      width: "2px",
                      height: `${Math.max(2, value * 16)}px`,
                      opacity: index / 50 < progress / 100 ? 1 : 0.3
                    }
                  },
                  `wave-${value}-${index}-${Date.now()}`
                )) }) }),
                /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
                  "div",
                  {
                    className: "absolute top-0 left-0 h-full bg-brand-primary transition-all duration-200",
                    style: { width: `${progress}%` }
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
            "button",
            {
              type: "button",
              onClick: handlePlayPause,
              className: "flex items-center justify-center w-8 h-8 rounded-full bg-brand-primary hover:bg-brand-primary-hover text-fg-inverse transition-colors",
              "aria-label": asset.isPlaying ? "Pause" : "Play",
              children: asset.isPlaying ? /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_lucide_react.Pause, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_lucide_react.Play, { className: "w-4 h-4 ml-0.5" })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime31.jsxs)("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
              "button",
              {
                type: "button",
                onClick: handleMuteToggle,
                className: "p-1 rounded hover:bg-bg-hover transition-colors",
                "aria-label": asset.isMuted ? "Unmute" : "Mute",
                children: asset.isMuted ? /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_lucide_react.VolumeX, { className: "w-4 h-4 text-fg-muted" }) : /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(import_lucide_react.Volume2, { className: "w-4 h-4 text-fg-muted" })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime31.jsx)(
              "input",
              {
                type: "range",
                min: "0",
                max: "1",
                step: "0.01",
                value: asset.isMuted ? 0 : asset.volume ?? 1,
                onChange: handleVolumeChange,
                className: "w-16 h-1 bg-bg-muted rounded-lg appearance-none cursor-pointer slider",
                "aria-label": "Volume"
              }
            )
          ] })
        ] })
      ] })
    ] });
  }
);
AssetPreview.displayName = "AssetPreview";

// src/pricing/PriceInput.tsx
var import_react26 = require("react");
var import_jsx_runtime32 = require("react/jsx-runtime");
var priceInputVariants = (0, import_class_variance_authority.cva)(
  "flex items-center gap-2 px-3 py-2 border rounded-md bg-bg-elevated text-fg-default placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors",
  {
    variants: {
      variant: {
        default: "border-border-subtle",
        error: "border-semantic-danger focus:ring-semantic-danger/20 focus:border-semantic-danger",
        success: "border-semantic-success focus:ring-semantic-success/20 focus:border-semantic-success"
      },
      size: {
        sm: "text-sm px-2 py-1",
        md: "text-base px-3 py-2",
        lg: "text-lg px-4 py-3"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
var PriceInput = (0, import_react26.forwardRef)(
  ({
    className,
    value,
    currency = "PYUSD",
    locale = "en-US",
    onChange,
    onCurrencyChange,
    showCurrency = true,
    allowNegative = false,
    precision = 2,
    variant,
    size,
    ...props
  }, ref) => {
    const [displayValue, setDisplayValue] = (0, import_react26.useState)(
      value !== void 0 && value !== null ? value.toString() : ""
    );
    const handleInputChange = (e) => {
      const inputValue = e.target.value;
      setDisplayValue(inputValue);
      const numericValue = Number.parseFloat(inputValue);
      if (Number.isNaN(numericValue)) {
        onChange?.(null);
        return;
      }
      if (!allowNegative && numericValue < 0) {
        return;
      }
      const roundedValue = Math.round(numericValue * 10 ** precision) / 10 ** precision;
      onChange?.(roundedValue);
    };
    const formatCurrency = (amount, currencyCode) => {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits: precision,
        maximumFractionDigits: precision
      }).format(amount);
    };
    return /* @__PURE__ */ (0, import_jsx_runtime32.jsxs)("div", { className: cn(priceInputVariants({ variant, size }), className), children: [
      /* @__PURE__ */ (0, import_jsx_runtime32.jsx)(
        "input",
        {
          ref,
          type: "number",
          value: displayValue,
          onChange: handleInputChange,
          step: 1 / 10 ** precision,
          min: allowNegative ? void 0 : 0,
          placeholder: "0.00",
          className: "flex-1 bg-transparent border-none outline-none text-fg-default placeholder:text-fg-muted",
          ...props
        }
      ),
      showCurrency && /* @__PURE__ */ (0, import_jsx_runtime32.jsx)("span", { className: "text-sm text-fg-muted font-medium uppercase tracking-wide", children: currency })
    ] });
  }
);
PriceInput.displayName = "PriceInput";

// src/pricing/CurrencySelector.tsx
var import_react27 = require("react");
var import_jsx_runtime33 = require("react/jsx-runtime");
var currencySelectorVariants = (0, import_class_variance_authority.cva)(
  "relative inline-flex items-center justify-between gap-2 px-3 py-2 border rounded-md bg-bg-elevated text-fg-default cursor-pointer hover:bg-bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary",
  {
    variants: {
      variant: {
        default: "border-border-subtle",
        error: "border-semantic-danger focus:ring-semantic-danger/20 focus:border-semantic-danger",
        success: "border-semantic-success focus:ring-semantic-success/20 focus:border-semantic-success"
      },
      size: {
        sm: "text-sm px-2 py-1",
        md: "text-base px-3 py-2",
        lg: "text-lg px-4 py-3"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);
var defaultCurrencies = [
  { code: "PYUSD", name: "PayPal USD", symbol: "$", flag: "\u{1F1FA}\u{1F1F8}" },
  { code: "USD", name: "US Dollar", symbol: "$", flag: "\u{1F1FA}\u{1F1F8}" },
  { code: "EUR", name: "Euro", symbol: "\u20AC", flag: "\u{1F1EA}\u{1F1FA}" },
  { code: "GBP", name: "British Pound", symbol: "\xA3", flag: "\u{1F1EC}\u{1F1E7}" },
  { code: "JPY", name: "Japanese Yen", symbol: "\xA5", flag: "\u{1F1EF}\u{1F1F5}" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "\u{1F1E8}\u{1F1E6}" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "\u{1F1E6}\u{1F1FA}" }
];
var CurrencySelector = (0, import_react27.forwardRef)(
  ({
    className,
    value = "PYUSD",
    onChange,
    options = defaultCurrencies,
    showFlag = true,
    showName = false,
    disabled = false,
    variant,
    size,
    ...props
  }, ref) => {
    const [isOpen, setIsOpen] = (0, import_react27.useState)(false);
    const [searchTerm, setSearchTerm] = (0, import_react27.useState)("");
    const selectedCurrency = options.find((option) => option.code === value) || options[0];
    const filteredOptions = options.filter(
      (option) => option.name.toLowerCase().includes(searchTerm.toLowerCase()) || option.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleSelect = (currency) => {
      onChange?.(currency.code);
      setIsOpen(false);
      setSearchTerm("");
    };
    const handleKeyDown = (e) => {
      if (disabled) return;
      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault();
          setIsOpen(!isOpen);
          break;
        case "Escape":
          setIsOpen(false);
          setSearchTerm("");
          break;
        case "ArrowDown":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          if (isOpen) {
            setIsOpen(false);
          }
          break;
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { ref, className: cn("relative", className), ...props, children: [
      /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(
        "div",
        {
          className: cn(
            currencySelectorVariants({ variant, size }),
            disabled && "opacity-50 cursor-not-allowed"
          ),
          onClick: () => !disabled && setIsOpen(!isOpen),
          onKeyDown: handleKeyDown,
          tabIndex: disabled ? -1 : 0,
          role: "combobox",
          "aria-expanded": isOpen,
          "aria-haspopup": "listbox",
          "aria-controls": "currency-options",
          "aria-label": "Select currency",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { className: "flex items-center gap-2", children: [
              showFlag && selectedCurrency.flag && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("span", { className: "text-lg", role: "img", "aria-label": selectedCurrency.name, children: selectedCurrency.flag }),
              /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("span", { className: "font-medium", children: selectedCurrency.code }),
              showName && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("span", { className: "text-sm text-fg-muted", children: selectedCurrency.name })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
              import_lucide_react.ChevronDown,
              {
                className: cn("h-4 w-4 text-fg-muted transition-transform", isOpen && "rotate-180")
              }
            )
          ]
        }
      ),
      isOpen && /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(
        "div",
        {
          id: "currency-options",
          className: "absolute top-full left-0 right-0 z-50 mt-1 bg-bg-elevated border border-border-subtle rounded-md shadow-lg",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { className: "p-2 border-b border-border-subtle", children: /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
              "input",
              {
                type: "text",
                placeholder: "Search currencies...",
                value: searchTerm,
                onChange: (e) => setSearchTerm(e.target.value),
                className: "w-full px-2 py-1 text-sm bg-bg-default border border-border-subtle rounded text-fg-default placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { className: "max-h-48 overflow-y-auto", children: [
              filteredOptions.map((option) => /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)(
                "button",
                {
                  type: "button",
                  onClick: () => handleSelect(option),
                  className: cn(
                    "w-full flex items-center gap-2 px-3 py-2 text-left text-fg-default hover:bg-bg-muted transition-colors",
                    option.code === value && "bg-brand-primary/10 text-brand-primary"
                  ),
                  role: "option",
                  "aria-selected": option.code === value,
                  children: [
                    showFlag && option.flag && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("span", { className: "text-lg", role: "img", "aria-label": option.name, children: option.flag }),
                    /* @__PURE__ */ (0, import_jsx_runtime33.jsxs)("div", { className: "flex flex-col", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("span", { className: "font-medium", children: option.code }),
                      showName && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("span", { className: "text-xs text-fg-muted", children: option.name })
                    ] })
                  ]
                },
                option.code
              )),
              filteredOptions.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)("div", { className: "px-3 py-2 text-sm text-fg-muted text-center", children: "No currencies found" })
            ] })
          ]
        }
      ),
      isOpen && /* @__PURE__ */ (0, import_jsx_runtime33.jsx)(
        "div",
        {
          className: "fixed inset-0 z-40",
          onClick: () => {
            setIsOpen(false);
            setSearchTerm("");
          },
          onKeyDown: (e) => {
            if (e.key === "Escape") {
              setIsOpen(false);
              setSearchTerm("");
            }
          },
          "aria-hidden": "true"
        }
      )
    ] });
  }
);
CurrencySelector.displayName = "CurrencySelector";

// src/pricing/PriceValidator.tsx
var import_react28 = require("react");
var import_jsx_runtime34 = require("react/jsx-runtime");
var priceValidatorVariants = (0, import_class_variance_authority.cva)("flex items-center gap-2", {
  variants: {
    variant: {
      default: "text-fg-default",
      error: "text-semantic-danger",
      success: "text-semantic-success",
      warning: "text-semantic-warning"
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
});
var PriceValidator = (0, import_react28.forwardRef)(
  ({
    className,
    value,
    rules,
    showIcon = true,
    showMessage = true,
    inline = false,
    variant,
    size,
    ...props
  }, ref) => {
    const [validationState, setValidationState] = (0, import_react28.useState)({
      isValid: true,
      message: "",
      variant: "default"
    });
    (0, import_react28.useEffect)(() => {
      if (value === null || value === void 0) {
        setValidationState({
          isValid: true,
          message: "",
          variant: "default"
        });
        return;
      }
      for (const rule of rules) {
        let isValid = true;
        switch (rule.type) {
          case "min":
            isValid = value >= (rule.value || 0);
            break;
          case "max":
            isValid = value <= (rule.value || Number.POSITIVE_INFINITY);
            break;
          case "step": {
            const step = rule.value || 1;
            isValid = Math.abs(value % step) < 1e-4 || Math.abs(value % step - step) < 1e-4;
            break;
          }
          case "custom":
            isValid = rule.validator ? rule.validator(value) : true;
            break;
        }
        if (!isValid) {
          setValidationState({
            isValid: false,
            message: rule.message,
            variant: "error"
          });
          return;
        }
      }
      setValidationState({
        isValid: true,
        message: "Price is valid",
        variant: "success"
      });
    }, [value, rules]);
    const getIcon = () => {
      if (!showIcon) return null;
      switch (validationState.variant) {
        case "error":
          return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(import_lucide_react.XCircle, { className: "h-4 w-4" });
        case "success":
          return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(import_lucide_react.CheckCircle, { className: "h-4 w-4" });
        case "warning":
          return /* @__PURE__ */ (0, import_jsx_runtime34.jsx)(import_lucide_react.AlertCircle, { className: "h-4 w-4" });
        default:
          return null;
      }
    };
    if (!showMessage && !showIcon) {
      return null;
    }
    return /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)(
      "div",
      {
        ref,
        className: cn(
          priceValidatorVariants({ variant: validationState.variant, size }),
          inline ? "flex-row" : "flex-col items-start",
          className
        ),
        ...props,
        children: [
          showIcon && /* @__PURE__ */ (0, import_jsx_runtime34.jsxs)("div", { className: "flex items-center gap-2", children: [
            getIcon(),
            showMessage && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("span", { className: "text-sm", children: validationState.message })
          ] }),
          showMessage && !showIcon && /* @__PURE__ */ (0, import_jsx_runtime34.jsx)("span", { className: "text-sm", children: validationState.message })
        ]
      }
    );
  }
);
PriceValidator.displayName = "PriceValidator";

// src/pricing/PriceRange.tsx
var import_react29 = require("react");
var import_jsx_runtime35 = require("react/jsx-runtime");
var priceRangeVariants = (0, import_class_variance_authority.cva)("flex flex-col gap-4", {
  variants: {
    variant: {
      default: "text-fg-default",
      muted: "text-fg-muted"
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md"
  }
});
var PriceRange = (0, import_react29.forwardRef)(
  ({
    className,
    min = 0,
    max = 1e3,
    value = [min, max],
    onChange,
    step = 1,
    currency = "PYUSD",
    locale = "en-US",
    showLabels = true,
    showValues = true,
    disabled = false,
    variant,
    size,
    ...props
  }, ref) => {
    const [localValue, setLocalValue] = (0, import_react29.useState)(value);
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }).format(amount);
    };
    const handleMinChange = (0, import_react29.useCallback)(
      (newMin) => {
        const newValue = [Math.min(newMin, localValue[1]), localValue[1]];
        setLocalValue(newValue);
        onChange?.(newValue);
      },
      [localValue, onChange]
    );
    const handleMaxChange = (0, import_react29.useCallback)(
      (newMax) => {
        const newValue = [localValue[0], Math.max(newMax, localValue[0])];
        setLocalValue(newValue);
        onChange?.(newValue);
      },
      [localValue, onChange]
    );
    const handleRangeChange = (0, import_react29.useCallback)(
      (newMin, newMax) => {
        const newValue = [newMin, newMax];
        setLocalValue(newValue);
        onChange?.(newValue);
      },
      [onChange]
    );
    const percentage = {
      min: (localValue[0] - min) / (max - min) * 100,
      max: (localValue[1] - min) / (max - min) * 100
    };
    return /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)("div", { ref, className: cn(priceRangeVariants({ variant, size }), className), ...props, children: [
      showLabels && /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("label", { htmlFor: "price-range-slider", className: "text-sm font-medium text-fg-default", children: "Price Range" }),
        showValues && /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)("div", { className: "text-sm text-fg-muted", children: [
          formatCurrency(localValue[0]),
          " - ",
          formatCurrency(localValue[1])
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)("div", { className: "relative", children: [
        /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("div", { className: "h-2 bg-bg-muted rounded-full", children: /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
          "div",
          {
            className: "absolute h-2 bg-brand-primary rounded-full transition-all duration-200",
            style: {
              left: `${percentage.min}%`,
              width: `${percentage.max - percentage.min}%`
            }
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
          "input",
          {
            type: "range",
            min,
            max,
            step,
            value: localValue[0],
            onChange: (e) => handleMinChange(Number(e.target.value)),
            disabled,
            className: "absolute top-0 w-full h-2 opacity-0 cursor-pointer",
            style: { zIndex: localValue[0] > localValue[1] - 10 ? 1 : 2 }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
          "input",
          {
            type: "range",
            min,
            max,
            step,
            value: localValue[1],
            onChange: (e) => handleMaxChange(Number(e.target.value)),
            disabled,
            className: "absolute top-0 w-full h-2 opacity-0 cursor-pointer",
            style: { zIndex: localValue[1] < localValue[0] + 10 ? 1 : 2 }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
          "div",
          {
            className: "absolute top-1/2 w-4 h-4 bg-brand-primary border-2 border-bg-elevated rounded-full transform -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform",
            style: { left: `calc(${percentage.min}% - 8px)` }
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
          "div",
          {
            className: "absolute top-1/2 w-4 h-4 bg-brand-primary border-2 border-bg-elevated rounded-full transform -translate-y-1/2 cursor-pointer hover:scale-110 transition-transform",
            style: { left: `calc(${percentage.max}% - 8px)` }
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)("div", { className: "flex-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("label", { htmlFor: "price-range-min", className: "block text-xs text-fg-muted mb-1", children: "Min" }),
          /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
            "input",
            {
              id: "price-range-min",
              type: "number",
              min,
              max,
              step,
              value: localValue[0],
              onChange: (e) => handleMinChange(Number(e.target.value)),
              disabled,
              className: "w-full px-2 py-1 text-sm bg-bg-elevated border border-border-subtle rounded text-fg-default focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary disabled:opacity-50"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime35.jsxs)("div", { className: "flex-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime35.jsx)("label", { htmlFor: "price-range-max", className: "block text-xs text-fg-muted mb-1", children: "Max" }),
          /* @__PURE__ */ (0, import_jsx_runtime35.jsx)(
            "input",
            {
              id: "price-range-max",
              type: "number",
              min,
              max,
              step,
              value: localValue[1],
              onChange: (e) => handleMaxChange(Number(e.target.value)),
              disabled,
              className: "w-full px-2 py-1 text-sm bg-bg-elevated border border-border-subtle rounded text-fg-default focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary disabled:opacity-50"
            }
          )
        ] })
      ] })
    ] });
  }
);
PriceRange.displayName = "PriceRange";

// src/admin/FeatureFlag.tsx
var import_class_variance_authority11 = require("class-variance-authority");
var import_react30 = __toESM(require("react"), 1);
var import_jsx_runtime36 = require("react/jsx-runtime");
var featureFlagVariants = (0, import_class_variance_authority11.cva)(
  "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
  {
    variants: {
      status: {
        enabled: "bg-success-100 text-success-800 border border-success-200",
        disabled: "bg-neutral-100 text-neutral-600 border border-neutral-200",
        experimental: "bg-warning-100 text-warning-800 border border-warning-200",
        deprecated: "bg-error-100 text-error-800 border border-error-200"
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base"
      }
    },
    defaultVariants: {
      status: "disabled",
      size: "md"
    }
  }
);
var FeatureFlag = import_react30.default.forwardRef(
  ({
    name,
    description,
    enabled = false,
    experimental = false,
    deprecated = false,
    onToggle,
    showToggle = false,
    status,
    size,
    className,
    ...props
  }, ref) => {
    const actualStatus = status || (() => {
      if (deprecated) return "deprecated";
      if (experimental) return "experimental";
      return enabled ? "enabled" : "disabled";
    })();
    const handleToggle = () => {
      if (onToggle && !deprecated) {
        onToggle(!enabled);
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)(
      "div",
      {
        ref,
        className: cn(
          "flex items-center justify-between gap-3 p-4 rounded-lg border bg-bg-elevated",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("span", { className: "font-medium text-fg-default truncate", children: name }),
              /* @__PURE__ */ (0, import_jsx_runtime36.jsxs)("span", { className: cn(featureFlagVariants({ status: actualStatus, size })), children: [
                actualStatus === "enabled" && "Enabled",
                actualStatus === "disabled" && "Disabled",
                actualStatus === "experimental" && "Experimental",
                actualStatus === "deprecated" && "Deprecated"
              ] })
            ] }),
            description && /* @__PURE__ */ (0, import_jsx_runtime36.jsx)("p", { className: "text-sm text-fg-muted line-clamp-2", children: description })
          ] }),
          showToggle && !deprecated && /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
            "button",
            {
              type: "button",
              onClick: handleToggle,
              className: cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                enabled ? "bg-primary-600" : "bg-neutral-300"
              ),
              role: "switch",
              "aria-checked": enabled,
              "aria-label": `Toggle ${name} feature flag`,
              children: /* @__PURE__ */ (0, import_jsx_runtime36.jsx)(
                "span",
                {
                  className: cn(
                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                    enabled ? "translate-x-6" : "translate-x-1"
                  )
                }
              )
            }
          )
        ]
      }
    );
  }
);
FeatureFlag.displayName = "FeatureFlag";

// src/admin/AuditLog.tsx
var import_class_variance_authority12 = require("class-variance-authority");
var import_react31 = __toESM(require("react"), 1);
var import_jsx_runtime37 = require("react/jsx-runtime");
var auditLogVariants = (0, import_class_variance_authority12.cva)(
  "inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium",
  {
    variants: {
      action: {
        create: "bg-success-100 text-success-700 border border-success-200",
        update: "bg-primary-100 text-primary-700 border border-primary-200",
        delete: "bg-error-100 text-error-700 border border-error-200",
        login: "bg-info-100 text-info-700 border border-info-200",
        logout: "bg-neutral-100 text-neutral-700 border border-neutral-200",
        error: "bg-warning-100 text-warning-700 border border-warning-200"
      },
      size: {
        sm: "px-1.5 py-0.5 text-xs",
        md: "px-2 py-1 text-xs",
        lg: "px-3 py-1.5 text-sm"
      }
    },
    defaultVariants: {
      action: "update",
      size: "md"
    }
  }
);
var AuditLog = import_react31.default.forwardRef(
  ({
    entries,
    loading = false,
    emptyMessage = "No audit entries found",
    showUserInfo = true,
    showTechnicalDetails = false,
    onEntryClick,
    maxHeight = "400px",
    className,
    ...props
  }, ref) => {
    const formatTimestamp = (timestamp) => {
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }).format(timestamp);
    };
    const getActionIcon = (action) => {
      switch (action) {
        case "create":
          return "\u2795";
        case "update":
          return "\u270F\uFE0F";
        case "delete":
          return "\u{1F5D1}\uFE0F";
        case "login":
          return "\u{1F510}";
        case "logout":
          return "\u{1F6AA}";
        case "error":
          return "\u26A0\uFE0F";
        default:
          return "\u{1F4DD}";
      }
    };
    if (loading) {
      return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
        "div",
        {
          ref,
          className: cn("flex items-center justify-center p-8 text-fg-muted", className),
          ...props,
          children: /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("div", { className: "animate-spin h-4 w-4 border-2 border-primary-600 border-t-transparent rounded-full" }),
            /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("span", { children: "Loading audit log..." })
          ] })
        }
      );
    }
    if (entries.length === 0) {
      return /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
        "div",
        {
          ref,
          className: cn("flex items-center justify-center p-8 text-fg-muted", className),
          ...props,
          children: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("span", { children: emptyMessage })
        }
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)(
      "div",
      {
        ref,
        className: cn(
          "border border-border-default rounded-lg bg-bg-elevated overflow-hidden",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: "px-4 py-3 border-b border-border-default bg-bg-subtle", children: [
            /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("h3", { className: "text-sm font-medium text-fg-default", children: "Audit Log" }),
            /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("p", { className: "text-xs text-fg-muted", children: [
              entries.length,
              " ",
              entries.length === 1 ? "entry" : "entries"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("div", { className: "overflow-y-auto", style: { maxHeight }, children: entries.map((entry) => /* @__PURE__ */ (0, import_jsx_runtime37.jsx)(
            "div",
            {
              className: cn(
                "px-4 py-3 border-b border-border-subtle last:border-b-0 hover:bg-bg-subtle transition-colors",
                onEntryClick && "cursor-pointer"
              ),
              onClick: () => onEntryClick?.(entry),
              onKeyDown: (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onEntryClick?.(entry);
                }
              },
              tabIndex: onEntryClick ? 0 : void 0,
              role: onEntryClick ? "button" : void 0,
              "aria-label": onEntryClick ? `View details for ${entry.action} on ${entry.resource}` : void 0,
              children: /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("div", { className: "flex items-start justify-between gap-3", children: /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: "flex items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("span", { className: "text-sm", children: getActionIcon(entry.action) }),
                  /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("span", { className: cn(auditLogVariants({ action: entry.action })), children: entry.action.toUpperCase() }),
                  /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("span", { className: "text-sm font-medium text-fg-default", children: entry.resource })
                ] }),
                showUserInfo && /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: "flex items-center gap-2 text-xs text-fg-muted mb-1", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("span", { children: [
                    "by ",
                    entry.userName
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("span", { children: "\u2022" }),
                  /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("span", { children: formatTimestamp(entry.timestamp) })
                ] }),
                entry.details && /* @__PURE__ */ (0, import_jsx_runtime37.jsx)("p", { className: "text-sm text-fg-default line-clamp-2", children: entry.details }),
                showTechnicalDetails && (entry.ipAddress || entry.userAgent) && /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: "mt-2 text-xs text-fg-muted", children: [
                  entry.ipAddress && /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { children: [
                    "IP: ",
                    entry.ipAddress
                  ] }),
                  entry.userAgent && /* @__PURE__ */ (0, import_jsx_runtime37.jsxs)("div", { className: "truncate", children: [
                    "UA: ",
                    entry.userAgent
                  ] })
                ] })
              ] }) })
            },
            entry.id
          )) })
        ]
      }
    );
  }
);
AuditLog.displayName = "AuditLog";

// src/admin/HealthStatus.tsx
var import_class_variance_authority13 = require("class-variance-authority");
var import_react32 = __toESM(require("react"), 1);
var import_jsx_runtime38 = require("react/jsx-runtime");
var healthStatusVariants = (0, import_class_variance_authority13.cva)(
  "inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium",
  {
    variants: {
      status: {
        healthy: "bg-success-100 text-success-700 border border-success-200",
        warning: "bg-warning-100 text-warning-700 border border-warning-200",
        critical: "bg-error-100 text-error-700 border border-error-200",
        unknown: "bg-neutral-100 text-neutral-700 border border-neutral-200"
      },
      size: {
        sm: "px-1.5 py-0.5 text-xs",
        md: "px-2 py-1 text-xs",
        lg: "px-3 py-1.5 text-sm"
      }
    },
    defaultVariants: {
      status: "unknown",
      size: "md"
    }
  }
);
var HealthStatus = import_react32.default.forwardRef(
  ({
    checks,
    overallStatus,
    lastUpdated,
    autoRefresh = false,
    refreshInterval = 3e4,
    onRefresh,
    showResponseTime = true,
    showLastChecked = true,
    compact = false,
    className,
    ...props
  }, ref) => {
    const [isRefreshing, setIsRefreshing] = import_react32.default.useState(false);
    import_react32.default.useEffect(() => {
      if (!autoRefresh || !onRefresh) return;
      const interval = setInterval(async () => {
        setIsRefreshing(true);
        await onRefresh();
        setIsRefreshing(false);
      }, refreshInterval);
      return () => clearInterval(interval);
    }, [autoRefresh, onRefresh, refreshInterval]);
    const getStatusIcon2 = (status) => {
      switch (status) {
        case "healthy":
          return "\u2705";
        case "warning":
          return "\u26A0\uFE0F";
        case "critical":
          return "\u274C";
        case "unknown":
          return "\u2753";
        default:
          return "\u2753";
      }
    };
    const getOverallStatusIcon = (status) => {
      switch (status) {
        case "healthy":
          return "\u{1F7E2}";
        case "warning":
          return "\u{1F7E1}";
        case "critical":
          return "\u{1F534}";
        case "unknown":
          return "\u26AA";
        default:
          return "\u26AA";
      }
    };
    const formatResponseTime = (ms) => {
      if (!ms) return "N/A";
      return ms < 1e3 ? `${ms}ms` : `${(ms / 1e3).toFixed(1)}s`;
    };
    const formatLastChecked = (date) => {
      const now = /* @__PURE__ */ new Date();
      const diff = now.getTime() - date.getTime();
      const seconds = Math.floor(diff / 1e3);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      if (seconds < 60) return `${seconds}s ago`;
      if (minutes < 60) return `${minutes}m ago`;
      if (hours < 24) return `${hours}h ago`;
      return date.toLocaleDateString();
    };
    const handleRefresh = async () => {
      if (!onRefresh || isRefreshing) return;
      setIsRefreshing(true);
      await onRefresh();
      setIsRefreshing(false);
    };
    const healthyCount = checks.filter((c) => c.status === "healthy").length;
    const warningCount = checks.filter((c) => c.status === "warning").length;
    const criticalCount = checks.filter((c) => c.status === "critical").length;
    const unknownCount = checks.filter((c) => c.status === "unknown").length;
    return /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)(
      "div",
      {
        ref,
        className: cn("border border-border-default rounded-lg bg-bg-elevated", className),
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { className: "px-4 py-3 border-b border-border-default bg-bg-subtle", children: [
            /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("span", { className: "text-lg", children: getOverallStatusIcon(overallStatus) }),
                /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("h3", { className: "text-sm font-medium text-fg-default", children: "System Health" }),
                overallStatus && /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("span", { className: cn(healthStatusVariants({ status: overallStatus })), children: overallStatus.toUpperCase() })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { className: "flex items-center gap-2", children: [
                showLastChecked && lastUpdated && /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("span", { className: "text-xs text-fg-muted", children: [
                  "Updated ",
                  formatLastChecked(lastUpdated)
                ] }),
                onRefresh && /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
                  "button",
                  {
                    type: "button",
                    onClick: handleRefresh,
                    disabled: isRefreshing,
                    className: "p-1 text-fg-muted hover:text-fg-default transition-colors disabled:opacity-50",
                    "aria-label": "Refresh health status",
                    children: /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("div", { className: cn("h-4 w-4", isRefreshing && "animate-spin"), children: "\u{1F504}" })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { className: "flex items-center gap-4 mt-2 text-xs text-fg-muted", children: [
              /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("span", { children: [
                "\u2705 ",
                healthyCount,
                " healthy"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("span", { children: [
                "\u26A0\uFE0F ",
                warningCount,
                " warning"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("span", { children: [
                "\u274C ",
                criticalCount,
                " critical"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("span", { children: [
                "\u2753 ",
                unknownCount,
                " unknown"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("div", { className: cn(compact ? "divide-y divide-border-subtle" : "p-4 space-y-3"), children: checks.map((check) => /* @__PURE__ */ (0, import_jsx_runtime38.jsx)(
            "div",
            {
              className: cn(
                "flex items-start justify-between gap-3",
                !compact && "p-3 rounded-lg border border-border-subtle bg-bg-subtle"
              ),
              children: /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { className: "flex items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("span", { className: "text-sm", children: getStatusIcon2(check.status) }),
                  /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("span", { className: "text-sm font-medium text-fg-default", children: check.name }),
                  /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("span", { className: cn(healthStatusVariants({ status: check.status })), children: check.status.toUpperCase() })
                ] }),
                check.message && /* @__PURE__ */ (0, import_jsx_runtime38.jsx)("p", { className: "text-sm text-fg-muted line-clamp-2", children: check.message }),
                /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("div", { className: "flex items-center gap-4 mt-2 text-xs text-fg-muted", children: [
                  showResponseTime && check.responseTime && /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("span", { children: [
                    "Response: ",
                    formatResponseTime(check.responseTime)
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime38.jsxs)("span", { children: [
                    "Checked: ",
                    formatLastChecked(check.lastChecked)
                  ] })
                ] })
              ] })
            },
            check.id
          )) })
        ]
      }
    );
  }
);
HealthStatus.displayName = "HealthStatus";

// src/user/UserRole.tsx
var import_class_variance_authority14 = require("class-variance-authority");
var import_react33 = __toESM(require("react"), 1);
var import_jsx_runtime39 = require("react/jsx-runtime");
var userRoleVariants = (0, import_class_variance_authority14.cva)(
  "inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium",
  {
    variants: {
      role: {
        admin: "bg-error-100 text-error-700 border border-error-200",
        moderator: "bg-warning-100 text-warning-700 border border-warning-200",
        user: "bg-primary-100 text-primary-700 border border-primary-200",
        guest: "bg-neutral-100 text-neutral-700 border border-neutral-200",
        banned: "bg-neutral-200 text-neutral-500 border border-neutral-300"
      },
      size: {
        sm: "px-1.5 py-0.5 text-xs",
        md: "px-2 py-1 text-xs",
        lg: "px-3 py-1.5 text-sm"
      }
    },
    defaultVariants: {
      role: "user",
      size: "md"
    }
  }
);
var UserRole = import_react33.default.forwardRef(
  ({
    role,
    displayName,
    description,
    editable = false,
    onChange,
    showDescription = false,
    showIcon = true,
    size,
    className,
    ...props
  }, ref) => {
    const getRoleIcon = (roleType) => {
      switch (roleType) {
        case "admin":
          return "\u{1F451}";
        case "moderator":
          return "\u{1F6E1}\uFE0F";
        case "user":
          return "\u{1F464}";
        case "guest":
          return "\u{1F465}";
        case "banned":
          return "\u{1F6AB}";
        default:
          return "\u{1F464}";
      }
    };
    const getRoleDisplayName = (roleType) => {
      if (displayName) return displayName;
      switch (roleType) {
        case "admin":
          return "Administrator";
        case "moderator":
          return "Moderator";
        case "user":
          return "User";
        case "guest":
          return "Guest";
        case "banned":
          return "Banned";
        default:
          return "User";
      }
    };
    const getRoleDescription = (roleType) => {
      if (description) return description;
      switch (roleType) {
        case "admin":
          return "Full system access and administrative privileges";
        case "moderator":
          return "Content moderation and user management capabilities";
        case "user":
          return "Standard user with basic platform access";
        case "guest":
          return "Limited access for unregistered users";
        case "banned":
          return "Account suspended or banned from platform";
        default:
          return "Standard user access";
      }
    };
    const handleClick = () => {
      if (editable && onChange) {
        const roles = ["admin", "moderator", "user", "guest", "banned"];
        const currentIndex = roles.indexOf(role);
        const nextIndex = (currentIndex + 1) % roles.length;
        onChange(roles[nextIndex]);
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)(
      "div",
      {
        ref,
        className: cn(
          "flex items-center gap-2 p-3 rounded-lg border bg-bg-elevated",
          editable && "cursor-pointer hover:bg-bg-subtle transition-colors",
          className
        ),
        onClick: handleClick,
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)("div", { className: "flex items-center gap-2", children: [
            showIcon && /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("span", { className: "text-sm", "aria-hidden": "true", children: getRoleIcon(role) }),
            /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("span", { className: cn(userRoleVariants({ role, size })), children: getRoleDisplayName(role) })
          ] }),
          showDescription && /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("p", { className: "text-sm text-fg-muted line-clamp-2", children: getRoleDescription(role) }) }),
          editable && /* @__PURE__ */ (0, import_jsx_runtime39.jsxs)("div", { className: "flex items-center gap-1 text-xs text-fg-muted", children: [
            /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("span", { children: "Click to change" }),
            /* @__PURE__ */ (0, import_jsx_runtime39.jsx)("span", { children: "\u21BB" })
          ] })
        ]
      }
    );
  }
);
UserRole.displayName = "UserRole";

// src/user/PermissionMatrix.tsx
var import_class_variance_authority15 = require("class-variance-authority");
var import_react34 = __toESM(require("react"), 1);
var import_jsx_runtime40 = require("react/jsx-runtime");
var permissionVariants = (0, import_class_variance_authority15.cva)(
  "inline-flex items-center justify-center w-6 h-6 rounded text-xs font-medium transition-colors",
  {
    variants: {
      permission: {
        granted: "bg-success-100 text-success-700 border border-success-200",
        denied: "bg-error-100 text-error-700 border border-error-200",
        inherited: "bg-primary-100 text-primary-700 border border-primary-200",
        conditional: "bg-warning-100 text-warning-700 border border-warning-200",
        unknown: "bg-neutral-100 text-neutral-500 border border-neutral-200"
      },
      size: {
        sm: "w-5 h-5 text-xs",
        md: "w-6 h-6 text-xs",
        lg: "w-8 h-8 text-sm"
      }
    },
    defaultVariants: {
      permission: "unknown",
      size: "md"
    }
  }
);
var PermissionMatrix = import_react34.default.forwardRef(
  ({
    permissions,
    rolePermissions,
    roles,
    selectedRole,
    onPermissionChange,
    showDescriptions = true,
    showCategories = true,
    compact = false,
    editable = false,
    size,
    className,
    ...props
  }, ref) => {
    const getPermissionStatus = (roleId, permissionId) => {
      const rolePermission = rolePermissions.find(
        (rp) => rp.roleId === roleId && rp.permissionId === permissionId
      );
      return rolePermission?.status || "unknown";
    };
    const getPermissionIcon = (status) => {
      switch (status) {
        case "granted":
          return "\u2713";
        case "denied":
          return "\u2717";
        case "inherited":
          return "\u2197";
        case "conditional":
          return "?";
        case "unknown":
          return "?";
        default:
          return "?";
      }
    };
    const handlePermissionClick = (roleId, permissionId) => {
      if (!editable || !onPermissionChange) return;
      const currentStatus = getPermissionStatus(roleId, permissionId);
      const statuses = [
        "granted",
        "denied",
        "inherited",
        "conditional",
        "unknown"
      ];
      const currentIndex = statuses.indexOf(currentStatus);
      const nextIndex = (currentIndex + 1) % statuses.length;
      onPermissionChange(roleId, permissionId, statuses[nextIndex]);
    };
    const groupedPermissions = permissions.reduce(
      (acc, permission) => {
        if (!acc[permission.category]) {
          acc[permission.category] = [];
        }
        acc[permission.category].push(permission);
        return acc;
      },
      {}
    );
    return /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(
      "div",
      {
        ref,
        className: cn(
          "border border-border-default rounded-lg bg-bg-elevated overflow-hidden",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("div", { className: "px-4 py-3 border-b border-border-default bg-bg-subtle", children: [
            /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("h3", { className: "text-sm font-medium text-fg-default", children: "Permission Matrix" }),
            /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("p", { className: "text-xs text-fg-muted", children: [
              roles.length,
              " roles \xD7 ",
              permissions.length,
              " permissions"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("div", { className: "overflow-x-auto", children: /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("table", { className: "w-full", children: [
            /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("tr", { className: "border-b border-border-subtle", children: [
              /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("th", { className: "text-left p-3 text-xs font-medium text-fg-muted", children: "Permission" }),
              roles.map((role) => /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
                "th",
                {
                  className: cn(
                    "text-center p-3 text-xs font-medium",
                    selectedRole === role.id && "bg-primary-50 text-primary-700"
                  ),
                  children: role.name
                },
                role.id
              ))
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("tbody", { children: Object.entries(groupedPermissions).map(([category, categoryPermissions]) => /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(import_react34.default.Fragment, { children: [
              showCategories && /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("tr", { className: "bg-bg-subtle", children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
                "td",
                {
                  colSpan: roles.length + 1,
                  className: "px-3 py-2 text-xs font-medium text-fg-muted uppercase tracking-wide",
                  children: category
                }
              ) }),
              categoryPermissions.map((permission) => /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)(
                "tr",
                {
                  className: "border-b border-border-subtle last:border-b-0 hover:bg-bg-subtle",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("td", { className: "p-3", children: /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("div", { className: "flex flex-col gap-1", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("span", { className: "text-sm font-medium text-fg-default", children: permission.name }),
                      showDescriptions && /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("span", { className: "text-xs text-fg-muted line-clamp-2", children: permission.description }),
                      /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("span", { className: "text-xs text-fg-muted", children: [
                        "Level: ",
                        permission.level
                      ] })
                    ] }) }),
                    roles.map((role) => {
                      const status = getPermissionStatus(role.id, permission.id);
                      return /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("td", { className: "text-center p-3", children: /* @__PURE__ */ (0, import_jsx_runtime40.jsx)(
                        "button",
                        {
                          type: "button",
                          onClick: () => handlePermissionClick(role.id, permission.id),
                          disabled: !editable,
                          className: cn(
                            permissionVariants({ permission: status, size }),
                            editable && "cursor-pointer hover:opacity-80",
                            !editable && "cursor-default"
                          ),
                          "aria-label": `${permission.name} for ${role.name}: ${status}`,
                          title: `${permission.name} for ${role.name}: ${status}`,
                          children: getPermissionIcon(status)
                        }
                      ) }, role.id);
                    })
                  ]
                },
                permission.id
              ))
            ] }, category)) })
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("div", { className: "px-4 py-3 border-t border-border-default bg-bg-subtle", children: /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("div", { className: "flex items-center gap-4 text-xs text-fg-muted", children: [
            /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("span", { className: cn(permissionVariants({ permission: "granted", size: "sm" })), children: "\u2713" }),
              /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("span", { children: "Granted" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("span", { className: cn(permissionVariants({ permission: "denied", size: "sm" })), children: "\u2717" }),
              /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("span", { children: "Denied" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("span", { className: cn(permissionVariants({ permission: "inherited", size: "sm" })), children: "\u2197" }),
              /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("span", { children: "Inherited" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("span", { className: cn(permissionVariants({ permission: "conditional", size: "sm" })), children: "?" }),
              /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("span", { children: "Conditional" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime40.jsxs)("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("span", { className: cn(permissionVariants({ permission: "unknown", size: "sm" })), children: "?" }),
              /* @__PURE__ */ (0, import_jsx_runtime40.jsx)("span", { children: "Unknown" })
            ] })
          ] }) })
        ]
      }
    );
  }
);
PermissionMatrix.displayName = "PermissionMatrix";

// src/user/UserStatus.tsx
var import_class_variance_authority16 = require("class-variance-authority");
var import_react35 = __toESM(require("react"), 1);
var import_jsx_runtime41 = require("react/jsx-runtime");
var userStatusVariants = (0, import_class_variance_authority16.cva)(
  "inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium",
  {
    variants: {
      status: {
        active: "bg-success-100 text-success-700 border border-success-200",
        inactive: "bg-neutral-100 text-neutral-600 border border-neutral-200",
        pending: "bg-warning-100 text-warning-700 border border-warning-200",
        suspended: "bg-error-100 text-error-700 border border-error-200",
        banned: "bg-error-200 text-error-800 border border-error-300",
        offline: "bg-neutral-200 text-neutral-500 border border-neutral-300"
      },
      size: {
        sm: "px-1.5 py-0.5 text-xs",
        md: "px-2 py-1 text-xs",
        lg: "px-3 py-1.5 text-sm"
      }
    },
    defaultVariants: {
      status: "inactive",
      size: "md"
    }
  }
);
var UserStatus = import_react35.default.forwardRef(
  ({
    status,
    displayName,
    description,
    lastSeen,
    showLastSeen = true,
    showDescription = false,
    showIcon = true,
    editable = false,
    onChange,
    compact = false,
    size,
    className,
    ...props
  }, ref) => {
    const getStatusIcon2 = (statusType) => {
      switch (statusType) {
        case "active":
          return "\u{1F7E2}";
        case "inactive":
          return "\u26AA";
        case "pending":
          return "\u{1F7E1}";
        case "suspended":
          return "\u{1F534}";
        case "banned":
          return "\u{1F6AB}";
        case "offline":
          return "\u26AB";
        default:
          return "\u26AA";
      }
    };
    const getStatusDisplayName = (statusType) => {
      if (displayName) return displayName;
      switch (statusType) {
        case "active":
          return "Active";
        case "inactive":
          return "Inactive";
        case "pending":
          return "Pending";
        case "suspended":
          return "Suspended";
        case "banned":
          return "Banned";
        case "offline":
          return "Offline";
        default:
          return "Inactive";
      }
    };
    const getStatusDescription = (statusType) => {
      if (description) return description;
      switch (statusType) {
        case "active":
          return "User is active and can access all features";
        case "inactive":
          return "User account is inactive";
        case "pending":
          return "Account activation is pending approval";
        case "suspended":
          return "Account has been temporarily suspended";
        case "banned":
          return "Account has been permanently banned";
        case "offline":
          return "User is currently offline";
        default:
          return "Account status unknown";
      }
    };
    const formatLastSeen = (date) => {
      const now = /* @__PURE__ */ new Date();
      const diff = now.getTime() - date.getTime();
      const seconds = Math.floor(diff / 1e3);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      if (seconds < 60) return "Just now";
      if (minutes < 60) return `${minutes}m ago`;
      if (hours < 24) return `${hours}h ago`;
      if (days < 7) return `${days}d ago`;
      return date.toLocaleDateString();
    };
    const handleClick = () => {
      if (editable && onChange) {
        const statuses = [
          "active",
          "inactive",
          "pending",
          "suspended",
          "banned",
          "offline"
        ];
        const currentIndex = statuses.indexOf(status);
        const nextIndex = (currentIndex + 1) % statuses.length;
        onChange(statuses[nextIndex]);
      }
    };
    if (compact) {
      return /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(
        "div",
        {
          ref,
          className: cn(
            "flex items-center gap-1.5",
            editable && "cursor-pointer hover:opacity-80 transition-opacity",
            className
          ),
          onClick: handleClick,
          ...props,
          children: [
            showIcon && /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("span", { className: "text-sm", "aria-hidden": "true", children: getStatusIcon2(status) }),
            /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("span", { className: cn(userStatusVariants({ status, size })), children: getStatusDisplayName(status) })
          ]
        }
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)(
      "div",
      {
        ref,
        className: cn(
          "flex items-center justify-between gap-3 p-3 rounded-lg border bg-bg-elevated",
          editable && "cursor-pointer hover:bg-bg-subtle transition-colors",
          className
        ),
        onClick: handleClick,
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)("div", { className: "flex items-center gap-2", children: [
            showIcon && /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("span", { className: "text-sm", "aria-hidden": "true", children: getStatusIcon2(status) }),
            /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("span", { className: cn(userStatusVariants({ status, size })), children: getStatusDisplayName(status) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)("div", { className: "flex-1 min-w-0", children: [
            showDescription && /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("p", { className: "text-sm text-fg-muted line-clamp-2", children: getStatusDescription(status) }),
            showLastSeen && lastSeen && /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)("p", { className: "text-xs text-fg-muted", children: [
              "Last seen: ",
              formatLastSeen(lastSeen)
            ] })
          ] }),
          editable && /* @__PURE__ */ (0, import_jsx_runtime41.jsxs)("div", { className: "flex items-center gap-1 text-xs text-fg-muted", children: [
            /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("span", { children: "Click to change" }),
            /* @__PURE__ */ (0, import_jsx_runtime41.jsx)("span", { children: "\u21BB" })
          ] })
        ]
      }
    );
  }
);
UserStatus.displayName = "UserStatus";

// src/core/Button.tsx
var import_class_variance_authority17 = require("class-variance-authority");
var import_react36 = __toESM(require("react"), 1);
var import_jsx_runtime42 = require("react/jsx-runtime");
var buttonVariants2 = (0, import_class_variance_authority17.cva)(
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-fg-inverse hover:bg-primary/90 focus-visible:ring-primary",
        secondary: "bg-secondary text-fg hover:bg-secondary/80 focus-visible:ring-secondary",
        danger: "bg-error text-fg-inverse hover:bg-error/90 focus-visible:ring-error",
        ghost: "text-fg hover:bg-bg-subtle focus-visible:ring-primary",
        outline: "border border-border-default text-fg hover:bg-bg-subtle focus-visible:ring-primary"
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
var Button3 = import_react36.default.forwardRef(
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
    return /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(
      "button",
      {
        className: cn(buttonVariants2({ variant, size, loading }), className),
        disabled: isDisabled,
        ref,
        ...props,
        children: [
          loading && /* @__PURE__ */ (0, import_jsx_runtime42.jsxs)(
            "svg",
            {
              className: "h-4 w-4 animate-spin",
              fill: "none",
              viewBox: "0 0 24 24",
              xmlns: "http://www.w3.org/2000/svg",
              role: "img",
              "aria-label": "Loading",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
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
                /* @__PURE__ */ (0, import_jsx_runtime42.jsx)(
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
          !loading && leftIcon && /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("span", { className: "flex-shrink-0", children: leftIcon }),
          children && /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("span", { children }),
          !loading && rightIcon && /* @__PURE__ */ (0, import_jsx_runtime42.jsx)("span", { className: "flex-shrink-0", children: rightIcon })
        ]
      }
    );
  }
);
Button3.displayName = "Button";

// src/core/Card.tsx
var import_class_variance_authority18 = require("class-variance-authority");
var import_react37 = __toESM(require("react"), 1);
var import_jsx_runtime43 = require("react/jsx-runtime");
var cardVariants2 = (0, import_class_variance_authority18.cva)("rounded-lg border bg-bg-elevated transition-colors", {
  variants: {
    variant: {
      default: "border-border-default",
      elevated: "border-border-subtle shadow-sm",
      interactive: "border-border-default hover:border-border-strong hover:shadow-sm cursor-pointer",
      disabled: "border-border-subtle bg-bg-subtle opacity-60 cursor-not-allowed"
    },
    padding: {
      none: "p-0",
      sm: "p-3",
      md: "p-4",
      lg: "p-6"
    }
  },
  defaultVariants: {
    variant: "default",
    padding: "md"
  }
});
var Card2 = import_react37.default.forwardRef(
  ({ className, variant, padding, onClick, disabled = false, children, ...props }, ref) => {
    const isInteractive2 = variant === "interactive" && !disabled;
    const isDisabled = disabled || variant === "disabled";
    return /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
      "div",
      {
        className: cn(
          cardVariants2({ variant, padding }),
          isInteractive2 && "hover:bg-bg-subtle",
          isDisabled && "pointer-events-none",
          className
        ),
        onClick: isInteractive2 ? onClick : void 0,
        ref,
        role: isInteractive2 ? "button" : void 0,
        tabIndex: isInteractive2 ? 0 : void 0,
        onKeyDown: (e) => {
          if (isInteractive2 && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onClick?.();
          }
        },
        ...props,
        children
      }
    );
  }
);
Card2.displayName = "Card";
var CardHeader = import_react37.default.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
var CardTitle = import_react37.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime43.jsx)(
  "h3",
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
var CardDescription = import_react37.default.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("p", { ref, className: cn("text-sm text-fg-muted", className), ...props }));
CardDescription.displayName = "CardDescription";
var CardContent = import_react37.default.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
var CardFooter = import_react37.default.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime43.jsx)("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";

// src/core/Input.tsx
var import_class_variance_authority19 = require("class-variance-authority");
var import_react38 = __toESM(require("react"), 1);
var import_jsx_runtime44 = require("react/jsx-runtime");
var inputVariants2 = (0, import_class_variance_authority19.cva)(
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
var Input2 = import_react38.default.forwardRef(
  ({ className, variant, size, label, error, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const hasError = Boolean(error);
    const inputVariant = hasError ? "error" : variant;
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    return /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)("div", { className: "space-y-1", children: [
      label && /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)("label", { htmlFor: inputId, className: "text-sm font-medium text-fg", children: [
        label,
        props.required && /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("span", { className: "text-error ml-1", children: "*" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime44.jsxs)("div", { className: "relative", children: [
        leftIcon && /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("div", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted", children: leftIcon }),
        /* @__PURE__ */ (0, import_jsx_runtime44.jsx)(
          "input",
          {
            id: inputId,
            className: cn(
              inputVariants2({ variant: inputVariant, size }),
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            ),
            ref,
            ...props
          }
        ),
        rightIcon && /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("div", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted", children: rightIcon })
      ] }),
      error && /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("p", { className: "text-sm text-error", children: error }),
      helperText && !error && /* @__PURE__ */ (0, import_jsx_runtime44.jsx)("p", { className: "text-sm text-fg-muted", children: helperText })
    ] });
  }
);
Input2.displayName = "Input";

// src/core/Select.tsx
var import_class_variance_authority20 = require("class-variance-authority");
var import_react39 = __toESM(require("react"), 1);
var import_jsx_runtime45 = require("react/jsx-runtime");
var selectVariants2 = (0, import_class_variance_authority20.cva)(
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
var Select2 = import_react39.default.forwardRef(
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
    return /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("div", { className: "space-y-1", children: [
      label && /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("label", { htmlFor: selectId, className: "text-sm font-medium text-fg", children: [
        label,
        props.required && /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("span", { className: "text-error ml-1", children: "*" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)("div", { className: "relative", children: [
        leftIcon && /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted", children: leftIcon }),
        /* @__PURE__ */ (0, import_jsx_runtime45.jsxs)(
          "select",
          {
            id: selectId,
            className: cn(
              selectVariants2({ variant: selectVariant, size }),
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            ),
            ref,
            ...props,
            children: [
              placeholder && /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("option", { value: "", disabled: true, children: placeholder }),
              options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("option", { value: option.value, disabled: option.disabled, children: option.label }, option.value))
            ]
          }
        ),
        rightIcon && /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("div", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted", children: rightIcon })
      ] }),
      error && /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("p", { className: "text-sm text-error", children: error }),
      helperText && !error && /* @__PURE__ */ (0, import_jsx_runtime45.jsx)("p", { className: "text-sm text-fg-muted", children: helperText })
    ] });
  }
);
Select2.displayName = "Select";

// src/core/Checkbox.tsx
var import_class_variance_authority21 = require("class-variance-authority");
var import_react40 = __toESM(require("react"), 1);
var import_jsx_runtime46 = require("react/jsx-runtime");
var checkboxVariants2 = (0, import_class_variance_authority21.cva)(
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
var Checkbox2 = import_react40.default.forwardRef(
  ({ className, size, label, error, helperText, indeterminate = false, id, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = Boolean(error);
    return /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)("div", { className: "space-y-1", children: [
      /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)("div", { className: "flex items-start space-x-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)("div", { className: "relative", children: [
          /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(
            "input",
            {
              type: "checkbox",
              id: checkboxId,
              ref,
              className: cn(checkboxVariants2({ size }), className),
              "data-state": indeterminate ? "indeterminate" : void 0,
              ...props
            }
          ),
          indeterminate && /* @__PURE__ */ (0, import_jsx_runtime46.jsx)("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(
            "svg",
            {
              className: "h-3 w-3 text-fg-inverse",
              fill: "currentColor",
              viewBox: "0 0 20 20",
              role: "img",
              "aria-label": "Indeterminate",
              children: /* @__PURE__ */ (0, import_jsx_runtime46.jsx)(
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
        label && /* @__PURE__ */ (0, import_jsx_runtime46.jsxs)(
          "label",
          {
            htmlFor: checkboxId,
            className: cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              hasError && "text-error"
            ),
            children: [
              label,
              props.required && /* @__PURE__ */ (0, import_jsx_runtime46.jsx)("span", { className: "text-error ml-1", children: "*" })
            ]
          }
        )
      ] }),
      error && /* @__PURE__ */ (0, import_jsx_runtime46.jsx)("p", { className: "text-sm text-error", children: error }),
      helperText && !error && /* @__PURE__ */ (0, import_jsx_runtime46.jsx)("p", { className: "text-sm text-fg-muted", children: helperText })
    ] });
  }
);
Checkbox2.displayName = "Checkbox";

// src/feedback/Toast.tsx
var import_class_variance_authority22 = require("class-variance-authority");
var import_react41 = __toESM(require("react"), 1);
var import_jsx_runtime47 = require("react/jsx-runtime");
var toastVariants = (0, import_class_variance_authority22.cva)(
  "relative flex w-full items-center gap-3 rounded-lg border p-4 shadow-lg transition-all",
  {
    variants: {
      variant: {
        success: "border-success bg-success/10 text-success-foreground",
        error: "border-error bg-error/10 text-error-foreground",
        warning: "border-warning bg-warning/10 text-warning-foreground",
        info: "border-primary bg-primary/10 text-primary-foreground"
      },
      size: {
        sm: "p-3 text-sm",
        md: "p-4 text-sm",
        lg: "p-5 text-base"
      }
    },
    defaultVariants: {
      variant: "info",
      size: "md"
    }
  }
);
var Toast = import_react41.default.forwardRef(
  ({
    className,
    variant,
    size,
    title,
    description,
    onClose,
    autoClose = true,
    duration = 5e3,
    persistent = false,
    icon,
    action,
    children,
    ...props
  }, ref) => {
    const [isVisible, setIsVisible] = import_react41.default.useState(true);
    import_react41.default.useEffect(() => {
      if (autoClose && !persistent && duration > 0) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => onClose?.(), 300);
        }, duration);
        return () => clearTimeout(timer);
      }
    }, [autoClose, persistent, duration, onClose]);
    const handleClose = () => {
      setIsVisible(false);
      setTimeout(() => onClose?.(), 300);
    };
    if (!isVisible) return null;
    const getDefaultIcon = () => {
      switch (variant) {
        case "success":
          return "\u2713";
        case "error":
          return "\u2715";
        case "warning":
          return "\u26A0";
        default:
          return "\u2139";
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)(
      "div",
      {
        ref,
        className: cn(
          toastVariants({ variant, size }),
          "animate-in slide-in-from-right-full",
          className
        ),
        role: "alert",
        "aria-live": "polite",
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime47.jsx)("div", { className: "flex-shrink-0", children: icon || /* @__PURE__ */ (0, import_jsx_runtime47.jsx)("span", { className: "text-lg", children: getDefaultIcon() }) }),
          /* @__PURE__ */ (0, import_jsx_runtime47.jsxs)("div", { className: "flex-1 min-w-0", children: [
            title && /* @__PURE__ */ (0, import_jsx_runtime47.jsx)("div", { className: "font-medium text-fg", children: title }),
            description && /* @__PURE__ */ (0, import_jsx_runtime47.jsx)("div", { className: "text-sm text-fg-muted mt-1", children: description }),
            children && /* @__PURE__ */ (0, import_jsx_runtime47.jsx)("div", { className: "mt-2", children })
          ] }),
          action && /* @__PURE__ */ (0, import_jsx_runtime47.jsx)("div", { className: "flex-shrink-0 ml-2", children: action }),
          !persistent && onClose && /* @__PURE__ */ (0, import_jsx_runtime47.jsx)(
            "button",
            {
              type: "button",
              onClick: handleClose,
              className: "flex-shrink-0 ml-2 p-1 rounded-md hover:bg-bg-subtle transition-colors",
              "aria-label": "Close notification",
              children: /* @__PURE__ */ (0, import_jsx_runtime47.jsx)("span", { className: "text-lg", children: "\xD7" })
            }
          )
        ]
      }
    );
  }
);
Toast.displayName = "Toast";

// src/feedback/Modal.tsx
var import_class_variance_authority23 = require("class-variance-authority");
var import_react42 = __toESM(require("react"), 1);
var import_jsx_runtime48 = require("react/jsx-runtime");
var modalVariants = (0, import_class_variance_authority23.cva)(
  "relative bg-bg-elevated border border-border-default rounded-lg shadow-lg transition-all",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        fullscreen: "max-w-none w-full h-full rounded-none"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);
var Modal = import_react42.default.forwardRef(
  ({
    className,
    size,
    open = false,
    onClose,
    title,
    description,
    showCloseButton = true,
    closeOnBackdropClick = true,
    closeOnEscape = true,
    children,
    ...props
  }, ref) => {
    const [isVisible, setIsVisible] = import_react42.default.useState(open);
    import_react42.default.useEffect(() => {
      setIsVisible(open);
    }, [open]);
    import_react42.default.useEffect(() => {
      if (!closeOnEscape || !onClose) return;
      const handleEscape = (e) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      if (isVisible) {
        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";
      }
      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "unset";
      };
    }, [isVisible, closeOnEscape, onClose]);
    const handleBackdropClick = (e) => {
      if (closeOnBackdropClick && e.target === e.currentTarget) {
        onClose?.();
      }
    };
    if (!isVisible) return null;
    return /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm",
        onClick: handleBackdropClick,
        onKeyDown: (e) => {
          if (e.key === "Escape" && closeOnEscape) {
            onClose?.();
          }
        },
        tabIndex: -1,
        children: /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)(
          "div",
          {
            ref,
            className: cn(modalVariants({ size }), "w-full max-h-[90vh] overflow-hidden", className),
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": title ? "modal-title" : void 0,
            "aria-describedby": description ? "modal-description" : void 0,
            ...props,
            children: [
              (title || showCloseButton) && /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("div", { className: "flex items-center justify-between p-6 border-b border-border-subtle", children: [
                /* @__PURE__ */ (0, import_jsx_runtime48.jsxs)("div", { className: "flex-1", children: [
                  title && /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("h2", { id: "modal-title", className: "text-lg font-semibold text-fg", children: title }),
                  description && /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("p", { id: "modal-description", className: "text-sm text-fg-muted mt-1", children: description })
                ] }),
                showCloseButton && onClose && /* @__PURE__ */ (0, import_jsx_runtime48.jsx)(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: "ml-4 p-2 rounded-md hover:bg-bg-subtle transition-colors",
                    "aria-label": "Close modal",
                    children: /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("span", { className: "text-lg", children: "\xD7" })
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime48.jsx)("div", { className: "p-6 overflow-y-auto max-h-[calc(90vh-8rem)]", children })
            ]
          }
        )
      }
    );
  }
);
Modal.displayName = "Modal";

// src/feedback/Alert.tsx
var import_class_variance_authority24 = require("class-variance-authority");
var import_react43 = __toESM(require("react"), 1);
var import_jsx_runtime49 = require("react/jsx-runtime");
var alertVariants = (0, import_class_variance_authority24.cva)("relative flex w-full items-start gap-3 rounded-lg border p-4", {
  variants: {
    variant: {
      info: "border-primary bg-primary/5 text-primary",
      success: "border-success bg-success/5 text-success",
      warning: "border-warning bg-warning/5 text-warning",
      error: "border-error bg-error/5 text-error"
    },
    size: {
      sm: "p-3 text-sm",
      md: "p-4 text-sm",
      lg: "p-5 text-base"
    }
  },
  defaultVariants: {
    variant: "info",
    size: "md"
  }
});
var Alert = import_react43.default.forwardRef(
  ({
    className,
    variant,
    size,
    title,
    description,
    onClose,
    dismissible = false,
    icon,
    action,
    children,
    ...props
  }, ref) => {
    const getDefaultIcon = () => {
      switch (variant) {
        case "success":
          return "\u2713";
        case "error":
          return "\u2715";
        case "warning":
          return "\u26A0";
        default:
          return "\u2139";
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)(
      "div",
      {
        ref,
        className: cn(alertVariants({ variant, size }), className),
        role: "alert",
        "aria-live": "polite",
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("div", { className: "flex-shrink-0 mt-0.5", children: icon || /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("span", { className: "text-lg", children: getDefaultIcon() }) }),
          /* @__PURE__ */ (0, import_jsx_runtime49.jsxs)("div", { className: "flex-1 min-w-0", children: [
            title && /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("div", { className: "font-medium text-fg", children: title }),
            description && /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("div", { className: "text-sm text-fg-muted mt-1", children: description }),
            children && /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("div", { className: "mt-2", children })
          ] }),
          action && /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("div", { className: "flex-shrink-0 ml-2", children: action }),
          dismissible && onClose && /* @__PURE__ */ (0, import_jsx_runtime49.jsx)(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "flex-shrink-0 ml-2 p-1 rounded-md hover:bg-bg-subtle transition-colors",
              "aria-label": "Dismiss alert",
              children: /* @__PURE__ */ (0, import_jsx_runtime49.jsx)("span", { className: "text-lg", children: "\xD7" })
            }
          )
        ]
      }
    );
  }
);
Alert.displayName = "Alert";

// src/feedback/Banner.tsx
var import_class_variance_authority25 = require("class-variance-authority");
var import_react44 = __toESM(require("react"), 1);
var import_jsx_runtime50 = require("react/jsx-runtime");
var bannerVariants = (0, import_class_variance_authority25.cva)("relative flex w-full items-center gap-3 border-b px-4 py-3", {
  variants: {
    variant: {
      announcement: "border-primary bg-primary/5 text-primary",
      warning: "border-warning bg-warning/5 text-warning",
      maintenance: "border-error bg-error/5 text-error"
    },
    size: {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-3 text-sm",
      lg: "px-6 py-4 text-base"
    }
  },
  defaultVariants: {
    variant: "announcement",
    size: "md"
  }
});
var Banner = import_react44.default.forwardRef(
  ({
    className,
    variant,
    size,
    title,
    description,
    onClose,
    dismissible = false,
    icon,
    action,
    link,
    children,
    ...props
  }, ref) => {
    const getDefaultIcon = () => {
      switch (variant) {
        case "announcement":
          return "\u{1F4E2}";
        case "warning":
          return "\u26A0";
        case "maintenance":
          return "\u{1F527}";
        default:
          return "\u{1F4E2}";
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime50.jsxs)(
      "div",
      {
        ref,
        className: cn(bannerVariants({ variant, size }), className),
        role: "banner",
        "aria-live": "polite",
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime50.jsx)("div", { className: "flex-shrink-0", children: icon || /* @__PURE__ */ (0, import_jsx_runtime50.jsx)("span", { className: "text-lg", children: getDefaultIcon() }) }),
          /* @__PURE__ */ (0, import_jsx_runtime50.jsxs)("div", { className: "flex-1 min-w-0", children: [
            title && /* @__PURE__ */ (0, import_jsx_runtime50.jsx)("div", { className: "font-medium text-fg", children: title }),
            description && /* @__PURE__ */ (0, import_jsx_runtime50.jsx)("div", { className: "text-sm text-fg-muted mt-1", children: description }),
            children && /* @__PURE__ */ (0, import_jsx_runtime50.jsx)("div", { className: "mt-2", children }),
            link && /* @__PURE__ */ (0, import_jsx_runtime50.jsx)("div", { className: "mt-2", children: /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(
              "a",
              {
                href: link.href,
                className: "text-sm underline hover:no-underline transition-all",
                target: "_blank",
                rel: "noopener noreferrer",
                children: link.text
              }
            ) })
          ] }),
          action && /* @__PURE__ */ (0, import_jsx_runtime50.jsx)("div", { className: "flex-shrink-0 ml-2", children: action }),
          dismissible && onClose && /* @__PURE__ */ (0, import_jsx_runtime50.jsx)(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "flex-shrink-0 ml-2 p-1 rounded-md hover:bg-bg-subtle transition-colors",
              "aria-label": "Dismiss banner",
              children: /* @__PURE__ */ (0, import_jsx_runtime50.jsx)("span", { className: "text-lg", children: "\xD7" })
            }
          )
        ]
      }
    );
  }
);
Banner.displayName = "Banner";

// src/feedback/EmptyState.tsx
var import_class_variance_authority26 = require("class-variance-authority");
var import_react45 = __toESM(require("react"), 1);
var import_jsx_runtime51 = require("react/jsx-runtime");
var emptyStateVariants = (0, import_class_variance_authority26.cva)("flex flex-col items-center justify-center text-center p-8", {
  variants: {
    variant: {
      "no-data": "text-fg-muted",
      error: "text-error",
      loading: "text-fg-muted",
      success: "text-success"
    },
    size: {
      sm: "p-4",
      md: "p-8",
      lg: "p-12"
    }
  },
  defaultVariants: {
    variant: "no-data",
    size: "md"
  }
});
var EmptyState = import_react45.default.forwardRef(
  ({
    className,
    variant,
    size,
    title,
    description,
    icon,
    action,
    secondaryAction,
    children,
    ...props
  }, ref) => {
    const getDefaultIcon = () => {
      switch (variant) {
        case "no-data":
          return "\u{1F4ED}";
        case "error":
          return "\u274C";
        case "loading":
          return "\u23F3";
        case "success":
          return "\u2705";
        default:
          return "\u{1F4ED}";
      }
    };
    const getDefaultTitle = () => {
      switch (variant) {
        case "no-data":
          return "No data available";
        case "error":
          return "Something went wrong";
        case "loading":
          return "Loading...";
        case "success":
          return "All done!";
        default:
          return "No data available";
      }
    };
    const getDefaultDescription = () => {
      switch (variant) {
        case "no-data":
          return "There's nothing to show here yet.";
        case "error":
          return "We encountered an error while loading your data.";
        case "loading":
          return "Please wait while we load your content.";
        case "success":
          return "Everything looks good!";
        default:
          return "There's nothing to show here yet.";
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime51.jsxs)("div", { ref, className: cn(emptyStateVariants({ variant, size }), className), ...props, children: [
      /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("div", { className: "mb-4", children: icon || /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("span", { className: "text-6xl", children: getDefaultIcon() }) }),
      /* @__PURE__ */ (0, import_jsx_runtime51.jsxs)("div", { className: "max-w-md", children: [
        /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("h3", { className: "text-lg font-semibold text-fg mb-2", children: title || getDefaultTitle() }),
        /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("p", { className: "text-sm text-fg-muted mb-6", children: description || getDefaultDescription() }),
        children && /* @__PURE__ */ (0, import_jsx_runtime51.jsx)("div", { className: "mb-6", children }),
        /* @__PURE__ */ (0, import_jsx_runtime51.jsxs)("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
          action && /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(
            "button",
            {
              type: "button",
              onClick: action.onClick,
              className: "px-4 py-2 bg-primary text-fg-inverse rounded-md hover:bg-primary/90 transition-colors",
              children: action.label
            }
          ),
          secondaryAction && /* @__PURE__ */ (0, import_jsx_runtime51.jsx)(
            "button",
            {
              type: "button",
              onClick: secondaryAction.onClick,
              className: "px-4 py-2 border border-border-default text-fg rounded-md hover:bg-bg-subtle transition-colors",
              children: secondaryAction.label
            }
          )
        ] })
      ] })
    ] });
  }
);
EmptyState.displayName = "EmptyState";

// src/commerce/BuyButton.tsx
var import_class_variance_authority27 = require("class-variance-authority");
var import_react46 = __toESM(require("react"), 1);
var import_jsx_runtime52 = require("react/jsx-runtime");
var buyButtonVariants = (0, import_class_variance_authority27.cva)(
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-primary text-fg-inverse hover:bg-primary/90 focus:ring-primary",
        secondary: "bg-secondary text-fg-inverse hover:bg-secondary/90 focus:ring-secondary",
        success: "bg-success text-fg-inverse hover:bg-success/90 focus:ring-success",
        danger: "bg-error text-fg-inverse hover:bg-error/90 focus:ring-error"
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base"
      },
      state: {
        idle: "",
        processing: "animate-pulse",
        success: "",
        error: "",
        disabled: "opacity-50 cursor-not-allowed"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      state: "idle"
    }
  }
);
var BuyButton = import_react46.default.forwardRef(
  ({
    className,
    variant,
    size,
    state,
    price,
    currency = "USD",
    loading = false,
    success = false,
    error = false,
    disabled = false,
    onClick,
    leftIcon,
    rightIcon,
    children,
    ...props
  }, ref) => {
    const [currentState, setCurrentState] = import_react46.default.useState("idle");
    import_react46.default.useEffect(() => {
      if (loading) setCurrentState("processing");
      else if (success) setCurrentState("success");
      else if (error) setCurrentState("error");
      else setCurrentState("idle");
    }, [loading, success, error]);
    const handleClick = () => {
      if (disabled || loading) return;
      onClick?.();
    };
    const getButtonText = () => {
      if (currentState === "processing") return "Processing...";
      if (currentState === "success") return "Purchased";
      if (currentState === "error") return "Retry";
      if (price) return `Buy ${price} ${currency}`;
      return children || "Buy Now";
    };
    const getButtonVariant = () => {
      if (currentState === "success") return "success";
      if (currentState === "error") return "danger";
      return variant;
    };
    const getButtonState = () => {
      if (disabled) return "disabled";
      return currentState;
    };
    return /* @__PURE__ */ (0, import_jsx_runtime52.jsxs)(
      "button",
      {
        ref,
        type: "button",
        className: cn(
          buyButtonVariants({
            variant: getButtonVariant(),
            size,
            state: getButtonState()
          }),
          className
        ),
        disabled: disabled || loading,
        onClick: handleClick,
        "aria-label": String(getButtonText()),
        ...props,
        children: [
          currentState === "processing" && /* @__PURE__ */ (0, import_jsx_runtime52.jsxs)(
            "svg",
            {
              className: "h-4 w-4 animate-spin",
              fill: "none",
              viewBox: "0 0 24 24",
              xmlns: "http://www.w3.org/2000/svg",
              role: "img",
              "aria-label": "Loading",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(
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
                /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(
                  "path",
                  {
                    className: "opacity-75",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  }
                )
              ]
            }
          ),
          currentState === "success" && /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(
            "svg",
            {
              className: "h-4 w-4",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              role: "img",
              "aria-label": "Success",
              children: /* @__PURE__ */ (0, import_jsx_runtime52.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" })
            }
          ),
          currentState === "error" && /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(
            "svg",
            {
              className: "h-4 w-4",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              role: "img",
              "aria-label": "Error",
              children: /* @__PURE__ */ (0, import_jsx_runtime52.jsx)(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M6 18L18 6M6 6l12 12"
                }
              )
            }
          ),
          leftIcon && currentState === "idle" && leftIcon,
          /* @__PURE__ */ (0, import_jsx_runtime52.jsx)("span", { children: getButtonText() }),
          rightIcon && currentState === "idle" && rightIcon
        ]
      }
    );
  }
);
BuyButton.displayName = "BuyButton";

// src/commerce/PriceDisplay.tsx
var import_class_variance_authority28 = require("class-variance-authority");
var import_react47 = __toESM(require("react"), 1);
var import_jsx_runtime53 = require("react/jsx-runtime");
var priceDisplayVariants = (0, import_class_variance_authority28.cva)("", {
  variants: {
    variant: {
      default: "text-fg",
      muted: "text-fg-muted",
      success: "text-success",
      error: "text-error",
      warning: "text-warning"
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl"
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    weight: "medium"
  }
});
var PriceDisplay = import_react47.default.forwardRef(
  ({
    className,
    variant,
    size,
    weight,
    amount,
    currency = "USD",
    locale = "en-US",
    showCurrency = true,
    originalPrice,
    discount,
    discountPercentage,
    showDiscount = true,
    prefix,
    suffix,
    formatOptions,
    ...props
  }, ref) => {
    const formatPrice = (value) => {
      const options = {
        style: showCurrency ? "currency" : "decimal",
        currency: showCurrency ? currency : void 0,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        ...formatOptions
      };
      return new Intl.NumberFormat(locale, options).format(value);
    };
    const hasDiscount = Boolean(originalPrice && originalPrice > amount);
    const displayDiscount = discount || (originalPrice ? originalPrice - amount : 0);
    const displayDiscountPercentage = discountPercentage || (originalPrice ? Math.round((originalPrice - amount) / originalPrice * 100) : 0);
    return /* @__PURE__ */ (0, import_jsx_runtime53.jsxs)("div", { ref, className: cn("flex items-center gap-2", className), ...props, children: [
      prefix && /* @__PURE__ */ (0, import_jsx_runtime53.jsx)("span", { className: "text-fg-muted", children: prefix }),
      /* @__PURE__ */ (0, import_jsx_runtime53.jsxs)("div", { className: "flex items-center gap-2", children: [
        hasDiscount && showDiscount && /* @__PURE__ */ (0, import_jsx_runtime53.jsx)(
          "span",
          {
            className: cn(
              priceDisplayVariants({ variant: "muted", size: "sm", weight: "normal" })
            ),
            children: formatPrice(originalPrice ?? 0)
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime53.jsx)("span", { className: cn(priceDisplayVariants({ variant, size, weight })), children: formatPrice(amount) }),
        hasDiscount && showDiscount && /* @__PURE__ */ (0, import_jsx_runtime53.jsxs)(
          "span",
          {
            className: cn(
              priceDisplayVariants({
                variant: "success",
                size: "sm",
                weight: "medium"
              }),
              "bg-success/10 px-2 py-1 rounded-md"
            ),
            children: [
              "-",
              displayDiscountPercentage,
              "%"
            ]
          }
        )
      ] }),
      suffix && /* @__PURE__ */ (0, import_jsx_runtime53.jsx)("span", { className: "text-fg-muted", children: suffix })
    ] });
  }
);
PriceDisplay.displayName = "PriceDisplay";

// src/commerce/CheckoutCTA.tsx
var import_class_variance_authority29 = require("class-variance-authority");
var import_react48 = __toESM(require("react"), 1);
var import_jsx_runtime54 = require("react/jsx-runtime");
var checkoutCTAVariants = (0, import_class_variance_authority29.cva)(
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-primary text-fg-inverse hover:bg-primary/90 focus:ring-primary",
        secondary: "bg-secondary text-fg-inverse hover:bg-secondary/90 focus:ring-secondary",
        outline: "border border-primary text-primary hover:bg-primary hover:text-fg-inverse focus:ring-primary",
        ghost: "text-primary hover:bg-primary/10 focus:ring-primary"
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
        xl: "px-8 py-4 text-lg"
      },
      checkoutType: {
        single: "",
        cart: "",
        subscription: ""
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      checkoutType: "single"
    }
  }
);
var CheckoutCTA = import_react48.default.forwardRef(
  ({
    className,
    variant,
    size,
    checkoutType,
    totalAmount,
    currency = "USD",
    itemCount,
    loading = false,
    disabled = false,
    onClick,
    leftIcon,
    rightIcon,
    children,
    ...props
  }, ref) => {
    const formatPrice = (amount) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount);
    };
    const getButtonText = () => {
      if (children) return children;
      switch (checkoutType) {
        case "single":
          return totalAmount ? `Buy for ${formatPrice(totalAmount)}` : "Buy Now";
        case "cart":
          return itemCount ? `Checkout (${itemCount} ${itemCount === 1 ? "item" : "items"})` : "Checkout";
        case "subscription":
          return totalAmount ? `Subscribe for ${formatPrice(totalAmount)}/month` : "Subscribe";
        default:
          return "Checkout";
      }
    };
    const getButtonIcon = () => {
      if (loading) {
        return /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)(
          "svg",
          {
            className: "h-4 w-4 animate-spin",
            fill: "none",
            viewBox: "0 0 24 24",
            xmlns: "http://www.w3.org/2000/svg",
            role: "img",
            "aria-label": "Loading",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(
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
              /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(
                "path",
                {
                  className: "opacity-75",
                  fill: "currentColor",
                  d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                }
              )
            ]
          }
        );
      }
      switch (checkoutType) {
        case "single":
          return /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(
            "svg",
            {
              className: "h-4 w-4",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              role: "img",
              "aria-label": "Buy",
              children: /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                }
              )
            }
          );
        case "cart":
          return /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(
            "svg",
            {
              className: "h-4 w-4",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              role: "img",
              "aria-label": "Cart",
              children: /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                }
              )
            }
          );
        case "subscription":
          return /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(
            "svg",
            {
              className: "h-4 w-4",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              role: "img",
              "aria-label": "Subscribe",
              children: /* @__PURE__ */ (0, import_jsx_runtime54.jsx)(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                }
              )
            }
          );
        default:
          return null;
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime54.jsxs)(
      "button",
      {
        ref,
        type: "button",
        className: cn(checkoutCTAVariants({ variant, size, checkoutType }), className),
        disabled: disabled || loading,
        onClick,
        "aria-label": String(getButtonText()),
        ...props,
        children: [
          leftIcon && !loading && leftIcon,
          loading ? getButtonIcon() : leftIcon || getButtonIcon(),
          /* @__PURE__ */ (0, import_jsx_runtime54.jsx)("span", { children: getButtonText() }),
          rightIcon && !loading && rightIcon
        ]
      }
    );
  }
);
CheckoutCTA.displayName = "CheckoutCTA";

// src/commerce/PaymentMethod.tsx
var import_class_variance_authority30 = require("class-variance-authority");
var import_react49 = __toESM(require("react"), 1);
var import_jsx_runtime55 = require("react/jsx-runtime");
var paymentMethodVariants = (0, import_class_variance_authority30.cva)(
  "flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all hover:border-border-strong focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
  {
    variants: {
      variant: {
        card: "border-border-default",
        crypto: "border-border-default",
        wallet: "border-border-default"
      },
      selected: {
        true: "border-primary bg-primary/5",
        false: "border-border-default"
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: ""
      }
    },
    defaultVariants: {
      variant: "card",
      selected: false,
      disabled: false
    }
  }
);
var PaymentMethod = import_react49.default.forwardRef(
  ({
    className,
    variant,
    selected,
    disabled,
    type,
    name,
    description,
    icon,
    onClick,
    onSelect,
    ...props
  }, ref) => {
    const handleClick = () => {
      if (disabled) return;
      onClick?.();
      onSelect?.();
    };
    const handleKeyDown = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick();
      }
    };
    const getDefaultIcon = () => {
      switch (type) {
        case "card":
          return /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(
            "svg",
            {
              className: "h-6 w-6",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              role: "img",
              "aria-label": "Credit Card",
              children: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                }
              )
            }
          );
        case "crypto":
          return /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(
            "svg",
            {
              className: "h-6 w-6",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              role: "img",
              "aria-label": "Cryptocurrency",
              children: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                }
              )
            }
          );
        case "wallet":
          return /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(
            "svg",
            {
              className: "h-6 w-6",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              role: "img",
              "aria-label": "Digital Wallet",
              children: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                }
              )
            }
          );
        default:
          return null;
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)(
      "div",
      {
        ref,
        className: cn(paymentMethodVariants({ variant, selected, disabled }), className),
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        tabIndex: disabled ? -1 : 0,
        role: "button",
        "aria-pressed": selected,
        "aria-disabled": disabled,
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("div", { className: "flex-shrink-0", children: icon || getDefaultIcon() }),
          /* @__PURE__ */ (0, import_jsx_runtime55.jsxs)("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("div", { className: "font-medium text-fg", children: name }),
            description && /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("div", { className: "text-sm text-fg-muted mt-1", children: description })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("div", { className: "flex-shrink-0", children: selected ? /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("div", { className: "h-5 w-5 rounded-full bg-primary flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(
            "svg",
            {
              className: "h-3 w-3 text-fg-inverse",
              fill: "currentColor",
              viewBox: "0 0 20 20",
              role: "img",
              "aria-label": "Selected",
              children: /* @__PURE__ */ (0, import_jsx_runtime55.jsx)(
                "path",
                {
                  fillRule: "evenodd",
                  d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
                  clipRule: "evenodd"
                }
              )
            }
          ) }) : /* @__PURE__ */ (0, import_jsx_runtime55.jsx)("div", { className: "h-5 w-5 rounded-full border-2 border-border-default" }) })
        ]
      }
    );
  }
);
PaymentMethod.displayName = "PaymentMethod";

// src/commerce/ReceiptPanel.tsx
var import_class_variance_authority31 = require("class-variance-authority");
var import_react50 = __toESM(require("react"), 1);
var import_jsx_runtime56 = require("react/jsx-runtime");
var receiptPanelVariants = (0, import_class_variance_authority31.cva)("rounded-lg border p-6 space-y-4", {
  variants: {
    variant: {
      success: "border-success bg-success/5 text-success",
      error: "border-error bg-error/5 text-error",
      pending: "border-warning bg-warning/5 text-warning"
    },
    size: {
      sm: "p-4",
      md: "p-6",
      lg: "p-8"
    }
  },
  defaultVariants: {
    variant: "success",
    size: "md"
  }
});
var ReceiptPanel = import_react50.default.forwardRef(
  ({
    className,
    variant,
    size,
    status,
    transactionId,
    amount,
    currency = "USD",
    description,
    timestamp,
    paymentMethod,
    onRetry,
    onDownload,
    onShare,
    ...props
  }, ref) => {
    const formatPrice = (value) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
    };
    const formatDate2 = (date) => {
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }).format(date);
    };
    const getStatusIcon2 = () => {
      switch (status) {
        case "success":
          return /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(
            "svg",
            {
              className: "h-6 w-6",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              role: "img",
              "aria-label": "Success",
              children: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M5 13l4 4L19 7"
                }
              )
            }
          );
        case "error":
          return /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(
            "svg",
            {
              className: "h-6 w-6",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              role: "img",
              "aria-label": "Error",
              children: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M6 18L18 6M6 6l12 12"
                }
              )
            }
          );
        case "pending":
          return /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(
            "svg",
            {
              className: "h-6 w-6 animate-spin",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              role: "img",
              "aria-label": "Processing",
              children: /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                }
              )
            }
          );
        default:
          return null;
      }
    };
    const getStatusText = () => {
      switch (status) {
        case "success":
          return "Payment Successful";
        case "error":
          return "Payment Failed";
        case "pending":
          return "Processing Payment";
        default:
          return "Unknown Status";
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { ref, className: cn(receiptPanelVariants({ variant, size }), className), ...props, children: [
      /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { className: "flex items-center gap-3", children: [
        getStatusIcon2(),
        /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("h3", { className: "text-lg font-semibold", children: getStatusText() })
      ] }),
      description && /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("p", { className: "text-sm text-fg-muted", children: description }),
      /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { className: "space-y-2", children: [
        transactionId && /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("span", { className: "text-fg-muted", children: "Transaction ID:" }),
          /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("span", { className: "font-mono text-fg", children: transactionId })
        ] }),
        amount && /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("span", { className: "text-fg-muted", children: "Amount:" }),
          /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("span", { className: "font-semibold text-fg", children: formatPrice(amount) })
        ] }),
        paymentMethod && /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("span", { className: "text-fg-muted", children: "Payment Method:" }),
          /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("span", { className: "text-fg", children: paymentMethod })
        ] }),
        timestamp && /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("span", { className: "text-fg-muted", children: "Date:" }),
          /* @__PURE__ */ (0, import_jsx_runtime56.jsx)("span", { className: "text-fg", children: formatDate2(timestamp) })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime56.jsxs)("div", { className: "flex gap-2 pt-4 border-t border-border-subtle", children: [
        status === "error" && onRetry && /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(
          "button",
          {
            type: "button",
            onClick: onRetry,
            className: "px-4 py-2 bg-error text-fg-inverse rounded-md hover:bg-error/90 transition-colors",
            children: "Retry Payment"
          }
        ),
        status === "success" && onDownload && /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(
          "button",
          {
            type: "button",
            onClick: onDownload,
            className: "px-4 py-2 bg-primary text-fg-inverse rounded-md hover:bg-primary/90 transition-colors",
            children: "Download Receipt"
          }
        ),
        status === "success" && onShare && /* @__PURE__ */ (0, import_jsx_runtime56.jsx)(
          "button",
          {
            type: "button",
            onClick: onShare,
            className: "px-4 py-2 border border-border-default text-fg rounded-md hover:bg-bg-subtle transition-colors",
            children: "Share"
          }
        )
      ] })
    ] });
  }
);
ReceiptPanel.displayName = "ReceiptPanel";

// src/Card.tsx
var import_clsx3 = __toESM(require("clsx"), 1);
var import_jsx_runtime57 = require("react/jsx-runtime");
function Card3({ className, children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime57.jsx)(
    "div",
    {
      className: (0, import_clsx3.default)(
        "rounded-md border border-white/10 bg-bg-elevated p-4 shadow-elev-1",
        className
      ),
      children
    }
  );
}
function CardTitle2({ children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("h3", { className: "mb-1 text-lg font-semibold text-fg", children });
}
function CardMeta({ children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime57.jsx)("p", { className: "text-sm text-fg/70", children });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ActiveFilters,
  Alert,
  Announcer,
  AnnouncerProvider,
  AssetActions,
  AssetPreview,
  AssetStatus,
  AssetTile,
  AuditLog,
  Badge,
  Banner,
  Bpm,
  Button,
  BuyButton,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMeta,
  CardTitle,
  CatalogCard,
  CatalogFilters,
  CatalogGrid,
  CatalogGridEmpty,
  CatalogGridSkeleton,
  Checkbox,
  CheckoutCTA,
  ChevronRight,
  CoreCard,
  CoreCardTitle,
  CurrencySelector,
  Download,
  EmptyState,
  FeatureFlag,
  Field,
  FileUpload,
  FilterChip,
  HealthStatus,
  Input,
  KeySig,
  LegacyCard,
  MetadataPanel,
  MiniPlayer,
  Modal,
  Music,
  Pause,
  PaymentMethod,
  PermissionMatrix,
  Play,
  Player,
  PlayerControls,
  PriceDisplay,
  PriceInput,
  PriceRange,
  PriceValidator,
  ProgressBar,
  ReceiptPanel,
  Select,
  SelectContent,
  SelectItem,
  Skeleton,
  Slider,
  Slot,
  Spinner,
  Tag,
  TagIcon,
  ThemeProvider,
  Toast,
  UploadProgress,
  UserRole,
  UserStatus,
  ValidationFeedback,
  VisuallyHidden,
  Volume,
  VolumeMute,
  Wave,
  Waveform,
  cn,
  generateId,
  getAccessibleName,
  isInteractive,
  mergeRefs,
  useAnnouncer,
  useTheme
});
//# sourceMappingURL=index.cjs.map