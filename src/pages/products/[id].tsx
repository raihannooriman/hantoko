import Button from "@/components/ui/button";
import productServices from "@/services/product";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DetailProductPage = () => {
  const { id } = useRouter().query;
  const [product, setProduct] = useState<Product | any>({});
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const getDetailProduct = async (id: string) => {
    const { data } = await productServices.getDetailProduct(id);
    setProduct(data.data);
  };
  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
  };
  useEffect(() => {
    getDetailProduct(id as string);
  }, [id]);
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <div className="py-[20vh] px-[25vw]">
        <div className="flex gap-14">
          <div className="w-1/2">
            <Image
              src={product?.image}
              alt={product?.name}
              width={400}
              height={400}
              className="w-full h-auto scale-100"
            />
          </div>
          <div className="w-1/2">
            <h1 className="font-bold text-2xl">{product?.name}</h1>
            <h3>{product?.category}</h3>
            <h3 className="font-bold mt-3">{convertIDR(product?.price)}</h3>
            <p className=" mt-7">Select size</p>
            <div className="grid grid-cols-3 gap-3">
              {product?.stock?.map((item: { size: string; qty: number }) => (
                <div key={item.size}>
                  <input
                    type="radio"
                    id={`size-${item.size}`}
                    name="size"
                    className="appearance-none"
                    disabled={item.qty === 0}
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
            <Button type="submit" className="mt-10 w-full">
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default DetailProductPage;
