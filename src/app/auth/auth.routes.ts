import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login-page/login-page').then(m => m.LoginPage),
    title: 'Login | Real Estate'
  },
  {
    path: '', // Si alguien pone solo '/auth', le mandamos al login
    redirectTo: 'login',
    pathMatch: 'full'
  }
];