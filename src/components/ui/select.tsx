type Option = {
  label: string;
  value: string;
  selected: boolean;
};
type Proptypes = {
  label?: string;
  name: string;
  defaultValue?: string;
  disabled?: boolean;
  options: Option[] | any;
  className?: string;
};
const Select = (props: Proptypes) => {
  const { label, name, defaultValue, disabled, options, className } = props;
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <div className={`flex flex-col bg-[#eee] rounded-lg pr-2 ${className}`}>
        <select
          name={name}
          id={name}
          defaultValue={defaultValue}
          disabled={disabled}
          className="p-2.5 bg-transparent outline-none disabled:opacity-70"
        >
          {options?.map((option: Option) => (
            <option
              value={option.value}
              key={option.label}
              selected={option.selected}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
export default Select;
