import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Hero } from './hero/hero';
import { FeaturedCategories } from './featured-categories/featured-categories';
import { FeaturedProducts } from './featured-products/featured-products';
import { LatestArrivals } from './latest-arrivals/latest-arrivals';
import { PromoBanner } from './promo-banner/promo-banner';
import { ShopBrands } from './shop-brands/shop-brands';
import { BestSellers } from './best-sellers/best-sellers';
import { PriceOffers } from './price-offers/price-offers';

@Component({
  selector: 'app-home',
  imports: [
    Hero,
    FeaturedCategories,
    FeaturedProducts,
    LatestArrivals,
    PromoBanner,
    ShopBrands,
    BestSellers,
    PriceOffers,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
