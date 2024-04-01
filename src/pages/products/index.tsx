import productServices from "@/services/product";
import { Products } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Card from "./card";

const ProductPage = () => {
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
      <Head>
        <title>Product</title>
      </Head>
      <div className="px-5 py-20">
        <h1 className="font-medium text-2xl">
          All Product ({products.length})
        </h1>
        <div className="flex gap-14">
          <div className="w-[15%]">
            <div className="p-5 border-b border-solid border-black">
              <h4 className="text-lg font-semibold">Gender</h4>
              <div className="flex flex-col gap-1 mt-2">
                <div>
                  <input type="checkbox" id="men" />
                  <label className="ml-2 text-lg" htmlFor="men">
                    Men
                  </label>
                </div>
                <div>
                  <input type="checkbox" id="women" />
                  <label className="ml-2 text-lg" htmlFor="women">
                    Women
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full grid gap-5 grid-cols-3 gap-y-10">
            {products.map((product) => (
              <Card product={product} key={product.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductPage;
