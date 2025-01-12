import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
// auth.service.ts
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly tokenKey = 'auth_token';
  private loggedInSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private cookieService: CookieService) {}

  // Save token, userId, and user id in cookies, update loggedIn status
  saveToken(token: string, userId: string, id: number): void {
    this.cookieService.set(this.tokenKey, token, { expires: 3, path: '/' });
    this.cookieService.set('userId', userId, { expires: 3, path: '/' });
    this.cookieService.set('id', id.toString(), { expires: 3, path: '/' });
    this.loggedInSubject.next(true);
  }

  // Clear token, userId, and id cookies, update loggedIn status
  clearToken(): void {
    this.cookieService.delete(this.tokenKey, '/');
    this.cookieService.delete('userId', '/');
    this.cookieService.delete('id', '/');
    this.loggedInSubject.next(false);
  }

  // Check if user is logged in by checking the cookie
  isLoggedIn(): boolean {
    return this.cookieService.check(this.tokenKey);
  }

  // Retrieve the stored userId
  getUserId(): string | null {
    return this.cookieService.get('userId');
  }

  // Retrieve the stored userId's id
  getId(): string | null {
    return this.cookieService.get('id');
  }

  // Get the token from the cookie
  getToken(): string | null {
    return this.cookieService.get(this.tokenKey);
  }
}
