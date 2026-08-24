import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, combineLatest, map, distinctUntilChanged } from 'rxjs';

import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';
import {
  SHIPPING_OPTIONS,
  ShippingOption,
} from '../constants/delivery-options';

/**
 * Singleton cart state service.
 *
 * State is held in a `BehaviorSubject` so every subscriber (header badge,
 * cart page, order-summary, etc.) gets real-time updates. On the browser
 * the cart is persisted to `localStorage` so it survives reloads; on the
 * server (SSR) persistence is skipped and the cart starts empty.
 */
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly storageKey = 'falaq-cart';
  private readonly isBrowser: boolean;

  private readonly itemsSubject = new BehaviorSubject<CartItem[]>([]);
  readonly cartItems$ = this.itemsSubject.asObservable();

  private readonly shippingSubject = new BehaviorSubject<ShippingOption>(
    SHIPPING_OPTIONS[0]!,
  );

  /** All selectable shipping zones (Inside Dhaka · Sub Dhaka · Outside Dhaka). */
  readonly shippingOptions$ = this.shippingSubject.pipe(
    map(() => SHIPPING_OPTIONS),
    distinctUntilChanged(),
  );

  /** The currently selected shipping zone. */
  readonly selectedShipping$ = this.shippingSubject.asObservable();

  /** Total number of items (sum of quantities). */
  readonly cartCount$ = this.itemsSubject.pipe(
    map((items) => items.reduce((sum, item) => sum + item.quantity, 0)),
    distinctUntilChanged(),
  );

  /** Sum of (price × quantity) across every cart line. */
  readonly subtotal$ = this.itemsSubject.pipe(
    map((items) =>
      items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    ),
    distinctUntilChanged(),
  );

  /** Shipping fee (৳) for the currently selected delivery zone. */
  readonly shipping$ = this.selectedShipping$.pipe(
    map((option) => option.fee),
    distinctUntilChanged(),
  );

  /** subtotal + the selected zone's shipping fee. */
  readonly grandTotal$ = combineLatest([this.itemsSubject, this.shipping$]).pipe(
    map(([items, shipping]) => {
      const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
      return subtotal + shipping;
    }),
    distinctUntilChanged(),
  );

  /** `true` when the cart has zero items. */
  readonly isEmpty$ = this.itemsSubject.pipe(
    map((items) => items.length === 0),
    distinctUntilChanged(),
  );

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.loadFromStorage();
  }

  /** Add a product to the cart, or increment its quantity if it already exists. */
  addItem(product: Product): void {
    const items = [...this.itemsSubject.value];
    const existing = items.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({ ...product, quantity: 1 });
    }
    this.itemsSubject.next(items);
    this.saveToStorage();
  }

  /** Remove a single product line from the cart. */
  removeItem(productId: string): void {
    this.itemsSubject.next(
      this.itemsSubject.value.filter((item) => item.id !== productId),
    );
    this.saveToStorage();
  }

  /** Set the quantity for a product line (removes the line if qty < 1). */
  updateQuantity(productId: string, quantity: number): void {
    if (quantity < 1) {
      this.removeItem(productId);
      return;
    }
    this.itemsSubject.next(
      this.itemsSubject.value.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
    this.saveToStorage();
  }

  /** Empty the entire cart. */
  clearCart(): void {
    this.itemsSubject.next([]);
    this.saveToStorage();
  }

  /** Select a shipping zone by id (Inside Dhaka / Sub Dhaka / Outside Dhaka). */
  setShipping(zoneId: ShippingOption['id'] | string): void {
    const option = SHIPPING_OPTIONS.find((o) => o.id === zoneId);
    if (option) {
      this.shippingSubject.next(option);
    }
  }

  /** Return the current cart snapshot (synchronous accessor). */
  get items(): CartItem[] {
    return this.itemsSubject.value;
  }

  private loadFromStorage(): void {
    if (!this.isBrowser) return;
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      try {
        this.itemsSubject.next(JSON.parse(stored) as CartItem[]);
      } catch {
        // ignore malformed JSON — start fresh
      }
    }
  }

  private saveToStorage(): void {
    if (!this.isBrowser) return;
    try {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify(this.itemsSubject.value),
      );
    } catch {
      // ignore quota / availability errors
    }
  }
}
