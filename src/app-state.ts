import { create } from "zustand";

type State = {
  billAmount: number | null;
  tipPercentage: number | null;
  numberOfPeople: number | null;
};

type Actions = {
  setBillAmount: (amount: number | null) => void;
  setTipPercentage: (percentage: number | null) => void;
  setNumberOfPeople: (count: number | null) => void;
  reset: () => void;
};

export const useTipCalculatorStore = create<State & Actions>()((set) => ({
  billAmount: null,
  tipPercentage: null,
  numberOfPeople: null,
  setBillAmount: (amount) => set({ billAmount: amount }),
  setTipPercentage: (percentage) => set({ tipPercentage: percentage }),
  setNumberOfPeople: (count) => set({ numberOfPeople: count }),
  reset: () => set({ billAmount: 0, tipPercentage: 0, numberOfPeople: 1 }),
}));

export function calculateTipPerPerson(
  billAmount: number | null,
  tipPercentage: number | null,
  numberOfPeople: number | null,
): number {
  if (
    billAmount === null ||
    tipPercentage === null ||
    numberOfPeople === null ||
    numberOfPeople === 0
  ) {
    return 0;
  }
  const totalTip = billAmount * (tipPercentage / 100);
  return totalTip / numberOfPeople;
}

export function calculateTotalBillPerPerson(
  billAmount: number | null,
  tipPerPerson: number | null,
  numberOfPeople: number | null,
): number {
  if (
    billAmount === null ||
    tipPerPerson === null ||
    numberOfPeople === null ||
    numberOfPeople === 0
  ) {
    return 0;
  }
  const totalBill = billAmount + tipPerPerson * numberOfPeople;
  return totalBill / numberOfPeople;
}
