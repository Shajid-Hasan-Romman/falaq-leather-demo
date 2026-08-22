import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../../../../core/models/cart-item.model';
import {
  CartService,
  ShippingOption,
} from '../../../../core/services/cart.service';

@Component({
  selector: 'app-order-summary',
  standalone: false,
  templateUrl: './order-summary.html',
  styleUrls: ['./order-summary.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderSummary {
  readonly cartItems$: Observable<CartItem[]>;
  readonly subtotal$: Observable<number>;
  readonly shipping$: Observable<number>;
  readonly grandTotal$: Observable<number>;
  readonly isEmpty$: Observable<boolean>;
  readonly shippingOptions$: Observable<ShippingOption[]>;
  readonly selectedShipping$: Observable<ShippingOption>;

  constructor(private cartService: CartService) {
    this.cartItems$ = cartService.cartItems$;
    this.subtotal$ = cartService.subtotal$;
    this.shipping$ = cartService.shipping$;
    this.grandTotal$ = cartService.grandTotal$;
    this.isEmpty$ = cartService.isEmpty$;
    this.shippingOptions$ = cartService.shippingOptions$;
    this.selectedShipping$ = cartService.selectedShipping$;
  }

  /** Whether the custom shipping dropdown is expanded. */
  isOpen = false;

  /** Toggle the shipping dropdown open/closed. */
  toggleShipping(): void {
    this.isOpen = !this.isOpen;
  }

  /** Select a shipping zone from the dropdown and close it. */
  selectShipping(zoneId: ShippingOption['id'] | string): void {
    this.cartService.setShipping(zoneId);
    this.isOpen = false;
  }

  clearCartWithConfirm(): void {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.cartService.clearCart();
    }
  }

  proceedToCheckout(): void {
    // TODO: Wire up the CheckoutModule once it exists.
    console.log('Checkout flow not yet implemented');
  }
}

