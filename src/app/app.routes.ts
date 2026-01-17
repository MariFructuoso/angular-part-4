import { Routes } from '@angular/router';
import { LoginPage } from './login-page/login-page';
import { PropertiesPage } from './properties-page/properties-page';
import { PropertyForm } from './property-form/property-form';
import { PropertyDetail } from './property-detail/property-detail';

export const routes: Routes = [
  { path: 'login', component: LoginPage, title: 'Login | InmoSanvi' },
  { path: 'properties', component: PropertiesPage, title: 'Propiedades | InmoSanvi' },
  { path: 'properties/add', component: PropertyForm, title: 'Nueva Propiedad | InmoSanvi' }, // IMPORTANTE: add va antes
  { path: 'properties/:id', component: PropertyDetail, title: 'Detalle | InmoSanvi' },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];