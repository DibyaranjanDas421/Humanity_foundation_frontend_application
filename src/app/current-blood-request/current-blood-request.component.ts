import { Component, OnInit } from '@angular/core';
import { JwtService } from '../service/jwt.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-current-blood-request',
  templateUrl: './current-blood-request.component.html',
  styleUrls: ['./current-blood-request.component.scss']
})
export class CurrentBloodRequestComponent implements OnInit {
  userIdNumber: number | null = null;
  currentBloodRequestData: any = null;

  constructor(
    private jwtService: JwtService,
    private cookieService: CookieService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadCurrentBloodRequest();
  }

  private loadCurrentBloodRequest(): void {
    const userId = this.authService.getId(); // This returns string

    if (userId) {
      this.userIdNumber = Number(userId); // Convert to number if needed

      this.jwtService.getCurrentBloodRequest(this.userIdNumber).subscribe({
        next: (response) => {
          this.currentBloodRequestData = response;
          console.log('Current Blood Request:', this.currentBloodRequestData);
        },
        error: (err) => {
          console.error('Failed to fetch current blood request:', err);
          // Optionally, handle error with UI feedback
        }
      });
    } else {
      console.error('User ID not found. Cannot fetch blood request.');
    }
  }
  deleteRequest() {
    const requestId = localStorage.getItem('userIdNumber'); // or pass from response if available
  
    if (requestId) {
      const id = Number(requestId);
      this.jwtService.deleteBloodRequest(id).subscribe({
        next: () => {
          Swal.fire({
            title: 'Deleted',
            text: 'Your blood request has been successfully deleted.',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          this.currentBloodRequestData = null;
          localStorage.removeItem('user_request_id');
        },
        error: (err) => {
          Swal.fire({
            title: 'Error',
            text: 'Failed to delete the request. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
          console.error(err);
        },
      });
    } else {
      Swal.fire({
        title: 'Missing Request ID',
        text: 'Cannot delete request. ID not found.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    }
  }
  
}

