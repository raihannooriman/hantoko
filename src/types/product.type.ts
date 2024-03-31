export type Products = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description?: string;
  created_at: Date;
  updated: Date;
  stock: [
    {
      size: string;
      qty: number;
    }
  ];
};
