import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

import {
  findProductBySlug,
  PRODUCT_DETAILS,
} from './data/products.data';
import type {
  ProductAccordionId,
  ProductDetail,
} from './models/product-detail.model';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails {
  private readonly route = inject(ActivatedRoute);

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')),
    { initialValue: this.route.snapshot.paramMap.get('slug') ?? '' },
  );

  readonly product = computed(() => findProductBySlug(this.slug()));

  readonly selectedSize = signal<string | null>(null);
  readonly quantity = signal(1);
  readonly openAccordion = signal<ProductAccordionId | null>(null);

  constructor() {
    effect(() => {
      this.slug();
      this.selectedSize.set(null);
      this.quantity.set(1);
      this.openAccordion.set(null);
    });
  }

  readonly similarProducts = computed(() => {
    const current = this.product();
    if (!current) {
      return [] as readonly ProductDetail[];
    }
    return PRODUCT_DETAILS.filter((item) => item.slug !== current.slug).slice(
      0,
      4,
    );
  });

  selectSize(size: string): void {
    this.selectedSize.set(size);
  }

  toggleAccordion(id: ProductAccordionId): void {
    this.openAccordion.update((current) => (current === id ? null : id));
  }

  isAccordionOpen(id: ProductAccordionId): boolean {
    return this.openAccordion() === id;
  }

  increaseQty(): void {
    this.quantity.update((q) => Math.min(10, q + 1));
  }

  decreaseQty(): void {
    this.quantity.update((q) => Math.max(1, q - 1));
  }

  addToCart(): void {
    // Cart feature not wired yet — UI only for storefront demo.
  }
}
