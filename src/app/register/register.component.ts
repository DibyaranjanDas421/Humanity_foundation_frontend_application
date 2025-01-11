import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { UserRegistrationDto } from '../models/user-registration-dto.model';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  model: UserRegistrationDto = {
    fullName: '',
    bloodGroup: '',
    userId: '',
    mobileNumber: '',
    emailId: '',
    password: '',
    country: '',
    state: '',
    district: '',
    city: '',
    availabilityToDonateBlood: false,
  };

  constructor(private userService: UserService) {}

  onSubmit(registerForm: NgForm) {
    if (registerForm.valid) {
      this.registerUser();
    } else {
      console.error('Form is invalid');
    }
  }

  async registerUser() {
    try {
      const response = await firstValueFrom(this.userService.registerUser(this.model));

      console.log('Server response:', response);

      if (response.includes('ThankYou')) {
        this.showSuccessPopup(response); // Show SweetAlert2 popup on success
      } else {
        throw new Error('Unexpected response format.');
      }
    } catch (err) {
      this.showErrorPopup(err); // Show error popup
      console.error('Error:', err);
    }
  }

  // SweetAlert2 success popup
  showSuccessPopup(message: string) {
    Swal.fire({
      title: 'Registration Successful',
      text: message,
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }

  // SweetAlert2 error popup
  showErrorPopup(error: any) {
    Swal.fire({
      title: 'Registration Failed',
      text: error?.message || 'Something went wrong. Please try again.',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }
}
