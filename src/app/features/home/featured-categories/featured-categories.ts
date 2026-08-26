import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

export type CollectionTabId = 'men' | 'women' | 'children';

export interface CollectionItem {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly src: string;
  readonly alt: string;
  readonly path: string;
}

export interface CollectionTab {
  readonly id: CollectionTabId;
  readonly label: string;
  readonly items: readonly CollectionItem[];
}

@Component({
  selector: 'app-featured-categories',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './featured-categories.html',
  styleUrl: './featured-categories.scss',
})
export class FeaturedCategories {
  readonly activeTab = signal<CollectionTabId>('men');

  readonly tabs: readonly CollectionTab[] = [
    {
      id: 'men',
      label: "Men's",
      items: [
        {
          id: 'mens-formal',
          title: "MEN'S FORMAL",
          subtitle: 'Revamp your formal look',
          src: '/asset/men/men-formal-1.jpg',
          alt: "Men's formal leather shoes",
          path: '/shop/men/formal',
        },
        {
          id: 'mens-sandal',
          title: "MEN'S SANDAL",
          subtitle: 'Freedom for Your Feet',
          src: '/asset/men/Men-Casual-1.jpg',
          alt: "Men's leather sandals",
          path: '/shop/men/sandal',
        },
        {
          id: 'mens-casual',
          title: "MEN'S CASUAL",
          subtitle: 'Step Into Comfort',
          src: '/asset/men/Men-casual-3.jpg',
          alt: "Men's casual shoes",
          path: '/shop/men/casual',
        },
      ],
    },
    {
      id: 'women',
      label: "Women's",
      items: [
        {
          id: 'womens-flats',
          title: 'FLATS',
          subtitle: 'Step into comfort, stride with style',
          src: '/asset/women/women-hill-3.jpg',
          alt: "Women's flat sandals",
          path: '/shop/women/flats',
        },
        {
          id: 'womens-heels',
          title: 'HEELS',
          subtitle: 'Effortless chic, every step',
          src: '/asset/women/Women-Hill-2.jpg',
          alt: "Women's heels",
          path: '/shop/women/heels',
        },
        {
          id: 'womens-closed',
          title: 'CLOSED',
          subtitle: 'Unleash your day, pain-free',
          src: '/asset/women/Women-Hill-1.jpg',
          alt: "Women's closed shoes",
          path: '/shop/women/closed',
        },
      ],
    },
    {
      id: 'children',
      label: 'Children',
      items: [
        {
          id: 'boys-shoes',
          title: 'BOYS SHOES',
          subtitle: 'Every step is a new story',
          src: '/asset/children/Men-Casual-2.jpg',
          alt: "Boys' leather shoes",
          path: '/shop/children/boys',
        },
        {
          id: 'girls-shoes',
          title: 'GIRLS SHOES',
          subtitle: 'Tiny feet, big dreams – walk in wonder',
          src: '/asset/children/Kids-3.jpg',
          alt: "Girls' shoes",
          path: '/shop/children/girls',
        },
        {
          id: 'sports',
          title: 'SPORTS',
          subtitle: 'Jump, run, play – shoes for every day',
          src: '/asset/children/Kids-Shoe-1.jpg',
          alt: "Children's sports shoes",
          path: '/shop/children/sports',
        },
      ],
    },
  ];

  readonly activeItems = computed(() => {
    const tab = this.tabs.find((t) => t.id === this.activeTab());
    return tab?.items ?? [];
  });

  selectTab(id: CollectionTabId): void {
    this.activeTab.set(id);
  }
}
