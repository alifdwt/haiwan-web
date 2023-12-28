import FormDashboard from "@/components/dashboard/form";
import columns from "@/components/dashboard/products/columns";
import { ProductsDataTable } from "@/components/dashboard/products/data-table";

async function getProductsByCreator(creator: string) {
  const response = await fetch(
    `${process.env.NEXTAUTH_URL}/api/p?creator=${creator}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export default async function DashboardProductPage() {
  // const { data: session } = useSession();
  const products = await getProductsByCreator("658166462140324bb002e5fb");

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
      <ProductsDataTable data={products.data} columns={columns} />
    </>
  );
}
