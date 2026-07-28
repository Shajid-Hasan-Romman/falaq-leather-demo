import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      import('./features/products/product.module').then(
        m => m.ProductModule
      )
  },
  {
    path: '',
    redirectTo: 'products/product-details',
    pathMatch: 'full'
  }
];