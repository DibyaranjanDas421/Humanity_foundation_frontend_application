import { Component, OnInit } from '@angular/core';
import { JwtService } from '../service/jwt.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reciver-request',
  templateUrl: './reciver-request.component.html',
  styleUrls: ['./reciver-request.component.scss'],
})
export class ReciverRequestComponent implements OnInit {
  donorId: string | null = null;
  donorDetails: any = null;
  receiverData: any[] = []; // ✅ Initialize as an empty array

  constructor(
    private jwtService: JwtService,
    private cookieService: CookieService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeDonorId();
    this.fetchAcceptedRequests();
  }

  /**
   * Initialize donor ID using AuthService
   */
  private initializeDonorId(): void {
    this.donorId = this.authService.getId();

    if (this.donorId) {
      this.fetchDonorDetails(Number(this.donorId));
    } else {
      this.showError('Donor ID is missing!');
    }
  }

  /**
   * Fetch donor details and receiver requests
   */
  private fetchDonorDetails(donorId: number): void {
    this.jwtService.getDonorPendingRequests(donorId).subscribe({
      next: (response) => {
        this.donorDetails = response;
        this.receiverData = Array.isArray(response) ? response : [];
        console.log('Receiver Data:', this.receiverData);
      },
      error: () => this.showError('Failed to fetch donor details. Please try again later.'),
    });
  }

  /**
   * Send request from donor to receiver
   */
  sendRequest(receiverId: number): void {
    if (!this.donorId) {
      this.showError('Donor ID is missing!');
      return;
    }

    this.jwtService.sendRequest(receiverId, Number(this.donorId)).subscribe({
      next: () => {
        this.showSuccess('Request sent successfully!');
        this.refreshReceiverData();
      },
      error: () => this.showError('Failed to send the request. Please try again later.'),
    });
  }

  /**
   * Respond to a receiver request (Accept/Reject)
   */
  respondToRequest(donorReceiverStatusId: number, action: 'ACCEPT' | 'REJECT'): void {
    if (!this.donorId) {
      this.showError('Donor ID is missing!');
      return;
    }
  
    this.jwtService.respondToRequest(Number(this.donorId), donorReceiverStatusId, action).subscribe({
      next: () => {
        this.showSuccess(`Request ${action.toLowerCase()}ed successfully.`);
        this.refreshReceiverData();
      },
      error: (err) => {
        console.error('API Error:', err);
        this.showError('Failed to respond to the request. Please try again later.');
      },
    });
  }
  

  /**
   * Refresh receiver data after an action
   */
  private refreshReceiverData(): void {
    if (this.donorId) {
      this.fetchDonorDetails(Number(this.donorId));
    }
  }

  /**
   * Display success alert
   */
  private showSuccess(message: string): void {
    Swal.fire({
      title: 'Success',
      text: message,
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }

  /**
   * Display error alert
   */
  private showError(message: string): void {
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }
  acceptedDonors: any[] = []; // ✅ for storing the response


private fetchAcceptedRequests(): void {
  const receiverId = this.authService.getId(); // assumes receiver is logged in

  if (receiverId) {
    this.jwtService.getAcceptedDonorRequests(Number(receiverId)).subscribe({
      next: (response) => {
        this.acceptedDonors = Array.isArray(response) ? response : [];
        console.log('Accepted Donors:', this.acceptedDonors);
      },
      error: () => {
        this.showError('Failed to fetch accepted donor data.');
      }
    });
  } else {
    this.showError('Receiver ID not found!');
  }
}

}
