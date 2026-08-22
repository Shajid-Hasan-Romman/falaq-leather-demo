import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-featured-products',
  imports: [RouterLink],
  templateUrl: './featured-products.html',
  styleUrl: './featured-products.scss',
})
export class FeaturedProducts {
  constructor(
    private cartService: CartService,
    private router: Router,
  ) {}

  products: Product[] = [
    {
      id: 'fp-1',
      name: 'Organic Food Combo 1 Basket',
      image: 'steinpilze.png',
      price: 1100,
      oldPrice: 1300,
      discount: 27,
      weight: '1KG',
    },
    {
      id: 'fp-2',
      name: 'কালোজিরা ফুলের মধু (Premium Blackseed Flower Honey) - 1KG',
      image: 'basket 2.png',
      price: 1100,
      oldPrice: 1300,
      discount: 27,
      weight: '1KG',
    },
    {
      id: 'fp-3',
      name: 'কালোজিরা ফুলের মধু (Premium Blackseed Flower Honey) - 1KG',
      image: 'basket 3.png',
      price: 1100,
      oldPrice: 1300,
      discount: 27,
      weight: '1KG',
    },
    {
      id: 'fp-4',
      name: 'কালোজিরা ফুলের মধু (Premium Blackseed Flower Honey) - 1KG',
      image: 'basket 4.png',
      price: 1100,
      oldPrice: 1300,
      discount: 27,
      weight: '1KG',
    },
    {
      id: 'fp-5',
      name: 'Organic Food Combo 1 Basket',
      image: 'basket 5.png',
      price: 1100,
      oldPrice: 1300,
      discount: 27,
      weight: '1KG',
    },
    {
      id: 'fp-6',
      name: 'কালোজিরা ফুলের মধু (Premium Blackseed Flower Honey) - 1KG',
      image: 'basket 2.png',
      price: 1100,
      oldPrice: 1300,
      discount: 27,
      weight: '1KG',
    },
    {
      id: 'fp-7',
      name: 'কালোজিরা ফুলের মধু (Premium Blackseed Flower Honey) - 1KG',
      image: 'tomato.png',
      price: 1100,
      oldPrice: 1300,
      discount: 27,
      weight: '1KG',
    },
    {
      id: 'fp-8',
      name: 'কালোজিরা ফুলের মধু (Premium Blackseed Flower Honey) - 1KG',
      image: 'tomato slice.png',
      price: 1100,
      oldPrice: 1300,
      discount: 27,
      weight: '1KG',
    },
  ];

  addToCart(product: Product): void {
    this.cartService.addItem(product);
    this.router.navigate(['/cart']);
  }
}

