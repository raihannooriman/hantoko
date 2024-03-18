import { useEffect, useRef } from "react";

const Modal = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: any;
}) => {
  const ref: any = useRef();
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  return (
    <div className="fixed top-0 w-[100vw] h-screen z-[1000] bg-black bg-opacity-50 flex items-center justify-center">
      <div
        className="p-5 font-bold w-[50vw] bg-white max-h-[80vh] rounded-lg"
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
};
export default Modal;
