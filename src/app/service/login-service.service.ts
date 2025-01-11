import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginCredentials {
  userId: string;
  password: string;
}

@Injectable({
  providedIn: 'root'  // Ensures that the service is available globally
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/users/login'; // Your login API URL

  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,  // Adding Authorization header with the token
    });

    return this.http.post(this.apiUrl, credentials, { headers });
  }
}
