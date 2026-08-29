import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';

import { ProductCardActions } from '../../shared/components/product-card-actions/product-card-actions';
import {
  buildShopPath,
  filterProductsByQuery,
  getProductsByShopPath,
  shopTitleFromPath,
  toListingProducts,
  type ShopListingProduct,
} from './data/shop.catalog';

export type ProductSortId = 'best-sellers' | 'price-asc' | 'price-desc' | 'name-asc';

@Component({
  selector: 'app-shop',
  imports: [RouterLink, ProductCardActions],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './shop.html',
  styleUrl: './shop.scss',
})
export class Shop {
  private readonly route = inject(ActivatedRoute);
  private readonly pageSize = 8;

  private readonly category = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('category'))),
    { initialValue: this.route.snapshot.paramMap.get('category') },
  );

  private readonly subcategory = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('subcategory'))),
    { initialValue: this.route.snapshot.paramMap.get('subcategory') },
  );

  private readonly searchQuery = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => params.get('q')?.trim() ?? ''),
    ),
    {
      initialValue: this.route.snapshot.queryParamMap.get('q')?.trim() ?? '',
    },
  );

  readonly sortOpen = signal(false);
  readonly sortId = signal<ProductSortId>('best-sellers');
  readonly page = signal(1);

  readonly sortOptions: readonly { id: ProductSortId; label: string }[] = [
    { id: 'best-sellers', label: 'Best Sellers' },
    { id: 'price-asc', label: 'Price: Low to High' },
    { id: 'price-desc', label: 'Price: High to Low' },
    { id: 'name-asc', label: 'Name: A–Z' },
  ];

  readonly shopPath = computed(() =>
    buildShopPath(this.category(), this.subcategory()),
  );

  readonly heading = computed(() => {
    const q = this.searchQuery();
    if (q) {
      return `Search: “${q}”`;
    }
    return shopTitleFromPath(this.shopPath());
  });

  readonly filteredProducts = computed(() => {
    const byPath = getProductsByShopPath(this.shopPath());
    const byQuery = filterProductsByQuery(byPath, this.searchQuery());
    return this.sortProducts(toListingProducts(byQuery), this.sortId());
  });

  readonly productCount = computed(() => this.filteredProducts().length);

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.productCount() / this.pageSize)),
  );

  readonly pageNumbers = computed(() => {
    const total = this.totalPages();
    return Array.from({ length: total }, (_, i) => i + 1);
  });

  readonly visibleProducts = computed(() => {
    const current = Math.min(this.page(), this.totalPages());
    const start = (current - 1) * this.pageSize;
    return this.filteredProducts().slice(start, start + this.pageSize);
  });

  readonly sortLabel = computed(() => {
    const opt = this.sortOptions.find((o) => o.id === this.sortId());
    return opt?.label ?? 'Best Sellers';
  });

  readonly canPrev = computed(() => this.page() > 1);
  readonly canNext = computed(() => this.page() < this.totalPages());

  constructor() {
    effect(() => {
      this.shopPath();
      this.searchQuery();
      this.page.set(1);
      this.sortOpen.set(false);
    });
  }

  toggleSort(): void {
    this.sortOpen.update((v) => !v);
  }

  selectSort(id: ProductSortId): void {
    this.sortId.set(id);
    this.sortOpen.set(false);
    this.page.set(1);
  }

  closeMenus(): void {
    this.sortOpen.set(false);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) {
      return;
    }
    this.page.set(page);
    this.closeMenus();
  }

  prevPage(): void {
    if (this.canPrev()) {
      this.page.update((p) => p - 1);
    }
  }

  nextPage(): void {
    if (this.canNext()) {
      this.page.update((p) => p + 1);
    }
  }

  private sortProducts(
    list: readonly ShopListingProduct[],
    sort: ProductSortId,
  ): readonly ShopListingProduct[] {
    const copy = [...list];
    switch (sort) {
      case 'price-asc':
        return copy.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return copy.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return copy.sort((a, b) => a.name.localeCompare(b.name));
      case 'best-sellers':
      default:
        return copy;
    }
  }
}
