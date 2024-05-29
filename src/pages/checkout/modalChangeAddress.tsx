import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import TextArea from "@/components/ui/textArea";
import { ToasterContext } from "@/contexts/ToasterContext";
import userServices from "@/services/user";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";

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
  const [isLoading, setIsLoading] = useState(false);
  const { setToaster } = useContext(ToasterContext);
  const handleChangeAddress = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = {
      recipient: form.recipient.value,
      phone: form.phone.value,
      addressLine: form.addressLine.value,
      note: form.note.value,
    };
    try {
      const result = await userServices.updateProfile(data);
      if (result.status === 200) {
        setIsLoading(false);
        form.reset();
        setToaster({
          message: "Success update profile.",
          className: "success",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        message: "Failed",
        className: "error",
      });
    }
  };
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
      <Button className="mt-5" type="button">
        Add address
      </Button>
      <div className="mt-4">
        <form onSubmit={handleChangeAddress} className="flex flex-col gap-2">
          <Input
            type="text"
            name="recipient"
            label="Recipient"
            placeholder="Insert recipient"
          />
          <Input
            type="text"
            name="phone"
            label="Recipient Phone"
            placeholder="Insert recipient phone"
          />
          <TextArea
            name="addressLine"
            label="Address"
            placeholder="Insert address"
          />
          <Input
            type="text"
            placeholder="Insert note"
            name="note"
            label="Note"
          ></Input>
          <Button className="mt-5" type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </div>
    </Modal>
  );
};
export default ModalChangeAddress;
