import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryOption } from '../../models/product-filter.model';

@Component({
  selector: 'app-category-filter',
  standalone: false,
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss'],
})
export class CategoryFilterComponent {
  @Input() categories: CategoryOption[] = [];
  @Output() categoryChange = new EventEmitter<CategoryOption[]>();

  onToggle(category: CategoryOption): void {
    const updated = this.categories.map(c =>
      c.id === category.id ? { ...c, checked: !c.checked } : c
    );
    this.categoryChange.emit(updated);
  }
}