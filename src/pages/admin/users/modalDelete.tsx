import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import userServices from "@/services/user";

const ModalDeleteUser = (props: any) => {
  const { deleteUser, setDeletedUser, setUsers } = props;
  const handleDelete = async () => {
    userServices.deleteUser(deleteUser.id);
    setDeletedUser({});
    const { data } = await userServices.getAllUsers();
    setUsers(data.data);
  };
  return (
    <Modal onClose={() => setDeletedUser({})}>
      <h1 className="mb-3">Are you sure?</h1>
      <Button type="submit" onClick={() => handleDelete()}>
        Delete
      </Button>
    </Modal>
  );
};
export default ModalDeleteUser;
