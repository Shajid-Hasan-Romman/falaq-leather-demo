import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CartRoutingModule } from './cart-routing.module';
import { Cart } from './pages/cart/cart';
import { CartItemRow } from './components/cart-item/cart-item';
import { CartSection } from './components/cart-section/cart-section';
import { OrderSummary } from './components/order-summary/order-summary';
import { PopularProducts } from './components/popular-products/popular-products';

@NgModule({
  declarations: [Cart, CartItemRow, CartSection, OrderSummary, PopularProducts],
  imports: [CommonModule, CartRoutingModule, RouterModule],
})
export class CartModule {}
