import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { ToasterContext } from "@/contexts/ToasterContext";
import { deleteFile } from "@/lib/firebase/service";
import productServices from "@/services/product";
import { Product } from "@/types/product.type";
import { Dispatch, SetStateAction, useContext, useState } from "react";

type PropTypes = {
  setDeletedProduct: Dispatch<SetStateAction<{}>>;
  deletedProduct: Product | any;
  setProduct: Dispatch<SetStateAction<Product[]>>;
};
const ModalChangeAddress = (props: PropTypes) => {
  return (
    <Modal onClose={() => setDeletedProduct({})}>
      <h1 className="mb-3">Are you sure?</h1>
      <Button type="submit" onClick={() => handleDelete()}>
        {isLoading ? "Deleting..." : "delete"}
      </Button>
    </Modal>
  );
};
export default ModalChangeAddress;
