import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/main-layout/main-layout').then((m) => m.MainLayout),
    children: [
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
          import('./features/not-found/not-found').then((m) => m.NotFound),
        title: 'Page not found · Falaq v2.0',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'products/product-details',
    pathMatch: 'full',
  },
];