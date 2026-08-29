import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

import { CartService } from '../../core/services/cart.service';
import { ProductCardActions } from '../../shared/components/product-card-actions/product-card-actions';
import {
  findProductBySlug,
  PRODUCT_DETAILS,
} from '../../core/data/products.data';
import type {
  ProductAccordionId,
  ProductDetail,
  ProductImage,
} from '../../core/data/product-detail.model';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink, DecimalPipe, ProductCardActions],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cart = inject(CartService);

  private readonly slug = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('slug') ?? '')),
    { initialValue: this.route.snapshot.paramMap.get('slug') ?? '' },
  );

  readonly product = computed(() => findProductBySlug(this.slug()));

  readonly selectedSize = signal<string | null>(null);
  readonly quantity = signal(1);
  readonly openAccordion = signal<ProductAccordionId | null>(null);
  readonly sizeError = signal(false);
  readonly addedMessage = signal<string | null>(null);
  readonly activeImageIndex = signal(0);

  constructor() {
    effect(() => {
      this.slug();
      this.selectedSize.set(null);
      this.quantity.set(1);
      this.openAccordion.set(null);
      this.sizeError.set(false);
      this.addedMessage.set(null);
      this.activeImageIndex.set(0);
    });
  }

  readonly activeImage = computed((): ProductImage | null => {
    const product = this.product();
    if (!product || product.images.length === 0) {
      return null;
    }
    const index = Math.min(
      this.activeImageIndex(),
      product.images.length - 1,
    );
    return product.images[index] ?? null;
  });

  /** Up to 5 product shots in the gallery slider. */
  readonly galleryImages = computed((): readonly ProductImage[] => {
    const product = this.product();
    if (!product) {
      return [];
    }
    return product.images.slice(0, 5);
  });

  readonly canPrevGallery = computed(() => this.activeImageIndex() > 0);

  readonly canNextGallery = computed(() => {
    const images = this.galleryImages();
    return images.length > 0 && this.activeImageIndex() < images.length - 1;
  });

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
    this.sizeError.set(false);
    this.addedMessage.set(null);
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

  selectGalleryImage(index: number): void {
    this.activeImageIndex.set(index);
  }

  prevGallerySlide(): void {
    if (this.activeImageIndex() > 0) {
      this.activeImageIndex.update((index) => index - 1);
    }
  }

  nextGallerySlide(): void {
    const maxIndex = this.galleryImages().length - 1;
    if (this.activeImageIndex() < maxIndex) {
      this.activeImageIndex.update((index) => index + 1);
    }
  }

  addToCart(): void {
    const product = this.product();
    if (!product || !product.inStock) {
      return;
    }

    const size = this.selectedSize();
    if (!size) {
      this.sizeError.set(true);
      this.addedMessage.set(null);
      return;
    }

    this.cart.addItem({
      slug: product.slug,
      name: product.name,
      size,
      price: product.price,
      currency: product.currency,
      image: product.images[0]?.src ?? '',
      quantity: this.quantity(),
    });

    this.sizeError.set(false);
    this.addedMessage.set(
      `Added ${this.quantity()} × size ${size} to your cart.`,
    );
  }

  buyNow(): void {
    this.addToCart();
    if (this.sizeError() || !this.product()?.inStock) {
      return;
    }
    void this.router.navigate(['/cart']);
  }
}
