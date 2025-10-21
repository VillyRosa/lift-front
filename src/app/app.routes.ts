import { Routes } from '@angular/router';
import { Login } from '@pages/login/login';
import { Register } from '@pages/register/register';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
];
