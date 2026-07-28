import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    // Every page renders inside the main layout (header + footer). Features
    // are lazy-loaded standalone components — features never import each other.
    path: '',
    loadComponent: () =>
      import('./layouts/main-layout/main-layout').then((m) => m.MainLayout),
    children: [
      {
        path: '**',
        loadComponent: () =>
          import('./features/not-found/not-found').then((m) => m.NotFound),
        title: 'Page not found · Falaq v2.0',
      },
    ],
  },
];
