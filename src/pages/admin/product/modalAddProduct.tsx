import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import InputFile from "@/components/ui/inputFile";
import Modal from "@/components/ui/modal";
import Select from "@/components/ui/select";
import { ToasterContext } from "@/contexts/ToasterContext";
import { uploadFile } from "@/lib/firebase/service";
import productServices from "@/services/product";
import { Product } from "@/types/product.type";
import Image from "next/image";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";

type Proptypes = {
  setModalAddProduct: Dispatch<SetStateAction<boolean>>;
  setProduct: Dispatch<SetStateAction<Product[]>>;
};

const ModalAddProduct = (props: Proptypes) => {
  const { setModalAddProduct, setProduct } = props;
  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);
  const [stockCount, setStockCount] = useState([{ size: "", qty: 0 }]);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
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
            const result = await productServices.updateProduct(id, data);
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
    const stock = stockCount.map((stock) => {
      return { size: stock.size, qty: parseInt(`${stock.qty}`) };
    });
    const data = {
      name: form.name.value,
      price: parseInt(form.price.value),
      description: form.description.value,
      category: form.category.value,
      status: form.status.value,
      stock: stock,
      image: "",
    };
    const result = await productServices.addProduct(data);
    if (result.status === 200) {
      uploadImage(result.data.data.id, form);
    }
  };
  return (
    <Modal onClose={() => setModalAddProduct(false)}>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit} className="w-full mt-2">
        <Input
          label="Name"
          name="name"
          type="text"
          placeholder="Insert product name"
          className="my-2"
        />
        <Input
          label="Price"
          name="price"
          type="number"
          placeholder="Insert price"
          className="my-2"
        />
        <Input
          label="Description"
          name="description"
          type="text"
          placeholder="Insert description"
          className="my-2"
        />
        <Select
          label="Category"
          name="category"
          options={[
            { label: "Men", value: "men" },
            { label: "Women", value: "women" },
          ]}
          className="my-2"
        />
        <Select
          label="Status"
          name="status"
          options={[
            { label: "Release", value: "true" },
            { label: "Not Release", value: "false" },
          ]}
          className="my-2"
        />
        <label htmlFor="image">Image</label>
        <div className="mt-2 mb-4 flex items-center gap-5">
          {uploadedImage ? (
            <Image
              width={200}
              height={200}
              src={URL.createObjectURL(uploadedImage)}
              alt="image"
              className="w-[15%] aspect-square rounded-md"
            />
          ) : (
            <div className="w-[15%] aspect-square rounded-md bg-[#eee] flex justify-center items-center">
              no image
            </div>
          )}
          <InputFile
            name="image"
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
          />
        </div>
        <label htmlFor="stock">Stock</label>
        {stockCount.map((item: { size: string; qty: number }, i: number) => (
          <div className="flex w-full gap-4 mb-5" key={i}>
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
          className="py-2 px-4 text-xs rounded-2xl my-8"
          onClick={() => setStockCount([...stockCount, { size: "", qty: 0 }])}
        >
          Add New Stock
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Add product"}
        </Button>
      </form>
    </Modal>
  );
};
export default ModalAddProduct;
