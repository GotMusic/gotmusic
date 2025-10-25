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

// Core Components (Primary)
export {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardIcon,
  CardBadge,
  Input,
  Checkbox,
  type ButtonProps,
  type CardProps,
  type InputProps,
  type CheckboxProps,
} from "./core";

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

// Feedback Components (existing)
export { Skeleton, type SkeletonProps } from "./feedback/Skeleton";

// Form Components
export {
  Field,
  Select,
  SelectContent,
  SelectItem,
  Slider,
  CatalogFilters,
  FilterChip,
  ActiveFilters,
} from "./forms";
export type {
  FieldProps,
  SliderProps,
  CatalogFiltersProps,
  FilterOption,
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

// Asset Management Components
export {
  AssetTile,
  AssetStatus,
  MetadataPanel,
  AssetActions,
  AssetPreview,
  type AssetTileProps,
  type AssetStatusProps,
  type MetadataPanelProps,
  type AssetActionsProps,
  type AssetPreviewProps,
  type AssetStatusType,
  type AssetActionType,
  type AssetAction,
  type AssetMetadata,
} from "./asset";

// Pricing Components
export {
  PriceInput,
  CurrencySelector,
  PriceValidator,
  PriceRange,
  type PriceInputProps,
  type CurrencySelectorProps,
  type CurrencyOption,
  type PriceValidatorProps,
  type PriceValidationRule,
  type PriceRangeProps,
} from "./pricing";

// Admin Dashboard Components
export {
  FeatureFlag,
  AuditLog,
  HealthStatus,
  type FeatureFlagProps,
  type AuditLogProps,
  type AuditLogEntry,
  type HealthStatusProps,
  type HealthCheck,
} from "./admin";

// User Management Components
export {
  UserRole,
  PermissionMatrix,
  UserStatus,
  type UserRoleProps,
  type PermissionMatrixProps,
  type Permission,
  type RolePermission,
  type UserStatusProps,
} from "./user";

// Layout Components (Secondary)
export {
  CatalogGrid,
  CatalogGridSkeleton,
  CatalogGridEmpty,
  type CatalogGridProps,
} from "./layout";

// Feedback Components
export {
  Toast,
  Modal,
  Alert,
  Banner,
  EmptyState,
  type ToastProps,
  type ModalProps,
  type AlertProps,
  type BannerProps,
  type EmptyStateProps,
} from "./feedback";

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

// Legacy Components (deprecated - use core components instead)
// export { Card as LegacyCard, CardTitle, CardMeta } from "./Card";
