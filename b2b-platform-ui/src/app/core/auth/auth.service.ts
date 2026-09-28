import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import {
  AuthUser,
  LoginRequest,
  LoginResponse,
  ChangePasswordRequest
} from './auth.model';
import { API_URL } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl = `${API_URL}/auth`;
  private readonly tokenKey = 'b2b_access_token';

  readonly user = signal<AuthUser | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(request: LoginRequest): Observable<LoginResponse> {

    return this.http
      .post<LoginResponse>(
        `${this.baseUrl}/login`,
        request
      )
      .pipe(
        tap(response => {

          sessionStorage.setItem(
            this.tokenKey,
            response.token
          );

          this.user.set(response.user);
        })
      );
  }

  loadCurrentUser(): Observable<AuthUser> {

    return this.http
      .get<AuthUser>(
        `${this.baseUrl}/me`
      )
      .pipe(
        tap(user => this.user.set(user))
      );
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  hasRole(role: string): boolean {
    return this.user()?.role === role;
  }

  changePassword(
    request: ChangePasswordRequest
  ): Observable<void> {

    return this.http.post<void>(
      `${this.baseUrl}/change-password`,
      request
    );
  }

  logout(): void {

    sessionStorage.removeItem(this.tokenKey);
    this.user.set(null);

    this.router.navigate(['/login']);
  }
}