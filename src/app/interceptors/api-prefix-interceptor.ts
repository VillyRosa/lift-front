import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@environments/environment.development';
import { Token } from '@services/token';

export const apiPrefixInterceptor: HttpInterceptorFn = (req, next) => {
  const isFullUrl = req.url.startsWith('http');
  const isAsset = req.url.includes('assets');

  const isAuthenticated = Token.hasToken();

  const apiReq = (isFullUrl || isAsset) ? req : req.clone({
    url: `${environment.apiUrl.replace(/\/$/, '')}/${req.url.replace(/^\//, '')}`,
    setHeaders: isAuthenticated ? { Authorization: `Bearer ${Token.getToken()}` } : {}
  });

  return next(apiReq);
};
