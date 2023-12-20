import { Shell } from "lucide-react";
// import { Products } from "@/constants/dummy";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Progress } from "../ui/progress";
import StarRating from "../ui/star";
import Link from "next/link";
import { ToRupiah } from "../util/currency";

async function getData() {
  const res = await fetch("http://localhost:3000/api/p?limit=8", {
    cache: "no-store",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const TrendingProducts = async () => {
  const Products = await getData();
  // const productWithHighestRatingCount = Products.data.reduce(
  //   (acc: any, product: any) => {
  //     if (product.rating.count > acc.rating.count) {
  //       return product;
  //     }
  //   },
  //   Products[0]
  // );

  const productWithHighestRatingCount = Products.data[0];
  return (
    <div className="bg-white w-full dark:bg-gray-900 my-4">
      <div className="max-w-screen-xl flex flex-wrap items-center mx-auto border-b-2 border-gray-200 dark:border-gray-600">
        <Shell className="w-6 h-6 mx-2 text-secondary" />
        <h2 className="relative text-2xl font-bold">Trending Products</h2>
      </div>

      {/* trending products */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[.75fr_1fr_1fr] mt-4">
        <Card className="col-span-1 row-span-4 hover:bg-gray-100 dark:hover:bg-gray-800 hover:cursor-pointer">
        <Link href={`/p/cat/${productWithHighestRatingCount.category.split(" ").join("-")}/${
              productWithHighestRatingCount._id
            }`}>
          <CardHeader>
            <div className="text-center ">
              <p className="uppercase mb-2">Offer ends at</p>
              <ul className="flex gap-4 justify-center items-center">
                <li className="relative w-[34px] h-[34px] p-2 text-secondaryDark bg-gray-300 rounded-lg dark:bg-gray-700 leading-none">
                  1
                </li>
                <li className="relative w-[34px] h-[34px] p-2 text-secondaryDark bg-gray-300 rounded-lg dark:bg-gray-700 leading-none">
                  15
                </li>
                <li className="relative w-[34px] h-[34px] p-2 text-secondaryDark bg-gray-300 rounded-lg dark:bg-gray-700 leading-none">
                  27
                </li>
                <li className="relative w-[34px] h-[34px] p-2 text-secondaryDark bg-gray-300 rounded-lg dark:bg-gray-700 leading-none">
                  50
                </li>
              </ul>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <Image
                src={productWithHighestRatingCount.imageData[0].image}
                alt={productWithHighestRatingCount.title}
                width={200}
                height={200}
                className="center w-full h-96 object-cover"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 items-center mt-2">
                <StarRating
                  rating={
                    productWithHighestRatingCount.rating
                      ? productWithHighestRatingCount.rating.rate
                      : Math.floor(Math.random() * 5) + 1
                  }
                />
                <p className="text-secondaryDark">
                  {productWithHighestRatingCount.rating
                    ? productWithHighestRatingCount.rating.count
                    : Math.floor(Math.random() * 100)}
                </p>
              </div>
              <h2 className="font-bold">
                {productWithHighestRatingCount.title}
              </h2>
              <div className="flex gap-4 items-center">
                <h3 className="font-bold text-primary">
                  {ToRupiah(productWithHighestRatingCount.price)}
                </h3>
                <h5 className="text-secondaryDark text-xs line-through">
                  {ToRupiah(productWithHighestRatingCount.price * 1.5)}
                </h5>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs">
                  Stock:{" "}
                  <span className="text-secondaryDark font-bold">107</span>
                </p>
                <p className="text-xs">
                  Sold: <span className="text-secondaryDark font-bold">15</span>
                </p>
              </div>
              <Progress value={30} className="h-2" />
            </div>
          </CardContent>
        </Link>
        </Card>
        {Products.data.map((product: IProduct) => (
          <Link
            href={`/p/cat/${product.category.split(" ").join("-")}/${
              product._id
            }`}
            className="flex hover:bg-gray-200 dark:hover:bg-gray-700 p-4 rounded-lg cursor-pointer m-1"
            key={product._id}
          >
            <div className="w-[100px] h-[120px]">
              <Image
                src={product.imageData[0].image}
                alt={product.title}
                width={200}
                height={200}
                className="object-cover w-[100px] h-[120px]"
              />
            </div>
            <div className="flex flex-col gap-2 ml-4 w-full">
              <h2 className="font-semibold">{product.title}</h2>
              <div className="flex gap-2 items-center mt-2">
                <StarRating
                  rating={
                    product.rating
                      ? product.rating.rate
                      : Math.floor(Math.random() * 5) + 1
                  }
                />
                <p className="text-secondaryDark">
                  {product.rating
                    ? product.rating.count
                    : Math.floor(Math.random() * 100)}
                </p>
              </div>
              <div className="flex gap-4 items-center">
                <h3 className="font-bold text-primary">
                  {ToRupiah(product.price)}
                </h3>
                <h5 className="text-secondaryDark text-xs line-through">
                  {ToRupiah(product.price * 1.5)}
                </h5>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">260 sold</p>
                <p className="text-xs text-gray-500">Free Shipping</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendingProducts;
