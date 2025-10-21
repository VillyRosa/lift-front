import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { login } from '@interfaces/login';
import { loginResponse } from '@interfaces/login-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  public login(data: login): Observable<loginResponse> {
    return this.http.post<loginResponse>("http://localhost:8080/auth/login", data);
  }
}
