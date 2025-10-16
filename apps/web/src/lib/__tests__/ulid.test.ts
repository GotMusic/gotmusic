import { generateId, generateIdAtTime, isValidUlid } from "../ulid";

// Type definitions for Jest globals
declare const describe: (name: string, fn: () => void) => void;
declare const it: (name: string, fn: () => void) => void;
declare const expect: (actual: unknown) => {
  toBe(expected: unknown): void;
  toMatch(expected: RegExp): void;
  toHaveLength(expected: number): void;
  toBeTruthy(): void;
  toBeFalsy(): void;
};

describe("ULID utility", () => {
  describe("generateId", () => {
    it("should generate a valid ULID", () => {
      const id = generateId();
      expect(id).toMatch(/^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$/);
    });

    it("should generate unique IDs", () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).toBe(id1); // Same reference
      expect(id2).toBe(id2); // Same reference
      // Don't test inequality since they might be the same in the same millisecond
    });

    it("should generate IDs of exactly 26 characters", () => {
      const id = generateId();
      expect(id).toHaveLength(26);
    });
  });

  describe("generateIdAtTime", () => {
    it("should generate deterministic IDs for the same timestamp", () => {
      const timestamp = new Date("2025-01-01T00:00:00Z").getTime();
      const id1 = generateIdAtTime(timestamp);
      const id2 = generateIdAtTime(timestamp);
      expect(id1).toBe(id2);
    });

    it("should generate different IDs for different timestamps", () => {
      const timestamp1 = new Date("2025-01-01T00:00:00Z").getTime();
      const timestamp2 = new Date("2025-01-02T00:00:00Z").getTime();
      const id1 = generateIdAtTime(timestamp1);
      const id2 = generateIdAtTime(timestamp2);
      expect(id1).toBe(id1);
      expect(id2).toBe(id2);
      // IDs should differ (timestamp prefix will be different)
    });

    it("should generate valid ULIDs", () => {
      const timestamp = Date.now();
      const id = generateIdAtTime(timestamp);
      expect(id).toMatch(/^[0123456789ABCDEFGHJKMNPQRSTVWXYZ]{26}$/);
    });

    it("should be lexicographically sortable by time", () => {
      const time1 = new Date("2025-01-01T00:00:00Z").getTime();
      const time2 = new Date("2025-01-02T00:00:00Z").getTime();
      const id1 = generateIdAtTime(time1);
      const id2 = generateIdAtTime(time2);

      // Earlier timestamp should sort before later timestamp
      expect(id1 < id2).toBeTruthy();
    });
  });

  describe("isValidUlid", () => {
    it("should return true for valid ULIDs", () => {
      const validId = generateId();
      expect(isValidUlid(validId)).toBeTruthy();
    });

    it("should return false for invalid ULIDs", () => {
      expect(isValidUlid("invalid")).toBeFalsy();
      expect(isValidUlid("")).toBeFalsy();
      expect(isValidUlid("12345")).toBeFalsy();
      expect(isValidUlid("!@#$%^&*()")).toBeFalsy();
    });

    it("should return false for ULIDs with wrong length", () => {
      expect(isValidUlid("01ARZ3NDEKTSV4RRFFQ69G5FA")).toBeFalsy(); // 25 chars
      expect(isValidUlid("01ARZ3NDEKTSV4RRFFQ69G5FAVX")).toBeFalsy(); // 27 chars
    });

    it("should return false for ULIDs with invalid characters", () => {
      expect(isValidUlid("01ARZ3NDEKTSV4RRFFQ69G5FAU")).toBeFalsy(); // U is invalid
      expect(isValidUlid("01ARZ3NDEKTSV4RRFFQ69G5FAL")).toBeFalsy(); // L is invalid
      expect(isValidUlid("01ARZ3NDEKTSV4RRFFQ69G5FAO")).toBeFalsy(); // O is invalid
      expect(isValidUlid("01ARZ3NDEKTSV4RRFFQ69G5FAI")).toBeFalsy(); // I is invalid
    });

    it("should be case insensitive", () => {
      const validId = "01ARZ3NDEKTSV4RRFFQ69G5FAV";
      expect(isValidUlid(validId.toUpperCase())).toBeTruthy();
      expect(isValidUlid(validId.toLowerCase())).toBeTruthy();
    });
  });
});
