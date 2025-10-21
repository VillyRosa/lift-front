import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@environments/environment.development';
import { TokenService } from '@services/token.service';

export const apiPrefixInterceptor: HttpInterceptorFn = (req, next) => {
  const isFullUrl = req.url.startsWith('http');
  const isAsset = req.url.includes('assets');

  const isAuthenticated = TokenService.hasToken();

  const apiReq = (isFullUrl || isAsset) ? req : req.clone({
    url: `${environment.apiUrl.replace(/\/$/, '')}/${req.url.replace(/^\//, '')}`,
    setHeaders: isAuthenticated ? { Authorization: `Bearer ${TokenService.getToken()}` } : {}
  });

  return next(apiReq);
};
