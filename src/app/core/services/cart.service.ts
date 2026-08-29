import {
  afterNextRender,
  computed,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { findProductBySlug } from '../data/products.data';
import {
  cartLineId,
  DEFAULT_DELIVERY_ZONE,
  deliveryZoneFee,
  FREE_DELIVERY_THRESHOLD,
  type AddToCartInput,
  type CartItem,
  type CheckoutDetails,
  type DeliveryZoneId,
  type PlacedOrder,
} from '../models/cart.model';

const CART_STORAGE_KEY = 'falaq-cart-v1';
const DELIVERY_ZONE_KEY = 'falaq-delivery-zone-v1';
const LAST_ORDER_KEY = 'falaq-last-order-v1';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly platformId = inject(PLATFORM_ID);

  private readonly itemsSignal = signal<CartItem[]>([]);
  private readonly deliveryZoneSignal = signal<DeliveryZoneId>(
    DEFAULT_DELIVERY_ZONE,
  );
  private readonly lastOrderSignal = signal<PlacedOrder | null>(null);

  /** Cart lines (read-only). */
  readonly items = this.itemsSignal.asReadonly();

  /** Selected delivery area. */
  readonly deliveryZone = this.deliveryZoneSignal.asReadonly();

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

  readonly qualifiesFreeDelivery = computed(
    () => this.subtotal() >= FREE_DELIVERY_THRESHOLD,
  );

  /** Zone fee before free-delivery waiver. */
  readonly zoneFee = computed(() =>
    deliveryZoneFee(this.deliveryZoneSignal()),
  );

  /** Actual delivery charge added to the order (0 when free). */
  readonly deliveryFee = computed(() =>
    this.qualifiesFreeDelivery() ? 0 : this.zoneFee(),
  );

  readonly total = computed(() => this.subtotal() + this.deliveryFee());

  constructor() {
    afterNextRender(() => {
      this.hydrate();
    });
  }

  setDeliveryZone(zone: DeliveryZoneId): void {
    this.deliveryZoneSignal.set(zone);
    this.persistDeliveryZone();
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

  /** Quick add from listing cards — uses the first available size. */
  addFromSlug(slug: string, quantity = 1): boolean {
    const product = findProductBySlug(slug);
    if (!product?.inStock || product.sizes.length === 0) {
      return false;
    }

    this.addItem({
      slug: product.slug,
      name: product.name,
      size: product.sizes[0],
      price: product.price,
      currency: product.currency,
      image: product.images[0]?.src ?? '',
      quantity,
    });
    return true;
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

    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const deliveryZone = this.deliveryZoneSignal();
    const deliveryFee =
      subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : deliveryZoneFee(deliveryZone);

    const order: PlacedOrder = {
      id: this.createOrderId(),
      placedAt: new Date().toISOString(),
      items: items.map((item) => ({ ...item })),
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal,
      deliveryFee,
      deliveryZone,
      total: subtotal + deliveryFee,
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

      const rawZone = localStorage.getItem(DELIVERY_ZONE_KEY);
      if (rawZone && isDeliveryZoneId(rawZone)) {
        this.deliveryZoneSignal.set(rawZone);
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
      localStorage.removeItem(DELIVERY_ZONE_KEY);
      localStorage.removeItem(LAST_ORDER_KEY);
    }
  }

  private persistCart(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.itemsSignal()));
  }

  private persistDeliveryZone(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    localStorage.setItem(DELIVERY_ZONE_KEY, this.deliveryZoneSignal());
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

function isDeliveryZoneId(value: string): value is DeliveryZoneId {
  return (
    value === 'inside-dhaka' ||
    value === 'sub-dhaka' ||
    value === 'outside-dhaka'
  );
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
  const hasCore =
    typeof order['id'] === 'string' &&
    typeof order['placedAt'] === 'string' &&
    Array.isArray(order['items']) &&
    typeof order['subtotal'] === 'number' &&
    typeof order['customer'] === 'object' &&
    order['customer'] !== null;

  if (!hasCore) {
    return false;
  }

  // Backfill older orders that lacked delivery fields.
  if (typeof order['deliveryFee'] !== 'number') {
    order['deliveryFee'] = 0;
  }
  if (typeof order['total'] !== 'number') {
    order['total'] = order['subtotal'] as number;
  }
  if (!isDeliveryZoneId(String(order['deliveryZone'] ?? ''))) {
    order['deliveryZone'] = DEFAULT_DELIVERY_ZONE;
  }

  return true;
}
