/**
 * Order Summary data — single source of truth for the order summary column:
 * the summary card (line items + totals), the privacy note and the place-order
 * action, exactly as presented in the Figma design (node 13816-9525).
 */

export interface OrderLineItem {
  /** Stable unique id, also used as the @for track key. */
  id: string;
  /** Product name. */
  name: string;
  /** Shown weight, e.g. "500gm". */
  weight: string;
  /** Shown quantity, e.g. "2x". */
  quantity: string;
  /** Shown price, e.g. "৳3,100". */
  price: string;
  /** Numeric line total used for calculations. */
  amount: number;
}

export interface CheckoutSummaryData {
  readonly title: string;
  readonly lineItems: readonly OrderLineItem[];
  readonly subtotalLabel: string;
  readonly subtotal: string;
  readonly shippingLabel: string;
  readonly shipping: string;
  readonly totalLabel: string;
  readonly total: string;
  readonly privacyNote: string;
  readonly privacyPolicyLabel: string;
  readonly placeOrderLabel: string;
  readonly orderSuccessMessage: string;
}

export const ORDER_SUMMARY: CheckoutSummaryData = {
  title: 'Order Summary',
  lineItems: [
    {
      id: 'shahi-laccha',
      name: 'শাহী লাচ্ছা সেমাই (ঘিয়ে ভাজা) | Shahi Laccha Shemai (Ghee Fried)',
      weight: '500gm',
      quantity: '2x',
      price: '৳3,100',
      amount: 3100,
    },
    {
      id: 'china-nuts',
      name: 'China Nuts',
      weight: '500gm',
      quantity: '2x',
      price: '৳3,100',
      amount: 3100,
    },
  ],
  subtotalLabel: 'Sub Total',
  subtotal: '৳6,200',
  shippingLabel: 'Shipping',
  shipping: '-',
  totalLabel: 'Total',
  total: '৳6,260',
  privacyNote: 'Your details help us serve you better.',
  privacyPolicyLabel: 'privacy policy',
  placeOrderLabel: 'Place Order',
  orderSuccessMessage: 'Your order has been placed successfully.',
};