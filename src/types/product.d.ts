interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageData: Array<{
    image: string;
    _id: string;
  }>;
  rating?: {
    rate: number;
    count: number;
  }
  creator: string;
  createdAt: string;
  __v: number;
}
