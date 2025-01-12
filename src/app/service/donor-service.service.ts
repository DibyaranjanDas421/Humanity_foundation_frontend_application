// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class DonorService {
//   private apiUrl = 'http://localhost:8080/users/foundDonor'; // Base URL for donor API

//   constructor(private http: HttpClient) {}

//   getDonorsByCityAndBloodGroup(city: string, bloodGroup: string, token: string): Observable<any[]> {
//     const headers = new HttpHeaders({
//       Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
//     });

//     const url = `${this.apiUrl}/${encodeURIComponent(city)}/${encodeURIComponent(bloodGroup)}`;
//     return this.http.get<any[]>(url, { headers });
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DonorService {
  private apiUrl = 'http://localhost:8080/users/foundDonor'; // Base URL for donor API
  private sendRequestUrl = 'http://localhost:8080/donors/send'; // URL for sending request

  constructor(private http: HttpClient) {}

  // Get donors based on city and blood group
  getDonorsByCityAndBloodGroup(city: string, bloodGroup: string, token: string): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
    });
     
     console.log(token);
    const url = `${this.apiUrl}/${encodeURIComponent(city)}/${encodeURIComponent(bloodGroup)}`;
    return this.http.get<any[]>(url, { headers });
  }

  // Send a request to the donor
  sendRequest(donorId: number, receiverId: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
    });

    const requestData = {
      donorId: donorId,
      receiverId: receiverId
    };

    return this.http.post<any>(this.sendRequestUrl, requestData, { headers });
  }
}

