import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest, LoginResponse } from '../models/auth';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);
  private readonly API_URL = 'https://filmapp-ecz6.onrender.com/api/v1';

  login(credentials: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, credentials).pipe(
      tap({
        next: () => {},
        error: (err) => console.error(err),
      })
    );
  }
  register(data: { name: string; email: string; password: string }) {
  return this.http.post<LoginResponse>(`${this.API_URL}/auth/register`, data).pipe(
    tap({
      next: () => {},
      error: (err) => console.error(err),
    })
  );
}
}