import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { LoginRequest, RegisterRequest } from '../../models/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);

  activeTab: 'login' | 'register' = 'login';

  // Login fields
  email = '';
  password = '';

  // Register fields
  name = '';
  regEmail = '';
  regPassword = '';

  error = '';
  loading = false;

  setTab(tab: 'login' | 'register') {
    this.activeTab = tab;
    this.error = '';
  }

  sendLogin() {
    this.error = '';
    this.loading = true;
    const body: LoginRequest = { email: this.email, password: this.password };
    this.authService.login(body).subscribe({
      next: () => this.router.navigate(['/films']),
      error: (err) => {
        this.error = err.error?.message ?? 'Error al iniciar sesión';
        this.loading = false;
      },
    });
  }

  sendRegister() {
    this.error = '';
    this.loading = true;
    const body: RegisterRequest = {
      name: this.name,
      email: this.regEmail,
      password: this.regPassword,
    };
    this.authService.register(body).subscribe({
      next: () => this.router.navigate(['/films']),
      error: (err) => {
        this.error = err.error?.message ?? 'Error al registrarse';
        this.loading = false;
      },
    });
  }
}
