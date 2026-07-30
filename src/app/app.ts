import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./layouts/main-layout/header/header";
import { Footer } from './layouts/main-layout/footer/footer';
import { Hero } from "./features/home/hero/hero";
import { FeaturedCategories } from "./features/home/featured-categories/featured-categories";
import { FeaturedProducts } from "./features/home/featured-products/featured-products";
import { PopularOrganic } from "./features/home/popular-organic/popular-organic";
import { Sale } from "./features/home/sale/sale";
import { BeastDeals } from "./features/home/beast-deals/beast-deals";
import { SecureDelivery } from "./features/home/secure-delivery/secure-delivery";

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet, Footer, Hero, FeaturedCategories, FeaturedProducts, PopularOrganic, Sale, BeastDeals, SecureDelivery],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
