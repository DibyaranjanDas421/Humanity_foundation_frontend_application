import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token-service.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ReciverRequestService {
  private apiUrl = 'http://localhost:8080/donors/donor/'; // Endpoint for receiver request

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private cookieService: CookieService
  ) {}

  /**
   * Fetch receiver request data based on donorId
   * @param donorId - Donor ID to fetch receiver request data for
   * @returns Observable<any>
   */
  getReceiverRequest(donorId: string): Observable<any> {
    return new Observable((observer) => {
      // Get the access token
      this.tokenService.getAccessToken().subscribe(
        (response) => {
          const token = response.access_token;

          // Set the Authorization header with the token
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

          // Make the GET request with the donorId appended to the URL
          this.http.get(`${this.apiUrl}${donorId}`, { headers }).subscribe(
            (apiResponse) => {
              observer.next(apiResponse); // Success
              observer.complete();
            },
            (error) => {
              observer.error(error); // Error
            }
          );
        },
        (error) => {
          observer.error(error); // Token retrieval error
        }
      );
    });
  }
}
