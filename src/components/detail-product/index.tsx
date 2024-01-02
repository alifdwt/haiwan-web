import Link from "next/link";
import { Button } from "../ui/button";
import { ToRupiah } from "../util/currency";
import StarRating from "../ui/star";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ProductSwiperJS } from "./product-swiper";
import { AddToCart } from "./add-to-cart";
import { ProductResponse } from "../homepage/trending";

type DetailProductPageProps = {
  params: {
    slug: string[];
  };
};

async function getData(id: string) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/p/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const DetailProductPage = async (props: DetailProductPageProps) => {
  const { params } = props;
  const Product: ProductResponse = await getData(params.slug[1]);
  const dummyStar = Math.floor(Math.random() * 5) + 1;

  return (
    <div className="max-w-screen-xl mx-auto mb-5 p-2">
      <div className="w-full md:flex gap-2 my-4 hidden">
        <Link href="/" className="text-primary">
          Home
        </Link>
        <p>&gt;</p>
        <Link
          href={`/category/${Product.data.subcategory.category.name
            .split(" ")
            .join("-")}`}
          className="text-primary capitalize"
        >
          {Product.data.subcategory.category.name}
        </Link>
        <p>&gt;</p>
        <Link
          href={`/category/${Product.data.subcategory.category.name
            .split(" ")
            .join("-")}/${Product.data.subcategory.name.split(" ").join("-")}`}
          className="text-primary"
        >
          {Product.data.subcategory.name}
        </Link>
        <p>&gt;</p>
        <p>{Product.data.title}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_.75fr]">
        <div className="col-span-1 mx-auto md:w-[500px]">
          <ProductSwiperJS
            images={Product.data.imageData.map((image: any) => image.image)}
          />
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          <h1 className="text-3xl font-extrabold">{Product.data.title}</h1>
          <div className="flex gap-2">
            <StarRating
              rating={
                Product.data.rating ? Product.data.rating.rate : dummyStar
              }
            />
            <p className="text-sm font-medium">
              {Product.data.rating ? Product.data.rating.rate : dummyStar}{" "}
              <span className="text-secondary">/ 5</span>
            </p>
            <p className="text-sm text-secondaryDark">
              {Product.data.rating
                ? Product.data.rating.count
                : Math.floor(Math.random() * 500)}{" "}
              reviews
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-xl font-bold text-primary">
              {ToRupiah(Product.data.price)}
            </p>
            <p className="text-sm text-secondaryDark line-through">
              {ToRupiah(Product.data.price * 1.5)}
            </p>
          </div>
          <p className="text-sm whitespace-pre-line">
            {Product.data.description}
          </p>
          <div className="flex flex-col gap-2 justify-between">
            <Button className="w-full rounded-full">Buy Now</Button>
            <AddToCart id={Product.data._id} />
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Details</AccordionTrigger>
              <AccordionContent>
                <table>
                  {/* <thead>
                    <tr>
                      <th className="text-left">Details</th>
                      <th className="text-left">Value</th>
                    </tr>
                  </thead> */}
                  <tbody>
                    <tr>
                      <td className="text-left">Category</td>
                      <td className="text-left">
                        {Product.data.subcategory.category.name}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-left">Stock</td>
                      <td className="text-left">
                        {Math.floor(Math.random() * 100)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default DetailProductPage;
