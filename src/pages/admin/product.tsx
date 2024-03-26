import AdminLayout from "@/components/layout/adminlayout";
import userServices from "@/services/user";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "@/components/ui/button";
import { User } from "@/types/user.type";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};
const ProductsAdminView = (props: PropTypes) => {
  const { setToaster } = props;
  const [users, setUsers] = useState<User[]>([]);
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
          <h1 className="font-bold text-2xl">Product Management</h1>
          <table className="w-full border-spacing-0 border-collapse border border-solid mt-5">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-2">#</th>
                <th className="text-left p-2">Image</th>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Category</th>
                <th className="text-left p-2">Price</th>
                <th className="text-left p-2">Stock</th>
                <th className="text-left p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr key={""}>
                <td className="p-2">{1}</td>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td className="p-2"></td>
                <td>
                  <div className="flex gap-2">
                    <Button type="button" className="bg-yellow-400">
                      <i className="bx bxs-edit text-xl text-black" />
                    </Button>
                    <Button type="button" className="bg-red-600">
                      <i className="bx bxs-trash text-xl" />
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </>
  );
};
export default ProductsAdminView;
