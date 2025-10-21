import { Routes } from '@angular/router';
import { Login } from '@pages/login/login';
import { Register } from '@pages/register/register';
import { authGuard } from './guards/auth-guard';
import { Overview } from '@pages/overview/overview';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: Overview },
    ]
  },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
];
