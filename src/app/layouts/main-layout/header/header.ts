import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { CartService } from '../../../core/services/cart.service';

export interface NavChild {
  readonly label: string;
  readonly path: string;
  readonly queryParams?: Readonly<Record<string, string>>;
}

export interface NavItem {
  readonly label: string;
  readonly path: string;
  readonly queryParams?: Readonly<Record<string, string>>;
  readonly children: readonly NavChild[];
}

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly cart = inject(CartService);

  readonly menuOpen = signal(false);
  readonly openDropdown = signal<string | null>(null);
  readonly cartCount = this.cart.itemCount;

  /** Primary nav — paths match shop catalog + brand listing. */
  readonly navItems: readonly NavItem[] = [
    {
      label: 'Men',
      path: '/shop/men',
      children: [
        { label: 'Formal', path: '/shop/men/formal' },
        { label: 'Casual', path: '/shop/men/casual' },
        { label: 'Sandal', path: '/shop/men/sandal' },
      ],
    },
    {
      label: 'Women',
      path: '/shop/women',
      children: [
        { label: 'Flats', path: '/shop/women/flats' },
        { label: 'Heels', path: '/shop/women/heels' },
        { label: 'Closed', path: '/shop/women/closed' },
      ],
    },
    {
      label: 'Children',
      path: '/shop/children',
      children: [
        { label: 'Boys Shoes', path: '/shop/children/boys' },
        { label: 'Girls Shoes', path: '/shop/children/girls' },
        { label: 'Sports', path: '/shop/children/sports' },
      ],
    },
    {
      label: 'Brands',
      path: '/products',
      queryParams: { shop_our_brand: 'shop-our-brand' },
      children: [
        {
          label: 'Elegante',
          path: '/products',
          queryParams: { shop_our_brand: 'elegante' },
        },
        {
          label: 'Lara Clara',
          path: '/products',
          queryParams: { shop_our_brand: 'lara-clara' },
        },
        {
          label: 'Bay Soft',
          path: '/products',
          queryParams: { shop_our_brand: 'bay-soft' },
        },
        {
          label: 'Striker',
          path: '/products',
          queryParams: { shop_our_brand: 'striker' },
        },
      ],
    },
  ];

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
    if (!this.menuOpen()) {
      this.openDropdown.set(null);
    }
  }

  closeMenu(): void {
    this.menuOpen.set(false);
    this.openDropdown.set(null);
  }

  toggleDropdown(label: string): void {
    this.openDropdown.update((current) => (current === label ? null : label));
  }

  openDropdownOnHover(label: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    if (window.matchMedia('(min-width: 992px)').matches) {
      this.openDropdown.set(label);
    }
  }

  closeDropdownOnLeave(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    if (window.matchMedia('(min-width: 992px)').matches) {
      this.openDropdown.set(null);
    }
  }

  onSearchSubmit(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const input = form.querySelector(
      'input[type="search"]',
    ) as HTMLInputElement | null;
    const q = input?.value.trim() ?? '';

    this.closeMenu();
    void this.router.navigate(['/shop'], {
      queryParams: q ? { q } : {},
    });
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }
}
