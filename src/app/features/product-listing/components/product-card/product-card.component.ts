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

  onAddToCart(): void {
    if (!this.product) {
      return;
    }

    /*
     * Product Listing Product
     * id: number
     *
     * Cart Product
     * id: string
     *
     * Convert Product Listing model
     * into Cart model before adding.
     */
    const cartProduct: CartProduct = {
      id: String(this.product.id),
      name: this.product.name,
      image: this.product.image,
      price: this.product.price,
      oldPrice: this.product.oldPrice,
      discount: this.product.discountPercent ?? 0,
    };

    // Add product to CartService.
    this.cartService.addItem(cartProduct);

    // Notify parent component.
    this.addToCart.emit(this.product);

    // Redirect to Cart page.
    this.router.navigate(['/cart']);
  }
}