// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { DonorService } from '../service/donor-service.service';
// import { TokenService } from '../token-service.service';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-donor-search-component',
//   templateUrl: './donor-search-component.component.html',
//   styleUrls: ['./donor-search-component.component.scss']
// })
// export class DonorSearchComponentComponent implements OnInit {

//   searchForm: FormGroup;
//   donors: any[] = [];
//   bloodGroups: string[] = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
//   isLoading: boolean = false;

//   constructor(
//     private fb: FormBuilder,
//     private donorService: DonorService,
//     private tokenService: TokenService
//   ) {
//     this.searchForm = this.fb.group({
//       city: ['', Validators.required],
//       bloodGroup: ['', Validators.required],
//     });
//   }

//   ngOnInit(): void {}

//   searchDonors(): void {
//     if (this.searchForm.invalid) {
//       this.searchForm.markAllAsTouched();
//       return;
//     }

//     this.isLoading = true;
//     const { city, bloodGroup } = this.searchForm.value;

//     // Fetch token and call the donor search API
//     this.tokenService.getAccessToken().subscribe(
//       (tokenResponse) => {
//         const token = tokenResponse.access_token;

//         this.donorService.getDonorsByCityAndBloodGroup(city, bloodGroup, token).subscribe(
//           (response) => {
//             this.donors = response;
//             this.isLoading = false;
//           },
//           (error) => {
//             this.isLoading = false;
//             console.error('Error fetching donors:', error);
//             Swal.fire({
//               title: 'Error',
//               text: 'Failed to fetch donors. Please try again later.',
//               icon: 'error',
//               confirmButtonText: 'OK',
//             });
//           }
//         );
//       },
//       (error) => {
//         this.isLoading = false;
//         console.error('Error fetching token:', error);
//         Swal.fire({
//           title: 'Token Error',
//           text: 'Failed to retrieve access token. Please try again.',
//           icon: 'error',
//           confirmButtonText: 'OK',
//         });
//       }
//     );
//   }
// }
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { DonorService } from '../service/donor-service.service';
// import { AuthService } from '../auth.service'; // Import the AuthService
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-donor-search-component',
//   templateUrl: './donor-search-component.component.html',
//   styleUrls: ['./donor-search-component.component.scss']
// })
// export class DonorSearchComponentComponent implements OnInit {

//   searchForm: FormGroup;
//   donors: any[] = [];
//   bloodGroups: string[] = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
//   isLoading: boolean = false;

//   constructor(
//     private fb: FormBuilder,
//     private donorService: DonorService,
//     private authService: AuthService // Use AuthService to get userId
//   ) {
//     this.searchForm = this.fb.group({
//       city: ['', Validators.required],
//       bloodGroup: ['', Validators.required],
//     });
//   }

//   ngOnInit(): void {}

//   searchDonors(): void {
//     if (this.searchForm.invalid) {
//       this.searchForm.markAllAsTouched();
//       return;
//     }

//     this.isLoading = true;
//     const { city, bloodGroup } = this.searchForm.value;

//     // Fetch token and call the donor search API
//     this.authService.getUserId();  // Accessing the user ID
//     this.authService.getUserIdId();  // If necessary, access the ID associated with the user

//     this.authService.isLoggedIn(); // Check if logged in

//     // Assuming we also fetch the token from cookies or another service

//     // Fetch token logic
//     const token = this.authService.getToken(); // Assuming you've implemented getToken()

//     this.donorService.getDonorsByCityAndBloodGroup(city, bloodGroup, token).subscribe(
//       (response) => {
//         this.donors = response;
//         this.isLoading = false;
//       },
//       (error) => {
//         this.isLoading = false;
//         console.error('Error fetching donors:', error);
//         Swal.fire({
//           title: 'Error',
//           text: 'Failed to fetch donors. Please try again later.',
//           icon: 'error',
//           confirmButtonText: 'OK',
//         });
//       }
//     );
//   }

//   sendRequest(receiverId: number): void {
//     // Fetch the access token from the auth service
//     const token = this.authService.getToken(); // Assuming your AuthService has a method to fetch the token
//     const donorId = this.authService.getUserIdId();  // Get the donor's ID from cookies

//     if (!donorId) {
//       Swal.fire({
//         title: 'Error',
//         text: 'Unable to retrieve donor ID. Please log in again.',
//         icon: 'error',
//         confirmButtonText: 'OK',
//       });
//       return;
//     }

//     // Call the sendRequest method from the donor service
//     this.isLoading = true;
//     this.donorService.sendRequest(Number(donorId), receiverId, token).subscribe(
//       (response) => {
//         this.isLoading = false;
//         Swal.fire({
//           title: 'Success',
//           text: 'Request sent successfully!',
//           icon: 'success',
//           confirmButtonText: 'OK',
//         });
//       },
//       (error) => {
//         this.isLoading = false;
//         console.error('Error sending request:', error);
//         Swal.fire({
//           title: 'Error',
//           text: 'Failed to send request. Please try again later.',
//           icon: 'error',
//           confirmButtonText: 'OK',
//         });
//       }
//     );
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from '../service/jwt.service'; // Import JwtService
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-donor-search-component',
  templateUrl: './donor-search-component.component.html',
  styleUrls: ['./donor-search-component.component.scss']
})
export class DonorSearchComponentComponent implements OnInit {
  searchForm: FormGroup;
  donors: any[] = [];
  bloodGroups: string[] = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private jwtService: JwtService, // Use JwtService directly
    private authService: AuthService
  ) {
    this.searchForm = this.fb.group({
      city: ['', Validators.required],
      bloodGroup: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  // ✅ Search for donors using JwtService
  searchDonors(): void {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const { city, bloodGroup } = this.searchForm.value;

    // Call the donorSearch method from JwtService
    this.jwtService.donorSearch(city, bloodGroup).subscribe(
      (response) => {
        this.donors = response; // Assign donors list
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching donors:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to fetch donors. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }

  // ✅ Send a request to the donor
  sendRequest(donorId: number): void {
    const receiverId = this.authService.getId(); // Logged-in user's ID

    // Validation checks
    if (!donorId) {
      Swal.fire({
        title: 'Error',
        text: 'Donor ID is not available. Please submit a request.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (receiverId === null) {
      Swal.fire({
        title: 'Error',
        text: 'Receiver ID is missing. Please log in again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    const receiverIdNumber = Number(receiverId);

    if (isNaN(receiverIdNumber)) {
      Swal.fire({
        title: 'Error',
        text: 'Invalid Receiver ID. Please log in again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    if (donorId === receiverIdNumber) {
      Swal.fire({
        title: 'Error',
        text: 'You cannot send a request to yourself.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    // Send request to donor using jwtService
    this.isLoading = true;
    this.jwtService.sendRequest(receiverIdNumber, donorId).subscribe(
      () => {
        this.isLoading = false;
        Swal.fire({
          title: 'Success',
          text: 'Request sent successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      },
      (error) => {
        this.isLoading = false;
        console.error('Error sending request:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to send the request. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }
}
