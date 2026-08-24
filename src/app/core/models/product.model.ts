export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  weight?: string;
  discount?: number;
  description?: string;
}
