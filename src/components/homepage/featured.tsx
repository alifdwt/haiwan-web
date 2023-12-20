import { Shell, Star } from "lucide-react";
// import { Products } from "@/constants/dummy";
import { Card, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";
import StarRating from "../ui/star";
import { ToRupiah } from "../util/currency";
import Link from "next/link";

async function getData() {
  const res = await fetch("http://localhost:3000/api/p?limit=8");
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const FeaturedProducts = async () => {
  const products = await getData();
  const rateDummy = Math.floor(Math.random() * 5) + 1;
  return (
    <div className="bg-white w-full dark:bg-gray-900 my-4">
      <div className="max-w-screen-xl flex flex-wrap items-center mx-auto border-b-2 border-gray-200 dark:border-gray-600">
        <Shell className="w-6 h-6 mx-2 text-secondary" />
        <h2 className="relative text-2xl font-bold">Featured Products</h2>
      </div>

      {/* featured products */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-4 gap-4 p-4 lg:p-0">
        {products.data.map((product: IProduct) => (
          <Card
            key={product._id}
            className="col-span-1 row-span-4 hover:bg-gray-100 dark:hover:bg-gray-800 hover:cursor-pointer"
          >
            <Link href={`/p/cat/${product.category.split(" ").join("-")}/${
              product._id
            }`}>
            <CardContent>
              <Image
                src={product.imageData[0].image}
                alt={product.title}
                width={200}
                height={200}
                className="w-full object-cover h-96"
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-2 justify-between">
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
    </div>
  );
};

export default FeaturedProducts;
