import { cn } from "../utils";

type TipCalculationResultsProps = {} & React.HTMLAttributes<HTMLDivElement>;

export function TipCalculationResults({
  className,
}: TipCalculationResultsProps) {
  return (
    <div className={cn("flex flex-col h-full justify-between", className)}>
      <div>
        <ResultRow label="Tip Amount" amount="$0.00" />
        <ResultRow label="Total" amount="$0.00" />
      </div>
      <button className="w-full bg-strong-cyan text-very-dark-cyan py-2 rounded-md font-bold active:bg-strong-cyan/10 hover:cursor-pointer self-justify-end">
        RESET
      </button>
    </div>
  );
}

function ResultRow({ label, amount }: { label: string; amount: string }) {
  return (
    <div className="flex flex-wrap gap-4 justify-between items-end mb-8 font-bold">
      <div className="flex flex-col">
        <span className="text-white">{label}</span>
        <span className="text-grayish-cyan text-sm">/ person</span>
      </div>
      <span className="text-3xl lg:text-4xl text-strong-cyan">{amount}</span>
    </div>
  );
}
