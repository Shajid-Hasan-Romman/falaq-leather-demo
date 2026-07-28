import { Component } from '@angular/core';

interface Product {
  image: string;
  title: string;
  price: number;
  oldPrice: number;
  discount: number;
}

@Component({
  selector: 'app-recently-viewed',
  templateUrl: './recently-viewed.html',
  styleUrls: ['./recently-viewed.scss'],
  standalone: false
})
export class RecentlyViewed {

  products: Product[] = [
    {
      image: 'image/Products/Product-1.png',
      title: 'Organic Food Combo 1 Basket',
      price: 1100,
      oldPrice: 1300,
      discount: 27
    },
    {
      image: 'image/Products/Product-2.png',
      title: 'কালোজিরা ফুলের মধু (Premium Blackseed Flower Honey) - 1KG',
      price: 1100,
      oldPrice: 1300,
      discount: 27
    },
    {
      image: 'image/Products/Product-3.png',
      title: 'কালোজিরা ফুলের মধু (Premium Blackseed Flower Honey) - 1KG',
      price: 1100,
      oldPrice: 1300,
      discount: 27
    },
   
  ];

}