import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";

type PropTypes = { product: Product };

const Card = ({ product }: PropTypes) => {
  if (!product || !product.image) {
    return null;
  }

  return (
    <div className="cursor-pointer">
      <Image
        className="w-full aspect-square h-auto rounded-lg"
        src={product.image}
        alt="product"
        width="200"
        height="200"
      />
      <p className="text-lg font-semibold mt-2">{product.name}</p>
      <p className="font-medium mt-1">{product.category}</p>
      <p className="font-medium mt-1">{convertIDR(product.price)}</p>
    </div>
  );
};

export default Card;
