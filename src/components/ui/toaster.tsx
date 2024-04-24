import { ToasterContext } from "@/contexts/ToasterContext";
import { ToasterType } from "@/types/toaster.type";
import React, { useContext, useEffect } from "react";

const Toaster = () => {
  const { toaster, setToaster }: ToasterType = useContext(ToasterContext);
  useEffect(() => {
    if (Object.keys(toaster).length > 0) {
      setTimeout(() => {
        setToaster({});
      }, 2000);
    }
  }, [toaster, setToaster]);
  return (
    <div
      className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 border rounded-lg shadow-sm px-6 py-3 overflow-hidden bg-white`}
    >
      <div className="flex items-center justify-center gap-3">
        <div>
          <div className="text-xl font-bold min-w-44">
            {toaster.className === "success"
              ? "Success!!!"
              : toaster.className === "warning"
              ? "Warning!!!"
              : toaster.className === "error"
              ? "Error!!!"
              : ""}
          </div>
          <div>
            <p>{toaster.message}</p>
          </div>
        </div>
        <div
          className={`w-full h-2 absolute bottom-0 left-0 ${
            toaster.className === "success"
              ? "bg-green-500"
              : toaster.className === "warning"
              ? "bg-yellow-400"
              : toaster.className === "error"
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
