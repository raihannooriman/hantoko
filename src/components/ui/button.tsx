type Proptypes = {
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};
const Button = (props: Proptypes) => {
  const { type, onClick, children, className, disabled } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-3 px-6 flex justify-center items-center cursor-pointer bg-black text-white font-bold rounded-lg disabled:opacity-70 disabled:cursor-default ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
export default Button;
