import AdminLayout from "@/components/layout/adminlayout";
import userServices from "@/services/user";
import { useEffect, useState } from "react";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";

const AdminUsersPage = () => {
  const [modalUpdateUser, setModalUpdateUser] = useState<any>({});
  const [users, setUsers] = useState([]);
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
        <div className="py-10 px-14">
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
                          onClick={() => setModalUpdateUser(user)}
                        >
                          Update
                        </Button>
                        <Button type="button">Delete</Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {Object.keys(modalUpdateUser).length && (
        <Modal onClose={() => setModalUpdateUser({})}>
          <h1 className=" text-2xl">Update User</h1>
          <p>{modalUpdateUser.email}</p>
        </Modal>
      )}
    </>
  );
};
export default AdminUsersPage;
