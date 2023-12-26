// "use client";
import { SessionProvider } from "next-auth/react";
import { ShoppingCartProvider } from "@/context/shoppingCartContext";

const Provider = ({ children, session }: any) => {
  return (
    <SessionProvider session={session}>
      <ShoppingCartProvider>{children}</ShoppingCartProvider>
    </SessionProvider>
  );
};

export default Provider;
