import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PriceFilterComponent } from './components/price-filter/price-filter.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductFilterSidebarComponent } from './components/product-filter-sidebar/product-filter-sidebar.component';
import { ProductGridComponent } from './components/product-grid/product-grid.component';
import { TrendingProductsComponent } from './components/trending-products/trending-products.component';
import { ProductListingRoutingModule } from './product-listing-routing.module';
import { ProductListingComponent } from './product-listing.component';

@NgModule({
  declarations: [
    ProductListingComponent,
    ProductFilterSidebarComponent,
    CategoryFilterComponent,
    PriceFilterComponent,
    TrendingProductsComponent,
    ProductGridComponent,
    ProductCardComponent,
    PaginationComponent,
  ],
  imports: [CommonModule, ProductListingRoutingModule],
  exports: [ProductListingComponent],
})
export class ProductListingModule {}