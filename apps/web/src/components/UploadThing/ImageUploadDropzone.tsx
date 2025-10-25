"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import { useState } from "react";
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface ImageUploadDropzoneProps {
  onUploadComplete?: (result: any) => void;
  onUploadError?: (error: Error) => void;
  className?: string;
  maxFiles?: number;
  purpose?: "cover" | "thumbnail" | "waveform";
}

export function ImageUploadDropzone({ 
  onUploadComplete, 
  onUploadError,
  className = "",
  maxFiles = 1,
  purpose = "cover"
}: ImageUploadDropzoneProps) {
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [uploadMessage, setUploadMessage] = useState<string>("");

  const handleUploadComplete = (result: any) => {
    setUploadStatus("success");
    setUploadMessage(`${purpose} image uploaded successfully!`);
    onUploadComplete?.(result);
  };

  const handleUploadError = (error: Error) => {
    setUploadStatus("error");
    setUploadMessage(`Upload failed: ${error.message}`);
    onUploadError?.(error);
  };

  const handleUploadBegin = () => {
    setUploadStatus("uploading");
    setUploadMessage(`Uploading ${purpose} image...`);
  };

  const getEndpoint = () => {
    switch (purpose) {
      case "waveform":
        return "waveformUploader";
      default:
        return "imageUploader";
    }
  };

  const getDescription = () => {
    switch (purpose) {
      case "cover":
        return "Upload cover art for your track. Recommended: 1024x1024px";
      case "thumbnail":
        return "Upload a thumbnail image. Recommended: 300x300px";
      case "waveform":
        return "Upload a waveform visualization. Recommended: 1024x256px";
      default:
        return "Upload an image file";
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="glass-neumorphic-card p-6">
        <h3 className="text-lg font-semibold text-fg-default mb-2">
          Upload {purpose.charAt(0).toUpperCase() + purpose.slice(1)} Image
        </h3>
        <p className="text-sm text-fg-muted mb-4">
          {getDescription()}
        </p>
        
        <UploadDropzone
          endpoint={getEndpoint()}
          onClientUploadComplete={handleUploadComplete}
          onUploadError={handleUploadError}
          onUploadBegin={handleUploadBegin}
          appearance={{
            container: "glass-neumorphic rounded-xl border-2 border-dashed border-brand-accent/30 hover:border-brand-accent/50 transition-colors",
            uploadIcon: "text-brand-accent",
            label: "text-fg-default font-medium",
            allowedContent: "text-fg-muted text-sm",
            button: "glass-neumorphic-button mt-4",
          }}
        />
      </div>

      {/* Upload Status */}
      {uploadStatus !== "idle" && (
        <div className={`glass-neumorphic-card p-4 ${
          uploadStatus === "success" ? "border-semantic-success" : 
          uploadStatus === "error" ? "border-semantic-danger" : 
          "border-brand-accent"
        }`}>
          <div className="flex items-center gap-3">
            {uploadStatus === "success" && (
              <CheckCircleIcon className="w-5 h-5 text-semantic-success" />
            )}
            {uploadStatus === "error" && (
              <ExclamationTriangleIcon className="w-5 h-5 text-semantic-danger" />
            )}
            {uploadStatus === "uploading" && (
              <div className="w-5 h-5 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
            )}
            <span className={`text-sm font-medium ${
              uploadStatus === "success" ? "text-semantic-success" :
              uploadStatus === "error" ? "text-semantic-danger" :
              "text-brand-accent"
            }`}>
              {uploadMessage}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
