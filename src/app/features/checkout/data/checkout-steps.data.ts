/**
 * Checkout stepper configuration — single source of truth for what the
 * `CheckoutStepper` component renders.
 *
 * Every visual state of the stepper is derived from this array: step count,
 * labels, order, statuses and the connector lines between steps. Adding,
 * removing or re-ordering an entry here is all it takes to change the whole
 * stepper — no component code needs to change.
 */

export type CheckoutStepStatus = 'completed' | 'active' | 'upcoming';

export interface CheckoutStep {
  /** Stable unique id, also used as the @for track key. */
  id: string;
  /** 1-based position indicator shown inside the step circle. */
  step: number;
  /** Human-readable step label rendered under the circle. */
  label: string;
  /** Drives the indicator, label and connector styling of the step. */
  status: CheckoutStepStatus;
}

/**
 * Steps exactly as present in the Figma design (node 13816-9050):
 *
 *   ✓ ───────────────── •
 * Cart             Billing & Shipping
 *
 * 1. Cart            → completed (green check)
 * 2. Billing & Shipping → active   (step number)
 */
export const CHECKOUT_STEPS: readonly CheckoutStep[] = [
  { id: 'cart', step: 1, label: 'Cart', status: 'completed' },
  { id: 'billing-shipping', step: 2, label: 'Billing & Shipping', status: 'active' },
];