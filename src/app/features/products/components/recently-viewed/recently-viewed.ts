import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../../../../core/services/cart.service';
import { Product } from '../../../../core/models/product.model';

@Component({
  selector: 'app-recently-viewed',
  templateUrl: './recently-viewed.html',
  styleUrls: ['./recently-viewed.scss'],
  standalone: false,
})
export class RecentlyViewed {
  products: Product[] = [
    {
      id: 'rv-1',
      name: 'Organic Food Combo 1 Basket',
      image: 'image/Products/Product-1.png',
      price: 1100,
      oldPrice: 1300,
      discount: 27,
      weight: '1KG',
    },

    {
      id: 'rv-2',
      name: 'কালোজিরা ফুলের মধু (Premium Blackseed Flower Honey) - 1KG',
      image: 'image/Products/Product-2.png',
      price: 1100,
      oldPrice: 1300,
      discount: 27,
      weight: '1KG',
    },

    {
      id: 'rv-3',
      name: 'কালোজিরা ফুলের মধু (Premium Blackseed Flower Honey) - 1KG',
      image: 'image/Products/Product-3.png',
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