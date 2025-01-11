import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'auth_token';
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn()); // Initial value from cookies
  loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private cookieService: CookieService) {}

  // Save token and update loggedIn status
  saveToken(token: string): void {
    this.cookieService.set(this.tokenKey, token, { expires: 3, path: '/' });
    this.loggedInSubject.next(true); // Emit login status change
  }

  // Clear token and update loggedIn status
  clearToken(): void {
    this.cookieService.delete(this.tokenKey, '/');
    this.loggedInSubject.next(false); // Emit logout status change
  }

  // Check if user is logged in by checking the cookie
  isLoggedIn(): boolean {
    return this.cookieService.check(this.tokenKey);
  }
}
