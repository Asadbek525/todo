import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import {AuthService} from "../../pages/auth/auth.service";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  req = req.clone({
    setHeaders: {
      Authorization: `${authService.getTokenType()} ${authService.getToken()}`
    }
  })
  return next(req);
};
