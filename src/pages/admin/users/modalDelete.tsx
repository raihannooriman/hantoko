import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import userServices from "@/services/user";
import { User } from "@/types/user.type";
import { Dispatch, SetStateAction, useState } from "react";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
  setDeletedUser: Dispatch<SetStateAction<{}>>;
  deletedUser: User | any;
  setUsers: Dispatch<SetStateAction<User[]>>;
  session: any;
};
const ModalDeleteUser = (props: PropTypes) => {
  const { deletedUser, setDeletedUser, setUsers, setToaster, session } = props;
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async () => {
    const result = await userServices.deleteUser(
      deletedUser.id,
      session.data?.accessToken
    );
    if (result.status === 200) {
      setIsLoading(false);
      setToaster({
        message: "Success delete user.",
        className: "success",
      });
      setDeletedUser({});
      const { data } = await userServices.getAllUsers();
      setUsers(data.data);
    } else {
      setIsLoading(false);
      setToaster({
        message: "Failed delete user.",
        className: "error",
      });
    }
  };
  return (
    <Modal onClose={() => setDeletedUser({})}>
      <h1 className="mb-3">Are you sure?</h1>
      <Button type="submit" onClick={() => handleDelete()}>
        {isLoading ? "Deleting..." : "delete"}
      </Button>
    </Modal>
  );
};
export default ModalDeleteUser;
