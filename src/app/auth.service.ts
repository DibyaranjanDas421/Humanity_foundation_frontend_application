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

  // Save token and userId, update loggedIn status
  saveToken(token: string, userId: string): void {
    this.cookieService.set(this.tokenKey, token, { expires: 3, path: '/' });
    this.cookieService.set('userId', userId, { expires: 3, path: '/' });  // You can store userId in a separate cookie if needed
    this.loggedInSubject.next(true); // Emit login status change
  }

  // Clear token and update loggedIn status
  clearToken(): void {
    this.cookieService.delete(this.tokenKey, '/');
    this.cookieService.delete('userId', '/');  // Delete userId cookie as well if needed
    this.loggedInSubject.next(false); // Emit logout status change
  }

  // Check if user is logged in by checking the cookie
  isLoggedIn(): boolean {
    return this.cookieService.check(this.tokenKey);
  }

  // Retrieve the stored userId
  getUserId(): string | null {
    return this.cookieService.get('userId');
  }
}
