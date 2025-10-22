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
export {
  Card,
  Button,
  CatalogGrid,
  CatalogGridSkeleton,
  CatalogGridEmpty,
  type CardProps,
  type ButtonProps,
  type CatalogGridProps,
} from "./layout";

// Data Components
export { Badge, Tag, type BadgeProps, type TagProps } from "./data";

// Media Components
export {
  Waveform,
  Player,
  MiniPlayer,
  PlayerControls,
  ProgressBar,
  CatalogCard,
  type WaveformProps,
  type PlayerProps,
  type MiniPlayerProps,
  type PlayerControlsProps,
  type ProgressBarProps,
  type CatalogCardProps,
} from "./media";

// Commerce Components
export {
  BuyButton,
  PriceDisplay,
  CheckoutCTA,
  PaymentMethod,
  ReceiptPanel,
  type BuyButtonProps,
  type PriceDisplayProps,
  type CheckoutCTAProps,
  type PaymentMethodProps,
  type ReceiptPanelProps,
} from "./commerce";

// Icons
export {
  Play,
  Pause,
  ChevronRight,
  TagIcon,
  Music,
  Download,
  Spinner,
  Volume,
  VolumeMute,
  Wave,
  Bpm,
  KeySig,
} from "./icons";

// Feedback Components
export { Toast, Skeleton, type ToastProps, type SkeletonProps } from "./feedback";

// Form Components
export {
  Field,
  Input,
  Select,
  SelectContent,
  SelectItem,
  Checkbox,
  Slider,
  CatalogFilters,
  FilterChip,
  ActiveFilters,
} from "./forms";
export type {
  FieldProps,
  InputProps,
  SelectProps,
  CheckboxProps,
  SliderProps,
  CatalogFiltersProps,
  FilterOption,
  PriceRange,
} from "./forms";

// Upload Components
export {
  FileUpload,
  UploadProgress,
  ValidationFeedback,
  type FileUploadProps,
  type UploadProgressProps,
  type ValidationFeedbackProps,
} from "./upload";

// Legacy Components (existing)
export { Card as LegacyCard, CardTitle, CardMeta } from "./Card";
