// Allowed image types and size limits
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png", 
  "image/webp",
  "image/avif",
] as const;

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function validateUploadFile(
  buffer: Buffer,
  contentType: string,
  fileSize: number
): { valid: boolean; error?: string } {
  // Check content type
  if (!ALLOWED_IMAGE_TYPES.includes(contentType as any)) {
    return {
      valid: false,
      error: `Unsupported image type: ${contentType}`,
    };
  }

  // Check file size
  if (fileSize > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File too large: ${fileSize} bytes (max: ${MAX_FILE_SIZE})`,
    };
  }

  // Check buffer size matches reported size
  if (buffer.length !== fileSize) {
    return {
      valid: false,
      error: "Buffer size mismatch",
    };
  }

  // Basic file header validation
  const isValidImage = validateImageHeader(buffer, contentType);
  if (!isValidImage) {
    return {
      valid: false,
      error: "Invalid image file",
    };
  }

  return { valid: true };
}

function validateImageHeader(buffer: Buffer, contentType: string): boolean {
  if (buffer.length < 4) return false;

  // JPEG
  if (contentType === "image/jpeg") {
    return buffer[0] === 0xFF && buffer[1] === 0xD8;
  }

  // PNG
  if (contentType === "image/png") {
    return buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47;
  }

  // WebP
  if (contentType === "image/webp") {
    return buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46;
  }

  // AVIF
  if (contentType === "image/avif") {
    return buffer[4] === 0x66 && buffer[5] === 0x74 && buffer[6] === 0x79 && buffer[7] === 0x70;
  }

  return false;
}
