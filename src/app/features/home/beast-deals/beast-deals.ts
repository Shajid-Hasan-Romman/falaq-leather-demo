import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-beast-deals',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './beast-deals.html',
  styleUrl: './beast-deals.scss',
})
export class BeastDeals {
  constructor(
    private router: Router,
    private cartService: CartService,
  ) {}

  deals: Product[] = [
    {
      id: 'bd-1',
      name: 'কালোজিরা ফুলের মধু (Premium Blackseed Flower Honey) – 1KG',
      image: 'mango.png',
      price: 80,
      oldPrice: 90,
      discount: 11,
      weight: '1KG',
    },
    {
      id: 'bd-2',
      name: 'কালোজিরা ফুলের মধু (Premium Blackseed Flower Honey) – 1KG',
      image: 'basket vagitable.png',
      price: 80,
      oldPrice: 90,
      discount: 11,
      weight: '1KG',
    },
    {
      id: 'bd-3',
      name: 'কালোজিরা ফুলের মধু (Premium Blackseed Flower Honey) – 1KG',
      image: 'vagitable.png',
      price: 80,
      oldPrice: 90,
      discount: 11,
      weight: '1KG',
    },
    {
      id: 'bd-4',
      name: 'কালোজিরা ফুলের মধু (Premium Blackseed Flower Honey) – 1KG',
      image: 'basket 3.png',
      price: 80,
      oldPrice: 90,
      discount: 11,
      weight: '1KG',
    },
  ];

  navigateToProduct(product: Product): void {
    this.router.navigate(['/products/product-details'], {
      queryParams: {
        id: product.id,
        title: product.name,
        price: product.price,
        description: '',
        image: product.image,
      },
    });
  }

  addToCart(product: Product): void {
    this.cartService.addItem(product);
    this.router.navigate(['/cart']);
  }
}
