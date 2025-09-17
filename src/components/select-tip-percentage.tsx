import { cn } from "../utils";

type SelectTipPercentageProps = {
  percentageOptions?: number[];
} & React.HTMLAttributes<HTMLDivElement>;

export function SelectTipPercentage({
  percentageOptions = [5, 10, 15, 25, 50],
  className,
}: SelectTipPercentageProps) {
  return (
    <div className={className}>
      <div>Select Tip %</div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 text-2xl">
        {percentageOptions.map((option) => (
          <PercentageOption
            key={option}
            value={option}
            selected={false}
            onSelect={() => {
              return;
            }}
          />
        ))}
        <CustomPercentageInput />
      </div>
    </div>
  );
}

function CustomPercentageInput() {
  return (
    <input
      type="number"
      placeholder="Custom"
      className="w-full text-2xl font-bold text-very-dark-cyan placeholder:font-bold placeholder:text-2xl 
       placeholder:text-dark-grayish-cyan focus:outline-none text-center bg-very-light-grayish-cyan border
       border-very-light-grayish-cyan rounded-md hover:border-strong-cyan/90 py-2"
    />
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
