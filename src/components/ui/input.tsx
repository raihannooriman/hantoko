type Proptypes = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  onChange?: (e: any) => void;
  className?: string;
};

const Input = ({
  label,
  name,
  type,
  placeholder,
  defaultValue,
  disabled,
  onChange,
  className = "",
}: Proptypes) => {
  return (
    <div className="flex flex-col">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange}
        className={`p-2.5 bg-[#eee] border-none outline-none disabled:opacity-70 rounded-lg ${className}`}
      />
    </div>
  );
};

export default Input;
