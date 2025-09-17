export function InputField({ label, icon }: { label?: string; icon?: string }) {
  return (
    <div>
      <label>{label}</label>
      <div className="flex items-center gap-4 bg-very-light-grayish-cyan rounded-md px-4 py-2 mt-2">
        <img src={icon} alt="" />
        <input
          type="number"
          placeholder="0"
          className="w-full text-right text-3xl font-bold text-very-dark-cyan placeholder:font-bold placeholder:text-3xl placeholder:text-dark-grayish-cyan focus:outline-none"
        />
      </div>
    </div>
  );
}
