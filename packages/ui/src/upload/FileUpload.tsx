"use client";

import { forwardRef, useCallback, useState } from "react";
import { AlertCircle, CheckCircle, File, Music, Upload, X } from "../icons";
import { type VariantProps, cn, cva } from "../utils";

export interface FileUploadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "onError" | "onDrop">,
    VariantProps<typeof fileUploadVariants> {
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

const fileUploadVariants = cva(
  "relative flex flex-col items-center justify-center border-2 border-dashed rounded-lg transition-all duration-200 focus-within:outline-none focus-within:ring-2 focus-within:ring-brand-ring focus-within:ring-offset-2 focus-within:ring-offset-bg-default",
  {
    variants: {
      variant: {
        default:
          "border-border-subtle bg-bg-elevated hover:border-brand-primary hover:bg-brand-primary/5",
        minimal: "border-border-muted bg-transparent hover:border-border-subtle hover:bg-bg-muted",
        success: "border-semantic-success bg-semantic-success/5 hover:border-semantic-success",
        error: "border-semantic-danger bg-semantic-danger/5 hover:border-semantic-danger",
      },
      size: {
        sm: "p-4 min-h-[120px]",
        md: "p-6 min-h-[160px]",
        lg: "p-8 min-h-[200px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      className,
      accept = "audio/*",
      maxSize = 50 * 1024 * 1024, // 50MB default
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
    },
    ref,
  ) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const validateFile = useCallback(
      (file: File): string[] => {
        const errors: string[] = [];

        // Check file size
        if (file.size > maxSize) {
          errors.push(`File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`);
        }

        // Check file type
        if (accept && !accept.split(",").some((type) => file.type.match(type.replace("*", ".*")))) {
          errors.push(`File type must be one of: ${accept}`);
        }

        return errors;
      },
      [accept, maxSize],
    );

    const handleFiles = useCallback(
      (newFiles: FileList | File[]) => {
        if (disabled) return;

        const fileArray = Array.from(newFiles);
        const errors: string[] = [];

        // Validate each file
        for (const file of fileArray) {
          const fileErrors = validateFile(file);
          errors.push(...fileErrors);
        }

        // Check file count
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
      [disabled, files, maxFiles, multiple, onChange, onDrop, onError, validateFile],
    );

    const handleDragOver = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
          setIsDragOver(true);
        }
      },
      [disabled],
    );

    const handleDragLeave = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
    }, []);

    const handleDrop = useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);

        if (disabled) return;

        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length > 0) {
          handleFiles(droppedFiles);
        }
      },
      [disabled, handleFiles],
    );

    const handleFileInput = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles && selectedFiles.length > 0) {
          handleFiles(selectedFiles);
        }
      },
      [handleFiles],
    );

    const removeFile = useCallback(
      (index: number) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        onChange?.(updatedFiles);
      },
      [files, onChange],
    );

    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
    };

    const getStatusIcon = () => {
      switch (status) {
        case "success":
          return <CheckCircle className="h-8 w-8 text-semantic-success" />;
        case "error":
          return <AlertCircle className="h-8 w-8 text-semantic-danger" />;
        case "uploading":
        case "processing":
          return (
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-primary border-t-transparent" />
          );
        default:
          return <Upload className="h-8 w-8 text-fg-muted" />;
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

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {/* Upload Area */}
        <div
          className={cn(fileUploadVariants({ variant: getVariant(), size }), {
            "opacity-50 cursor-not-allowed": disabled,
            "cursor-pointer": !disabled,
            "border-brand-primary bg-brand-primary/10": isDragOver && !disabled,
          })}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            aria-label="File upload input"
          />

          <div className="flex flex-col items-center gap-3 text-center">
            {getStatusIcon()}
            <div className="space-y-1">
              <p className="text-sm font-medium text-fg-default">{getStatusMessage()}</p>
              <p className="text-xs text-fg-muted">
                {accept.includes("audio") ? "Audio files" : "Files"} up to{" "}
                {Math.round(maxSize / 1024 / 1024)}MB
              </p>
            </div>

            {/* Progress Bar */}
            {status === "uploading" && (
              <div className="w-full max-w-xs">
                <div className="h-2 bg-bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-primary transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center gap-3 p-3 bg-bg-elevated border border-border-subtle rounded-lg"
              >
                <div className="flex-shrink-0">
                  {file.type.startsWith("audio/") ? (
                    <Music className="h-5 w-5 text-brand-primary" />
                  ) : (
                    <File className="h-5 w-5 text-fg-muted" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-fg-default truncate">{file.name}</p>
                  <p className="text-xs text-fg-muted">{formatFileSize(file.size)}</p>
                </div>
                {!disabled && (
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="flex-shrink-0 p-1 text-fg-muted hover:text-fg-default transition-colors"
                    aria-label={`Remove ${file.name}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <div className="mt-3 space-y-1">
            {validationErrors.map((error, index) => (
              <p
                key={`error-${index}-${error.slice(0, 10)}`}
                className="text-sm text-semantic-danger"
              >
                {error}
              </p>
            ))}
          </div>
        )}
      </div>
    );
  },
);

FileUpload.displayName = "FileUpload";

export { FileUpload };
