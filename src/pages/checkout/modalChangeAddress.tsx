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
  profile: any;
  setChangeAddress: Dispatch<SetStateAction<boolean>>;
  setSelectedAddress: Dispatch<SetStateAction<number>>;
  setProfile: Dispatch<SetStateAction<any>>;
  selectedAddress: number;
};
const ModalChangeAddress = (props: PropTypes) => {
  const {
    profile,
    setChangeAddress,
    setSelectedAddress,
    selectedAddress,
    setProfile,
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isAddNew, setIsAddNew] = useState(false);
  const [updateAddress, setUpdateAddress] = useState<number>();
  const { setToaster } = useContext(ToasterContext);
  const handleAddAddress = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    let data;
    if (profile.address) {
      data = {
        address: [
          ...profile.address,
          {
            recipient: form.recipient.value,
            phone: form.phone.value,
            addressLine: form.addressLine.value,
            note: form.note.value,
            isMain: false,
          },
        ],
      };
    } else {
      data = {
        address: [
          ...profile.address,
          {
            recipient: form.recipient.value,
            phone: form.phone.value,
            addressLine: form.addressLine.value,
            note: form.note.value,
            isMain: true,
          },
        ],
      };
    }
    try {
      const result = await userServices.updateProfile(data);
      if (result.status === 200) {
        setIsLoading(false);
        setIsAddNew(false);
        setProfile({ ...profile, address: data.address });
        form.reset();
        setToaster({
          message: "Success add address.",
          className: "success",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        message: "Failed add address",
        className: "error",
      });
    }
  };
  const handleDeleteAddress = async (id: number) => {
    const address = profile.address;
    address.splice(id, 1);
    const data = {
      address,
    };
    try {
      const result = await userServices.updateProfile(data);
      if (result.status === 200) {
        setIsLoading(false);
        setIsAddNew(false);
        setProfile({ ...profile, address: data.address });
        setToaster({
          message: "Success delete address.",
          className: "success",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        message: "Failed delete address",
        className: "error",
      });
    }
  };
  const handleChangeMainAddress = async (id: number) => {
    const address = profile.address;
    address.forEach((item: { isMain: boolean }, index: number) => {
      if (index === id) {
        item.isMain = true;
      } else {
        item.isMain = false;
      }
    });
    const data = {
      address,
    };
    try {
      const result = await userServices.updateProfile(data);
      if (result.status === 200) {
        setIsLoading(false);
        setIsAddNew(false);
        setProfile({ ...profile, address: data.address });
        setToaster({
          message: "Success change address.",
          className: "success",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        message: "Failed delete address",
        className: "error",
      });
    }
  };
  const handleChangeAddress = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const address = profile.address;
    const id = updateAddress || 0;
    address[id] = {
      recipient: form.recipient.value,
      phone: form.phone.value,
      addressLine: form.addressLine.value,
      note: form.note.value,
      isMain: address[id].isMain,
    };
    const data = {
      address,
    };
    try {
      const result = await userServices.updateProfile(data);
      if (result.status === 200) {
        setIsLoading(false);
        setUpdateAddress(undefined);
        setProfile({ ...profile, address: data.address });
        form.reset();
        setToaster({
          message: "Success add address.",
          className: "success",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        message: "Failed add address",
        className: "error",
      });
    }
  };
  return (
    <Modal onClose={() => setChangeAddress(false)}>
      <h1 className="mb-3">Select address</h1>
      {profile?.address?.map((item: any, id: number) => (
        <div className="" key={item.addressLine}>
          <div
            className={`flex w-full border p-3 rounded-lg mt-3 ${
              selectedAddress === id ? "border-2 border-black" : "border-[#ddd]"
            }`}
          >
            <div
              className="w-[95%] flex flex-col gap-2 cursor-pointer"
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
            <div>
              <Button
                onClick={() => handleDeleteAddress(id)}
                type="button"
                className="mt-2 text-xl h-8 w-8 p-0"
                disabled={isLoading || id === selectedAddress}
              >
                <i className="bx bxs-trash" />
              </Button>
              <Button
                onClick={() => handleChangeMainAddress(id)}
                type="button"
                className="mt-2 text-xl h-8 w-8 p-0"
                disabled={isLoading || item.isMain}
              >
                <i className="bx bxs-edit" />
              </Button>
              <Button
                onClick={() =>
                  id === updateAddress
                    ? setUpdateAddress(undefined)
                    : setUpdateAddress(id)
                }
                type="button"
                className="mt-2 text-xl h-8 w-8 p-0"
                disabled={isLoading}
              >
                <i className="bx bx-pencil" />
              </Button>
            </div>
          </div>
          {id === updateAddress && (
            <div className="mt-4">
              <form
                onSubmit={handleChangeAddress}
                className="flex flex-col gap-2"
              >
                <Input
                  type="text"
                  name="recipient"
                  label="Recipient"
                  defaultValue={item.recipient}
                />
                <Input
                  type="text"
                  name="phone"
                  label="Recipient Phone"
                  defaultValue={item.phone}
                />
                <TextArea
                  name="addressLine"
                  label="Address"
                  defaultValue={item.addressLine}
                />
                <Input
                  type="text"
                  name="note"
                  label="Note"
                  defaultValue={item.note}
                ></Input>
                <Button className="mt-5" type="submit" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Submit"}
                </Button>
              </form>
            </div>
          )}
        </div>
      ))}
      <Button
        className="mt-5"
        type="button"
        onClick={() => setIsAddNew(!isAddNew)}
      >
        {isAddNew ? "Cancel" : "Add new address"}
      </Button>
      {isAddNew && (
        <div className="mt-4">
          <form onSubmit={handleAddAddress} className="flex flex-col gap-2">
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
      )}
    </Modal>
  );
};
export default ModalChangeAddress;
