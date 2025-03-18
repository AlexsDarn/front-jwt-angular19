import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  loading = false; // Para mostrar un spinner mientras carga

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {}

  login() {
    this.loading = true;
    this.authService.login(this.credentials).subscribe({
      next: response => {
        this.authService.setToken(response.token);
        this.toastr.success('Login exitoso', 'Bienvenido');
        this.router.navigate(['/playlists/home']);
      },
      error: () => {
        this.toastr.error('Usuario o contraseña incorrectos', 'Error de autenticación');
        this.loading = false;
      }
    });
  }

  goRegister() {
    this.router.navigate(['/auth/register']);
  }  
}
