import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import Select from "@/components/ui/select";
import { ToasterContext } from "@/contexts/ToasterContext";
import userServices from "@/services/user";
import { User } from "@/types/user.type";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";

type PropTypes = {
  setUpdatedUser: Dispatch<SetStateAction<{}>>;
  updatedUser: User | any;
  setUsers: Dispatch<SetStateAction<User[]>>;
};

const ModalUpdateUser = (props: PropTypes) => {
  const { updatedUser, setUpdatedUser, setUsers } = props;
  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const data = {
      role: form.role.value,
    };

    if (!updatedUser) {
      console.error("updatedUser is undefined");
      return;
    }

    const result = await userServices.updateUser(updatedUser.id, data);

    if (result.status === 200) {
      setIsLoading(false);
      setUpdatedUser({});
      const { data } = await userServices.getAllUsers();
      setUsers(data.data);
      setToaster({
        message: "Success update user.",
        className: "success",
      });
    } else {
      setIsLoading(false);
      setToaster({
        message: "Failed update user.",
        className: "error",
      });
    }
  };

  return (
    <Modal onClose={() => setUpdatedUser({})}>
      <h1>Update User</h1>
      <form onSubmit={handleUpdateUser} className="mt-2">
        <Input
          label="Email"
          name="email"
          type="email"
          defaultValue={updatedUser?.email || ""}
          disabled
          className="my-2"
        />
        <Input
          label="Fullname"
          name="fullname"
          type="text"
          defaultValue={updatedUser?.fullname || ""}
          disabled
          className="my-2"
        />
        <Input
          label="Phone"
          name="phone"
          type="number"
          defaultValue={updatedUser?.phone || ""}
          disabled
          className="my-2"
        />
        <Select
          label="Role"
          name="role"
          defaultValue={updatedUser?.role || ""}
          options={[
            { label: "Member", value: "member" },
            { label: "Admin", value: "admin" },
          ]}
          className="my-2"
        />
        <Button className="mt-5" type="submit">
          {isLoading ? "Updating..." : "Update"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;
