type Option = { label: string; value: string };
type Proptypes = {
  label?: string;
  name: string;
  defaultValue?: string;
  disabled?: boolean;
  options: Option[];
};
const Select = (props: Proptypes) => {
  const { label, name, defaultValue, disabled, options } = props;
  return (
    <div className="flex flex-col my-4">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        disabled={disabled}
        className="p-2.5 mt-2 bg-[#eee] border-none outline-none disabled:opacity-70"
      >
        {options.map((option) => (
          <option value={option.value} key={option.label}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
export default Select;
