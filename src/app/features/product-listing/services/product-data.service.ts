import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product, TrendingItem } from '../models/product.model';
import { CategoryOption, ProductFilter } from '../models/product-filter.model';
import { CATEGORY_OPTIONS, PRODUCT_DEMO_DATA, TRENDING_ITEMS } from '../data/product-demo.data';

export interface ProductPageResult {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
}

@Injectable({ providedIn: 'root' })
export class ProductDataService {
  private readonly allProducts: Product[] = PRODUCT_DEMO_DATA;
  private readonly categories: CategoryOption[] = CATEGORY_OPTIONS;
  private readonly trending: TrendingItem[] = TRENDING_ITEMS;

  getCategories(): Observable<CategoryOption[]> {
    return of(this.categories);
  }

  getTrendingItems(): Observable<TrendingItem[]> {
    return of(this.trending);
  }

  getProducts(filter: ProductFilter, pageSize = 9): Observable<ProductPageResult> {
    let result = [...this.allProducts];

    if (filter.search?.trim()) {
      const q = filter.search.trim().toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q));
    }

    if (filter.categories?.length) {
      result = result.filter(p => filter.categories.includes(p.category));
    }

    if (filter.priceRange) {
      result = result.filter(
        p => p.price >= filter.priceRange.min && p.price <= filter.priceRange.max
      );
    }

    switch (filter.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    const total = result.length;
    const page = filter.page || 1;
    const start = (page - 1) * pageSize;
    const items = result.slice(start, start + pageSize);

    return of({ items, total, page, pageSize });
  }
}