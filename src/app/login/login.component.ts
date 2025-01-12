import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService, LoginCredentials } from '../service/login-service.service';
import { TokenService } from '../token-service.service';
import { TokenResponse } from '../models/token-response.model';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

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
    private loginService: LoginService,
    private tokenService: TokenService,
    private router: Router,
    private authService: AuthService
  ) {
    // Initialize login form with userId and password fields
    this.loginForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  /**
   * Handles form submission, triggering login process if form is valid.
   */
  onSubmit(): void {
    if (this.loginForm.invalid) {
      // Mark all form controls as touched to show validation errors
      this.loginForm.markAllAsTouched();
      return;
    }

    // Set loading state and reset login error flag
    this.isLoading = true;
    this.loginError = false;

    // Retrieve credentials from the form
    const credentials: LoginCredentials = this.loginForm.value;

    // Attempt to fetch access token and then log in
    this.getAccessTokenAndLogin(credentials);
  }

  /**
   * Fetches the access token and triggers login with provided credentials.
   */
  private getAccessTokenAndLogin(credentials: LoginCredentials): void {
    this.tokenService.getAccessToken().subscribe(
      (tokenResponse: TokenResponse) => {
        const token = tokenResponse.access_token;
        this.loginWithCredentials(credentials, token);
      },
      (error) => this.handleTokenError(error)
    );
  }

  /**
   * Performs login using the provided credentials and access token.
   */
  private loginWithCredentials(credentials: LoginCredentials, token: string): void {
    this.loginService.login(credentials, token).subscribe(
      (response) => {
        this.isLoading = false;
        this.handleLoginSuccess(response, token);
      },
      (error) => {
        this.isLoading = false;
        this.handleLoginError(error);
      }
    );
  }

  /**
   * Handles successful login by saving the token and userId, then navigating to home.
   */
  private handleLoginSuccess(response: any, token: string): void {
    console.log('Login successful:', response);

    // Assuming response contains userId, extract it
    const userId = response.userId; 

    // Save the token and userId using AuthService
    this.authService.saveToken(token, userId);

    // Display success message using SweetAlert
    Swal.fire({
      title: 'Login Successful',
      text: response.message || 'Successfully logged in.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      // Redirect to home page after successful login
      this.router.navigate(['/home']);
    });
  }

  /**
   * Handles failed login by displaying an error message.
   */
  private handleLoginError(error: any): void {
    console.error('Login failed:', error);
    this.loginError = true;

    // Display error message using SweetAlert
    Swal.fire({
      title: 'Login Failed',
      text: error?.message || 'Invalid username or password', // Customize based on backend error response
      icon: 'error',
      confirmButtonText: 'Try Again'
    });
  }

  /**
   * Handles errors related to fetching the token, showing a message to the user.
   */
  private handleTokenError(error: any): void {
    this.isLoading = false;
    console.error('Failed to retrieve token:', error);

    // Display token retrieval error using SweetAlert
    Swal.fire({
      title: 'Token Error',
      text: 'Failed to retrieve access token. Please try again later.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
}
