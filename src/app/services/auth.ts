import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { login } from '@interfaces/login';
import { loginResponse } from '@interfaces/login-response';
import { register } from '@interfaces/register';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private http = inject(HttpClient);

  public login(data: login): Observable<loginResponse> {
    return this.http.post<loginResponse>("/auth/login", data);
  }

  public register(data: register): Observable<void> {
    return this.http.post<void>("/auth/register", data);
  }
}
