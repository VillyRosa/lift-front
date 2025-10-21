import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { iLogin } from '@core/auth/interfaces/login';
import { iLoginResponse } from '@core/auth/interfaces/login-response';
import { iRegister } from '@core/auth/interfaces/register';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private http = inject(HttpClient);

  public login(data: iLogin): Observable<iLoginResponse> {
    return this.http.post<iLoginResponse>("/auth/login", data);
  }

  public register(data: iRegister): Observable<void> {
    return this.http.post<void>("/auth/register", data);
  }
}
