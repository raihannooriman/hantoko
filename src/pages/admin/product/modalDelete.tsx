import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { deleteFile } from "@/lib/firebase/service";
import productServices from "@/services/product";
import { Product } from "@/types/product.type";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
  setDeletedProduct: Dispatch<SetStateAction<{}>>;
  deletedProduct: Product | any;
  setProduct: Dispatch<SetStateAction<Product[]>>;
};
const ModalDeleteProduct = (props: PropTypes) => {
  const { deletedProduct, setDeletedProduct, setProduct, setToaster } = props;
  const session: any = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async () => {
    const result = await productServices.deleteProduct(
      deletedProduct.id,
      session.data?.accessToken
    );
    if (result.status === 200) {
      setIsLoading(false);
      deleteFile(
        `/images/products/${deletedProduct.id}/${
          deletedProduct.image.split("%2F")[3].split("?")[0]
        }`,
        async (status: boolean) => {
          console.log(status);
          if (status) {
            setToaster({
              message: "Success delete product.",
              className: "success",
            });
            setDeletedProduct({});
            const { data } = await productServices.getAllProducts();
            setProduct(data.data);
          }
        }
      );
    } else {
      setIsLoading(false);
      setToaster({
        message: "Failed delete product.",
        className: "error",
      });
    }
  };
  return (
    <Modal onClose={() => setDeletedProduct({})}>
      <h1 className="mb-3">Are you sure?</h1>
      <Button type="submit" onClick={() => handleDelete()}>
        {isLoading ? "Deleting..." : "delete"}
      </Button>
    </Modal>
  );
};
export default ModalDeleteProduct;
