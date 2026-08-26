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
        title: 'Falaq Leather',
      },
      {
        path: 'product-details/:slug',
        loadComponent: () =>
          import('./features/product-details/product-details').then(
            (m) => m.ProductDetails,
          ),
        title: 'Product · Falaq Leather',
      },
      {
        // AmarBay: /products?shop_our_brand=elegante
        path: 'products',
        loadComponent: () =>
          import('./features/brand-products/brand-products').then(
            (m) => m.BrandProducts,
          ),
        title: 'Shop Our Brands · Falaq Leather',
      },
      {
        path: '**',
        loadComponent: () =>
          import('./features/not-found/not-found').then(
            (m) => m.NotFound,
          ),
        title: 'Page not found · Falaq Leather',
      },
    ],
  },
];
