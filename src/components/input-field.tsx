type InputFieldProps = {
  label?: string;
  icon?: string;
  value: number | null;
  setValue: (value: number | null) => void;
};

export function InputField({ label, icon, value, setValue }: InputFieldProps) {
  return (
    <div>
      <label>{label}</label>
      <div className="flex items-center gap-4 bg-very-light-grayish-cyan rounded-md px-4 py-2 mt-2">
        <img src={icon} alt="" />
        <input
          type="number"
          placeholder="0"
          value={value !== null ? value : ""}
          onChange={(e) => {
            setValue?.(e.target.value ? parseFloat(e.target.value) : null);
          }}
          className="w-full text-right text-3xl text-very-dark-cyan placeholder:text-3xl placeholder:text-dark-grayish-cyan focus:outline-none"
        />
      </div>
    </div>
  );
}
