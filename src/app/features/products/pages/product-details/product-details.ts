import { Component } from '@angular/core';

import { CartService } from '../../../../core/services/cart.service';
import { Product } from '../../../../core/models/product.model';

@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.scss'],
})
export class ProductDetails {
  constructor(private cartService: CartService) {}

  /** The product displayed on the details page (matches the visible UI). */
  readonly product: Product = {
    id: 'bombay-chili-pickle',
    name: 'বোম্বাই মরিচের আচার (Bombay Chili Pickle)',
    image: 'image/Products/Mango.png',
    price: 1400,
    oldPrice: 2500,
    discount: 38,
    weight: '1KG',
  };

  addToCart(): void {
    this.cartService.addItem(this.product);
  }
}