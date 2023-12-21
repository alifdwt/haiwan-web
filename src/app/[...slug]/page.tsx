import DetailProductPage from "@/components/detail-product";
import StorePage from "@/components/store-page";

type SlugPageProps = {
  params: {
    slug: string[];
  };
};

export default function SlugPage(props: SlugPageProps) {
  const { params } = props;
  return (
    <div className="max-w-screen-xl mx-auto">
      {params.slug[0] && params.slug[1] === "dashboard" ? (
        <div>Dashboard</div>
      ) : params.slug[0] && params.slug[1] ? (
        <DetailProductPage params={params} />
      ) : params.slug[0] ? (
        <StorePage params={params.slug[0]} />
      ) : (
        <div>Not found</div>
      )}
    </div>
  );
}
