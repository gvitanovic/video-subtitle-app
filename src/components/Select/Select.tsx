interface SelectProps<T> {
  id?: string;
  label?: string;
  options: T[];
  value: string | number | undefined;
  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T, index: number) => string | number;
  onChange: (option: T | null) => void;
  placeholder?: string;
}

export const Select = <T,>({
  id,
  label,
  options,
  value,
  getOptionLabel,
  getOptionValue,
  onChange,
  placeholder = '-- Choose --',
}: SelectProps<T>) => {
  return (
    <label htmlFor={id}>
      {label && <span>{label} </span>}
      <select
        id={id}
        value={value ?? ''}
        onChange={e => {
          const idx = options.findIndex(
            (option, i) => String(getOptionValue(option, i)) === e.target.value
          );
          if (idx === -1) {
            onChange(null);
          } else {
            onChange(options[idx]);
          }
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((option, idx) => (
          <option key={getOptionValue(option, idx)} value={getOptionValue(option, idx)}>
            {getOptionLabel(option)}
          </option>
        ))}
      </select>
    </label>
  );
};