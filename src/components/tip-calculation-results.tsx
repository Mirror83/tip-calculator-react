import { cn } from "@/utils";

type TipCalculationResultsProps = {
  totalPerPerson: number;
  tipPerPerson: number;
  canReset: boolean;
  reset: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

export function TipCalculationResults({
  totalPerPerson,
  tipPerPerson,
  canReset,
  reset,
  className,
}: TipCalculationResultsProps) {
  return (
    <div className={cn("flex flex-col h-full justify-between", className)}>
      <div>
        <ResultRow label="Tip Amount" amount={tipPerPerson} />
        <ResultRow label="Total" amount={totalPerPerson} />
      </div>
      <button
        onClick={reset}
        disabled={!canReset}
        className={cn(
          "w-full bg-strong-cyan text-very-dark-cyan py-2 rounded-md active:bg-strong-cyan/70 hover:cursor-pointer self-justify-end",
          !canReset && "bg-strong-cyan/30 hover:cursor-not-allowed",
        )}
      >
        RESET
      </button>
    </div>
  );
}

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

function ResultRow({ label, amount }: { label: string; amount: number }) {
  return (
    <div className="flex flex-wrap gap-4 justify-between items-end mb-8">
      <div className="flex flex-col">
        <span className="text-white">{label}</span>
        <span className="text-grayish-cyan text-sm">/ person</span>
      </div>
      <span className="text-3xl lg:text-4xl text-strong-cyan">
        {formatter.format(amount)}
      </span>
    </div>
  );
}
