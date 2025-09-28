import type { TipPercentage } from "@/app-state";
import { cn } from "@/utils";

type SelectTipPercentageProps = {
  tipPercentage: TipPercentage | null;
  setCustomTipPercentage: (value: number | null) => void;
  setPresetTipPercentage: (value: number | null) => void;
  percentageOptions?: number[];
} & React.HTMLAttributes<HTMLDivElement>;

export function SelectTipPercentage({
  tipPercentage,
  setPresetTipPercentage,
  setCustomTipPercentage,
  percentageOptions = [5, 10, 15, 25, 50],
  className,
}: SelectTipPercentageProps) {
  const mode = tipPercentage?.mode;

  return (
    <div className={className}>
      <div className="text-dark-grayish-cyan">Select Tip %</div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-2xl">
        {percentageOptions.map((option) => (
          <PercentageOption
            key={option}
            value={option}
            selected={
              mode === "preset" ? tipPercentage?.presetValue === option : false
            }
            onSelect={() => {
              setPresetTipPercentage(option);
            }}
          />
        ))}
        <CustomPercentageInput
          tipPercentage={tipPercentage}
          setCustomTipPercentage={setCustomTipPercentage}
        />
      </div>
    </div>
  );
}

type CustomPercentageInputProps = {
  tipPercentage: TipPercentage | null;
  setCustomTipPercentage: (value: number | null) => void;
};

function CustomPercentageInput({
  tipPercentage,
  setCustomTipPercentage,
}: CustomPercentageInputProps) {
  const mode = tipPercentage?.mode;
  const value = tipPercentage?.customValue ?? null;

  return (
    <>
      <label htmlFor="custom-tip" className="sr-only">
        Custom
      </label>
      <input
        id="custom-tip"
        type="number"
        placeholder="Custom"
        min={0}
        max={100}
        className={cn(
          "w-full text-2xl text-very-dark-cyan placeholder:text-2xl placeholder:text-dark-grayish-cyan focus:outline-none text-center bg-very-light-grayish-cyan border border-very-light-grayish-cyan rounded-md hover:border-strong-cyan/90 py-2",
          mode === "custom"
            ? "border-2 border-strong-cyan text-very-dark-cyan focus:border"
            : "",
        )}
        value={value !== null ? value : ""}
        onChange={(e) => {
          const newValue = e.target.value ? parseFloat(e.target.value) : null;
          if (newValue !== null && (newValue < 0 || newValue > 100)) {
            return;
          }
          setCustomTipPercentage(newValue);
        }}
        onFocus={(e) => {
          const newValue = e.target.value ? parseFloat(e.target.value) : null;
          setCustomTipPercentage(newValue);
        }}
      />
    </>
  );
}

type PercentageOptionProps = {
  value: number;
  selected: boolean;
  onSelect: (value: number) => void;
};

function PercentageOption({
  value,
  selected,
  onSelect,
}: PercentageOptionProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      className={cn(
        "py-2 rounded-md hover:bg-light-grayish-cyan hover:text-very-dark-cyan cursor-pointer",
        selected
          ? "bg-strong-cyan text-very-dark-cyan "
          : "bg-very-dark-cyan text-white",
      )}
    >
      {value}%
    </button>
  );
}
