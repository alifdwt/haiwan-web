"use client";

import { Separator } from "@/components/ui/separator";
import AddressList, { AddressesResponse } from "./_components/AddressList";
import ProductList from "./_components/ProductList";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { AddressDummy } from "@/constants/dummy";
import { useShoppingCart } from "@/context/shoppingCartContext";
import ShipmentSummary from "./_components/ShipmentSummary";

export type ProductWithQuantity = IProduct & {
  quantity: number;
};

export default function ShipmentPage() {
  const { data: session }: any = useSession();
  const { cartQuantity, cartItems } = useShoppingCart();
  const [addresses, setAddresses] = useState<AddressesResponse>(AddressDummy);
  const [cartProducts, setCartProducts] = useState<ProductWithQuantity[]>([]);

  useEffect(() => {
    "166";
    const getAddresses = async () => {
      try {
        const response = await fetch(
          `/api/address?creator=${session?.user?.id || ""}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
          }
        );
        const data = await response.json();
        setAddresses(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAddresses();

    const getCartProducts = async () => {
      const productDetails = await Promise.all(
        cartItems.map(async (cartItem) => {
          const response = await fetch(`/api/p/${cartItem.id}`);
          const data = await response.json();
          return { ...data.data, quantity: cartItem.quantity };
        })
      );

      setCartProducts(productDetails);
    };
    getCartProducts();
  }, [session?.user?.id, cartItems]);

  const totalPrice = cartProducts.reduce((total, product: any) => {
    return total + product.price * product.quantity;
  }, 0);

  return (
    <div className="max-w-screen-xl mx-auto my-5">
      {/* <h1 className="text-3xl font-bold">Ini halaman Shipment</h1> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="flex flex-col gap-2">
            <AddressList addresses={addresses} />
            <Separator className="h-3" />
            {cartProducts.length > 0 && (
              <ProductList
                cartProducts={cartProducts}
                totalPrice={totalPrice}
                destination={addresses.data[0].city.id}
              />
            )}
          </div>
        </div>
        <div className="col-span-1">
          <ShipmentSummary totalPrice={totalPrice} />
        </div>
      </div>
    </div>
  );
}
