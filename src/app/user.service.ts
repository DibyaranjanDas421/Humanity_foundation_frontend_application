import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserRegistrationDto } from './models/user-registration-dto.model'; // Define this model
import { TokenService } from './token-service.service'; // Import TokenService
import { TokenResponse } from './models/token-response.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/users/register';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  registerUser(user: UserRegistrationDto): Observable<string> {
    return this.tokenService.getAccessToken().pipe(
      switchMap((tokenResponse: TokenResponse) => {
        const accessToken = tokenResponse.access_token;
        console.log('Retrieved Access Token:', accessToken);
  
        const headers = new HttpHeaders({
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        });
  
        // Add responseType: 'text' to treat the server response as plain text
        return this.http.post<string>(this.apiUrl, user, {
          headers,
          responseType: 'text' as 'json', // Ensures the response is treated as plain text
        });
      })
    );
  }
  
}
