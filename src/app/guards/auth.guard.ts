import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service'; // Import AuthService

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // If user is not logged in, redirect to login
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);  // Redirect to login if not logged in
      return false;
    }
    return true;  // Allow navigation if logged in
  }
}
