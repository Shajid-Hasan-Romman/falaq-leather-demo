import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-featured-categories',
  imports: [RouterLink],
  templateUrl: './featured-categories.html',
  styleUrl: './featured-categories.scss',
})
export class FeaturedCategories {
  constructor(private readonly router: Router) {}

  goToProductListing(): void {
    void this.router.navigate(['/product-listing']);
  }

      categories = [
    {
      name: 'Fresh Fruits',
      image: 'ad8a080a-a9ac-4ec3-ac48-1165cf4f0dda 1.png',
      items: '16 Items',
    },
    {
      name: 'Vegetables',
      image: 'image 5.png',
      items: '16 Items',
    },
    {
      name: 'Dairy',
      image: 'a40a7337-28ad-457a-93c7-0cd80b94c905 1.png',
      items: '16 Items',
    },
    {
      name: 'Sea Food',
      image: 'image 6.png',
      items: '16 Items',
    },
    {
      name: 'Bakery',
      image: 'image 7.png',
      items: '16 Items',
    },
    {
      name: 'Beverages',
      image: 'image 8.png',
      items: '16 Items',
    },
  ];
}
