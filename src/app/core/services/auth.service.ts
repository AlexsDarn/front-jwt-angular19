import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authUrl = environment.authUrl;

  constructor(private readonly http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.authUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, credentials);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
  }
}
