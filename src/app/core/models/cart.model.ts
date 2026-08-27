export interface CartItem {
  /** Unique line key: `${slug}__${size}` */
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly size: string;
  readonly price: number;
  readonly currency: string;
  readonly image: string;
  readonly quantity: number;
}

export interface AddToCartInput {
  readonly slug: string;
  readonly name: string;
  readonly size: string;
  readonly price: number;
  readonly currency: string;
  readonly image: string;
  readonly quantity: number;
}

export interface CheckoutDetails {
  readonly fullName: string;
  readonly phone: string;
  readonly address: string;
  readonly city: string;
  readonly note: string;
}

export interface PlacedOrder {
  readonly id: string;
  readonly placedAt: string;
  readonly items: readonly CartItem[];
  readonly itemCount: number;
  readonly subtotal: number;
  readonly currency: string;
  readonly customer: CheckoutDetails;
  readonly paymentMethod: 'cod';
}

export function cartLineId(slug: string, size: string): string {
  return `${slug}__${size}`;
}
