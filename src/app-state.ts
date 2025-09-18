import { create } from "zustand";

export type TipPercentage = {
  /** The currently selected preset value */
  presetValue: number | null;
  /** The currently entered custom value */
  customValue: number | null;
  /** The currently active mode */
  mode: "preset" | "custom";
};

type State = {
  billAmount: number | null;
  tipPercentage: TipPercentage | null;
  numberOfPeople: number | null;
};

type Actions = {
  setBillAmount: (amount: number | null) => void;
  setNumberOfPeople: (count: number | null) => void;
  setPresetTipPercentage: (percentage: number | null) => void;
  setCustomTipPercentage: (percentage: number | null) => void;
  reset: () => void;
};

const initialState: State = {
  billAmount: null,
  tipPercentage: null,
  numberOfPeople: null,
};

export const useTipCalculatorStore = create<State & Actions>()((set) => ({
  ...initialState,
  setBillAmount: (amount: number | null) => set({ billAmount: amount }),
  setNumberOfPeople: (count: number | null) => set({ numberOfPeople: count }),
  setPresetTipPercentage: (percentage: number | null) =>
    set((state) => ({
      tipPercentage:
        percentage !== null
          ? {
              presetValue: percentage,
              // Let custom value persist when switching to preset since custom value
              // is driven by user input and not a selection
              customValue: state.tipPercentage?.customValue ?? null,
              mode: "preset",
            }
          : null,
    })),
  setCustomTipPercentage: (percentage: number | null) =>
    set({
      tipPercentage:
        percentage !== null
          ? // Clear currently selected preset value when switching to custom
            { presetValue: null, customValue: percentage, mode: "custom" }
          : { presetValue: null, customValue: null, mode: "custom" },
    }),
  reset: () => set({ ...initialState }),
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
