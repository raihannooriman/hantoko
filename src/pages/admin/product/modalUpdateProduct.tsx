import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import InputFile from "@/components/ui/inputFile";
import Modal from "@/components/ui/modal";
import Select from "@/components/ui/select";
import { uploadFile } from "@/lib/firebase/service";
import productServices from "@/services/product";
import { Product } from "@/types/product.type";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

type Proptypes = {
  updatedProduct: Product | any;
  setUpdatedProduct: Dispatch<SetStateAction<boolean>>;
  setToaster: Dispatch<SetStateAction<{}>>;
  setProduct: Dispatch<SetStateAction<Product[]>>;
};

const ModalUpdateProduct = (props: Proptypes) => {
  const {
    updatedProduct = {},
    setUpdatedProduct,
    setToaster,
    setProduct,
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [stockCount, setStockCount] = useState(updatedProduct.stock ?? []);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const session: any = useSession();
  const handleStock = (e: any, i: number, type: string) => {
    const newStockCount: any = [...stockCount];
    newStockCount[i][type] = e.target.value;
    setStockCount(newStockCount);
  };
  const updateProduct = async (
    form: any,
    newImageURL: string = updatedProduct.image
  ) => {
    const stock = stockCount.map((stock: { size: string; qty: number }) => {
      return { size: stock.size, qty: parseInt(`${stock.qty}`) };
    });
    const data = {
      name: form.name.value,
      price: parseInt(form.price.value),
      description: form.description.value,
      category: form.category.value,
      status: form.status.value,
      stock: stock,
      image: newImageURL,
    };
    const result = await productServices.updateProduct(
      updatedProduct.id,
      data,
      session.data?.accessToken
    );
    if (result.status === 200) {
      setIsLoading(false);
      setUploadedImage(null);
      form.reset();
      setUpdatedProduct(false);
      const { data } = await productServices.getAllProducts();
      setProduct(data.data);
      setToaster({
        message: "success add product",
        className: "success",
      });
    } else {
      setIsLoading(false);
      setToaster({
        className: "error",
        message: "failed update product",
      });
    }
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form: any = event.target as HTMLFormElement;
    const file = form.image.files[0];
    if (file) {
      const newName = "main." + file.name.split(".")[1];
      uploadFile(
        updatedProduct.id,
        file,
        newName,
        "products",
        async (status: boolean, newImageURL: string) => {
          if (status) {
            updateProduct(form, newImageURL);
          } else {
            setIsLoading(false);
            setToaster({
              className: "error",
              message: "failed update product",
            });
          }
        }
      );
    } else {
      updateProduct(form);
    }
  };
  return (
    <Modal onClose={() => setUpdatedProduct(false)}>
      <h1>Update Product</h1>
      <form onSubmit={handleSubmit} className="w-full mt-2">
        <Input
          label="Name"
          name="name"
          type="text"
          placeholder="Insert product name"
          defaultValue={updatedProduct.name}
          className="my-2"
        />
        <Input
          label="Price"
          name="price"
          type="number"
          defaultValue={updatedProduct.price}
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
          defaultValue={updatedProduct.category}
          className="my-2"
        />
        <Select
          label="Status"
          name="status"
          options={[
            { label: "Release", value: "true" },
            { label: "Not Release", value: "false" },
          ]}
          defaultValue={updatedProduct.status}
          className="my-2"
        />
        <label htmlFor="image">Image</label>
        <div className="mt-2 mb-4 flex items-center gap-5">
          <Image
            width={200}
            height={200}
            src={
              uploadedImage
                ? URL.createObjectURL(uploadedImage)
                : updatedProduct.image
            }
            alt="image"
            className="w-[15%] aspect-square rounded-md"
          />
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
                defaultValue={item.size}
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
                defaultValue={item.qty}
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
          {isLoading ? "Loading..." : "Update product"}
        </Button>
      </form>
    </Modal>
  );
};
export default ModalUpdateProduct;
