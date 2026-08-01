import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { Home } from './pages/home/home';
import { RouterModule } from '@angular/router';

import { Hero } from './components/hero/hero';
import { FeaturedCategories } from './components/featured-categories/featured-categories';
import { FeaturedProducts } from './components/featured-products/featured-products';
import { PopularOrganic } from './components/popular-organic/popular-organic';
import { Sale } from './components/sale/sale';
import { BeastDeals } from './components/beast-deals/beast-deals';
import { SecureDelivery } from './components/secure-delivery/secure-delivery';

@NgModule({
  declarations: [
    Home,
    Hero,
    FeaturedCategories,
    FeaturedProducts,
    PopularOrganic,
    Sale,
    BeastDeals,
    SecureDelivery
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule 
  ]
})
export class HomeModule {}