import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import productServices from "@/services/product";
import userServices from "@/services/user";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Proptypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};
const CartPage = (props: Proptypes) => {
  const { setToaster } = props;
  const [cart, setCart] = useState<any>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const session: any = useSession();
  const getCart = async (token: string) => {
    const { data } = await userServices.getCart(token);
    setCart(data.data);
  };
  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  useEffect(() => {
    if (session.data?.accessToken) {
      getCart(session.data?.accessToken);
    }
  }, [session]);
  console.log(cart);
  console.log(products);
  const getProduct = (id: string) => {
    const product = products.find((product) => product.id === id);
    return product;
  };
  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <div className="py-20 px-[20vw] flex gap-7">
        <div className="w-[70%]">
          <h1 className="">Cart</h1>
          <div className="w-full mt-4">
            {cart.map((item: { id: string; size: string; qty: number }) => (
              <div
                className="w-full flex gap-5"
                key={`${item.id}-${item.size}`}
              >
                <Image
                  src={`${getProduct(item.id)?.image}`}
                  width={150}
                  height={150}
                  alt={`${item.id}-${item.size}`}
                  className="w-36 h-36"
                />
                <div className="w-full">
                  <h4 className="font-bold text-lg">
                    {getProduct(item.id)?.name}
                  </h4>
                  <p className="mt-1">{getProduct(item.id)?.category}</p>
                  <div className="flex items-center gap-5 mt-3">
                    <label className="flex items-center gap-2">
                      Size
                      <Select
                        name="size"
                        options={[{ label: item.size, value: item.size }]}
                      ></Select>
                    </label>
                    <label className="flex items-center gap-2">
                      Quantity
                      <Input
                        name="qty"
                        type="number"
                        className=" w-24"
                        defaultValue={item.qty}
                      />
                    </label>
                  </div>
                </div>
                <div className="">
                  <h4 className="font-bold text-lg">
                    {convertIDR(getProduct(item.id)?.price)}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-[30%]">
          <h1 className="">Summary</h1>
        </div>
      </div>
    </>
  );
};
export default CartPage;
