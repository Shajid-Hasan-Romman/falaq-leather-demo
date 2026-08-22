import { firstValueFrom } from 'rxjs';

import { CartService, SHIPPING_OPTIONS } from './cart.service';

/** Browser platform ID (matches `@angular/common`'s `isPlatformBrowser`). */
const BROWSER_PLATFORM_ID = 'browser' as unknown as object;
/** Non-browser platform ID (e.g. server during SSR). */
const SSR_PLATFORM_ID = 'server' as unknown as object;

describe('CartService', () => {
  const product1 = {
    id: 'p1',
    name: 'Product 1',
    image: '/p1.png',
    price: 100,
    oldPrice: 120,
    discount: 20,
    weight: '1KG',
  };
  const product2 = {
    id: 'p2',
    name: 'Product 2',
    image: '/p2.png',
    price: 200,
    weight: '500g',
  };

  beforeEach(() => {
    // Ensure a clean storage slate for persistence-focused tests.
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  });

  it('starts with an empty cart on the server (SSR-safe, no storage)', () => {
    const service = new CartService(SSR_PLATFORM_ID);
    expect(service.items).toEqual([]);
  });

  it('adds an item with quantity 1', () => {
    const service = new CartService(BROWSER_PLATFORM_ID);
    service.addItem(product1);
    expect(service.items).toEqual([{ ...product1, quantity: 1 }]);
  });

  it('increments quantity when adding an existing item', () => {
    const service = new CartService(BROWSER_PLATFORM_ID);
    service.addItem(product1);
    service.addItem(product1);
    expect(service.items).toHaveLength(1);
    expect(service.items[0]?.quantity).toBe(2);
  });

  it('removes an item by id', () => {
    const service = new CartService(BROWSER_PLATFORM_ID);
    service.addItem(product1);
    service.addItem(product2);
    service.removeItem('p1');
    expect(service.items.map((item) => item.id)).toEqual(['p2']);
  });

  it('updates the quantity of an existing item', () => {
    const service = new CartService(BROWSER_PLATFORM_ID);
    service.addItem(product1);
    service.updateQuantity('p1', 4);
    expect(service.items[0]?.quantity).toBe(4);
  });

  it('removes the line when quantity drops below 1', () => {
    const service = new CartService(BROWSER_PLATFORM_ID);
    service.addItem(product1);
    service.updateQuantity('p1', 0);
    expect(service.items).toEqual([]);
  });

  it('clears the cart', () => {
    const service = new CartService(BROWSER_PLATFORM_ID);
    service.addItem(product1);
    service.clearCart();
    expect(service.items).toEqual([]);
  });

  it('computes cart count, subtotal, shipping, and grand total', async () => {
    const service = new CartService(BROWSER_PLATFORM_ID);
    service.addItem(product1); // 100 × 1
    service.addItem(product1); // 100 × 2
    service.addItem(product2); // 200 × 1

    expect(await firstValueFrom(service.cartCount$)).toBe(3);
    expect(await firstValueFrom(service.subtotal$)).toBe(400);
    expect(await firstValueFrom(service.shipping$)).toBe(
      SHIPPING_OPTIONS[0]!.fee,
    );
    expect(await firstValueFrom(service.grandTotal$)).toBe(
      400 + SHIPPING_OPTIONS[0]!.fee,
    );
  });

  it('exposes the three selectable shipping zones with their fees', async () => {
    const service = new CartService(BROWSER_PLATFORM_ID);

    const options = await firstValueFrom(service.shippingOptions$);
    expect(options).toHaveLength(3);
    expect(options.map((o) => o.label)).toEqual([
      'Inside Dhaka',
      'Sub Dhaka',
      'Outside Dhaka',
    ]);
    expect(options.map((o) => o.fee)).toEqual([60, 100, 130]);
  });

  it('updates the shipping fee and grand total when a zone is selected', async () => {
    const service = new CartService(BROWSER_PLATFORM_ID);
    service.addItem(product1); // 100 × 1

    service.setShipping('outside-dhaka');
    expect(await firstValueFrom(service.shipping$)).toBe(130);
    expect(await firstValueFrom(service.grandTotal$)).toBe(100 + 130);

    service.setShipping('sub-dhaka');
    expect(await firstValueFrom(service.shipping$)).toBe(100);
    expect(await firstValueFrom(service.grandTotal$)).toBe(100 + 100);
  });

  it('ignores an unknown shipping zone id', async () => {
    const service = new CartService(BROWSER_PLATFORM_ID);
    service.setShipping('mars');

    expect(await firstValueFrom(service.shipping$)).toBe(
      SHIPPING_OPTIONS[0]!.fee,
    );
  });

  it('flags the cart as empty via the isEmpty$ observable', async () => {
    const service = new CartService(BROWSER_PLATFORM_ID);
    expect(await firstValueFrom(service.isEmpty$)).toBe(true);
    service.addItem(product1);
    expect(await firstValueFrom(service.isEmpty$)).toBe(false);
  });

  it('persists the cart to localStorage on every mutation', () => {
    const service = new CartService(BROWSER_PLATFORM_ID);
    service.addItem(product1);
    service.addItem(product2);

    if (typeof localStorage !== 'undefined') {
      const stored = JSON.parse(localStorage.getItem('falaq-cart') ?? '[]');
      expect(stored.map((item: { id: string }) => item.id)).toEqual(['p1', 'p2']);
    }
  });

  it('reloads cart state from localStorage on construction', () => {
    if (typeof localStorage === 'undefined') {
      return;
    }
    localStorage.setItem('falaq-cart', JSON.stringify([{ ...product1, quantity: 2 }]));

    const service = new CartService(BROWSER_PLATFORM_ID);
    expect(service.items).toEqual([{ ...product1, quantity: 2 }]);
  });
});