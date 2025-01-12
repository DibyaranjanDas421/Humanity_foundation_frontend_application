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
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.donorId = this.authService.getId();
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
        if (Array.isArray(response) && response.length > 0) {
          this.receiverData = response;
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
        Swal.fire({
          title: 'Error',
          text: 'There was an issue fetching the data.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }
  
  respondToRequest(donorReceiverStatusId: number, action: string): void {
    console.log('Action:', action); // Log the action before sending
  
    // Ensure the response is in uppercase form before sending
    const response = action === 'ACCEPT' ? 'ACCEPT' : 'REJECT';
  
    // Check if donorId and reciverRequestService are valid (non-null)
    if (!this.donorId) {
      console.error('Donor ID is missing.');
      return; // Early exit if donorId is invalid
    }
  
    if (!this.reciverRequestService) {
      console.error('Receiver Request Service is missing.');
      return; // Early exit if reciverRequestService is invalid
    }
  
    // Now proceed with making the PUT request to the backend
    this.reciverRequestService.respondToRequest(+this.donorId, donorReceiverStatusId, response).subscribe(
      (result) => {
        Swal.fire({
          title: 'Success',
          text: `Request has been ${response.toLowerCase()} successfully.`,
          icon: 'success',
          confirmButtonText: 'OK',
        });
  
        // Refresh the receiver data to reflect the updated state
        this.fetchReceiverRequestData();
      },
      (error) => {
        console.error('Error responding to request:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to respond to the request. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }
  
}
