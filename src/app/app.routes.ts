import { Routes } from '@angular/router';
import { authGuard } from '@core/auth/guards/auth-guard';
import authRoutes from '@features/auth/auth.routes';
import overvirewRoutes from '@features/overview/overview.routes';
import notFoundRoutes from '@features/not-found/not-found.routes';
import { MainLayout } from '@core/layouts/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: MainLayout,
    children: [
      ...overvirewRoutes
    ]
  },
  ...authRoutes,
  ...notFoundRoutes,
];
