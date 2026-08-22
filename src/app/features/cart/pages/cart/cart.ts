import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../../../../core/models/cart-item.model';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cart {
  readonly cartItems$: Observable<CartItem[]>;
  readonly isEmpty$: Observable<boolean>;
  readonly subtotal$: Observable<number>;
  readonly shipping$: Observable<number>;
  readonly grandTotal$: Observable<number>;

  constructor(private cartService: CartService) {
    this.cartItems$ = cartService.cartItems$;
    this.isEmpty$ = cartService.isEmpty$;
    this.subtotal$ = cartService.subtotal$;
    this.shipping$ = cartService.shipping$;
    this.grandTotal$ = cartService.grandTotal$;
  }

  onRemove(productId: string): void {
    this.cartService.removeItem(productId);
  }

  onQuantityChange(event: { id: string; quantity: number }): void {
    this.cartService.updateQuantity(event.id, event.quantity);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }
}

