type Proptypes = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
};
const Input = (props: Proptypes) => {
  const { label, name, type, placeholder, defaultValue, disabled } = props;
  return (
    <div className="flex flex-col my-4">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        className="p-2.5 bg-[#eee] border-none outline-none disabled:opacity-70"
      />
    </div>
  );
};
export default Input;
