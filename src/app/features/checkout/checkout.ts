import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import { CheckoutStepper } from './components/checkout-stepper/checkout-stepper';
import { CheckoutDeliveryArea } from './components/checkout-delivery-area/checkout-delivery-area';
import { CheckoutBillingForm } from './components/checkout-billing-form/checkout-billing-form';
import { CheckoutOrderSummary } from './components/checkout-order-summary/checkout-order-summary';
import { DEFAULT_DELIVERY_AREA_ID, DELIVERY_AREAS, type DeliveryArea } from './data/delivery-areas.data';
import { BILLING_FORM_FIELDS } from './data/billing-fields.data';
import { ORDER_SUMMARY } from './data/order-summary.data';

/**
 * Checkout feature page — composes the checkout flow:
 * stepper on top, then the 2-column layout from the Figma design
 * (delivery area + billing info on the left, order summary on the right).
 */
@Component({
  selector: 'app-checkout',
  imports: [
    CheckoutStepper,
    CheckoutDeliveryArea,
    CheckoutBillingForm,
    CheckoutOrderSummary,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  private readonly billingValues = signal<Readonly<Record<string, string>>>({});
  private readonly selectedArea = signal<DeliveryArea>(
    DELIVERY_AREAS.find((area) => area.id === DEFAULT_DELIVERY_AREA_ID) ?? DELIVERY_AREAS[0],
  );
  protected readonly invalidBillingFieldIds = signal<readonly string[]>([]);

  protected readonly summary = computed(() => {
    const subtotal = ORDER_SUMMARY.lineItems.reduce((total, item) => total + item.amount, 0);
    const shipping = this.selectedArea().cost;

    return {
      ...ORDER_SUMMARY,
      subtotal: this.formatCurrency(subtotal),
      shipping: this.formatCurrency(shipping),
      total: this.formatCurrency(subtotal + shipping),
    };
  });

  protected updateBillingValues(values: Readonly<Record<string, string>>): void {
    this.billingValues.set(values);
    this.invalidBillingFieldIds.update((invalidIds) =>
      invalidIds.filter((fieldId) => values[fieldId]?.trim().length === 0),
    );
  }

  protected updateDeliveryArea(area: DeliveryArea): void {
    this.selectedArea.set(area);
  }

  protected placeOrder(): void {
    const missingFields = BILLING_FORM_FIELDS
      .filter((field) => field.required && !this.billingValues()[field.id]?.trim())
      .map((field) => field.label);

    if (missingFields.length > 0) {
      this.invalidBillingFieldIds.set(
        BILLING_FORM_FIELDS
          .filter((field) => field.required && !this.billingValues()[field.id]?.trim())
          .map((field) => field.id),
      );
      return;
    }

  }

  private formatCurrency(amount: number): string {
    return `৳${amount.toLocaleString('en-US')}`;
  }
}