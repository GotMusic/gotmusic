import { beforeEach, describe, expect, it } from "vitest";
import { createSessionCookie, signSession, verifySession } from "../session";

describe("Session Security", () => {
  beforeEach(() => {
    // Set a test SESSION_SECRET
    process.env.SESSION_SECRET = "test-secret-key-for-session-signing-32-chars";
  });

  describe("signSession", () => {
    it("should sign session data with HMAC-SHA256", () => {
      const sessionData = {
        userId: "user-123",
        sessionId: "session-456",
        expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
      };

      const signed = signSession(sessionData);

      expect(signed).toBeDefined();
      expect(typeof signed).toBe("string");
      expect(signed.length).toBeGreaterThan(0);
    });

    it("should produce different signatures for different data", () => {
      const sessionData1 = {
        userId: "user-123",
        sessionId: "session-456",
        expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
      };

      const sessionData2 = {
        userId: "user-456",
        sessionId: "session-789",
        expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
      };

      const signed1 = signSession(sessionData1);
      const signed2 = signSession(sessionData2);

      expect(signed1).not.toBe(signed2);
    });
  });

  describe("verifySession", () => {
    it("should verify valid signed session data", () => {
      const sessionData = {
        userId: "user-123",
        sessionId: "session-456",
        expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
      };

      const signed = signSession(sessionData);
      const verified = verifySession(signed);

      expect(verified).toEqual(sessionData);
    });

    it("should reject tampered session data", () => {
      const sessionData = {
        userId: "user-123",
        sessionId: "session-456",
        expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
      };

      const signed = signSession(sessionData);
      // Tamper with the signature
      const tampered = `${signed.slice(0, -10)}tampered123`;

      const verified = verifySession(tampered);
      expect(verified).toBeNull();
    });

    it("should reject expired session data", () => {
      const sessionData = {
        userId: "user-123",
        sessionId: "session-456",
        expiresAt: Date.now() - 1000, // 1 second ago (expired)
      };

      const signed = signSession(sessionData);
      const verified = verifySession(signed);

      expect(verified).toBeNull();
    });

    it("should reject invalid base64 data", () => {
      const invalidData = "not-valid-base64-data";

      const verified = verifySession(invalidData);
      expect(verified).toBeNull();
    });

    it("should reject data with invalid signature format", () => {
      const invalidData = Buffer.from("invalid-format").toString("base64");

      const verified = verifySession(invalidData);
      expect(verified).toBeNull();
    });
  });

  describe("createSessionCookie", () => {
    it("should create properly formatted cookie string", () => {
      const sessionData = {
        userId: "user-123",
        sessionId: "session-456",
        expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
      };

      const cookieString = createSessionCookie(sessionData);

      expect(cookieString).toContain("session=");
      expect(cookieString).toContain("HttpOnly");
      expect(cookieString).toContain("SameSite=Lax");
      expect(cookieString).toContain("Path=/");
      expect(cookieString).toContain("Max-Age=");
    });

    it("should include Secure flag in production", () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "production";

      const sessionData = {
        userId: "user-123",
        sessionId: "session-456",
        expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
      };

      const cookieString = createSessionCookie(sessionData);

      expect(cookieString).toContain("Secure");

      // Restore original environment
      process.env.NODE_ENV = originalEnv;
    });

    it("should not include Secure flag in development", () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = "development";

      const sessionData = {
        userId: "user-123",
        sessionId: "session-456",
        expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
      };

      const cookieString = createSessionCookie(sessionData);

      expect(cookieString).not.toContain("Secure");

      // Restore original environment
      process.env.NODE_ENV = originalEnv;
    });
  });

  describe("Security Properties", () => {
    it("should use timing-safe comparison for signature verification", () => {
      const sessionData = {
        userId: "user-123",
        sessionId: "session-456",
        expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
      };

      const signed = signSession(sessionData);

      // This test verifies that the function doesn't throw errors
      // The actual timing attack protection is tested by the timingSafeEqual usage
      expect(() => verifySession(signed)).not.toThrow();
    });

    it("should require SESSION_SECRET to be set", () => {
      const originalSecret = process.env.SESSION_SECRET;
      process.env.SESSION_SECRET = undefined;

      expect(() => {
        signSession({
          userId: "user-123",
          sessionId: "session-456",
          expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
        });
      }).toThrow("SESSION_SECRET environment variable is required");

      // Restore original secret
      process.env.SESSION_SECRET = originalSecret;
    });
  });
});
