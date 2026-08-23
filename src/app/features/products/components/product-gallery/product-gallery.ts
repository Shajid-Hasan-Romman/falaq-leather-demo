import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-gallery',
  standalone: false,
  templateUrl: './product-gallery.html',
  styleUrls: ['./product-gallery.scss']
})
export class ProductGallery implements OnInit {

  @Input() productImage = '';

  selectedImage = 0;
  isZoomed = false;

  images = [
    'image/Products/Mango.png',
    'image/Products/Mango-1.png',
    'image/Products/Mango-2.png',
    'image/Products/Mango-3.png',
    'image/Products/Mango-4.png',
  ];

  ngOnInit(): void {
    if (this.productImage) {
      this.images = [this.productImage, ...this.images.filter(image => image !== this.productImage)];
    }
  }

  selectImage(index: number): void {
    this.selectedImage = index;
    this.isZoomed = false;
  }

  prevImage(): void {
    this.selectedImage =
      this.selectedImage === 0
        ? this.images.length - 1
        : this.selectedImage - 1;

    this.isZoomed = false;
  }

  nextImage(): void {
    this.selectedImage =
      this.selectedImage === this.images.length - 1
        ? 0
        : this.selectedImage + 1;

    this.isZoomed = false;
  }

  toggleZoom(): void {
    this.isZoomed = !this.isZoomed;
  }

}