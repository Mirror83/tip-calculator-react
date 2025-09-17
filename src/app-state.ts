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
