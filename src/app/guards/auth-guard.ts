import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Token } from '@services/token';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (!Token.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }
  
  return true;
};
