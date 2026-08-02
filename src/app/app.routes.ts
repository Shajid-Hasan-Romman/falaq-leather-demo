import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/main-layout/main-layout').then(
        (m) => m.MainLayout
      ),
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/home/home.module').then(
            (m: any) => m.default ?? m.HomeModule
          ),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./features/products/product.module').then(
            (m) => m.ProductModule
          ),
      },
      {
        path: '**',
        loadComponent: () =>
          import('./features/not-found/not-found').then(
            (m) => m.NotFound
          ),
      },
    ],
  },
];