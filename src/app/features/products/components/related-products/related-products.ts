import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../../../../core/services/cart.service';
import { Product } from '../../../../core/models/product.model';

@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.html',
  styleUrls: ['./related-products.scss'],
  standalone: false,
})
export class RelatedProducts {
  products: Product[] = [
    {
      id: 'rp-1',
      name: 'Organic Food Combo 1 Basket',
      image: 'image/Products/Product-1.png',
      price: 1100,
      oldPrice: 1300,
      discount: 27,
      weight: '1KG',
    },

    {
      id: 'rp-2',
      name: 'কালোজিরা ফুলের মধু (Premium Blackseed Flower Honey) - 1KG',
      image: 'image/Products/Product-2.png',
      price: 1100,
      oldPrice: 1300,
      discount: 27,
      weight: '1KG',
    },

    {
      id: 'rp-3',
      name: 'কালোজিরা ফুলের মধু (Premium Blackseed Flower Honey) - 1KG',
      image: 'image/Products/Product-3.png',
      price: 1100,
      oldPrice: 1300,
      discount: 27,
      weight: '1KG',
    },

    {
      id: 'rp-4',
      name: 'কালোজিরা ফুলের মধু (Premium Blackseed Flower Honey) - 1KG',
      image: 'image/Products/Product-4.png',
      price: 1100,
      oldPrice: 1300,
      discount: 27,
      weight: '1KG',
    },
  ];

  constructor(
    private readonly cartService: CartService,
    private readonly router: Router
  ) {}

  /**
   * Product image/name click
   * → Product Details page
   */
  openProductDetails(product: Product): void {
    this.router.navigate(
      ['/products/product-details'],
      {
        queryParams: {
          id: product.id,
        },
      }
    );
  }

  /**
   * Add product to cart
   * → Cart page
   */
  addToCart(product: Product, event?: Event): void {
    event?.stopPropagation();

    this.cartService.addItem(product);

    this.router.navigate(['/cart']);
  }
}