import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
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
  readonly suggestionsVisible = signal(false);
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

    if (!query || !this.suggestionsVisible()) {
      return [];
    }

    return this.productSuggestions
      .filter(product => product.toLowerCase().includes(query))
      .slice(0, 5);
  }

  constructor(
    public cartService: CartService,
    private readonly router: Router,
  ) {}

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  toggleCategoryMenu(): void {
    this.categoryMenuOpen.update(isOpen => !isOpen);
  }

  closeCategoryMenu(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (!target.closest('.category-nav')) {
      this.categoryMenuOpen.set(false);
    }
  }

  goToCategory(categoryId: string): void {
    this.categoryMenuOpen.set(false);
    void this.router.navigate(['/product-listing'], {
      queryParams: { category: categoryId, search: null },
    });
  }

  searchProducts(): void {
    const search = this.searchTerm.trim();
    this.suggestionsVisible.set(false);

    void this.router.navigate(['/product-listing'], {
      queryParams: { search: search || null, category: null },
    });
  }

  onSearchInput(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.suggestionsVisible.set(true);
  }

  selectSuggestion(suggestion: string): void {
    this.searchTerm = suggestion;
    this.searchProducts();
  }
}
