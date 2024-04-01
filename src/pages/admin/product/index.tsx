import AdminLayout from "@/components/layout/adminlayout";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Button from "@/components/ui/button";
import Image from "next/image";
import productServices from "@/services/product";
import { convertIDR } from "@/utils/currency";
import { Products } from "@/types/product.type";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};
const ProductsAdminView = (props: PropTypes) => {
  const { setToaster } = props;
  const [products, setProducts] = useState<Products[]>([]);
  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      <AdminLayout>
        <div>
          <h1 className="font-bold text-2xl">Product Management</h1>
          <Button type="button" className="" onClick={() => {}}>
            + Add Product
          </Button>
          <table className="w-full border-spacing-0 border-collapse border border-solid mt-5">
            <thead>
              <tr className="bg-gray-100">
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {products.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td className="p-2 flex justify-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={100}
                      height={100}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{convertIDR(product.price)}</td>
                  <td>
                    <div className="flex gap-2 justify-center">
                      <Button type="button" className="bg-yellow-400">
                        <i className="bx bxs-edit text-xl text-black" />
                      </Button>
                      <Button type="button" className="bg-red-600">
                        <i className="bx bxs-trash text-xl" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </>
  );
};
export default ProductsAdminView;
