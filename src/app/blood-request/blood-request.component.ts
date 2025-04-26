import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from '../service/jwt.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SharedService } from '../service/shared-service.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-blood-request',
  templateUrl: './blood-request.component.html',
  styleUrls: ['./blood-request.component.scss'],
})
export class BloodRequestComponent {
  bloodRequestForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private jwtService: JwtService,  // Using JwtService now
    private router: Router,
    private cookieService: CookieService,
    private sharedService: SharedService,
    private authService: AuthService
  ) {
    // Initialize the form group with validators
    this.bloodRequestForm = this.fb.group({
      file: ['', Validators.required],
      fullName: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      country: ['', Validators.required],
      state: ['', Validators.required],
      district: ['', Validators.required],
      city: ['', Validators.required],
      hospitalName: ['', Validators.required],
    });
  }

  /**
   * Handles file input changes and updates the form control
   * @param event - File input event
   */
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.bloodRequestForm.patchValue({ file });
    }
  }

  /**
   * Submits the blood request using JwtService
   */
//   onSubmit() {
//     if (this.bloodRequestForm.invalid) {
//       return;
//     }
  
//     // ✅ Get the logged-in user's ID from AuthService (localStorage)
//     const userId = this.authService.getUserId();
  
//     if (!userId) {
//       Swal.fire({
//         title: 'Error',
//         text: 'User ID not found. Please log in again.',
//         icon: 'error',
//         confirmButtonText: 'OK',
//       });
//       return;
//     }
  
//     // Prepare FormData to send with the request
//     const formData = new FormData();
//     Object.keys(this.bloodRequestForm.value).forEach((key) => {
//       formData.append(key, this.bloodRequestForm.get(key)?.value);
//     });
//     formData.append('userId', userId); // ✅ Append userId properly

//     console.log(userId);
  
//     // Call the API using JwtService
//    // ✅ Call API with FormData directly
// this.jwtService.sendBloodRequest(formData).subscribe(
//   (response) => {
//     Swal.fire({
//       title: 'Request Sent!',
//       text: 'Your blood request has been successfully submitted.',
//       icon: 'success',
//       confirmButtonText: 'OK',
//     }).then(() => {
//       this.sharedService.setBloodRequestSubmitted(true);
//       this.router.navigate(['/donor-search']);
//     });
//   },
//   (error) => {
//     Swal.fire({
//       title: 'Submission Failed',
//       text: 'There was an issue submitting your request. Please try again later.',
//       icon: 'error',
//       confirmButtonText: 'OK',
//     });
//   }
// );

//   }
onSubmit() {
  if (this.bloodRequestForm.invalid) {
    return;
  }

  const userId = this.authService.getUserId();

  if (!userId) {
    Swal.fire({
      title: 'Error',
      text: 'User ID not found. Please log in again.',
      icon: 'error',
      confirmButtonText: 'OK',
    });
    return;
  }

  const formData = new FormData();
  Object.keys(this.bloodRequestForm.value).forEach((key) => {
    formData.append(key, this.bloodRequestForm.get(key)?.value);
  });
  formData.append('userId', userId);

  this.jwtService.sendBloodRequest(formData).subscribe(
    (response) => {
      // ✅ Store the ID using AuthService
      if (response && response.id) {
        this.authService.saveUserRequestId(response.id);
      }

      Swal.fire({
        title: 'Request Sent!',
        text: 'Your blood request has been successfully submitted.',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        this.sharedService.setBloodRequestSubmitted(true);
        this.router.navigate(['/donor-search']);
      });
    },
    (error) => {
      Swal.fire({
        title: 'Submission Failed',
        text: 'There was an issue submitting your request. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  );
}


  
}
