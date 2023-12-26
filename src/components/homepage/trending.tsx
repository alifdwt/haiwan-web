"use client";

import { Shell } from "lucide-react";
// import { Products } from "@/constants/dummy";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Progress } from "../ui/progress";
import StarRating from "../ui/star";
import Link from "next/link";
import { ToRupiah } from "../util/currency";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useState } from "react";
import TrendingSection from "./trending-section";

export type ProductResponse = {
  status: number;
  message: string;
  data: IProduct[];
};

const TrendingProducts = () => {
  const [fetching, setFetching] = useState(false);
  const [products, setProducts] = useState<ProductResponse>();

  useEffect(() => {
    const getProducts = async () => {
      setFetching(true);
      try {
        const response = await fetch("http://localhost:3000/api/p?limit=8");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setFetching(false);
      }
    };
    getProducts();
  }, []);

  return (
    <div className="bg-white w-full dark:bg-gray-900 my-4">
      <div className="max-w-screen-xl flex flex-wrap items-center mx-auto border-b-2 border-gray-200 dark:border-gray-600">
        <Shell className="w-6 h-6 mx-2 text-secondary" />
        <h2 className="relative text-2xl font-bold">Trending Products</h2>
      </div>

      {/* {products !== null ? (
        <TrendingSection products={products} />
      ) : (
        <TrendingSkeleton value={8} />
      )} */}
      {products === undefined ? (
        <TrendingSkeleton value={8} />
      ) : (
        <TrendingSection products={products as ProductResponse} />
      )}
    </div>
  );
};

export default TrendingProducts;

export const TrendingSkeleton = ({ value }: { value: number }) => {
  return (
    <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[.75fr_1fr_1fr] mt-4">
      <Card className="col-span-1 row-span-4">
        <CardHeader>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
        <Skeleton className="h-96 w-full rounded-md" />
        <CardFooter className="flex flex-col gap-4 justify-between p-1 h-[120px]">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </CardFooter>
      </Card>
      {[...Array(value)].map((_, index) => (
        <div key={index} className="flex p-4 rounded-lg m-1">
          <div className="w-[100px] h-[120px]">
            <Skeleton className="w-[100px] h-[120px] rounded-md" />
          </div>
          <div className="flex flex-col gap-2 ml-4 w-full">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};
