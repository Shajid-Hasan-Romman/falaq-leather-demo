import { Component } from '@angular/core';

interface Product {
  image: string;
  name: string;
  price: number;
  oldPrice: number;
  discount: number;
}

@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.html',
  styleUrls: ['./related-products.scss'],
  standalone: false
})
export class RelatedProducts {

  products: Product[] = [
    {
      image: 'image/Products/Product-1.png',
      name: 'Organic Food Combo 1 Basket',
      price: 1100,
      oldPrice: 1300,
      discount: 27
    },
    {
      image: 'image/Products/Product-2.png',
      name: 'কালোজিরা ফুলের মধু (Premium Blackseed Flower Honey) - 1KG',
      price: 1100,
      oldPrice: 1300,
      discount: 27
    },
    {
      image: 'image/Products/Product-3.png',
      name: 'কালোজিরা ফুলের মধু (Premium Blackseed Flower Honey) - 1KG',
      price: 1100,
      oldPrice: 1300,
      discount: 27
    },
    {
      image: 'image/Products/Product-4.png',
      name: 'কালোজিরা ফুলের মধু (Premium Blackseed Flower Honey) - 1KG',
      price: 1100,
      oldPrice: 1300,
      discount: 27
    }
  ];

}