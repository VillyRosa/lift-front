import { Injectable } from '@angular/core';
import { iDecodedToken } from '@core/auth/interfaces/decoded-token';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class Token {
  private static TOKEN_KEY = "token";

  public static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  public static removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  public static hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  public static decodeToken(): iDecodedToken | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<iDecodedToken>(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  public static getUserId(): string | null {
    const decoded = this.decodeToken();
    return decoded?.sub || null;
  }

  public static getIssuer(): string | null {
    const decoded = this.decodeToken();
    return decoded?.iss || null;
  }

  public static isTokenExpired(): boolean {
    const decoded = this.decodeToken();
    if (!decoded) return true;

    const now = Date.now() / 1000;
    return decoded.exp < now;
  }

  public static isAuthenticated(): boolean {
    const token = this.getToken();

    if (token && !this.isTokenExpired()) return true;

    if (token) this.removeToken();
    return false;
  }
}
