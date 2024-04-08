import Button from "@/components/ui/button";
import productServices from "@/services/product";
import userServices from "@/services/user";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const DetailProductPage = ({
  setToaster,
}: {
  setToaster: Dispatch<SetStateAction<{}>>;
}) => {
  const { id } = useRouter().query;
  const session: any = useSession();
  const [product, setProduct] = useState<Product | any>({});
  const [cart, setCart] = useState<any>([]);
  const { status } = useSession();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState("");
  const handleAddToCart = async () => {
    if (selectedSize !== "") {
      let newCart = [];
      if (
        cart.filter((item: any) => item.id === id && item.size === selectedSize)
          .length > 0
      ) {
        newCart = cart.map((item: any) => {
          if (item.id === id && item.size === selectedSize) {
            item.qty += 1;
          }
          return item;
        });
      } else {
        newCart = [...cart, { id, size: selectedSize, qty: 1 }];
      }
      try {
        const result = await userServices.addToCart(
          { carts: newCart },
          session?.data?.accessToken
        );
        if (result.status === 200) {
          setSelectedSize("");
          setToaster({
            message: "Success add to cart.",
            className: "success",
          });
        }
      } catch (error) {
        setToaster({
          message: "Error add to cart.",
          className: "error",
        });
      }
    }
  };
  const getDetailProduct = async (id: string) => {
    const { data } = await productServices.getDetailProduct(id);
    setProduct(data.data);
  };
  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };
  const getCart = async (token: string) => {
    const { data } = await userServices.getCart(token);
    setCart(data.data);
  };
  useEffect(() => {
    getDetailProduct(id as string);
  }, [id]);
  useEffect(() => {
    if (session.data?.accessToken) {
      getCart(session.data?.accessToken);
    }
  }, [session]);
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <div className="py-[20vh] px-[20vw]">
        <div className="flex gap-14">
          <div className="w-[60%]">
            <Image
              src={product?.image}
              alt={product?.name}
              width={400}
              height={400}
              className="w-full h-auto aspect-square rounded-lg"
            />
          </div>
          <div className="w-[40%]">
            <h1 className="font-bold">{product?.name}</h1>
            <h3>{product?.category}</h3>
            <h3 className="font-bold mt-2">{convertIDR(product?.price)}</h3>
            <p className="mt-2 text-justify">{product?.description}</p>
            <p className="mt-2">Select size</p>
            <div className="grid grid-cols-3 gap-3 -mt-3">
              {product?.stock?.map((item: { size: string; qty: number }) => (
                <div key={item.size}>
                  <input
                    type="radio"
                    id={`size-${item.size}`}
                    name="size"
                    className="appearance-none"
                    disabled={item.qty === 0}
                    onClick={() => setSelectedSize(item.size)}
                    onChange={() => handleSizeChange(item.size)}
                    checked={selectedSize === item.size}
                  />
                  <label
                    htmlFor={`size-${item.size}`}
                    className={`w-full h-full border border-solid border-[#c7c7c7] flex items-center justify-center cursor-pointer rounded-md ${
                      selectedSize === item.size ? "ring ring-black" : ""
                    } ${item.qty === 0 ? "opacity-50" : ""}`}
                  >
                    {item.size}
                  </label>
                </div>
              ))}
            </div>
            <Button
              type={status === "authenticated" ? "submit" : "button"}
              onClick={() => {
                status === "unauthenticated"
                  ? router.push(`/auth/login?callbackUrl=${router.asPath}`)
                  : handleAddToCart();
              }}
              className="mt-10 w-full"
            >
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default DetailProductPage;
