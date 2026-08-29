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

export type DeliveryZoneId = 'inside-dhaka' | 'sub-dhaka' | 'outside-dhaka';

export interface DeliveryZone {
  readonly id: DeliveryZoneId;
  readonly label: string;
  readonly fee: number;
}

/** Free delivery when cart subtotal reaches this amount (BDT). */
export const FREE_DELIVERY_THRESHOLD = 5000;

export const DELIVERY_ZONES: readonly DeliveryZone[] = [
  { id: 'inside-dhaka', label: 'Inside Dhaka', fee: 60 },
  { id: 'sub-dhaka', label: 'Sub Dhaka', fee: 70 },
  { id: 'outside-dhaka', label: 'Outside Dhaka', fee: 100 },
] as const;

export const DEFAULT_DELIVERY_ZONE: DeliveryZoneId = 'inside-dhaka';

export function deliveryZoneFee(zoneId: DeliveryZoneId): number {
  return DELIVERY_ZONES.find((zone) => zone.id === zoneId)?.fee ?? 60;
}

export function deliveryZoneLabel(zoneId: DeliveryZoneId): string {
  return DELIVERY_ZONES.find((zone) => zone.id === zoneId)?.label ?? 'Inside Dhaka';
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
  readonly deliveryFee: number;
  readonly deliveryZone: DeliveryZoneId;
  readonly total: number;
  readonly currency: string;
  readonly customer: CheckoutDetails;
  readonly paymentMethod: 'cod';
}

export function cartLineId(slug: string, size: string): string {
  return `${slug}__${size}`;
}
