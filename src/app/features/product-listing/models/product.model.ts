export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  discountPercent?: number;
  category: string;
  rating?: number;
  description?: string;
  features?: string[];
  reviewCount?: number;
}

export interface TrendingItem {
  id: number;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  rating?: number;
}