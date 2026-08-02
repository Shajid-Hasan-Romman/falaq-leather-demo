import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Deal {
  image: string;
  title: string;
  price: number;
  oldPrice: number;
  description: string;
}

@Component({
  selector: 'app-beast-deals',
  standalone: false,
  templateUrl: './beast-deals.html',
  styleUrl: './beast-deals.scss',
})
export class BeastDeals {

  constructor(private router: Router) {}

  deals: Deal[] = [
    {
      image: 'mango.png',
      title: 'কালোজিরা ফুলের মধু (Premium Blackseed Flower Honey) – 1KG',
      price: 80,
      oldPrice: 90,
      description: 'Apparently we had reached a great height in the atmosphere.'
    },
    {
      image: 'basket vagitable.png',
      title: 'কালোজিরা ফুলের মধু (Premium Blackseed Flower Honey) – 1KG',
      price: 80,
      oldPrice: 90,
      description: 'Apparently we had reached a great height in the atmosphere.'
    },
    {
      image: 'vagitable.png',
      title: 'কালোজিরা ফুলের মধু (Premium Blackseed Flower Honey) – 1KG',
      price: 80,
      oldPrice: 90,
      description: 'Apparently we had reached a great height in the atmosphere.'
    },
    {
      image: 'basket 3.png',
      title: 'কালোজিরা ফুলের মধু (Premium Blackseed Flower Honey) – 1KG',
      price: 80,
      oldPrice: 90,
      description: 'Apparently we had reached a great height in the atmosphere.'
    }
  ];

  // Navigate to product details using index
  navigateToProduct(index: number) {
    const product = this.deals[index];
    this.router.navigate(['/product-details'], {
      queryParams: {
        id: index,
        title: product.title,
        price: product.price,
        description: product.description,
        image: product.image
      }
    });
  }

  addToCart(item: Deal) {
    console.log('Added to cart:', item);
    // Your cart logic here
  }
}