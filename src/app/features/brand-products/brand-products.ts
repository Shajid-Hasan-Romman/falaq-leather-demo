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
  BRAND_PRODUCTS,
  findBrandById,
  getProductsByBrandId,
  isShopOurBrandId,
  SHOP_BRANDS,
  type BrandProduct,
} from './data/brands.data';

export type ProductSortId = 'best-sellers' | 'price-asc' | 'price-desc' | 'name-asc';

@Component({
  selector: 'app-brand-products',
  imports: [RouterLink, ProductCardActions],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './brand-products.html',
  styleUrl: './brand-products.scss',
})
export class BrandProducts {
  private readonly route = inject(ActivatedRoute);
  private readonly pageSize = 8;

  /** AmarBay: /products?shop_our_brand=elegante | shop-our-brand */
  private readonly brandParam = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => params.get('shop_our_brand')?.trim().toLowerCase() ?? ''),
    ),
    {
      initialValue:
        this.route.snapshot.queryParamMap
          .get('shop_our_brand')
          ?.trim()
          .toLowerCase() ?? '',
    },
  );

  readonly brands = SHOP_BRANDS;
  readonly filterOpen = signal(false);
  readonly sortOpen = signal(false);
  readonly sortId = signal<ProductSortId>('best-sellers');
  readonly page = signal(1);

  readonly sortOptions: readonly { id: ProductSortId; label: string }[] = [
    { id: 'best-sellers', label: 'Best Sellers' },
    { id: 'price-asc', label: 'Price: Low to High' },
    { id: 'price-desc', label: 'Price: High to Low' },
    { id: 'name-asc', label: 'Name: A–Z' },
  ];

  readonly activeBrand = computed(() => {
    const id = this.brandParam();
    if (!id || id === 'shop-our-brand' || !isShopOurBrandId(id)) {
      return undefined;
    }
    return findBrandById(id);
  });

  readonly filteredProducts = computed(() => {
    const id = this.brandParam();
    let list: readonly BrandProduct[];

    if (id && isShopOurBrandId(id)) {
      list = getProductsByBrandId(id);
    } else {
      list = BRAND_PRODUCTS;
    }

    return this.sortProducts(list, this.sortId());
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
      this.brandParam();
      this.page.set(1);
      this.closeMenus();
    });
  }

  toggleFilter(): void {
    this.filterOpen.update((v) => !v);
    this.sortOpen.set(false);
  }

  toggleSort(): void {
    this.sortOpen.update((v) => !v);
    this.filterOpen.set(false);
  }

  selectSort(id: ProductSortId): void {
    this.sortId.set(id);
    this.sortOpen.set(false);
    this.page.set(1);
  }

  closeMenus(): void {
    this.filterOpen.set(false);
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
    list: readonly BrandProduct[],
    sort: ProductSortId,
  ): readonly BrandProduct[] {
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
