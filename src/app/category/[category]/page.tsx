import Hero from "@/components/homepage/hero";
import NewArrival from "@/components/homepage/new-arrival";
import Image from "next/image";
import Link from "next/link";

async function getCategoryDetails(category: string) {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/category/${category}`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const CategorySlug = async ({ params }: { params: { category: string } }) => {
  const categoryDetails = await getCategoryDetails(params.category);
  const { data } = categoryDetails;
  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="border-2 rounded-t-lg p-5">
        <h1 className="text-3xl font-bold capitalize">{data[0].name}</h1>
        <p>{data[0].desc}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        <div className="col-span-1 grid grid-cols-2 gap-4">
          {data[0].subcategories.map((subcategory: any, index: number) => (
            <Link
              href={`/category/${params.category}/${subcategory.name
                .toLowerCase()
                .replace(/ /g, "-")}`}
              key={index}
              className="border-2 rounded-lg p-5 w-[150px] h-[150px] flex flex-col items-center justify-center gap-2"
            >
              <Image
                src={subcategory.image}
                alt={subcategory.name}
                width={50}
                height={50}
              />
              <p className="font-bold text-center">{subcategory.name}</p>
            </Link>
          ))}
        </div>
        <div className="col-span-2">
          <NewArrival />
        </div>
      </div>
    </div>
  );
};

export default CategorySlug;
