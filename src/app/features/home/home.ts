import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Hero } from './hero/hero';
import { FeaturedCategories } from './featured-categories/featured-categories';
import { FeaturedProducts } from './featured-products/featured-products';
import { PopularOrganic } from './popular-organic/popular-organic';
import { Sale } from './sale/sale';
import { BeastDeals } from './beast-deals/beast-deals';
import { SecureDelivery } from './secure-delivery/secure-delivery';

@Component({
  selector: 'app-home',
  imports: [
    Hero,
    FeaturedCategories,
    FeaturedProducts,
    PopularOrganic,
    Sale,
    BeastDeals,
    SecureDelivery,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
