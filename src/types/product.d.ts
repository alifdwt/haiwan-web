interface IProduct {
  _id: number;
  creator: string;
  title: string;
  price: number;
  description: string;
  category: string;
  imageData: [
    {
      _id: string;
      image: string;
    }
  ];
  rating: {
    rate: number;
    count: number;
  };
  createdAt: string;
  __v: number;
}
