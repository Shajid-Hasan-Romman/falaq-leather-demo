import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { IcPlaceOrderComponent } from '../../../../shared/components/icons/ic-place-order.component';
import { ORDER_SUMMARY, type CheckoutSummaryData } from '../../data/order-summary.data';

/**
 * Order Summary column (from the Figma right rail): the summary card (line
 * items + totals with dividers), the privacy note and the green place-order
 * button. Everything is rendered from the config in `data/order-summary.data.ts`.
 */
@Component({
  selector: 'app-checkout-order-summary',
  imports: [IcPlaceOrderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkout-order-summary.html',
  styleUrl: './checkout-order-summary.scss',
})
export class CheckoutOrderSummary {
  readonly summary = input<CheckoutSummaryData>(ORDER_SUMMARY);
  readonly placeOrder = output<void>();

  protected submitOrder(): void {
    this.placeOrder.emit();
  }
}