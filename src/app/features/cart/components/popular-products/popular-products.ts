import { Component } from '@angular/core';

import { CartService } from '../../../../core/services/cart.service';
import { PopularProduct } from '../../models/popular-product.model';
import popularProductsData from '../../data/popular-products.json';

@Component({
  selector: 'app-popular-products',
  standalone: false,
  templateUrl: './popular-products.html',
  styleUrl: './popular-products.scss',
})
export class PopularProducts {
  constructor(private cartService: CartService) {}

  /** Static popular-product list loaded from `data/popular-products.json`. */
  products: PopularProduct[] = [...popularProductsData];

  /** Selected size per product, keyed by product id. Defaults to each product's first size. */
  readonly selectedSizes: Record<string, string> = Object.fromEntries(
    popularProductsData.map((product) => [product.id, product.sizes[0]!]),
  );

  selectSize(productId: string, size: string): void {
    this.selectedSizes[productId] = size;
  }

  /** How much the customer saves on a product (old price minus sale price). */
  saveAmount(product: PopularProduct): number {
    return product.oldPrice - product.price;
  }

  /** Move the first product to the end (cycles the carousel forward). */
  next(): void {
    if (this.products.length < 2) return;
    this.products.push(this.products.shift()!);
  }

  /** Move the last product to the front (cycles the carousel backward). */
  previous(): void {
    if (this.products.length < 2) return;
    this.products.unshift(this.products.pop()!);
  }

  addToCart(product: PopularProduct): void {
    this.cartService.addItem(product);
  }
}
