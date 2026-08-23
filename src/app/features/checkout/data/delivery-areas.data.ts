/**
 * Delivery area options shown on the checkout "Select your delivery area" card.
 *
 * Single source of truth for the delivery area selector: tile label/price and
 * the default selection. Matches the Figma design (node 13816-8962) exactly.
 */

export interface DeliveryArea {
  /** Stable unique id, also used as the @for track key. */
  id: 'inside-dhaka' | 'sub-dhaka' | 'outside-dhaka';
  /** Tile title. */
  name: string;
  /** Display shipping charge, e.g. "৳60". */
  price: string;
  /** Numeric delivery charge used for checkout calculations. */
  cost: number;
}

/** The tile selected by default (matches the check icon in the design). */
export const DEFAULT_DELIVERY_AREA_ID: DeliveryArea['id'] = 'inside-dhaka';

export const DELIVERY_AREAS: readonly DeliveryArea[] = [
  { id: 'inside-dhaka', name: 'Inside Dhaka', price: '৳60', cost: 60 },
  { id: 'sub-dhaka', name: 'Sub Dhaka', price: '৳70', cost: 70 },
  { id: 'outside-dhaka', name: 'Outside Dhaka', price: '৳100', cost: 100 },
];