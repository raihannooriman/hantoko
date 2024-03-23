import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import Select from "@/components/ui/select";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";

const ModalUpdateUser = (props: any) => {
  const { updatedUser, setUpdatedUser, setUsers, setToaster } = props;
  const session: any = useSession();
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

    const result = await userServices.updateUser(
      updatedUser.id,
      data,
      session.data?.accessToken
    );

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
      <h1 className="text-2xl">Update User</h1>
      <form onSubmit={handleUpdateUser}>
        <Input
          label="Email"
          name="email"
          type="email"
          defaultValue={updatedUser?.email || ""}
          disabled
        />
        <Input
          label="Fullname"
          name="fullname"
          type="text"
          defaultValue={updatedUser?.fullname || ""}
          disabled
        />
        <Input
          label="Phone"
          name="phone"
          type="number"
          defaultValue={updatedUser?.phone || ""}
          disabled
        />
        <Select
          label="Role"
          name="role"
          defaultValue={updatedUser?.role || ""}
          options={[
            { label: "Member", value: "member" },
            { label: "Admin", value: "admin" },
          ]}
        />
        <Button type="submit">Update</Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;
