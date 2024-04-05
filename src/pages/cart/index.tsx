import productServices from "@/services/product";
import userServices from "@/services/user";
import { Product } from "@/types/product.type";
import { useSession } from "next-auth/react";
import Head from "next/head";
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
  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <div className="py-20 px-[20vw] flex gap-7">
        <div className="w-[70%]">
          <h1 className="">Cart</h1>
          <div className="">
            {cart.map((item: { id: string; size: string; qty: number }) => (
              <div className="" key={`${item.id}-${item.size}`}>
                {item.id}
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
