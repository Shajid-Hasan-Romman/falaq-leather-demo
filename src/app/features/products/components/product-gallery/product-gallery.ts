import { Component } from '@angular/core';

@Component({
  selector: 'app-product-gallery',
  standalone: false,
  templateUrl: './product-gallery.html',
  styleUrls: ['./product-gallery.scss']
})
export class ProductGallery {

  selectedImage = 0;

  images = [
    'image/Products/Mango.png',
    'image/Products/Mango-1.png',
    'image/Products/Mango-2.png',
    'image/Products/Mango-3.png',
    'image/Products/Mango-4.png',
  ];

  selectImage(index: number) {
    this.selectedImage = index;
  }

}