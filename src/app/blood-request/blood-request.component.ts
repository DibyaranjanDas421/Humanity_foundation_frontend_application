import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BloodRequestService } from '../service/blood-request.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-blood-request',
  templateUrl: './blood-request.component.html',
  styleUrls: ['./blood-request.component.scss'],
})
export class BloodRequestComponent {
  bloodRequestForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bloodRequestService: BloodRequestService,
    private router: Router,
    private cookieService: CookieService
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
   * Handles file input changes to add the file to the form control
   * @param event - File input change event
   */
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.bloodRequestForm.patchValue({ file });
    }
  }

  /**
   * Handles form submission to upload the blood request
   */
  onSubmit() {
    if (this.bloodRequestForm.invalid) {
      return;
    }

    const userId = this.cookieService.get('userId');
    const formData = new FormData();
    console.log('Hospital Name (Frontend):', this.bloodRequestForm.get('hospitalName')?.value);

    // Append all form values to the FormData
    for (const key of Object.keys(this.bloodRequestForm.value)) {
      formData.append(key, this.bloodRequestForm.get(key)?.value);
    }

    // Call the service method to submit the form
    this.bloodRequestService.uploadBloodRequest(formData, userId).subscribe(
      (response) => {
        Swal.fire({
          title: 'Success',
          text: 'Your blood request has been successfully submitted.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          this.router.navigate(['/donor-search']);
        });
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: 'There was an issue with the submission. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }
}
