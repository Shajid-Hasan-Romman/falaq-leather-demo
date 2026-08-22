import { Component } from '@angular/core';

interface ProductSize {
  name: string;
  price: number;
}

@Component({
  selector: 'app-size-selector',
  templateUrl:'./size-selector.html',
  styleUrls: ['./size-selector.scss'],
  standalone: false
})
export class SizeSelector {

  sizes: ProductSize[] = [
    { name: '0.5gm', price: 550 },
    { name: '1KG', price: 1550 },
    { name: '2KG', price: 5050 }
  ];

  selectedSize = this.sizes[2];

  quantity = 1;

  increase() {
    this.quantity++;
  }

  decrease() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  selectSize(size: ProductSize) {
    this.selectedSize = size;
  }
}