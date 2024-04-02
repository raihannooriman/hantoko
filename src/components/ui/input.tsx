type Proptypes = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  onChange?: (e: any) => void;
};
const Input = (props: Proptypes) => {
  const { label, name, type, placeholder, defaultValue, disabled, onChange } =
    props;
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
        onChange={onChange}
        className="p-2.5 mt-2 bg-[#eee] border-none outline-none disabled:opacity-70 rounded-lg"
      />
    </div>
  );
};
export default Input;
