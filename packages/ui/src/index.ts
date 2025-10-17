// Theme
export { ThemeProvider, useTheme, type Theme } from "./theme";

// Primitives
export { Slot, VisuallyHidden, type SlotProps, type VisuallyHiddenProps } from "./primitives";

// Accessibility
export {
  AnnouncerProvider,
  Announcer,
  useAnnouncer,
  type Politeness,
  type AnnouncerProps,
} from "./a11y";

// Utils
export { cn } from "./utils";
export { generateId, mergeRefs, isInteractive, getAccessibleName } from "./utils/a11y";

// Layout Components
export { Card, Button, type CardProps, type ButtonProps } from "./layout";

// Data Components
export { Badge, Tag, type BadgeProps, type TagProps } from "./data";

// Media Components
export { Waveform, Player, type WaveformProps, type PlayerProps } from "./media";

// Legacy Components (existing)
export { Card as LegacyCard, CardTitle, CardMeta } from "./Card";
