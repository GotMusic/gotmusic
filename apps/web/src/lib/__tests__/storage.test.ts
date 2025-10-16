/**
 * Tests for storage URL utilities
 *
 * @jest-environment node
 */

import { extractStorageKey, getPublicStorageUrl, isStorageUrl } from "../storage";

// Type declarations for Jest
declare const describe: (name: string, fn: () => void) => void;
declare const it: (name: string, fn: () => void) => void;
declare const expect: (value: unknown) => {
  toBe: (expected: unknown) => void;
  toMatch: (expected: RegExp | string) => void;
  toContain: (expected: string) => void;
  toBeTruthy: () => void;
  toBeFalsy: () => void;
  toBeNull: () => void;
};
declare const beforeEach: (fn: () => void) => void;
declare const afterEach: (fn: () => void) => void;

describe("storage utilities", () => {
  // Store original env
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset env before each test
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    // Restore original env
    process.env = originalEnv;
  });

  describe("getPublicStorageUrl", () => {
    it("uses STORAGE_PUBLIC_BASE when configured", () => {
      process.env.STORAGE_PUBLIC_BASE = "https://cdn.gotmusic.app";
      const url = getPublicStorageUrl("assets/file.mp3");
      expect(url).toBe("https://cdn.gotmusic.app/assets/file.mp3");
    });

    it("handles STORAGE_PUBLIC_BASE with trailing slash", () => {
      process.env.STORAGE_PUBLIC_BASE = "https://cdn.gotmusic.app/";
      const url = getPublicStorageUrl("assets/file.mp3");
      expect(url).toBe("https://cdn.gotmusic.app/assets/file.mp3");
    });

    it("handles storage key with leading slash", () => {
      process.env.STORAGE_PUBLIC_BASE = "https://cdn.gotmusic.app";
      const url = getPublicStorageUrl("/assets/file.mp3");
      expect(url).toBe("https://cdn.gotmusic.app/assets/file.mp3");
    });

    it("uses NEXT_PUBLIC_STORAGE_PUBLIC_BASE as fallback", () => {
      process.env.NEXT_PUBLIC_STORAGE_PUBLIC_BASE = "https://public.cdn.app";
      const url = getPublicStorageUrl("assets/test.mp3");
      expect(url).toBe("https://public.cdn.app/assets/test.mp3");
    });

    it("generates R2 URL with custom domain", () => {
      process.env.STORAGE_DRIVER = "r2";
      process.env.R2_PUBLIC_DOMAIN = "https://pub.r2.dev";
      const url = getPublicStorageUrl("assets/song.mp3");
      expect(url).toBe("https://pub.r2.dev/assets/song.mp3");
    });

    it("generates R2 URL with bucket and account", () => {
      process.env.STORAGE_DRIVER = "r2";
      process.env.STORAGE_BUCKET = "gotmusic-assets";
      process.env.R2_ACCOUNT_ID = "abc123";
      const url = getPublicStorageUrl("assets/beat.mp3");
      expect(url).toContain("gotmusic-assets.abc123.r2.cloudflarestorage.com");
      expect(url).toContain("assets/beat.mp3");
    });

    it("generates S3 URL with CloudFront", () => {
      process.env.STORAGE_DRIVER = "s3";
      process.env.AWS_CLOUDFRONT_DOMAIN = "https://d123456.cloudfront.net";
      const url = getPublicStorageUrl("assets/track.mp3");
      expect(url).toBe("https://d123456.cloudfront.net/assets/track.mp3");
    });

    it("generates S3 URL with bucket and region", () => {
      process.env.STORAGE_DRIVER = "s3";
      process.env.STORAGE_BUCKET = "my-music-bucket";
      process.env.AWS_REGION = "us-west-2";
      const url = getPublicStorageUrl("assets/audio.mp3");
      expect(url).toContain("my-music-bucket.s3.us-west-2.amazonaws.com");
      expect(url).toContain("assets/audio.mp3");
    });

    it("defaults to us-east-1 for S3 when region not specified", () => {
      process.env.STORAGE_DRIVER = "s3";
      process.env.STORAGE_BUCKET = "test-bucket";
      const url = getPublicStorageUrl("file.mp3");
      expect(url).toContain(".s3.us-east-1.amazonaws.com/");
    });

    it("returns stub URL in stub mode", () => {
      process.env.GM_STORAGE_MODE = "stub";
      const url = getPublicStorageUrl("stub/test.mp3");
      expect(url).toContain("httpbin.org");
      expect(url).toContain("stub%2Ftest.mp3");
    });

    it("falls back to stub when no configuration", () => {
      process.env.STORAGE_PUBLIC_BASE = undefined;
      process.env.STORAGE_DRIVER = undefined;
      const url = getPublicStorageUrl("assets/file.mp3");
      expect(url).toContain("httpbin.org");
    });

    it("STORAGE_PUBLIC_BASE takes priority over driver-specific config", () => {
      process.env.STORAGE_PUBLIC_BASE = "https://custom.cdn.com";
      process.env.STORAGE_DRIVER = "r2";
      process.env.R2_PUBLIC_DOMAIN = "https://r2.example.com";
      const url = getPublicStorageUrl("assets/file.mp3");
      expect(url).toBe("https://custom.cdn.com/assets/file.mp3");
    });
  });

  describe("isStorageUrl", () => {
    it("identifies R2 URLs", () => {
      expect(isStorageUrl("https://bucket.account.r2.cloudflarestorage.com/file.mp3")).toBeTruthy();
      expect(isStorageUrl("https://pub-abc.r2.dev/assets/song.mp3")).toBeTruthy();
    });

    it("identifies S3 URLs", () => {
      expect(isStorageUrl("https://bucket.s3.us-east-1.amazonaws.com/file.mp3")).toBeTruthy();
    });

    it("identifies CloudFront URLs", () => {
      expect(isStorageUrl("https://d123456.cloudfront.net/assets/file.mp3")).toBeTruthy();
    });

    it("identifies stub URLs", () => {
      expect(isStorageUrl("https://httpbin.org/base64/data")).toBeTruthy();
    });

    it("rejects non-storage URLs", () => {
      expect(isStorageUrl("https://example.com/file.mp3")).toBeFalsy();
      expect(isStorageUrl("https://youtube.com/watch?v=123")).toBeFalsy();
    });

    it("handles invalid URLs gracefully", () => {
      expect(isStorageUrl("not-a-url")).toBeFalsy();
      expect(isStorageUrl("")).toBeFalsy();
    });
  });

  describe("extractStorageKey", () => {
    it("extracts key from full URL", () => {
      const key = extractStorageKey("https://cdn.gotmusic.app/assets/file.mp3");
      expect(key).toBe("assets/file.mp3");
    });

    it("removes leading slash from pathname", () => {
      const key = extractStorageKey("https://example.com/path/to/file.mp3");
      expect(key).toBe("path/to/file.mp3");
    });

    it("handles URLs without leading slash", () => {
      const key = extractStorageKey("https://example.com/file.mp3");
      expect(key).toBe("file.mp3");
    });

    it("returns null for invalid URLs", () => {
      const key = extractStorageKey("not-a-url");
      expect(key).toBeNull();
    });

    it("handles complex paths", () => {
      const key = extractStorageKey("https://cdn.app/assets/2024/01/song.mp3?v=1");
      expect(key).toBe("assets/2024/01/song.mp3");
    });
  });
});
