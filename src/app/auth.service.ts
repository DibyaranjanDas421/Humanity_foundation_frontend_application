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

  saveToken(token: string, userId: any, id: any): void {
    if (!token) {
      console.error('❌ No token provided, cannot save!');
      return;
    }
  
    console.log('💾 Storing Token:', token);
    console.log('💾 Storing User ID:', userId);
    console.log('💾 Storing Id:', id?.toString()); // ✅ Fix: Log the actual ID instead of userId
  
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('userId', userId?.toString() || 'unknownUser'); // ✅ Safely convert userId to string
    localStorage.setItem('userIdNumber', id !== null && id !== undefined ? id.toString() : '0'); // ✅ Handle null/undefined for id
  }
  
  

// ✅ Check if user is logged in by checking localStorage
isLoggedIn(): boolean {
  return !!localStorage.getItem('jwtToken');
}

// ✅ Retrieve the stored userId from localStorage
getUserId(): string | null {
  return localStorage.getItem('userId');
}

// ✅ Retrieve the stored userId's number from localStorage
getId(): string | null {
  return localStorage.getItem('userIdNumber');
}

// ✅ Get the token from localStorage
getToken(): string | null {
  return localStorage.getItem('jwtToken');
}

// Add this in your AuthService
saveUserRequestId(requestId: number): void {
  localStorage.setItem('user_request_id', requestId.toString());
}

getUserRequestId(): number | null {
  const id = localStorage.getItem('user_request_id');
  return id ? Number(id) : null;
}

clearUserRequestId(): void {
  localStorage.removeItem('user_request_id');
}


// ✅ Clear token, userId, and id from localStorage
clearToken(): void {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('userIdNumber');
  this.loggedInSubject.next(false);
}

}
