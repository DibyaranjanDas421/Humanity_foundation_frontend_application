import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from '../service/jwt.service';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  loginError = false;

  constructor(
    private fb: FormBuilder,
    private jwtService: JwtService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      userId: ['', [Validators.required, Validators.minLength(3)]], // ✅ Added validation
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  /**
   * Handles form submission and login request.
   */
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.loginError = false;

    const credentials = {
      userId: this.loginForm.value.userId.trim(), // ✅ Trim spaces
      password: this.loginForm.value.password.trim()
    };

    console.log('📤 Sending login request:', credentials); // ✅ Debugging

    this.login(credentials);
  }

  /**
   * Calls the login API and processes the response.
   */
  private login(credentials: any): void {
    this.jwtService.login(credentials).subscribe({
      next: (response) => this.handleLoginSuccess(response),
      error: (error) => this.handleLoginError(error),
      complete: () => (this.isLoading = false)
    });
  }

  /**
   * Handles a successful login response.
   */
//   private handleLoginSuccess(response: any): void {
//     console.log('✅ Login successful:', response);

//     const token = response.jwtToken; // ✅ Ensure this matches API response

//     if (!token) {
//         console.warn('⚠ No token found in response:', response);
//         return;
//     }

//     console.log('🔑 JWT Token:', token);

//     // ✅ Extract userId and id safely (if available)
//     const userId = response.userId || "unknownUser"; // Default value if missing
//     const id = response.id || "0"; // Default value if missing

//     this.authService.saveToken(token, userId, id); // ✅ Prevents undefined errors

//     Swal.fire({
//         title: 'Login Successful',
//         text: response.message || 'Successfully logged in.',
//         icon: 'success',
//         confirmButtonText: 'OK'
//     }).then(() => {
//         this.router.navigate(['/home']);
//     });
// }
private handleLoginSuccess(response: any): void {
  console.log('✅ Login successful:', response);

  const token = response.jwtToken;
  if (!token) {
    console.warn('⚠ No token found in response:', response);
    return;
  }

  const userId = response.userId || "unknownUser";
  const id = response.id || "0";

  this.authService.saveToken(token, userId, id);

  Swal.fire({
    title: 'Login Successful',
    text: response.message || 'Successfully logged in.',
    icon: 'success',
    confirmButtonText: 'OK'
  }).then(() => {
    this.router.navigate(['/home']).then(() => {
      // ✅ Force full app reload
      window.location.reload();
    });
  });
}


  /**
   * Handles a failed login attempt.
   */
  private handleLoginError(error: any): void {
    console.error('❌ Login failed:', error);
    this.loginError = true;

    Swal.fire({
      title: 'Login Failed',
      text: error?.error?.message || 'Invalid username or password.',
      icon: 'error',
      confirmButtonText: 'Try Again'
    });
  }
}
