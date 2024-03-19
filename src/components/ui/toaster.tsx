type PropTypes = {
  message?: string;
  className?: string;
};
const Toaster = (props: PropTypes) => {
  const { message, className } = props;
  return (
    <div
      className={`fixed bottom-5 left-[50%] translate-x-[-50%] z-[9999] border rounded-lg shadow-sm px-8 py-4 overflow-hidden $`}
    >
      <div className="">
        <div className="">Toast</div>
        <div className="">
          <p></p>
          <p>{message}</p>
        </div>
      </div>
      <div
        className={`w-full h-2 absolute bottom-0 left-0 ${
          className === "success"
            ? "bg-green"
            : className === "alert"
            ? "bg-yellow-400"
            : className === "error"
            ? "bg-red-400"
            : "bg-black"
        }`}
      ></div>
    </div>
  );
};
export default Toaster;
