import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly categories = [
    { id: 'fruits-vegetables', label: 'Fruits & Vegetables' },
    { id: 'grocery-staples', label: 'Grocery Staples' },
  ];

  readonly categoryMenuOpen = signal(false);
  readonly productSuggestions = [
    'Organic Food Combo 1 Basket',
    'Fresh Seasonal Vegetable Box',
    'Natural Wildflower Honey',
    'Premium Garden Fresh Pack',
    'Organic Family Grocery Pack',
    'Sweet Fresh Mango Selection',
    'Farm Pick Mango Basket',
    'Mango Lovers Collection',
    'Daily Kitchen Essentials',
    'Healthy Breakfast Pantry Box',
  ];
  searchTerm = '';

  get searchSuggestions(): string[] {
    const query = this.searchTerm.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return this.productSuggestions
      .filter(product => product.toLowerCase().includes(query))
      .slice(0, 5);
  }

  constructor(private readonly router: Router) {}

  toggleCategoryMenu(): void {
    this.categoryMenuOpen.update(isOpen => !isOpen);
  }

  goToCategory(categoryId: string): void {
    this.categoryMenuOpen.set(false);
    void this.router.navigate(['/product-listing'], {
      queryParams: { category: categoryId, search: null },
    });
  }

  searchProducts(): void {
    const search = this.searchTerm.trim();

    void this.router.navigate(['/product-listing'], {
      queryParams: { search: search || null, category: null },
    });
  }

  onSearchInput(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
  }

  selectSuggestion(suggestion: string): void {
    this.searchTerm = suggestion;
    this.searchProducts();
  }

}
