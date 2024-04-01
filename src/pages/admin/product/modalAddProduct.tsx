import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import Select from "@/components/ui/select";
import { useState } from "react";

const ModalAddProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [stockCount, setStockCount] = useState([{ size: "", qty: 0 }]);
  const handleStock = (e: any, i: number, type: string) => {
    const newStockCount: any = [...stockCount];
    newStockCount[i][type] = e.target.value;
    setStockCount(newStockCount);
  };
  return (
    <Modal onClose={() => ({})}>
      <h1 className="text-2xl">Update User</h1>
      <form onSubmit={() => {}} className="">
        <Input
          label="Name"
          name="name"
          type="text"
          placeholder="Insert product name"
        />
        <Input label="Price" name="price" type="number" />
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
          <div className="" key={i}>
            <div className="">
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
            <div className="">
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
          className=""
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
