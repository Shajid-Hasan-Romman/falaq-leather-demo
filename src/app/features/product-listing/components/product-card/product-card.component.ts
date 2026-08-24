import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Router } from '@angular/router';

import { Product } from '../../models/product.model';

import {
  Product as CartProduct,
} from '../../../../core/models/product.model';

import { CartService } from '../../../../core/services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: Product;

  @Output() addToCart = new EventEmitter<Product>();

  constructor(
    private readonly router: Router,
    private readonly cartService: CartService,
  ) {}

  /**
   * Product image click
   * → Product Details page
   */
  openProductDetails(): void {
    if (!this.product) {
      return;
    }

    this.router.navigate(
      ['/products/product-details'],
      {
        queryParams: {
          id: this.product.id,
        },
      },
    );
  }

  /**
   * Add product to cart
   * → Cart page
   */
  onAddToCart(): void {
    if (!this.product) {
      return;
    }

    /*
     * Convert Product Listing Product
     * to Core Cart Product.
     */
    const cartProduct: CartProduct = {
      id: String(this.product.id),
      name: this.product.name,
      image: this.product.image,
      price: this.product.price,
      oldPrice: this.product.oldPrice,
      discount: this.product.discountPercent ?? 0,
    };

    // Add product to actual cart.
    this.cartService.addItem(cartProduct);

    // Notify parent component.
    this.addToCart.emit(this.product);

    // Redirect to cart.
    this.router.navigate(['/cart']);
  }
}