import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class RegisterComponent {
  user = { username: '', password: '' };
  loading = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {}

  register() {
    this.loading = true;
    this.authService.register(this.user).subscribe({
      next: () => {
        this.toastr.success('Registro exitoso. Ahora puedes iniciar sesión.', 'Bienvenido');
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        this.toastr.error('No se pudo completar el registro', 'Error');
        this.loading = false;
      }
    });
  }

  goLogin() {
    this.router.navigate(['/auth/login']);
  }  
}
