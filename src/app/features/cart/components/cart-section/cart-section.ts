import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { CartItem } from '../../../../core/models/cart-item.model';
import { CartService } from '../../../../core/services/cart.service';

/**
 * CartSection renders the complete cart table (header, product rows, and
 * "Continue Shopping" footer) as the left-hand panel in the cart's two-column
 * checkout layout.
 *
 * State is managed by the CartService singleton.
 * This component handles quantity, remove, and navigation actions.
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

  /**
   * Total number of physical items in the cart.
   */
  get itemCount(): number {
    return this.items.reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
  }

  /**
   * Calculate total price for a single cart item.
   */
  lineTotal(item: CartItem): number {
    return item.price * item.quantity;
  }

  /**
   * Update the quantity of a cart item.
   */
  onQuantityChange(
    item: CartItem,
    newQuantity: number,
  ): void {
    this.cartService.updateQuantity(
      item.id,
      newQuantity,
    );
  }

  /**
   * Remove a single item from the cart.
   */
  onRemoveItem(itemId: string): void {
    this.cartService.removeItem(itemId);
  }

  /**
   * Navigate back to the Product Listing page.
   */
  continueShopping(): void {
    this.router.navigate(['/product-listing']);
  }
}