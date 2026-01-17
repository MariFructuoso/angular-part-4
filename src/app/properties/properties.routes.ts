import { Routes } from '@angular/router';
import { numericIdGuard } from './guards/numeric-id.guard'; 
import { leavePageGuard } from './guards/leave-page.guard'; 

export const propertiesRoutes: Routes = [
  {
    path: '', 
    loadComponent: () => import('./properties-page/properties-page').then(m => m.PropertiesPage),
    title: 'Properties Page'
  },
  {
    path: 'add', 
    loadComponent: () => import('./property-form/property-form').then(m => m.PropertyForm),
    title: 'New Property',
    canDeactivate: [leavePageGuard]
  },
  {
    path: ':id', 
    loadComponent: () => import('./property-detail/property-detail').then(m => m.PropertyDetail),
    canActivate: [numericIdGuard]
  },
];