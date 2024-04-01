import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import InputFile from "@/components/ui/inputFile";
import Modal from "@/components/ui/modal";
import Select from "@/components/ui/select";
import { uploadFile } from "@/lib/firebase/service";
import productServices from "@/services/product";
import { Products } from "@/types/product.type";
import { useSession } from "next-auth/react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

type Proptypes = {
  setModalAddProduct: Dispatch<SetStateAction<boolean>>;
  setToaster: Dispatch<SetStateAction<{}>>;
  setProduct: Dispatch<SetStateAction<Products[]>>;
};

const ModalAddProduct = (props: Proptypes) => {
  const { setModalAddProduct, setToaster, setProduct } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [stockCount, setStockCount] = useState([{ size: "", qty: 0 }]);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const session: any = useSession();
  const handleStock = (e: any, i: number, type: string) => {
    const newStockCount: any = [...stockCount];
    newStockCount[i][type] = e.target.value;
    setStockCount(newStockCount);
  };
  const uploadImage = (id: string, form: any) => {
    const file = form.image.files[0];
    const newName = "main." + file.name.split(".")[1];
    if (file) {
      uploadFile(
        id,
        file,
        newName,
        "products",
        async (status: boolean, newImageURL: string) => {
          if (status) {
            const data = {
              image: newImageURL,
            };
            const result = await productServices.updateProduct(
              id,
              data,
              session.data?.accessToken
            );
            if (result.status === 200) {
              setIsLoading(false);
              setUploadedImage(null);
              form.reset();
              setModalAddProduct(false);
              const { data } = await productServices.getAllProducts();
              setProduct(data.data);
              setToaster({
                message: "success add product",
                className: "success",
              });
            } else {
              setIsLoading(false);
              setToaster({ className: "error", message: "failed add product" });
            }
          } else {
            setIsLoading(false);
            setToaster({ className: "error", message: "failed add product" });
          }
        }
      );
    }
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const data = {
      name: form.name.value,
      price: form.price.value,
      category: form.category.value,
      status: form.status.value,
      stock: stockCount,
      image: "",
    };
    const result = await productServices.addProduct(
      data,
      session.data?.accessToken
    );
    if (result.status === 200) {
      uploadImage(result.data.data.id, form);
    }
  };
  return (
    <Modal onClose={() => setModalAddProduct(false)}>
      <h1 className="text-2xl">Update User</h1>
      <form onSubmit={handleSubmit} className="w-full">
        <Input
          label="Name"
          name="name"
          type="text"
          placeholder="Insert product name"
        />
        <Input
          label="Price"
          name="price"
          type="number"
          placeholder="Insert price"
        />
        <Select
          label="Category"
          name="category"
          options={[
            { label: "Men", value: "men" },
            { label: "Women", value: "women" },
          ]}
        />
        <Select
          label="Status"
          name="status"
          options={[
            { label: "Release", value: "true" },
            { label: "Not Release", value: "false" },
          ]}
        />
        <label htmlFor="stock">Stock</label>
        {stockCount.map((item: { size: string; qty: number }, i: number) => (
          <div className="flex w-full gap-4" key={i}>
            <div className="w-1/2 -mb-5">
              <Input
                label="Size"
                name="size"
                type="text"
                placeholder="Insert product size"
                onChange={(e) => {
                  handleStock(e, i, "size");
                }}
              />
            </div>
            <div className="w-1/2 -mb-5">
              <Input
                label="Qty"
                name="qty"
                type="number"
                placeholder="Insert product qty"
                onChange={(e) => {
                  handleStock(e, i, "qty");
                }}
              />
            </div>
          </div>
        ))}
        <Button
          type="button"
          className="py-2 px-4 text-xs rounded-2xl my-5"
          onClick={() => setStockCount([...stockCount, { size: "", qty: 0 }])}
        >
          Add New Stock
        </Button>
        <label htmlFor="image">Image</label>
        <InputFile
          name="image"
          uploadedImage={uploadedImage}
          setUploadedImage={setUploadedImage}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Add product"}
        </Button>
      </form>
    </Modal>
  );
};
export default ModalAddProduct;
