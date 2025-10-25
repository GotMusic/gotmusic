"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import { useState } from "react";
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface AudioUploadDropzoneProps {
  onUploadComplete?: (result: any) => void;
  onUploadError?: (error: Error) => void;
  className?: string;
}

export function AudioUploadDropzone({ 
  onUploadComplete, 
  onUploadError,
  className = ""
}: AudioUploadDropzoneProps) {
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [uploadMessage, setUploadMessage] = useState<string>("");

  const handleUploadComplete = (result: any) => {
    setUploadStatus("success");
    setUploadMessage(`Audio uploaded successfully! Asset ID: ${result[0]?.assetId || "Unknown"}`);
    onUploadComplete?.(result);
    
    // Auto-redirect to assets page after 2 seconds
    setTimeout(() => {
      window.location.href = '/studio/assets';
    }, 2000);
  };

  const handleUploadError = (error: Error) => {
    setUploadStatus("error");
    setUploadMessage(`Upload failed: ${error.message}`);
    onUploadError?.(error);
  };

  const handleUploadBegin = () => {
    setUploadStatus("uploading");
    setUploadMessage("Uploading audio file...");
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="glass-neumorphic-card p-6">
        <h3 className="text-lg font-semibold text-fg-default mb-2">
          Upload Audio File
        </h3>
        <p className="text-sm text-fg-muted mb-4">
          Upload your music track, sample, or loop. Supported formats: WAV, AIFF, MP3, FLAC, OGG
        </p>
        
        <UploadDropzone
          endpoint="audioUploader"
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
          <div className="flex items-center justify-between">
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
            {uploadStatus === "success" && (
              <a 
                href="/studio/assets"
                className="glass-neumorphic-button px-3 py-1 text-xs"
              >
                View Assets →
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
