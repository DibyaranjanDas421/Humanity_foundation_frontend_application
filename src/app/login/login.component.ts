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
    this.loginForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  /**
   * Handles form submission, triggering the login process if the form is valid.
   */
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // Show validation errors
      return;
    }

    this.isLoading = true;  // Show loading state
    this.loginError = false; // Reset previous login errors

    const credentials: LoginCredentials = this.loginForm.value;
    this.getAccessTokenAndLogin(credentials); // Proceed to get access token and log in
  }

  /**
   * Fetches the access token and triggers login with the provided credentials.
   */
  private getAccessTokenAndLogin(credentials: LoginCredentials): void {
    this.tokenService.getAccessToken().subscribe(
      (tokenResponse: TokenResponse) => {
        const token = tokenResponse.access_token; // Extract token
        this.loginWithCredentials(credentials, token); // Proceed with login
      },
      (error) => this.handleTokenError(error) // Handle token retrieval error
    );
  }

  /**
   * Logs the user in with the provided credentials and access token.
   */
  private loginWithCredentials(credentials: LoginCredentials, token: string): void {
    this.loginService.login(credentials, token).subscribe(
      (response) => {
        this.isLoading = false; // Hide loading spinner
        this.handleLoginSuccess(response, token); // Handle successful login
      },
      (error) => {
        this.isLoading = false; // Hide loading spinner
        this.handleLoginError(error); // Handle failed login
      }
    );
  }

  /**
   * Handles successful login, saves token and userId, and redirects to the home page.
   */
  private handleLoginSuccess(response: any, token: string): void {
    console.log('Login successful:', response);

    // Assuming response contains userId, store it with the token
    const { userId, id } = response;

    // Save token and userId (and id) using AuthService
    this.authService.saveToken(token, userId, id);

    // Display success message using SweetAlert
    Swal.fire({
      title: 'Login Successful',
      text: response.message || 'Successfully logged in.',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      this.router.navigate(['/home']); // Redirect to home page after successful login
    });
  }

  /**
   * Handles failed login, displaying an error message to the user.
   */
  private handleLoginError(error: any): void {
    console.error('Login failed:', error);
    this.loginError = true;

    // Display error message using SweetAlert
    Swal.fire({
      title: 'Login Failed',
      text: error?.message || 'Invalid username or password.',
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
