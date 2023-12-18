import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ToRupiah } from "../util/currency";
import { ShoppingCart } from "lucide-react";
import StarRating from "../ui/star";
import { Input } from "../ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

type DetailProductPageProps = {
  params: {
    slug: string[];
  };
};

async function getData(id: string) {
  const res = await fetch(`http://localhost:3000/api/p?id=${id}`, {
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
  const Product = await getData(params.slug[2]);
  return (
    <div className="max-w-screen-xl mx-auto mb-5">
      <div className="w-full flex gap-2 my-4">
        <Link href="/" className="text-primary">
          Haiwan
        </Link>
        <p>&gt;</p>
        <Link href={`/p/${params.slug[0]}`} className="text-primary">
          {params.slug[0]}
        </Link>
        <p>&gt;</p>
        <Link
          href={`/p/${params.slug[0]}/${params.slug[1]}`}
          className="text-primary"
        >
          {params.slug[1]}
        </Link>
        <p>&gt;</p>
        <p>{Product.data.title}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_.75fr]">
        <div className="col-span-1 flex justify-center">
          <Image
            src={Product.data.image}
            alt={Product.data.title}
            width={100}
            height={100}
            className="w-96 h-96 object-contain"
          />
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          <h1 className="text-3xl font-extrabold">{Product.data.title}</h1>
          <div className="flex gap-2">
            <StarRating rating={Product.data.rating.rate} />
            <p className="text-sm font-medium">
              {Product.data.rating.rate}{" "}
              <span className="text-secondary">/ 5</span>
            </p>
            <p className="text-sm text-secondaryDark">
              {Product.data.rating.count} reviews
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
          <p>{Product.data.description}</p>
          <div className="flex flex-col gap-2 justify-between">
            <Button className="w-full rounded-full">Buy Now</Button>
            <div className="flex gap-2 items-center">
              <div className="flex gap-2 border w-[30%] p-2">
                {/* <Button className="rounded-full bg-gray-200 h-5 w-5">-</Button> */}
                <Input
                  type="number"
                  className="w-full text-center border-none"
                  defaultValue={1}
                />
                {/* <Button className="rounded-full bg-gray-200 h-5 w-5">+</Button> */}
              </div>
              <Button
                variant={"secondary"}
                className="w-[70%] flex gap-2 text-white rounded-full"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to cart
              </Button>
            </div>
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
                      <td className="text-left">{Product.data.category}</td>
                    </tr>
                    <tr>
                      <td className="text-left">Stock</td>
                      <td className="text-left">{Product.data.stock}</td>
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
