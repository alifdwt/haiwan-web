import DetailProductPage from "@/components/detail-product";

type DetailPageProps = {
  params: {
    slug: string[];
  };
};

export default function DetailPage(props: DetailPageProps) {
  const { params } = props;
  return (
    <div className="max-w-screen-xl mx-auto">
      {/* <h1>{params.slug ? "Product Detail Page" : "Home Page"}</h1> */}
      {params.slug[2] && <DetailProductPage params={{ slug: params.slug }} />}
    </div>
  );
}
