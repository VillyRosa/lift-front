import { HttpInterceptorFn } from '@angular/common/http';
import { Token } from '../services/token';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = Token.getToken();

  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });

  return next(authReq);
};
