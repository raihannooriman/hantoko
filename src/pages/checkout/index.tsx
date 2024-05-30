import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import { ToasterContext } from "@/contexts/ToasterContext";
import productServices from "@/services/product";
import userServices from "@/services/user";
import { Product } from "@/types/product.type";
import { convertIDR } from "@/utils/currency";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { Fragment, useContext, useEffect, useState } from "react";
import ModalChangeAddress from "./modalChangeAddress";

const CheckoutPage = () => {
  const [profile, setProfile] = useState<any>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [changeAddress, setChangeAddress] = useState(false);
  const { setToaster } = useContext(ToasterContext);
  const session: any = useSession();

  useEffect(() => {
    const getProfile = async () => {
      const { data } = await userServices.getProfile();
      setProfile(data.data);
      if (data?.data?.address?.length > 0) {
        data.data.address.filter((address: { isMain: boolean }, id: number) => {
          if (address.isMain) {
            setSelectedAddress(id);
          }
        });
      }
    };
    if (session.data?.accessToken) {
      getProfile();
    }
  }, [session]);

  useEffect(() => {
    const getAllProducts = async () => {
      const { data } = await productServices.getAllProducts();
      setProducts(data.data);
    };
    getAllProducts();
  }, []);
  const getProduct = (id: string) => {
    const product: any = products.find((product: Product) => product.id === id);
    return product;
  };
  const getTotalPrice = () =>
    profile?.carts?.reduce(
      (acc: number, { id, qty }: { id: string; qty: number }) =>
        acc + (getProduct(id)?.price ?? 0) * qty,
      0
    );
  return (
    <>
      <Head>
        <title>Checkout</title>
      </Head>
      <div className="py-20 px-[15vw] flex gap-14">
        <div className="w-[70%]">
          <h1>Checkout</h1>
          <div className="w-full border border-solid border-[#ddd] p-3 rounded-lg mt-3">
            <h2 className="mb-3">Address</h2>
            {profile?.address?.length > 0 ? (
              <div className="flex flex-col">
                <p>
                  {profile?.address[selectedAddress]?.recipient} -{" "}
                  {profile?.address[selectedAddress]?.phone}
                </p>
                <p>{profile?.address[selectedAddress]?.addressLine}</p>
                <p className="mb-3">
                  Note: {profile?.address[selectedAddress]?.note}
                </p>
                <Button type="button" onClick={() => setChangeAddress(true)}>
                  Change Address
                </Button>
              </div>
            ) : (
              <Button type="button" onClick={() => setChangeAddress(true)}>
                Add address
              </Button>
            )}
          </div>
          {profile?.carts?.length > 0 ? (
            <div className="w-full border border-solid border-[#ddd] p-3 rounded-lg mt-3 flex flex-col gap-5">
              {profile?.carts?.map(
                (item: { id: string; size: string; qty: number }) => (
                  <Fragment key={`${item.id}-${item.size}`}>
                    <div className="w-full flex gap-5">
                      {getProduct(item.id)?.image && (
                        <Image
                          src={`${getProduct(item.id)?.image}`}
                          width={160}
                          height={160}
                          alt={`${item.id}-${item.size}`}
                          className="w-16 h-16 rounded-lg"
                        />
                      )}
                      <div className="w-full">
                        <h4 className="font-bold text-lg">
                          {getProduct(item.id)?.name}
                        </h4>
                        <div className="mb-2">
                          <label className="flex items-center gap-2">
                            Size {item.size}
                          </label>
                          <label className="flex items-center gap-2">
                            Quantity {item.qty}
                          </label>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">
                          {convertIDR(getProduct(item.id)?.price)}
                        </h4>
                      </div>
                    </div>
                    <hr />
                  </Fragment>
                )
              )}
            </div>
          ) : (
            <div className="mt-3">
              <h1 className="text-3xl font-medium text-[#8f8f8f]">
                Pesananmu masih kosong
              </h1>
            </div>
          )}
        </div>
        <div className="w-[30%]">
          <h1>Summary</h1>
          <div className="flex justify-between my-4">
            <h4 className="font-bold">Subtotal</h4>
            <p>{convertIDR(getTotalPrice())}</p>
          </div>
          <div className="flex justify-between my-2">
            <h4 className="font-bold">Delivery</h4>
            <p>{convertIDR(0)}</p>
          </div>
          <div className="flex justify-between my-2">
            <h4 className="font-bold">Tax</h4>
            <p>{convertIDR(0)}</p>
          </div>
          <hr />
          <div className="flex justify-between my-2">
            <h4 className="font-bold">Total</h4>
            <p>{convertIDR(getTotalPrice())}</p>
          </div>
          <hr />
          <Button type="button" className="w-full mt-5">
            Process Payment
          </Button>
        </div>
      </div>
      {changeAddress && (
        <ModalChangeAddress
          profile={profile}
          setProfile={setProfile}
          setChangeAddress={setChangeAddress}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
      )}
    </>
  );
};
export default CheckoutPage;
