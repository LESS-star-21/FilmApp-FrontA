import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/components/login/login').then((m) => m.Login),
  },
  {
    path: 'films',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/films/components/film.list/film.list').then((m) => m.FilmList),
  },
  {
    path: '',
    redirectTo: 'films',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'films',
  },
];
