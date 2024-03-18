type Proptypes = {
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
};
const Button = (props: Proptypes) => {
  const { type, onClick, children, className } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-3 px-6 flex justify-center items-center cursor-pointer bg-black text-white font-bold rounded-lg ${className}`}
    >
      {children}
    </button>
  );
};
export default Button;
