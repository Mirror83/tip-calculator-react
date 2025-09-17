import { useTipCalculatorStore } from "./app-state";
import dollarIcon from "./assets/icon-dollar.svg";
import personIcon from "./assets/icon-person.svg";
import splitterLogo from "./assets/logo.svg";
import { InputField } from "./components/input-field";
import { SelectTipPercentage } from "./components/select-tip-percentage";
import { TipCalculationResults } from "./components/tip-calculation-results";

function App() {
  const billAmount = useTipCalculatorStore((state) => state.billAmount);
  const tipPercentage = useTipCalculatorStore((state) => state.tipPercentage);
  const numberOfPeople = useTipCalculatorStore((state) => state.numberOfPeople);

  const tipPerPerson = 0;
  const totalPerPerson = 0;

  const setBillAmount = useTipCalculatorStore((state) => state.setBillAmount);
  const setNumberOfPeople = useTipCalculatorStore(
    (state) => state.setNumberOfPeople,
  );
  const setTipPercentage = useTipCalculatorStore(
    (state) => state.setTipPercentage,
  );

  return (
    <div className="bg-light-grayish-cyan lg:flex lg:flex-col lg:items-center lg:justify-center lg:min-h-screen lg:py-8 lg:gap-16">
      <div className="flex justify-center items-center h-[150px] lg:h-auto bg-light-cyan">
        <h1 className="sr-only">Splitter</h1>
        <img src={splitterLogo} className="mb-8" alt="Splitter logo" />
      </div>
      <main className="bg-white rounded-t-3xl lg:rounded-3xl p-8 max-w-5xl sm:grid lg:grid-cols-2 md:gap-8">
        <div className="space-y-6">
          <InputField
            label="Bill"
            icon={dollarIcon}
            value={billAmount}
            setValue={setBillAmount}
          />
          <SelectTipPercentage
            className="space-y-4"
            setTipPercentage={setTipPercentage}
            tipPercentage={tipPercentage}
          />
          <InputField
            label="Number of People"
            icon={personIcon}
            value={numberOfPeople}
            setValue={setNumberOfPeople}
          />
        </div>
        <div className="bg-very-dark-cyan p-4 py-8 rounded-2xl md:p-8 mt-8 md:mt-0 md:flex md:flex-col md:justify-between">
          <TipCalculationResults
            tipPerPerson={tipPerPerson}
            totalPerPerson={totalPerPerson}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
