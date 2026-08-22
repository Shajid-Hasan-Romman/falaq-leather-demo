import { Component, Input } from '@angular/core';
import { TrendingItem } from '../../models/product.model';

@Component({
  selector: 'app-trending-products',
  standalone: false,
  templateUrl: './trending-products.component.html',
  styleUrls: ['./trending-products.component.scss'],
})
export class TrendingProductsComponent {
  @Input() items: TrendingItem[] = [];

  stars(rating = 0): number[] {
    return Array.from({ length: 5 }, (_, i) => (i < rating ? 1 : 0));
  }
}