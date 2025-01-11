import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service'; // Import AuthService

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // If user is logged in, redirect to home
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);  // Redirect to home if already logged in
      return false;
    }
    return true;  // Allow navigation if not logged in
  }
}
