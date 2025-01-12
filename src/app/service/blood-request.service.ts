import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../token-service.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class BloodRequestService {
  private apiUrl = 'http://localhost:8080/api/user-requests/upload-and-save';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private cookieService: CookieService
  ) {}

  /**
   * Upload blood request with form data
   * @param formData - The form data to be uploaded
   * @param userId - User ID, retrieved from cookies or passed directly
   * @returns Observable<any>
   */
  uploadBloodRequest(formData: FormData, userId?: string): Observable<any> {
    return new Observable((observer) => {
      // Get the access token
      this.tokenService.getAccessToken().subscribe(
        (response) => {
          const token = response.access_token;

          // If userId is not passed, get it from cookies
          if (!userId) {
            userId = this.cookieService.get('userId');
          }
           console.log(formData);
          // Append userId to the form data
          formData.append('userId', userId);
          console.log('Hospital Name (Service):', formData.get('hospitalName'));

          // Set the Authorization header with the token
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

          // Make the POST request
          this.http.post(this.apiUrl, formData, { headers }).subscribe(
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
