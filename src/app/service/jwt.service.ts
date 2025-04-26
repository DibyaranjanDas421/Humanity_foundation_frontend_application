import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


import{AuthService} from '../auth.service'

const BASE_URL="http://localhost:8085/users/";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  register(registerUser: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${BASE_URL}register`, registerUser, { headers });

  }

  login(loginRequest: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // ✅ Prepare request payload
    const correctedRequest = {
      userid: loginRequest.userId,
      password: loginRequest.password
    };

    console.log('Sending API request to:', `${BASE_URL}login`);
    console.log('Request payload:', JSON.stringify(correctedRequest));

    // ✅ Save token and user ID after successful login
    return this.http.post(`${BASE_URL}login`, correctedRequest, { headers }).pipe(
      tap((response: any) => {
        if (response && response.jwtToken) { // ✅ Use 'jwtToken' instead of 'token' based on your response DTO
          this.authService.saveToken(response.jwtToken, response.userId, response.id);
          console.log('✅ Token saved successfully');
        } else {
          console.error('❌ Login response does not contain token');
        }
      })
    );
    
  }
  donorSearch(city: string, bloodGroup: string): Observable<any> {
    // Get the JWT token from localStorage
    const token = localStorage.getItem('jwtToken');

    // Set up headers with the JWT token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // Construct the API endpoint URL dynamically
    const apiUrl = `${BASE_URL}api/foundDonor/${city}/${bloodGroup}`;

    // Call the API with headers
    return this.http.get(apiUrl, { headers });
  }

  sendRequest(receiverId: number, donorId: number): Observable<any> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    // ✅ Send request data as JSON body instead of URL params
    const requestBody = {
      receiverId: receiverId,
      donorId: donorId
    };
  
    const apiUrl = `${BASE_URL}api/send`;
  
    return this.http.post(apiUrl, requestBody, { headers });
  }
  


  sendBloodRequest(formData: FormData): Observable<any> {
    const token = this.authService.getToken();
  
    const headers = {
      Authorization: `Bearer ${token}`, // ✅ Attach JWT token
    };
  
    // ✅ Remove 'Content-Type' so Angular automatically sets it to multipart/form-data
    return this.http.post(`${BASE_URL}api/bloodrequest`, formData, { headers });
  }
  
  
  
  respondToRequest(donorId: number, donorReceiverStatusId: number, response: string): Observable<any> {
    const token = localStorage.getItem('jwtToken');
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    // ✅ Corrected API URL to match the Spring Boot endpoint
    const apiUrl = `${BASE_URL}api/${donorId}/respond/${donorReceiverStatusId}`;
  
    // Only sending the response type as the request body
    const requestBody = {
      response
    };
  
    return this.http.put(apiUrl, requestBody, { headers });
  }
  
  
  getDonorPendingRequests(donorId: number): Observable<any> {
    const token = localStorage.getItem('jwtToken');
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    const apiUrl = `${BASE_URL}api/donor/${donorId}`;  // ✅ Correct API URL
  
    return this.http.get(apiUrl, { headers });
  }

  getProfileData(userid:String): Observable<any> {
    const token = localStorage.getItem('jwtToken');
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    const apiUrl = `${BASE_URL}api/profile/${userid}`;  // ✅ Correct API URL
  
    return this.http.get(apiUrl, { headers });
  }

  deleteBloodRequest(userRequestId: number): Observable<any> {
    const token = localStorage.getItem('jwtToken');
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    const apiUrl = `${BASE_URL}api/user-request/${userRequestId}`;  // ✅ Correct API URL
  
    return this.http.delete<any>(apiUrl, { headers });
  }

  getCurrentBloodRequest(userIdNumber:number): Observable<any> {
    const token = localStorage.getItem('jwtToken');
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    const apiUrl = `${BASE_URL}api/curr_Request/${userIdNumber}`;  // ✅ Correct API URL
  
    return this.http.get(apiUrl, { headers });
  }

  getAcceptedDonorRequests(receiverId: number): Observable<any> {
    const token = localStorage.getItem('jwtToken');
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    const apiUrl = `${BASE_URL}api/receiver/${receiverId}/accepted`;  // ✅ Correct endpoint
  
    return this.http.get(apiUrl, { headers });
  }
  
  
  

  

  
  
}
