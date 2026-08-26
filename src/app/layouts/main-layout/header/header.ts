import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface NavChild {
  readonly label: string;
  readonly path: string;
}

export interface NavItem {
  readonly label: string;
  readonly path: string;
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

  readonly menuOpen = signal(false);
  readonly openDropdown = signal<string | null>(null);
  readonly cartCount = signal(0);

  readonly navItems: readonly NavItem[] = [
    {
      label: 'Men',
      path: '/shop/men',
      children: [
        { label: 'Bags', path: '/shop/men/bags' },
        { label: 'Wallets', path: '/shop/men/wallets' },
        { label: 'Belts', path: '/shop/men/belts' },
        { label: 'Shoes', path: '/shop/men/shoes' },
      ],
    },
    {
      label: 'Women',
      path: '/shop/women',
      children: [
        { label: 'Handbags', path: '/shop/women/handbags' },
        { label: 'Wallets', path: '/shop/women/wallets' },
        { label: 'Accessories', path: '/shop/women/accessories' },
      ],
    },
    {
      label: 'Bags',
      path: '/shop/bags',
      children: [
        { label: 'Tote', path: '/shop/bags/tote' },
        { label: 'Messenger', path: '/shop/bags/messenger' },
        { label: 'Travel', path: '/shop/bags/travel' },
      ],
    },
    {
      label: 'Accessories',
      path: '/shop/accessories',
      children: [
        { label: 'Belts', path: '/shop/accessories/belts' },
        { label: 'Card holders', path: '/shop/accessories/card-holders' },
        { label: 'Care kits', path: '/shop/accessories/care' },
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
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }
}
