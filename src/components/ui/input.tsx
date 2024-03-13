type Proptypes = {
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
};
const Input = (props: Proptypes) => {
  const { label, name, type, placeholder } = props;
  return (
    <div className="flex flex-col my-4">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        className="p-2.5 bg-[#eee] border-none outline-none"
      />
    </div>
  );
};
export default Input;
