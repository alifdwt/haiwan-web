"use client";

import { Shell, Star } from "lucide-react";
// import { Products } from "@/constants/dummy";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Image from "next/image";
import StarRating from "../ui/star";
import { ToRupiah } from "../util/currency";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { ProductResponse } from "./trending";
import { useEffect, useState } from "react";

const FeaturedProducts = () => {
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
        <h2 className="relative text-2xl font-bold">Featured Products</h2>
      </div>

      {/* featured products */}
      {products === undefined ? (
        <FeaturedSkeleton value={8} />
      ) : (
        <FeaturedSection products={products as ProductResponse} />
      )}
    </div>
  );
};

export default FeaturedProducts;

export const FeaturedSkeleton = ({ value }: { value: number }) => {
  return (
    <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-4 gap-4 p-4 lg:p-0">
      {[...Array(value)].map((_, index) => (
        <Card className="col-span-1 row-span-4" key={index}>
          <Skeleton className="h-96 w-full rounded-md" />
          <CardFooter className="flex flex-col gap-4 justify-between p-1 h-[120px]">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

const FeaturedSection = ({ products }: { products: ProductResponse }) => {
  const rateDummy = Math.floor(Math.random() * 5) + 1;
  return (
    <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-4 gap-4 p-4 lg:p-0">
      {products.data.map((product: IProduct) => (
        <Card
          key={product._id}
          className="col-span-1 row-span-4 hover:bg-gray-100 dark:hover:bg-gray-800 hover:cursor-pointer"
        >
          <Link
            href={`${product.creator.username.split(" ").join("-")}/${
              product._id
            }`}
          >
            <CardContent className="p-0">
              <Image
                src={product.imageData[0].image}
                alt={product.title}
                width={200}
                height={200}
                className="w-full object-cover h-96 rounded-t-md"
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-4 justify-between p-1 h-[120px]">
              <div className="w-full">
                <div className="flex justify-between w-full">
                  <StarRating
                    rating={product.rating ? product.rating.rate : rateDummy}
                  />
                  <p className="text-sm font-medium">
                    {product.rating ? product.rating.rate : rateDummy}{" "}
                    <span className="text-secondary">/ 5</span>
                  </p>
                </div>
                <p className="text-sm font-medium">{product.title}</p>
              </div>
              <div className="w-full">
                <div className="flex gap-2">
                  <p className="text-sm font-medium text-secondary">
                    {ToRupiah(product.price)}
                  </p>
                  <p className="text-sm font-medium text-secondaryDark line-through">
                    {ToRupiah(product.price * 1.5)}
                  </p>
                </div>
                <div className="flex justify-between w-full">
                  <p className="text-sm font-medium text-secondaryDark">
                    {product.rating
                      ? product.rating.count
                      : Math.floor(Math.random() * 100)}{" "}
                    Reviews
                  </p>
                  <p className="text-sm font-medium text-secondaryDark">
                    420 Sold
                  </p>
                </div>
              </div>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  );
};
