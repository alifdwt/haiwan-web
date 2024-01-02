"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CreditCardIcon,
  ShoppingCart,
  ShoppingCartIcon,
  Trash2,
} from "lucide-react";
import { productsDummy } from "@/constants/dummy";
import Image from "next/image";
import { ToRupiah } from "@/components/util/currency";
import { useShoppingCart } from "@/context/shoppingCartContext";
import Link from "next/link";

const CartNav = () => {
  const { cartQuantity, cartItems, removeFromCart } = useShoppingCart();
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
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={"ghost"} size={"icon"} className="flex">
          <ShoppingCart className="h-5 w-5" />{" "}
          {cartQuantity > 0 && (
            <sup className="text-xs bg-primary text-primary-foreground rounded-full px-1">
              {cartQuantity}
            </sup>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96" align="end" forceMount>
        <DropdownMenuLabel className="font-normal flex justify-between">
          <p>Cart</p>
          <Link href="/cart" className="text-sm text-primary">
            Show All
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product: any) => (
              <DropdownMenuItem
                key={product._id}
                className="flex justify-between"
              >
                <div className="flex items-center space-x-3">
                  <Image
                    src={product.imageData[0].image}
                    alt="product"
                    width={50}
                    height={50}
                    className="h-12 w-12 object-cover rounded-md"
                  />
                  <div className="flex flex-col ml-4 w-64">
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
              </DropdownMenuItem>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              No item in cart
            </p>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuLabel className="font-normal flex justify-between">
            Total <span className="font-bold">{ToRupiah(totalPrice)}</span>
          </DropdownMenuLabel>
          {/* <DropdownMenuItem>
            <div className="flex items-center space-x-3">
              <CreditCardIcon className="h-5 w-5" />
              <span>Checkout</span>
            </div>
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CartNav;
