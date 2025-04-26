import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ReciverRequestService {
  private apiUrl = 'http://localhost:8080/donors/donor/'; // Endpoint for receiver request

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  // /**
  //  * Fetch receiver request data based on donorId
  //  * @param donorId - Donor ID to fetch receiver request data for
  //  * @returns Observable<any>
  //  */
  // getReceiverRequest(donorId: string): Observable<any> {
  //   return new Observable((observer) => {
  //     this.tokenService.getAccessToken().subscribe(
  //       (response) => {
  //         const token = response.access_token;

  //         const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //         this.http.get(`${this.apiUrl}${donorId}`, { headers }).subscribe(
  //           (apiResponse) => {
  //             observer.next(apiResponse);
  //             observer.complete();
  //           },
  //           (error) => {
  //             observer.error(error);
  //           }
  //         );
  //       },
  //       (error) => {
  //         observer.error(error);
  //       }
  //     );
  //   });
  // }

  // respondToRequest(donorId: number, donorReceiverStatusId: number, response: string): Observable<any> {
  //   return new Observable((observer) => {
  //     this.tokenService.getAccessToken().subscribe(
  //       (responseData) => {
  //         const token = responseData.access_token;

  //         const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //         const apiUrl = `http://localhost:8080/donors/${donorId}/respond/${donorReceiverStatusId}`;

  //         const requestBody = { response };

  //         console.log(response);

  //         this.http.put(apiUrl, requestBody, { headers }).subscribe(
  //           (apiResponse) => {
  //             observer.next(apiResponse);
  //             observer.complete();
  //           },
  //           (error) => {
  //             observer.error(error);
  //           }
  //         );
  //       },
  //       (error) => {
  //         observer.error(error);
  //       }
  //     );
  //   });
  // }
}
