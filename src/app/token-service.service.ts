import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenResponse } from './models/token-response.model'; // Define this interface

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private tokenUrl = 'http://localhost:9191/realms/api-gateway-auth/protocol/openid-connect/token';
  private clientId = 'api-gateway-security';
  private clientSecret = 'PKqLOfgaSTd3ilX8jJA21jiWh8Zhjm6x';

  constructor(private http: HttpClient) {}

  getAccessToken(): Observable<TokenResponse> {
    const body = new URLSearchParams();
    body.set('grant_type', 'client_credentials');
    body.set('client_id', this.clientId);
    body.set('client_secret', this.clientSecret);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post<TokenResponse>(this.tokenUrl, body.toString(), { headers });
  }
}
