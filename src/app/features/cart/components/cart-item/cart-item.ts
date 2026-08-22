import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CartItem } from '../../../../core/models/cart-item.model';
import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-cart-item',
  standalone: false,
  templateUrl: './cart-item.html',
  styleUrls: ['./cart-item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemRow {
  /**
   * Renamed from `CartItem` to avoid clashing with the `CartItem` interface
   * from `core/models`. The selector stays `app-cart-item`.
   */
  @Input({ required: true }) item!: CartItem;

  constructor(private cartService: CartService) {}

  increase(): void {
    this.cartService.updateQuantity(this.item.id, this.item.quantity + 1);
  }

  decrease(): void {
    this.cartService.updateQuantity(this.item.id, this.item.quantity - 1);
  }

  remove(): void {
    this.cartService.removeItem(this.item.id);
  }

  /** price × quantity for this single line. */
  get itemTotal(): number {
    return this.item.price * this.item.quantity;
  }
}

