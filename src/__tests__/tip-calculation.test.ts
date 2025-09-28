import { describe, expect, it } from "vitest";

import {
  calculateTipPerPerson,
  calculateTotalBillPerPerson,
} from "@/app-state";

describe("tip calculation", () => {
  it("should calculate tip and total per person correctly", () => {
    // The values here are based on the example in the design
    expect(calculateTipPerPerson(142.55, 15, 5)).toBeCloseTo(4.2765);
  });
  it("should return 0 and not crash with division by zero error when zero is passed in for number of people", () => {
    expect(calculateTipPerPerson(100, 15, 0)).toBe(0);
  });
  it("should handle null inputs gracefully", () => {
    expect(calculateTipPerPerson(null, 15, 5)).toBe(0);
    expect(calculateTipPerPerson(100, null, 5)).toBe(0);
    expect(calculateTipPerPerson(100, 15, null)).toBe(0);
  });
});

describe("total bill calculation", () => {
  it("should calculate total bill per person correctly", () => {
    // The values here are based on the example in the design
    expect(calculateTotalBillPerPerson(142.55, 4.2765, 5)).toBeCloseTo(32.7865);
  });
  it("should return 0 and not crash with division by zero error when zero is passed in for number of people", () => {
    expect(calculateTotalBillPerPerson(100, 15, 0)).toBe(0);
  });
  it("should handle null inputs gracefully", () => {
    expect(calculateTotalBillPerPerson(null, 15, 5)).toBe(0);
    expect(calculateTotalBillPerPerson(100, null, 5)).toBe(0);
    expect(calculateTotalBillPerPerson(100, 15, null)).toBe(0);
  });
});
