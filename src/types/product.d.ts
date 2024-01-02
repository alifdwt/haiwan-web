interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  subcategory: {
    _id: string;
    name: string;
    category: {
      _id: string;
      name: string;
    };
  };
  imageData: Array<{
    image: string;
    _id: string;
  }>;
  rating?: {
    rate: number;
    count: number;
  };
  creator: ICreator;
  createdAt: string;
  __v: number;
}
