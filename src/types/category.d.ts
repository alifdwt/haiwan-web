interface ICategory {
  _id: string;
  name: string;
  desc: string;
  image: string;
  subcategory: ISubcategory[];
  createdAt: string;
  __v: number;
}
