import {
  afterNextRender,
  computed,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import {
  cartLineId,
  type AddToCartInput,
  type CartItem,
  type CheckoutDetails,
  type PlacedOrder,
} from '../models/cart.model';

const CART_STORAGE_KEY = 'falaq-cart-v1';
const LAST_ORDER_KEY = 'falaq-last-order-v1';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly platformId = inject(PLATFORM_ID);

  private readonly itemsSignal = signal<CartItem[]>([]);
  private readonly lastOrderSignal = signal<PlacedOrder | null>(null);

  /** Cart lines (read-only). */
  readonly items = this.itemsSignal.asReadonly();

  /** Most recent placed order (demo confirmation). */
  readonly lastOrder = this.lastOrderSignal.asReadonly();

  readonly itemCount = computed(() =>
    this.itemsSignal().reduce((sum, item) => sum + item.quantity, 0),
  );

  readonly subtotal = computed(() =>
    this.itemsSignal().reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    ),
  );

  readonly currency = computed(() => this.itemsSignal()[0]?.currency ?? 'BDT');

  readonly isEmpty = computed(() => this.itemsSignal().length === 0);

  readonly qualifiesFreeDelivery = computed(() => this.subtotal() >= 5000);

  constructor() {
    afterNextRender(() => {
      this.hydrate();
    });
  }

  addItem(input: AddToCartInput): void {
    const qty = Math.max(1, Math.min(10, Math.floor(input.quantity)));
    const id = cartLineId(input.slug, input.size);

    this.itemsSignal.update((items) => {
      const existing = items.find((item) => item.id === id);
      if (existing) {
        return items.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.min(10, item.quantity + qty),
              }
            : item,
        );
      }

      const next: CartItem = {
        id,
        slug: input.slug,
        name: input.name,
        size: input.size,
        price: input.price,
        currency: input.currency,
        image: input.image,
        quantity: qty,
      };
      return [...items, next];
    });

    this.persistCart();
  }

  setQuantity(id: string, quantity: number): void {
    const qty = Math.max(1, Math.min(10, Math.floor(quantity)));
    this.itemsSignal.update((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity: qty } : item)),
    );
    this.persistCart();
  }

  increaseQuantity(id: string): void {
    const item = this.itemsSignal().find((line) => line.id === id);
    if (!item) {
      return;
    }
    this.setQuantity(id, item.quantity + 1);
  }

  decreaseQuantity(id: string): void {
    const item = this.itemsSignal().find((line) => line.id === id);
    if (!item) {
      return;
    }
    if (item.quantity <= 1) {
      this.removeItem(id);
      return;
    }
    this.setQuantity(id, item.quantity - 1);
  }

  removeItem(id: string): void {
    this.itemsSignal.update((items) => items.filter((item) => item.id !== id));
    this.persistCart();
  }

  clear(): void {
    this.itemsSignal.set([]);
    this.persistCart();
  }

  /**
   * Demo checkout — COD only. Persists last order for confirmation UI.
   */
  placeOrder(customer: CheckoutDetails): PlacedOrder | null {
    const items = this.itemsSignal();
    if (items.length === 0) {
      return null;
    }

    const order: PlacedOrder = {
      id: this.createOrderId(),
      placedAt: new Date().toISOString(),
      items: items.map((item) => ({ ...item })),
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      ),
      currency: items[0]?.currency ?? 'BDT',
      customer: { ...customer },
      paymentMethod: 'cod',
    };

    this.lastOrderSignal.set(order);
    this.persistLastOrder(order);
    this.clear();
    return order;
  }

  clearLastOrder(): void {
    this.lastOrderSignal.set(null);
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    localStorage.removeItem(LAST_ORDER_KEY);
  }

  private hydrate(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      const rawCart = localStorage.getItem(CART_STORAGE_KEY);
      if (rawCart) {
        const parsed = JSON.parse(rawCart) as unknown;
        if (Array.isArray(parsed)) {
          this.itemsSignal.set(parsed.filter(isCartItem));
        }
      }

      const rawOrder = localStorage.getItem(LAST_ORDER_KEY);
      if (rawOrder) {
        const parsed = JSON.parse(rawOrder) as unknown;
        if (isPlacedOrder(parsed)) {
          this.lastOrderSignal.set(parsed);
        }
      }
    } catch {
      // Corrupted storage — start fresh.
      localStorage.removeItem(CART_STORAGE_KEY);
      localStorage.removeItem(LAST_ORDER_KEY);
    }
  }

  private persistCart(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.itemsSignal()));
  }

  private persistLastOrder(order: PlacedOrder): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
  }

  private createOrderId(): string {
    const stamp = Date.now().toString(36).toUpperCase();
    const rand = Math.floor(Math.random() * 900 + 100).toString();
    return `FL-${stamp}-${rand}`;
  }
}

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const item = value as Record<string, unknown>;
  return (
    typeof item['id'] === 'string' &&
    typeof item['slug'] === 'string' &&
    typeof item['name'] === 'string' &&
    typeof item['size'] === 'string' &&
    typeof item['price'] === 'number' &&
    typeof item['currency'] === 'string' &&
    typeof item['image'] === 'string' &&
    typeof item['quantity'] === 'number'
  );
}

function isPlacedOrder(value: unknown): value is PlacedOrder {
  if (!value || typeof value !== 'object') {
    return false;
  }
  const order = value as Record<string, unknown>;
  return (
    typeof order['id'] === 'string' &&
    typeof order['placedAt'] === 'string' &&
    Array.isArray(order['items']) &&
    typeof order['subtotal'] === 'number' &&
    typeof order['customer'] === 'object' &&
    order['customer'] !== null
  );
}
