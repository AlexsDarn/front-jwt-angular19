import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  }
}
