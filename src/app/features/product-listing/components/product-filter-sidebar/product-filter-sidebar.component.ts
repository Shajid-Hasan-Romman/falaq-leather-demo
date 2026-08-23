import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TrendingItem } from '../../models/product.model';
import { CategoryOption, PriceRange } from '../../models/product-filter.model';
import { CategoryFilterComponent } from "../category-filter/category-filter.component";

@Component({
  selector: 'app-product-filter-sidebar',
  standalone: false,
  templateUrl: './product-filter-sidebar.component.html',
  styleUrls: ['./product-filter-sidebar.component.scss'],
})
export class ProductFilterSidebarComponent {
  @Input() categories: CategoryOption[] = [];
  @Input() trendingItems: TrendingItem[] = [];
  @Input() priceRange: PriceRange = { min: 10, max: 990 };
  @Input() maxPrice = 2000;
  @Input() searchTerm = '';

  @Output() searchChange = new EventEmitter<string>();
  @Output() categoryChange = new EventEmitter<CategoryOption[]>();
  @Output() priceChange = new EventEmitter<PriceRange>();

  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchChange.emit(value);
  }
}