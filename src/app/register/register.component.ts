import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { JwtService } from '../service/jwt.service';
import { UserRegistrationDto } from '../models/user-registration-dto.model';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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

  constructor(private jwtService: JwtService,private router: Router) {}

  onSubmit(registerForm: NgForm) {
    if (registerForm.valid) {
      this.registerUser();
    } else {
      console.error('Form is invalid');
    }
  }

  async registerUser() {
    try {
      const response: any = await firstValueFrom(this.jwtService.register(this.model));

      console.log('Server response:', response);

      if (response?.message) {
        this.showSuccessPopup(response.message);
      } else {
        throw new Error('Unexpected response format.');
      }
    } catch (err: any) {
      this.showErrorPopup(err);
      console.error('Error:', err);
    }
  }

  showSuccessPopup(message: string) {
    Swal.fire({
      title: 'Registration Successful',
      text: message,
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      // ✅ Navigate to login page after alert is closed
      this.router.navigate(['/login']);
    });
  }
  

  showErrorPopup(error: any) {
    Swal.fire({
      title: 'Registration Failed',
      text: error?.error?.message || error?.message || 'Something went wrong. Please try again.',
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }
}
