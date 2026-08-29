import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Hero } from './hero/hero';
import { FeaturedCategories } from './featured-categories/featured-categories';
import { FeaturedProducts } from './featured-products/featured-products';
import { LatestArrivals } from './latest-arrivals/latest-arrivals';
import { PromoBanner } from './promo-banner/promo-banner';
import { ShopBrands } from './shop-brands/shop-brands';

@Component({
  selector: 'app-home',
  imports: [
    Hero,
    FeaturedCategories,
    FeaturedProducts,
    LatestArrivals,
    PromoBanner,
    ShopBrands,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
