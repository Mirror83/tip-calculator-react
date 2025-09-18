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
});

describe("total bill calculation", () => {
  it("should calculate total bill per person correctly", () => {
    // The values here are based on the example in the design
    expect(calculateTotalBillPerPerson(142.55, 4.2765, 5)).toBeCloseTo(32.7865);
  });
});
