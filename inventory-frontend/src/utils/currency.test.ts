import { describe, it, expect } from "vitest";
import {
  formatCurrency,
  formatCurrencyFromInput,
  parseCurrencyToNumber,
} from "./currency";

describe("Currency utils", () => {
  describe("formatCurrency", () => {
    it("should format positive numbers", () => {
      expect(formatCurrency(1234.56)).toBe("$1,234.56");
    });

    it("should format zero", () => {
      expect(formatCurrency(0)).toBe("$0.00");
    });

    it("should format negative numbers", () => {
      expect(formatCurrency(-1234.56)).toBe("-$1,234.56");
    });
  });

  describe("formatCurrencyFromInput", () => {
    it("should format string input to USD currency string", () => {
      expect(formatCurrencyFromInput("123456")).toBe("$1,234.56");
    });

    it("should handle empty string", () => {
      expect(formatCurrencyFromInput("")).toBe("$0.00");
    });

    it("should ignore non-numeric characters", () => {
      expect(formatCurrencyFromInput("$1a2b3c4")).toBe("$12.34");
    });
  });

  describe("parseCurrencyToNumber", () => {
    it("should parse positive currency string", () => {
      expect(parseCurrencyToNumber("$1,234.56")).toBe(1234.56);
    });

    it("should parse zero", () => {
      expect(parseCurrencyToNumber("$0.00")).toBe(0);
    });

    it("should ignore non-numeric characters", () => {
      expect(parseCurrencyToNumber("$1a2b3c4")).toBe(12.34);
    });

    it("should return 0 for empty string", () => {
      expect(parseCurrencyToNumber("")).toBe(0);
    });
  });
});
