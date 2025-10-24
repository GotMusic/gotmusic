export { Theme, ThemeProvider, useTheme } from './theme/index.js';
import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React$1 from 'react';
import React__default from 'react';
export { cn } from './utils/index.js';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
export { Activity as Bpm, ChevronRight, Download, Music2 as KeySig, Music, Pause, Play, Loader2 as Spinner, Tag as TagIcon, Volume2 as Volume, VolumeX as VolumeMute, Play as Wave } from 'lucide-react';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as SliderPrimitive from '@radix-ui/react-slider';
import 'clsx';

interface SlotProps extends React__default.HTMLAttributes<HTMLElement> {
    /**
     * If true, merges props onto the immediate child element instead of rendering a wrapper.
     * Enables composition patterns like rendering a button as a link.
     */
    asChild?: boolean;
    children: React__default.ReactNode;
}
/**
 * Slot component for polymorphic composition
 *
 * Allows components to be rendered as different elements while maintaining their props.
 *
 * @example
 * // Default: renders as span
 * <Slot>Content</Slot>
 *
 * @example
 * // asChild: renders as Link, merges props
 * <Slot asChild>
 *   <Link href="/catalog">Browse</Link>
 * </Slot>
 */
declare function Slot({ asChild, children, ...props }: SlotProps): react_jsx_runtime.JSX.Element;

interface VisuallyHiddenProps {
    /**
     * Content to hide visually but keep accessible to screen readers
     */
    children: React$1.ReactNode;
    /**
     * HTML element to render (default: span)
     */
    as?: keyof React$1.JSX.IntrinsicElements;
}
/**
 * VisuallyHidden - Screen reader only content
 *
 * Hides content visually while keeping it accessible to assistive technologies.
 * Uses CSS clip-path technique (not display:none) to ensure screen reader compatibility.
 *
 * @example
 * <button>
 *   <span aria-hidden="true">▶</span>
 *   <VisuallyHidden>Play audio preview</VisuallyHidden>
 * </button>
 *
 * @example
 * // Skip to main content link
 * <VisuallyHidden as="a" href="#main">
 *   Skip to main content
 * </VisuallyHidden>
 */
declare function VisuallyHidden({ children, as }: VisuallyHiddenProps): react_jsx_runtime.JSX.Element;

type Politeness = "polite" | "assertive";
interface AnnouncerContextValue {
    announce: (message: string, politeness?: Politeness) => void;
}
interface AnnouncerProviderProps {
    children: React__default.ReactNode;
}
/**
 * AnnouncerProvider - Manages live region announcements
 *
 * Provides a singleton announcer for programmatic screen reader announcements.
 * Must be placed near the root of your app.
 *
 * @example
 * <AnnouncerProvider>
 *   <App />
 * </AnnouncerProvider>
 */
declare function AnnouncerProvider({ children }: AnnouncerProviderProps): react_jsx_runtime.JSX.Element;
/**
 * useAnnouncer - Hook for programmatic announcements
 *
 * @example
 * const { announce } = useAnnouncer();
 *
 * // Polite announcement (doesn't interrupt)
 * announce("Loading complete");
 *
 * // Assertive announcement (interrupts)
 * announce("Error: Invalid input", "assertive");
 */
declare function useAnnouncer(): AnnouncerContextValue;
interface AnnouncerProps {
    /**
     * Message to announce
     */
    message: string;
    /**
     * Politeness level
     * - "polite": Announce when user is idle (default)
     * - "assertive": Interrupt current speech
     */
    politeness?: Politeness;
    /**
     * Clear announcement after this duration (ms)
     * Default: 5000ms
     */
    clearAfter?: number;
}
/**
 * Announcer - Declarative live region announcement
 *
 * @example
 * // Polite announcement
 * <Announcer message="Loading complete" />
 *
 * @example
 * // Assertive announcement
 * <Announcer message="Error occurred!" politeness="assertive" />
 *
 * @example
 * // Custom clear duration
 * <Announcer message="Saved" clearAfter={3000} />
 */
declare function Announcer({ message, politeness, clearAfter }: AnnouncerProps): null;

/**
 * Generate a unique ID for accessibility attributes
 *
 * Useful for aria-describedby, aria-labelledby, and other ARIA relationships.
 *
 * @param prefix - Optional prefix for the ID
 * @returns A unique ID string
 *
 * @example
 * const hintId = generateId("hint");
 * // → "hint-1", "hint-2", etc.
 *
 * <input aria-describedby={hintId} />
 * <span id={hintId}>Enter your name</span>
 */
declare function generateId(prefix?: string): string;
/**
 * Merge multiple refs into a single ref callback
 *
 * Allows passing multiple refs to a single element, useful when combining
 * forwarded refs with local refs.
 *
 * @param refs - Array of refs to merge
 * @returns A ref callback that updates all provided refs
 *
 * @example
 * const localRef = useRef<HTMLDivElement>(null);
 * const mergedRef = mergeRefs(localRef, forwardedRef);
 *
 * <div ref={mergedRef}>Content</div>
 */
declare function mergeRefs<T>(...refs: Array<React__default.Ref<T> | undefined>): React__default.RefCallback<T>;
/**
 * Check if an element is a valid interactive element
 *
 * @param element - Element to check
 * @returns True if element is interactive (button, link, input, etc.)
 */
declare function isInteractive(element: HTMLElement): boolean;
/**
 * Get the computed accessible name of an element
 *
 * @param element - Element to get name for
 * @returns The accessible name string
 */
declare function getAccessibleName(element: HTMLElement): string;

declare const cardVariants$1: (props?: ({
    variant?: "default" | "elevated" | "outlined" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface CardProps$1 extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants$1> {
}
declare const Card$2: React$1.ForwardRefExoticComponent<CardProps$1 & React$1.RefAttributes<HTMLDivElement>>;

declare const buttonVariants: (props?: ({
    variant?: "link" | "default" | "secondary" | "ghost" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
    loading?: boolean;
}
declare const Button: React$1.ForwardRefExoticComponent<ButtonProps & React$1.RefAttributes<HTMLButtonElement>>;

interface CatalogGridProps extends React$1.HTMLAttributes<HTMLDivElement>, VariantProps<typeof catalogGridVariants> {
    /**
     * Number of columns for different screen sizes
     */
    columns?: {
        default?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
    };
    /**
     * Whether to show loading skeleton
     */
    loading?: boolean;
    /**
     * Number of skeleton items to show when loading
     */
    skeletonCount?: number;
    /**
     * Empty state content
     */
    emptyState?: React$1.ReactNode;
    /**
     * Whether the grid is scrollable
     */
    scrollable?: boolean;
}
declare const catalogGridVariants: (props?: ({
    gap?: "sm" | "md" | "lg" | null | undefined;
    scrollable?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function CatalogGrid({ children, columns, gap, loading, skeletonCount, emptyState, scrollable, className, ...props }: CatalogGridProps): react_jsx_runtime.JSX.Element;
declare function CatalogGridSkeleton({ count, className, }: {
    count?: number;
    className?: string;
}): react_jsx_runtime.JSX.Element;
declare function CatalogGridEmpty({ title, description, action, className, }: {
    title?: string;
    description?: string;
    action?: React$1.ReactNode;
    className?: string;
}): react_jsx_runtime.JSX.Element;

declare const badgeVariants: (props?: ({
    variant?: "success" | "warning" | "danger" | "info" | "neutral" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
}
declare const Badge: React$1.ForwardRefExoticComponent<BadgeProps & React$1.RefAttributes<HTMLDivElement>>;

interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
    onClose?: () => void;
}
declare const Tag: React$1.ForwardRefExoticComponent<TagProps & React$1.RefAttributes<HTMLDivElement>>;

interface WaveformProps extends React.HTMLAttributes<HTMLDivElement> {
    data?: number[];
    bins?: number;
}
declare const Waveform: React$1.ForwardRefExoticComponent<WaveformProps & React$1.RefAttributes<HTMLDivElement>>;

interface PlayerProps extends React.HTMLAttributes<HTMLDivElement> {
    src: string;
    title: string;
    clamp?: number;
    onEnd?: () => void;
    showDownload?: boolean;
}
declare const Player: React$1.ForwardRefExoticComponent<PlayerProps & React$1.RefAttributes<HTMLDivElement>>;

interface MiniPlayerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onVolumeChange"> {
    src: string;
    title: string;
    artist?: string;
    coverUrl?: string;
    isPlaying?: boolean;
    currentTime?: number;
    duration?: number;
    volume?: number;
    isMuted?: boolean;
    isExpanded?: boolean;
    isDocked?: boolean;
    onPlayPause?: () => void;
    onSeek?: (time: number) => void;
    onVolumeChange?: (volume: number) => void;
    onToggleMute?: () => void;
    onToggleExpand?: () => void;
    onClose?: () => void;
}
declare const MiniPlayer: React$1.ForwardRefExoticComponent<MiniPlayerProps & React$1.RefAttributes<HTMLDivElement>>;

interface PlayerControlsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onVolumeChange"> {
    isPlaying?: boolean;
    currentTime?: number;
    duration?: number;
    volume?: number;
    playbackRate?: number;
    isMuted?: boolean;
    isLoading?: boolean;
    hasError?: boolean;
    showDownload?: boolean;
    showSkip?: boolean;
    showSpeed?: boolean;
    onPlayPause?: () => void;
    onSeek?: (time: number) => void;
    onVolumeChange?: (volume: number) => void;
    onToggleMute?: () => void;
    onSkipBack?: () => void;
    onSkipForward?: () => void;
    onSpeedChange?: (rate: number) => void;
    onDownload?: () => void;
}
declare const PlayerControls: React$1.ForwardRefExoticComponent<PlayerControlsProps & React$1.RefAttributes<HTMLDivElement>>;

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
    currentTime?: number;
    duration?: number;
    bufferedTime?: number;
    isLoading?: boolean;
    isBuffering?: boolean;
    hasError?: boolean;
    isInteractive?: boolean;
    showTime?: boolean;
    showBuffered?: boolean;
    onSeek?: (time: number) => void;
    onHover?: (time: number) => void;
    onLeave?: () => void;
}
declare const ProgressBar: React$1.ForwardRefExoticComponent<ProgressBarProps & React$1.RefAttributes<HTMLDivElement>>;

interface CatalogCardProps extends React$1.HTMLAttributes<HTMLDivElement>, VariantProps<typeof catalogCardVariants> {
    id: string;
    title: string;
    producer: string;
    price: string;
    bpm?: number;
    keySig?: string;
    tags?: string[];
    artworkUrl?: string;
    previewUrl?: string;
    onPreviewToggle?: (id: string) => void;
    isPlaying?: boolean;
    onOpen?: (id: string) => void;
}
declare const catalogCardVariants: (props?: ({
    variant?: "default" | "compact" | "minimal" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function CatalogCard({ id, title, producer, price, bpm, keySig, tags, artworkUrl, isPlaying, onPreviewToggle, onOpen, variant, size, className, ...props }: CatalogCardProps): react_jsx_runtime.JSX.Element;

declare const skeletonVariants: (props?: ({
    variant?: "strong" | "default" | "subtle" | null | undefined;
    size?: "sm" | "md" | "lg" | "xl" | null | undefined;
    shape?: "text" | "circle" | "rectangle" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonVariants> {
    lines?: number;
    width?: string | number;
    height?: string | number;
}
declare const Skeleton: React$1.ForwardRefExoticComponent<SkeletonProps & React$1.RefAttributes<HTMLDivElement>>;

declare const fieldVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface FieldProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof fieldVariants> {
    label?: string;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    htmlFor?: string;
}
declare const Field: React$1.ForwardRefExoticComponent<FieldProps & React$1.RefAttributes<HTMLDivElement>>;

declare const inputVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
    variant?: "error" | "default" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">, VariantProps<typeof inputVariants> {
}
declare const Input: React$1.ForwardRefExoticComponent<InputProps & React$1.RefAttributes<HTMLInputElement>>;

declare const selectVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface SelectProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root>, VariantProps<typeof selectVariants> {
    children: React.ReactNode;
    className?: string;
}
declare const Select: React$1.ForwardRefExoticComponent<SelectProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const SelectContent: React$1.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const SelectItem: React$1.ForwardRefExoticComponent<Omit<SelectPrimitive.SelectItemProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

declare const checkboxVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface CheckboxProps extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, "size">, VariantProps<typeof checkboxVariants> {
}
declare const Checkbox: React$1.ForwardRefExoticComponent<CheckboxProps & React$1.RefAttributes<HTMLButtonElement>>;

declare const sliderVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface SliderProps extends Omit<React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>, "size">, VariantProps<typeof sliderVariants> {
}
declare const Slider: React$1.ForwardRefExoticComponent<SliderProps & React$1.RefAttributes<HTMLSpanElement>>;

interface FilterOption {
    value: string;
    label: string;
    count?: number;
}
interface PriceRange$1 {
    min: number;
    max: number;
}
interface CatalogFiltersProps extends React$1.HTMLAttributes<HTMLDivElement>, VariantProps<typeof catalogFiltersVariants> {
    /**
     * Available genres for filtering
     */
    genres?: FilterOption[];
    /**
     * Selected genre values
     */
    selectedGenres?: string[];
    /**
     * Callback when genres change
     */
    onGenresChange?: (genres: string[]) => void;
    /**
     * Available BPM range
     */
    bpmRange?: {
        min: number;
        max: number;
    };
    /**
     * Selected BPM range
     */
    selectedBpmRange?: {
        min: number;
        max: number;
    };
    /**
     * Callback when BPM range changes
     */
    onBpmRangeChange?: (range: {
        min: number;
        max: number;
    }) => void;
    /**
     * Available price range
     */
    priceRange?: PriceRange$1;
    /**
     * Selected price range
     */
    selectedPriceRange?: PriceRange$1;
    /**
     * Callback when price range changes
     */
    onPriceRangeChange?: (range: PriceRange$1) => void;
    /**
     * Available key signatures
     */
    keySignatures?: FilterOption[];
    /**
     * Selected key signatures
     */
    selectedKeySignatures?: string[];
    /**
     * Callback when key signatures change
     */
    onKeySignaturesChange?: (keys: string[]) => void;
    /**
     * Whether filters are loading
     */
    loading?: boolean;
    /**
     * Number of active filters
     */
    activeFilterCount?: number;
    /**
     * Callback to clear all filters
     */
    onClearAll?: () => void;
    /**
     * Whether to show the clear all button
     */
    showClearAll?: boolean;
}
declare const catalogFiltersVariants: (props?: ({
    variant?: "default" | "minimal" | "sidebar" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare function CatalogFilters({ genres, selectedGenres, onGenresChange, bpmRange, selectedBpmRange, onBpmRangeChange, priceRange, selectedPriceRange, onPriceRangeChange, keySignatures, selectedKeySignatures, onKeySignaturesChange, loading, activeFilterCount, onClearAll, showClearAll, variant, size, className, ...props }: CatalogFiltersProps): react_jsx_runtime.JSX.Element;
declare function FilterChip({ label, value, onRemove, className, }: {
    label: string;
    value: string;
    onRemove?: (value: string) => void;
    className?: string;
}): react_jsx_runtime.JSX.Element;
declare function ActiveFilters({ filters, onRemove, onClearAll, className, }: {
    filters: Array<{
        label: string;
        value: string;
        type: string;
    }>;
    onRemove?: (value: string, type: string) => void;
    onClearAll?: () => void;
    className?: string;
}): react_jsx_runtime.JSX.Element | null;

interface FileUploadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "onError" | "onDrop">, VariantProps<typeof fileUploadVariants> {
    /**
     * Accepted file types (MIME types)
     */
    accept?: string;
    /**
     * Maximum file size in bytes
     */
    maxSize?: number;
    /**
     * Maximum number of files
     */
    maxFiles?: number;
    /**
     * Whether multiple files are allowed
     */
    multiple?: boolean;
    /**
     * Whether the upload area is disabled
     */
    disabled?: boolean;
    /**
     * Current files
     */
    files?: File[];
    /**
     * Upload status
     */
    status?: "idle" | "uploading" | "processing" | "success" | "error";
    /**
     * Upload progress (0-100)
     */
    progress?: number;
    /**
     * Error message
     */
    error?: string;
    /**
     * Success message
     */
    success?: string;
    /**
     * Callback when files change
     */
    onChange?: (files: File[]) => void;
    /**
     * Callback when files are dropped
     */
    onDrop?: (files: File[]) => void;
    /**
     * Callback when upload starts
     */
    onUpload?: (files: File[]) => void;
    /**
     * Callback when upload completes
     */
    onComplete?: (files: File[]) => void;
    /**
     * Callback when upload fails
     */
    onError?: (error: string) => void;
}
declare const fileUploadVariants: (props?: ({
    variant?: "error" | "default" | "success" | "minimal" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const FileUpload: React$1.ForwardRefExoticComponent<FileUploadProps & React$1.RefAttributes<HTMLDivElement>>;

interface UploadProgressProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof uploadProgressVariants> {
    /**
     * Upload progress (0-100)
     */
    progress?: number;
    /**
     * Upload status
     */
    status?: "idle" | "uploading" | "processing" | "success" | "error";
    /**
     * File name being uploaded
     */
    fileName?: string;
    /**
     * File size in bytes
     */
    fileSize?: number;
    /**
     * Upload speed in bytes per second
     */
    speed?: number;
    /**
     * Estimated time remaining in seconds
     */
    timeRemaining?: number;
    /**
     * Error message
     */
    error?: string;
    /**
     * Success message
     */
    success?: string;
    /**
     * Whether to show detailed information
     */
    showDetails?: boolean;
    /**
     * Whether to show speed and time estimates
     */
    showEstimates?: boolean;
}
declare const uploadProgressVariants: (props?: ({
    variant?: "default" | "inline" | "minimal" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const UploadProgress: React$1.ForwardRefExoticComponent<UploadProgressProps & React$1.RefAttributes<HTMLDivElement>>;

interface ValidationFeedbackProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof validationFeedbackVariants> {
    /**
     * Validation status
     */
    status?: "valid" | "invalid" | "warning" | "info";
    /**
     * Error messages
     */
    errors?: string[];
    /**
     * Warning messages
     */
    warnings?: string[];
    /**
     * Success messages
     */
    success?: string[];
    /**
     * Info messages
     */
    info?: string[];
    /**
     * Whether to show icons
     */
    showIcons?: boolean;
    /**
     * Whether to show close button
     */
    showClose?: boolean;
    /**
     * Callback when close button is clicked
     */
    onClose?: () => void;
    /**
     * Maximum number of messages to show
     */
    maxMessages?: number;
}
declare const validationFeedbackVariants: (props?: ({
    variant?: "invalid" | "warning" | "info" | "valid" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const ValidationFeedback: React$1.ForwardRefExoticComponent<ValidationFeedbackProps & React$1.RefAttributes<HTMLDivElement>>;

type AssetStatus$1 = "draft" | "processing" | "ready" | "error" | "archived" | "published";
interface AssetTileData {
    id: string;
    title: string;
    artist: string;
    coverUrl?: string;
    status: AssetStatus$1;
    createdAt: Date;
    updatedAt: Date;
    isProcessing?: boolean;
    hasError?: boolean;
    progress?: number;
    errorMessage?: string;
    price?: {
        currency: string;
        amount: number;
    };
    duration?: number;
    bpm?: number;
    key?: string;
    publishedAt?: Date;
    archivedAt?: Date;
    sales?: number;
    views?: number;
}
interface AssetTileProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick" | "onSelect">, VariantProps<typeof assetTileVariants> {
    asset: AssetTileData;
    isSelected?: boolean;
    showActions?: boolean;
    disabled?: boolean;
    onSelect?: (id: string) => void;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    onPublish?: (id: string) => void;
    onArchive?: (id: string) => void;
    onUnarchive?: (id: string) => void;
    onDuplicate?: (id: string) => void;
}
declare const assetTileVariants: (props?: ({
    variant?: "disabled" | "selected" | "default" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const AssetTile: React$1.ForwardRefExoticComponent<AssetTileProps & React$1.RefAttributes<HTMLDivElement>>;

type AssetStatusType = "draft" | "processing" | "ready" | "error" | "archived" | "published";
interface AssetStatusProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof assetStatusVariants> {
    status: AssetStatusType;
    showIcon?: boolean;
    showLabel?: boolean;
    isProcessing?: boolean;
    progress?: number;
    errorMessage?: string;
}
declare const assetStatusVariants: (props?: ({
    variant?: "default" | "success" | "warning" | "destructive" | "muted" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const AssetStatus: React$1.ForwardRefExoticComponent<AssetStatusProps & React$1.RefAttributes<HTMLDivElement>>;

interface AssetMetadata {
    title: string;
    artist: string;
    bpm: number;
    key: string;
    genre: string;
    mood: string;
    tags: string[];
    description: string;
    duration: number;
    fileSize: number;
    sampleRate: number;
    bitDepth: number;
    channels: number;
    tempo?: number;
    timeSignature?: string;
    energy?: number;
    valence?: number;
}
interface MetadataPanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">, VariantProps<typeof metadataPanelVariants> {
    metadata: AssetMetadata;
    isEditing?: boolean;
    isSaving?: boolean;
    hasError?: boolean;
    errorMessage?: string;
    validationErrors?: Record<string, string[]>;
    onChange?: (metadata: AssetMetadata) => void;
    onSave?: (metadata: AssetMetadata) => void;
    onCancel?: () => void;
    onEdit?: () => void;
}
declare const metadataPanelVariants: (props?: ({
    variant?: "error" | "default" | "editing" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const MetadataPanel: React$1.ForwardRefExoticComponent<MetadataPanelProps & React$1.RefAttributes<HTMLDivElement>>;

type AssetActionType = "edit" | "delete" | "publish" | "archive" | "unarchive" | "duplicate";
interface AssetAction {
    type: AssetActionType;
    label: string;
    icon: React.ComponentType<{
        className?: string;
    }>;
    isDestructive?: boolean;
    isDisabled?: boolean;
    onClick: () => void;
}
interface AssetActionsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onToggle">, VariantProps<typeof assetActionsVariants> {
    actions: AssetAction[];
    isOpen?: boolean;
    onToggle?: (isOpen: boolean) => void;
    trigger?: React.ReactNode;
    placement?: "top" | "bottom" | "left" | "right";
    align?: "start" | "center" | "end";
}
declare const assetActionsVariants: (props?: ({
    variant?: "default" | "compact" | "minimal" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const AssetActions: React$1.ForwardRefExoticComponent<AssetActionsProps & React$1.RefAttributes<HTMLDivElement>>;

interface AssetPreviewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onVolumeChange">, VariantProps<typeof assetPreviewVariants> {
    asset: {
        id: string;
        title: string;
        artist: string;
        coverUrl?: string;
        duration?: number;
        waveform?: number[];
        isPlaying?: boolean;
        currentTime?: number;
        volume?: number;
        isMuted?: boolean;
    };
    onPlay?: () => void;
    onPause?: () => void;
    onSeek?: (time: number) => void;
    onVolumeChange?: (volume: number) => void;
    onMute?: () => void;
    onUnmute?: () => void;
}
declare const assetPreviewVariants: (props?: ({
    variant?: "default" | "compact" | "detailed" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const AssetPreview: React$1.ForwardRefExoticComponent<AssetPreviewProps & React$1.RefAttributes<HTMLDivElement>>;

interface PriceInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "size">, VariantProps<typeof priceInputVariants> {
    value?: number | null;
    currency?: string;
    locale?: string;
    onChange?: (value: number | null) => void;
    onCurrencyChange?: (currency: string) => void;
    showCurrency?: boolean;
    allowNegative?: boolean;
    precision?: number;
}
declare const priceInputVariants: (props?: ({
    variant?: "error" | "default" | "success" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const PriceInput: React$1.ForwardRefExoticComponent<PriceInputProps & React$1.RefAttributes<HTMLInputElement>>;

interface CurrencyOption {
    code: string;
    name: string;
    symbol: string;
    flag?: string;
}
interface CurrencySelectorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">, VariantProps<typeof currencySelectorVariants> {
    value?: string;
    onChange?: (currency: string) => void;
    options?: CurrencyOption[];
    showFlag?: boolean;
    showName?: boolean;
    disabled?: boolean;
}
declare const currencySelectorVariants: (props?: ({
    variant?: "error" | "default" | "success" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const CurrencySelector: React$1.ForwardRefExoticComponent<CurrencySelectorProps & React$1.RefAttributes<HTMLDivElement>>;

interface PriceValidationRule {
    type: "min" | "max" | "step" | "custom";
    value?: number;
    message: string;
    validator?: (value: number) => boolean;
}
interface PriceValidatorProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof priceValidatorVariants> {
    value: number | null;
    rules: PriceValidationRule[];
    showIcon?: boolean;
    showMessage?: boolean;
    inline?: boolean;
}
declare const priceValidatorVariants: (props?: ({
    variant?: "error" | "default" | "success" | "warning" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const PriceValidator: React$1.ForwardRefExoticComponent<PriceValidatorProps & React$1.RefAttributes<HTMLDivElement>>;

interface PriceRangeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">, VariantProps<typeof priceRangeVariants> {
    min?: number;
    max?: number;
    value?: [number, number];
    onChange?: (range: [number, number]) => void;
    step?: number;
    currency?: string;
    locale?: string;
    showLabels?: boolean;
    showValues?: boolean;
    disabled?: boolean;
}
declare const priceRangeVariants: (props?: ({
    variant?: "default" | "muted" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
declare const PriceRange: React$1.ForwardRefExoticComponent<PriceRangeProps & React$1.RefAttributes<HTMLDivElement>>;

declare const featureFlagVariants: (props?: ({
    status?: "disabled" | "enabled" | "experimental" | "deprecated" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface FeatureFlagProps extends Omit<React__default.HTMLAttributes<HTMLDivElement>, "onToggle">, VariantProps<typeof featureFlagVariants> {
    name: string;
    description?: string;
    enabled?: boolean;
    experimental?: boolean;
    deprecated?: boolean;
    onToggle?: (enabled: boolean) => void;
    showToggle?: boolean;
}
declare const FeatureFlag: React__default.ForwardRefExoticComponent<FeatureFlagProps & React__default.RefAttributes<HTMLDivElement>>;

declare const auditLogVariants: (props?: ({
    action?: "error" | "delete" | "create" | "update" | "login" | "logout" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface AuditLogEntry {
    id: string;
    timestamp: Date;
    action: "create" | "update" | "delete" | "login" | "logout" | "error";
    resource: string;
    userId: string;
    userName: string;
    details?: string;
    ipAddress?: string;
    userAgent?: string;
}
interface AuditLogProps extends React__default.HTMLAttributes<HTMLDivElement>, VariantProps<typeof auditLogVariants> {
    entries: AuditLogEntry[];
    loading?: boolean;
    emptyMessage?: string;
    showUserInfo?: boolean;
    showTechnicalDetails?: boolean;
    onEntryClick?: (entry: AuditLogEntry) => void;
    maxHeight?: string;
}
declare const AuditLog: React__default.ForwardRefExoticComponent<AuditLogProps & React__default.RefAttributes<HTMLDivElement>>;

declare const healthStatusVariants: (props?: ({
    status?: "warning" | "healthy" | "critical" | "unknown" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface HealthCheck {
    id: string;
    name: string;
    status: "healthy" | "warning" | "critical" | "unknown";
    message?: string;
    lastChecked: Date;
    responseTime?: number;
    details?: Record<string, unknown>;
}
interface HealthStatusProps extends React__default.HTMLAttributes<HTMLDivElement>, VariantProps<typeof healthStatusVariants> {
    checks: HealthCheck[];
    overallStatus?: "healthy" | "warning" | "critical" | "unknown";
    lastUpdated?: Date;
    autoRefresh?: boolean;
    refreshInterval?: number;
    onRefresh?: () => void;
    showResponseTime?: boolean;
    showLastChecked?: boolean;
    compact?: boolean;
}
declare const HealthStatus: React__default.ForwardRefExoticComponent<HealthStatusProps & React__default.RefAttributes<HTMLDivElement>>;

declare const userRoleVariants: (props?: ({
    role?: "user" | "admin" | "moderator" | "guest" | "banned" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface UserRoleProps extends Omit<React__default.HTMLAttributes<HTMLDivElement>, "onChange" | "role">, VariantProps<typeof userRoleVariants> {
    role: "admin" | "moderator" | "user" | "guest" | "banned";
    displayName?: string;
    description?: string;
    editable?: boolean;
    onChange?: (newRole: UserRoleProps["role"]) => void;
    showDescription?: boolean;
    showIcon?: boolean;
}
declare const UserRole: React__default.ForwardRefExoticComponent<UserRoleProps & React__default.RefAttributes<HTMLDivElement>>;

declare const permissionVariants: (props?: ({
    permission?: "unknown" | "granted" | "denied" | "inherited" | "conditional" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface Permission {
    id: string;
    name: string;
    description: string;
    category: string;
    level: "read" | "write" | "admin" | "system";
}
interface RolePermission {
    roleId: string;
    permissionId: string;
    status: "granted" | "denied" | "inherited" | "conditional" | "unknown";
    grantedBy?: string;
    grantedAt?: Date;
    expiresAt?: Date;
}
interface PermissionMatrixProps extends React__default.HTMLAttributes<HTMLDivElement>, VariantProps<typeof permissionVariants> {
    permissions: Permission[];
    rolePermissions: RolePermission[];
    roles: Array<{
        id: string;
        name: string;
        color?: string;
    }>;
    selectedRole?: string;
    onPermissionChange?: (roleId: string, permissionId: string, status: RolePermission["status"]) => void;
    showDescriptions?: boolean;
    showCategories?: boolean;
    compact?: boolean;
    editable?: boolean;
}
declare const PermissionMatrix: React__default.ForwardRefExoticComponent<PermissionMatrixProps & React__default.RefAttributes<HTMLDivElement>>;

declare const userStatusVariants: (props?: ({
    status?: "active" | "inactive" | "banned" | "pending" | "suspended" | "offline" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface UserStatusProps extends Omit<React__default.HTMLAttributes<HTMLDivElement>, "onChange">, VariantProps<typeof userStatusVariants> {
    status: "active" | "inactive" | "pending" | "suspended" | "banned" | "offline";
    displayName?: string;
    description?: string;
    lastSeen?: Date;
    showLastSeen?: boolean;
    showDescription?: boolean;
    showIcon?: boolean;
    editable?: boolean;
    onChange?: (newStatus: UserStatusProps["status"]) => void;
    compact?: boolean;
}
declare const UserStatus: React__default.ForwardRefExoticComponent<UserStatusProps & React__default.RefAttributes<HTMLDivElement>>;

declare const cardVariants: (props?: ({
    variant?: "disabled" | "default" | "elevated" | "interactive" | null | undefined;
    padding?: "none" | "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface CardProps extends Omit<React__default.HTMLAttributes<HTMLDivElement>, "onClick">, VariantProps<typeof cardVariants> {
    onClick?: () => void;
    disabled?: boolean;
}
declare const Card$1: React__default.ForwardRefExoticComponent<CardProps & React__default.RefAttributes<HTMLDivElement>>;
declare const CardHeader: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLDivElement> & React__default.RefAttributes<HTMLDivElement>>;
declare const CardTitle$1: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLHeadingElement> & React__default.RefAttributes<HTMLParagraphElement>>;
declare const CardDescription: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLParagraphElement> & React__default.RefAttributes<HTMLParagraphElement>>;
declare const CardContent: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLDivElement> & React__default.RefAttributes<HTMLDivElement>>;
declare const CardFooter: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLDivElement> & React__default.RefAttributes<HTMLDivElement>>;

interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

declare const toastVariants: (props?: ({
    variant?: "error" | "success" | "warning" | "info" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ToastProps extends Omit<React__default.HTMLAttributes<HTMLDivElement>, "onClose">, VariantProps<typeof toastVariants> {
    title?: string;
    description?: string;
    onClose?: () => void;
    autoClose?: boolean;
    duration?: number;
    persistent?: boolean;
    icon?: React__default.ReactNode;
    action?: React__default.ReactNode;
}
declare const Toast: React__default.ForwardRefExoticComponent<ToastProps & React__default.RefAttributes<HTMLDivElement>>;

declare const modalVariants: (props?: ({
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "fullscreen" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ModalProps extends Omit<React__default.HTMLAttributes<HTMLDivElement>, "onClose">, VariantProps<typeof modalVariants> {
    open?: boolean;
    onClose?: () => void;
    title?: string;
    description?: string;
    showCloseButton?: boolean;
    closeOnBackdropClick?: boolean;
    closeOnEscape?: boolean;
}
declare const Modal: React__default.ForwardRefExoticComponent<ModalProps & React__default.RefAttributes<HTMLDivElement>>;

declare const alertVariants: (props?: ({
    variant?: "error" | "success" | "warning" | "info" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface AlertProps extends Omit<React__default.HTMLAttributes<HTMLDivElement>, "onClose">, VariantProps<typeof alertVariants> {
    title?: string;
    description?: string;
    onClose?: () => void;
    dismissible?: boolean;
    icon?: React__default.ReactNode;
    action?: React__default.ReactNode;
}
declare const Alert: React__default.ForwardRefExoticComponent<AlertProps & React__default.RefAttributes<HTMLDivElement>>;

declare const bannerVariants: (props?: ({
    variant?: "warning" | "announcement" | "maintenance" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface BannerProps extends Omit<React__default.HTMLAttributes<HTMLDivElement>, "onClose">, VariantProps<typeof bannerVariants> {
    title?: string;
    description?: string;
    onClose?: () => void;
    dismissible?: boolean;
    icon?: React__default.ReactNode;
    action?: React__default.ReactNode;
    link?: {
        href: string;
        text: string;
    };
}
declare const Banner: React__default.ForwardRefExoticComponent<BannerProps & React__default.RefAttributes<HTMLDivElement>>;

declare const emptyStateVariants: (props?: ({
    variant?: "error" | "loading" | "success" | "no-data" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface EmptyStateProps extends Omit<React__default.HTMLAttributes<HTMLDivElement>, "onAction">, VariantProps<typeof emptyStateVariants> {
    title?: string;
    description?: string;
    icon?: React__default.ReactNode;
    action?: {
        label: string;
        onClick: () => void;
    };
    secondaryAction?: {
        label: string;
        onClick: () => void;
    };
}
declare const EmptyState: React__default.ForwardRefExoticComponent<EmptyStateProps & React__default.RefAttributes<HTMLDivElement>>;

declare const buyButtonVariants: (props?: ({
    variant?: "secondary" | "success" | "danger" | "primary" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
    state?: "error" | "disabled" | "success" | "idle" | "processing" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface BuyButtonProps extends Omit<React__default.ButtonHTMLAttributes<HTMLButtonElement>, "onClick">, VariantProps<typeof buyButtonVariants> {
    price?: string;
    currency?: string;
    loading?: boolean;
    success?: boolean;
    error?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    leftIcon?: React__default.ReactNode;
    rightIcon?: React__default.ReactNode;
}
declare const BuyButton: React__default.ForwardRefExoticComponent<BuyButtonProps & React__default.RefAttributes<HTMLButtonElement>>;

declare const priceDisplayVariants: (props?: ({
    variant?: "error" | "default" | "success" | "warning" | "muted" | null | undefined;
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | null | undefined;
    weight?: "bold" | "normal" | "medium" | "semibold" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface PriceDisplayProps extends Omit<React__default.HTMLAttributes<HTMLDivElement>, "children">, VariantProps<typeof priceDisplayVariants> {
    amount: number;
    currency?: string;
    locale?: string;
    showCurrency?: boolean;
    originalPrice?: number;
    discount?: number;
    discountPercentage?: number;
    showDiscount?: boolean;
    prefix?: string;
    suffix?: string;
    formatOptions?: Intl.NumberFormatOptions;
}
declare const PriceDisplay: React__default.ForwardRefExoticComponent<PriceDisplayProps & React__default.RefAttributes<HTMLDivElement>>;

declare const checkoutCTAVariants: (props?: ({
    variant?: "secondary" | "ghost" | "primary" | "outline" | null | undefined;
    size?: "sm" | "md" | "lg" | "xl" | null | undefined;
    checkoutType?: "single" | "cart" | "subscription" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface CheckoutCTAProps extends Omit<React__default.ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "type">, VariantProps<typeof checkoutCTAVariants> {
    checkoutType: "single" | "cart" | "subscription";
    totalAmount?: number;
    currency?: string;
    itemCount?: number;
    loading?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    leftIcon?: React__default.ReactNode;
    rightIcon?: React__default.ReactNode;
}
declare const CheckoutCTA: React__default.ForwardRefExoticComponent<CheckoutCTAProps & React__default.RefAttributes<HTMLButtonElement>>;

declare const paymentMethodVariants: (props?: ({
    variant?: "card" | "crypto" | "wallet" | null | undefined;
    selected?: boolean | null | undefined;
    disabled?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface PaymentMethodProps extends Omit<React__default.HTMLAttributes<HTMLDivElement>, "onClick">, VariantProps<typeof paymentMethodVariants> {
    type: "card" | "crypto" | "wallet";
    name: string;
    description?: string;
    icon?: React__default.ReactNode;
    selected?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    onSelect?: () => void;
}
declare const PaymentMethod: React__default.ForwardRefExoticComponent<PaymentMethodProps & React__default.RefAttributes<HTMLDivElement>>;

declare const receiptPanelVariants: (props?: ({
    variant?: "error" | "success" | "pending" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ReceiptPanelProps extends Omit<React__default.HTMLAttributes<HTMLDivElement>, "children">, VariantProps<typeof receiptPanelVariants> {
    status: "success" | "error" | "pending";
    transactionId?: string;
    amount?: number;
    currency?: string;
    description?: string;
    timestamp?: Date;
    paymentMethod?: string;
    onRetry?: () => void;
    onDownload?: () => void;
    onShare?: () => void;
}
declare const ReceiptPanel: React__default.ForwardRefExoticComponent<ReceiptPanelProps & React__default.RefAttributes<HTMLDivElement>>;

declare function Card({ className, children }: React__default.PropsWithChildren<{
    className?: string;
}>): react_jsx_runtime.JSX.Element;
declare function CardTitle({ children }: React__default.PropsWithChildren): react_jsx_runtime.JSX.Element;
declare function CardMeta({ children }: React__default.PropsWithChildren): react_jsx_runtime.JSX.Element;

export { ActiveFilters, Alert, type AlertProps, Announcer, type AnnouncerProps, AnnouncerProvider, type AssetAction, type AssetActionType, AssetActions, type AssetActionsProps, type AssetMetadata, AssetPreview, type AssetPreviewProps, AssetStatus, type AssetStatusProps, type AssetStatusType, AssetTile, type AssetTileProps, AuditLog, type AuditLogEntry, type AuditLogProps, Badge, type BadgeProps, Banner, type BannerProps, Button, type ButtonProps, BuyButton, type BuyButtonProps, Card$2 as Card, CardContent, CardDescription, CardFooter, CardHeader, CardMeta, type CardProps$1 as CardProps, CardTitle, CatalogCard, type CatalogCardProps, CatalogFilters, type CatalogFiltersProps, CatalogGrid, CatalogGridEmpty, type CatalogGridProps, CatalogGridSkeleton, Checkbox, type CheckboxProps, CheckoutCTA, type CheckoutCTAProps, Card$1 as CoreCard, type CardProps as CoreCardProps, CardTitle$1 as CoreCardTitle, type CurrencyOption, CurrencySelector, type CurrencySelectorProps, EmptyState, type EmptyStateProps, FeatureFlag, type FeatureFlagProps, Field, type FieldProps, FileUpload, type FileUploadProps, FilterChip, type FilterOption, type HealthCheck, HealthStatus, type HealthStatusProps, Input, type InputProps, Card as LegacyCard, MetadataPanel, type MetadataPanelProps, MiniPlayer, type MiniPlayerProps, Modal, type ModalProps, PaymentMethod, type PaymentMethodProps, type Permission, PermissionMatrix, type PermissionMatrixProps, Player, PlayerControls, type PlayerControlsProps, type PlayerProps, type Politeness, PriceDisplay, type PriceDisplayProps, PriceInput, type PriceInputProps, PriceRange, type PriceRangeProps, type PriceValidationRule, PriceValidator, type PriceValidatorProps, ProgressBar, type ProgressBarProps, ReceiptPanel, type ReceiptPanelProps, type RolePermission, Select, SelectContent, SelectItem, type SelectOption, type SelectProps, Skeleton, type SkeletonProps, Slider, type SliderProps, Slot, type SlotProps, Tag, type TagProps, Toast, type ToastProps, UploadProgress, type UploadProgressProps, UserRole, type UserRoleProps, UserStatus, type UserStatusProps, ValidationFeedback, type ValidationFeedbackProps, VisuallyHidden, type VisuallyHiddenProps, Waveform, type WaveformProps, generateId, getAccessibleName, isInteractive, mergeRefs, useAnnouncer };
