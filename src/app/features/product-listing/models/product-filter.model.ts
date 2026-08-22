export interface CategoryOption {
  id: string;
  label: string;
  checked: boolean;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface ProductFilter {
  search: string;
  categories: string[];
  priceRange: PriceRange;
  sortBy: 'default' | 'price-asc' | 'price-desc' | 'newest';
  page: number;
}