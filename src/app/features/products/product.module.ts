import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProductRoutingModule } from './product-routing.module';
import { ProductDetails } from './pages/product-details/product-details';
import { Breadcrumb } from './components/breadcrumb/breadcrumb';
import { ProductFeatures } from './components/product-features/product-features';
import { FeatureBar } from './components/feature-bar/feature-bar';
import { SizeSelector } from './components/size-selector/size-selector';
import { ProductGallery } from './components/product-gallery/product-gallery';
import { RelatedProducts } from './components/related-products/related-products';
import { ProductDescription } from './components/product-description/product-description';
import { RecentlyViewed } from './components/recently-viewed/recently-viewed';

@NgModule({
  declarations: [
    ProductDetails,
    Breadcrumb,
    ProductFeatures,
    FeatureBar,
    SizeSelector,
    ProductGallery,
    RelatedProducts,
    ProductDescription,
    RecentlyViewed
  ],
    imports: [
    CommonModule,
    RouterModule,
    ProductRoutingModule,
  ]
})
export class ProductModule {}