import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';

export interface FeaturedProduct {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly currency: string;
  readonly image: string;
  readonly alt: string;
  readonly path: string;
}

@Component({
  selector: 'app-featured-products',
  imports: [RouterLink, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './featured-products.html',
  styleUrl: './featured-products.scss',
})
export class FeaturedProducts {
  private readonly visibleCount = 4;

  readonly startIndex = signal(0);

  /** Card images match the primary shot in each product folder. */
  readonly products: readonly FeaturedProduct[] = [
    {
      id: 'zen',
      name: 'Men Dress - Slip On - Zen',
      price: 6990,
      currency: 'BDT',
      image: '/asset/products/zen/new_0091__DSC2432%20(1).jpg',
      alt: 'Men Dress Slip On Zen',
      path: '/product-details/men-dress---slip-on---zen-238546001',
    },
    {
      id: 'softened',
      name: 'Men Casual - Casual Basic - Softened',
      price: 3490,
      currency: 'BDT',
      image: '/asset/products/softend/DSC4911_000.jpg',
      alt: 'Men Casual Softened',
      path: '/product-details/men-casual---casual-basic---softened-238546053',
    },
    {
      id: 'steller-mule',
      name: 'Men Summer - Sandal - Steller',
      price: 2490,
      currency: 'BDT',
      image: '/asset/products/steller/_DSC2291.jpg',
      alt: 'Men Summer Sandal Steller',
      path: '/product-details/men-summer---sandal---steller-238546010',
    },
    {
      id: 'steller-toe',
      name: 'Men Summer - Sandal - Steller',
      price: 1790,
      currency: 'BDT',
      image: '/asset/products/sandal/_DSC2285.jpg',
      alt: 'Men Summer Sandal Steller toe-post',
      path: '/product-details/men-summer---sandal---steller-238546011',
    },
    {
      id: 'perlita',
      name: 'Ladies Open Heel - Slip On - Perlita',
      price: 2290,
      currency: 'BDT',
      image: '/asset/products/parlita/_DSC2087.jpg',
      alt: 'Ladies Open Heel Perlita',
      path: '/product-details/ladies-open-heel---slip-on---perlita-238546020',
    },
  ];

  readonly canPrev = computed(() => this.startIndex() > 0);

  readonly canNext = computed(
    () => this.startIndex() + this.visibleCount < this.products.length,
  );

  readonly visibleProducts = computed(() => {
    const start = this.startIndex();
    return this.products.slice(start, start + this.visibleCount);
  });

  prev(): void {
    if (!this.canPrev()) {
      return;
    }
    this.startIndex.update((i) => Math.max(0, i - 1));
  }

  next(): void {
    if (!this.canNext()) {
      return;
    }
    const maxStart = Math.max(0, this.products.length - this.visibleCount);
    this.startIndex.update((i) => Math.min(maxStart, i + 1));
  }
}
