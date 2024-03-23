import React, { useEffect, useRef, useState } from "react";

type PropTypes = {
  message?: string;
  className?: string;
  setToaster: any;
};

const Toaster = (props: PropTypes) => {
  const { message, className, setToaster } = props;
  return (
    <div
      className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 border rounded-lg shadow-sm px-8 py-4 overflow-hidden`}
    >
      <div className="flex items-center justify-center gap-3">
        <div>
          <div className="text-xl font-bold min-w-44">
            {className === "success"
              ? "Success!!!"
              : className === "warning"
              ? "Warning!!!"
              : className === "error"
              ? "Error!!!"
              : ""}
          </div>
          <div>
            <p>{message}</p>
          </div>
        </div>
        <div
          className={`w-full h-2 absolute bottom-0 left-0 ${
            className === "success"
              ? "bg-green-500"
              : className === "warning"
              ? "bg-yellow-400"
              : className === "error"
              ? "bg-red-500"
              : ""
          }`}
        ></div>
        <div
          className="absolute top-2 right-2 cursor-pointer"
          onClick={() => setToaster({})}
        >
          x
        </div>
      </div>
    </div>
  );
};

export default Toaster;
