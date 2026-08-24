import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  BehaviorSubject,
  combineLatest,
  map,
  distinctUntilChanged,
} from 'rxjs';

import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';
import {
  SHIPPING_OPTIONS,
  ShippingOption,
} from '../constants/delivery-options';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly storageKey = 'falaq-cart';
  private readonly isBrowser: boolean;

  private readonly itemsSubject =
    new BehaviorSubject<CartItem[]>([]);

  readonly cartItems$ =
    this.itemsSubject.asObservable();

  private readonly shippingSubject =
    new BehaviorSubject<ShippingOption>(
      SHIPPING_OPTIONS[0]!,
    );

  /**
   * All shipping options.
   */
  readonly shippingOptions$ =
    this.shippingSubject.pipe(
      map(() => SHIPPING_OPTIONS),
      distinctUntilChanged(),
    );

  /**
   * Currently selected shipping option.
   */
  readonly selectedShipping$ =
    this.shippingSubject.asObservable();

  /**
   * Total number of products.
   */
  readonly cartCount$ =
    this.itemsSubject.pipe(
      map((items) =>
        items.reduce(
          (sum, item) => sum + item.quantity,
          0,
        ),
      ),
      distinctUntilChanged(),
    );

  /**
   * Cart subtotal.
   */
  readonly subtotal$ =
    this.itemsSubject.pipe(
      map((items) =>
        items.reduce(
          (sum, item) =>
            sum + item.price * item.quantity,
          0,
        ),
      ),
      distinctUntilChanged(),
    );

  /**
   * Current shipping fee.
   */
  readonly shipping$ =
    this.selectedShipping$.pipe(
      map((option) => option.fee),
      distinctUntilChanged(),
    );

  /**
   * Cart grand total.
   */
  readonly grandTotal$ =
    combineLatest([
      this.itemsSubject,
      this.shipping$,
    ]).pipe(
      map(([items, shipping]) => {
        const subtotal = items.reduce(
          (sum, item) =>
            sum + item.price * item.quantity,
          0,
        );

        return subtotal + shipping;
      }),
      distinctUntilChanged(),
    );

  /**
   * Whether cart is empty.
   */
  readonly isEmpty$ =
    this.itemsSubject.pipe(
      map((items) => items.length === 0),
      distinctUntilChanged(),
    );

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
  ) {
    this.isBrowser =
      isPlatformBrowser(platformId);

    this.loadFromStorage();
  }

  /**
   * Add product to cart.
   */
  addItem(product: Product): void {
    const items = [
      ...this.itemsSubject.value,
    ];

    const existing = items.find(
      (item) => item.id === product.id,
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({
        ...product,
        quantity: 1,
      });
    }

    this.itemsSubject.next(items);
    this.saveToStorage();
  }

  /**
   * Remove product.
   */
  removeItem(productId: string): void {
    this.itemsSubject.next(
      this.itemsSubject.value.filter(
        (item) => item.id !== productId,
      ),
    );

    this.saveToStorage();
  }

  /**
   * Update product quantity.
   */
  updateQuantity(
    productId: string,
    quantity: number,
  ): void {
    if (quantity < 1) {
      this.removeItem(productId);
      return;
    }

    this.itemsSubject.next(
      this.itemsSubject.value.map(
        (item) =>
          item.id === productId
            ? {
                ...item,
                quantity,
              }
            : item,
      ),
    );

    this.saveToStorage();
  }

  /**
   * Clear cart.
   */
  clearCart(): void {
    this.itemsSubject.next([]);
    this.saveToStorage();
  }

  /**
   * Select shipping option.
   */
  setShipping(
    zoneId: ShippingOption['id'] | string,
  ): void {
    const option =
      SHIPPING_OPTIONS.find(
        (item) => item.id === zoneId,
      );

    if (option) {
      this.shippingSubject.next(option);
    }
  }

  /**
   * Current cart items.
   */
  get items(): CartItem[] {
    return this.itemsSubject.value;
  }

  /**
   * Current subtotal.
   */
  get subtotal(): number {
    return this.itemsSubject.value.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0,
    );
  }

  /**
   * Current shipping fee.
   */
  get shipping(): number {
    return this.shippingSubject.value.fee;
  }

  /**
   * Current grand total.
   */
  get grandTotal(): number {
    return this.subtotal + this.shipping;
  }

  /**
   * Current selected shipping.
   */
  get selectedShipping(): ShippingOption {
    return this.shippingSubject.value;
  }

  /**
   * Load cart from localStorage.
   */
  private loadFromStorage(): void {
    if (!this.isBrowser) {
      return;
    }

    const stored =
      localStorage.getItem(
        this.storageKey,
      );

    if (stored) {
      try {
        this.itemsSubject.next(
          JSON.parse(
            stored,
          ) as CartItem[],
        );
      } catch {
        // Ignore malformed data.
      }
    }
  }

  /**
   * Save cart to localStorage.
   */
  private saveToStorage(): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify(
          this.itemsSubject.value,
        ),
      );
    } catch {
      // Ignore storage errors.
    }
  }
}