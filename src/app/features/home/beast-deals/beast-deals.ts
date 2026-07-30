import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Deal {
  image: string;
  title: string;
  price: number;
  oldPrice: number;
  description: string;
}

@Component({
  selector: 'app-beast-deals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './beast-deals.html',
  styleUrl: './beast-deals.scss',
})
export class BeastDeals {

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

}