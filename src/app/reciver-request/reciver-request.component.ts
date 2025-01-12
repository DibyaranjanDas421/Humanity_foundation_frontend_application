import { Component, OnInit } from '@angular/core';
import { ReciverRequestService } from '../service/reciver-request-service.service';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from '../token-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reciver-request',
  templateUrl: './reciver-request.component.html',
  styleUrls: ['./reciver-request.component.scss'],
})
export class ReciverRequestComponent implements OnInit {
  donorId: string | null = '';
  receiverData: any = null;

  constructor(
    private reciverRequestService: ReciverRequestService,
    private cookieService: CookieService,
    private tokenService: TokenService,
    private router: Router,
    private authService :AuthService
    
  ) {}

  ngOnInit(): void {
    // Get donorId from cookies (assuming donorId is stored in cookies)
    this.donorId = this.authService.getId();
    console.log(this.donorId);
    if (this.donorId) {
      this.fetchReceiverRequestData();
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Donor ID is missing!',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }

  /**
   * Fetch receiver request data based on donorId
   */
  fetchReceiverRequestData() {
    if (!this.donorId) {
      return;
    }

    this.reciverRequestService.getReceiverRequest(this.donorId).subscribe(
      (response) => {
        // Make sure response is an array and log the response
        console.log('API Response:', response);
        if (Array.isArray(response) && response.length > 0) {
          this.receiverData = response;
          console.log('Receiver Data:', this.receiverData);
        } else {
          Swal.fire({
            title: 'Error',
            text: 'No receiver data found!',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      },
      (error) => {
        console.error('Error fetching receiver data:', error);
        Swal.fire({
          title: 'Error',
          text: 'There was an issue with fetching the data. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
}

}
