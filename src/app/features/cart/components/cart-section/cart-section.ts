import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { CartItem } from '../../../../core/models/cart-item.model';
import { CartService } from '../../../../core/services/cart.service';

/**
 * CartSection renders the complete cart table (header, product rows, and
 * "Continue Shopping" footer) as the left-hand panel in the cart's two-column
 * checkout layout. It is presentational/controlled: state lives in the
 * `CartService` singleton, and this component only reads the injected `Items`
 * list and forwards quantity/remove/navigation actions through the service.
 */
@Component({
  selector: 'app-cart-section',
  standalone: false,
  templateUrl: './cart-section.html',
  styleUrl: './cart-section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartSection {
  @Input({ required: true }) items!: CartItem[];

  constructor(
    private cartService: CartService,
    private router: Router,
  ) {}

  /** Total number of physical items (sum of line quantities). */
  get itemCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  /** price × quantity for a single line. */
  lineTotal(item: CartItem): number {
    return item.price * item.quantity;
  }

  /** Forward a quantity change to the cart service. */
  onQuantityChange(item: CartItem, newQuantity: number): void {
    this.cartService.updateQuantity(item.id, newQuantity);
  }

  /** Remove a single product line from the cart. */
  onRemoveItem(itemId: string): void {
    this.cartService.removeItem(itemId);
  }

  /** Navigate back to the product listing. */
  continueShopping(): void {
    this.router.navigate(['/products']);
  }
}