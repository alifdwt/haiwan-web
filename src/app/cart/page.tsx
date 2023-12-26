"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ToRupiah } from "@/components/util/currency";
import { productsDummy } from "@/constants/dummy";
import { useShoppingCart } from "@/context/shoppingCartContext";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const {
    cartQuantity,
    cartItems,
    removeFromCart,
    increaseCartQuantity,
    decreaseCartQuantity,
  } = useShoppingCart();
  const filteredProducts = cartItems.map((cartItem) => {
    const product = productsDummy.find(
      (productItem) => productItem._id === cartItem.id
    );
    return { ...product, quantity: cartItem.quantity }; // Tambahkan quantity dari shoppingCart
  });

  const totalPrice = filteredProducts.reduce((total, product: any) => {
    return total + product.price * product.quantity;
  }, 0);

  return (
    <div className="max-w-screen-xl mx-auto my-5 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-2 flex flex-col gap-2">
        {filteredProducts.map((product: any) => (
          <div key={product._id} className="flex flex-col gap-2 border p-4">
            <div className="flex justify-between gap-4 w-full">
              <div className="flex items-center space-x-3">
                <Image
                  src={product.imageData[0].image}
                  alt="product"
                  width={50}
                  height={50}
                  className="h-12 w-12 object-cover rounded-md"
                />
                <div className="flex flex-col ml-4">
                  <p>{product.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {product.quantity} x {ToRupiah(product.price)}
                  </p>
                </div>
              </div>
              <Button
                variant={"destructive"}
                size={"icon"}
                onClick={() => removeFromCart(product._id)}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
            <Separator />
            <div className="flex justify-between gap-4 w-full">
              <Input type="text" placeholder="Write a note" />
              <div className="flex gap-2 items-center justify-center">
                <Button
                  onClick={() => decreaseCartQuantity(product._id)}
                  variant={"secondary"}
                  className="flex gap-2 text-white rounded-full"
                >
                  -
                </Button>
                <div>
                  <span>{product.quantity}</span>
                </div>
                <Button
                  onClick={() => increaseCartQuantity(product._id)}
                  variant={"secondary"}
                  className="flex gap-2 text-white rounded-full"
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Card>
        <CardHeader className="flex flex-col gap-2">
          <CardTitle>Cart Summary</CardTitle>
          <Input type="text" placeholder="Do you have a promo code?" />
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex justify-between">
            <p>Total Price ({cartQuantity} items)</p>
            <p className="font-bold">{ToRupiah(totalPrice)}</p>
          </div>
          <Separator />
          <div className="flex justify-between">
            <p>Total Price</p>
            <p className="font-bold">{ToRupiah(totalPrice)}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/cart/shipment">Checkout</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
