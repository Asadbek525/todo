import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoadingService } from '../services/loading.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  loadingService.show();
  req = req.clone({
    url: req.url.includes('assets/')
      ? req.url
      : `${environment.baseApiUrl}${req.url}`,
  });
  return next(req).pipe(
    finalize(() => {
      loadingService.hide();
    }),
  );
};
