import AdminLayout from "@/components/layout/adminlayout";
import userServices from "@/services/user";
import { useEffect, useState } from "react";
import Button from "@/components/ui/button";
import ModalUpdateUser from "./modalUpdate";
import ModalDeleteUser from "./modalDelete";

const AdminUsersPage = () => {
  const [updatedUser, setUpdatedUser] = useState<any>({});
  const [users, setUsers] = useState([]);
  const [deleteUser, setDeletedUser] = useState<any>({});
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
          <h1 className="font-bold text-2xl">User Management</h1>
          <table className="w-full border-spacing-0 border-collapse border border-solid mt-5">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-2">#</th>
                <th className="text-left p-2">Fullname</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">Phone</th>
                <th className="text-left p-2">Role</th>
                <th className="text-left p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any, index: number) => {
                return (
                  <tr
                    key={user.id}
                    className={index % 2 === 1 ? "bg-gray-100" : "bg-white"}
                  >
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{user.fullname}</td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">{user.phone}</td>
                    <td className="p-2">{user.role}</td>
                    <td>
                      <div className="flex gap-2">
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
        ></ModalUpdateUser>
      )}
      {Object.keys(deleteUser).length && (
        <ModalDeleteUser
          deleteUser={deleteUser}
          setDeletedUser={setDeletedUser}
          setUsers={setUsers}
        ></ModalDeleteUser>
      )}
    </>
  );
};
export default AdminUsersPage;
