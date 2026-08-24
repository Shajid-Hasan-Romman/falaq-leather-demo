import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Cart } from './pages/cart/cart';

const routes: Routes = [
  {
    path: '',
    component: Cart
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule {}