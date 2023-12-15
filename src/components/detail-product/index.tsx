import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ToRupiah } from "../util/currency";
import { ShoppingCart } from "lucide-react";
import StarRating from "../ui/star";

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
    <div className="max-w-screen-xl mx-auto my-5">
      <div className="w-full flex gap-2">
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
      <div className="grid grid-cols-1 md:grid-cols-[1fr_.75fr] bg-gray-200 dark:bg-gray-900 rounded-md">
        <div className="col-span-1 p-10">
          <Image
            src={Product.data.image}
            alt={Product.data.title}
            width={200}
            height={200}
            className="w-full object-cover h-96"
          />
        </div>
        <div className="col-span-1 p-10 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{Product.data.title}</h1>
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
          <div className="flex gap-2 justify-between">
            <Button className="w-full">Buy Now</Button>
            <Button variant="outline" className="w-full flex gap-2">
              <ShoppingCart className="h-5 w-5" />
              Add to cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProductPage;
