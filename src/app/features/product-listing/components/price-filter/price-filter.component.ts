import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PriceRange } from '../../models/product-filter.model';

@Component({
  selector: 'app-price-filter',
  standalone: false,
  templateUrl: './price-filter.component.html',
  styleUrls: ['./price-filter.component.scss'],
})
export class PriceFilterComponent {
  @Input() min = 10;
  @Input() max = 990;
  @Input() value: PriceRange = { min: 10, max: 990 };

  @Output() valueChange = new EventEmitter<PriceRange>();

  onMaxChange(event: Event): void {
    const max = Number((event.target as HTMLInputElement).value);

    this.value = {
      ...this.value,
      max,
    };

    this.valueChange.emit(this.value);
  }

  onFilterClick(): void {
    this.valueChange.emit(this.value);
  }
}