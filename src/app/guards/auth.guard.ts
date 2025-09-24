import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { environment } from '../environments/environment';

export const authGuard: CanActivateFn = (route, state) => {

  // if (environment.skipAuth) return true; // pula autenticação em dev

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLogado()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
