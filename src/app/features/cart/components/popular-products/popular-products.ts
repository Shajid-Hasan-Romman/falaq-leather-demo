import { Component } from '@angular/core';

import { CartService } from '../../../../core/services/cart.service';

interface PopularProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice: number;
  sizes: string[];
}

@Component({
  selector: 'app-popular-products',
  standalone: false,
  templateUrl: './popular-products.html',
  styleUrl: './popular-products.scss',
})
export class PopularProducts {
  constructor(private cartService: CartService) {}

  products: PopularProduct[] = [
    {
      id: 'pp-1',
      name: 'Organic Food Combo 1 Basket',
      image: 'image/Products/Product-1.png',
      price: 1100,
      oldPrice: 1300,
      sizes: ['1 kg', '2 kg'],
    },
    {
      id: 'pp-2',
      name: 'কালোজিরা ফুলের মধু (Premium Blackseed Flower Honey)',
      image: 'image/Products/Product-2.png',
      price: 1250,
      oldPrice: 1450,
      sizes: ['1 kg', '2 kg'],
    },
  ];

  /** Selected size per product, keyed by product id. Defaults to the first size. */
  readonly selectedSizes: Record<string, string> = {
    'pp-1': '1 kg',
    'pp-2': '1 kg',
  };

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
