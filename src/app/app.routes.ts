import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    // Every page renders inside the main layout (header + footer).
    // Features are lazy-loaded and do not import each other.
    path: '',
    loadComponent: () =>
      import('./layouts/main-layout/main-layout').then(
        (m) => m.MainLayout,
      ),

    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./features/home/home').then((m) => m.Home),
        title: 'Falaq v2.0',
      },

      {
        // Legacy NgModule-based feature.
        path: 'products',
        loadChildren: () =>
          import('./features/products/product.module').then(
            (m) => m.ProductModule,
          ),
      },

      {
        path: 'checkout',
        loadComponent: () =>
          import('./features/checkout/checkout').then(
            (m) => m.Checkout,
          ),
        title: 'Checkout · Falaq v2.0',
      },

      {
        path: 'product-listing',
        loadChildren: () =>
          import(
            './features/product-listing/product-listing.module'
          ).then((m) => m.ProductListingModule),
        title: 'Product listing · Falaq v2.0',
      },

      {
        path: '**',
        loadComponent: () =>
          import('./features/not-found/not-found').then(
            (m) => m.NotFound,
          ),
        title: 'Page not found · Falaq v2.0',
      },
    ],
  },
];