import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CartItem } from '../../../../core/models/cart-item.model';
import { CartService } from '../../../../core/services/cart.service';
import { ShippingOption } from '../../../../core/constants/delivery-options';

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

  /**
   * Whether the custom shipping dropdown is expanded.
   */
  isOpen = false;

  constructor(
    private cartService: CartService,
    private router: Router,
  ) {
    this.cartItems$ = cartService.cartItems$;
    this.subtotal$ = cartService.subtotal$;
    this.shipping$ = cartService.shipping$;
    this.grandTotal$ = cartService.grandTotal$;
    this.isEmpty$ = cartService.isEmpty$;
    this.shippingOptions$ = cartService.shippingOptions$;
    this.selectedShipping$ = cartService.selectedShipping$;
  }

  /**
   * Toggle the shipping dropdown open/closed.
   */
  toggleShipping(): void {
    this.isOpen = !this.isOpen;
  }

  /**
   * Select a shipping option and close dropdown.
   */
  selectShipping(zoneId: ShippingOption['id'] | string): void {
    this.cartService.setShipping(zoneId);
    this.isOpen = false;
  }

  /**
   * Clear the cart after confirmation.
   */
  clearCartWithConfirm(): void {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.cartService.clearCart();
    }
  }

  /**
   * Navigate to Checkout page.
   */
  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}