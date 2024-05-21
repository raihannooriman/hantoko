import Modal from "@/components/ui/modal";
import { Dispatch, SetStateAction } from "react";

type PropTypes = {
  address: any;
  setChangeAddress: Dispatch<SetStateAction<boolean>>;
  setSelectedAddress: Dispatch<SetStateAction<number>>;
  selectedAddress: number;
};
const ModalChangeAddress = (props: PropTypes) => {
  const {
    address = [],
    setChangeAddress,
    setSelectedAddress,
    selectedAddress,
  } = props;
  return (
    <Modal onClose={() => setChangeAddress(false)}>
      <h1 className="mb-3">Change address?</h1>
      {address.map((item: any, id: number) => (
        <div
          key={item.addressLine}
          className={`flex flex-col w-full border p-3 rounded-lg mt-3 cursor-pointer ${
            selectedAddress === id ? "border-2 border-black" : "border-[#ddd]"
          }`}
          onClick={() => {
            setSelectedAddress(id);
            setChangeAddress(false);
          }}
        >
          <p>Recipient: {item.recipient}</p>
          <p>phone: {item.phone}</p>
          <p>Address: {item.addressLine}</p>
          <p>Note: {item.note}</p>
        </div>
      ))}
    </Modal>
  );
};
export default ModalChangeAddress;
