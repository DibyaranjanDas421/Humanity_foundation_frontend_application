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
import { DonorService } from '../service/donor-service.service';
import { TokenService } from '../token-service.service'; // Use TokenService to get token
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
    private donorService: DonorService,
    private tokenService: TokenService, // Use TokenService to get token
    private authService :AuthService
  ) {
    this.searchForm = this.fb.group({
      city: ['', Validators.required],
      bloodGroup: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  searchDonors(): void {
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const { city, bloodGroup } = this.searchForm.value;

    // Fetch token and call the donor search API
    this.tokenService.getAccessToken().subscribe(
      (tokenResponse) => {
        const token = tokenResponse.access_token; // Get the access token

        if (!token) {
          this.isLoading = false;
          Swal.fire({
            title: 'Error',
            text: 'Failed to retrieve access token. Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
          return;
        }

        // Proceed with the donor search if token is valid
        this.donorService.getDonorsByCityAndBloodGroup(city, bloodGroup, token).subscribe(
          (response) => {
            this.donors = response;
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
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching token:', error);
        Swal.fire({
          title: 'Token Error',
          text: 'Failed to retrieve access token. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }
  sendRequest(donorId: number): void {
    const receiverId = this.authService.getId();  // This should be the logged-in user's ID (receiver)

    console.log('Donor ID:', donorId);  // Donor ID from table (who is being contacted)
    console.log('Receiver ID:', receiverId);  // Logged-in user's ID (who is sending the request)

    // Handle donorId being null
    if (!donorId) {
      Swal.fire({
        title: 'Error',
        text: 'Donor ID is not available. Please first submit a blood request.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    // Handle receiverId being null
    if (receiverId === null) {
      Swal.fire({
        title: 'Error',
        text: 'Receiver ID is not available. Please log in again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    // Convert receiverId to number
    const receiverIdNumber = Number(receiverId);

    // Check if the conversion failed (i.e., receiverId is not a valid number)
    if (isNaN(receiverIdNumber)) {
      Swal.fire({
        title: 'Error',
        text: 'Invalid Receiver ID. Please log in again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    // Check if donorId and receiverId are the same
    if (donorId === receiverIdNumber) {
      Swal.fire({
        title: 'Error',
        text: 'You cannot send a request to yourself.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    this.tokenService.getAccessToken().subscribe(
      (tokenResponse) => {
        const token = tokenResponse.access_token;

        // Ensure token exists before making the request
        if (!token) {
          Swal.fire({
            title: 'Error',
            text: 'Please log in to send a request.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
          return;
        }

        // Proceed with the request to send a donation request
        this.isLoading = true;
        this.donorService.sendRequest(receiverIdNumber, donorId, token).subscribe(
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
              text: 'Failed to send request. Please try again later.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          }
        );
      },
      (error) => {
        this.isLoading = false;
        console.error('Error fetching token:', error);
        Swal.fire({
          title: 'Token Error',
          text: 'Failed to retrieve access token. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
}

  

}
