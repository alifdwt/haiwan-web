const CategorySlug = ({ params }: { params: { category: string } }) => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold">{params.category}</h1>
    </div>
  );
};

export default CategorySlug;
