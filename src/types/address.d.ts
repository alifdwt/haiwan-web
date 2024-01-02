interface IAddress {
  _id: string;
  creator: string;
  address_name: string;
  recipient: string;
  city: {
    id: string;
    name: string;
  };
  province: {
    id: string;
    name: string;
  };
  phone: string;
  postcode: string;
  address: string;
  note: string;
  coordinates: string;
  is_primary: boolean;
  createdAt: string;
  __v: number;
}
