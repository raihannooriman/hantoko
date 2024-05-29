type Proptypes = {
  label?: string;
  name: string;
  placeholder?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  onChange?: (e: any) => void;
  className?: string;
};

const TextArea = ({
  label,
  name,
  placeholder,
  defaultValue,
  disabled,
  onChange,
  className = "",
}: Proptypes) => {
  return (
    <div className="flex flex-col mb-1">
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        name={name}
        id={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange}
        className={`p-2.5 h-20 resize-none bg-[#eee] border-none outline-none disabled:opacity-70 rounded-lg ${className}`}
      />
    </div>
  );
};

export default TextArea;
