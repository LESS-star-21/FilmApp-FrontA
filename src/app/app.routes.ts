import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login-page/login-page').then((c) => c.LoginPage),
  },
  {
    path: 'films',
    loadComponent: () =>
      import('./features/films/pages/films-page/films-page').then((c) => c.FilmsPage),
  },
  {
    path: 'actors',
    loadComponent: () =>
      import('./features/actors/pages/actors-page/actors-page').then((c) => c.ActorsPage),
  },
  {
    path: 'directors',
    loadComponent: () =>
      import('./features/directors/pages/directors-page/directors-page').then((c) => c.DirectorsPage),
  },
  {
    path: 'genres',
    loadComponent: () =>
      import('./features/genres/pages/genres-page/genres-page').then((c) => c.GenresPage),
  },
  {
    path: 'lists',
    loadComponent: () =>
      import('./features/lists/pages/lists-page/lists-page').then((c) => c.ListsPage),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
