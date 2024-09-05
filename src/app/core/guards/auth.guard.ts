import { inject } from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../../pages/auth/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  if (!authService.getToken()) {
    router.navigate(['/auth/login']).then();
  }
  return !!authService.getToken()
};

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  if (authService.getToken()) {
    router.navigate(['/todo']).then();
  }
  return !authService.getToken()
};
