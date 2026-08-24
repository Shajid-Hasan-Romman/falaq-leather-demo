import { Component } from '@angular/core';
import { CartService } from '../../../../core/services/cart.service';
import { Product } from '../../../../core/models/product.model';

@Component({
  selector: 'app-recently-viewed',
  templateUrl: './recently-viewed.html',
  styleUrls: ['./recently-viewed.scss'],
  standalone: false
})
export class RecentlyViewed {
  constructor(private cartService: CartService) {}

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

  addToCart(product: Product): void {
    this.cartService.addItem(product);
  }
}
