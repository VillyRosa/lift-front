import { Routes } from '@angular/router';
import { authGuard } from '@core/auth/guards/auth-guard';
import authRoutes from '@features/auth/auth.routes';
import overvirewRoutes from '@features/overview/overview.routes';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    children: [
      ...overvirewRoutes
    ]
  },
  ...authRoutes
];
