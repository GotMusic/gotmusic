export { Theme, ThemeProvider, useTheme } from './theme/index.js';
export { cn } from './utils/index.js';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import * as React$1 from 'react';
import React__default from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
export { Activity as Bpm, ChevronRight, Download, Music2 as KeySig, Music, Pause, Play, Loader2 as Spinner, Tag as TagIcon, Volume2 as Volume, VolumeX as VolumeMute, Play as Wave } from 'lucide-react';
import 'clsx';

declare const buttonVariants: (props?: ({
    variant?: "primary" | "secondary" | "danger" | "ghost" | "outline" | null | undefined;
    size?: "sm" | "md" | "lg" | "icon" | null | undefined;
    loading?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonProps extends React__default.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    loading?: boolean;
    leftIcon?: React__default.ReactNode;
    rightIcon?: React__default.ReactNode;
}
declare const Button: React__default.ForwardRefExoticComponent<ButtonProps & React__default.RefAttributes<HTMLButtonElement>>;

declare const cardVariants: (props?: ({
    variant?: "disabled" | "glass" | "neumorphic" | "hybrid" | "music" | "waveform" | "interactive" | null | undefined;
    size?: "sm" | "md" | "lg" | "xs" | "xl" | null | undefined;
    glow?: "none" | "soft" | "medium" | "strong" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface CardProps extends Omit<React__default.HTMLAttributes<HTMLDivElement>, "onClick">, VariantProps<typeof cardVariants> {
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    animated?: boolean;
}
declare const Card: React__default.ForwardRefExoticComponent<CardProps & React__default.RefAttributes<HTMLDivElement>>;
declare const CardHeader: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLDivElement> & React__default.RefAttributes<HTMLDivElement>>;
declare const CardTitle: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLHeadingElement> & React__default.RefAttributes<HTMLParagraphElement>>;
declare const CardDescription: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLParagraphElement> & React__default.RefAttributes<HTMLParagraphElement>>;
declare const CardContent: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLDivElement> & React__default.RefAttributes<HTMLDivElement>>;
declare const CardFooter: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLDivElement> & React__default.RefAttributes<HTMLDivElement>>;
declare const CardIcon: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLDivElement> & React__default.RefAttributes<HTMLDivElement>>;
declare const CardBadge: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLSpanElement> & React__default.RefAttributes<HTMLSpanElement>>;

declare const inputVariants: (props?: ({
    variant?: "default" | "error" | "success" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface InputProps extends Omit<React__default.InputHTMLAttributes<HTMLInputElement>, "size">, VariantProps<typeof inputVariants> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React__default.ReactNode;
    rightIcon?: React__default.ReactNode;
}
declare const Input: React__default.ForwardRefExoticComponent<InputProps & React__default.RefAttributes<HTMLInputElement>>;

declare const selectVariants: (props?: ({
    variant?: "default" | "error" | "success" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}
interface SelectProps extends Omit<React__default.SelectHTMLAttributes<HTMLSelectElement>, "size">, VariantProps<typeof selectVariants> {
    label?: string;
    error?: string;
    helperText?: string;
    placeholder?: string;
    options: SelectOption[];
    leftIcon?: React__default.ReactNode;
    rightIcon?: React__default.ReactNode;
}
declare const Select: React__default.ForwardRefExoticComponent<SelectProps & React__default.RefAttributes<HTMLSelectElement>>;

declare const checkboxVariants: (props?: ({
    size?: "sm" | "md" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface CheckboxProps extends Omit<React__default.InputHTMLAttributes<HTMLInputElement>, "size" | "type">, VariantProps<typeof checkboxVariants> {
    label?: string;
    error?: string;
    helperText?: string;
    indeterminate?: boolean;
}
declare const Checkbox: React__default.ForwardRefExoticComponent<CheckboxProps & React__default.RefAttributes<HTMLInputElement>>;

interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
    onClose?: () => void;
}
declare const Tag: React$1.ForwardRefExoticComponent<TagProps & React$1.RefAttributes<HTMLDivElement>>;

interface PlayerProps extends React.HTMLAttributes<HTMLDivElement> {
    src: string;
    title: string;
    clamp?: number;
    onEnd?: () => void;
    showDownload?: boolean;
}
declare const Player: React$1.ForwardRefExoticComponent<PlayerProps & React$1.RefAttributes<HTMLDivElement>>;

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
declare function CatalogCard({ id, title, producer, price, bpm, keySig, tags, artworkUrl, previewUrl, // Extract but don't use
isPlaying, onPreviewToggle, onOpen, variant, size, className, ...props }: CatalogCardProps): react_jsx_runtime.JSX.Element;

export { Button, type ButtonProps, Card, CardBadge, CardContent, CardDescription, CardFooter, CardHeader, CardIcon, type CardProps, CardTitle, CatalogCard, type CatalogCardProps, Checkbox, type CheckboxProps, Input, type InputProps, Player, type PlayerProps, Select, type SelectProps, Tag, type TagProps };
