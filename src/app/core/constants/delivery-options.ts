/** A selectable delivery zone and its flat shipping fee (৳). */
export interface ShippingOption {
  id: 'inside-dhaka' | 'sub-dhaka' | 'outside-dhaka';
  label: string;
  fee: number;
}

/** Shipping zones the customer can pick from on the cart page. */
export const SHIPPING_OPTIONS: ShippingOption[] = [
  { id: 'inside-dhaka', label: 'Inside Dhaka', fee: 60 },
  { id: 'sub-dhaka', label: 'Sub Dhaka', fee: 100 },
  { id: 'outside-dhaka', label: 'Outside Dhaka', fee: 130 },
];