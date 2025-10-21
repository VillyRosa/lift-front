import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@environments/environment.development';

export const apiPrefixInterceptor: HttpInterceptorFn = (req, next) => {
  const isFullUrl = req.url.startsWith('http');
  const isAsset = req.url.includes('assets');

  if (isFullUrl || isAsset) return next(req);

  const apiReq = req.clone({
    url: `${environment.apiUrl.replace(/\/$/, '')}/${req.url.replace(/^\//, '')}`,
  });

  return next(apiReq);
};
