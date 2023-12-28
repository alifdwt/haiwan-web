const Dashboard = () => {
  return (
    <div className="max-w-screen-xl mx-auto my-5">
      <h1 className="text-3xl font-bold">Ini halaman Dashboard</h1>
      <p className="mb-5">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda
        adipisci minus a ipsam perspiciatis impedit, maiores eos? Porro
        cupiditate vitae veniam eius iure omnis aliquid mollitia ab, est dolor
        harum exercitationem maiores odit! Tempora provident hic veritatis
        aliquam enim ad illum qui atque aut voluptas nesciunt, laboriosam
        corporis ducimus incidunt.
      </p>
      <div className="grid grid-rows-3 grid-flow-col gap-2 text-white">
        <div className="row-span-3 bg-primary h-96">
          <h2 className="text-3xl font-bold text-center">01</h2>
        </div>
        <div className="col-span-2 bg-secondary">
          <h2 className="text-3xl font-bold text-center">02</h2>
        </div>
        <div className="row-span-2 col-span-2 bg-secondaryDark">
          <h2 className="text-3xl font-bold text-center">03</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
