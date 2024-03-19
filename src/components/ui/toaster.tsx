import React from "react";

type PropTypes = {
  message?: string;
  className?: string;
};

const Toaster = (props: PropTypes) => {
  const { message, className } = props;

  return (
    <div
      className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 border rounded-lg shadow-sm px-8 py-4 overflow-hidden`}
    >
      <div className="">
        <div className="text-xl font-bold">
          {className === "success"
            ? "Success"
            : className === "alert"
            ? "Alert"
            : className === "error"
            ? "Error"
            : ""}
        </div>
        <div className="">
          <p>{message}</p>
        </div>
      </div>
      <div
        className={`w-full h-2 absolute bottom-0 left-0 ${
          className === "success"
            ? "bg-green-500"
            : className === "alert"
            ? "bg-yellow-400"
            : className === "error"
            ? "bg-red-500"
            : "bg-black"
        }`}
      ></div>
    </div>
  );
};

export default Toaster;
