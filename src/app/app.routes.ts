import { Routes } from '@angular/router';

export const routes: Routes = [


{
        path: '',
        loadComponent: () =>
          import('./pages/home/home')
            .then(m => m.Home),
      },

{
        path: 'about',
        loadComponent: () =>
          import('./pages/about/about')
            .then(m => m.About),
      },
{
        path: 'services',
        loadComponent: () =>
          import('./pages/services/services')
            .then(m => m.Services),
      },
      {
        path: 'experience',
        loadComponent: () =>
          import('./pages/experience/experience')
            .then(m => m.Experience),
      },
      {
        path: 'academy',
        loadComponent: () =>
          import('./pages/academy/academy')
            .then(m => m.Academy),
      },
      {
        path: 'hire-us',
        loadComponent: () =>
          import('./pages/hire-us/hire-us')
            .then(m => m.HireUs),
      },


      {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
