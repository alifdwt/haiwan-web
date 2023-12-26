"use client";

import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import FormDashboard, { ProductFormValues } from "@/components/dashboard/form";
import { useSession } from "next-auth/react";

const ProductsDashboard = () => {
  const { data: session }: any = useSession();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [fetching, setFetching] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      setFetching(true);
      try {
        const response = await fetch(`/api/p?creator=${session?.user?.id}`);
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setFetching(false);
      }
    };
    getProducts();
  }, [session?.user?.id]);

  const createProduct = async (data: ProductFormValues) => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/p/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, userId: session?.user?.id }),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="my-5 p-4 sm:ml-64">
      <h1 className="text-3xl font-bold">Products Dashboard</h1>
      <p className="text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
        ratione, assumenda quisquam totam mollitia dolor amet harum fugit magnam
        possimus accusamus omnis laborum saepe eos ea qui dicta ducimus
        distinctio praesentium doloribus labore quo! Ut tempore necessitatibus
        laudantium nihil eligendi amet nostrum magni eaque quis officia veniam
        expedita, sunt quos?
      </p>
      <div className="mx-auto py-10">
        <FormDashboard
          type="Add"
          onSubmit={createProduct}
          submitting={submitting}
        />
        <DataTable columns={columns} data={products} />
      </div>
    </div>
  );
};

export default ProductsDashboard;
