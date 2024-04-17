import AdminLayout from "@/components/layout/adminlayout";
import userServices from "@/services/user";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "@/components/ui/button";
import ModalUpdateUser from "./modalUpdate";
import ModalDeleteUser from "./modalDelete";
import { User } from "@/types/user.type";
import { useSession } from "next-auth/react";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};
const AdminUsersPage = (props: PropTypes) => {
  const { setToaster } = props;
  const session: any = useSession();
  const [updatedUser, setUpdatedUser] = useState<User | {}>({});
  const [users, setUsers] = useState<User[]>([]);
  const [deleteUser, setDeletedUser] = useState<User | {}>({});
  useEffect(() => {
    setUsers(users);
  }, [users]);
  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await userServices.getAllUsers();
      setUsers(data.data);
    };
    getAllUsers();
  }, []);
  return (
    <>
      <AdminLayout>
        <div>
          <h1 className="font-bold">User Management</h1>
          <table className="w-full border-spacing-0 border-collapse border border-solid mt-5">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">#</th>
                <th>Fullname</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: User, index: number) => {
                return (
                  <tr
                    key={user.id}
                    className={` ${
                      index % 2 === 1 ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    <td className="px-2">{index + 1}</td>
                    <td>{user.fullname}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                    <td>
                      <div className="flex gap-3 py-1">
                        <Button
                          type="button"
                          onClick={() => setUpdatedUser(user)}
                          className="bg-yellow-400"
                        >
                          <i className="bx bxs-edit text-xl text-black" />
                        </Button>
                        <Button
                          type="button"
                          className="bg-red-600"
                          onClick={() => setDeletedUser(user)}
                        >
                          <i className="bx bxs-trash text-xl" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {Object.keys(updatedUser).length && (
        <ModalUpdateUser
          updatedUser={updatedUser}
          setUpdatedUser={setUpdatedUser}
          setUsers={setUsers}
          setToaster={setToaster}
        ></ModalUpdateUser>
      )}
      {Object.keys(deleteUser).length && (
        <ModalDeleteUser
          deletedUser={deleteUser}
          setDeletedUser={setDeletedUser}
          setUsers={setUsers}
          setToaster={setToaster}
        ></ModalDeleteUser>
      )}
    </>
  );
};
export default AdminUsersPage;
