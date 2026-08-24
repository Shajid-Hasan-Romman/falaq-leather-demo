import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';

import { CartService } from '../../core/services/cart.service';

import { CheckoutStepper } from './components/checkout-stepper/checkout-stepper';
import { CheckoutDeliveryArea } from './components/checkout-delivery-area/checkout-delivery-area';
import { CheckoutBillingForm } from './components/checkout-billing-form/checkout-billing-form';
import { CheckoutOrderSummary } from './components/checkout-order-summary/checkout-order-summary';

import {
  DEFAULT_DELIVERY_AREA_ID,
  DELIVERY_AREAS,
  type DeliveryArea,
} from './data/delivery-areas.data';

import { BILLING_FORM_FIELDS } from './data/billing-fields.data';
import { ORDER_SUMMARY } from './data/order-summary.data';

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
  private readonly billingValues =
    signal<Readonly<Record<string, string>>>({});

  private readonly selectedArea =
    signal<DeliveryArea>(
      DELIVERY_AREAS.find(
        (area) =>
          area.id ===
          DEFAULT_DELIVERY_AREA_ID,
      ) ?? DELIVERY_AREAS[0],
    );

  protected readonly invalidBillingFieldIds =
    signal<readonly string[]>([]);

  constructor(
    private readonly cartService: CartService,
  ) {}

  /**
   * Checkout order summary.
   *
   * IMPORTANT:
   * Values come directly from CartService,
   * so Checkout always uses the same cart data.
   */
  protected readonly summary = computed(() => {
    const subtotal =
      this.cartService.subtotal;

    const shipping =
      this.cartService.shipping;

    const total =
      this.cartService.grandTotal;

    return {
      ...ORDER_SUMMARY,

      subtotal:
        this.formatCurrency(subtotal),

      shipping:
        this.formatCurrency(shipping),

      total:
        this.formatCurrency(total),
    };
  });

  /**
   * Update billing form values.
   */
  protected updateBillingValues(
    values: Readonly<
      Record<string, string>
    >,
  ): void {
    this.billingValues.set(values);

    this.invalidBillingFieldIds.update(
      (invalidIds) =>
        invalidIds.filter(
          (fieldId) =>
            values[fieldId]
              ?.trim()
              .length === 0,
        ),
    );
  }

  /**
   * Update delivery area.
   *
   * Also sync the selected delivery area
   * with CartService shipping.
   */
  protected updateDeliveryArea(
    area: DeliveryArea,
  ): void {
    this.selectedArea.set(area);

    this.cartService.setShipping(
      area.id,
    );
  }

  /**
   * Place order.
   */
  protected placeOrder(): void {
    const missingFields =
      BILLING_FORM_FIELDS
        .filter(
          (field) =>
            field.required &&
            !this.billingValues()[
              field.id
            ]?.trim(),
        )
        .map(
          (field) => field.label,
        );

    if (missingFields.length > 0) {
      this.invalidBillingFieldIds.set(
        BILLING_FORM_FIELDS
          .filter(
            (field) =>
              field.required &&
              !this.billingValues()[
                field.id
              ]?.trim(),
          )
          .map(
            (field) => field.id,
          ),
      );

      return;
    }

    // Place order logic goes here.
  }

  /**
   * Format BDT currency.
   */
  private formatCurrency(
    amount: number,
  ): string {
    return `৳${amount.toLocaleString(
      'en-US',
    )}`;
  }
}