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
import { CreditCardIcon, ShoppingCart, ShoppingCartIcon } from "lucide-react";

const CartNav = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={"ghost"} size={"icon"}>
          <ShoppingCart className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">Cart</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <div className="flex items-center space-x-3">
              <ShoppingCartIcon className="h-5 w-5" />
              <span>View cart</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex items-center space-x-3">
              <CreditCardIcon className="h-5 w-5" />
              <span>Checkout</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CartNav;
