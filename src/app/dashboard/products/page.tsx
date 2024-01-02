"use client";

import FormDashboard from "@/components/dashboard/form";
import { ProductsDataTable } from "@/components/dashboard/products/data-table";
import { ProductsResponse } from "@/components/homepage/trending";
import columns from "@/components/dashboard/products/columns";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardProductPage() {
  const [products, setProducts] = useState<ProductsResponse>();
  const [fetching, setFetching] = useState(false);
  const { data: session, status }: any = useSession();

  useEffect(() => {
    const getProductsByCreator = async () => {
      setFetching(true);
      try {
        const response = await fetch(
          `/api/p?creator=${session?.user?.id || ""}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
          }
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setFetching(false);
      }
    };
    getProductsByCreator();
  }, [session?.user?.id]);

  return (
    <>
      <h1 className="text-3xl font-bold">Products</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
        necessitatibus quaerat vel exercitationem corrupti expedita pariatur
        itaque cumque, magnam odit nemo hic maxime ducimus alias omnis veritatis
        sed eos, accusantium rem, porro iste a? Cupiditate, voluptas quas eos
        deserunt tenetur autem reiciendis illum, eum veritatis culpa aliquam
        vero, quaerat alias.
      </p>
      <FormDashboard type="Add" submitting={false} />
      {products ? (
        <ProductsDataTable data={products?.data} columns={columns} />
      ) : (
        <Skeleton className="h-96 w-full rounded-md" />
      )}
    </>
  );
}
