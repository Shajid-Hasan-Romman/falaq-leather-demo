import { Component, OnInit } from '@angular/core';
import { Product, TrendingItem } from './models/product.model';
import { CategoryOption, PriceRange, ProductFilter } from './models/product-filter.model';
import { ProductDataService } from './services/product-data.service';
import { CartStateService } from './services/cart-state.service';

@Component({
  selector: 'app-product-listing',
  standalone: false,
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent implements OnInit {
  categories: CategoryOption[] = [];
  trendingItems: TrendingItem[] = [];
  products: Product[] = [];

  totalItems = 0;
  pageSize = 9;

  filter: ProductFilter = {
    search: '',
    categories: [],
    priceRange: { min: 10, max: 2000 },
    sortBy: 'default',
    page: 1,
  };

  sortOptions = [
    { value: 'default', label: 'Default Sorting' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
  ];

  constructor(
    private readonly productDataService: ProductDataService,
    private readonly cartStateService: CartStateService
  ) {}

  ngOnInit(): void {
    this.productDataService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    this.productDataService.getTrendingItems().subscribe(items => {
      this.trendingItems = items;
    });

    this.loadProducts();
  }

  loadProducts(): void {
    this.productDataService.getProducts(this.filter, this.pageSize).subscribe(result => {
      this.products = result.items;
      this.totalItems = result.total;
    });
  }

  onSearchChange(search: string): void {
    this.filter = { ...this.filter, search, page: 1 };
    this.loadProducts();
  }

  onCategoryChange(categories: CategoryOption[]): void {
    this.categories = categories;
    this.filter = {
      ...this.filter,
      categories: categories.filter(c => c.checked).map(c => c.id),
      page: 1,
    };
    this.loadProducts();
  }

  onPriceChange(priceRange: PriceRange): void {
    this.filter = { ...this.filter, priceRange, page: 1 };
    this.loadProducts();
  }

  onSortChange(event: Event): void {
    const sortBy = (event.target as HTMLSelectElement).value as ProductFilter['sortBy'];
    this.filter = { ...this.filter, sortBy, page: 1 };
    this.loadProducts();
  }

  onPageChange(page: number): void {
    this.filter = { ...this.filter, page };
    this.loadProducts();
  }

  onAddToCart(product: Product): void {
    this.cartStateService.addToCart(product);
  }

  get rangeStart(): number {
    return this.totalItems === 0 ? 0 : (this.filter.page - 1) * this.pageSize + 1;
  }

  get rangeEnd(): number {
    return Math.min(this.filter.page * this.pageSize, this.totalItems);
  }
}