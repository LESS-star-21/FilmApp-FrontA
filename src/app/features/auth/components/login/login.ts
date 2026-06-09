import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { LoginRequest } from '../../models/auth';
import { Session } from '../../../../shared/services/session';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private authService = inject(AuthService);
  private sessionService = inject(Session);
  private router = inject(Router);

  activeTab: 'login' | 'register' = 'login';

  // Login
  user = '';
  password = '';

  // Registro
  name = '';
  regEmail = '';
  regPassword = '';

  error = '';

  setTab(tab: 'login' | 'register') {
    this.activeTab = tab;
    this.error = '';
  }

  sendLogin() {
    const body: LoginRequest = { email: this.user, password: this.password };
    this.authService.login(body).subscribe({
      next: (res) => {
        this.sessionService.setToken(res.token);
        this.router.navigate(['/films']);
      },
      error: (err) => {
        this.error = err.error?.message ?? 'Error al iniciar sesión';
      },
    });
  }

  sendRegister() {
    this.authService.register({ name: this.name, email: this.regEmail, password: this.regPassword }).subscribe({
      next: (res) => {
        this.sessionService.setToken(res.token);
        this.router.navigate(['/films']);
      },
      error: (err) => {
        this.error = err.error?.message ?? 'Error al registrarse';
      },
    });
  }
}