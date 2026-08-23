/** A product featured in the cart page's "Popular Product's" section. */
export interface PopularProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice: number;
  sizes: string[];
}