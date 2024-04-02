import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import Image from "next/image";

type Proptypes = { product: Product; key: string };

const Card = (props: Proptypes) => {
  const { product, key } = props;
  return (
    <div key={key} className="cursor-pointer">
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
