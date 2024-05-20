import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import { ToasterContext } from "@/contexts/ToasterContext";
import productServices from "@/services/product";
import userServices from "@/services/user";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { Fragment, useContext, useEffect, useState } from "react";

const CheckoutPage = () => {
  const [cart, setCart] = useState<any>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const { setToaster } = useContext(ToasterContext);
  const session: any = useSession();
  const getCart = async () => {
    const { data } = await userServices.getCart();
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
      getCart();
    }
  }, [session]);
  const getProduct = (id: string) => {
    const product: any = products.find((product: Product) => product.id === id);
    return product;
  };
  const getOptionSize = (id: string, selected: string) => {
    const product = products.find((product: Product) => product.id === id);
    const options = product?.stock.map(
      (stock: { size: string; qty: number }) => {
        if (stock.qty > 0) {
          return {
            label: stock.size,
            value: stock.size,
            selected: stock.size === selected,
          };
        }
      }
    );
    const data = options?.filter((option) => option !== undefined);
    return data;
  };

  const getTotalPrice = () => {
    const total = cart.reduce(
      (acc: number, item: { id: string; size: string; qty: number }) => {
        const product: any = getProduct(item.id);
        return acc + parseInt(product?.price) * item.qty;
      },
      0
    );
    return total;
  };
  const handleDeleteCart = async (id: string, size: string) => {
    const newCart = cart.filter((item: { id: string; size: string }) => {
      return item.id !== id || item.size !== size;
    });
    try {
      const result = await userServices.addToCart({
        carts: newCart,
      });
      if (result.status === 200) {
        setCart(newCart);
        setToaster({
          message: "Success delete item.",
          className: "success",
        });
      }
    } catch (error) {
      setToaster({
        message: "failed delete item.",
        className: "error",
      });
    }
  };
  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      <div className="py-20 px-[15vw] flex gap-14">
        <div className="w-[70%]">
          <h1>Cart</h1>
          <div className="w-full mt-4 flex flex-col gap-5">
            {cart.length > 0 ? (
              cart.map((item: { id: string; size: string; qty: number }) => (
                <Fragment key={`${item.id}-${item.size}`}>
                  <div className="w-full flex gap-5">
                    {getProduct(item.id)?.image && (
                      <Image
                        src={`${getProduct(item.id)?.image}`}
                        width={160}
                        height={160}
                        alt={`${item.id}-${item.size}`}
                        className="w-16 h-16 rounded-lg"
                      />
                    )}
                    <div className="w-full">
                      <h4 className="font-bold text-lg">
                        {getProduct(item.id)?.name}
                      </h4>
                      <div className="mb-2">
                        <label className="flex items-center gap-2">
                          Size {item.size}
                        </label>
                        <label className="flex items-center gap-2">
                          Quantity {item.qty}
                        </label>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">
                        {convertIDR(getProduct(item.id)?.price)}
                      </h4>
                    </div>
                  </div>
                  <hr />
                </Fragment>
              ))
            ) : (
              <div className="mt-3">
                <h1 className="text-3xl font-medium text-[#8f8f8f]">
                  Pesananmu masih kosong
                </h1>
              </div>
            )}
          </div>
        </div>
        <div className="w-[30%]">
          <h1>Summary</h1>
          <div className="flex justify-between my-4">
            <h4 className="font-bold">Subtotal</h4>
            <p>{convertIDR(getTotalPrice())}</p>
          </div>
          <div className="flex justify-between my-2">
            <h4 className="font-bold">Delivery</h4>
            <p>{convertIDR(0)}</p>
          </div>
          <div className="flex justify-between my-2">
            <h4 className="font-bold">Tax</h4>
            <p>{convertIDR(0)}</p>
          </div>
          <hr />
          <div className="flex justify-between my-2">
            <h4 className="font-bold">Total</h4>
            <p>{convertIDR(getTotalPrice())}</p>
          </div>
          <hr />
          <Button type="button" className="w-full mt-5">
            Checkout
          </Button>
        </div>
      </div>
    </>
  );
};
export default CheckoutPage;
